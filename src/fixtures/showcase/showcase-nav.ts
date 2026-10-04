/**
 * Navigation content for the `/portfolio` and `/ui-preview` showcase shell.
 *
 * Every string here is invented for display. There is no real person, school,
 * employer, project outcome, metric or link anywhere in this file, and the
 * "待确认" entries exist precisely so an unconfirmed claim is never filled in
 * with a plausible-looking guess.
 */

/** How a target is reachable today. Drives both the badge and whether it is a link. */
export type ShowcaseAvailability = "mock" | "preview" | "closed" | "placeholder";

/** One entry in the product navigation preview. */
export type ShowcaseNavItem = {
  /** Stable key; also used as the rendered route hint. */
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly summary: string;
  readonly availability: ShowcaseAvailability;
  /** What this entry will do once the real screen is wired by Codex. */
  readonly planned: string;
};

/** One step in the Job Copilot project page's development-process section. */
export type ShowcaseProcessStep = {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
};

/**
 * Honest availability labels. `closed` must never be restyled into something that
 * reads as shipped, and `placeholder` must never be styled as a working control.
 */
export const AVAILABILITY_LABELS: Record<ShowcaseAvailability, string> = {
  mock: "Mock 演示",
  preview: "预演页可用",
  closed: "本预览未接入",
  placeholder: "待确认",
};

/**
 * Availability semantics for assistive technology. The visible label is short, so
 * the full sentence lives here instead of being duplicated in every component.
 */
export const AVAILABILITY_DESCRIPTIONS: Record<ShowcaseAvailability, string> = {
  mock: "该入口目前只展示虚构的 Mock 数据，不代表真实结果。",
  preview: "该入口已有可打开的预演页面，使用虚构演示数据。",
  closed: "该入口在本预览中只显示卡片；正式项目中的页面状态请以原路由为准。",
  placeholder: "该内容需要用户确认后才能填写，当前为中性占位。",
};

/**
 * The product navigation preview.
 *
 * `/` is the only existing route linked from this Mock shell. Other existing
 * routes remain unlinked here so this preview cannot be mistaken for a live
 * authenticated flow; their availability is described per card.
 */
export const showcaseNavItems: readonly ShowcaseNavItem[] = [
  {
    id: "/portfolio",
    href: "/portfolio",
    title: "作品集",
    summary: "作品项目列表：每个项目只放可对外的定位与状态，项目详情在项目页。",
    availability: "mock",
    planned: "作品集列出公开项目的定位与状态；个人资料与成果细节在本人确认前保持占位。",
  },
  {
    id: "/ui-preview",
    href: "/ui-preview",
    title: "产品预览",
    summary: "Job Copilot 的视觉外壳、导航结构和各功能入口状态。",
    availability: "mock",
    planned: "当前页面就是本页自身，用于集中说明各入口的开放状态。",
  },
  {
    id: "/",
    href: "/",
    title: "功能入口首页",
    summary: "连接已存在页面的导航首页。",
    availability: "preview",
    planned: "已可在正式路由中打开，列出当前真实存在的页面入口。",
  },
  {
    id: "/login",
    href: "/login",
    title: "登录与会话",
    summary: "输入测试账号登录，查看 checking / guest / authenticated 状态。",
    availability: "closed",
    planned: "正式登录页面已存在；本预览不接入登录，也不创建真实 Cookie。",
  },
  {
    id: "/my-profile",
    href: "/my-profile",
    title: "我的求职画像",
    summary: "读取并保存当前账号的画像，包含版本与冲突处理。",
    availability: "closed",
    planned: "正式画像页面已存在；本预览不读取或提交画像内容。",
  },
  {
    id: "/jd-review",
    href: "/jd-review",
    title: "JD 核对",
    summary: "粘贴岗位描述，完成免费分段、人工分类与确认。",
    availability: "closed",
    planned: "正式 JD 核对页面已存在；本预览不构造可信确认。",
  },
  {
    id: "/analyses",
    href: "/analyses",
    title: "岗位分析报告",
    summary: "展示成功且已校验的报告，包含证据关联与岗位核验项。",
    availability: "closed",
    planned: "正式报告展示页已有固定样例；本预览只说明入口形态。",
  },
  {
    id: "/applications",
    href: "/applications",
    title: "投递记录",
    summary: "展示投递进度、下一步动作与备注。",
    availability: "closed",
    planned: "正式投递页已有固定样例；读写与统计 API 尚未建立，本预览不宣称可写入。",
  },
];

/**
 * Preview pages that actually exist under `/ui-preview/**`.
 *
 * These are the only links the showcase hub offers besides `/`, `/portfolio` and
 * `/ui-preview` itself. They stay separate from `showcaseNavItems` because
 * `showcaseNavItems` describes the *product's* navigation (whose real routes the
 * preview must not link to), while these are showcase-owned preview routes.
 */
export type ShowcasePreviewPage = {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly summary: string;
  /** Which states this preview page can be switched through. */
  readonly states: string;
};

export const showcasePreviewPages: readonly ShowcasePreviewPage[] = [
  {
    id: "login",
    href: "/ui-preview/login",
    title: "登录（Mock 预览）",
    summary: "登录表单的外壳，以及提交中、成功、输入无效、账号密码错误、服务不可用五种 Mock 结果。",
    states: "初始、提交中、成功、输入无效、账号密码错误、服务不可用",
  },
  {
    id: "profile",
    href: "/ui-preview/profile",
    title: "求职画像（Mock 预览）",
    summary: "画像编辑区的外壳，含读取中、空、失败、未登录，以及版本冲突时保留输入的处理。",
    states: "读取中、正常、空状态、失败、未登录、版本冲突",
  },
  {
    id: "jd-review",
    href: "/ui-preview/jd-review",
    title: "JD 核对（Mock 预览）",
    summary: "JD 分段与人工分类界面的外壳；未确认的行始终显示为待人工确认。",
    states: "读取中、正常、空状态、失败、未登录、草稿冲突",
  },
  {
    id: "evidence-plan",
    href: "/ui-preview/evidence-plan",
    title: "证据计划（Mock 预览）",
    summary:
      "逐条证据核对：有限支持、暂无线索、待核对三种选择，以及来源动作、缺口与绑定版本冲突的呈现。",
    states: "读取中、正常、空状态、失败、未登录、提交中、版本冲突",
  },
  {
    id: "analysis-run",
    href: "/ui-preview/analysis-run",
    title: "生成请求（Mock 预览）",
    summary:
      "发起岗位分析请求的表单与安全说明，以及已受理、已完成、未通过校验与结果不确定的跟踪状态。",
    states: "就绪、填写校验、未登录、受阻、提交中、生成中、已完成、生成未通过、结果不确定",
  },
  {
    id: "analyses",
    href: "/ui-preview/analyses",
    title: "报告列表（Mock 预览）",
    summary:
      "生成请求列表：生成中、已生成、未通过校验与结果不确定四种结果在同一列表里怎么区分。正式 /analyses 目前是固定报告样例，尚无列表读取接口。",
    states: "读取中、正常、空状态、失败、未登录",
  },
  {
    id: "report",
    href: "/ui-preview/report",
    title: "岗位分析报告（Mock 预览）",
    summary: "通过校验的报告按「结论 → 证据 → 建议」分层；未通过与不确定状态不展示任何报告正文。",
    states: "读取中、正常、空状态、失败、未登录、生成未通过、结果不确定",
  },
  {
    id: "applications",
    href: "/ui-preview/applications",
    title: "投递记录（Mock 预览）",
    summary: "投递记录列表的外壳；准备中不会被渲染成已投递，未关联报告的记录明确说明。",
    states: "读取中、正常、空状态、失败、未登录",
  },
  {
    id: "dashboard",
    href: "/ui-preview/dashboard",
    title: "Dashboard 总览（Mock 预览）",
    summary: "产品总览的布局评审：每个数字都带演示标记，不展示真实统计。",
    states: "读取中、正常、空状态、失败、未登录",
  },
];

/** Section anchors for the portfolio's own table of contents. */
export const portfolioSections = [
  { id: "project", label: "作品项目" },
  { id: "contact", label: "联系方式" },
] as const;

/* ------------------------------------------------------------------ */
/* Personal-site navigation (站点首页 / 简历 / 作品集)               */
/* ------------------------------------------------------------------ */

export type ShowcaseSiteNavId = "home" | "resume" | "portfolio";

/**
 * The three entries of the personal-site navigation, in display order. Every
 * showcase page renders the same three; only the `current` marker changes.
 *
 * `/ui-preview` is deliberately not a top-level entry: it belongs to the Job
 * Copilot project page (`/portfolio/job-copilot`). Pages under it therefore
 * call `showcaseSiteNav()` with no argument and mark nothing as current,
 * instead of falsely claiming that one of the three entries is current.
 */
export const showcaseSiteLinks = [
  { id: "home", href: "/showcase", label: "站点首页" },
  { id: "resume", href: "/resume", label: "简历" },
  { id: "portfolio", href: "/portfolio", label: "作品集" },
] as const;

/**
 * Builds the nav array for one page. Kept here so all pages share one list —
 * the nav is content, not component state. Omit the argument on pages that
 * are not one of the three top-level entries, so nothing is marked current.
 */
export function showcaseSiteNav(currentId?: ShowcaseSiteNavId) {
  return showcaseSiteLinks.map((link) => ({
    href: link.href,
    label: link.label,
    current: currentId !== undefined && link.id === currentId,
  }));
}

/**
 * Process steps are honest engineering description, not a highlight reel: they
 * say what was built and checked, not how impressive it was.
 */
export const showcaseProcessSteps: readonly ShowcaseProcessStep[] = [
  {
    id: "contract",
    title: "先定契约，再写界面",
    detail:
      "正式接口与类型由主线约定；当前 Mock 页面用虚构样例展示形态。真实接线时再把展示层与请求宿主分开。",
  },
  {
    id: "mock-first",
    title: "纯虚构 Mock 先行",
    detail:
      "预览阶段全部使用虚构样例，不连接数据库、模型或认证服务，也不把 Mock 结果说成真实产出。",
  },
  {
    id: "state-coverage",
    title: "把状态当交付物",
    detail:
      "后续逐页实现并检查 loading、ready、empty、error、unauthorized，以及写入时的冲突与不确定状态。",
  },
  {
    id: "boundary",
    title: "守住真实性与权限边界",
    detail:
      "没有画像证据的经历、数字和职责一律不写；未开放的动作使用禁用态或明确的演示标签。",
  },
  {
    id: "responsive",
    title: "桌面与手机逐档验收",
    detail:
      "在桌面与窄屏下逐档检查水平溢出、焦点可见性和长中文换行，键盘可以完成全部导航。",
  },
];

/** Portfolio project card body. All placeholders, no invented achievements. */
export const portfolioProject = {
  name: "Job Copilot",
  tagline: "个人求职决策与管理工具",
  summary:
    "目标是把求职决策收拢到一处：记录真实画像，逐条核对岗位要求与已有证据，得到可追溯的分析与简历建议，再记录投递进度。",
  highlights: [
    {
      id: "grounded",
      title: "建议有据可查",
      detail: "每条建议都要指回画像证据或岗位原文；没有证据支撑的部分标为待确认，而不是补一段合理猜测。",
    },
    {
      id: "boundary",
      title: "区分证据强度",
      detail: "个人练习、可迁移能力和同任务经历被分开标注，不把个人项目说成正式企业经历。",
    },
    {
      id: "state",
      title: "状态先说清楚",
      detail: "失败和不确定的分析不会被包装成成功报告，界面直接说明当前处于哪一步。",
    },
  ],
} as const;

/** Contact entries. Every value is a placeholder and no address is fabricated. */
export const portfolioContacts = [
  {
    id: "email",
    label: "邮箱",
    placeholder: "待确认",
    note: "确认后可替换为公开邮箱地址，本页当前不提供任何真实联系方式。",
  },
  {
    id: "profile",
    label: "在线主页",
    placeholder: "待确认",
    note: "确认后的公开主页地址才会填在这里；未确认前不放任何外链。",
  },
] as const;

/**
 * Deliberately-empty verification list. The Job Copilot project page must show
 * this as an empty state rather than inventing outcomes, numbers or上线成绩.
 */
export const portfolioOutcomes: readonly { id: string; label: string; detail: string }[] = [{ id: "code", label: "工程代码与架构说明", detail: "公开快照展示 Next.js、Supabase、异步 Worker 和证据规则；项目仍在开发阶段。" }, { id: "tests", label: "虚构材料回归", detail: "公开快照的 281 项本地测试通过；真实数据库完整验收与模型质量仍待完成。" }, { id: "trial", label: "两次原型试用", detail: "根据用户反馈简化证据核对操作；不据单用户试用推导一般用户效果。" }];
