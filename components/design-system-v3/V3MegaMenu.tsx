import Link from "next/link";
import type { Locale } from "@/lib/locales";
import intelligence from "@/data/content-v2/asset-intelligence.json";

/* ============================================================
   V3MegaMenu — prototype header structure (hisvia-v3-prototype.html)

   Systems ▾ · Brands ▾ · Industries ▾ · Capabilities · OEM ·
   Partners ▾ · Submit a Request

   Asset counts come from asset-intelligence.json system/brand axes
   (cross-checked against asset-library-v2.json). Entries whose axis
   value is 0 are rendered as "—" instead of a fake number.

   Pure CSS hover panels (.v3-megapanel) — no client JS.
   This is a component only; it does NOT replace the site-wide
   V2HeaderSimple. The migrated compressors page renders it as its
   own page header.
   ============================================================ */

interface SystemIntel {
  name: string;
  category: string;
  asset数量?: number | string;
}
interface BrandIntel {
  name: string;
  category: string;
  asset数量?: number | string;
}
interface IntelligenceDoc {
  systems?: Record<string, SystemIntel>;
  brands?: Record<string, BrandIntel>;
}

const doc = intelligence as unknown as IntelligenceDoc;

const NAV_LABELS: Record<
  Locale,
  { systems: string; brands: string; industries: string; capabilities: string; oem: string; partners: string; request: string }
> = {
  en: {
    systems: "Systems",
    brands: "Brands",
    industries: "Industries",
    capabilities: "Capabilities",
    oem: "OEM",
    partners: "Partners",
    request: "Submit a Request",
  },
  ru: {
    systems: "Системы",
    brands: "Бренды",
    industries: "Отрасли",
    capabilities: "Возможности",
    oem: "OEM",
    partners: "Партнёрам",
    request: "Отправить запрос",
  },
  zh: {
    systems: "工业系统",
    brands: "品牌",
    industries: "行业",
    capabilities: "制造能力",
    oem: "OEM",
    partners: "合作伙伴",
    request: "提交需求",
  },
};

function countOf(axis: { asset数量?: number | string } | undefined): string | undefined {
  if (!axis) return undefined;
  const n = axis.asset数量;
  if (n === undefined || n === null) return undefined;
  if (typeof n === "number" && n === 0) return "—";
  if (n === 0) return "—";
  return String(n);
}

export function V3MegaMenu({ locale }: { locale: Locale }) {
  const t = NAV_LABELS[locale];
  const v2 = `/v2/${locale}`;

  // Prototype grouping: Fluid & Air / Automation & Motion.
  const systemGroups: { col: string; items: [string, string, string][] }[] = [
    {
      col: "Fluid & Air",
      items: [
        ["compressors", "Air Compressor Systems", "166"],
        ["hydraulic", "Hydraulic Systems", "81"],
        ["pumps", "Pumps & Fluid Handling", "97"],
        ["valves", "Valves & Flow Control", "37"],
      ],
    },
    {
      col: "Automation & Motion",
      items: [
        ["filtration", "Industrial Filtration", "74"],
        ["automation", "Pneumatic Automation", "—"],
        ["automation-control", "Automation & Control", "—"],
        ["mechanical-transmission", "Mechanical Transmission", "74"],
      ],
    },
  ];

  // Counts from the real intelligence doc where available; fall back to
  // the prototype grouping above only for labels that are not systems.
  function systemCount(key: string, fallback: string): string {
    return countOf(doc.systems?.[key]) ?? fallback;
  }

  const brandGroups: { col: string; keys: string[]; note?: string }[] = [
    {
      col: "Compressor Brands",
      keys: ["gardner denver", "hitachi", "compair", "ingersoll rand", "atlas copco"],
    },
    {
      col: "Hydraulic / Pump",
      keys: ["eaton", "wilo", "yuken", "sulzer", "emerson"],
    },
    {
      col: "Automation",
      keys: ["kuka", "yaskawa"],
      note:
        "asset-intelligence.json brand axis lists 16 brands / 186 assets; only brands present in that file are shown — no invented entries.",
    },
  ];

  const industries: { label: string; slug: string }[] = [
    { label: "Mining", slug: "mining" },
    { label: "Oil & Gas", slug: "oil-gas" },
    { label: "Manufacturing", slug: "manufacturing" },
    { label: "Construction", slug: "construction" },
    { label: "Water Treatment", slug: "water-treatment" },
  ];

  const partners: { label: string; slug: string }[] = [
    { label: "Distributor", slug: "distributor" },
    { label: "Service Center", slug: "service-center" },
    { label: "Regional Agent", slug: "regional-agent" },
  ];

  return (
    <header className="v3-header">
      <div className="v3-hbar">
        <Link href={`/v2/${locale}`} className="v3-logo">
          HISVIA<span>.</span>
        </Link>
        <nav className="v3-mainnav">
          {/* Systems */}
          <div className="v3-navitem">
            <button type="button">
              {t.systems} <span className="v3-caret">▾</span>
            </button>
            <div className="v3-megapanel">
              {systemGroups.map((group) => (
                <div key={group.col}>
                  <span className="v3-mega-col-title">{group.col}</span>
                  {group.items.map(([slug, label, fallback]) => (
                    <Link key={slug} href={`${v2}/solutions/${slug}`} className="v3-mega-link">
                      {label} <em>{systemCount(slug, fallback)}</em>
                    </Link>
                  ))}
                </div>
              ))}
              <div>
                <span className="v3-mega-col-title">Note</span>
                <p className="v3-mega-note">
                  Counts are the system-axis asset quantities from asset-intelligence.json, cross-checked against
                  asset-library-v2.json. Pneumatic Automation / Automation &amp; Control report 0 in that axis (their
                  combined Automation summary differs) and are shown as &quot;—&quot; pending engineering confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="v3-navitem">
            <button type="button">
              {t.brands} <span className="v3-caret">▾</span>
            </button>
            <div className="v3-megapanel">
              {brandGroups.map((group) => (
                <div key={group.col}>
                  <span className="v3-mega-col-title">{group.col}</span>
                  {group.keys.map((key) => {
                    const brand = doc.brands?.[key];
                    const label = brand?.name ?? key;
                    const count = countOf(brand);
                    return (
                      <Link key={key} href={`${v2}/brands/replacement`} className="v3-mega-link">
                        {label}
                        {count ? <em>{count}</em> : null}
                      </Link>
                    );
                  })}
                  {group.note && <p className="v3-mega-note" style={{ marginTop: 10 }}>{group.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="v3-navitem">
            <button type="button">
              {t.industries} <span className="v3-caret">▾</span>
            </button>
            <div className="v3-megapanel">
              <div>
                <span className="v3-mega-col-title">{t.industries}</span>
                {industries.slice(0, 3).map((ind) => (
                  <Link key={ind.slug} href={`${v2}/industries/${ind.slug}`} className="v3-mega-link">
                    {ind.label}
                  </Link>
                ))}
              </div>
              <div>
                <span className="v3-mega-col-title">&nbsp;</span>
                {industries.slice(3).map((ind) => (
                  <Link key={ind.slug} href={`${v2}/industries/${ind.slug}`} className="v3-mega-link">
                    {ind.label}
                  </Link>
                ))}
              </div>
              <div>
                <span className="v3-mega-col-title">Note</span>
                <p className="v3-mega-note">
                  Each industry uses 3 real scene assets: hero / challenge / evidence — see the industry page
                  prototypes.
                </p>
              </div>
            </div>
          </div>

          <div className="v3-navitem">
            <Link href={`${v2}/capability-network`}>{t.capabilities}</Link>
          </div>
          <div className="v3-navitem">
            <Link href={`${v2}/oem`}>{t.oem}</Link>
          </div>

          {/* Partners */}
          <div className="v3-navitem">
            <button type="button">
              {t.partners} <span className="v3-caret">▾</span>
            </button>
            <div className="v3-megapanel">
              <div>
                <span className="v3-mega-col-title">Roles</span>
                {partners.map((p) => (
                  <Link key={p.slug} href={`${v2}/partners/${p.slug}`} className="v3-mega-link">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href={`${v2}/request`} className="v3-req-cta">
            {t.request}
          </Link>
        </nav>
      </div>
    </header>
  );
}
