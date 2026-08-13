# AGENTS.md — HISVIA Web

## 最关键规则

**本工程使用的模型是纯文本模型，严禁调用任何图像分析/截图/识图工具。**

禁止使用：
- `view_image`
- Playwright 截图后分析
- 任何试图“看”图片的MCP工具
- 任何试图分析视觉输出的工具

所有视觉判断必须基于：
1. 设计规则文档中的明确描述
2. Qwen Vision 的输出（由用户在外部提供）
3. 代码结构分析

## 设计原则

参考工业品牌官网：Siemens, ABB, Schneider Electric, Bosch Industrial, Rockwell Automation

禁止模式：
- rounded cards / SaaS cards
- dashboard / 数据大屏
- center circle network UI
- AI科技感
- 工厂官网风格

要求：
- 大尺寸摄影
- 强排版
- 编辑式布局
- 不对称比例
- 工业细节
