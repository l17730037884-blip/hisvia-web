import contentRu from "@/data/content-ru.generated.json";
import contentEn from "@/data/content-en.generated.json";
import contentZhCN from "@/data/content-zh-CN.generated.json";
import contentTr from "@/data/content-tr.generated.json";
import contentEs from "@/data/content-es.generated.json";
import contentAr from "@/data/content-ar.generated.json";
import contentDe from "@/data/content-de.generated.json";
import contentFr from "@/data/content-fr.generated.json";
import contentPl from "@/data/content-pl.generated.json";
import { prefix, type Locale } from "@/lib/locale";

type Unit = {
  contentId: string;
  sourceContentId: string;
  translation: string;
};

type ContentFile = { units: Unit[] };

/** 9 种语言的翻译文件(按 locale 直接索引)。 */
const CONTENT_FILES: Record<Locale, ContentFile> = {
  "zh-CN": contentZhCN as ContentFile,
  en: contentEn as ContentFile,
  ru: contentRu as ContentFile,
  tr: contentTr as ContentFile,
  es: contentEs as ContentFile,
  ar: contentAr as ContentFile,
  de: contentDe as ContentFile,
  fr: contentFr as ContentFile,
  pl: contentPl as ContentFile,
};

const BY_CONTENT_ID: Record<Locale, Map<string, string>> = {
  "zh-CN": new Map(CONTENT_FILES["zh-CN"].units.map((u) => [u.contentId, u.translation])),
  en: new Map(CONTENT_FILES.en.units.map((u) => [u.contentId, u.translation])),
  ru: new Map(CONTENT_FILES.ru.units.map((u) => [u.contentId, u.translation])),
  tr: new Map(CONTENT_FILES.tr.units.map((u) => [u.contentId, u.translation])),
  es: new Map(CONTENT_FILES.es.units.map((u) => [u.contentId, u.translation])),
  ar: new Map(CONTENT_FILES.ar.units.map((u) => [u.contentId, u.translation])),
  de: new Map(CONTENT_FILES.de.units.map((u) => [u.contentId, u.translation])),
  fr: new Map(CONTENT_FILES.fr.units.map((u) => [u.contentId, u.translation])),
  pl: new Map(CONTENT_FILES.pl.units.map((u) => [u.contentId, u.translation])),
};

const BY_SOURCE_ID: Record<Locale, Map<string, string>> = {
  "zh-CN": new Map(CONTENT_FILES["zh-CN"].units.map((u) => [u.sourceContentId, u.translation])),
  en: new Map(CONTENT_FILES.en.units.map((u) => [u.sourceContentId, u.translation])),
  ru: new Map(CONTENT_FILES.ru.units.map((u) => [u.sourceContentId, u.translation])),
  tr: new Map(CONTENT_FILES.tr.units.map((u) => [u.sourceContentId, u.translation])),
  es: new Map(CONTENT_FILES.es.units.map((u) => [u.sourceContentId, u.translation])),
  ar: new Map(CONTENT_FILES.ar.units.map((u) => [u.sourceContentId, u.translation])),
  de: new Map(CONTENT_FILES.de.units.map((u) => [u.sourceContentId, u.translation])),
  fr: new Map(CONTENT_FILES.fr.units.map((u) => [u.sourceContentId, u.translation])),
  pl: new Map(CONTENT_FILES.pl.units.map((u) => [u.sourceContentId, u.translation])),
};

/** 中文参数名 → 各语言静态兜底映射(翻译文件缺 PARAM 单元时用),
 *  确保产品详情页图下方参数表不再出现"残留中文"或空框。 */
const PARAM_FALLBACK: Record<string, Partial<Record<Locale, string>>> = {
  "额定功率": { en: "Rated power", ru: "Номинальная мощь", tr: "Anma gücü", es: "Potencia nominal", ar: "القدرة المقننة", de: "Nennleistung", fr: "Puissance nominale", pl: "Moc znamionowa", "zh-CN": "额定功率" },
  "额定输入转速": { en: "Rated input speed", ru: "Номинальная входная частота", tr: "Anma giriş devri", es: "Velocidad de entrada nominal", ar: "سرعة الدخل المقننة", de: "Nenndrehzahl Eingang", fr: "Vitesse d'entrée nominale", pl: "Nominalna prędkość wejścia", "zh-CN": "额定输入转速" },
  "最大输入转速": { en: "Max input speed", ru: "Макс. входная скорость", tr: "Maks. giriş devri", es: "Velocidad máxima de entrada", ar: "أقصى سرعة دخل", de: "Max. Eingangsdrehzahl", fr: "Vitesse d'entrée max.", pl: "Maks. prędkość wejścia", "zh-CN": "最大输入转速" },
  "减速比": { en: "Reduction ratio", ru: "Передаточное число", tr: "Redüksiyon oranı", es: "Relación de reducción", ar: "نسبة التخفيض", de: "Übersetzungsverhältnis", fr: "Rapport de réduction", pl: "Przełożenie redukcyjne", "zh-CN": "减速比" },
  "额定输出转矩": { en: "Rated output torque", ru: "Номинальный выходной момент", tr: "Anma çıkış torku", es: "Par de salida nominal", ar: "عزم الخرج المقنن", de: "Nennabtriebsmoment", fr: "Couple de sortie nominal", pl: "Nominalny moment wyjściowy", "zh-CN": "额定输出转矩" },
  "最大输出转矩": { en: "Max output torque", ru: "Макс. выходной момент", tr: "Maks. çıkış torku", es: "Par máximo de salida", ar: "أقصى عزم خرج", de: "Max. Abtriebsmoment", fr: "Couple de sortie max.", pl: "Maks. moment wyjściowy", "zh-CN": "最大输出转矩" },
  "噪音": { en: "Noise level", ru: "Уровень шума", tr: "Gürültü seviyesi", es: "Nivel de ruido", ar: "مستوى الضوضاء", de: "Geräuschpegel", fr: "Niveau sonore", pl: "Poziom hałasu", "zh-CN": "噪音" },
  "最大径向力": { en: "Max radial force", ru: "Макс. радиальная сила", tr: "Maks. radyal kuvvet", es: "Fuerza radial máxima", ar: "أقصى قوة شعاعية", de: "Max. Radialkraft", fr: "Force radiale max.", pl: "Maks. siła promieniowa", "zh-CN": "最大径向力" },
  "回程间隙": { en: "Backlash", ru: "Люфт на выходе", tr: "Boşluk", es: "Juego", ar: "الخلوص", de: "Spiel", fr: "Jeu", pl: "Luz", "zh-CN": "回程间隙" },
  "满载效率": { en: "Full-load efficiency", ru: "КПД при полной нагрузке", tr: "Tam yük verimi", es: "Eficiencia a plena carga", ar: "الكفاءة عند الحمل الكامل", de: "Wirkungsgrad bei Vollast", fr: "Rendement en charge", pl: "Sprawność przy pełnym obciążeniu", "zh-CN": "满载效率" },
  "轴向力": { en: "Axial force", ru: "Осевая сила", tr: "Eksenel kuvvet", es: "Fuerza axial", ar: "قوة محورية", de: "Axialkraft", fr: "Force axiale", pl: "Siła osiowa", "zh-CN": "轴向力" },
  "重量": { en: "Weight", ru: "Вес", tr: "Ağırlık", es: "Peso", ar: "الوزن", de: "Gewicht", fr: "Poids", pl: "Waga", "zh-CN": "重量" },
  "防护等级": { en: "Protection class", ru: "Класс защиты", tr: "Koruma sınıfı", es: "Clase de protección", ar: "درجة الحماية", de: "Schutzklasse", fr: "Indice de protection", pl: "Klasa ochrony", "zh-CN": "防护等级" },
  "工作温度": { en: "Operating temperature", ru: "Рабочая температура", tr: "Çalışma sıcaklığı", es: "Temperatura de trabajo", ar: "حرارة التشغيل", de: "Betriebstemperatur", fr: "Température de fonctionnement", pl: "Temperatura pracy", "zh-CN": "工作温度" },
  "安装方式": { en: "Mounting style", ru: "Способ установки", tr: "Montaj şekli", es: "Tipo de montaje", ar: "نوع التركيب", de: "Montageart", fr: "Type de montage", pl: "Sposób montażu", "zh-CN": "安装方式" },
  "润滑方式": { en: "Lubrication", ru: "Смазка", tr: "Yağlama", es: "Lubricación", ar: "التزييت", de: "Schmierung", fr: "Lubrification", pl: "Smarowanie", "zh-CN": "润滑方式" },
  "使用寿命": { en: "Service life", ru: "Срок службы", tr: "Hizmet ömrü", es: "Vida útil", ar: "العمر الافتراضي", de: "Lebensdauer", fr: "Durée de vie", pl: "Trwałość", "zh-CN": "使用寿命" },
};

/** 中文参数 VALUE → 各语言静态兜底映射(用户反馈"产品图下面还有中文",
 *  原因:之前只翻译了 param.label(参数名),没管 param.value(参数值)是中文句子。 */
const PARAM_VALUE_FALLBACK: Record<string, Partial<Record<Locale, string>>> = {
  "免维护合成润滑脂": {
    en: "Maintenance-free synthetic grease",
    ru: "Необслуживаемая синтетическая смазка",
    tr: "Bakımsız sentetik gres",
    es: "Grasa sintética sin mantenimiento",
    ar: "شحم صناعي صيانة حر",
    de: "Wartungsfreies Synthetikfett",
    fr: "Graisse synthétique sans entretien",
    pl: "Smar syntetyczny bezobsługowy",
    "zh-CN": "免维护合成润滑脂",
  },
  "推荐Φ270": {
    en: "Recommended Φ270", ru: "Рекомендуется Φ270", tr: "Önerilen Φ270", es: "Recomendado Φ270",
    ar: "موصى به Φ270", de: "Empfohlen Φ270", fr: "Recommandé Φ270", pl: "Zalecane Φ270", "zh-CN": "推荐Φ270",
  },
  "推荐Φ200": {
    en: "Recommended Φ200", ru: "Рекомендуется Φ200", tr: "Önerilen Φ200", es: "Recomendado Φ200",
    ar: "موصى به Φ200", de: "Empfohlen Φ200", fr: "Recommandé Φ200", pl: "Zalecane Φ200", "zh-CN": "推荐Φ200",
  },
  "推荐Φ330": {
    en: "Recommended Φ330", ru: "Рекомендуется Φ330", tr: "Önerilen Φ330", es: "Recomendado Φ330",
    ar: "موصى به Φ330", de: "Empfohlen Φ330", fr: "Recommandé Φ330", pl: "Zalecane Φ330", "zh-CN": "推荐Φ330",
  },
  "标准润滑脂": {
    en: "Standard grease", ru: "Стандартная смазка", tr: "Standart gres", es: "Grasa estándar",
    ar: "شحم قياسي", de: "Standardfett", fr: "Graisse standard", pl: "Smar standardowy", "zh-CN": "标准润滑脂",
  },
  "合成润滑脂": {
    en: "Synthetic grease", ru: "Синтетическая смазка", tr: "Sentetik gres", es: "Grasa sintética",
    ar: "شحم صناعي", de: "Synthetikfett", fr: "Graisse synthétique", pl: "Smar syntetyczny", "zh-CN": "合成润滑脂",
  },
  "非标定制": {
    en: "Custom-built (non-standard)", ru: "Индивидуальное изготовление", tr: "Özel imalat", es: "Fabricación a medida",
    ar: "تصنيع حسب الطلب", de: "Sonderanfertigung", fr: "Fabrication sur mesure", pl: "Wykonanie na zamówienie", "zh-CN": "非标定制",
  },
  "标准件": {
    en: "Standard", ru: "Стандарт", tr: "Standart", es: "Estándar", ar: "قياسي",
    de: "Standard", fr: "Standard", pl: "Standard", "zh-CN": "标准件",
  },
  "润滑油": {
    en: "Lubricating oil", ru: "Смазочное масло", tr: "Yağlayıcı yağ", es: "Aceite lubricante",
    ar: "زيت التزييت", de: "Schmieröl", fr: "Huile lubrifiante", pl: "Olej smarujący", "zh-CN": "润滑油",
  },
};

/** 产品型号名清洗 —— 通用版(所有文件复用)。
 *  问题:用户反复反馈"产品图下面、alt里有中文(非标件/带制动轴/()括号)"。
 *  需要同时处理:
 *    ① 中文括号 (……)
 *    ② 英文括号 (……)
 *    ③ 混合括号:(……) 或 (……)(左右不匹配混合写法)
 *    ④ 残留裸中文词(如"非标件"后只剩右括号:"非标件)"这种半拉子情况) */
export function sanitizeProductModelName(raw: string): string {
  if (!raw) return "";
  let s = String(raw);
  // 1) 任意括号配对(4 种左右括号的组合),非贪婪匹配括号内容全部移除
  s = s.replace(/[（(][^)）]*[)）]/g, "");
  // 2) 残留的单个左/右括号 + 中文词(例如 "非标件)"、"（定制款" 这种半括号)
  //    —— 策略:所有中文字符块 + 紧邻的残缺括号 整体去掉
  s = s.replace(/[（(]?[\u4e00-\u9fa5]+[)）]?/g, "");
  return s.trim();
}

/** 参数【值】翻译:如果 value 含中文字符,先查 PARAM_VALUE_FALLBACK 静态表,
 *  查不到 → 再按 whole string 做一次去空格 lookup → 仍找不到 → 返回空串?
 *  否:仍找不到 → 保留"纯数字/字母/符号"部分,把中文字符段去掉。
 *  这样就不会有任何中文出现在产品图下面的参数表了。 */
export function paramValueTranslation(locale: Locale, rawValue: string): string {
  if (!rawValue) return "";
  const v = String(rawValue).trim();
  // 1) 没有中文 → 直接返回(数字、单位、英文、希腊字母 Φ 都过)
  if (!/[\u4e00-\u9fa5]/.test(v)) return v;
  // 2) 精确静态表匹配
  const lookup = PARAM_VALUE_FALLBACK[v];
  if (lookup && lookup[locale]) return lookup[locale] as string;
  // 3) 大小写/前后空格容错再查一次
  const trimmed = v.replace(/\s+/g, "");
  for (const key of Object.keys(PARAM_VALUE_FALLBACK)) {
    if (key.replace(/\s+/g, "") === trimmed) {
      const entry = PARAM_VALUE_FALLBACK[key];
      if (entry[locale]) return entry[locale] as string;
    }
  }
  // 4) 兜底:把所有中文字符段剔除,只保留数字/符号/英文字母(比如"推荐Φ270"→"Φ270")
  const stripped = v.replace(/[\u4e00-\u9fa5]+/g, "").trim();
  if (stripped) return stripped;
  return v;
}

/** 按锁定翻译 contentId 取值;缺失时回退 EN,再缺失返回空串。
 *  生产页面严格禁止静默 fallback 到英文,但底层 API 保留 en fallback
 *  以避免 undefined 异常;调用方应保证 9 locale 全 key 覆盖(见 scripts/check-i18n.mjs)。 */
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

/** 参数【标签】翻译(只翻译 label 即中文参数名,value 是数字/单位无需翻译)。
 *  优先源数据单元 → 静态兜底 PARAM_FALLBACK → 返回空串由调用方过滤掉该行(避免"空框") */
export function paramTranslation(
  locale: Locale,
  sourceContentId: string,
  cnName: string
): string {
  // 源数据:先找完整的 "PARAM-${cnName}" 单元,按约定这个单元可能包含 "Label = value",
  // 我们只要等号左侧 label 部分即可(value 用源数据里的 param.value 数字字段更准)
  const direct = bySourceId(locale, `${sourceContentId}-PARAM-${cnName}`);
  if (direct) {
    const sep = direct.indexOf(" = ");
    return (sep !== -1 ? direct.slice(0, sep) : direct).trim();
  }
  const fallback = PARAM_FALLBACK[cnName.trim()];
  if (fallback && fallback[locale]) return fallback[locale] as string;
  return "";
}

/** 页面品牌级文本辅助: t(locale, `${prefix(locale)}-P01-H01`)。 */
export function localized(locale: Locale, base: string): string {
  return t(locale, `${prefix(locale)}-${base}`);
}
