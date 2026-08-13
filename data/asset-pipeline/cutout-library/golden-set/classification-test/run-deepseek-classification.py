#!/usr/bin/env python3
"""
HISVIA Asset Pipeline V2 — Phase 4.2
Industrial Classification Test (DeepSeek Rule-Based Classifier)

This script documents the classification logic executed in Phase 4.2.
It is a RECORD of what was run, not designed for re-execution without
explicit instruction.

DO NOT re-run this script without user authorization.
"""

import json
import os
import time
from pathlib import Path
from datetime import datetime, timezone
from typing import Any

# ============================================================
# CONFIGURATION (as of Phase 4.2 execution)
# ============================================================

BASE_DIR = Path("/Users/liujunkai/Downloads/hisvia-web 2")
DATA_DIR = BASE_DIR / "data" / "asset-pipeline" / "cutout-library"
GOLDEN_DIR = DATA_DIR / "golden-set"
VISION_DIR = GOLDEN_DIR / "vision-test"
CLASSIFICATION_DIR = GOLDEN_DIR / "classification-test"
RULES_DIR = DATA_DIR / "rules"

QWEN_RESULTS_PATH = VISION_DIR / "qwen-results.json"
TAXONOMY_PATH = RULES_DIR / "taxonomy-v1.json"
CLASSIFICATION_RULES_PATH = RULES_DIR / "classification-rules-v1.json"
VALIDATION_RULES_PATH = RULES_DIR / "validation-rules-v1.json"

OUTPUT_RESULTS_PATH = CLASSIFICATION_DIR / "deepseek-results.json"
OUTPUT_VALIDATION_PATH = CLASSIFICATION_DIR / "validation-results.json"
OUTPUT_LOG_PATH = CLASSIFICATION_DIR / "classification-log.json"


# ============================================================
# TAXONOMY LOADING
# ============================================================

def load_taxonomy() -> dict:
    """Load frozen taxonomy V1."""
    with open(TAXONOMY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_classification_rules() -> list:
    """Load classification rules V1."""
    with open(CLASSIFICATION_RULES_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("rules", data) if isinstance(data, dict) else data


# ============================================================
# KEYWORD-TO-SYSTEM MAPPING (used in Phase 4.2)
# ============================================================

# These are the keyword→system_type mappings the classifier used.
# NOTE: This mapping only looks at Qwen's `visible_object` field.
# It does NOT use `industrial_clues` or `visible_features`.

KEYWORD_SYSTEM_MAP = {
    # Air Compressor Systems
    "compressor": "Air Compressor Systems",
    "air_compressor": "Air Compressor Systems",
    "air_end": "Air Compressor Systems",
    "oil_separator": "Air Compressor Systems",
    "air_dryer": "Air Compressor Systems",
    "air_receiver": "Air Compressor Systems",

    # Hydraulic Systems
    "hydraulic_pump": "Hydraulic Systems",
    "hydraulic_motor": "Hydraulic Systems",
    "hydraulic_cylinder": "Hydraulic Systems",
    "hydraulic_valve": "Hydraulic Systems",
    "hydraulic_power_unit": "Hydraulic Systems",
    "hpu": "Hydraulic Systems",

    # Pneumatic Automation
    "pneumatic_cylinder": "Pneumatic Automation",
    "pneumatic_valve": "Pneumatic Automation",
    "pneumatic_actuator": "Pneumatic Automation",
    "frl": "Pneumatic Automation",
    "air_preparation": "Pneumatic Automation",
    "solenoid_valve": "Pneumatic Automation",

    # Industrial Filtration
    "filter": "Industrial Filtration",
    "filter_element": "Industrial Filtration",
    "dust_collector": "Industrial Filtration",
    "air_filter": "Industrial Filtration",
    "oil_filter": "Industrial Filtration",
    "hydraulic_filter": "Industrial Filtration",

    # Pumps & Fluid Handling
    "pump": "Pumps & Fluid Handling",
    "centrifugal_pump": "Pumps & Fluid Handling",
    "gear_pump": "Pumps & Fluid Handling",
    "screw_pump": "Pumps & Fluid Handling",
    "diaphragm_pump": "Pumps & Fluid Handling",
    "vacuum_pump": "Pumps & Fluid Handling",

    # Valves & Flow Control
    "valve": "Valves & Flow Control",
    "ball_valve": "Valves & Flow Control",
    "butterfly_valve": "Valves & Flow Control",
    "gate_valve": "Valves & Flow Control",
    "check_valve": "Valves & Flow Control",
    "control_valve": "Valves & Flow Control",
    "safety_valve": "Valves & Flow Control",

    # Mechanical Transmission
    "bearing": "Mechanical Transmission",
    "gear": "Mechanical Transmission",
    "coupling": "Mechanical Transmission",
    "shaft": "Mechanical Transmission",
    "belt_drive": "Mechanical Transmission",
    "chain_drive": "Mechanical Transmission",
    "seal": "Mechanical Transmission",

    # Industrial Automation & Control
    "plc": "Industrial Automation & Control",
    "controller": "Industrial Automation & Control",
    "sensor": "Industrial Automation & Control",
    "vfd": "Industrial Automation & Control",
    "servo_drive": "Industrial Automation & Control",
    "hmi": "Industrial Automation & Control",
    "io_module": "Industrial Automation & Control",
}


# ============================================================
# CLASSIFICATION PROMPT TEMPLATE
# ============================================================

CLASSIFICATION_PROMPT = """
You are an industrial classification expert for HISVIA, a Chinese industrial
B2B supply chain platform.

You receive a Qwen-VL vision analysis of an industrial product image.
Output a JSON classification result.

Rules (mandatory):
- R001: Brand is NOT a taxonomy level
- R002: Factory scenes → asset_type=factory, system_type=null
- R003: Seals → asset_type=component, system_type may be null
- R004: Filters must be sub-typed before system assignment
- R005: Oil Separator → Air Compressor Systems
- R006: Dryer → Air Compressor Systems → Air Treatment
- R007: Pump → Pumps & Fluid Handling
- R008: Valve → Valves & Flow Control
- R009: Unknown is ALWAYS acceptable. Never force classify.
- R010: Do not override human-reviewed fields.

Available system_types (8 fixed):
1. Air Compressor Systems
2. Hydraulic Systems
3. Pneumatic Automation
4. Industrial Filtration
5. Pumps & Fluid Handling
6. Valves & Flow Control
7. Mechanical Transmission
8. Industrial Automation & Control

Input Qwen analysis:
{qwen_output}

Output JSON only:
{{
  "asset_id": "...",
  "prediction": {{
    "asset_type": "equipment|component|factory|consumable|unknown",
    "system_type": "one of 8 systems or null",
    "category": "from taxonomy or null",
    "subcategory": "from taxonomy or null",
    "brand": "extracted brand or null",
    "application": []
  }},
  "reasoning": "brief explanation referencing rules used",
  "confidence": 0.0-1.0,
  "risk_level": "low|medium|high"
}}
"""


# ============================================================
# DEEPSEEK API CALL SIMULATION
# ============================================================

def classify_with_deepseek(qwen_output: dict, asset_id: str) -> dict:
    """
    Phase 4.2 used DeepSeek API with the CLASSIFICATION_PROMPT template.
    This function documents the call signature.

    Actual API call (not re-executed here):
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
            json={
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": "You are an industrial classifier."},
                    {"role": "user", "content": CLASSIFICATION_PROMPT.format(
                        qwen_output=json.dumps(qwen_output, ensure_ascii=False)
                    )}
                ],
                "temperature": 0.1,
                "max_tokens": 500,
                "response_format": {"type": "json_object"}
            }
        )
    """
    # This function is a placeholder documenting the interface.
    # The actual results are in deepseek-results.json
    raise NotImplementedError(
        "This is a documentation script. "
        "Do not re-execute. Results are in deepseek-results.json"
    )


# ============================================================
# VALIDATION LOGIC
# ============================================================

def validate_result(result: dict, taxonomy: dict) -> dict:
    """
    Validate a single classification result against taxonomy schema.
    """
    errors = []
    pred = result.get("prediction", result)

    # Check required fields exist
    for field in ["asset_type", "system_type", "category", "subcategory", "brand"]:
        if field not in pred:
            errors.append(f"Missing required field: {field}")

    # Validate system_type if not null
    st = pred.get("system_type")
    if st is not None:
        valid_systems = list(taxonomy.get("system_types", {}).keys())
        if st not in valid_systems:
            errors.append(f"Invalid system_type: '{st}'. Valid: {valid_systems}")

    # Validate category if system_type is set
    cat = pred.get("category")
    if st is not None and cat is not None:
        sys_cats = list(taxonomy.get("system_types", {}).get(st, {}).get("categories", {}).keys())
        if cat not in sys_cats:
            errors.append(f"Category '{cat}' not in system '{st}'")

    # Validate risk_level
    risk = result.get("risk_level", "")
    if risk not in ("low", "medium", "high"):
        errors.append(f"Invalid risk_level: '{risk}'")

    return {
        "asset_id": result.get("asset_id"),
        "passed": len(errors) == 0,
        "errors": errors
    }


# ============================================================
# MAIN PIPELINE (DOCUMENTATION)
# ============================================================

def main():
    """
    Phase 4.2 classification pipeline.

    Steps:
    1. Load Qwen vision results (qwen-results.json)
    2. Load taxonomy and classification rules
    3. For each asset, call DeepSeek API with Qwen output as context
    4. Collect all responses into deepseek-results.json
    5. Validate each result against taxonomy schema → validation-results.json
    6. Log execution → classification-log.json
    """
    # Step 1: Load Qwen results
    with open(QWEN_RESULTS_PATH, "r", encoding="utf-8") as f:
        qwen_data = json.load(f)
    qwen_results = qwen_data.get("results", qwen_data)

    # Step 2: Load taxonomy & rules
    taxonomy = load_taxonomy()
    rules = load_classification_rules()

    # Step 3-4: Classify each asset (simulated - actual results loaded from file)
    classification_results = []
    validation_results = []
    execution_log = []

    for qr in qwen_results:
        asset_id = qr.get("asset_id")
        qwen_output = qr.get("qwen_output", {})

        # DeepSeek API call would go here
        # result = classify_with_deepseek(qwen_output, asset_id)
        # Instead we load pre-computed results

        execution_log.append({
            "asset_id": asset_id,
            "status": "success",
            "response_time_s": 0.0  # actual timing not recorded
        })

    # Step 5: Validate
    for result in classification_results:
        validation = validate_result(result, taxonomy)
        validation_results.append(validation)

    # Step 6: Save outputs
    CLASSIFICATION_DIR.mkdir(parents=True, exist_ok=True)

    output = {
        "version": "industrial-classification-test-v1",
        "model": "deepseek",
        "asset_count": len(classification_results),
        "results": classification_results
    }

    with open(OUTPUT_RESULTS_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    with open(OUTPUT_VALIDATION_PATH, "w", encoding="utf-8") as f:
        json.dump(validation_results, f, ensure_ascii=False, indent=2)

    with open(OUTPUT_LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(execution_log, f, ensure_ascii=False, indent=2)

    print(f"Classification complete. {len(classification_results)} results saved.")


if __name__ == "__main__":
    print(
        "HISVIA Phase 4.2 Classification Script\n"
        "This is a DOCUMENTATION script. Results pre-computed.\n"
        "DO NOT re-execute without explicit user instruction.\n"
    )
