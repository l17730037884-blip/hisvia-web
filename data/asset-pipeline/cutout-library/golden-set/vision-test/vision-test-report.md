# HISVIA Golden Set — Vision Test Report

> **时间**: 2026-08-10 22:40
> **模型**: qwen-vl-plus (DashScope)
> **Phase**: 4.1 — Vision AI Only

---

## 1. 测试概况

| 指标 | 值 |
|------|-----|
| Golden Set | 50 |
| 测试成功 | 49 |
| 失败 | 1 |
| 成功率 | 98% |

---

## 2. Confidence

- **平均**: 0.98 (0-1)
- 范围: 0.95 ~ 1

---

## 3. object_type 分布

| Type | Count |
|------|-------|
| equipment | 23 |
| component | 16 |
| factory_scene | 10 |

---

## 4. image_condition

| Condition | Count |
|-----------|-------|
| white_background_product | 31 |
| industrial_scene | 9 |
| factory_photo | 9 |

---

## 5. 品牌识别

- 识别到品牌: **25** / 49
- 品牌列表: ABB, Atlas Copco, KAESER, CompAir, SIEMENS, Donaldson, KUKA, SULZER, FESTO, Gardner Denver, Vickers/Eaton, Omron, ABB 等

---

## 6. visible_object Top 20

| equipment | 7 |
| pump | 7 |
| motor | 6 |
| building | 6 |
| component | 6 |
| valve | 5 |
| bearing | 4 |
| signboard | 4 |
| gate | 4 |
| filter | 3 |
| conveyor_belt | 3 |
| safety_barrier | 3 |
| robot_arm | 3 |
| trees | 3 |
| cars | 3 |
| machine | 2 |
| control_panel | 2 |
| hoses | 2 |
| cylinder | 2 |
| pressure_gauge | 2 |

---

## 7. 失败

- 无

---

## 8. 确认

- [x] 仅使用 Golden Set 50 个资产
- [x] Qwen-VL 调用完成 (49/50)
- [x] DeepSeek 仅执行代码，未分析图片
- [x] 未产生工业分类 (无 system_type/category)
- [x] 未修改 755 资产
- [x] 未 writeback
- [x] 未修改规则文件

**等待 PHASE 4.2 (Industrial Classification)。**
