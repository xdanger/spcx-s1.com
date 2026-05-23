// Chinese translation registry keyed by node id.
//
// Translations land in stage-grouped batches. The validator's rule 12
// (phase=4) treats a missing key, an undefined value, or an empty
// string the same: a translation gap. Add entries here and the build
// picks them up automatically through the `getZh` helper.
//
// Proper-noun rules from docs/voice-and-visual.md: SpaceX, Falcon 9,
// Dragon, Starlink, Starshield, COLOSSUS, Grok, xAI, Macrohard,
// Terafab, NASA, FCC, FAA, etc. — and personal names like Elon Musk —
// stay in English inside the Chinese string. The Musk quote and other
// verbatim S-1 quotes keep their English original on screen; the zh
// string is the translation rendered beneath, not a replacement (see
// dualText in apps/web/src/lib/localized.ts).

export const zhTranslations: Readonly<Record<string, string>> = Object.freeze({
  // Stage 0 — authored mission briefing (third-person, by the site authors).
  "stage0.briefing.disclaimer":
    "本项目是 SpaceX 于 2026 年 5 月公开发布的 Form S-1 文件的爱好者可视化作品，与 SpaceX 官方无任何关联，也不构成投资建议。",
  "stage0.briefing.conceit":
    "本项目把这份招股说明书读作一次发射任务流程，依次穿过任务背景、业务、风险、治理与来源注解。",
  "stage0.briefing.sources":
    "通过来源按钮，可在已引用的段落旁显示对应的 S-1 行号；仅本简报与片尾字幕属于本项目原创，不带来源标注。",
  "stage0.briefing.controls":
    "声音默认关闭；本项目会遵循系统的减少动效偏好，本简报亦可通过信息按钮再次打开。",

  // Stage 1 — verbatim Musk quote. Per docs/voice-and-visual.md the
  // English original stays on screen and this zh string renders
  // beneath. ColdOpen.tsx's secondary parser accepts either a leading
  // ASCII em-dash or the full-width double em-dash for the attribution
  // line, so we use the natural Chinese convention here.
  "stage1.cold-open.musk-quote":
    "“你想要早上醒来时觉得未来一片光明——而这正是成为太空文明的意义所在。它关乎对未来的信念，关乎相信未来会比过去更好。我想不出还有什么比走向群星、置身其间更令人激动的事。”\n——Elon Musk",

  // Stage 2 — Who We Are. Prose nodes render zh beneath the verbatim
  // English original via dualText. KPI/milestone metadata labels stay
  // English in this PR — the per-node label localisation is a separate
  // refactor on the schema.
  "stage2.overview.integrated-infrastructure":
    "SpaceX 创立于 2002 年，是全球唯一一家在太空、连接和 AI 三大领域同时构建未来集成软硬件基础设施的公司。我们的核心是建造者。我们设计、制造、发射并运营基于前沿技术的产品与服务，包括世界上最先进的火箭与飞船。我们安全、可靠地将航天员、卫星与其他载荷送入太空，让任务造福地球生命。2023 年以来，我们每年发射全球 80% 以上的入轨质量，Falcon 火箭任务成功率超过 99%。我们还运营着一张高速、低时延的全球宽带数据与通信网络，由约 9,600 颗低地球轨道 Starlink 宽带与移动卫星组成；截至 2026 年 3 月 31 日，已向 164 个国家、地区和市场的数百万消费者、企业和政府客户提供连接服务。借助专用的卫星-移动星座，我们为约 30 个国家的地面网络提供补充，大幅减少了移动通信“盲区”。",
  "stage2.overview.ai-pillar":
    "AI 有潜力同时改善太空探索与地球生活，从而加速 SpaceX 实现“使生命跨越多个行星”、“理解宇宙的真实面貌”、“将意识之光扩展至群星”的使命。xAI 创立于 2023 年，于 2026 年初被 SpaceX 收购，现已成为我们垂直整合体系中不可或缺的一根支柱。我们正在以业内领先的速度与成本效率快速建设 AI 算力基础设施——从地球起步，目标延伸至太空。我们的基础设施支持 Grok 的训练与推理，Grok 已成为全球最先进的前沿模型之一。Grok 以创始人 Elon Musk 的使命为出发点，是一个面向“求真”的 AI 模型——我们将求真定义为以证据、逻辑、实证数据与第一性原理思维为基础，对客观真实的不懈追求。我们希望尽可能准确地理解并解释宇宙的运行方式。模型首发两年内，Grok 在科学推理上达到了前沿水平（以 GPQA Diamond 评分衡量），用时比其他主流模型厂商更短。Grok 还与 X 实时信息、娱乐与言论自由平台深度集成，X 作为我们 AI 生态的基础分发与数据引擎，进一步增强了 Grok 的求真目标。",
  "stage2.kpi.mass-to-orbit":
    "截至 2026 年 3 月 31 日，SpaceX 入轨质量总计约 7,400 公吨，Falcon 火箭任务成功率超过 99%。",
  "stage2.kpi.orbital-launches":
    "Falcon 火箭任务成功率达 99%。我们已完成约 650 次轨道航天发射，其中超过 540 次由经过实际飞行验证的 Falcon 火箭执行。",
  "stage2.kpi.starlink-subscribers":
    "只需一套 Starlink Kit，就能在地球任意位置获得宽带连接。截至 2026 年 3 月 31 日，我们在低地球轨道运行约 9,600 颗 Starlink 宽带与移动卫星，构成全球最先进的宽带星座，为约 1,030 万 Starlink 用户提供互联网连接，覆盖 164 个国家、地区和市场。",
  "stage2.milestone.2008.falcon-1": "首家成功研制并发射液体燃料火箭入轨的私营公司（2008 年）。",
  "stage2.milestone.2012.dragon-dock":
    "首家成功将私营飞船与国际空间站对接的私营公司（2012 年）。",
  "stage2.milestone.2015-2017.reuse":
    "首家完成动力反向着陆（2015 年）并实现轨道级火箭一级复用（2017 年）。",
  "stage2.milestone.2019.leo-constellation":
    "首家开始部署大规模低地球轨道宽带卫星星座（2019 年）。",
  "stage2.milestone.2020.crewed-flight":
    "首家将航天员送入轨道的私营公司，让美国重新具备往返国际空间站运送航天员的能力（2020 年）。",
  "stage2.milestone.2022.terminals": "首家实现消费级相控阵用户终端规模化制造（2022 年）。",
  "stage2.milestone.2025-2026.constellation-ai":
    "首家部署大规模低地球轨道卫星-移动星座（2025 年）；首家建成吉瓦级 AI 训练集群与目前最大的一体化超级计算机（2026 年）；首套吉瓦级 Megapack 储能装置（2026 年）；以及目前唯一具备规模化建设在轨 AI 算力能力的公司。",

  // Stage 3 — The Three Pillars. Lists are parsed by parseList /
  // parseGroupedList on the primaryText; for zh we keep the same
  // bullet/numbering shape so the same parser handles both locales.
  "stage3.space.summary":
    "- 太空。SpaceX 是唯一破解“规模化进入太空”这一难题的公司，颠覆了一个长期停滞、规避风险、成本结构倒置的行业。SpaceX 通过第一性原理思维抛弃既有的行业假设，依据物理学的根本规律构建解决方案。强烈的使命驱动、工程师文化以及极致的垂直整合，让我们做到了许多人认为不可能的事。我们以 Falcon 系列火箭开创了高频次、可靠且可负担的太空进入方式。2015 年，我们率先成功回收 Falcon 9 一级，在行业中至少领先十年。曾经每次需要数十亿美元的航天发射，如今只需数千万美元，从根本上降低了太空进入的成本，并开启了在太空中创建新事业的机会。",
  "stage3.space.vehicles":
    "我们的主要运载工具与飞船包括：\n- Falcon 9。作为全球首款轨道级快速可复用火箭，Falcon 9 于 2010 年首飞，完全一次性使用时近地轨道（LEO）有效载荷约为 23 公吨。截至 2026 年 3 月 31 日，Falcon 9 已完成约 620 次轨道航天发射，任务成功率超过 99%。据 NASA 资料，2010 年首个版本的 Falcon 9 将每公斤发射成本降至约 2,700 美元，比 18,500 美元/公斤的历史均价低约 85%。\n- Falcon Heavy。2018 年首飞，将一辆 Tesla Roadster 全电动跑车及其假人乘员“Starman”送入绕日轨道。LEO 有效载荷约 64 公吨，是部分可复用的超重型运载火箭，专门设计用于将大型载荷送入轨道。按起飞推力衡量，Falcon Heavy 是目前全球最强大的现役火箭之一；截至 2026 年 3 月 31 日已执行 11 次发射，任务成功率 100%。\n- Dragon。2012 年由 Falcon 9 发射，Dragon 成为首艘向国际空间站运送货物并返回的商业飞船；八年后，又成为首艘把人送往国际空间站的私营飞船。自 2020 年以来，Dragon 已安全运送来自 20 个国家的 78 名机组成员。\n- Starship。2023 年首飞，设计为完全可复用的超重型运载火箭。Starship V3 设计目标为以完全可复用配置向地球轨道运送 100 公吨载荷，并实现类似商用航空的快速周转。未来几代 Starship 目标是再翻倍。我们已执行 11 次 Starship 飞行测试，并计划进行第 12 次测试，将首次使用新一代 Starship 与 Super Heavy 助推器，由下一代 Raptor 引擎驱动，从 Starbase 全新设计的发射工位起飞。我们预计 Starship 将在 2026 年下半年开始向轨道交付载荷，并已实现“筷子”机械臂在原发射塔上抓回助推器等创新里程碑——这将支持快速翻新与复用，让单日多次发射成为可能。",
  "stage3.space.business-detail":
    "收入——太空。太空业务的收入主要来自：（i）面向商业、民用、国际和政府客户的发射服务；（ii）使用 Dragon 飞船向国际空间站运送货物与航天员；（iii）我们与第三方共同执行的飞行任务；以及（iv）相关工程与制造服务。我们既向客户出售 Falcon 9 与 Falcon Heavy 的发射任务，又支撑 Starlink 自有星座的部署。Starship 投入运营后，预计将以更低单位成本承担更大份额的入轨能力，从而扩展我们能够承接的任务类型并打开新的收入来源。我们与美国政府客户保持长期合作关系，包括 NASA 与国家安全相关机构，并已成为美国政府的主要发射供应商。",
  "stage3.connectivity.summary":
    "连接。我们的连接业务包括 Starlink Consumer Broadband、Enterprise Solutions、Government Solutions 与 Starlink Mobile。\n- Starlink Consumer Broadband。我们运营全球规模最大、最先进的天基互联网宽带服务，提供接近光纤水平的下载速度（截至 2026 年 3 月 31 日，住宅用户高峰时段中位数为 225 Mbps），并具备在地球任何位置（包括两极）提供服务的技术能力。这得益于约 9,600 颗在轨 Starlink 宽带与移动卫星，约占截至 2026 年 3 月 31 日全部活跃可机动卫星的 75%。我们计划在 2026 年下半年通过 Starship 部署下一代 V3 卫星，每颗单星下行容量达 1 Tbps；单次 Starship 发射预计可向 LEO 部署多达 60 颗 V3 卫星，相对一次 Falcon 9 发射可带来约 20 倍的 Starlink 下行容量提升。\n- Enterprise Solutions。SpaceX 是众多企业的关键合作伙伴。我们为建筑、农业、零售、电信、酒店、航空、海事和陆地移动等行业提供 Starlink 的高速、低时延、可靠互联网服务，适用于现场办公点、远端工地、科研站点、钻井平台、乡村医院、飞机、邮轮、列车与酒店等部署场景；也服务于零售和金融服务等对高可用性与远端连接要求高的固定站点客户。\n- Government Solutions。面向政府客户，我们为公共服务、社会影响、人道主义工作与灾害响应提供高速、抗压的连接，即便在最偏远、最具挑战性的环境中也能运行。Starshield 则在我们商用 LEO 卫星星座工程与运营经验基础上，为美国政府客户与国家安全应用打造专用的安全卫星网络。\n- Starlink Mobile。我们提供卫星到移动设备的连接，为地面网络提供补充，大幅减少约 30 个国家的移动通信“盲区”。我们与六大洲约 30 家移动网络运营商合作，让消费者、企业与公共部门客户能在更多地点使用既有手机，在灾害与停电期间支撑关键通信，并为低带宽移动设备和 IoT 应用打开新场景。",
  "stage3.connectivity.business-detail":
    "收入——连接。连接业务的收入主要来自：（i）向消费者、企业和政府客户提供的 Starlink 宽带服务订阅与流量计费；（ii）Starlink Mobile 提供的卫星到移动连接服务；（iii）Starlink 用户终端、Mini 终端、企业级天线等设备销售；以及（iv）面向美国政府客户的 Starshield 安全网络服务。订阅型与流量型收入构成连接业务的主要长期增长来源。我们的卫星制造、地面站建设、终端供应链与运营网络高度垂直整合，使我们能够持续扩大用户规模、提升网络容量并降低单位成本。",
  "stage3.connectivity.starlink-mobile":
    "连接业务的增长战略：扩大 Starlink 宽带客户群。短期内，我们将聚焦三件事：（1）提升网络容量，让现有市场承接更多用户；（2）推出新的硬件代际（包括下一代用户终端与 V3 卫星），扩大下行容量并降低单位获客成本；（3）扩展国际市场与监管覆盖。在 Starlink Mobile 方面，我们将通过更多移动网络运营商合作扩大覆盖、新增直连手机的国家市场，并把卫星到移动服务从短信和语音扩展到数据。在企业与政府方向，我们将继续与航空、海事、能源、运输及国防客户合作，把 Starlink 与 Starshield 嵌入更多任务关键型场景。",
  "stage3.ai.summary":
    "AI。我们运营一个高度垂直整合的 AI 平台。\n- AI 算力基础设施。xAI 已在地面 AI 算力基础设施的构建与扩展上处于领先位置，成为首家部署一体化吉瓦级 AI 训练集群的公司。我们自有并运营我们认为是地球上最大的 AI 训练数据中心集群，包括 COLOSSUS 与 COLOSSUS II。与 Tesla 和 Intel 共同开展的 Terafab 芯片制造计划，将进一步把我们的垂直整合延伸至芯片设计与制造环节，以缓解未来潜在的芯片短缺、优化算力性能并降低整体算力成本。我们已与 Tesla 就 Terafab 的未来开发达成总体框架；任何具体项目（包括开发时间表、里程碑和资本支出）仍需另行谈判并签订协议，目前尚未确定。我们认为 AI 持续增长的关键约束都是物理性的——芯片制造、数据中心基础设施与电力供给；AI 的未来将由对物理栈的掌控者决定。\n- 求真前沿模型。自 2023 年 11 月发布 Grok-1 以来，我们已推出四个主要版本及若干显著变体，迭代速度位居业内前列。Grok 与 X 的深度集成是关键的竞争差异化——可专享访问每日约 3.5 亿条原创帖子的实时信息流，为 Grok 提供新鲜度、相关性与上下文感知。\n- 消费与企业应用。我们以前沿模型和算力基础设施为依托，提供消费与企业应用。Macrohard 是我们与 Tesla 共同开发的智能体 AI 平台，旨在通过自主智能体完全模拟数字工作流程并增强人类对计算机的操作能力，我们认为 Macrohard 有潜力从根本上重塑公司的组织与运作方式，从而大幅提升人类生产力。",
  "stage3.ai.compute-advantage":
    "我们 AI 算力基础设施的优势与增长战略。算力为何重要：前沿大语言模型对训练算力的需求每数月翻倍，而推理算力的需求则随产品落地继续放大。SpaceX 的 AI 业务在算力建设上的竞争力来源于三点：自有训练集群（已部署吉瓦级一体化 AI 训练集群，并扩展至 COLOSSUS 与 COLOSSUS II）；端到端供应链（与 Tesla、Intel 合作推进 Terafab 芯片制造计划）；以及与 X 的实时信息流和 Starlink 全球网络协同形成的数据与分发优势。我们将持续扩大地面 AI 算力规模，并把轨道 AI 算力作为长期路径——利用太阳能在轨道上提供连续电力，以低耗散方式补充地面电网无法承载的算力增量。",
  "stage3.ai.growth-strategies":
    "AI 业务增长战略：（1）持续扩大 Grok 的消费端订阅与企业端业务（包括 SuperGrok、SuperGrok Heavy、Grok Business、Grok Enterprise、xAI Gov 等产品线）；（2）借助 X 平台的实时信息与原创内容形成数据飞轮，强化 Grok 的求真目标；（3）通过 COLOSSUS、COLOSSUS II 以及未来轨道 AI 算力提升训练与推理产能；（4）与 Tesla 合作 Terafab，深度整合芯片设计与制造；（5）研发 Macrohard 等智能体应用，重塑企业数字工作流程；以及（6）以 Starlink 网络作为分发渠道，把 AI 应用带至包括偏远地区在内的全球客户。",

  // Stage 4 — non-verbatim list parsed by parseList. Preserves the
  // 7-item numbered shape so the parser emits seven cards in zh just
  // like en. Heading line + intro paragraph land in the parser's
  // preamble slot, matching the existing English render path.
  "stage4.algorithm.repeatable-business-model":
    "我们的可复制商业模式\n我们的商业模式建立在一套可复制、以工程为驱动的框架之上：将我们无与伦比的发射能力、极致的垂直整合、快速迭代与严格的资本纪律相结合，从而构建可持续的大规模业务。我们通过以下核心原则贯彻这套框架：\n1. 利用我们无与伦比的发射能力实现大规模扩张；\n2. 识别并开创全新的万亿美元级市场机会；\n3. 以世界一流的工程能力与第一性原理思维设计解决方案；\n4. 应用“算法准则”（减少愚蠢、删除、优化、加速、自动化）；\n5. 一路垂直整合到最终客户；\n6. 持续降低成本、提升产能；以及\n7. 产生可观的现金流并再投资于未来。",
  // Verbatim algorithm step 4 (the single-line Musk-coined formula).
  // The zh translation will render beneath the verbatim English line
  // per dualText's verbatim path.
  "stage4.algorithm.five-step": "4. 应用“算法准则”（减少愚蠢、删除、优化、加速、自动化）；",

  // Stage 5 — Roadmap. Lists keep their original "Space / Connectivity /
  // AI / Future Markets" group headings in English so the same
  // GROUP_ACCENT lookup and parseGroupedList path work in zh; only the
  // bullet bodies switch to Chinese.
  "stage5.roadmap.why-now":
    "为什么是现在\n自人类文明诞生以来，我们始终生活在一个天体——地球——之上。文明被局限于单一行星，意味着面对在行星尺度上不可预测、不可控的生存级威胁。走出我们唯一熟悉的家园，能为人类文明带来物种层面的冗余，也确保意识之光不会被绑定在某个迟早会遭遇宇宙剧变的行星上。我们不希望人类重蹈恐龙的命运。我们希望让人类带着兴奋面向未来，相信我们正进入一个长期繁荣、令人激动的丰盈时代。\n几十年来，人类在行星与星辰之间穿梭的现实始终诱人地接近、却仍被锁在科幻的纸页与屏幕之中。我们已具备更深入地理解、探索宇宙并最终让生命跨越多个星系的能力，正在成为一种能够突破地球摇篮、走向其他世界的文明。在我们坚守这一根本使命的同时，进入太空的能力也持续为地球生命带来红利——通过大幅降低太空进入成本，我们得以把使命延伸到地球上最紧迫的挑战上，例如让 30 多亿尚未连网的人接入互联网与人类的集体知识。\nAI 时代的到来进一步加剧了使命的紧迫性，因为 AI 不仅能加速太空探索，也能在地球上带来革命性的社会进步。然而 AI 释放潜力的能力，直接受制于不断攀升的资源需求。在地球上，为承接算力增长而建设数据中心的速度，远超过去 15 年几乎停滞不前的美国发电量增长（2008-2023 年复合增长率仅为 0.1%）。在最近的需求高峰下，美国发电量在 2023-2025 年间的年增长率仍低于 3%，而同期中国增速约为其两倍。这种供需失衡已经对地面电网、供应链与环境造成不可持续的压力。太阳储存着太阳系约 99.8% 的能量；我们相信，太空才是 AI 时代解决地球能源约束的唯一真正可扩展的方案——天基太阳能阵列由于持续光照、不受大气干扰、可保持最优朝向，单位面积发电量可达地面太阳能的五倍以上。SpaceX 凭借大规模卫星制造与发射能力可快速进入太阳同步轨道，处于捕获天基太阳能的有利位置。\n我们相信当前的太空努力将催生颠覆性突破，重塑地球产业，并在月球、火星及更远处催生新的万亿美元级市场。特别是建立月球存在将使我们能够支撑太瓦级的年度 AI 算力增长，推动更深空的探索与产业化，并作为通往火星文明的跳板。我们相信，下一次人类范式跃迁，是创造一个具有韧性、持续扩张、推动各前沿持续创新的多星球文明，最终把我们推向 Kardashev II 阶段，迎来前所未有的经济扩张时代，同时为人类未来的生存风险提供保障。",
  // Group headings ("Space", "Connectivity", "AI", "Future Markets")
  // stay in English so `parseGroupedList` and the GROUP_ACCENT lookup
  // both still match. Only the bullet bodies switch to Chinese.
  "stage5.roadmap.growth-summary":
    "我们的增长战略\nSpace\n- 提升发射载荷能力\n- 建立月球经济，包括月面的货运、制造与能源生产\nConnectivity\n- 扩大 Starlink Broadband 用户群\n- 拓展 Starlink Mobile 服务\n- 提升星座容量\nAI\n- 扩大消费级 AI 平台的商业化收入\n- 提升 X 的商业化水平\n- 深化企业与政府客户的使用\n- 扩大地面电力与 AI 算力基础设施的规模\n- 规模化部署轨道 AI 算力\n- 自研芯片设计与制造\n- 推出数字化人类增强能力\nFuture Markets\n- 点对点地面旅行\n- 太空旅游\n- 在轨制造\n- 月球与火星的人员与货物运输\n- 月球与火星的能源生产\n- 月球与火星的制造能力\n- 小行星采矿",
  "stage5.roadmap.growth-detail":
    "业务——增长战略\n我们认为，我们正在构建全球最具雄心的增长路径之一，涵盖空间、连接与 AI 三大板块以及对未来市场的长期布局。在 Space 板块，我们的优先事项是把 Falcon 系列的高频次、高可靠运营推向极限，并通过 Starship 实现完全可复用的超重型运载能力，把入轨成本相对历史均值再下降 99% 以上；同时通过月面货运、能源与制造活动建立月球经济。\n在 Connectivity 板块，我们将扩大 Starlink Broadband 的全球订户规模，借助 V3 卫星每星 1 Tbps 的下行容量以及单次 Starship 发射多达 60 颗的部署效率来支撑容量增长；继续扩大 Starlink Mobile 与移动网络运营商的合作，把卫星到移动连接的覆盖范围、可用业务（短信、语音、数据）与所支持的国家持续扩展；并面向企业与政府客户深化关键任务场景与 Starshield 安全网络的应用。\n在 AI 板块，我们将扩大消费级订阅（SuperGrok 系列）、企业服务（Grok Business / Enterprise）与政府服务（xAI Gov）的商业化；通过 X 平台的实时数据持续强化 Grok 的求真目标；通过 COLOSSUS、COLOSSUS II 与未来轨道 AI 算力扩大训练与推理产能；通过与 Tesla、Intel 合作的 Terafab 计划补齐芯片设计与制造能力；并通过 Macrohard 等智能体应用面向企业数字化场景拓展。\n在 Future Markets 板块，我们将以 Starship 的能力为基础，把握点对点地面旅行、太空旅游、在轨制造、月球与火星的运输与能源、以及小行星采矿等长期机会。这些方向具有显著的技术、监管与商业化不确定性，可能在很长一段时间内仍处于验证阶段。",
  "stage5.roadmap.future-markets":
    "Future Markets\n- 点对点地面旅行——利用 Starship 的快速到达能力实现城市间高速运输；\n- 太空旅游——为私人与公共部门客户提供轨道乃至更远的旅行体验；\n- 在轨制造——利用微重力环境进行特殊材料、生物医学与高端零部件的制造；\n- 月球与火星的人员与货物运输——为政府、科研与商业客户提供运力；\n- 月球与火星的能源生产——以太阳能与配套基础设施支撑深空活动；\n- 月球与火星的制造能力——就地利用资源进行结构与设备制造；\n- 小行星采矿——长期获取稀缺金属与挥发物的可能路径。",
  "stage5.caveat.commercial-viability":
    "我们面临的挑战\n我们的业务与增长战略，以及最终“使生命跨越多个行星、理解宇宙的真实面貌、把意识之光延伸至群星”这一使命的实现，面临一系列挑战。这一使命驱动我们的决策，也构成我们商业计划的基础——该计划建立在以前所未有的规模建造、商业化和运营服务与产品之上。这一目标要求我们开发并集成复杂、新颖的技术、建立新的工艺与基础设施，并在大量供应商、承包商、监管机构与利益相关方之间协调。由于我们试图以无先例的规模执行，在设计、工程、采购、施工、调试与运行表现上都面对更高的不确定性。我们执行增长战略的能力高度依赖于 Starship 的成功研发、扩产，以及发射频次的提升；这两者都受限于复杂新技术研发与部署所固有的挑战与不确定性。\n此外，我们在“Our Growth Strategies”项下提到的许多项目——包括规模化部署轨道 AI 算力、规模化制造 AI 芯片、建立月球经济、运送人员与货物到月球与火星、研发人类增强系统等——涉及显著的技术复杂度、未经验证的甚至尚未存在的技术；这些项目可能无法实现商业化。我们在本招股说明书其他章节中所描述的诸多创新产品与服务最终也可能并不成功，可能需要巨额支出、尚未达成的创新或尚未存在的技术。因此，对涉及未经验证或全新创新的项目（包括每年向轨道部署 100 吉瓦算力的目标、建立月球经济与跨行星产业化、以及达成这些目标所需的发射频次）而言，确定时间表可能十分困难甚至不可能。我们的增长战略执行所需时间可能长于预期，您的投资也可能在您预期的时间范围内无法获得回报，甚至完全无法获得回报。\n此外，我们预期市场机会中有相当一部分关联到“Future Markets”项下的行业。其中部分行业（如太空旅游与月球货运）仍处于萌芽阶段；其他行业（包括在轨制造、月球客运、火星客运货运、月球与火星的能源生产、月球与火星的制造能力、小行星采矿）目前并不存在。尽管我们相信这些行业会随时间发展，但它们的出现方式——包括商业化时点、采纳的速度与规模、相关的竞争、技术、监管、地缘政治与经济框架——可能与我们当前预期存在重大差异。我们的 Space、Connectivity 与 AI 业务也面临一系列额外的挑战与不确定性。",

  // Stage 6 — The Numbers. KPI nodes render via structured metadata
  // (label/value/unit), so the zh text is the translation of the
  // backing verbatim source line that the validator hashes against. It
  // shows up in the source-toggle path and in any future zh KPI label
  // surface, not in the headline number.
  "stage6.kpi.revenue-2023":
    "| 收入 | 4,694 美元 | | 4,067 美元 | | 18,674 美元 | | 14,015 美元 | | 10,387 美元 |",
  "stage6.kpi.revenue-2024":
    "| 收入 | 4,694 美元 | | 4,067 美元 | | 18,674 美元 | | 14,015 美元 | | 10,387 美元 |",
  "stage6.kpi.revenue-2025":
    "| 收入 | 4,694 美元 | | 4,067 美元 | | 18,674 美元 | | 14,015 美元 | | 10,387 美元 |",
  "stage6.kpi.net-income-2023":
    "| 净利润（亏损） | (4,276) 美元 | | (528) 美元 | | (4,937) 美元 | | 791 美元 | | (4,628) 美元 |",
  "stage6.kpi.net-income-2024":
    "| 净利润（亏损） | (4,276) 美元 | | (528) 美元 | | (4,937) 美元 | | 791 美元 | | (4,628) 美元 |",
  "stage6.kpi.net-income-2025":
    "| 净利润（亏损） | (4,276) 美元 | | (528) 美元 | | (4,937) 美元 | | 791 美元 | | (4,628) 美元 |",
  "stage6.financials.summary-data":
    "历史合并财务与运营数据摘要\n下表汇总了我们的合并财务与运营数据，包括财务年度收入、毛利、营业亏损、净亏损、调整后 EBITDA、自由现金流等关键指标，分年度展示，并附注按地区、客户与分部维度的拆分。完整表格请参见英文原文与“Management's Discussion and Analysis of Financial Condition and Results of Operations”相关章节。",
  "stage6.financials.mda-results":
    "Management's Discussion and Analysis of Financial Condition and Results of Operations（管理层讨论与分析）\n本节比较了截至 2026 年 3 月 31 日的三个月与 2025 年同期，以及截至 2025、2024、2023 年 12 月 31 日的年度合并经营成果。我们的收入、毛利、研发投入、资本开支与净利润（亏损）按 Space、Connectivity、AI 三个分部进行了详细分解，同时披露了管理层在分段经营、投资组合与现金流方面的判断。完整管理层讨论请参阅英文原文。",
  "stage6.financials.capitalization":
    "CAPITALIZATION（资本结构）\n下表展示了截至最近资产负债表日的现金及现金等价物、有息债务、股东权益等组成。其中包含我们的 SpaceX Credit Facility 与 SpaceX Bridge Loan 借款、按类别披露的普通股以及股东权益分项。完整表格请参见英文原文。",
  "stage6.financials.use-of-proceeds":
    "USE OF PROCEEDS（募集资金用途）\n我们预计本次发行将获得净额约若干亿美元的资金。在确定具体用途之前，我们一般打算将净额用于一般公司用途，包括营运资金、资本支出，以及继续投入研发——尤其是 Starship、Starlink、AI 算力基础设施与未来市场相关项目。我们也可能将部分资金用于偿还信贷工具下的借款，或用于潜在的战略性投资与收购，尽管目前对此没有具体承诺。",
  "stage6.financials.dividend-policy":
    "DIVIDEND POLICY（分红政策）\n我们目前不打算就 Class A 普通股或任何其他股权类别申报或支付现金分红，预计在可预见的将来均不会派发现金分红。我们当前的政策是将留存收益及任何未来现金流再投资于业务的运营、扩张与战略机会。任何未来分红决定将由董事会自行裁量，需综合考虑财务状况、经营成果、资本要求、合同限制、税务与法律因素以及董事会认为相关的其他因素。",
  "stage6.financials.segment-breakdown-2025":
    "Space ｜ 截至 12 月 31 日的财政年度 ｜ 2025 与 2024 年同比变化 ｜ 详细分部数据请参见英文原文。本表按 Space、Connectivity、AI 三个分部分别披露了 2024 与 2025 年的收入、营业利润（亏损）、调整后 EBITDA、资本支出与关键运营指标，并提供同比变化幅度。",

  // Stage 7 — The Anomaly Log. Translates the verbatim summary line for
  // each risk taxonomy entry. The expanded body still shows the
  // English text on screen; the zh string renders as the translation
  // beneath via dualText.
  "stage7.summary.principal-risk-factors":
    "投资我们 Class A 普通股涉及风险与不确定性。以下为可能让本次投资具有投机性或风险性的主要因素摘要，所有内容在“Risk Factors”一节中均有更完整的描述。本摘要应与“Risk Factors”章节一同阅读，且不应被视为完整的总结。涉及风险类别包括但不限于：Starship 规模化研发与发射频次的延迟或失败；获取、维持或更新太空相关监管许可与频谱授权的延迟与困难；AI 产品与 X 平台面临的复杂、不断变化的法规与执法环境；以无先例规模设计、研发与部署产品和服务时存在的执行、成本与时序风险；发射延迟与失败、太空环境下的硬件故障、轨道资源竞争与碰撞、关键基础设施中断、对第三方供应商的依赖、电力与算力短缺、市场竞争、新近形成的 AI 业务整合风险，以及全球宏观与地缘政治环境等。",
  "stage7.taxonomy.mission-starship":
    "我们业务的相关风险\nStarship 的规模化研发或之后达到所需发射频次、可复用性与能力上的任何失败或延迟，都将延迟或限制我们执行增长战略的能力——包括下一代卫星的部署、全球卫星到移动连接以及轨道 AI 算力的部署——可能对我们的业务、财务状况、经营成果与未来前景产生重大不利影响。本类别还包括 Starship 项目自身的研发、测试与生产风险，以及与之相关的发射场、地面设施与监管审批风险。",
  "stage7.taxonomy.regulatory-approvals":
    "获取、维持或更新太空相关活动所需的监管批准与许可证（包括美国联邦航空管理局（FAA）的发射与再入许可）方面的延迟或困难，将严重延迟或扰乱我们的运营、损害业务，或限制我们执行业务战略的能力。本类别还涵盖卫星通信的频谱授权与许可（包括 FCC 与国际频谱），以及环境、出口管制、跨境数据等监管议题。",
  "stage7.taxonomy.operational-space-systems":
    "我们的卫星、运载工具和其他太空相关技术（以及未来的轨道 AI 算力）在严酷且不可预测的太空环境中运行，面临广泛而独特的太空相关风险，可能导致设备故障或失效。低地球轨道卫星星座的持续扩张以及与空间碎片或其他航天器碰撞的风险，可能限制或损害我们的发射灵活性与卫星部署。关键卫星网络、地面站、发射、制造、航天器或数据中心基础设施的运行中断，可能造成显著停机、运营延误或服务中断。火箭、卫星与飞船的制造、测试与发射（包括对其的复用尝试）本身就存在内在风险，可能导致人员伤亡、财产损失、环境损害或其他不利的环境影响——任何此类事件都可能造成重大损失，包括声誉损害与法律责任。",
  "stage7.taxonomy.sector-ai-infrastructure":
    "我们扩大 AI 产品的能力依赖于地面与轨道 AI 算力基础设施，而后者又依赖于电力、AI 处理器与其他关键组件及电信服务的可用性；上述任何短缺或中断都将对我们的业务、财务状况、经营成果与未来前景产生重大不利影响。本类别还涵盖与算力相关的供应链风险、芯片自研与制造进度风险、AI 法规演变与产品合规风险、模型与数据集的版权与隐私争议，以及 AI 产品商业化路径的不确定性。",
  "stage7.taxonomy.financial-capital-markets":
    "研发与维护本招股说明书所述技术与基础设施需要持续大额资本投入。我们的资本开支节奏、债务融资能力、信贷协议下的限制性条款，以及未来现金流的不确定性，都可能限制我们的发展速度。本类别还涵盖 Class A 普通股市场表现的波动、未来再融资的可及性与成本、合规与税务变化、外汇风险、宏观经济与利率环境，以及对资本市场的高度敏感性。",
  "stage7.taxonomy.governance-ownership":
    "我们的治理与所有权结构带来一系列风险。我们将作为“受控公司”（controlled company）运营，受 Mr. Musk 控制的多重投票权 Class B 普通股的影响。我们对 Mr. Musk 高度依赖；他将其时间分散于多家公司，且我们没有针对他的关键人员人寿保险。我们的双层股权结构、Texas 重新设立公司与法院选择条款、以及与 Tesla、X、xAI、Cursor 等关联方的交易，都可能形成利益冲突并放大治理风险。",
  "stage7.highlight.in-orbit-satellites-uninsured":
    "我们的保险策略可能不足以覆盖所有商业风险。我们已经从一组太空在轨保险方案撤出——也就是说，绝大多数 Starlink 与 Starshield 卫星在轨期间没有覆盖性保险。这是基于我们对卫星可靠性、低单位成本快速重建能力的判断，但意味着如果发生大规模在轨故障或失联，相关损失将由公司自身承担，可能对我们的业务、财务状况、经营成果与未来前景产生重大不利影响。",
  "stage7.highlight.no-key-person-insurance-musk":
    "我们没有针对 Mr. Musk 的关键人员人寿保险。我们没有为 Mr. Musk 投保关键人员人寿保险，因此如果他无法或不再以现在的方式参与公司事务，相关损失将完全由公司承担，可能对我们的业务、财务状况、经营成果与未来前景产生重大不利影响。",
  "stage7.highlight.musk-not-full-time":
    "Mr. Musk 并非全职专注于本公司业务。虽然 Mr. Musk 投入了大量时间和精力到 SpaceX，但他还在 Tesla、X、xAI 以及未来可能的其他实体担任重要角色，这些角色对他的时间与精力构成持续的竞争。这意味着公司不能依赖他在任意特定时段的全职投入。",
  "stage7.highlight.musk-senior-advisor":
    "Mr. Musk 此前曾担任美国总统高级顾问。Mr. Musk 此前曾担任 United States 总统的 Senior Advisor，今后他在公司之外的角色也可能给我们带来政治、声誉或监管层面的连带影响。",
  "stage7.highlight.cursor-fees":
    "Cursor——交易终止费 15 亿美元 + 递延服务费 85 亿美元。在 Cursor 交易终止与递延服务约定下，如果我们决定（i）终止与 Cursor 的合作或（ii）未能在交割前若干日内满足约定的若干条件，我们将面临 15 亿美元的交易终止费以及 85 亿美元的递延服务费义务，这些义务将对我们的财务状况与未来现金流构成显著压力。",
  "stage7.highlight.tesla-macrohard-terafab-unfinalized":
    "Tesla / Macrohard / Terafab 相关条款尚未最终确定。我们与 Tesla 在 Macrohard、Terafab 以及其他若干战略合作上仍处于框架协议阶段；任何具体项目（包括开发时间表、里程碑与资本支出）仍需另行谈判并签订协议，目前尚未确定。这一不确定性意味着我们对该等合作的商业化路径与时间表的判断存在调整空间，可能影响相关业务的进度与预期。",
  "stage7.caveat.commercial-viability-crosslink":
    "我们面临的挑战（与 Stage 5 商业化可行性提示交叉引用）\n请参阅 Stage 5 中关于商业化可行性的完整提示——其中涉及 Starship 规模化研发、轨道 AI 算力、月球经济、跨行星运输、人类增强等多个尚未存在或未经验证的市场。所有这些方向都可能在长时间内无法实现商业化，相关投资也可能无法在可预期时间内回收。请把本节作为对所有未来市场板块的统一注意提示。",

  // Stage 8 — Who Steers the Ship. Each governance block keeps the
  // English structural body and pairs it with a zh translation of the
  // same passage.
  "stage8.governance.founder":
    "创始人与受控公司状态\nElon Musk 是我们的创始人、首席执行官、首席技术官与董事会主席。Mr. Musk 还在 Tesla、X、xAI 以及其他实体担任重要角色，他在 SpaceX 的投入与其他角色之间存在持续的竞争。完成本次发行后，我们将作为“controlled company”（受控公司）运营——根据纽约证券交易所规则，这意味着我们可豁免若干公司治理要求，包括董事会独立性比例、提名与薪酬委员会组成等要求。Mr. Musk 通过其持有的多重投票权 Class B 普通股以及若干关联实体，控制本公司股东大会上多数表决权，可决定董事会构成与公司战略走向。",
  "stage8.governance.musk-dependency":
    "我们高度依赖 Mr. Musk 持续提供的服务，他是我们的首席执行官、首席技术官与董事会主席，也是公司在产品、技术、文化与战略方向上的核心驱动者。如果他因任何原因不再以现在的方式参与公司事务，我们可能无法在短期内找到具有同等影响力的替代者。我们没有为 Mr. Musk 投保关键人员人寿保险。此外，他将其时间分散于 Tesla、X、xAI 以及其他实体，未来还可能在我们体系之外承担更多重要角色（包括公职），这些都可能影响他在 SpaceX 的投入。",
  "stage8.governance.dual-class":
    "受控公司——双层股权结构\n完成本次发行后，我们将成为“controlled company”。我们的股权结构为：Class A 普通股拥有一票表决权；Class B 普通股拥有十票表决权，由 Mr. Musk 持有；Class C 普通股将在 IPO 时按比例重新分类；Class D 普通股已获授权但尚未发行。Mr. Musk 通过其持有的 Class B 多重投票权股份及若干关联实体，将持续控制公司多数投票权，可决定董事会的组成以及任何提交股东表决的事项，包括合并、出售公司全部或几乎全部资产等。",
  "stage8.governance.texas-forum":
    "Texas 重新设立公司与法院选择条款\n我们已将公司注册地变更为 Texas。根据 Texas Business Organizations Code（TBOC），Texas Business Court, Eleventh Division（“Business Court”）将作为内部事务争议（包括股东派生诉讼、对董事或高管违反信义义务的索赔、依据 TBOC 提出的诉求等）的专属法院。该条款也指定 Texas 联邦地区法院作为 Securities Act 项下索赔的专属法院。这种法院选择机制可能限制股东选择对其更有利的司法辖区或法庭的能力，并增加诉讼成本。",
  "stage8.governance.related-party-transactions":
    "与 Cursor 的合作\n2026 年 4 月，我们与 Cursor 签订了一项算力与期权协议，约定如果我们决定终止合作，或未能在交割前若干日内满足约定的若干条件，我们将面临 15 亿美元的交易终止费以及 85 亿美元的递延服务费义务。该交易作为关联方交易披露。我们还披露了与 Tesla 在 Macrohard、Terafab 以及其他战略合作上的框架协议（尚未最终敲定）、与 X / xAI 的合作（包括 2026 年的 xAI 并购）、以及 Valor 等关联方交易。请参阅财务报表附注以查看完整列表与定价机制。",
  "stage8.governance.related-party-business-detail":
    "合并财务报表附注——关联方交易\n本节进一步披露了与 Valor 等关联方的交易细节，包括相关方关系、交易性质、对价金额与披露依据；同时说明了 2026 年 Q1 与 2025 年度若干被认定为关联方交易的项目（包括 transaction II）。相关详细数据、估值方法与会计处理请参见英文原文中的财务报表附注。",

  // Stage 9 — The Horizon. The kardashev framing and future markets
  // blocks reuse the same source ranges as Stage 5 with a different
  // node id, so the validator hashes them against the same English
  // passage and the zh translation is rendered beneath in both stages.
  "stage9.horizon.kardashev-framing":
    "为什么是现在 —— Kardashev II 框架\n自人类文明诞生以来，我们始终生活在一个天体——地球——之上。文明被局限于单一行星，意味着面对在行星尺度上不可预测、不可控的生存级威胁。走出我们唯一熟悉的家园，能为人类文明带来物种层面的冗余，也确保意识之光不会被绑定在某个迟早会遭遇宇宙剧变的行星上。我们相信，下一次人类范式跃迁，是创造一个具有韧性、持续扩张、推动各前沿持续创新的多星球文明，最终把我们推向 Kardashev II 阶段——一个能够利用所在恒星全部能量输出的文明。在这个阶段，月球经济、火星定居与轨道 AI 算力共同构成跨行星基础设施的基本骨架。",
  "stage9.horizon.future-markets-summary":
    "Future Markets\n- 点对点地面旅行\n- 太空旅游\n- 在轨制造\n- 月球与火星的人员与货物运输\n- 月球与火星的能源生产\n- 月球与火星的制造能力\n- 小行星采矿",
  "stage9.horizon.lunar-economy":
    "建立月球经济。推进月球表面的进入能力，代表着把人类的工业、能源与算力延伸到地球之外的一次决定性步骤。我们计划利用 Starship 和未来的月球质量驱动器（lunar mass driver）作为月面货运通道，逐步建立月面能源生产、就地制造以及面向地球与深空的物流体系。月球经济将释放出对原材料、稀缺金属与挥发物的获取路径，为火星定居与跨行星产业化奠定基础，同时通过太阳同步轨道与月面太阳能阵列支撑太瓦级的年度 AI 算力增长。",
  "stage9.horizon.future-markets-detail":
    "Future Markets（未来市场）——详细方向\n- 点对点地面旅行：利用 Starship 实现的城市间高速运输能力；\n- 太空旅游：从轨道旅游延伸到深空旅游；\n- 在轨制造：在微重力环境下进行特殊材料、生物医学与高端零部件制造；\n- 月球与火星的人员与货物运输；\n- 月球与火星的能源生产，作为深空活动与轨道 AI 算力的能源支撑；\n- 月球与火星的就地制造能力；以及\n- 小行星采矿，作为长期获取稀缺金属与挥发物的可能路径。\n这些方向都具有显著的技术、监管与商业化不确定性，可能长时间处于验证阶段。",
  "stage9.caveat.commercial-viability":
    "我们面临的挑战\n本节内容与 Stage 5 的商业化可行性提示重复呈现，并不可被关闭——所有未来市场（包括 Starship 规模化、轨道 AI 算力、月球经济、跨行星运输、人类增强等）都可能在长时间内无法实现商业化。请把本节视为对所有未来市场板块的统一注意提示，并参阅 Stage 5 与本节英文原文中关于挑战、不确定性与时间表的完整描述。",
  "stage9.horizon.closing-line":
    "在地球上重新定义产业，在月球、火星及更远处缔造新产业——我们正在真正地建造未来的基础设施。",
});
