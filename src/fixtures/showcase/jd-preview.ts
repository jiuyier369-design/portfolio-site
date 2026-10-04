/**
 * Invented JD content for the `/ui-preview/jd-review` Mock page.
 *
 * The company, role and every requirement here are fictional. The preview renders
 * these as plain display rows — it does not run the real segmentation rules and it
 * must not be described as producing a trustworthy confirmation.
 *
 * Category wording mirrors `jdCategoryLabels` in `src/types/jd-review.ts` so the
 * preview and the real page never name the same category differently.
 */

export type JdPreviewSegment = {
  readonly id: string;
  /** Line of the fictional JD this segment came from. */
  readonly source: string;
  readonly suggestedCategory: string;
  readonly category: string;
  /** Whether a human has explicitly set this row, versus the rule suggestion. */
  readonly confirmed: boolean;
};

export const jdPreviewRawText = [
  "岗位：客户成功实习生（虚构演示岗位）",
  "岗位职责",
  "1、收集客户使用反馈，整理成可跟进的问题记录。",
  "2、协助维护产品使用说明与常见问题文档。",
  "任职要求",
  "· 本科在读或应届毕业生。",
  "· 能清晰表达，并独立整理文档。",
  "加分项",
  "有个人 AI 应用实践者优先。",
  "公司介绍",
  "本岗位与公司均为虚构演示内容，不代表任何真实招聘信息。",
].join("\n");

export const jdPreviewSegments: readonly JdPreviewSegment[] = [
  {
    id: "DEMO-JD-1",
    source: "1、收集客户使用反馈，整理成可跟进的问题记录。",
    suggestedCategory: "核心职责",
    category: "核心职责",
    confirmed: true,
  },
  {
    id: "DEMO-JD-2",
    source: "2、协助维护产品使用说明与常见问题文档。",
    suggestedCategory: "核心职责",
    category: "核心职责",
    confirmed: true,
  },
  {
    id: "DEMO-JD-3",
    source: "· 本科在读或应届毕业生。",
    suggestedCategory: "资格条件",
    category: "资格条件",
    confirmed: true,
  },
  {
    id: "DEMO-JD-4",
    source: "· 能清晰表达，并独立整理文档。",
    suggestedCategory: "优先／加分项",
    // Left uncategorized on purpose: the preview must be able to show a row a
    // human has not yet classified, rather than implying a confirmed draft.
    category: "未分类",
    confirmed: false,
  },
  {
    id: "DEMO-JD-5",
    source: "有个人 AI 应用实践者优先。",
    suggestedCategory: "优先／加分项",
    category: "优先／加分项",
    confirmed: true,
  },
];

/** Categories the mock rows can be re-labelled as, for the classification preview. */
export const jdPreviewCategories = ["资格条件", "核心职责", "优先／加分项", "背景信息", "未分类"] as const;
