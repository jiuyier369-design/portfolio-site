/**
 * Invented dashboard content for the `/ui-preview/dashboard` Mock page.
 *
 * The real product has no statistics API yet — the dashboard is a planned
 * overview, not an implemented route. Everything here is fictional and uses
 * stable DEMO ids. The preview exists so the layout of an overview can be
 * reviewed without ever claiming a real number was computed from real data.
 */

export type DashboardPreviewReport = {
  readonly id: string;
  readonly company: string;
  readonly jobTitle: string;
  readonly createdOn: string;
};

export type DashboardPreviewNextAction = {
  readonly id: string;
  readonly company: string;
  readonly action: string;
  readonly dueHint: string;
};

/**
 * Summary numbers. Each value is displayed next to its own "演示" marker; the
 * preview must never present them as statistics computed from real records.
 */
export const dashboardPreviewStats = {
  profileFacts: 3,
  reports: 2,
  applications: 5,
  inProgress: 3,
} as const;

export const dashboardPreviewReports: readonly DashboardPreviewReport[] = [
  {
    id: "DEMO-RPT-1",
    company: "演示企业 · 远航",
    jobTitle: "客户成功顾问",
    createdOn: "2026-09-19",
  },
  {
    id: "DEMO-RPT-2",
    company: "演示企业 · 星桥",
    jobTitle: "AI 应用运营",
    createdOn: "2026-09-17",
  },
];

export const dashboardPreviewNextActions: readonly DashboardPreviewNextAction[] = [
  {
    id: "DEMO-ACT-1",
    company: "演示企业 · 远航",
    action: "记录招聘方回复",
    dueHint: "已投递，等待反馈",
  },
  {
    id: "DEMO-ACT-2",
    company: "演示企业 · 星桥",
    action: "完成线上测评",
    dueHint: "测评中",
  },
  {
    id: "DEMO-ACT-3",
    company: "演示企业 · 云杉",
    action: "准备需求分析案例",
    dueHint: "面试中",
  },
];

/**
 * Honest scope note shown on the page itself: which pieces of a real dashboard
 * the preview does NOT attempt, because no read/write/statistics API exists yet.
 */
export const dashboardPreviewLimits = [
  "不计算真实统计：没有投递、报告或画像的读写与聚合 API，页面数字全部为虚构演示值。",
  "不展示登录状态判断：本预览不知道也不模拟当前是否已登录。",
  "不提供任何操作入口：新增、编辑、状态流转按钮一律不出现，避免假装可写。",
] as const;
