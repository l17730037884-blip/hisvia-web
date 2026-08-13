# HISVIA Golden Set — Selection Report

> **时间**: 2026-08-10 22:21
> **版本**: golden-set-v1
> **数量**: 50 个 asset_id

---

## 1. 为什么选择这50个？

基于「风险分层 + 分类覆盖 + 视觉覆盖 + 品牌覆盖 + cutout覆盖」策略，
从755条资产中非随机选取，优先暴露分类系统的潜在问题。

---

## 2. System 覆盖

| System Type | Count |
|-------------|-------|
| Air Compressor Systems | 7 |
| Hydraulic Systems | 5 |
| Pneumatic Automation | 0 |
| Industrial Filtration | 6 |
| Pumps & Fluid Handling | 5 |
| Valves & Flow Control | 5 |
| Industrial Automation & Control | 11 |
| Mechanical Transmission | 4 |

**未覆盖**: ['Pneumatic Automation']

---

## 3. 高风险类别覆盖

| Risk | Count |
|------|-------|
| high_cross_system (filter/seal/bearing等) | 12 |
| medium_classification (pump/valve等) | 26 |
| non_industrial (factory) | 5 |
| standard | 7 |

**高风险类别明细:**
- filter: 6
- seal: 2
- bearing: 3
- coupling: 1

---

## 4. 品牌覆盖

| Status | Count |
|--------|-------|
| 有品牌 | 11 |
| 无品牌 | 39 |

---

## 5. Cutout 覆盖

| Status | Count |
|--------|-------|
| archived (有抠图) | 19 |
| 无抠图 | 31 |

---

## 6. Factory

- Factory 资产: **5** 张
- 来源: _factory 目录

---

## 7. Ambiguous / Cross-system

- seal 类 (跨系统): 2 张
- 系统归属 ambiguous 资产: 7 张

---

## 8. 视觉难度覆盖

| Difficulty | Count |
|------------|-------|
| A_clean_product | 7 |
| B_complex_equipment | 36 |
| C_partial_component | 0 |
| D_has_brand | 2 |
| E_no_brand_info | 0 |
| F_multi_object | 0 |
| G_factory_scene | 5 |
| H_low_visual_info | 0 |

---

## 9. 未达到的覆盖目标

- **Pneumatic Automation**: 0 张 (755中无明确对应分类)

---

## 10. 一致性检查

- [x] 50 个 asset_id 全部唯一
- [x] 全部来自 assets-v2.json (755)
- [x] 无重复 asset_id
- [x] 无新增 asset_id
- [x] 无 AI 结果 (所有 vision_result=null)
- [x] 无人工审核结果
- [x] 未修改任何源文件
- [x] coverage-matrix 有效

---

## 11. 确认

- [x] 未调用 Qwen
- [x] 未调用 DeepSeek
- [x] 未调用任何 AI
- [x] 未修改 assets-v2.json
- [x] 未修改 asset-index.json
- [x] Golden Set 仅为测试集

**等待 PHASE 4 指令。**
