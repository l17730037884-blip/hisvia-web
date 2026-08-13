/**
 * HISVIA Requirement Parser
 * Converts natural language buyer descriptions → structured industrial requirements.
 *
 * Rule-based keyword matching. No AI calls.
 */

import type { SystemType } from "../types";
import type { ParsedRequirement } from "./buyer-types";

// ============================================================
// Keyword → System Type mapping (multi-language)
// ============================================================

const SYSTEM_KEYWORDS: Record<SystemType, string[]> = {
  "Air Compressor Systems": [
    "compressor", "compressed air", "air compressor", "air end",
    "oil separator", "air dryer", "air receiver", "air filter",
    "compressor filter", "compressor part",
    "空压机", "压缩机", "冷干机",
  ],
  "Hydraulic Systems": [
    "hydraulic", "hydraulic pump", "hydraulic motor", "hydraulic cylinder",
    "hydraulic valve", "hydraulic power", "hpu", "hydraulic system",
    "液压", "液压泵", "液压站",
  ],
  "Pneumatic Automation": [
    "pneumatic", "pneumatic cylinder", "pneumatic valve", "solenoid",
    "air cylinder", "frl", "pneumatic actuator", "air fitting",
    "气动", "气缸", "电磁阀",
  ],
  "Industrial Filtration": [
    "filter", "filtration", "dust collector", "dust collection",
    "filter element", "filter cartridge", "hepa", "baghouse",
    "air filtration", "oil filter", "hydraulic filter",
    "过滤", "滤芯", "除尘", "过滤器",
  ],
  "Pumps & Fluid Handling": [
    "pump", "centrifugal pump", "gear pump", "screw pump",
    "diaphragm pump", "vacuum pump", "water pump", "fluid handling",
    "泵", "离心泵", "水泵",
  ],
  "Valves & Flow Control": [
    "valve", "ball valve", "butterfly valve", "gate valve",
    "check valve", "control valve", "safety valve", "flow control",
    "阀", "阀门", "球阀",
  ],
  "Mechanical Transmission": [
    "bearing", "gear", "coupling", "shaft", "seal",
    "mechanical seal", "belt drive", "chain drive", "power transmission",
    "轴承", "齿轮", "联轴器", "密封",
  ],
  "Industrial Automation & Control": [
    "plc", "controller", "sensor", "vfd", "servo", "drive",
    "hmi", "automation", "control panel", "io module",
    "传感器", "控制器", "变频器", "PLC", "自动化",
  ],
};

// Industry keywords
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  "Mining": ["mining", "mine", "mineral", "矿山", "采矿"],
  "Oil & Gas": ["oil", "gas", "petroleum", "petrochemical", "石油", "天然气"],
  "Construction": ["construction", "building", "infrastructure", "建筑", "工程"],
  "Manufacturing": ["manufacturing", "factory", "production", "制造", "工厂"],
  "Food & Beverage": ["food", "beverage", "drink", "食品", "饮料"],
  "Pharmaceutical": ["pharma", "pharmaceutical", "drug", "制药", "医药"],
  "Chemical": ["chemical", "chemical processing", "化工", "化学"],
  "Water Treatment": ["water", "wastewater", "treatment", "水处理", "污水"],
  "Power Generation": ["power", "energy", "electricity", "发电", "电力"],
  "Automotive": ["automotive", "car", "vehicle", "汽车", "车辆"],
  "Marine": ["marine", "ship", "offshore", "船舶", "海洋"],
  "Textile": ["textile", "fabric", "纺织"],
  "Cement": ["cement", "concrete", "水泥"],
  "Steel": ["steel", "metal", "iron", "钢铁", "金属"],
  "Electronics": ["electronics", "semiconductor", "电子", "半导体"],
};

// Brand keywords
const BRAND_KEYWORDS: Record<string, string> = {
  "atlas copco": "Atlas Copco",
  "atlas": "Atlas Copco",
  "kaeser": "KAESER",
  "compair": "CompAir",
  "gardner denver": "Gardner Denver",
  "gardner": "Gardner Denver",
  "ingersoll rand": "Ingersoll Rand",
  "ingersoll": "Ingersoll Rand",
  "sullair": "Sullair",
  "boge": "BOGE",
  "fusheng": "Fusheng",
  "donaldson": "Donaldson",
  "donaldson torit": "Donaldson Torit",
  "parker": "Parker",
  "bosch rexroth": "Bosch Rexroth",
  "rexroth": "Bosch Rexroth",
  "festo": "FESTO",
  "smc": "SMC",
  "abb": "ABB",
  "siemens": "SIEMENS",
  "schneider": "Schneider",
  "beckhoff": "Beckhoff",
  "mitsubishi": "Mitsubishi",
  "delta": "Delta",
  "omron": "Omron",
  "skf": "SKF",
  "nsk": "NSK",
  "fag": "FAG",
};

// ============================================================
// Parser
// ============================================================

export function parseRequirement(description: string): ParsedRequirement {
  const desc = description.toLowerCase();

  // Detect system type
  let bestSystem: SystemType | null = null;
  let bestSystemConf = 0;
  for (const [system, keywords] of Object.entries(SYSTEM_KEYWORDS)) {
    let matches = 0;
    for (const kw of keywords) {
      if (desc.includes(kw.toLowerCase())) matches++;
    }
    const conf = Math.min(matches / 2, 1.0);
    if (conf > bestSystemConf) {
      bestSystemConf = conf;
      bestSystem = system as SystemType;
    }
  }

  // Detect brand
  let bestBrand: string | null = null;
  let bestBrandConf = 0;
  for (const [kw, brand] of Object.entries(BRAND_KEYWORDS)) {
    if (desc.includes(kw.toLowerCase())) {
      bestBrand = brand;
      bestBrandConf = 0.9;
      break;
    }
  }

  // Detect industry
  let bestIndustry: string | null = null;
  let bestIndustryConf = 0;
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    for (const kw of keywords) {
      if (desc.includes(kw.toLowerCase())) {
        bestIndustry = industry;
        bestIndustryConf = 0.8;
        break;
      }
    }
    if (bestIndustry) break;
  }

  // Extract category keywords
  const categoryKeywords = [
    "filter", "separator", "dryer", "receiver", "valve", "pump",
    "cylinder", "motor", "bearing", "gear", "seal", "coupling",
    "controller", "sensor", "drive", "hmi", "plc",
    "滤芯", "过滤器", "阀门", "泵", "气缸", "轴承",
  ];
  const foundKeywords = categoryKeywords.filter((kw) =>
    desc.includes(kw.toLowerCase())
  );

  return {
    system_type: bestSystem,
    system_confidence: bestSystemConf,
    category: foundKeywords.length > 0 ? foundKeywords[0] : null,
    category_confidence: foundKeywords.length > 0 ? 0.6 : 0,
    brand: bestBrand,
    brand_confidence: bestBrandConf,
    industry: bestIndustry,
    industry_confidence: bestIndustryConf,
    keywords: foundKeywords,
    raw_description: description,
  };
}
