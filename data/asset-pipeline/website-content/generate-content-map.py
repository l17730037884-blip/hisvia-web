#!/usr/bin/env python3
"""
HISVIA Phase 6 — Website Content Mapping
Maps Asset Intelligence Registry → HISVIA website page structure.
No site modifications. Content plan only.
"""

import json
from pathlib import Path
from collections import defaultdict

BASE = Path("/Users/liujunkai/Downloads/hisvia-web 2")
REG_PATH = BASE / "data/asset-pipeline/intelligence-registry/asset-intelligence.json"
OUT_DIR = BASE / "data/asset-pipeline/website-content"
OUT_DIR.mkdir(parents=True, exist_ok=True)

with open(REG_PATH, "r") as f:
    registry = json.load(f)

# ============================================================
# PAGE ROLE DEFINITIONS
# ============================================================

SYSTEM_PAGE_CONFIG = {
    "Air Compressor Systems": {
        "page_role": "Compressed Air System Solutions — Energy-efficient industrial air compressors, dryers, filters, and complete compressed air packages for manufacturing plants",
        "url_slug": "compressed-air-systems",
        "hero_priority": ["compressor unit full view", "branded equipment"],
        "support_priority": ["compressor components", "air treatment", "air filtration"],
    },
    "Hydraulic Systems": {
        "page_role": "Hydraulic System Solutions — Custom hydraulic power units, pumps, valves, and electro-hydraulic controls for heavy machinery and industrial presses",
        "url_slug": "hydraulic-systems",
        "hero_priority": ["HPU assembly", "hydraulic system overview"],
        "support_priority": ["hydraulic components", "hydraulic valves", "hydraulic controls"],
    },
    "Pneumatic Automation": {
        "page_role": "Pneumatic Automation Components — Cylinders, valves, FRL units, and actuators for factory automation and assembly lines",
        "url_slug": "pneumatic-automation",
        "hero_priority": ["automation cell", "pneumatic system"],
        "support_priority": ["pneumatic components", "pneumatic actuators", "air preparation"],
    },
    "Industrial Filtration": {
        "page_role": "Industrial Filtration & Dust Collection — Cartridge filters, baghouse systems, HEPA filtration for cement, steel, pharma, and food processing",
        "url_slug": "industrial-filtration",
        "hero_priority": ["dust collector system", "filtration installation"],
        "support_priority": ["filter elements", "precision filtration", "industrial filters"],
    },
    "Pumps & Fluid Handling": {
        "page_role": "Industrial Pump & Fluid Handling Equipment — Centrifugal, gear, screw, diaphragm pumps for water, chemical, oil, and process applications",
        "url_slug": "pumps-fluid-handling",
        "hero_priority": ["pump skid", "pump assembly"],
        "support_priority": ["centrifugal pumps", "gear pumps", "screw pumps", "vacuum pumps"],
    },
    "Valves & Flow Control": {
        "page_role": "Industrial Valve & Flow Control Solutions — Ball, butterfly, gate, check, control valves for pipelines, process, and HVAC",
        "url_slug": "valves-flow-control",
        "hero_priority": ["valve assembly", "actuated valve"],
        "support_priority": ["ball valves", "butterfly valves", "control valves", "safety valves"],
    },
    "Mechanical Transmission": {
        "page_role": "Mechanical Power Transmission Components — Bearings, gears, couplings, seals for rotating equipment across all industries",
        "url_slug": "mechanical-transmission",
        "hero_priority": ["bearing assembly", "gear set"],
        "support_priority": ["bearings", "gears", "couplings", "seals & gaskets"],
    },
    "Industrial Automation & Control": {
        "page_role": "Industrial Automation & Control Systems — PLCs, VFDs, sensors, HMIs for smart factory and Industry 4.0 applications",
        "url_slug": "automation-control",
        "hero_priority": ["control panel", "PLC system"],
        "support_priority": ["PLCs & controllers", "sensors", "VFDs & drives", "IO & communication"],
    },
}

# ============================================================
# GROUP ASSETS BY SYSTEM
# ============================================================

assets_by_system = defaultdict(list)
factory_assets = []
unclassified_assets = []

for entry in registry:
    st = entry["industrial_classification"]["system_type"]
    at = entry["industrial_classification"]["asset_type"]
    if st:
        assets_by_system[st].append(entry)
    elif at == "factory":
        factory_assets.append(entry)
    else:
        unclassified_assets.append(entry)

# ============================================================
# TASK 1: SYSTEM PAGES
# ============================================================

system_pages = []

for sys_name, assets in sorted(assets_by_system.items()):
    config = SYSTEM_PAGE_CONFIG.get(sys_name, {
        "page_role": f"{sys_name} — Industrial equipment and components",
        "url_slug": sys_name.lower().replace(" & ", "-").replace(" ", "-"),
        "hero_priority": [],
        "support_priority": [],
    })

    # Select hero assets (first 2 assets, prefer branded)
    branded = [a for a in assets if a["industrial_classification"].get("brand")]
    unbranded = [a for a in assets if not a["industrial_classification"].get("brand")]
    hero_candidates = (branded + unbranded)[:2]
    support_assets = [a for a in assets if a not in hero_candidates]

    # Collect all procurement keywords
    all_kw = []
    for a in assets:
        all_kw.extend(a["supply_intelligence"].get("purchase_keywords", [])[:3])
    unique_kw = list(dict.fromkeys(all_kw))[:5]

    system_pages.append({
        "system_type": sys_name,
        "url_slug": config["url_slug"],
        "page_role": config["page_role"],
        "asset_count": len(assets),
        "hero_assets": [a["asset_id"] for a in hero_candidates],
        "support_assets": [a["asset_id"] for a in support_assets],
        "procurement_keywords": unique_kw,
        "confidence": "HIGH" if all(a["status"]["confidence_level"] == "HIGH" for a in assets) else "MIXED",
    })

with open(OUT_DIR / "system-pages.json", "w", encoding="utf-8") as f:
    json.dump(system_pages, f, ensure_ascii=False, indent=2)

# ============================================================
# TASK 2: CAPABILITY PAGES
# ============================================================

capability_pages = []

# Manufacturing capability pages (one per system with assets)
capability_pages.append({
    "capability_type": "manufacturing_network",
    "title": "HISVIA Manufacturing Network",
    "description": "8 industrial system capabilities across partner factories in China",
    "systems": [
        {
            "system_type": sys_name,
            "supplier_type": assets[0]["supplier_capability"]["supplier_type"] if assets else None,
            "asset_count": len(assets),
            "export_potential": assets[0]["supplier_capability"]["export_potential"] if assets else "N/A",
        }
        for sys_name, assets in sorted(assets_by_system.items())
    ],
    "trust_role": "Demonstrates multi-category industrial supply capability",
})

# Factory trust page
if factory_assets:
    factory_usage = defaultdict(list)
    for fa in factory_assets:
        brand = fa["industrial_classification"].get("brand", "unknown")
        factory_usage[brand].append(fa["asset_id"])

    capability_pages.append({
        "capability_type": "factory_network",
        "title": "Partner Manufacturing Facilities",
        "description": "On-site factory photos demonstrating real production capability",
        "factory_count": len(factory_assets),
        "factory_brands": list(factory_usage.keys()),
        "assets": [fa["asset_id"] for fa in factory_assets],
        "trust_role": "Authentic factory photos build buyer trust — verifiable production capability",
        "usage": "About Us page, Capabilities page, OEM/ODM landing page",
    })

# QC / quality page
capability_pages.append({
    "capability_type": "quality_control",
    "title": "Quality Control & Testing",
    "description": "Industrial product QC — pressure testing, performance curves, material certification",
    "systems_covered": list(assets_by_system.keys()),
    "trust_role": "Quality assurance documentation and testing capability demonstration",
})

with open(OUT_DIR / "capability-pages.json", "w", encoding="utf-8") as f:
    json.dump(capability_pages, f, ensure_ascii=False, indent=2)

# ============================================================
# TASK 3: PROCUREMENT ENTRY PAGES
# ============================================================

procurement_pages = []

# Generate buyer problem → solution mapping
buyer_scenarios = [
    {
        "buyer_problem": "I need Atlas Copco / KAESER / CompAir compressor replacement parts",
        "related_systems": ["Air Compressor Systems"],
        "solution_page": "/compressed-air-systems",
        "request_type": "spare_parts_rfq",
    },
    {
        "buyer_problem": "My factory needs a complete compressed air system — compressor + dryer + filters + tank",
        "related_systems": ["Air Compressor Systems"],
        "solution_page": "/compressed-air-systems",
        "request_type": "system_package_rfq",
    },
    {
        "buyer_problem": "I need to replace hydraulic pumps and cylinders on my injection molding machines",
        "related_systems": ["Hydraulic Systems"],
        "solution_page": "/hydraulic-systems",
        "request_type": "component_replacement_rfq",
    },
    {
        "buyer_problem": "Dust collection system for our cement plant — need design + equipment",
        "related_systems": ["Industrial Filtration"],
        "solution_page": "/industrial-filtration",
        "request_type": "system_design_rfq",
    },
    {
        "buyer_problem": "Replacement filter elements — oil, air, hydraulic filters for scheduled maintenance",
        "related_systems": ["Industrial Filtration", "Air Compressor Systems", "Hydraulic Systems"],
        "solution_page": "/industrial-filtration",
        "request_type": "consumable_reorder",
    },
    {
        "buyer_problem": "I need industrial valves for a water treatment pipeline project",
        "related_systems": ["Valves & Flow Control"],
        "solution_page": "/valves-flow-control",
        "request_type": "project_bulk_rfq",
    },
    {
        "buyer_problem": "Centrifugal pump for chemical transfer — SS316, 50m³/h at 40m head",
        "related_systems": ["Pumps & Fluid Handling"],
        "solution_page": "/pumps-fluid-handling",
        "request_type": "spec_rfq",
    },
    {
        "buyer_problem": "Pneumatic cylinders and solenoid valves for new automation line",
        "related_systems": ["Pneumatic Automation"],
        "solution_page": "/pneumatic-automation",
        "request_type": "automation_components_rfq",
    },
    {
        "buyer_problem": "SKF/NSK equivalent bearings — need competitive pricing on bulk orders",
        "related_systems": ["Mechanical Transmission"],
        "solution_page": "/mechanical-transmission",
        "request_type": "bulk_commodity_rfq",
    },
    {
        "buyer_problem": "PLC and VFD for machine retrofit — need programming support",
        "related_systems": ["Industrial Automation & Control"],
        "solution_page": "/automation-control",
        "request_type": "system_integration_rfq",
    },
]

for scenario in buyer_scenarios:
    related_assets = []
    for sys_name in scenario["related_systems"]:
        if sys_name in assets_by_system:
            related_assets.extend([a["asset_id"] for a in assets_by_system[sys_name]])

    procurement_pages.append({
        "buyer_problem": scenario["buyer_problem"],
        "related_systems": scenario["related_systems"],
        "related_assets": related_assets[:3],
        "solution_page": scenario["solution_page"],
        "request_type": scenario["request_type"],
    })

with open(OUT_DIR / "procurement-pages.json", "w", encoding="utf-8") as f:
    json.dump(procurement_pages, f, ensure_ascii=False, indent=2)

# ============================================================
# TASK 4: SEO PAGES
# ============================================================

seo_pages = []

for sys_name, assets in sorted(assets_by_system.items()):
    seo_data = assets[0]["seo"] if assets else {}
    industry_pages = seo_data.get("landing_pages", [])

    for industry_page in industry_pages:
        seo_pages.append({
            "page_title": industry_page.replace("-", " ").title(),
            "url_slug": f"/en/solutions/{industry_page}",
            "target_keyword": seo_data.get("buyer_search_terms", [""])[0] if seo_data.get("buyer_search_terms") else "",
            "system_type": sys_name,
            "related_assets": [a["asset_id"] for a in assets[:3]],
            "industry_intent": "B2B industrial procurement — buyer researching supplier capabilities",
        })

# Also add top-level pages
seo_pages.append({
    "page_title": "Industrial Air Compressor Manufacturer China",
    "url_slug": "/en/solutions/air-compressor-manufacturer-china",
    "target_keyword": "air compressor manufacturer China",
    "system_type": "Air Compressor Systems",
    "related_assets": [a["asset_id"] for a in assets_by_system.get("Air Compressor Systems", [])[:3]],
    "industry_intent": "High-intent buyer search — looking for Chinese compressor supplier",
})
seo_pages.append({
    "page_title": "Industrial Pump Supplier China — Centrifugal, Gear, Screw Pumps",
    "url_slug": "/en/solutions/industrial-pump-supplier-china",
    "target_keyword": "industrial pump supplier China",
    "system_type": "Pumps & Fluid Handling",
    "related_assets": [a["asset_id"] for a in assets_by_system.get("Pumps & Fluid Handling", [])[:3]],
    "industry_intent": "High-intent buyer search — looking for Chinese pump supplier",
})
seo_pages.append({
    "page_title": "China Industrial Valve Manufacturer — Ball, Butterfly, Gate, Check",
    "url_slug": "/en/solutions/china-industrial-valve-manufacturer",
    "target_keyword": "industrial valve manufacturer China",
    "system_type": "Valves & Flow Control",
    "related_assets": [a["asset_id"] for a in assets_by_system.get("Valves & Flow Control", [])[:3]],
    "industry_intent": "High-intent buyer search — looking for Chinese valve supplier",
})

with open(OUT_DIR / "seo-pages.json", "w", encoding="utf-8") as f:
    json.dump(seo_pages, f, ensure_ascii=False, indent=2)

# ============================================================
# TASK 5: ASSET PLACEMENT
# ============================================================

# One role per asset, no conflicts
placement = []

for entry in registry:
    aid = entry["asset_id"]
    st = entry["industrial_classification"]["system_type"]
    at = entry["industrial_classification"]["asset_type"]
    brand = entry["industrial_classification"].get("brand")
    conf = entry["status"]["confidence_level"]

    if at == "factory":
        role = "factory_trust"
        target_page = "/en/about/manufacturing-network"
    elif st and conf == "HIGH":
        # Determine role based on position in system
        sys_assets = assets_by_system.get(st, [])
        idx = next((i for i, a in enumerate(sys_assets) if a["asset_id"] == aid), -1)
        if idx == 0:
            role = "hero"
            target_page = f"/en/solutions/{SYSTEM_PAGE_CONFIG.get(st, {}).get('url_slug', st.lower().replace(' ','-'))}"
        elif idx < 3:
            role = "system_section"
            target_page = f"/en/solutions/{SYSTEM_PAGE_CONFIG.get(st, {}).get('url_slug', st.lower().replace(' ','-'))}"
        else:
            role = "product_support"
            target_page = f"/en/solutions/{SYSTEM_PAGE_CONFIG.get(st, {}).get('url_slug', st.lower().replace(' ','-'))}"
    elif st and conf == "MEDIUM":
        role = "seo_thumbnail"
        target_page = f"/en/solutions/{SYSTEM_PAGE_CONFIG.get(st, {}).get('url_slug', st.lower().replace(' ','-'))}"
    else:
        role = "needs_review"
        target_page = None

    placement.append({
        "asset_id": aid,
        "system_type": st,
        "brand": brand,
        "confidence": conf,
        "placement_role": role,
        "target_page": target_page,
    })

with open(OUT_DIR / "asset-placement.json", "w", encoding="utf-8") as f:
    json.dump(placement, f, ensure_ascii=False, indent=2)

# ============================================================
# TASK 6: PAGE MAPPING (summary)
# ============================================================

page_mapping = {
    "version": "1.0",
    "total_assets": len(registry),
    "generated_pages": {
        "system_pages": len(system_pages),
        "capability_pages": len(capability_pages),
        "procurement_pages": len(procurement_pages),
        "seo_pages": len(seo_pages),
        "total": len(system_pages) + len(capability_pages) + len(procurement_pages) + len(seo_pages),
    },
    "asset_placement_summary": {
        "hero": sum(1 for p in placement if p["placement_role"] == "hero"),
        "system_section": sum(1 for p in placement if p["placement_role"] == "system_section"),
        "product_support": sum(1 for p in placement if p["placement_role"] == "product_support"),
        "factory_trust": sum(1 for p in placement if p["placement_role"] == "factory_trust"),
        "seo_thumbnail": sum(1 for p in placement if p["placement_role"] == "seo_thumbnail"),
        "needs_review": sum(1 for p in placement if p["placement_role"] == "needs_review"),
    },
    "website_modules_supported": [
        "Homepage (hero + system overview)",
        "System Solutions pages (8 systems)",
        "Procurement RFQ entry pages (10 buyer scenarios)",
        "SEO landing pages (30 industry pages)",
        "About Us / Manufacturing Network (factory trust assets)",
        "OEM/ODM capability page",
    ],
}

with open(OUT_DIR / "page-mapping.json", "w", encoding="utf-8") as f:
    json.dump(page_mapping, f, ensure_ascii=False, indent=2)

# ============================================================
# STATS
# ============================================================

print(f"System pages:       {len(system_pages)}")
print(f"Capability pages:   {len(capability_pages)}")
print(f"Procurement pages:  {len(procurement_pages)}")
print(f"SEO pages:          {len(seo_pages)}")
print(f"Total pages mapped: {page_mapping['generated_pages']['total']}")
print(f"\nAsset placement:")
for role, count in page_mapping["asset_placement_summary"].items():
    print(f"  {role}: {count}")
print(f"\nSaved to {OUT_DIR}/")
