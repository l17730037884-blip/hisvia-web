# Homepage Image Review

## 现有图片审查

| 图片 | 大小 | 用途 | 是否符合 | 原因 |
|------|------|------|----------|------|
| equipment-cutout.webp | 15KB | 设备抠图小图 | ❌ 不适合Hero | 尺寸过小，无法作为大型工业视觉使用 |
| equipment-product.png | 660KB | 产品图 | ❌ 不适合Hero | 疑似白底产品图，用户明确要求Hero不使用白底产品图 |
| factory-office.png | 3.3MB | 工厂/办公室 | ⚠️ 待验证 | 尺寸足够，但无法确认是否为旧厂房或杂乱环境，需人工目视确认 |

## 决策

现有3张图片均不适合直接用于Hero区域。采用以下替代方案：

1. **Hero视觉**：使用 `asset-resolver` 从755张已验证设备图中选取高质量品牌整机图（如 Atlas Copco / Ingersoll Rand 螺杆压缩机），配合深色渐变遮罩融入背景
2. **8大系统区**：每个系统使用 `getHeroImage(systemType)` 获取对应设备图
3. **制造能力区**：使用 `getAssetsWithCutout()` 获取已抠图设备展示
4. **不强行使用**不合格的stock图，所有图片来自已验证的工厂数据库

## 待办

- [ ] 人工目视确认 factory-office.png 内容，若为高质量工厂实拍可用于制造能力区
- [ ] 后续可补充专业工业摄影图（工厂全景、CNC加工、质检场景）
