# HISVIA Asset Pipeline V2 — Rules Audit Report

> **时间**: 2026-08-10 22:16
> **状态**: ✅ PHASE 2 完成

---

## 文件列表

```
data/asset-pipeline/cutout-library/rules/
├── taxonomy-v1.json
├── ai-enrichment-schema-v1.json
├── classification-rules-v1.json
├── validation-rules-v1.json
└── rules-audit.md
```

---

## Taxonomy 摘要

| 指标 | 值 |
|------|-----|
| system_type | 8 (固定) |
| category | 34 |
| subcategory | 1762 |
| asset_type 枚举 | 7 |
| 跨系统规则 | 3 |
| 禁止作为 system | 11 |

---

## AI Schema 摘要

| 指标 | 值 |
|------|-----|
| Stage | 2 (Vision + Industrial) |
| Stage A 输出字段 | 5 |
| Stage B 输出字段 | 9 |
| 模型建议 | Qwen-VL → DeepSeek/GPT-4 |

---

## Classification Rules

| ID | Rule | Severity |
|----|------|----------|
| R001 | Brand is NOT a taxonomy level | error |
| R002 | Factory: asset_type=factory, system_type=null | error |
| R003 | Seal: asset_type=component, system_type may be null | error |
| R004 | Filter: must sub-type before system assignment | error |
| R005 | Oil Separator → Air Compressor Systems → Compressor Components | warning |
| R006 | Dryer → Air Compressor Systems → Air Treatment | warning |
| R007 | Pump → Pumps & Fluid Handling | warning |
| R008 | Valve → Valves & Flow Control | warning |
| R009 | Unknown is ALWAYS acceptable | error |
| R010 | AI must not override human-reviewed fields | error |

**总数: 10**

---

## Validation Rules

| ID | Check | Severity |
|----|-------|----------|
| V001 | system_type must be from allowed enum or null | error |
| V002 | system_type must not be 'Factory' | error |
| V003 | Forbidden as system_type: Seal, Filter, Bearing, etc. | error |
| V004 | asset_type must be valid enum | error |
| V005 | confidence must be 0-1 | error |
| V006 | null/unknown/ambiguous are valid and must not be rejected | info |
| V007 | category must exist in taxonomy for given system_type | warning |
| V008 | AI must not overwrite human-locked fields | error |
| V009 | AI output must be valid JSON matching Stage B schema | error |

**总数: 9**

---

## 确认

- [x] 未调用 Qwen API
- [x] 未调用 DeepSeek API
- [x] 未修改 assets-v2.json
- [x] 未修改 asset-index.json
- [x] 未处理任何图片

**等待 PHASE 3 指令。**
