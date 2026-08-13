import type { Locale } from './locales';

type PageContent = { kicker: string; title: string; desc: string };

type DetailLabels = {
  compatibleLabel: string;
  brandHeroSuffix: string;
  supportedEquipment: string;
  commonComponents: string;
  workflow: string;
  faq: string;
  needReplacement: string;
  needReplacementDesc: string;
  industrialApps: string;
  whatWeProvide: string;
  partnershipProcess: string;
  representativeExample: string;
  readExample: string;
  readyToTalk: string;
  submitIndustrialBtn: string;
  email: string;
  partsDatabase: string;
  componentCategories: string;
  applications: string;
  supportedEquipmentLabel: string;
  whatWeNeed: string;
  submitYourReq: string;
  submitReqSidebarDesc: string;
  challenge: string;
  hisviaSolution: string;
  result: string;
  haveSimilar: string;
  challengesYouFace: string;
  howHelps: string;
};

type FormLabels = {
  title: string;
  desc: string;
  company: string;
  contactName: string;
  email: string;
  equipmentBrand: string;
  equipmentModel: string;
  partNumbers: string;
  quantity: string;
  message: string;
  attachmentsNote: string;
  submitBtn: string;
  successMsg: string;
  errorMsg: string;
  privacyNote: string;
};

type NavExtra = {
  capabilities: string;
  brands: string;
  industries: string;
  parts: string;
  network: string;
};

type HomeExtra = {
  entryKicker: string;
  entryTitle: string;
  entryByBrand: string;
  entryByBrandExplore: string;
  entryByComponent: string;
  entryByComponentExplore: string;
  entrySubmit: string;
  entrySubmitDesc: string;
  entrySubmitExplore: string;
  trustBar: {
    items: { value: string; label: string; sub: string }[];
    badge: string;
  };
  brandWall: {
    kicker: string;
    title: string;
    desc: string;
    badge: string;
  };
  byNumbers: {
    kicker: string;
    title: string;
    desc: string;
    items: { value: string; label: string; pct: number; note: string }[];
  };
  mfgVerified: string;
  mfgMetrics: { lead: string; capacity: string; material: string }[];
};

export const pageT: Record<Locale, {
  nav: NavExtra;
  home: HomeExtra;
  detail: DetailLabels;
  form: FormLabels;
  about: { kicker: string; h1: string; p: string; };
  howWeWork: { kicker: string; h1: string; p: string; };
  qualityControl: { kicker: string; h1: string; p: string; };
  partnershipModel: PageContent;
  manufacturingCapability: PageContent;
  supplyChainNetwork: PageContent;
  manufacturingNetwork: PageContent;
  compatibleSolutions: PageContent;
  contact: PageContent;
  faq: PageContent;
  submitRequirement: PageContent;
  request: PageContent;
  brands: PageContent;
  industries: PageContent;
  parts: PageContent;
  cases: PageContent;
  applications: PageContent;
  solutions: Record<string, PageContent>;
  partners: Record<string, PageContent>;
  common: { submitReqBtn: string; partnerEmail: string; };
}> = {
  ru: {
    common: { submitReqBtn: "Подать заявку →", partnerEmail: "partner@hisvia.com" },
    nav: { capabilities: "Возможности", brands: "Бренды", industries: "Отрасли", parts: "Запчасти", network: "Сеть" },
    home: {
      entryKicker: "Быстрый поиск решений",
      entryTitle: "Три способа закупки промышленных компонентов",
      entryByBrand: "По бренду оборудования",
      entryByBrandExplore: "Смотреть бренды",
      entryByComponent: "По типу компонента",
      entryByComponentExplore: "Смотреть запчасти",
      entrySubmit: "Подать техническую заявку",
      entrySubmitDesc: "Загрузите фото оборудования, табличку с данными, чертежи или номера деталей. Технический ответ в течение 2 рабочих дней.",
      entrySubmitExplore: "Подать заявку",
      trustBar: {
        badge: "Проверенная китайская производственная сеть",
        items: [
          { value: "8", label: "Категорий промышленных поставок", sub: "От компрессоров до расходников" },
          { value: "120+", label: "Проверенных производителей", sub: "Аудит до включения в сеть" },
          { value: "6", label: "Международных брендов оборудования", sub: "Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, Hitachi" },
          { value: "48ч", label: "Среднее время технического ответа", sub: "По спецификациям и чертежам" },
        ],
      },
      brandWall: {
        kicker: "Покрытие брендов",
        title: "Совместимые решения для основного промышленного оборудования",
        desc: "HISVIA подбирает совместимые заменяющие запчасти для ведущих мировых брендов компрессорного и промышленного оборудования.",
        badge: "Совместимо с",
      },
      byNumbers: {
        kicker: "Сеть в цифрах",
        title: "Проверенная сеть в цифрах",
        desc: "Промышленная сеть HISVIA, выстроенная по ключевым производственным регионам Китая и охватывающая восемь основных категорий.",
        items: [
          { value: "120+", label: "Производственных партнеров", pct: 86, note: "под контролем качества" },
          { value: "8", label: "Промышленных категорий", pct: 100, note: "полное покрытие" },
          { value: "6", label: "Поддерживаемых брендов", pct: 75, note: "мировых производителей" },
          { value: "48ч", label: "Время технического ответа", pct: 92, note: "среднее по заявкам" },
        ],
      },
      mfgVerified: "Проверено",
      mfgMetrics: [
        { lead: "7–15 дней", capacity: "до 5000 ед/мес", material: "Алюминий, сталь, нержавейка" },
        { lead: "10–20 дней", capacity: "до 2000 ед/мес", material: "Углеродистая сталь, SS400" },
        { lead: "15–30 дней", capacity: "до 1000 ед/мес", material: "HT200/HT250, QT450" },
        { lead: "10–18 дней", capacity: "до 10000 ед/мес", material: "PA66, POM, ABS, PC" },
        { lead: "12–25 дней", capacity: "по проекту", material: "Сборочные узлы под заказ" },
        { lead: "5–10 дней", capacity: "по партии", material: "Контроль по AQL 2.5" },
      ],
    },
    detail: {
      compatibleLabel: "Совместимые решения",
      brandHeroSuffix: "Совместимые запчасти",
      supportedEquipment: "Поддерживаемое оборудование",
      commonComponents: "Основные заменяемые компоненты",
      workflow: "Процесс подбора запчастей",
      faq: "Часто задаваемые вопросы",
      needReplacement: "Нужна замена?",
      needReplacementDesc: "Укажите модель оборудования и номер детали — наша техническая команда подберёт аналог в течение 2 рабочих дней.",
      industrialApps: "Промышленные применения",
      whatWeProvide: "Что предоставляет HISVIA:",
      partnershipProcess: "Процесс сотрудничества",
      representativeExample: "Пример из практики",
      readExample: "Читать пример →",
      readyToTalk: "Готовы обсудить ваши задачи по закупкам?",
      submitIndustrialBtn: "Подать промышленную заявку →",
      email: "partner@hisvia.com",
      partsDatabase: "База запчастей",
      componentCategories: "Категории компонентов",
      applications: "Применения",
      supportedEquipmentLabel: "Поддерживаемое оборудование",
      whatWeNeed: "Что нам от вас нужно",
      submitYourReq: "Подать заявку →",
      submitReqSidebarDesc: "Укажите модель оборудования, спецификации деталей и количество — технический ответ в течение 2 рабочих дней.",
      challenge: "Задача",
      hisviaSolution: "Решение HISVIA",
      result: "Результат",
      haveSimilar: "Похожая задача?",
      challengesYouFace: "Ваши сложности",
      howHelps: "Как помогает HISVIA",
    },
    form: {
      title: "Подать заявку",
      desc: "Заполните форму — технический ответ в течение 2 рабочих дней.",
      company: "Компания",
      contactName: "Контактное лицо",
      email: "Email",
      equipmentBrand: "Бренд оборудования",
      equipmentModel: "Модель оборудования",
      partNumbers: "Номера деталей (OEM)",
      quantity: "Количество",
      message: "Дополнительная информация",
      attachmentsNote: "Чертежи и фото можно приложить к письму.",
      submitBtn: "Отправить заявку →",
      successMsg: "Спасибо! Заявка отправлена. Мы свяжемся с вами в течение 2 рабочих дней.",
      errorMsg: "Не удалось отправить через сервер. Открываем почтовый клиент...",
      privacyNote: "Отправляя форму, вы соглашаетесь на обработку данных.",
    },
    about: { kicker: "О HISVIA", h1: "Мы находим нужный завод. Вы занимаетесь своим делом.", p: "HISVIA создана инженерами, которые годами занимались поставками промышленных компонентов из Китая. Мы знаем, какие заводы действительно могут выполнить заказ — и проверяем их до того, как вы разместите заказ." },
    howWeWork: { kicker: "Как мы работаем", h1: "От заявки до поставки — в шесть этапов.", p: "Структурированный процесс, который заменяет сложность самостоятельного управления китайскими поставщиками." },
    qualityControl: { kicker: "Контроль качества", h1: "Каждый производитель проверен до вашего заказа.", p: "Пять этапов оценки перед тем, как производитель попадает в нашу сеть." },
    partnershipModel: { kicker: "Модель партнёрства", title: "Построено для долгосрочных промышленных партнёрств.", desc: "Мы не нацениваем детали. Вы работаете напрямую с проверенными производителями." },
    manufacturingCapability: { kicker: "Производственные возможности", title: "Реальные производственные мощности Китая.", desc: "Доступ к литью, ковке, обработке на станках с ЧПУ и сборке от специализированных заводов." },
    supplyChainNetwork: { kicker: "Сеть поставок", title: "Проверенная сеть специализированных производителей.", desc: "Наша сеть охватывает ключевые промышленные регионы Китая." },
    manufacturingNetwork: { kicker: "Производственная сеть", title: "Производственные партнёры по всем промышленным регионам Китая.", desc: "Каждый партнёр отбирается по специализации, а не по общим мощностям." },
    compatibleSolutions: { kicker: "Совместимые решения", title: "Совместимые запчасти для основных брендов оборудования.", desc: "Мы поставляем совместимые детали, соответствующие спецификациям OEM." },
    contact: { kicker: "Контакты", title: "Свяжитесь с HISVIA.", desc: "partner@hisvia.com — или подайте заявку для быстрого технического ответа." },
    faq: { kicker: "Вопросы и ответы", title: "Часто задаваемые вопросы.", desc: "Ответы о процессе поставок, проверке качества, минимальных объёмах заказа и сроках." },
    submitRequirement: { kicker: "Подать заявку", title: "Расскажите, что вам нужно.", desc: "Укажите модель оборудования, спецификации деталей и количество. Наша команда ответит в течение 2 рабочих дней." },
    request: { kicker: "Подать запрос", title: "Начните процесс поставок.", desc: "Отправьте детали оборудования и спецификации. Техническая оценка в течение 2 рабочих дней." },
    brands: { kicker: "Совместимые решения", title: "Найдите запчасти по бренду оборудования.", desc: "Совместимые запчасти для Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver и Hitachi." },
    industries: { kicker: "Отрасли", title: "Решения под ваш способ работы.", desc: "Найдите сценарий, наиболее близкий к вашему." },
    parts: { kicker: "Запчасти", title: "Промышленные запчасти — подбор и проверка.", desc: "Прецизионные совместимые детали для компрессорных, насосных и гидравлических систем." },
    cases: { kicker: "Кейсы", title: "Реальные результаты поставок.", desc: "Примеры того, как промышленные компании снизили затраты и повысили надёжность поставок." },
    applications: { kicker: "Применения", title: "Промышленные применения.", desc: "От обслуживания компрессоров до ремонта гидравлических систем." },
    solutions: {
      compressors: { kicker: "Компрессоры", title: "Поставка компрессоров для сервисных и арендных парков.", desc: "Полный спектр компрессоров под ваш парк оборудования." },
      compressorParts: { kicker: "Запчасти для компрессоров", title: "Запчасти и расходники для компрессоров.", desc: "Прецизионные совместимые запчасти для основных брендов." },
      pumps: { kicker: "Насосы", title: "Поставка промышленных насосов.", desc: "Центробежные, диафрагменные и шестерённые насосы." },
      hydraulics: { kicker: "Гидравлика", title: "Поставка гидравлических компонентов.", desc: "Цилиндры, насосы, моторы и клапаны от проверенных производителей." },
      valves: { kicker: "Клапаны", title: "Поставка промышленных клапанов.", desc: "Шаровые, задвижки, обратные и дисковые клапаны." },
      automation: { kicker: "Автоматизация", title: "Компоненты автоматизации и систем управления.", desc: "ПЛК, датчики, приводы и панели управления." },
      mechanical: { kicker: "Механика", title: "Механические компоненты и прецизионные детали.", desc: "Подшипники, уплотнения, шестерни и валы." },
      consumables: { kicker: "Расходники", title: "Промышленные расходные материалы и фильтры.", desc: "Фильтры, сепараторы, смазки для промышленного оборудования." },
      filtration: { kicker: "Фильтрация", title: "Промышленная фильтрация и пылеулавливание.", desc: "Картриджные, рукавные и HEPA-фильтры для промышленных систем." },
      pneumatics: { kicker: "Пневматика", title: "Пневматическая автоматизация и компоненты.", desc: "Цилиндры, клапаны, FRL-модули и захваты для автоматизации." },
    },
    partners: {
      serviceCenters: { kicker: "Партнёры", title: "Сервисные центры.", desc: "Авторизованные центры по установке, обслуживанию и ремонту." },
      distributors: { kicker: "Партнёры", title: "Дистрибьюторы.", desc: "Региональные дистрибьюторы совместимых запчастей." },
      regionalPartners: { kicker: "Партнёры", title: "Региональные партнёры.", desc: "Локальные партнёры для поддержки и координации поставок в вашем регионе." },
    },
  },
  en: {
    common: { submitReqBtn: "Submit Requirement →", partnerEmail: "partner@hisvia.com" },
    nav: { capabilities: "Capabilities", brands: "Brands", industries: "Industries", parts: "Parts", network: "Network" },
    home: {
      entryKicker: "Find Solutions Faster",
      entryTitle: "Three ways to source industrial components",
      entryByBrand: "Find by Equipment Brand",
      entryByBrandExplore: "Explore Brands",
      entryByComponent: "Find by Component",
      entryByComponentExplore: "Explore Parts",
      entrySubmit: "Submit Technical Requirement",
      entrySubmitDesc: "Upload equipment photos, nameplate data, drawings, or part numbers. Technical response within 2 business days.",
      entrySubmitExplore: "Submit Requirement",
      trustBar: {
        badge: "Verified Chinese Manufacturing Network",
        items: [
          { value: "8", label: "Industrial supply categories", sub: "From compressors to consumables" },
          { value: "120+", label: "Verified manufacturers", sub: "Audited before entering the network" },
          { value: "6", label: "International equipment brands", sub: "Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, Hitachi" },
          { value: "48h", label: "Average technical response time", sub: "On specifications and drawings" },
        ],
      },
      brandWall: {
        kicker: "Brand Coverage",
        title: "Compatible solutions for major industrial equipment",
        desc: "HISVIA sources compatible replacement parts for the world's leading compressor and industrial equipment brands.",
        badge: "Compatible with",
      },
      byNumbers: {
        kicker: "Network in Numbers",
        title: "Verified network in numbers",
        desc: "HISVIA's industrial network built across China's key manufacturing regions, covering eight core categories.",
        items: [
          { value: "120+", label: "Manufacturing partners", pct: 86, note: "under quality control" },
          { value: "8", label: "Industrial categories", pct: 100, note: "full coverage" },
          { value: "6", label: "Supported brands", pct: 75, note: "global manufacturers" },
          { value: "48h", label: "Technical response time", pct: 92, note: "average across requests" },
        ],
      },
      mfgVerified: "Verified",
      mfgMetrics: [
        { lead: "7–15 days", capacity: "up to 5000 pcs/mo", material: "Aluminum, steel, stainless" },
        { lead: "10–20 days", capacity: "up to 2000 pcs/mo", material: "Carbon steel, SS400" },
        { lead: "15–30 days", capacity: "up to 1000 pcs/mo", material: "HT200/HT250, QT450" },
        { lead: "10–18 days", capacity: "up to 10000 pcs/mo", material: "PA66, POM, ABS, PC" },
        { lead: "12–25 days", capacity: "per project", material: "Custom sub-assemblies" },
        { lead: "5–10 days", capacity: "per batch", material: "AQL 2.5 inspection" },
      ],
    },
    detail: {
      compatibleLabel: "Compatible Replacement Solutions",
      brandHeroSuffix: "Compatible Replacement Parts",
      supportedEquipment: "Supported Equipment",
      commonComponents: "Common Replacement Components",
      workflow: "Replacement Sourcing Workflow",
      faq: "Frequently Asked Questions",
      needReplacement: "Need a replacement part?",
      needReplacementDesc: "Submit your equipment model and part number — our technical team will match it within 2 business days.",
      industrialApps: "Industrial Applications",
      whatWeProvide: "What HISVIA provides:",
      partnershipProcess: "Partnership Process",
      representativeExample: "Representative Example",
      readExample: "Read the example →",
      readyToTalk: "Ready to talk through your sourcing needs?",
      submitIndustrialBtn: "Submit Industrial Requirement →",
      email: "partner@hisvia.com",
      partsDatabase: "Parts Database",
      componentCategories: "Component Categories",
      applications: "Applications",
      supportedEquipmentLabel: "Supported Equipment",
      whatWeNeed: "What We Need From You",
      submitYourReq: "Submit Requirement →",
      submitReqSidebarDesc: "Include equipment model, part specifications, and quantity — our technical team responds within 2 business days.",
      challenge: "Challenge",
      hisviaSolution: "HISVIA Solution",
      result: "Result",
      haveSimilar: "Have a similar requirement?",
      challengesYouFace: "Challenges You Face",
      howHelps: "How HISVIA Helps",
    },
    form: {
      title: "Submit Requirement",
      desc: "Fill in the form — technical response within 2 business days.",
      company: "Company",
      contactName: "Contact Name",
      email: "Email",
      equipmentBrand: "Equipment Brand",
      equipmentModel: "Equipment Model",
      partNumbers: "Part Numbers (OEM)",
      quantity: "Quantity",
      message: "Additional Information",
      attachmentsNote: "Drawings and photos can be attached to the email.",
      submitBtn: "Send Requirement →",
      successMsg: "Thank you! Your request has been sent. We will contact you within 2 business days.",
      errorMsg: "Could not send via server. Opening email client...",
      privacyNote: "By submitting the form you agree to data processing.",
    },
    about: { kicker: "About HISVIA", h1: "We find the right factory. You focus on your business.", p: "HISVIA was built by engineers who spent years sourcing industrial components from China. We know which factories can actually deliver." },
    howWeWork: { kicker: "How We Work", h1: "From Requirement to Delivery — In Six Steps.", p: "A structured process that replaces the complexity of managing Chinese suppliers yourself." },
    qualityControl: { kicker: "Quality Control", h1: "Every Manufacturer Verified Before You Order.", p: "Five evaluation steps before any manufacturer enters our network." },
    partnershipModel: { kicker: "Partnership Model", title: "Built for long-term industrial partnerships.", desc: "We don't mark up parts. You connect directly with verified manufacturers." },
    manufacturingCapability: { kicker: "Manufacturing Capability", title: "Real Chinese manufacturing capabilities.", desc: "Access casting, forging, CNC machining, and assembly from specialized factories." },
    supplyChainNetwork: { kicker: "Supply Chain Network", title: "A verified network of specialized manufacturers.", desc: "Our network spans China's key industrial provinces." },
    manufacturingNetwork: { kicker: "Manufacturing Network", title: "Manufacturing partners across China's industrial regions.", desc: "Each partner selected for specialization, not general capacity." },
    compatibleSolutions: { kicker: "Compatible Solutions", title: "Compatible replacement parts for major equipment brands.", desc: "We source compatible parts that match OEM specifications." },
    contact: { kicker: "Contact", title: "Get in touch with HISVIA.", desc: "partner@hisvia.com — or submit a requirement for faster technical response." },
    faq: { kicker: "FAQ", title: "Frequently asked questions.", desc: "Answers about our sourcing process, quality verification, and partnership terms." },
    submitRequirement: { kicker: "Submit Requirement", title: "Tell us what you need to source.", desc: "Share equipment model, part specs, and quantity. Response within 2 business days." },
    request: { kicker: "Submit Request", title: "Start your sourcing request.", desc: "Submit equipment details and specs. Technical assessment within 2 business days." },
    brands: { kicker: "Compatible Replacement Solutions", title: "Find replacement parts by equipment brand.", desc: "Compatible parts for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment." },
    industries: { kicker: "Industrial Applications", title: "Sourcing support built around how you actually work.", desc: "Find the scenario closest to yours." },
    parts: { kicker: "Replacement Parts", title: "Industrial replacement parts, sourced and verified.", desc: "Precision-machined compatible parts for compressor, pump, and hydraulic systems." },
    cases: { kicker: "Case Studies", title: "Real sourcing results.", desc: "Examples of how industrial companies reduced costs and improved supply reliability." },
    applications: { kicker: "Applications", title: "Industrial applications we support.", desc: "From compressor maintenance to hydraulic system repair." },
    solutions: {
      compressors: { kicker: "Industrial Compressor Solutions", title: "Compressor sourcing for service and rental fleets.", desc: "Full-range compressor sourcing matched to your fleet requirements." },
      compressorParts: { kicker: "Compressor Parts & Consumables", title: "Compressor spare parts and consumables.", desc: "Precision-machined replacement parts compatible with major brands." },
      pumps: { kicker: "Industrial Pump Solutions", title: "Industrial pump sourcing and replacement.", desc: "Centrifugal, diaphragm, and gear pump sourcing for industrial applications." },
      hydraulics: { kicker: "Hydraulic Solutions", title: "Hydraulic component and system sourcing.", desc: "Cylinders, pumps, motors, and control valves from verified manufacturers." },
      valves: { kicker: "Industrial Valve Solutions", title: "Industrial valve sourcing and supply.", desc: "Ball, gate, globe, check, and butterfly valves for industrial applications." },
      automation: { kicker: "Automation Solutions", title: "Automation component and control system sourcing.", desc: "PLC modules, sensors, actuators, and control panels from qualified suppliers." },
      mechanical: { kicker: "Mechanical Solutions", title: "Mechanical component and precision part sourcing.", desc: "Bearings, seals, gears, shafts, and custom-machined components." },
      consumables: { kicker: "Industrial Consumables", title: "Industrial consumables and filter sourcing.", desc: "Filters, separators, lubricants, and maintenance consumables." },
      filtration: { kicker: "Industrial Filtration", title: "Industrial filtration and dust collection systems.", desc: "Cartridge, baghouse, and HEPA filters for industrial air and process systems." },
      pneumatics: { kicker: "Pneumatic Automation", title: "Pneumatic components and automation systems.", desc: "Cylinders, valves, FRL units, and grippers for factory automation." },
    },
    partners: {
      serviceCenters: { kicker: "Partners", title: "Service Centers.", desc: "Authorized centers providing installation, maintenance, and repair support." },
      distributors: { kicker: "Partners", title: "Distributors.", desc: "Regional distributors carrying compatible replacement parts." },
      regionalPartners: { kicker: "Partners", title: "Regional Partners.", desc: "Local partners providing on-the-ground support in your region." },
    },
  },
  zh: {
    common: { submitReqBtn: "提交需求 →", partnerEmail: "partner@hisvia.com" },
    nav: { capabilities: "制造能力", brands: "品牌", industries: "行业", parts: "零件", network: "网络" },
    home: {
      entryKicker: "更快找到方案",
      entryTitle: "三种方式采购工业零部件",
      entryByBrand: "按设备品牌查找",
      entryByBrandExplore: "浏览品牌",
      entryByComponent: "按零件类型查找",
      entryByComponentExplore: "浏览零件",
      entrySubmit: "提交技术需求",
      entrySubmitDesc: "上传设备照片、铭牌、图纸或零件号。2个工作日内技术回复。",
      entrySubmitExplore: "提交申请",
      trustBar: {
        badge: "认证中国制造网络",
        items: [
          { value: "8", label: "工业供应品类", sub: "从压缩机到耗材" },
          { value: "120+", label: "认证制造商", sub: "入库前审计" },
          { value: "6", label: "国际设备品牌", sub: "Atlas Copco、Kaeser、Ingersoll Rand、Sullair、Gardner Denver、Hitachi" },
          { value: "48h", label: "平均技术响应时长", sub: "按规格书与图纸" },
        ],
      },
      brandWall: {
        kicker: "品牌覆盖",
        title: "主流工业设备的兼容解决方案",
        desc: "HISVIA 为全球领先压缩机和工业设备品牌提供兼容替换零件。",
        badge: "兼容",
      },
      byNumbers: {
        kicker: "网络数据",
        title: "用数据说话的认证网络",
        desc: "HISVIA 的工业网络覆盖中国主要制造区域，涵盖八大核心品类。",
        items: [
          { value: "120+", label: "制造合作伙伴", pct: 86, note: "纳入质量管控" },
          { value: "8", label: "工业品类", pct: 100, note: "全覆盖" },
          { value: "6", label: "支持品牌", pct: 75, note: "国际厂商" },
          { value: "48h", label: "技术响应时长", pct: 92, note: "工单平均" },
        ],
      },
      mfgVerified: "已认证",
      mfgMetrics: [
        { lead: "7–15 天", capacity: "至 5000 件/月", material: "铝、钢、不锈钢" },
        { lead: "10–20 天", capacity: "至 2000 件/月", material: "碳钢、SS400" },
        { lead: "15–30 天", capacity: "至 1000 件/月", material: "HT200/HT250、QT450" },
        { lead: "10–18 天", capacity: "至 10000 件/月", material: "PA66、POM、ABS、PC" },
        { lead: "12–25 天", capacity: "按项目", material: "定制子组件" },
        { lead: "5–10 天", capacity: "按批次", material: "AQL 2.5 检验" },
      ],
    },
    detail: {
      compatibleLabel: "兼容解决方案",
      brandHeroSuffix: "兼容替换件",
      supportedEquipment: "支持设备",
      commonComponents: "常用替换组件",
      workflow: "零件匹配流程",
      faq: "常见问题",
      needReplacement: "需要替换零件？",
      needReplacementDesc: "提交设备型号和零件号——我们的技术团队将在2个工作日内匹配。",
      industrialApps: "工业应用",
      whatWeProvide: "HISVIA 提供：",
      partnershipProcess: "合作流程",
      representativeExample: "案例",
      readExample: "查看案例 →",
      readyToTalk: "准备讨论您的采购需求？",
      submitIndustrialBtn: "提交工业需求 →",
      email: "partner@hisvia.com",
      partsDatabase: "零件库",
      componentCategories: "组件分类",
      applications: "应用",
      supportedEquipmentLabel: "支持设备",
      whatWeNeed: "需要您提供",
      submitYourReq: "提交需求 →",
      submitReqSidebarDesc: "提供设备型号、零件规格和数量——2个工作日内技术回复。",
      challenge: "挑战",
      hisviaSolution: "HISVIA 方案",
      result: "结果",
      haveSimilar: "有类似需求？",
      challengesYouFace: "您面临的挑战",
      howHelps: "HISVIA 如何帮助",
    },
    form: {
      title: "提交需求",
      desc: "填写表单——2个工作日内技术回复。",
      company: "公司",
      contactName: "联系人",
      email: "邮箱",
      equipmentBrand: "设备品牌",
      equipmentModel: "设备型号",
      partNumbers: "零件号（OEM）",
      quantity: "数量",
      message: "补充信息",
      attachmentsNote: "图纸和照片可附在邮件中。",
      submitBtn: "发送申请 →",
      successMsg: "感谢！申请已发送。我们将在2个工作日内联系您。",
      errorMsg: "服务器发送失败，正在打开邮件客户端...",
      privacyNote: "提交即表示同意我们处理您的数据。",
    },
    about: { kicker: "关于 HISVIA", h1: "我们找到合适的工厂。您专注于业务。", p: "HISVIA 由在中国采购工业部件多年的工程师创立。我们知道哪些工厂能真正交付。" },
    howWeWork: { kicker: "工作方式", h1: "从需求到交付——六步流程。", p: "结构化的流程，替代您自己管理中国供应商的复杂性。" },
    qualityControl: { kicker: "质量控制", h1: "每个制造商在您下单前已经过验证。", p: "制造商进入我们网络前的五步评估。" },
    partnershipModel: { kicker: "合作模式", title: "为长期工业合作而建。", desc: "我们不赚差价。您直接与验证过的制造商对接。" },
    manufacturingCapability: { kicker: "制造能力", title: "真实的中国制造能力。", desc: "获取铸造、锻造、CNC加工和组装等专业工厂资源。" },
    supplyChainNetwork: { kicker: "供应链网络", title: "经过验证的专业制造商网络。", desc: "我们的网络覆盖中国主要工业省份。" },
    manufacturingNetwork: { kicker: "制造网络", title: "遍布中国工业区域的制造合作伙伴。", desc: "每个合作伙伴根据专业能力而非通用产能进行筛选。" },
    compatibleSolutions: { kicker: "兼容解决方案", title: "主要设备品牌的兼容替换件。", desc: "我们提供符合OEM规格的兼容零件——非假冒、非翻新。" },
    contact: { kicker: "联系我们", title: "联系 HISVIA。", desc: "partner@hisvia.com — 或提交需求以获得更快的技术响应。" },
    faq: { kicker: "常见问题", title: "常见问题解答。", desc: "关于我们的采购流程、质量验证、最小订单量和交付周期的解答。" },
    submitRequirement: { kicker: "提交需求", title: "告诉我们您需要采购什么。", desc: "提供设备型号、零件规格和数量。2个工作日内回复。" },
    request: { kicker: "提交请求", title: "开始您的采购请求。", desc: "提交设备详情和规格。2个工作日内完成技术评估。" },
    brands: { kicker: "兼容替换解决方案", title: "按设备品牌查找替换零件。", desc: "Atlas Copco、Kaeser、Ingersoll Rand、Sullair、Gardner Denver 和 Hitachi 设备的兼容零件。" },
    industries: { kicker: "行业应用", title: "围绕您实际工作方式构建的采购支持。", desc: "找到与您最接近的场景。" },
    parts: { kicker: "替换零件", title: "工业替换零件，已采购并验证。", desc: "用于压缩机、泵和液压系统的精密兼容零件。" },
    cases: { kicker: "案例研究", title: "真实的采购成果。", desc: "工业公司如何降低成本并提高供应可靠性的实例。" },
    applications: { kicker: "应用场景", title: "我们支持的工业应用。", desc: "从压缩机维护到液压系统维修。" },
    solutions: {
      compressors: { kicker: "工业压缩机解决方案", title: "服务和租赁车队的压缩机采购。", desc: "匹配您车队需求的全系列压缩机采购。" },
      compressorParts: { kicker: "压缩机零件与耗材", title: "压缩机备件和耗材。", desc: "兼容主要品牌的精密加工替换零件。" },
      pumps: { kicker: "工业泵解决方案", title: "工业泵采购与替换。", desc: "工业应用的离心泵、隔膜泵和齿轮泵采购。" },
      hydraulics: { kicker: "液压解决方案", title: "液压元件和系统采购。", desc: "来自验证制造商的油缸、泵、马达和控制阀。" },
      valves: { kicker: "工业阀门解决方案", title: "工业阀门采购与供应。", desc: "工业应用的球阀、闸阀、截止阀、止回阀和蝶阀。" },
      automation: { kicker: "自动化解决方案", title: "自动化元件和控制系统采购。", desc: "来自合格供应商的PLC模块、传感器、执行器和控制面板。" },
      mechanical: { kicker: "机械解决方案", title: "机械元件和精密零件采购。", desc: "轴承、密封件、齿轮、轴和定制加工机械元件。" },
      consumables: { kicker: "工业耗材", title: "工业耗材和过滤器采购。", desc: "工业设备的过滤器、分离器、润滑油和维护耗材。" },
      filtration: { kicker: "工业过滤", title: "工业过滤与粉尘收集系统。", desc: "工业空气和工艺系统的滤筒、布袋和HEPA过滤器。" },
      pneumatics: { kicker: "气动自动化", title: "气动元件与自动化系统。", desc: "工厂自动化的气缸、阀门、FRL单元和机械抓手。" },
    },
    partners: {
      serviceCenters: { kicker: "合作伙伴", title: "服务中心。", desc: "提供安装、维护和维修支持的授权服务中心。" },
      distributors: { kicker: "合作伙伴", title: "经销商。", desc: "销售兼容替换零件的区域经销商。" },
      regionalPartners: { kicker: "合作伙伴", title: "区域合作伙伴。", desc: "在您所在区域提供现场支持和采购协调的本地合作伙伴。" },
    },
  },
};
