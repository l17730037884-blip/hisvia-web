import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const CUTOUT_DIR = path.join(PUBLIC_DIR, "assets", "cutout_results");
const ASSET_INDEX = path.join(PUBLIC_DIR, "assets", "asset-index.json");
const RESULTS_V6 = path.join(PUBLIC_DIR, "assets", "cutout_results", "results_v6.json");
const ARCHIVE_DIR = path.join(PUBLIC_DIR, "assets", "products");
const REVIEW_HTML = path.join(PUBLIC_DIR, "assets", "cutout_review.html");
const GENERATOR = path.join(process.cwd(), "scripts", "regenerate_review_html.py");

function regenerateHTML() {
  try {
    execSync(`python3 "${GENERATOR}" "${RESULTS_V6}" "${REVIEW_HTML}" "${ASSET_INDEX}"`, {
      timeout: 30000,
    });
    return true;
  } catch (e: any) {
    console.error("Failed to regenerate HTML:", e.message);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, filename } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing action" }, { status: 400 });
    }

    if (action === "archive_all") {
      return handleArchiveAll();
    }

    if (!filename) {
      return NextResponse.json({ error: "Missing filename" }, { status: 400 });
    }

    const result: any = {};

    if (action === "abandon") {
      const deleted: string[] = [];
      
      const cutoutFile = path.join(CUTOUT_DIR, `${filename}_nobg.png`);
      if (fs.existsSync(cutoutFile)) {
        fs.unlinkSync(cutoutFile);
        deleted.push(`${filename}_nobg.png`);
      }

      for (const v of ["_edge_dilate", "_birefnet", "_floodfill"]) {
        const vf = path.join(CUTOUT_DIR, `${filename}_nobg${v}.png`);
        if (fs.existsSync(vf)) {
          fs.unlinkSync(vf);
          deleted.push(`${filename}_nobg${v}.png`);
        }
      }

      // Update asset-index.json
      if (fs.existsSync(ASSET_INDEX)) {
        const assetIndex = JSON.parse(fs.readFileSync(ASSET_INDEX, "utf-8"));
        const assets = Array.isArray(assetIndex) ? assetIndex : (assetIndex.assets || []);
        for (const a of assets) {
          if (a.id === filename || a.asset_id === filename) {
            a.cutout_status = "abandoned";
            a.no_cutout = true;
            delete a.cutout_path;
          }
        }
        fs.writeFileSync(ASSET_INDEX, JSON.stringify(assetIndex, null, 2));
      }

      // Remove from results_v6.json
      if (fs.existsSync(RESULTS_V6)) {
        const rv6 = JSON.parse(fs.readFileSync(RESULTS_V6, "utf-8"));
        rv6.results = (rv6.results || []).filter(
          (r: any) => r.filename !== filename && r.asset_id !== filename
        );
        rv6.done = rv6.results.length;
        rv6.passed = rv6.results.filter((r: any) => r.qc?.verdict === "PASS").length;
        rv6.review = rv6.results.filter((r: any) => r.qc?.verdict === "REVIEW").length;
        rv6.failed = rv6.results.filter((r: any) => r.qc?.verdict === "FAIL").length;
        rv6.total = rv6.results.length;
        fs.writeFileSync(RESULTS_V6, JSON.stringify(rv6, null, 2));
      }

      // Regenerate the review HTML
      result.html_regenerated = regenerateHTML();

      result.deleted = deleted;
      result.message = "原图已回归资产库原位置";
    } else if (action === "keep") {
      if (fs.existsSync(ASSET_INDEX)) {
        const assetIndex = JSON.parse(fs.readFileSync(ASSET_INDEX, "utf-8"));
        // asset-index.json is a flat array, not {assets: [...]}
        const assets = Array.isArray(assetIndex) ? assetIndex : (assetIndex.assets || []);
        for (const a of assets) {
          if (a.id === filename || a.asset_id === filename) {
            a.cutout_status = "confirmed";
          }
        }
        fs.writeFileSync(ASSET_INDEX, JSON.stringify(assetIndex, null, 2));
      }
      result.updated = true;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, ...result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

async function handleArchiveAll() {
  if (!fs.existsSync(ASSET_INDEX)) {
    return NextResponse.json({ error: "asset-index.json not found" }, { status: 404 });
  }

  const assetIndex = JSON.parse(fs.readFileSync(ASSET_INDEX, "utf-8"));
  const assets = Array.isArray(assetIndex) ? assetIndex : (assetIndex.assets || []);

  if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  }

  let archived = 0;
  let cleaned = 0;
  const skipped: string[] = [];

  // First, archive confirmed cutouts
  for (const a of assets) {
    if (a.cutout_status !== "confirmed") continue;
    const assetId = a.id || a.asset_id;
    if (!assetId) continue;

    const cutoutFile = path.join(CUTOUT_DIR, `${assetId}_nobg.png`);
    if (!fs.existsSync(cutoutFile)) {
      skipped.push(assetId);
      continue;
    }

    const origName = a.original_filename || a.filename || assetId;
    const stem = path.parse(origName).name;
    const archiveFile = path.join(ARCHIVE_DIR, `${stem}_nobg.png`);
    fs.copyFileSync(cutoutFile, archiveFile);

    a.cutout_path = `/assets/products/${stem}_nobg.png`;
    a.cutout_status = "archived";
    a.archived_at = new Date().toISOString();
    archived++;
  }

  // Then, clean up unconfirmed from the pipeline results
  // Only clean assets that actually went through the cutout pipeline (in results_v6.json)
  let pipelineAssetIds: Set<string> = new Set();
  if (fs.existsSync(RESULTS_V6)) {
    const rv6 = JSON.parse(fs.readFileSync(RESULTS_V6, "utf-8"));
    for (const r of (rv6.results || [])) {
      pipelineAssetIds.add(r.filename);
      if (r.asset_id) pipelineAssetIds.add(r.asset_id);
    }
  }
  
  for (const a of assets) {
    const assetId = a.id || a.asset_id;
    if (!assetId) continue;
    // Only clean assets that were in the pipeline
    if (!pipelineAssetIds.has(assetId)) continue;
    if (a.cutout_status === "confirmed" || a.cutout_status === "archived" || a.cutout_status === "abandoned") continue;

    // Delete cutout files
    const cutoutFile = path.join(CUTOUT_DIR, `${assetId}_nobg.png`);
    if (fs.existsSync(cutoutFile)) {
      fs.unlinkSync(cutoutFile);
    }
    for (const v of ["_edge_dilate", "_birefnet", "_floodfill"]) {
      const vf = path.join(CUTOUT_DIR, `${assetId}_nobg${v}.png`);
      if (fs.existsSync(vf)) fs.unlinkSync(vf);
    }

    a.cutout_status = "returned";
    a.no_cutout = true;
    delete a.cutout_path;
    cleaned++;
  }

  // Write back in the original format (array or {assets: [...]})
  const toWrite = Array.isArray(assetIndex) ? assets : assetIndex;
  fs.writeFileSync(ASSET_INDEX, JSON.stringify(toWrite, null, 2));

  return NextResponse.json({ success: true, archived, cleaned, skipped: skipped.length });
}
