import contentRu from "@/data/content-ru.generated.json";
import contentEn from "@/data/content-en.generated.json";
import { prefix, type Locale } from "@/lib/locale";

type Unit = {
  contentId: string;
  sourceContentId: string;
  translation: string;
};

type ContentFile = { units: Unit[] };

const RU_UNITS = (contentRu as ContentFile).units;
const EN_UNITS = (contentEn as ContentFile).units;

const BY_CONTENT_ID: Record<Locale, Map<string, string>> = {
  ru: new Map(RU_UNITS.map((u) => [u.contentId, u.translation])),
  en: new Map(EN_UNITS.map((u) => [u.contentId, u.translation])),
};

const BY_SOURCE_ID: Record<Locale, Map<string, string>> = {
  ru: new Map(RU_UNITS.map((u) => [u.sourceContentId, u.translation])),
  en: new Map(EN_UNITS.map((u) => [u.sourceContentId, u.translation])),
};

/** 中文参数名 → EN/RU 静态兜底映射（翻译文件缺 PARAM 单元时用），
 *  确保产品详情页图下方参数表不再出现"残留中文"或空框。 */
const PARAM_FALLBACK: Record<string, { en: string; ru: string }> = {
  // 产品参数表最常见的 10 项
  "额定功率": { en: "Rated power", ru: "Номинальная мощь" },
  "额定输入转速": { en: "Rated input speed", ru: "Номинальная входная частота" },
  "最大输入转速": { en: "Max input speed", ru: "Макс. входная скорость" },
  "减速比": { en: "Reduction ratio", ru: "Передаточное число" },
  "额定输出转矩": { en: "Rated output torque", ru: "Номинальный выходной момент" },
  "最大输出转矩": { en: "Max output torque", ru: "Макс. выходной момент" },
  "噪音": { en: "Noise level", ru: "Уровень шума" },
  "最大径向力": { en: "Max radial force", ru: "Макс. радиальная сила" },
  "回程间隙": { en: "Backlash", ru: "Люфт на выходе" },
  "满载效率": { en: "Full-load efficiency", ru: "КПД при полной нагрузке" },
  "轴向力": { en: "Axial force", ru: "Осевая сила" },
  "重量": { en: "Weight", ru: "Вес" },
  "防护等级": { en: "Protection class", ru: "Класс защиты" },
  "工作温度": { en: "Operating temperature", ru: "Рабочая температура" },
  "安装方式": { en: "Mounting style", ru: "Способ установки" },
  "润滑方式": { en: "Lubrication", ru: "Смазка" },
  "使用寿命": { en: "Service life", ru: "Срок службы" },
};

/** 中文参数 VALUE → EN/RU 静态兜底映射（用户反馈"产品图下面还有中文"，
 *  原因：之前只翻译了 param.label（参数名），没管 param.value（参数值）是中文句子。 */
const PARAM_VALUE_FALLBACK: Record<string, { en: string; ru: string }> = {
  "免维护合成润滑脂": {
    en: "Maintenance-free synthetic grease",
    ru: "Необслуживаемая синтетическая смазка",
  },
  "推荐Φ270": {
    en: "Recommended Φ270",
    ru: "Рекомендуется Φ270",
  },
  "推荐Φ200": {
    en: "Recommended Φ200",
    ru: "Рекомендуется Φ200",
  },
  "推荐Φ330": {
    en: "Recommended Φ330",
    ru: "Рекомендуется Φ330",
  },
  "标准润滑脂": {
    en: "Standard grease",
    ru: "Стандартная смазка",
  },
  "合成润滑脂": {
    en: "Synthetic grease",
    ru: "Синтетическая смазка",
  },
  "非标定制": {
    en: "Custom-built (non-standard)",
    ru: "Индивидуальное изготовление",
  },
  "标准件": {
    en: "Standard",
    ru: "Стандарт",
  },
  "润滑油": {
    en: "Lubricating oil",
    ru: "Смазочное масло",
  },
};

/** 产品型号名清洗 —— 通用版（所有文件复用）。
 *  问题：用户反复反馈"产品图下面、alt里有中文（非标件/带制动轴/（）括号）"。
 *  需要同时处理：
 *    ① 中文括号 （……）
 *    ② 英文括号 (……)
 *    ③ 混合括号：（……) 或 (……）（左右不匹配混合写法）
 *    ④ 残留裸中文词（如"非标件"后只剩右括号："非标件)"这种半拉子情况） */
export function sanitizeProductModelName(raw: string): string {
  if (!raw) return "";
  let s = String(raw);
  // 1) 任意括号配对（4 种左右括号的组合），非贪婪匹配括号内容全部移除
  s = s.replace(/[（(][^)）]*[)）]/g, "");
  // 2) 残留的单个左/右括号 + 中文词（例如 "非标件)"、"（定制款" 这种半括号）
  //    —— 策略：所有中文字符块 + 紧邻的残缺括号 整体去掉
  s = s.replace(/[（(]?[\u4e00-\u9fa5]+[)）]?/g, "");
  return s.trim();
}

/** 参数【值】翻译：如果 value 含中文字符，先查 PARAM_VALUE_FALLBACK 静态表，
 *  查不到 → 再按 whole string 做一次去空格 lookup → 仍找不到 → 返回空串？
 *  否：仍找不到 → 保留"纯数字/字母/符号"部分，把中文字符段去掉。
 *  这样就不会有任何中文出现在产品图下面的参数表了。 */
export function paramValueTranslation(locale: Locale, rawValue: string): string {
  if (!rawValue) return "";
  const v = String(rawValue).trim();
  // 1) 没有中文 → 直接返回（数字、单位、英文、希腊字母 Φ 都过）
  if (!/[\u4e00-\u9fa5]/.test(v)) return v;
  // 2) 精确静态表匹配
  const lookup = PARAM_VALUE_FALLBACK[v];
  if (lookup) return lookup[locale];
  // 3) 大小写/前后空格容错再查一次
  const trimmed = v.replace(/\s+/g, "");
  for (const key of Object.keys(PARAM_VALUE_FALLBACK)) {
    if (key.replace(/\s+/g, "") === trimmed) return PARAM_VALUE_FALLBACK[key][locale];
  }
  // 4) 兜底：把所有中文字符段剔除，只保留数字/符号/英文字母（比如"推荐Φ270"→"Φ270"）
  const stripped = v.replace(/[\u4e00-\u9fa5]+/g, "").trim();
  if (stripped) return stripped;
  return v;
}

/** 按锁定翻译 contentId 取值; 缺失时回退 EN, 再缺失返回空串。 */
export function t(locale: Locale, contentId: string): string {
  return (
    BY_CONTENT_ID[locale].get(contentId) ??
    BY_CONTENT_ID.en.get(contentId) ??
    ""
  );
}

/** 按 sourceContentId 取值(用于参数表等 CN 命名单元)。 */
export function bySourceId(locale: Locale, sourceContentId: string): string {
  return (
    BY_SOURCE_ID[locale].get(sourceContentId) ??
    BY_SOURCE_ID.en.get(sourceContentId) ??
    ""
  );
}

/** 参数【标签】翻译（只翻译 label 即中文参数名，value 是数字/单位无需翻译）。
 *  优先源数据单元 → 静态兜底 PARAM_FALLBACK → 返回空串由调用方过滤掉该行（避免"空框"） */
export function paramTranslation(
  locale: Locale,
  sourceContentId: string,
  cnName: string
): string {
  // 源数据：先找完整的 "PARAM-${cnName}" 单元，按约定这个单元可能包含 "Label = value"，
  // 我们只要等号左侧 label 部分即可（value 用源数据里的 param.value 数字字段更准）
  const direct = bySourceId(locale, `${sourceContentId}-PARAM-${cnName}`);
  if (direct) {
    const sep = direct.indexOf(" = ");
    return (sep !== -1 ? direct.slice(0, sep) : direct).trim();
  }
  const fallback = PARAM_FALLBACK[cnName.trim()];
  if (fallback) return fallback[locale];
  return "";
}

/** 页面品牌级文本辅助: t(locale, `${prefix(locale)}-P01-H01`)。 */
export function localized(locale: Locale, base: string): string {
  return t(locale, `${prefix(locale)}-${base}`);
}
