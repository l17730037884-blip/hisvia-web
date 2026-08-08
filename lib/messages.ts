import type { Locale } from "./locales";

export type Messages = {
  meta: { title: string; description: string };
  nav: {
    logoSubtitle: string;
    about: string;
    partnershipModel: string;
    manufacturing: string;
    qualityControl: string;
    submitRequirement: string;
  };
  hero: {
    kicker: string;
    h1: string;
    p: string;
    primaryBtn: string;
    ghostBtn: string;
    statLabel: string;
    statValue: string;
    statDesc: string;
    benefits: { title: string; desc: string }[];
  };
  positioning: {
    kicker: string;
    title: string;
    nots: string[];
    statement: { lead: string; h1: string; mid: string; h2: string; tail: string };
  };
  partnerBenefits: {
    kicker: string;
    title: string;
    desc: string;
    blocks: { label: string; heading: string; bullets: string[]; cta: string }[];
  };
  howWeWork: {
    kicker: string;
    title: string;
    desc: string;
    steps: { n: string; title: string; body: string }[];
  };
  manufacturing: {
    kicker: string;
    title: string;
    desc: string;
    items: { title: string; body: string }[];
    cta: string;
  };
  domains: {
    kicker: string;
    title: string;
    viewSolution: string;
    items: { n: string; title: string; body: string }[];
  };
  trust: {
    qc: { kicker: string; title: string; desc: string; items: string[] };
    supply: { kicker: string; title: string; desc: string };
  };
  compatible: { label: string; heading: string; cta: string };
  cta: { heading: string; btn: string; email: string };
  footer: {
    tagline: string;
    company: string;
    solutions: string;
    partners: string;
    copyright: string;
    links: {
      about: string;
      partnershipModel: string;
      howWeWork: string;
      qualityControl: string;
      compressors: string;
      spareParts: string;
      manufacturingCapability: string;
      compatibleSolutions: string;
      serviceCenters: string;
      distributors: string;
      regionalPartners: string;
      submitRequirement: string;
    };
  };
};

export const messages: Record<Locale, Messages> = {
  ru: {
    meta: {
      title: "HISVIA — Китайский партнер по промышленным цепочкам поставок для компаний России, СНГ и Центральной Азии",
      description:
        "Объединяем российские сервисные компании с надежными китайскими производственными ресурсами — технический подбор, подтверждение качества и координация экспорта.",
    },
    nav: {
      logoSubtitle: "КИТАЙСКИЙ ПАРТНЕР ПО ПРОМЫШЛЕННЫМ ЦЕПОЧКАМ ПОСТАВОК",
      about: "О HISVIA",
      partnershipModel: "Модель партнерства",
      manufacturing: "Производство",
      qualityControl: "Контроль качества",
      submitRequirement: "Подать заявку",
    },
    hero: {
      kicker: "Партнерство в промышленных цепочках поставок",
      h1: "Китайский партнер по промышленным цепочкам поставок для промышленных компаний России, СНГ и Центральной Азии",
      p: "Для сервисных центров, дистрибьюторов и промышленных компаний, дистрибьюторов и промышленных трейдеров — снизьте сложность закупок, получите доступ к проверенным китайским производственным ресурсам и найдите совместимые решения по замене, не создавая команды закупок в Китае.",
      primaryBtn: "Подать промышленную заявку →",
      ghostBtn: "Как мы работаем",
      statLabel: "Проверенная сеть",
      statValue: "120+",
      statDesc: "производственных партнеров под контролем качества",
      benefits: [
        { title: "Снижение сложности закупок", desc: "Один технический контакт вместо десятков заводов" },
        { title: "Доступ к ресурсам производства", desc: "Проверенная сеть китайских производств по 7 категориям" },
        { title: "Решения по замене", desc: "Совместимые детали под ваши бренды оборудования" },
        { title: "Без команды закупок", desc: "Полная координация без офиса закупок в Китае" },
      ],
    },
    positioning: {
      kicker: "Позиционирование",
      title: "Мы не очередной торговый посредник.",
      nots: ["Мы не китайский продавец", "Мы не оптовая торговая компания", "Мы не поставщик в стиле Alibaba"],
      statement: {
        lead: "Мы — партнер по цепочкам поставок, объединяющий ",
        h1: "российские промышленные сервисные компании",
        mid: " с ",
        h2: "надежными китайскими производственными ресурсами",
        tail: " — для долгосрочного технического сотрудничества, а не разовых заказов.",
      },
    },
    partnerBenefits: {
      kicker: "Преимущества для партнеров",
      title: "Что вы получаете, в зависимости от формата сотрудничества.",
      desc: "HISVIA работает по-разному с сервисными центрами, дистрибьюторами и региональными партнерами. Найдите свою роль ниже.",
      blocks: [
        {
          label: "01 / СЕРВИСНЫЕ ЦЕНТРЫ",
          heading: "Для сервисных центров",
          bullets: [
            "Доступ к китайским запчастям без создания команды закупок в Китае",
            "Расширьте возможности ремонта за пределы текущих запасов и поставщиков",
            "Снизьте сложность закупок до одного технического контакта",
            "Не нужно заранее держать склад перед подтверждением заказа",
          ],
          cta: "Как работают сервисные центры с нами →",
        },
        {
          label: "02 / ДИСТРИБЬЮТОРЫ",
          heading: "Для промышленных дистрибьюторов",
          bullets: [
            "Добавляйте новые продуктовые линейки без новых связей с поставщиками",
            "Доступ к проверенным китайским производственным ресурсам по 7 категориям",
            "Расширьте региональное покрытие рынка со стабильным партнером по поставкам",
          ],
          cta: "Как работают дистрибьюторы с нами →",
        },
        {
          label: "03 / РЕГИОНАЛЬНЫЕ ПАРТНЕРЫ",
          heading: "Для региональных партнеров",
          bullets: [
            "Стройте долгосрочную сеть промышленных поставок в своем регионе",
            "Растите от разовых сделок к структурированному регулярному партнерству",
          ],
          cta: "Как работают региональные партнеры с нами →",
        },
      ],
    },
    howWeWork: {
      kicker: "Как мы работаем",
      title: "От технической заявки до доставки — полная координация.",
      desc: "Ваша команда фокусируется на клиентах и технических требованиях. HISVIA управляет всем на стороне производства и логистики.",
      steps: [
        { n: "01", title: "Заявка клиента", body: "Партнер передает данные об оборудовании и технические требования." },
        { n: "02", title: "Технический анализ", body: "HISVIA изучает спецификации и подбирает решения." },
        { n: "03", title: "Подбор производителя", body: "Подходящие китайские производители отбираются из нашей сети." },
        { n: "04", title: "Подтверждение качества", body: "Образцы, документация и спецификации проверяются." },
        { n: "05", title: "Координация закупок", body: "Управление заказами, отслеживанием производства и коммуникацией." },
        { n: "06", title: "Доставка", body: "Экспортная документация и логистика до пункта назначения." },
      ],
    },
    manufacturing: {
      kicker: "Производственные возможности",
      title: "Реальные производственные ресурсы, а не список контактов перекупщика.",
      desc: "HISVIA подключается к реальным производственным мощностям по всему Китаю. Это отличает партнера по цепочкам поставок от торгового посредника.",
      items: [
        { title: "ЧПУ-обработка", body: "Точная обработка для нестандартных и кастомных запчастей." },
        { title: "Металлообработка", body: "Конструкционные и металлические детали для промышленного оборудования." },
        { title: "Литье", body: "Литые детали от квалифицированных литейных партнеров." },
        { title: "Литье пластмасс", body: "Пластиковые и инженерные детали в производственных масштабах." },
        { title: "Промышленная сборка", body: "Производство деталей и узлов для готовых агрегатов." },
        { title: "Контроль качества", body: "Предотгрузочная техническая и размерная проверка." },
      ],
      cta: "Производственные возможности →",
    },
    domains: {
      kicker: "Промышленные направления",
      title: "Восемь основных категорий, единый процесс закупок.",
      viewSolution: "Открыть решение →",
      items: [
        { n: "01 / КОМПРЕССОРЫ", title: "Промышленные компрессорные решения", body: "Закупки компрессоров полного ассортимента для сервисных и арендных парков." },
        { n: "02 / ЗАПЧАСТИ", title: "Запасные части для компрессоров", body: "Запчасти по спецификации OEM и совместимые аналоги под ваш парк." },
        { n: "03 / НАСОСЫ", title: "Насосное оборудование", body: "Закупки промышленных насосов в стандартных и кастомных конфигурациях." },
        { n: "04 / ГИДРАВЛИКА", title: "Гидравлические компоненты", body: "Цилиндры, клапаны и гидросистемы от проверенных производителей." },
        { n: "05 / КЛАПАНЫ", title: "Промышленная трубопроводная арматура", body: "Промышленные клапаны и задвижки для различных сред и давлений." },
        { n: "06 / АВТОМАТИЗАЦИЯ", title: "Компоненты автоматизации", body: "Компоненты управления и автоматизации под точные технические спецификации." },
        { n: "07 / МЕХАНИКА", title: "Механические компоненты", body: "Подшипники, уплотнения и механические детали для промышленного обслуживания." },
        { n: "08 / РАСХОДНИКИ", title: "Промышленные расходные материалы", body: "Регулярная поставка расходников по предсказуемому графику." },
      ],
    },
    trust: {
      qc: {
        kicker: "Контроль качества",
        title: "Каждый производитель проходит проверку до включения в сеть.",
        desc: "Мы берем на себя аудит заводов, техническое подтверждение и документацию — чтобы вашей команде не пришлось.",
        items: [
          "Аудит заводов и оценка мощностей",
          "Подтверждение технических спецификаций",
          "Подбор продукции и образцов",
          "Управление документацией",
          "Координация экспорта",
        ],
      },
      supply: {
        kicker: "Сеть поставок",
        title: "Проверенная сеть китайских производственных ресурсов.",
        desc: "Созданная в промышленных регионах Китая, наша сеть охватывает восемь основных категорий, на которые опираются наши партнеры.",
      },
    },
    compatible: {
      label: "Совместимые решения по замене",
      heading: "Закупки для оборудования Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver и Hitachi.",
      cta: "Совместимые решения →",
    },
    cta: {
      heading: "Готовы выстроить долгосрочное партнерство по поставкам?",
      btn: "Подать промышленную заявку →",
      email: "partner@hisvia.com",
    },
    footer: {
      tagline: "Китайский партнер по промышленным цепочкам поставок для компаний России, СНГ и Центральной Азии и компаний СНГ.",
      company: "Компания",
      solutions: "Решения",
      partners: "Партнеры",
      copyright: "© 2026 HISVIA. Все права защищены.",
      links: {
        about: "О HISVIA",
        partnershipModel: "Модель партнерства",
        howWeWork: "Как мы работаем",
        qualityControl: "Контроль качества",
        compressors: "Компрессоры",
        spareParts: "Запасные части",
        manufacturingCapability: "Производственные возможности",
        compatibleSolutions: "Совместимые решения",
        serviceCenters: "Сервисные центры",
        distributors: "Дистрибьюторы",
        regionalPartners: "Региональные партнеры",
        submitRequirement: "Подать заявку",
      },
    },
  },

  en: {
    meta: {
      title: "HISVIA — Industrial Supply Chain Partner — Direct from Chinese Factories",
      description:
        "Get industrial components directly from verified Chinese factories. Engineer-led sourcing, quality control, and export handling — without the middleman markup.",
    },
    nav: {
      logoSubtitle: "CHINA INDUSTRIAL SUPPLY CHAIN PARTNER",
      about: "About",
      partnershipModel: "Partnership Model",
      manufacturing: "Manufacturing",
      qualityControl: "Quality Control",
      submitRequirement: "Submit Requirement",
    },
    hero: {
      kicker: "Industrial Supply Chain Partnership",
      h1: "Industrial Supply Chain Partner — Direct from Chinese Factories",
      p: "Stop chasing quotes from dozens of factories. Get compatible industrial parts from verified Chinese manufacturers — with an engineer handling the technical matching, not a sales rep.",
      primaryBtn: "Submit Industrial Requirement →",
      ghostBtn: "See How We Work",
      statLabel: "Verified Network",
      statValue: "120+",
      statDesc: "Manufacturing partners under quality review",
      benefits: [
        { title: "Reduce Sourcing Complexity", desc: "One technical point of contact instead of dozens of factories" },
        { title: "Access Manufacturing Resources", desc: "Verified Chinese manufacturing network across 7 categories" },
        { title: "Find Replacement Solutions", desc: "Compatible parts matched to your existing equipment brands" },
        { title: "No Procurement Team Needed", desc: "Full coordination handled without an in-country sourcing office" },
      ],
    },
    positioning: {
      kicker: "Positioning",
      title: "We are not another trading middleman.",
      nots: ["We are not a Chinese seller", "We are not a wholesale trading company", "We are not an Alibaba-style supplier"],
      statement: {
        lead: "We are a supply chain partner connecting ",
        h1: "Industrial service companies",
        mid: " with ",
        h2: "reliable Chinese manufacturing resources",
        tail: " — built for long-term technical collaboration, not one-off orders.",
      },
    },
    partnerBenefits: {
      kicker: "Partner Benefits",
      title: "What you gain, depending on how you work with us.",
      desc: "HISVIA works differently with service centers, distributors, and regional partners. Find your role below.",
      blocks: [
        {
          label: "01 / SERVICE CENTERS",
          heading: "For Service Centers",
          bullets: [
            "Access Chinese replacement parts without building a China sourcing team",
            "Expand your repair capability beyond current stock and suppliers",
            "Reduce procurement complexity to one technical point of contact",
            "No need to pre-stock inventory before confirming a job",
          ],
          cta: "See how Service Centers work with us →",
        },
        {
          label: "02 / DISTRIBUTORS",
          heading: "For Industrial Distributors",
          bullets: [
            "Add new product lines without new supplier relationships to manage",
            "Access verified Chinese manufacturing resources across 7 categories",
            "Extend your regional market coverage with a stable supply partner",
          ],
          cta: "See how Distributors work with us →",
        },
        {
          label: "03 / REGIONAL PARTNERS",
          heading: "For Regional Partners",
          bullets: [
            "Build a long-term industrial supply network in your region",
            "Grow from single transactions into a structured, recurring partnership",
          ],
          cta: "See how Regional Partners work with us →",
        },
      ],
    },
    howWeWork: {
      kicker: "How We Work",
      title: "From technical demand to delivery, coordinated end to end.",
      desc: "Your team stays focused on customer relationships and technical requirements. HISVIA manages everything on the manufacturing and logistics side.",
      steps: [
        { n: "01", title: "Customer Demand", body: "Partner submits equipment details and technical requirements." },
        { n: "02", title: "Technical Analysis", body: "HISVIA reviews specifications and identifies matching solutions." },
        { n: "03", title: "Manufacturer Matching", body: "Suitable Chinese manufacturers are identified from our network." },
        { n: "04", title: "Quality Confirmation", body: "Samples, documentation, and specifications are verified." },
        { n: "05", title: "Purchase Coordination", body: "Ordering, production tracking, and communication are managed." },
        { n: "06", title: "Delivery", body: "Export documentation and logistics coordinated to destination." },
      ],
    },
    manufacturing: {
      kicker: "Manufacturing Capability",
      title: "Real manufacturing resources, not a reseller's contact list.",
      desc: "HISVIA connects to actual production capability across China. This is what separates a supply chain partner from a trading middleman.",
      items: [
        { title: "CNC Machining", body: "Precision machining for non-standard and custom replacement parts." },
        { title: "Metal Fabrication", body: "Structural and metal components for industrial equipment." },
        { title: "Casting", body: "Cast components sourced from qualified foundry partners." },
        { title: "Injection Molding", body: "Plastic and engineered-material components at production scale." },
        { title: "Industrial Assembly", body: "Component and sub-assembly production for complete units." },
        { title: "Quality Inspection", body: "Pre-shipment technical and dimensional inspection." },
      ],
      cta: "View Manufacturing Capability →",
    },
    domains: {
      kicker: "Industrial Domains",
      title: "Seven core categories, one coordinated sourcing process.",
      viewSolution: "View solution →",
      items: [
        { n: "01 / COMPRESSORS", title: "Industrial Compressor Solutions", body: "Full-range compressor sourcing for service and rental fleets." },
        { n: "02 / PARTS", title: "Compressor Spare Parts", body: "OEM-spec and compatible replacement parts, matched to your fleet." },
        { n: "03 / PUMPS", title: "Pump Equipment Solutions", body: "Industrial pump sourcing across standard and custom configurations." },
        { n: "04 / HYDRAULICS", title: "Hydraulic Components", body: "Cylinders, valves, and hydraulic systems from vetted manufacturers." },
        { n: "05 / VALVES", title: "Industrial Valves & Piping", body: "Industrial valves and fittings for various media and pressure ratings." },
        { n: "06 / AUTOMATION", title: "Automation Components", body: "Control and automation parts sourced to exact technical specification." },
        { n: "07 / MECHANICAL", title: "Mechanical Components", body: "Bearings, seals, and mechanical parts for industrial maintenance." },
        { n: "08 / CONSUMABLES", title: "Industrial Consumables", body: "Recurring consumable supply, coordinated on a predictable schedule." },
      ],
    },
    trust: {
      qc: {
        kicker: "Quality Control",
        title: "Every manufacturer is reviewed before it enters the network.",
        desc: "We manage factory screening, technical confirmation, and documentation — so your team never has to.",
        items: [
          "Factory screening & capability audit",
          "Technical specification confirmation",
          "Product & sample matching",
          "Documentation management",
          "Export coordination",
        ],
      },
      supply: {
        kicker: "Supply Chain Network",
        title: "A verified network of Chinese manufacturing resources.",
        desc: "Built across industrial regions in China, our network covers the seven core categories our partners rely on most.",
      },
    },
    compatible: {
      label: "Compatible Replacement Solutions",
      heading: "Sourcing for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment.",
      cta: "View Compatible Solutions →",
    },
    cta: {
      heading: "Ready to build a long-term supply chain partnership?",
      btn: "Submit Industrial Requirement →",
      email: "partner@hisvia.com",
    },
    footer: {
      tagline: "China Industrial Supply Chain Partner for companies in Russia, CIS & Central Asia.",
      company: "Company",
      solutions: "Solutions",
      partners: "Partners",
      copyright: "© 2026 HISVIA. All rights reserved.",
      links: {
        about: "About HISVIA",
        partnershipModel: "Partnership Model",
        howWeWork: "How We Work",
        qualityControl: "Quality Control",
        compressors: "Compressors",
        spareParts: "Spare Parts",
        manufacturingCapability: "Manufacturing Capability",
        compatibleSolutions: "Compatible Solutions",
        serviceCenters: "Service Centers",
        distributors: "Distributors",
        regionalPartners: "Regional Partners",
        submitRequirement: "Submit Requirement",
      },
    },
  },

  zh: {
    meta: {
      title: "HISVIA — 面向俄罗斯工业企业的中国工业供应链合作伙伴",
      description: "将俄罗斯服务企业与中国可靠的制造资源对接——技术匹配、质量确认与出口协调。",
    },
    nav: {
      logoSubtitle: "中国工业供应链合作伙伴",
      about: "关于",
      partnershipModel: "合作模式",
      manufacturing: "制造能力",
      qualityControl: "质量控制",
      submitRequirement: "提交需求",
    },
    hero: {
      kicker: "工业供应链合作",
      h1: "面向俄罗斯工业企业的中国工业供应链合作伙伴",
      p: "为俄罗斯服务中心、经销商和工业贸易商——降低采购复杂度，接入经过验证的中国制造资源，找到兼容的替换方案，无需在中国组建采购团队。",
      primaryBtn: "提交工业需求 →",
      ghostBtn: "了解我们的工作方式",
      statLabel: "经过验证的网络",
      statValue: "120+",
      statDesc: "处于质量审核中的制造合作伙伴",
      benefits: [
        { title: "降低采购复杂度", desc: "一个技术对接人，代替数十家工厂" },
        { title: "接入制造资源", desc: "覆盖7大品类的已验证中国制造网络" },
        { title: "找到替换方案", desc: "匹配您现有设备品牌的兼容零件" },
        { title: "无需采购团队", desc: "全流程协调，无需在中国设立采购办公室" },
      ],
    },
    positioning: {
      kicker: "定位",
      title: "我们不是又一个贸易中间商。",
      nots: ["我们不是中国卖方", "我们不是批发贸易公司", "我们不是 Alibaba 式供应商"],
      statement: {
        lead: "我们是一家供应链合作伙伴，连接",
        h1: "俄罗斯工业服务企业",
        mid: "与",
        h2: "可靠的中国制造资源",
        tail: "——为长期技术合作而生，而非一次性订单。",
      },
    },
    partnerBenefits: {
      kicker: "合作伙伴收益",
      title: "根据合作方式，您将获得什么。",
      desc: "HISVIA 与服务中心、经销商和区域伙伴的合作方式各不相同。请在下方找到您的角色。",
      blocks: [
        {
          label: "01 / 服务中心",
          heading: "面向服务中心",
          bullets: [
            "无需在中国组建采购团队即可获取中国替换零件",
            "将维修能力扩展到现有库存和供应商之外",
            "将采购复杂度降低为一个技术对接人",
            "确认订单前无需提前备货",
          ],
          cta: "了解服务中心如何与我们合作 →",
        },
        {
          label: "02 / 经销商",
          heading: "面向工业经销商",
          bullets: [
            "新增产品线而无需管理新的供应商关系",
            "接入覆盖7大品类的已验证中国制造资源",
            "与稳定的供应伙伴共同扩展区域市场覆盖",
          ],
          cta: "了解经销商如何与我们合作 →",
        },
        {
          label: "03 / 区域伙伴",
          heading: "面向区域伙伴",
          bullets: ["在您的区域建立长期工业供应网络", "从单次交易成长为结构化的长期合作"],
          cta: "了解区域伙伴如何与我们合作 →",
        },
      ],
    },
    howWeWork: {
      kicker: "工作方式",
      title: "从技术需求到交付，端到端协调。",
      desc: "您的团队专注于客户关系和技术需求。HISVIA 负责制造和物流侧的所有事务。",
      steps: [
        { n: "01", title: "客户需求", body: "合作伙伴提交设备详情和技术要求。" },
        { n: "02", title: "技术分析", body: "HISVIA 审查规格并识别匹配的解决方案。" },
        { n: "03", title: "制造商匹配", body: "从我们的网络中筛选合适的中国制造商。" },
        { n: "04", title: "质量确认", body: "验证样品、文档和规格。" },
        { n: "05", title: "采购协调", body: "管理下单、生产跟踪与沟通。" },
        { n: "06", title: "交付", body: "协调出口文档与物流至目的地。" },
      ],
    },
    manufacturing: {
      kicker: "制造能力",
      title: "真实的制造资源，而非中间商的联系人名单。",
      desc: "HISVIA 对接中国各地真实的生产能力。这是供应链合作伙伴与贸易中间商的本质区别。",
      items: [
        { title: "CNC 加工", body: "为非标和定制替换件提供精密加工。" },
        { title: "金属加工", body: "为工业设备提供结构件与金属零件。" },
        { title: "铸造", body: "来自合格铸造伙伴的铸件。" },
        { title: "注塑", body: "生产规模的塑料与工程材料零件。" },
        { title: "工业装配", body: "为完整机组生产零件与子部件。" },
        { title: "质量检验", body: "出货前的技术与尺寸检验。" },
      ],
      cta: "查看制造能力 →",
    },
    domains: {
      kicker: "工业领域",
      title: "八大核心品类，一套协调的采购流程。",
      viewSolution: "查看解决方案 →",
      items: [
        { n: "01 / 压缩机", title: "工业压缩机解决方案", body: "为服务和租赁车队提供全系列压缩机采购。" },
        { n: "02 / 备件", title: "压缩机备件", body: "OEM 规格与兼容替换件，匹配您的车队。" },
        { n: "03 / 泵", title: "泵类设备解决方案", body: "标准与定制配置的工业泵采购。" },
        { n: "04 / 液压", title: "液压元件", body: "来自经过审核制造商的油缸、阀门和液压系统。" },
        { n: "05 / 阀门", title: "工业阀门与管件", body: "适用于各种介质和压力等级的工业阀门与管件。" },
        { n: "06 / 自动化", title: "自动化元件", body: "按精确技术规格采购的控制与自动化零件。" },
        { n: "07 / 机械", title: "机械元件", body: "用于工业维护的轴承、密封件和机械零件。" },
        { n: "08 / 耗材", title: "工业耗材", body: "按可预测周期协调的耗材持续供应。" },
      ],
    },
    trust: {
      qc: {
        kicker: "质量控制",
        title: "每位制造商在加入网络前都经过审核。",
        desc: "我们负责工厂筛查、技术确认和文档管理——让您的团队无需操心。",
        items: ["工厂筛查与能力审核", "技术规格确认", "产品与样品匹配", "文档管理", "出口协调"],
      },
      supply: {
        kicker: "供应网络",
        title: "经过验证的中国制造资源网络。",
        desc: "我们的网络遍布中国各工业区域，覆盖合作伙伴最依赖的八大核心品类。",
      },
    },
    compatible: {
      label: "兼容替换解决方案",
      heading: "为 Atlas Copco、Kaeser、Ingersoll Rand、Sullair、Gardner Denver 和 Hitachi 设备采购。",
      cta: "查看兼容解决方案 →",
    },
    cta: {
      heading: "准备好建立长期的供应链合作了吗？",
      btn: "提交工业需求 →",
      email: "partner@hisvia.com",
    },
    footer: {
      tagline: "面向俄罗斯、独联体及中亚工业企业的中国工业供应链合作伙伴。",
      company: "公司",
      solutions: "解决方案",
      partners: "合作伙伴",
      copyright: "© 2026 HISVIA. 保留所有权利。",
      links: {
        about: "关于 HISVIA",
        partnershipModel: "合作模式",
        howWeWork: "工作方式",
        qualityControl: "质量控制",
        compressors: "压缩机",
        spareParts: "备件",
        manufacturingCapability: "制造能力",
        compatibleSolutions: "兼容解决方案",
        serviceCenters: "服务中心",
        distributors: "经销商",
        regionalPartners: "区域伙伴",
        submitRequirement: "提交需求",
      },
    },
  },
};
