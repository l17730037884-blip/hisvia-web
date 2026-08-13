#!/usr/bin/env python3
"""
HISVIA Asset Pipeline V2 — Phase 4.3
Industrial Classification Engine V2 (Upgraded Rule-Based)

Key improvements over V1:
- Multi-field scanning: industrial_clues → visible_object → features → brand → text
- Chinese keyword support (气缸/气动/过滤/液压/空压)
- Brand→system soft hints (Atlas Copco→Air Compressor, Donaldson→Filtration, etc.)
- Factory detection with system-clue override (product in scene ≠ factory photo)
- Cross-system detection (seals, gaskets, lubricants)
"""

import json
from pathlib import Path
from collections import Counter

BASE = Path("/Users/liujunkai/Downloads/hisvia-web 2")
DATA = BASE / "data" / "asset-pipeline" / "cutout-library"
QWEN_PATH = DATA / "golden-set" / "vision-test" / "qwen-results.json"
TAXO_PATH = DATA / "rules" / "taxonomy-v1.json"
OUT_DIR = DATA / "golden-set" / "classification-test-v2"

with open(TAXO_PATH, "r", encoding="utf-8") as f:
    TAXONOMY = json.load(f)

VALID_SYSTEMS = list(TAXONOMY["system_types"].keys())
SYSTEM_CATS = {s: list(d["categories"].keys()) for s, d in TAXONOMY["system_types"].items()}

# ============================================================
# EXPANDED KEYWORD MAPS
# ============================================================

SYSTEM_KEYWORDS = {
    "Air Compressor Systems": [
        "compressed air", "air compressor", "compressor system", "compressor",
        "air end", "oil separator", "air dryer", "air treatment",
        "refrigerated dryer", "desiccant dryer", "air receiver",
        "compressed air system", "compressed air equipment",
        "空压机", "压缩机", "空气压缩", "冷干机", "吸干机", "油气分离", "储气罐",
    ],
    "Hydraulic Systems": [
        "hydraulic", "hydraulic system", "hydraulic power",
        "hydraulic pump", "hydraulic motor", "hydraulic cylinder",
        "hydraulic valve", "hydraulic power unit", "hpu",
        "hydraulic ports", "hydraulic connections",
        "液压", "液压泵", "液压马达", "液压缸", "液压阀", "液压站",
    ],
    "Pneumatic Automation": [
        "pneumatic", "pneumatic component", "pneumatic system",
        "air preparation", "frl",
        "pneumatic cylinder", "pneumatic valve", "pneumatic actuator",
        "solenoid valve", "pneumatic fitting",
        "pneumatic connection", "air fitting",
        "气动", "气缸", "气动元件", "气动阀", "电磁阀", "气动接头",
    ],
    "Industrial Filtration": [
        "filtration", "filter system", "dust collection", "dust_collection",
        "air filtration", "fluid filtration", "oil filtration",
        "coalescing", "filtration system",
        "filter", "filter element", "dust collector", "air filter",
        "oil filter", "hydraulic filter", "coalescing filter",
        "filter media", "filter housing", "filter cartridge",
        "过滤", "过滤器", "滤芯", "除尘", "集尘", "粉尘收集",
    ],
    "Pumps & Fluid Handling": [
        "pump", "fluid handling", "pumping", "fluid transfer",
        "centrifugal pump", "gear pump", "screw pump",
        "diaphragm pump", "vacuum pump", "water pump",
        "泵", "离心泵", "齿轮泵", "螺杆泵", "隔膜泵", "真空泵", "水泵",
    ],
    "Valves & Flow Control": [
        "valve", "flow control", "flow_control",
        "ball valve", "butterfly valve", "gate valve",
        "check valve", "control valve", "safety valve", "globe valve",
        "阀", "阀门", "球阀", "蝶阀", "闸阀", "止回阀", "控制阀", "安全阀",
    ],
    "Mechanical Transmission": [
        "mechanical", "transmission", "drive system", "power transmission",
        "bearing", "gear", "coupling", "shaft", "belt drive",
        "chain drive", "seal", "mechanical seal",
        "bearing housing", "mechanical component", "rotating",
        "轴承", "齿轮", "联轴器", "轴", "密封", "机械传动", "皮带传动", "链条传动",
    ],
    "Industrial Automation & Control": [
        "automation", "control system", "industrial automation",
        "control module", "plc", "network connectivity",
        "power management", "industrial control",
        "controller", "sensor", "vfd", "servo drive",
        "hmi", "io module", "control panel",
        "led indicator", "ethernet port", "serial port",
        "terminal block", "digital display",
        "自动化", "控制器", "传感器", "变频器", "伺服", "PLC", "工控", "工业控制",
    ],
}

BRAND_HINTS = {
    "atlas copco": "Air Compressor Systems",
    "kaeser": "Air Compressor Systems",
    "compair": "Air Compressor Systems",
    "gardner denver": "Air Compressor Systems",
    "ingersoll rand": "Air Compressor Systems",
    "sullair": "Air Compressor Systems",
    "boge": "Air Compressor Systems",
    "donaldson": "Industrial Filtration",
    "donaldson torit": "Industrial Filtration",
    "mann+hummel": "Industrial Filtration",
    "parker": "Hydraulic Systems",
    "bosch rexroth": "Hydraulic Systems",
    "eaton": "Hydraulic Systems",
    "festo": "Pneumatic Automation",
    "smc": "Pneumatic Automation",
    "norgren": "Pneumatic Automation",
    "abb": "Industrial Automation & Control",
    "siemens": "Industrial Automation & Control",
    "schneider": "Industrial Automation & Control",
    "beckhoff": "Industrial Automation & Control",
    "mitsubishi": "Industrial Automation & Control",
    "delta": "Industrial Automation & Control",
    "omron": "Industrial Automation & Control",
    "inovance": "Industrial Automation & Control",
    "phoenix": "Industrial Automation & Control",
    "panasonic": "Industrial Automation & Control",
    "skf": "Mechanical Transmission",
    "fag": "Mechanical Transmission",
    "nsk": "Mechanical Transmission",
}

CROSS_SYSTEM_KEYWORDS = [
    "seal", "gasket", "sealant", "silicone", "lubricant",
    "adhesive", "grease", "o-ring",
    "密封", "垫片", "密封件", "密封圈", "润滑", "胶水",
]

FACTORY_KEYWORDS = [
    "factory", "assembly line", "manufacturing", "factory scene",
    "building", "entrance", "parking", "warehouse", "workshop",
    "车间", "工厂", "厂房", "生产线", "仓库",
]

SYSTEM_CLUE_OVERRIDES = [
    "compressed air", "compressor", "dust collection", "air filtration",
    "pump", "valve", "hydraulic", "pneumatic", "bearing", "gear",
    "filter system", "filtration system", "control module", "plc",
    "空压", "液压", "气动", "过滤", "泵", "阀",
]


def norm(lst):
    if isinstance(lst, str): return [lst.lower()]
    return [str(x).lower() for x in (lst or [])]


def collect_fields(qo: dict) -> dict:
    return {
        "objects": norm(qo.get("visible_object", [])),
        "features": norm(qo.get("visible_features", [])),
        "clues": norm(qo.get("industrial_clues", [])),
        "brands": norm(qo.get("visible_brand", [])),
        "texts": norm(qo.get("visible_text", [])),
        "object_type": str(qo.get("object_type", "")).lower(),
        "image_condition": str(qo.get("image_condition", "")).lower(),
    }


def match_keywords(texts: list, keywords: list) -> bool:
    for t in texts:
        tl = t.lower().replace('_', ' ')
        for kw in keywords:
            kwl = kw.lower().replace('_', ' ')
            if kwl in tl:
                return True
    return False


def is_factory_scene(f: dict) -> bool:
    # If strong system clues exist, this is a product (even with scene bg)
    if match_keywords(f["clues"], SYSTEM_CLUE_OVERRIDES):
        return False
    if match_keywords(f["objects"], SYSTEM_CLUE_OVERRIDES):
        return False
    # Pure factory signals
    if f["object_type"] in ("factory_scene", "factory"):
        return True
    if f["image_condition"] in ("factory_photo", "factory_scene"):
        return True
    all_text = f["objects"] + f["clues"] + f["features"] + f["texts"] + [f["object_type"], f["image_condition"]]
    return match_keywords(all_text, FACTORY_KEYWORDS)


def is_cross_system(f: dict) -> bool:
    all_text = f["objects"] + f["clues"] + f["features"]
    return match_keywords(all_text, CROSS_SYSTEM_KEYWORDS)


def score_system(f: dict, keywords: list) -> float:
    s = 0.0
    if match_keywords(f["clues"], keywords): s += 1.0
    if match_keywords(f["objects"], keywords): s += 0.9
    if match_keywords(f["features"], keywords): s += 0.6
    if match_keywords(f["texts"], keywords): s += 0.4
    for b in f["brands"]:
        if b in BRAND_HINTS and BRAND_HINTS[b] in VALID_SYSTEMS:
            if any(kw.lower() in BRAND_HINTS[b].lower() for kw in keywords):
                s += 0.3
                break
    return min(s, 1.0)


def find_category(system_name: str, f: dict) -> str | None:
    if system_name not in SYSTEM_CATS:
        return None
    cats = SYSTEM_CATS[system_name]
    all_text = f["objects"] + f["clues"] + f["features"] + f["texts"]
    cat_map = {
        "Compressors": ["compressor", "screw", "piston", "centrifugal", "压缩机"],
        "Compressor Components": ["separator", "air end", "controller", "spare", "分离", "机头"],
        "Air Treatment": ["dryer", "receiver", "tank", "干燥", "冷干", "储气"],
        "Air Filtration": ["filter", "coalescing", "intake", "过滤", "除尘"],
        "Hydraulic Power Units": ["power unit", "hpu", "tank", "manifold", "油箱", "液压站"],
        "Hydraulic Components": ["pump", "motor", "cylinder", "泵", "马达", "缸"],
        "Hydraulic Valves": ["valve", "directional", "pressure", "阀"],
        "Hydraulic Controls": ["proportional", "servo", "controller", "比例", "伺服"],
        "Pneumatic Components": ["cylinder", "valve", "fitting", "气缸", "接头"],
        "Pneumatic Actuators": ["actuator", "gripper", "rotary", "执行器", "抓手"],
        "Air Preparation": ["frl", "filter regulator", "lubricator", "三联件"],
        "Dust Filtration": ["dust", "bag", "cyclone", "除尘", "布袋", "旋风"],
        "Filter Elements": ["element", "cartridge", "滤芯", "滤筒"],
        "Precision Filtration": ["hepa", "micro", "membrane", "高效", "精密"],
        "Industrial Filters": ["hydraulic filter", "lubrication", "process", "液压过滤"],
        "Centrifugal Pumps": ["centrifugal", "离心"],
        "Gear Pumps": ["gear", "齿轮泵"],
        "Screw Pumps": ["screw", "螺杆"],
        "Ball Valves": ["ball", "球阀"],
        "Butterfly Valves": ["butterfly", "蝶阀"],
        "Gate Valves": ["gate", "闸阀"],
        "Check Valves": ["check", "止回阀"],
        "Control Valves": ["control", "控制阀"],
        "Bearings": ["bearing", "轴承"],
        "Gears": ["gear", "齿轮"],
        "Couplings": ["coupling", "联轴器"],
        "Seals & Gaskets": ["seal", "gasket", "密封", "垫片"],
        "PLCs & Controllers": ["plc", "controller", "控制模块"],
        "Sensors": ["sensor", "传感器"],
        "VFDs & Drives": ["vfd", "servo", "drive", "变频器", "伺服"],
    }
    for cat_name, kws in cat_map.items():
        if cat_name in cats and match_keywords(all_text, kws):
            return cat_name
    return None


def classify_asset(qo: dict) -> dict:
    f = collect_fields(qo)

    if is_factory_scene(f):
        return {
            "asset_type": "factory", "system_type": None, "category": None,
            "subcategory": None, "brand": f["brands"][0] if f["brands"] else None,
            "application": [],
            "reasoning": "R002: Factory/exterior scene. system_type=null.",
            "confidence": 0.9, "risk_level": "low",
        }

    if is_cross_system(f):
        scores = {}
        for sn, kws in SYSTEM_KEYWORDS.items():
            sc = score_system(f, kws)
            if sc > 0: scores[sn] = sc
        if not scores or max(scores.values()) < 0.6:
            return {
                "asset_type": "component", "system_type": None, "category": None,
                "subcategory": None, "brand": f["brands"][0] if f["brands"] else None,
                "application": [],
                "reasoning": "R003: Cross-system component. Insufficient clues.",
                "confidence": 0.5, "risk_level": "medium",
            }

    scores = {}
    for sn, kws in SYSTEM_KEYWORDS.items():
        sc = score_system(f, kws)
        if sc > 0: scores[sn] = sc

    if not scores:
        return {
            "asset_type": "equipment", "system_type": None, "category": None,
            "subcategory": None, "brand": f["brands"][0] if f["brands"] else None,
            "application": [],
            "reasoning": "R009: No industrial system clues in any Qwen field.",
            "confidence": 0.3, "risk_level": "high",
        }

    best_sys = max(scores, key=scores.get)
    best_score = scores[best_sys]
    best_cat = find_category(best_sys, f)

    ot = f["object_type"]
    if "component" in ot: at = "component"
    elif "equipment" in ot: at = "equipment"
    elif "factory" in ot: at = "factory"
    else: at = "equipment"

    if best_score >= 0.9:
        conf, risk = 0.9, "low"
    elif best_score >= 0.6:
        conf, risk = 0.75, "medium"
    else:
        conf, risk = 0.5, "high"

    matched = []
    if match_keywords(f["clues"], SYSTEM_KEYWORDS[best_sys]): matched.append("industrial_clues")
    if match_keywords(f["objects"], SYSTEM_KEYWORDS[best_sys]): matched.append("visible_object")
    if match_keywords(f["features"], SYSTEM_KEYWORDS[best_sys]): matched.append("visible_features")
    if match_keywords(f["brands"], SYSTEM_KEYWORDS[best_sys]): matched.append("brand_hint")
    reasoning = f"Matched via {', '.join(matched)}. Score={best_score:.2f}." if matched else f"Matched. Score={best_score:.2f}."

    return {
        "asset_type": at, "system_type": best_sys, "category": best_cat,
        "subcategory": None, "brand": f["brands"][0] if f["brands"] else None,
        "application": [],
        "reasoning": reasoning, "confidence": conf, "risk_level": risk,
    }


def validate(result: dict) -> dict:
    errors = []
    p = result.get("prediction", result)
    for field in ["asset_type", "system_type", "category", "subcategory", "brand"]:
        if field not in p: errors.append(f"Missing: {field}")
    st = p.get("system_type")
    if st is not None and st not in VALID_SYSTEMS:
        errors.append(f"Invalid system: '{st}'")
    cat = p.get("category")
    if st is not None and cat is not None and st in SYSTEM_CATS:
        if cat not in SYSTEM_CATS[st]:
            errors.append(f"Category '{cat}' not in '{st}'")
    risk = result.get("risk_level", "")
    if risk not in ("low", "medium", "high"):
        errors.append(f"Invalid risk: '{risk}'")
    return {"asset_id": result.get("asset_id"), "passed": len(errors) == 0, "errors": errors}


def main():
    print("=" * 60)
    print("HISVIA Phase 4.3 — Classification Engine V2")
    print("=" * 60)

    with open(QWEN_PATH, "r", encoding="utf-8") as f:
        qwen_data = json.load(f)
    qwen_results = qwen_data.get("results", qwen_data)
    print(f"Loaded {len(qwen_results)} Qwen results.")

    results = []
    for qr in qwen_results:
        pred = classify_asset(qr.get("qwen_output", {}))
        results.append({
            "asset_id": qr["asset_id"],
            "prediction": {k: pred[k] for k in ["asset_type", "system_type", "category", "subcategory", "brand", "application"]},
            "reasoning": pred["reasoning"],
            "confidence": pred["confidence"],
            "risk_level": pred["risk_level"],
        })

    validations = [validate(r) for r in results]
    unknown = sum(1 for r in results if r["prediction"]["system_type"] is None)
    assigned = len(results) - unknown
    passed = sum(1 for v in validations if v["passed"])

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    output = {
        "version": "industrial-classification-test-v2",
        "model": "rule-based-classifier-v2",
        "asset_count": len(results),
        "stats": {"assigned": assigned, "unknown": unknown, "pass_rate": f"{passed}/{len(results)}"},
        "results": results,
    }

    with open(OUT_DIR / "deepseek-results-v2.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    with open(OUT_DIR / "validation-results-v2.json", "w", encoding="utf-8") as f:
        json.dump(validations, f, ensure_ascii=False, indent=2)

    sys_dist = Counter(r["prediction"]["system_type"] for r in results)
    print(f"\nAssigned: {assigned} | Unknown: {unknown} | Passed: {passed}/{len(results)}")
    print("System distribution:")
    for sn, c in sys_dist.most_common():
        print(f"  {sn or '(null)'}: {c}")
    print(f"\nSaved to {OUT_DIR}/")


if __name__ == "__main__":
    main()
