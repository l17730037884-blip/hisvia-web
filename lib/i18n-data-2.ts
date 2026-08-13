import type { Locale } from "@/lib/locales";

type IndustryI18nFields = {
  name: string;
  problem: string;
  solution: string;
};

type ApplicationI18nFields = {
  name: string;
  audience: string;
  painPoints: string[];
  solution: string;
  benefits: string[];
};

type CaseI18nFields = {
  title: string;
  challenge: string;
  solution: string;
  result: string;
};

type PartItem = { name: string; specs: string };

type PartI18nFields = {
  name: string;
  tagline: string;
  description: string;
  items: PartItem[];
  applications: string[];
  supportedEquipment: string[];
  technicalRequirements: string[];
};

export const industryI18n: Record<Locale, Record<string, IndustryI18nFields>> = {
  ru: {
    "compressor-service": {
      name: "Сервисные компании по компрессорам",
      problem: "Долгие сроки поставки OEM и дорогостоящие оригинальные запчасти замедляют оборот ремонтов и сжимают маржу сервиса.",
      solution: "HISVIA подбирает совместимые заменяющие запчасти от проверенных китайских производителей, поэтому вы можете быстрее выставлять счета и поддерживать ремонтные работы без предварительного складирования каждой позиции.",
    },
    "mining-maintenance": {
      name: "Обслуживание горнодобывающего оборудования",
      problem: "На удалённых объектах требуется надёжное снабжение компрессорными и гидравлическими компонентами, а ограниченный выбор местных поставщиков приводит к длительным простоям в ожидании запчастей.",
      solution: "HISVIA координирует поиск поставщиков и экспорт гидравлических, механических и компрессорных компонентов, так что службы обслуживания могут планировать работу исходя из предсказуемых сроков поставки.",
    },
    "industrial-distributors": {
      name: "Промышленные дистрибьюторы",
      problem: "Расширение продуктовой линейки обычно означает поиск, верификацию и ведение нового поставщика по каждой категории.",
      solution: "HISVIA предоставляет дистрибьюторам единого технического контактного лица по компрессорам, насосам, гидравлике и другим направлениям — одни отношения вместо множества.",
    },
    "factory-maintenance": {
      name: "Службы обслуживания предприятий",
      problem: "Внутренние службы обслуживания часто не могут обосновать командировки в Китай за запчастями, которые требуются несколько раз в год.",
      solution: "HISVIA берёт на себя подбор производителей и подтверждение качества от вашего имени, поэтому службы обслуживания могут закупать нестандартные запчасти без создания собственной закупочной структуры в Китае.",
    },
    "rental-equipment": {
      name: "Компании по аренде оборудования",
      problem: "Парки арендуемого оборудования включают множество брендов и серий, поэтому поддержание запаса запчастей по всему парку обходится дорого.",
      solution: "HISVIA закупает совместимые заменяющие запчасти между брендами по мере необходимости, снижая объём складских запасов, которые вы должны держать для работоспособности парка.",
    },
  },
  en: {
    "compressor-service": {
      name: "Compressor Service Companies",
      problem: "Long OEM delivery times and expensive genuine parts slow down repair turnaround and squeeze service margins.",
      solution: "HISVIA matches compatible replacement parts from verified Chinese manufacturers, so you can quote faster and keep repair jobs moving without pre-stocking every part.",
    },
    "mining-maintenance": {
      name: "Mining Equipment Maintenance",
      problem: "Remote sites need reliable compressor and hydraulic component supply, but limited local suppliers mean long downtime waiting for parts.",
      solution: "HISVIA coordinates sourcing and export for hydraulic, mechanical, and compressor components so maintenance teams can plan around predictable delivery windows.",
    },
    "industrial-distributors": {
      name: "Industrial Distributors",
      problem: "Expanding a product line usually means finding, vetting, and managing a new supplier relationship for every category.",
      solution: "HISVIA gives distributors a single technical point of contact across compressors, pumps, hydraulics, and more — one relationship instead of many.",
    },
    "factory-maintenance": {
      name: "Factory Maintenance Departments",
      problem: "Internal maintenance teams often can't justify sourcing trips to China for parts that are needed a few times a year.",
      solution: "HISVIA handles manufacturer matching and quality confirmation on your behalf, so maintenance departments can source non-standard parts without building China-side sourcing capability.",
    },
    "rental-equipment": {
      name: "Rental Equipment Companies",
      problem: "Rental fleets span multiple brands and series, making spare parts inventory expensive to maintain across the whole fleet.",
      solution: "HISVIA sources compatible replacement parts across brands as needed, reducing the inventory you have to carry for fleet uptime.",
    },
  },
  zh: {
    "compressor-service": {
      name: "压缩机服务公司",
      problem: "OEM 交货周期长、原装配件价格高昂，拖慢维修周转速度，挤压服务利润空间。",
      solution: "HISVIA 从经过认证的中国制造商匹配合适的替代配件，让您无需提前囤货即可更快报价，顺利推进维修工作。",
    },
    "mining-maintenance": {
      name: "矿山设备维护",
      problem: "偏远矿区需要可靠的压缩机和液压部件供应，但本地供应商有限，等待备件期间设备长时间停机。",
      solution: "HISVIA 协调液压、机械和压缩机部件的采购与出口，让维护团队可根据可预测的交货窗口安排工作计划。",
    },
    "industrial-distributors": {
      name: "工业分销商",
      problem: "扩展产品线通常意味着要为每个品类寻找、审核并管理新的供应商关系。",
      solution: "HISVIA 为分销商提供覆盖压缩机、泵、液压等品类的单一技术对接窗口——一次合作，替代多份供应商关系。",
    },
    "factory-maintenance": {
      name: "工厂维护部门",
      problem: "内部维护团队往往难以证明为每年仅需几次的配件专程赴中国采购的合理性。",
      solution: "HISVIA 代您完成制造商匹配与质量确认，维护部门无需建立中国本地采购能力即可采购非标零部件。",
    },
    "rental-equipment": {
      name: "设备租赁公司",
      problem: "租赁机队涵盖多个品牌和系列，为全机队维持备件库存成本高昂。",
      solution: "HISVIA 按需跨品牌采购兼容替代件，减少为保障机队正常运行而必须持有的库存。",
    },
  },
};

export const applicationI18n: Record<Locale, Record<string, ApplicationI18nFields>> = {
  ru: {
    "compressor-service": {
      name: "Сервисные компании по компрессорам",
      audience: "Независимые компании по сервису и ремонту компрессоров",
      painPoints: [
        "Оригинальные OEM-запчасти дороги и съедают маржу сервиса",
        "Долгие сроки поставки от европейских поставщиков задерживают ремонт клиентов",
        "Ограниченный выбор альтернативных поставщиков совместимых запчастей",
      ],
      solution: "HISVIA закупает совместимые заменяющие запчасти — Air Filters / Oil Separators, фильтры, уплотнения и комплекты ТО — от проверенных китайских производителей, с соответствием спецификациям OEM. Быстрее оборот, ниже себестоимость, то же техническое качество.",
      benefits: [
        "Снижать стоимость запчастей при сохранении качества сервиса",
        "Быстрая поставка ускоряет ремонт клиентов",
        "Един партнёр по закупкам — не нужно верифицировать несколько китайских заводов",
      ],
    },
    "industrial-distributors": {
      name: "Дистрибьюторы промышленного оборудования",
      audience: "Дистрибьюторы промышленного оборудования и запчастей",
      painPoints: [
        "Нужно расширять продуктовые категории без увеличения нагрузки по управлению поставщиками",
        "Поиск надёжных китайских производителей, которые понимают требования к экспорту",
        "Управление стабильностью качества у нескольких поставщиков",
      ],
      solution: "HISVIA выступает как единый технический партнёр по закупкам — ведёт квалификацию производителей, верификацию качества и координацию экспорта. Дистрибьюторы расширяют каталог без создания закупочной команды в Китае.",
      benefits: [
        "Добавить совместимые заменяющие запчасти как новую категорию дохода",
        "Один партнёр заменяет несколько отношений с поставщиками",
        "Стабильное качество с документированной верификацией на каждом этапе",
      ],
    },
    "mining-maintenance": {
      name: "Обслуживание горнодобывающего оборудования",
      audience: "Службы обслуживания горнодобывающих предприятий и сервисные провайдеры",
      painPoints: [
        "Удалённое расположение повышает стоимость простоев при отсутствии запчастей",
        "Оборудование работает в суровых условиях и требует надёжных компонентов",
        "Срочные заказы у OEM идут по премиальным ценам",
      ],
      solution: "HISVIA обеспечивает закупку заменяющих компонентов с техническим подбором — фильтры, уплотнения, гидравлические компоненты и механические запчасти — подходящих для условий эксплуатации в горной промышленности, с поддержкой срочных заказов.",
      benefits: [
        "Сократить простои оборудования за счёт более быстрых закупок запчастей",
        "Более экономичная альтернатива срочным заказам у OEM",
        "Техническая верификация гарантирует качество компонентов горнопромышленного класса",
      ],
    },
    "rental-equipment": {
      name: "Компании по аренде оборудования",
      audience: "Компании по аренде и лизингу оборудования",
      painPoints: [
        "Множество брендов оборудования требует разного запаса запчастей",
        "Большой склад запчастей связывает оборотные средства",
        "Утилизация оборудования зависит от скорости оборота ремонтов",
      ],
      solution: "HISVIA обеспечивает гибкую закупку запчастей по запросу — без минимального заказа и долгосрочных обязательств по складскому запасу. Заказывайте то, что нужно, когда нужно, для любого бренда оборудования в вашем парке.",
      benefits: [
        "Снижать затраты на содержание складского запаса",
        "Гибкое формирование заказа — от одной запчасти до оптовой партии",
        "Поддержка нескольких брендов от одного партнёра по закупкам",
      ],
    },
    "factory-maintenance": {
      name: "Службы обслуживания предприятий",
      audience: "Менеджеры по обслуживанию производств и закупочные команды",
      painPoints: [
        "Периодическая потребность в специализированных запчастях, которых нет у местных поставщиков",
        "Создание и поддержка закупочной команды в Китае нецелесообразно",
        "Верификация качества у неизвестных китайских поставщиков отнимает много времени",
      ],
      solution: "HISVIA ведёт весь процесс закупок — от идентификации производителя до верификации качества и координации экспорта. Службы обслуживания отправляют требования и получают проверенные, готовые к отгрузке компоненты.",
      benefits: [
        "Не нужно создавать или поддерживать закупочную команду в Китае",
        "Технический подбор гарантирует соответствие спецификациям",
        "Документированная верификация качества по каждому заказу",
      ],
    },
  },
  en: {
    "compressor-service": {
      name: "Compressor Service Companies",
      audience: "Independent compressor service and repair businesses",
      painPoints: [
        "OEM parts are expensive and cut into service margins",
        "Long delivery times from European suppliers delay customer repairs",
        "Limited alternative supplier options for compatible parts",
      ],
      solution: "HISVIA sources compatible replacement parts — air/oil separators, filters, seals, and maintenance kits — from verified Chinese manufacturers, matched to OEM specifications. Faster turnaround, lower cost structure, same technical quality.",
      benefits: [
        "Reduce parts cost while maintaining service quality",
        "Faster delivery improves customer repair turnaround",
        "Single sourcing partner — no need to qualify multiple Chinese factories",
      ],
    },
    "industrial-distributors": {
      name: "Industrial Equipment Distributors",
      audience: "Distributors of industrial equipment and spare parts",
      painPoints: [
        "Need to expand product categories without adding supplier management overhead",
        "Finding reliable Chinese manufacturers who understand export requirements",
        "Managing quality consistency across multiple suppliers",
      ],
      solution: "HISVIA acts as a single technical sourcing partner — managing manufacturer qualification, quality verification, and export coordination. Distributors expand their catalog without building a China procurement team.",
      benefits: [
        "Add compatible replacement parts as a new revenue category",
        "One partner replaces multiple supplier relationships",
        "Consistent quality with documented verification at every step",
      ],
    },
    "mining-maintenance": {
      name: "Mining Equipment Maintenance",
      audience: "Mining maintenance departments and service providers",
      painPoints: [
        "Remote locations increase downtime cost when parts are unavailable",
        "Equipment operates in harsh conditions requiring robust components",
        "Emergency orders from OEMs carry premium pricing",
      ],
      solution: "HISVIA provides replacement component sourcing with technical matching — filters, seals, hydraulic components, and mechanical parts — suitable for mining operating conditions, with emergency order support.",
      benefits: [
        "Reduce equipment downtime with faster parts sourcing",
        "Lower cost alternative to OEM emergency orders",
        "Technical verification ensures mining-grade component quality",
      ],
    },
    "rental-equipment": {
      name: "Rental Equipment Companies",
      audience: "Equipment rental and leasing companies",
      painPoints: [
        "Multiple equipment brands require diverse spare parts inventory",
        "Large spare parts inventory ties up working capital",
        "Equipment utilization depends on fast repair turnaround",
      ],
      solution: "HISVIA provides flexible, on-demand parts sourcing — no minimum order requirements, no long-term inventory commitment. Order what you need, when you need it, for any equipment brand in your fleet.",
      benefits: [
        "Reduce inventory carrying costs",
        "Flexible ordering — single parts to bulk orders",
        "Multi-brand support from a single sourcing partner",
      ],
    },
    "factory-maintenance": {
      name: "Factory Maintenance Departments",
      audience: "Plant maintenance managers and procurement teams",
      painPoints: [
        "Occasional need for specialized parts not stocked by local suppliers",
        "Building and maintaining a China purchasing team is not feasible",
        "Quality verification of unknown Chinese suppliers is time-consuming",
      ],
      solution: "HISVIA handles the entire sourcing process — from manufacturer identification to quality verification and export coordination. Factory maintenance teams submit requirements and receive verified, ready-to-ship components.",
      benefits: [
        "No need to build or maintain a China procurement team",
        "Technical matching ensures correct specifications",
        "Documented quality verification for every order",
      ],
    },
  },
  zh: {
    "compressor-service": {
      name: "压缩机服务公司",
      audience: "独立压缩机服务与维修企业",
      painPoints: [
        "OEM 配件价格昂贵，侵蚀服务利润",
        "欧洲供应商交货周期长，延误客户维修",
        "兼容替代件的备选供应商选择有限",
      ],
      solution: "HISVIA 从经过验证的中国制造商采购兼容替代件——空气/油分离器、过滤器、密封件和维护包——按 OEM 规格匹配。周转更快、成本结构更低、技术质量不变。",
      benefits: [
        "降低配件成本，同时保持服务质量",
        "更快的交付提升客户维修周转速度",
        "单一采购合作伙伴——无需审核多家中国工厂",
      ],
    },
    "industrial-distributors": {
      name: "工业设备分销商",
      audience: "工业设备及备件分销商",
      painPoints: [
        "需要在不增加供应商管理成本的前提下扩展产品品类",
        "寻找理解出口要求的可靠中国制造商",
        "管理多家供应商之间的质量一致性",
      ],
      solution: "HISVIA 作为单一技术采购合作伙伴——管理制造商资质审核、质量验证和出口协调。分销商无需建立中国采购团队即可扩展产品目录。",
      benefits: [
        "新增兼容替代件作为新的收入品类",
        "一个合作伙伴替代多份供应商关系",
        "质量稳定，每个环节均有书面验证记录",
      ],
    },
    "mining-maintenance": {
      name: "矿山设备维护",
      audience: "矿山维护部门和服务提供商",
      painPoints: [
        "位置偏远，缺件时停机成本更高",
        "设备在恶劣条件下运行，需要坚固耐用的组件",
        "OEM 紧急订单价格高昂",
      ],
      solution: "HISVIA 提供技术匹配的替代组件采购——过滤器、密封件、液压元件和机械零件——适用于矿山运行条件，并支持紧急订单。",
      benefits: [
        "更快的配件采购减少设备停机时间",
        "相比 OEM 紧急订单，成本更低的替代方案",
        "技术验证确保矿山级组件质量",
      ],
    },
    "rental-equipment": {
      name: "设备租赁公司",
      audience: "设备租赁与 leasing 公司",
      painPoints: [
        "多个设备品牌需要多样化的备件库存",
        "大量备件库存占用流动资金",
        "设备利用率取决于快速的维修周转",
      ],
      solution: "HISVIA 提供灵活的按需配件采购——无最低起订量要求，无长期库存承诺。为您机队中的任何设备品牌，在需要时订购所需物品。",
      benefits: [
        "降低库存持有成本",
        "灵活订货——从单件到批量",
        "单一采购合作伙伴支持多品牌",
      ],
    },
    "factory-maintenance": {
      name: "工厂维护部门",
      audience: "工厂维护经理和采购团队",
      painPoints: [
        "偶尔需要本地供应商无库存的专业零部件",
        "建立和维护中国采购团队不可行",
        "对陌生中国供应商进行质量验证耗时耗力",
      ],
      solution: "HISVIA 处理整个采购流程——从制造商识别到质量验证和出口协调。工厂维护团队只需提交需求，即可收到经过验证、随时可发货的组件。",
      benefits: [
        "无需建立或维护中国采购团队",
        "技术匹配确保规格正确",
        "每笔订单均有书面质量验证",
      ],
    },
  },
};

export const caseI18n: Record<Locale, Record<string, CaseI18nFields>> = {
  ru: {
    "compressor-separator-elements": {
      title: "Заменяющие элементы сепараторов для оборудования Atlas Copco",
      challenge: "Российская сервисная компания по компрессорам нуждалась в заменяющих элементах сепараторов для оборудования Atlas Copco. OEM-запчасти были дорогими, а срок поставки — длительным.",
      solution: "HISVIA подобрал китайского производителя фильтрационного оборудования, выпускающего совместимые элементы сепараторов по требуемой спецификации.",
      result: "Снижена сложность закупок и сокращено время между запросом клиента и готовностью запчасти к выдаче.",
    },
    "hydraulic-cylinder-sourcing": {
      title: "Закупка индивидуальных Hydraulic Cylinders для службы обслуживания",
      challenge: "Служба обслуживания предприятия нуждалась в нестандартном гидравлическом цилиндре, ни один местный поставщик не мог произвести его в короткие сроки.",
      solution: "HISVIA скоординировал работу с китайским производителем гидравлических компонентов для изготовления детали по предоставленному техническому чертежу в рамках CNC Machining.",
      result: "Служба обслуживания избежала полной замены оборудования и закупила деталь без построения собственного процесса закупок в Китае.",
    },
    "distributor-product-line-expansion": {
      title: "Расширение продуктовой линейки промышленного дистрибьютора",
      challenge: "Промышленный дистрибьютор хотел добавить механические компоненты в каталог без ведения нового поставщика.",
      solution: "HISVIA стал для дистрибьютора единым техническим контактным лицом по закупкам механических компонентов по всем целевым категориям.",
      result: "Дистрибьютор расширил каталог без увеличения нагрузки по управлению поставщиками.",
    },
  },
  en: {
    "compressor-separator-elements": {
      title: "Replacement separator elements for Atlas Copco equipment",
      challenge: "A Russian compressor service company needed replacement separator elements for Atlas Copco equipment. OEM parts were expensive and delivery time was long.",
      solution: "HISVIA matched a Chinese filtration manufacturer producing compatible separator elements to the required specification.",
      result: "Reduced sourcing complexity and shortened the time between customer request and part availability.",
    },
    "hydraulic-cylinder-sourcing": {
      title: "Custom hydraulic cylinder sourcing for a maintenance department",
      challenge: "A factory maintenance department needed a non-standard hydraulic cylinder with no local supplier able to produce it on short notice.",
      solution: "HISVIA coordinated with a Chinese hydraulic component manufacturer to machine the part to the submitted technical drawing.",
      result: "The maintenance team avoided a full equipment replacement and sourced the part without building an in-house China sourcing process.",
    },
    "distributor-product-line-expansion": {
      title: "Product line expansion for an industrial distributor",
      challenge: "An industrial distributor wanted to add mechanical components to their catalog without managing a new supplier relationship.",
      solution: "HISVIA became the distributor's single technical point of contact for mechanical component sourcing across their target categories.",
      result: "The distributor expanded their catalog without adding supplier management overhead.",
    },
  },
  zh: {
    "compressor-separator-elements": {
      title: "Atlas Copco 设备用替代分离元件",
      challenge: "一家俄罗斯压缩机服务公司需要 Atlas Copco 设备的替代分离元件。OEM 配件价格昂贵，交货周期长。",
      solution: "HISVIA 匹配了一家按所需规格生产兼容分离元件的中国过滤制造商。",
      result: "降低了采购复杂度，缩短了从客户请求到配件就绪的时间。",
    },
    "hydraulic-cylinder-sourcing": {
      title: "为维护部门定制采购 Hydraulic Cylinders",
      challenge: "某工厂维护部门需要一个非标液压油缸，本地供应商均无法在短时间内生产。",
      solution: "HISVIA 与一家中国液压元件制造商协调，按提交的技术图纸通过 CNC Machining 加工该零件。",
      result: "维护团队避免了整机更换，且无需建立内部中国采购流程即采购到该零件。",
    },
    "distributor-product-line-expansion": {
      title: "工业分销商产品线扩展",
      challenge: "一家工业分销商希望在其产品目录中增加机械组件，同时无需管理新的供应商关系。",
      solution: "HISVIA 成为该分销商在目标品类中机械组件采购的单一技术对接人。",
      result: "该分销商在未增加供应商管理成本的情况下扩展了产品目录。",
    },
  },
};

export const partI18n: Record<Locale, Record<string, PartI18nFields>> = {
  ru: {
    "compressor-parts": {
      name: "Запасные части для компрессоров",
      tagline: "Совместимые заменяющие компоненты для роторно-винтовых, поршневых и центробежных компрессоров.",
      description: "HISVIA закупает запасные части для компрессоров у проверенных китайских производителей — с соответствием спецификациям OEM по размерам, материалам и производительности. Каждый компонент проходит техническую проверку перед закупкой.",
      items: [
        { name: "Air Filters", specs: "Primary, secondary, HEPA-grade; cellulose and synthetic media options" },
        { name: "Oil Filters", specs: "Full-flow, bypass; spin-on and cartridge types; 5-40 micron ratings" },
        { name: "Oil Separators", specs: "Standard and high-efficiency; supports GA/ASD/SSR/R series form factors" },
        { name: "Valve Components", specs: "Intake, minimum pressure, thermostatic, check, safety valves" },
        { name: "Seal Kits", specs: "Shaft seals, O-ring kits, gasket sets; PTFE and Viton options" },
        { name: "Maintenance Kits", specs: "2000h / 4000h / 8000h service kits bundling filters and seals" },
      ],
      applications: [
        "Производственные предприятия с системами сжатого воздуха",
        "Сервис и ремонт компрессорных установок",
        "Дистрибьюторы промышленного оборудования",
        "Обслуживание горнодобывающего и строительного оборудования",
      ],
      supportedEquipment: [
        "Роторно-винтовые компрессоры (Atlas Copco GA/GX, Kaeser ASD/CSD, IR R/UP/Nirvana, Sullair LS/ES, Gardner Denver, Hitachi OSP)",
        "Безмасляные компрессоры (Atlas Copco ZT/ZR, Sullair DR, Hitachi DSP/Bebicon)",
        "Поршневые и передвижные компрессоры (различные бренды)",
      ],
      technicalRequirements: [
        "Модель оборудования и номер запчасти OEM",
        "Требуемое количество и график поставки",
        "Условия эксплуатации (давление, температура, режим работы)",
        "Требования к сертификации (ISO, CE, EAC, GOST)",
      ],
    },
    "hydraulic-components": {
      name: "Гидравлические компоненты",
      tagline: "Совместимые Hydraulic Cylinders, клапаны, уплотнения и компоненты под заказ от проверенных производителей.",
      description: "HISVIA закупает заменяющие гидравлические компоненты — цилиндры, клапаны, уплотнения и детали индивидуальной CNC Machining — у специализированных китайских производителей с производственными линиями, сертифицированными по ISO. Каждый заказ сопровождается сертификатом материала и контрольным измерением.",
      items: [
        { name: "Hydraulic Cylinders", specs: "Single/double-acting; bore 25-500mm; stroke up to 6000mm; working pressure up to 350 bar" },
        { name: "Hydraulic Valves", specs: "Directional, pressure, flow control; monoblock and sectional; CETOP/NG sizes" },
        { name: "Hydraulic Seals", specs: "Rod seals, piston seals, wipers, guide rings; NBR, PTFE, PU materials" },
        { name: "Custom Components", specs: "CNC-machined manifolds, adapter blocks, custom shafts and pins" },
      ],
      applications: [
        "Строительное и землеройное оборудование",
        "Сельскохозяйственная техника",
        "Промышленные прессы и термопластавтоматы",
        "Судовые и офшорные гидравлические системы",
      ],
      supportedEquipment: [
        "Гидравлические насосные станции и силовые блоки",
        "Гидравлические системы экскаваторов, погрузчиков и кранов",
        "Цилиндры листогибочных и гильотинных ножниц",
        "Индивидуальные гидравлические коллекторные сборки",
      ],
      technicalRequirements: [
        "Диаметр расточки цилиндра, ход, диаметр штока, тип крепления",
        "Рабочее давление и характеристики расхода",
        "Требования к материалу уплотнений (NBR, Viton, PTFE)",
        "Стандарты резьб портов (BSPP, SAE, метрическая)",
      ],
    },
    "mechanical-components": {
      name: "Механические компоненты",
      tagline: "Подшипники, детали машинной обработки, металлические компоненты и детали точного CNC Machining от проверенных производителей.",
      description: "От стандартных подшипников до индивидуальных компонентов CNC Machining — HISVIA связывает вас со специализированными китайскими производителями. Каждый заказ включает прослеживаемость материала, размерные отчёты и сертификат на поверхностную обработку.",
      items: [
        { name: "Bearings", specs: "Ball, roller, needle, spherical; SKF/FAG/TIMKEN-compatible dimensions; steel and ceramic" },
        { name: "Machined Parts", specs: "CNC turning and milling; tolerances to ±0.01mm; steel, stainless, aluminum, brass" },
        { name: "Metal Components", specs: "Forged, cast, and fabricated parts; carbon steel, alloy steel, stainless steel" },
        { name: "CNC Precision Parts", specs: "5-axis machining; complex geometries; prototyping to production volumes" },
      ],
      applications: [
        "Ремонт и обслуживание промышленных машин",
        "Производство и сборка оборудования",
        "Горнодобывающее и обогатительное оборудование",
        "Капитальный ремонт насосов, вентиляторов и редукторов",
      ],
      supportedEquipment: [
        "Вращающееся оборудование (насосы, вентиляторы, редукторы, конвейеры)",
        "Системы транспортировки материалов",
        "Технологическое и упаковочное оборудование",
        "Индивидуальные механические сборки",
      ],
      technicalRequirements: [
        "Детальные чертежи или CAD-файлы (STEP, DWG, PDF)",
        "Марка материала и спецификации термообработки",
        "Требования к чистоте поверхности и покрытиям",
        "Допуски и критерии контроля",
      ],
    },
    "industrial-consumables": {
      name: "Промышленные расходные материалы",
      tagline: "Регулярные поставки фильтров, уплотнительных материалов и средств обслуживания — по предсказуемому графику.",
      description: "Промышленные расходные материалы, закупаемые на регулярной основе. HISVIA ведёт отношения с поставщиками, стабильность качества и сроки поставки, так что вы поддерживаете складской запас без создания закупочной команды в Китае.",
      items: [
        { name: "Industrial Filters", specs: "Hydraulic, fuel, coolant, and process filters; cellulose, synthetic, and metal mesh media" },
        { name: "Sealing Materials", specs: "Gasket sheets, spiral-wound gaskets, PTFE tape, O-ring cord; various materials and standards" },
        { name: "Maintenance Supplies", specs: "Cleaning solvents, lubricants, anti-seize compounds, corrosion inhibitors" },
      ],
      applications: [
        "Плановое обслуживание предприятий и планирование остановок",
        "Программы складского запаса расходных материалов у дистрибьюторов оборудования",
        "Договоры на регулярные поставки с сервисными компаниями",
        "Обслуживание удалённых объектов (горная промышленность, нефтегазовый сектор)",
      ],
      supportedEquipment: [
        "Все промышленные компрессорные и насосные системы",
        "Гидравлические насосные станции и системы смазки",
        "Технологическое оборудование для фильтрации и сепарации",
        "Общее обслуживание промышленного оборудования",
      ],
      technicalRequirements: [
        "Существующие номера деталей или спецификации",
        "Ежемесячные или ежеквартальные объёмы потребления",
        "Требования к хранению и сроку годности",
        "Предпочтения по упаковке и маркировке",
      ],
    },
  },
  en: {
    "compressor-parts": {
      name: "Compressor Replacement Parts",
      tagline: "Compatible replacement components for rotary screw, reciprocating, and centrifugal compressors.",
      description: "HISVIA sources compressor replacement parts from verified Chinese manufacturers — matching OEM specifications for dimensions, materials, and performance. Every component undergoes technical review before procurement.",
      items: [
        { name: "Air Filters", specs: "Primary, secondary, HEPA-grade; cellulose and synthetic media options" },
        { name: "Oil Filters", specs: "Full-flow, bypass; spin-on and cartridge types; 5-40 micron ratings" },
        { name: "Oil Separators", specs: "Standard and high-efficiency; supports GA/ASD/SSR/R series form factors" },
        { name: "Valve Components", specs: "Intake, minimum pressure, thermostatic, check, safety valves" },
        { name: "Seal Kits", specs: "Shaft seals, O-ring kits, gasket sets; PTFE and Viton options" },
        { name: "Maintenance Kits", specs: "2000h / 4000h / 8000h service kits bundling filters and seals" },
      ],
      applications: [
        "Manufacturing plants with compressed air systems",
        "Compressor service and repair companies",
        "Industrial equipment distributors",
        "Mining and construction equipment maintenance",
      ],
      supportedEquipment: [
        "Rotary screw compressors (Atlas Copco GA/GX, Kaeser ASD/CSD, IR R/UP/Nirvana, Sullair LS/ES, Gardner Denver, Hitachi OSP)",
        "Oil-free compressors (Atlas Copco ZT/ZR, Sullair DR, Hitachi DSP/Bebicon)",
        "Reciprocating and portable compressors (various brands)",
      ],
      technicalRequirements: [
        "Equipment model and OEM part number",
        "Required quantity and delivery schedule",
        "Operating conditions (pressure, temperature, duty cycle)",
        "Certification requirements (ISO, CE, EAC, GOST)",
      ],
    },
    "hydraulic-components": {
      name: "Hydraulic Components",
      tagline: "Compatible hydraulic cylinders, valves, seals, and custom components from verified manufacturers.",
      description: "HISVIA sources hydraulic replacement components — cylinders, valves, seals, and custom-machined parts — from specialized Chinese manufacturers with ISO-certified production lines. Every order includes material certification and dimensional inspection.",
      items: [
        { name: "Hydraulic Cylinders", specs: "Single/double-acting; bore 25-500mm; stroke up to 6000mm; working pressure up to 350 bar" },
        { name: "Hydraulic Valves", specs: "Directional, pressure, flow control; monoblock and sectional; CETOP/NG sizes" },
        { name: "Hydraulic Seals", specs: "Rod seals, piston seals, wipers, guide rings; NBR, PTFE, PU materials" },
        { name: "Custom Components", specs: "CNC-machined manifolds, adapter blocks, custom shafts and pins" },
      ],
      applications: [
        "Construction and earthmoving equipment",
        "Agricultural machinery",
        "Industrial press and injection molding machines",
        "Marine and offshore hydraulic systems",
      ],
      supportedEquipment: [
        "Hydraulic power units and power packs",
        "Excavator, loader, and crane hydraulic systems",
        "Press brake and shearing machine cylinders",
        "Custom hydraulic manifold assemblies",
      ],
      technicalRequirements: [
        "Cylinder bore, stroke, rod diameter, mounting type",
        "Working pressure and flow rate specifications",
        "Seal material requirements (NBR, Viton, PTFE)",
        "Port thread standards (BSPP, SAE, metric)",
      ],
    },
    "mechanical-components": {
      name: "Mechanical Components",
      tagline: "Bearings, machined parts, metal components, and CNC precision parts from verified manufacturers.",
      description: "From standard bearings to custom CNC-machined components, HISVIA connects you with specialized Chinese manufacturers. Every order includes material traceability, dimensional reports, and surface treatment certification.",
      items: [
        { name: "Bearings", specs: "Ball, roller, needle, spherical; SKF/FAG/TIMKEN-compatible dimensions; steel and ceramic" },
        { name: "Machined Parts", specs: "CNC turning and milling; tolerances to ±0.01mm; steel, stainless, aluminum, brass" },
        { name: "Metal Components", specs: "Forged, cast, and fabricated parts; carbon steel, alloy steel, stainless steel" },
        { name: "CNC Precision Parts", specs: "5-axis machining; complex geometries; prototyping to production volumes" },
      ],
      applications: [
        "Industrial machinery repair and maintenance",
        "Equipment manufacturing and assembly",
        "Mining and mineral processing equipment",
        "Pump, fan, and gearbox overhauls",
      ],
      supportedEquipment: [
        "Rotating equipment (pumps, fans, gearboxes, conveyors)",
        "Material handling systems",
        "Processing and packaging machinery",
        "Custom mechanical assemblies",
      ],
      technicalRequirements: [
        "Detailed drawings or CAD files (STEP, DWG, PDF)",
        "Material grade and heat treatment specifications",
        "Surface finish and coating requirements",
        "Tolerance and inspection criteria",
      ],
    },
    "industrial-consumables": {
      name: "Industrial Consumables",
      tagline: "Recurring supply of filters, sealing materials, and maintenance supplies — predictable, scheduled delivery.",
      description: "Industrial consumables sourced on a recurring schedule. HISVIA manages supplier relationships, quality consistency, and delivery timing so you maintain inventory without building a China procurement team.",
      items: [
        { name: "Industrial Filters", specs: "Hydraulic, fuel, coolant, and process filters; cellulose, synthetic, and metal mesh media" },
        { name: "Sealing Materials", specs: "Gasket sheets, spiral-wound gaskets, PTFE tape, O-ring cord; various materials and standards" },
        { name: "Maintenance Supplies", specs: "Cleaning solvents, lubricants, anti-seize compounds, corrosion inhibitors" },
      ],
      applications: [
        "Routine plant maintenance and turnaround planning",
        "Equipment distributor consumable stock programs",
        "Service company recurring supply agreements",
        "Remote site maintenance (mining, oil and gas)",
      ],
      supportedEquipment: [
        "All industrial compressor and pump systems",
        "Hydraulic power units and lubrication systems",
        "Process filtration and separation equipment",
        "General industrial machinery maintenance",
      ],
      technicalRequirements: [
        "Existing part numbers or specifications",
        "Monthly or quarterly consumption volumes",
        "Storage and shelf-life requirements",
        "Packaging and labeling preferences",
      ],
    },
  },
  zh: {
    "compressor-parts": {
      name: "压缩机替代件",
      tagline: "适用于螺杆式、往复式和离心式压缩机的兼容替代组件。",
      description: "HISVIA 从经过验证的中国制造商采购压缩机替代件——在尺寸、材料和性能上匹配 OEM 规格。每个组件在采购前均经过技术审核。",
      items: [
        { name: "Air Filters", specs: "Primary, secondary, HEPA-grade; cellulose and synthetic media options" },
        { name: "Oil Filters", specs: "Full-flow, bypass; spin-on and cartridge types; 5-40 micron ratings" },
        { name: "Oil Separators", specs: "Standard and high-efficiency; supports GA/ASD/SSR/R series form factors" },
        { name: "Valve Components", specs: "Intake, minimum pressure, thermostatic, check, safety valves" },
        { name: "Seal Kits", specs: "Shaft seals, O-ring kits, gasket sets; PTFE and Viton options" },
        { name: "Maintenance Kits", specs: "2000h / 4000h / 8000h service kits bundling filters and seals" },
      ],
      applications: [
        "配备压缩空气系统的制造工厂",
        "压缩机服务与维修公司",
        "工业设备分销商",
        "矿山与建筑设备维护",
      ],
      supportedEquipment: [
        "螺杆式压缩机（Atlas Copco GA/GX、Kaeser ASD/CSD、IR R/UP/Nirvana、Sullair LS/ES、Gardner Denver、Hitachi OSP）",
        "无油压缩机（Atlas Copco ZT/ZR、Sullair DR、Hitachi DSP/Bebicon）",
        "往复式和便携式压缩机（各品牌）",
      ],
      technicalRequirements: [
        "设备型号和 OEM 零件号",
        "所需数量和交货进度",
        "运行条件（压力、温度、工作循环）",
        "认证要求（ISO、CE、EAC、GOST）",
      ],
    },
    "hydraulic-components": {
      name: "液压元件",
      tagline: "来自验证制造商的兼容 Hydraulic Cylinders、阀门、密封件和定制组件。",
      description: "HISVIA 从拥有 ISO 认证生产线的专业中国制造商采购液压替代组件——油缸、阀门、密封件和 CNC Machining 定制零件。每笔订单均包含材料认证和尺寸检验。",
      items: [
        { name: "Hydraulic Cylinders", specs: "Single/double-acting; bore 25-500mm; stroke up to 6000mm; working pressure up to 350 bar" },
        { name: "Hydraulic Valves", specs: "Directional, pressure, flow control; monoblock and sectional; CETOP/NG sizes" },
        { name: "Hydraulic Seals", specs: "Rod seals, piston seals, wipers, guide rings; NBR, PTFE, PU materials" },
        { name: "Custom Components", specs: "CNC-machined manifolds, adapter blocks, custom shafts and pins" },
      ],
      applications: [
        "建筑与土方设备",
        "农业机械",
        "工业压力机和注塑机",
        "船舶和海洋液压系统",
      ],
      supportedEquipment: [
        "液压动力单元和动力包",
        "挖掘机、装载机和起重机液压系统",
        "折弯机和剪板机油缸",
        "定制液压阀组总成",
      ],
      technicalRequirements: [
        "油缸内径、行程、活塞杆直径、安装方式",
        "工作压力和流量规格",
        "密封材料要求（NBR、Viton、PTFE）",
        "接口螺纹标准（BSPP、SAE、公制）",
      ],
    },
    "mechanical-components": {
      name: "机械组件",
      tagline: "来自验证制造商的轴承、机加工零件、金属组件和 CNC 精密零件。",
      description: "从标准轴承到定制 CNC Machining 组件，HISVIA 为您连接专业中国制造商。每笔订单均包含材料可追溯性、尺寸报告和表面处理认证。",
      items: [
        { name: "Bearings", specs: "Ball, roller, needle, spherical; SKF/FAG/TIMKEN-compatible dimensions; steel and ceramic" },
        { name: "Machined Parts", specs: "CNC turning and milling; tolerances to ±0.01mm; steel, stainless, aluminum, brass" },
        { name: "Metal Components", specs: "Forged, cast, and fabricated parts; carbon steel, alloy steel, stainless steel" },
        { name: "CNC Precision Parts", specs: "5-axis machining; complex geometries; prototyping to production volumes" },
      ],
      applications: [
        "工业机械维修与维护",
        "设备制造与装配",
        "矿山与矿物加工设备",
        "泵、风机和变速箱大修",
      ],
      supportedEquipment: [
        "旋转设备（泵、风机、变速箱、输送机）",
        "物料搬运系统",
        "加工和包装机械",
        "定制机械总成",
      ],
      technicalRequirements: [
        "详细图纸或 CAD 文件（STEP、DWG、PDF）",
        "材料等级和热处理规格",
        "表面光洁度和涂层要求",
        "公差和检验标准",
      ],
    },
    "industrial-consumables": {
      name: "工业耗材",
      tagline: "过滤器、密封材料和维护用品的定期供应——可预测、按计划交付。",
      description: "按定期计划采购工业耗材。HISVIA 管理供应商关系、质量一致性和交付时间，让您无需建立中国采购团队即可维持库存。",
      items: [
        { name: "Industrial Filters", specs: "Hydraulic, fuel, coolant, and process filters; cellulose, synthetic, and metal mesh media" },
        { name: "Sealing Materials", specs: "Gasket sheets, spiral-wound gaskets, PTFE tape, O-ring cord; various materials and standards" },
        { name: "Maintenance Supplies", specs: "Cleaning solvents, lubricants, anti-seize compounds, corrosion inhibitors" },
      ],
      applications: [
        "工厂日常维护和停机检修规划",
        "设备分销商耗材库存计划",
        "服务公司定期供应协议",
        "偏远现场维护（矿山、油气）",
      ],
      supportedEquipment: [
        "所有工业压缩机和泵系统",
        "液压动力单元和润滑系统",
        "工艺过滤与分离设备",
        "通用工业机械维护",
      ],
      technicalRequirements: [
        "现有零件号或规格",
        "每月或每季度消耗量",
        "储存和保质期要求",
        "包装和标签偏好",
      ],
    },
  },
};
