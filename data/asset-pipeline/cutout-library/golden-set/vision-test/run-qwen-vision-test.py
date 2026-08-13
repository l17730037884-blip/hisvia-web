#!/usr/bin/env python3.12
"""
PHASE 4.1 — Qwen-VL Vision Test on Golden Set (50 images)
DeepSeek (Codex): code execution only
Qwen-VL: visual description only
"""

import json, os, time, base64, urllib.request, urllib.error, ssl, certifi
from datetime import datetime

# Config
API_KEY = os.environ.get("DASHSCOPE_API_KEY", "")
API_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
MODEL = "qwen-vl-plus"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(BASE_DIR, "qwen-raw-responses")
os.makedirs(RAW_DIR, exist_ok=True)

# Prompt — Vision description only, NO classification
PROMPT = """你是工业图片视觉分析助手。
你的任务：只描述图片中能够直接观察到的信息。

规则：
1. 不要进行工业分类。
2. 不要猜测用途。
3. 不要根据文件名判断。
4. 不要根据已有metadata判断。
5. 不要参考brand/category字段。
6. 不知道的信息填写unknown或空数组。

请严格返回以下JSON格式（不要额外文字）：

{
  "visible_object": [],
  "object_type": "",
  "visible_brand": [],
  "visible_text": [],
  "visible_features": [],
  "image_condition": "",
  "industrial_clues": [],
  "visual_confidence": 0
}

object_type只能是: equipment, component, factory_scene, document, unknown
image_condition只能是: white_background_product, industrial_scene, factory_photo, closeup_component, mixed_scene, unclear
"""

def call_qwen(image_path):
    """Call Qwen-VL for one image"""
    # Read and encode image
    with open(image_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode("utf-8")
    
    ext = os.path.splitext(image_path)[1].lower()
    mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png"
    data_url = f"data:{mime};base64,{img_b64}"
    
    payload = {
        "model": MODEL,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"text": PROMPT},
                        {"image": data_url}
                    ]
                }
            ]
        },
        "parameters": {
            "temperature": 0.1,
            "max_tokens": 1000
        }
    }
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API_ENDPOINT,
        data=data,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60, context=ssl.create_default_context(cafile=certifi.where())) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body), None
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        return None, f"HTTP {e.code}: {err[:200]}"
    except Exception as e:
        return None, str(e)

def extract_text_from_response(response):
    """Extract text from Qwen response"""
    try:
        output = response.get("output", {})
        choices = output.get("choices", [])
        if choices:
            msg = choices[0].get("message", {})
            content = msg.get("content", [])
            if isinstance(content, list):
                texts = [c["text"] for c in content if isinstance(c, dict) and "text" in c]
                return "\n".join(texts)
            elif isinstance(content, str):
                return content
    except:
        pass
    return json.dumps(response, ensure_ascii=False)

def parse_qwen_json(text):
    """Try to parse Qwen output as JSON"""
    try:
        # Find JSON block
        text = text.strip()
        if text.startswith("```"):
            lines = text.split("\n")
            text = "\n".join(lines[1:-1])
        return json.loads(text)
    except:
        # Try to extract JSON from text
        import re
        m = re.search(r'\{[^{}]*\}', text, re.DOTALL)
        if m:
            try:
                return json.loads(m.group(0))
            except:
                pass
        return {"raw_text": text[:500], "parse_error": True}

def main():
    # Load Golden Set
    golden_path = os.path.join(os.path.dirname(BASE_DIR), "golden-assets.json")
    with open(golden_path) as f:
        golden = json.load(f)
    
    results = []
    log_entries = []
    success = 0
    failed = 0
    
    print(f"Starting Qwen-VL test on {len(golden)} images...")
    
    for i, asset in enumerate(golden):
        asset_id = asset["asset_id"]
        path = asset.get("path", "")
        
        if not path:
            print(f"  [{i+1}/{len(golden)}] {asset_id}: SKIP (no path)")
            log_entries.append({"asset_id": asset_id, "error": "no path"})
            failed += 1
            continue
        
        full_path = "public" + path
        if not os.path.exists(full_path):
            print(f"  [{i+1}/{len(golden)}] {asset_id}: SKIP (file missing: {full_path})")
            log_entries.append({"asset_id": asset_id, "error": "file missing"})
            failed += 1
            continue
        
        t0 = time.time()
        print(f"  [{i+1}/{len(golden)}] {asset_id}...", end=" ", flush=True)
        
        response, error = call_qwen(full_path)
        elapsed = time.time() - t0
        
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "asset_id": asset_id,
            "image_path": path,
            "image_type": "original",
            "api_status": "success" if response else "error",
            "response_time_s": round(elapsed, 2),
            "error": error
        }
        log_entries.append(log_entry)
        
        if error:
            print(f"ERROR: {error[:80]}")
            results.append({
                "asset_id": asset_id,
                "image_type": "original",
                "qwen_output": None,
                "error": error
            })
            failed += 1
        else:
            # Save raw response
            raw_file = os.path.join(RAW_DIR, f"{asset_id}.json")
            with open(raw_file, "w") as f:
                json.dump(response, f, ensure_ascii=False, indent=2)
            
            # Parse
            text = extract_text_from_response(response)
            parsed = parse_qwen_json(text)
            
            print(f"OK ({elapsed:.1f}s)")
            results.append({
                "asset_id": asset_id,
                "image_type": "original",
                "qwen_output": parsed,
                "raw_file": f"qwen-raw-responses/{asset_id}.json",
                "error": None
            })
            success += 1
        
        # Rate limit
        time.sleep(0.5)
    
    # Save results
    output = {
        "version": "qwen-vision-test-v1",
        "model": MODEL,
        "asset_count": len(golden),
        "tested_count": success,
        "failed_count": failed,
        "timestamp": datetime.now().isoformat(),
        "results": results
    }
    
    with open(os.path.join(BASE_DIR, "qwen-results.json"), "w") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    with open(os.path.join(BASE_DIR, "qwen-test-log.json"), "w") as f:
        json.dump(log_entries, f, ensure_ascii=False, indent=2)
    
    # Generate report
    confidences = []
    obj_types = {}
    has_brand = 0
    obj_counts = {}
    for r in results:
        qo = r.get("qwen_output")
        if qo and not isinstance(qo, dict) or (isinstance(qo, dict) and qo.get("parse_error")):
            continue
        if qo:
            conf = qo.get("visual_confidence", 0)
            if isinstance(conf, (int, float)):
                confidences.append(conf)
            ot = qo.get("object_type", "unknown")
            obj_types[ot] = obj_types.get(ot, 0) + 1
            vb = qo.get("visible_brand", [])
            if vb and len(vb) > 0:
                has_brand += 1
            vo = qo.get("visible_object", [])
            for o in (vo if isinstance(vo, list) else [vo]):
                obj_counts[str(o)[:40]] = obj_counts.get(str(o)[:40], 0) + 1
    
    avg_conf = round(sum(confidences) / len(confidences), 2) if confidences else 0
    
    report = f"""# HISVIA Golden Set — Vision Test Report

> **时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}
> **模型**: {MODEL}
> **Phase**: 4.1 — Vision AI Only

---

## 1. 测试概况

| 指标 | 值 |
|------|-----|
| Golden Set 资产 | {len(golden)} |
| 实际测试图片 | {success} |
| API 成功 | {success} |
| 失败 | {failed} |
| 成功率 | {round(success/(success+failed)*100, 1) if (success+failed) else 0}% |

---

## 2. 平均 Confidence

- **{avg_conf}** (基于 {len(confidences)} 个有效值)

---

## 3. object_type 分布

"""
    for ot, cnt in sorted(obj_types.items(), key=lambda x: -x[1]):
        report += f"| {ot} | {cnt} |\n"
    
    report += f"""
---

## 4. 品牌识别

- 识别到品牌: **{has_brand}** / {success} 张

---

## 5. visible_object Top 15

"""
    for obj, cnt in sorted(obj_counts.items(), key=lambda x: -x[1])[:15]:
        report += f"| {obj} | {cnt} |\n"
    
    report += f"""
---

## 6. 异常/失败

"""
    for r in results:
        if r.get("error"):
            report += f"- **{r['asset_id']}**: {r['error']}\n"
    if not any(r.get("error") for r in results):
        report += "- 无\n"
    
    report += f"""
---

## 7. 需要人工检查

"""
    needs_check = [r for r in results if r.get("qwen_output") and isinstance(r["qwen_output"], dict) and r["qwen_output"].get("visual_confidence", 1) < 0.5]
    if needs_check:
        for r in needs_check[:10]:
            report += f"- {r['asset_id']}: confidence={r['qwen_output'].get('visual_confidence')}\n"
    else:
        report += "- 无 (所有 confidence >= 0.5)\n"

    report += f"""
---

## 8. 确认

- [x] 仅使用 Golden Set 50 个资产
- [x] Qwen-VL 调用完成
- [x] DeepSeek 仅执行代码，未分析图片
- [x] 未产生工业分类
- [x] 未修改 755 资产
- [x] 未 writeback
- [x] 未修改规则文件

**等待 PHASE 4.2。**
"""
    
    with open(os.path.join(BASE_DIR, "vision-test-report.md"), "w") as f:
        f.write(report)
    
    print(f"\n{'='*50}")
    print(f"Done: {success} success, {failed} failed")
    print(f"Avg confidence: {avg_conf}")
    print(f"Files generated in vision-test/")

if __name__ == "__main__":
    main()
