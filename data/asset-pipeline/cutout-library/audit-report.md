# HISVIA Cutout Asset Library — Audit Report

> **生成时间**: 2026-08-10 22:10
> **数据源**: public/assets/asset-index.json
> **范围**: 仅 755 条资产

---

## 1. 读取数据

- 文件: `public/assets/asset-index.json`
- 记录数: **755**
- asset_id 唯一性: **✅ 全部唯一**

---

## 2. 文件存在性

- 原图路径存在: 737/755
- 原图缺失: 18
- 抠图路径存在: 276/276
- 抠图缺失: 0

---

## 3. cutout_status 分布

| 状态 | 数量 | 说明 |
|------|------|------|
| archived | 276 | 抠图已归档 |
| returned | 69 | 回归原图 |
| abandoned | 12 | 人工放弃 |
| none | 398 | 未进入管线 |

---

## 4. 字段完整率

| 字段 | 填充率 |
|------|--------|
| subcategory | ░░░░░░░░░░ 0.0% |
| ai_detected_product | ░░░░░░░░░░ 0.0% |
| ai_tags | ░░░░░░░░░░ 0.0% |
| ai_description | ░░░░░░░░░░ 0.0% |
| page_recommendation | ░░░░░░░░░░ 0.0% |
| brand | ██░░░░░░░░ 22.4% |
| notes | █████████░ 93.0% |
| category | █████████░ 97.9% |
| id | ██████████ 100.0% |
| original_filename | ██████████ 100.0% |
| path | ██████████ 100.0% |
| extension | ██████████ 100.0% |
| file_size | ██████████ 100.0% |
| asset_type | ██████████ 100.0% |
| source_group | ██████████ 100.0% |
| confidence | ██████████ 100.0% |
| status | ██████████ 100.0% |
| recommended_usage | ██████████ 100.0% |

---

## 5. 缺失字段 (<50%)

- **subcategory**: 0.0%
- **ai_detected_product**: 0.0%
- **ai_tags**: 0.0%
- **ai_description**: 0.0%
- **page_recommendation**: 0.0%
- **brand**: 22.4%

---

## 6. 下一步

- 755 条资产待 enrichment (AI_ENRICHMENT_PENDING)
- 需补充: system_type, subcategory, application
- 当前不可直接用于 HISVIA 网站
