/**
 * Invented application records for the `/ui-preview/applications` Mock page.
 *
 * Every company, role, date and note here is fictional and uses stable DEMO
 * ids, so the preview is unmistakably demo data. The field names mirror the
 * frozen `ApplicationRecord` contract so the layout can be reviewed against the
 * same shape the real list will eventually receive, but nothing here is read
 * from or written to any service.
 *
 * Status wording mirrors `APPLICATION_STATUS_LABELS` in the frozen
 * `applications-demo` fixture: the preview and the real page must never name the
 * same status differently.
 */

export type ApplicationsPreviewStatus =
  | "preparing"
  | "applied"
  | "assessment"
  | "interview"
  | "offer"
  | "closed";

export type ApplicationsPreviewRecord = {
  readonly id: string;
  readonly company: string;
  readonly jobTitle: string;
  readonly city: string | null;
  readonly direction: string | null;
  readonly appliedOn: string | null;
  readonly status: ApplicationsPreviewStatus;
  readonly nextAction: string | null;
  readonly notes: string | null;
  /** Whether a report was linked. When false the row must say so plainly. */
  readonly hasLinkedReport: boolean;
};

/** Same wording as the frozen `APPLICATION_STATUS_LABELS`. */
export const applicationsPreviewStatusLabels: Record<ApplicationsPreviewStatus, string> = {
  preparing: "准备中",
  applied: "已投递",
  assessment: "测评中",
  interview: "面试中",
  offer: "录用沟通",
  closed: "已结束",
};

/** Generic placeholder for an optional field the record carries as `null`. */
export const applicationsPreviewEmptyField = "未填写";

/**
 * `preparing` means nothing was sent yet, so a missing date reads as
 * "尚未投递" rather than the generic "未填写" — same rule as the real list.
 */
export const applicationsPreviewNotApplied = "尚未投递";

/**
 * Fictional records. Company names are deliberately generic ("演示企业…") and
 * ids carry the DEMO prefix; no record represents a real submission.
 */
export const applicationsPreviewRecords: readonly ApplicationsPreviewRecord[] = [
  {
    id: "DEMO-APP-1",
    company: "演示企业 · 启航",
    jobTitle: "AI 产品助理",
    city: "上海",
    direction: "AI 产品",
    appliedOn: null,
    status: "preparing",
    nextAction: "核对校招资格与岗位职责",
    notes: "演示记录，尚未真实投递。",
    hasLinkedReport: false,
  },
  {
    id: "DEMO-APP-2",
    company: "演示企业 · 远航",
    jobTitle: "客户成功顾问",
    city: "北京",
    direction: "客户成功",
    appliedOn: "2026-09-20",
    status: "applied",
    nextAction: "记录招聘方回复",
    notes: null,
    hasLinkedReport: true,
  },
  {
    id: "DEMO-APP-3",
    company: "演示企业 · 星桥",
    jobTitle: "AI 应用运营",
    city: null,
    direction: "AI 应用运营",
    appliedOn: "2026-09-18",
    status: "assessment",
    nextAction: "完成线上测评",
    notes: "演示用备注。",
    hasLinkedReport: true,
  },
  {
    id: "DEMO-APP-4",
    company: "演示企业 · 云杉",
    jobTitle: "解决方案助理",
    city: "杭州",
    direction: "解决方案",
    appliedOn: "2026-09-16",
    status: "interview",
    nextAction: "准备需求分析案例",
    notes: null,
    hasLinkedReport: true,
  },
  {
    id: "DEMO-APP-5",
    company: "演示企业 · 南屿",
    jobTitle: "客户运营",
    city: "深圳",
    direction: "客户成功",
    appliedOn: "2026-09-10",
    status: "closed",
    nextAction: null,
    notes: "流程已结束。",
    hasLinkedReport: false,
  },
];
