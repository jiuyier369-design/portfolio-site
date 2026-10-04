import type { ReviewChoice } from "@/types/evidence-plan";
import type { EvidenceType, QualificationStatus } from "@/types/job-copilot";
import { jdPreviewSegments } from "./jd-preview";

/**
 * Invented content for the `/ui-preview/evidence-plan` Mock page.
 *
 * The real thing is the W10 prototype at `/evidence-plan-demo`: a fictional,
 * in-memory review of one JD requirement at a time. There is no save endpoint
 * yet, so this preview never says a plan was saved, confirmed into an account,
 * or sent to a model. `src/types/**` is read by type import only.
 *
 * The rows deliberately reuse the `DEMO-JD-*` ids and the `DEMO-W11-*` fact ids
 * used by the JD-review and report previews, so all three pages read as one
 * fictional scenario instead of three unrelated ones.
 */

/** A curated source action offered for one requirement. */
export type EvidencePlanPreviewSelection = {
  readonly actionKey: string;
  readonly factId: string;
  /** The profile statement this action quotes. */
  readonly quote: string;
  /** `qualification` marks a server-established decision, not a picked link. */
  readonly evidenceType: EvidenceType | "qualification";
};

export type EvidencePlanPreviewRow = {
  readonly jdId: string;
  readonly category: string;
  readonly exactText: string;
  readonly choice: ReviewChoice;
  readonly selections: readonly EvidencePlanPreviewSelection[];
  readonly existingAction: string;
  readonly missingScope: string;
  readonly checked: boolean;
  /** Only ever a server-established decision; never inferred from a page click. */
  readonly qualificationStatus: QualificationStatus | null;
  /** Why this row cannot enter the plan yet, if it cannot. */
  readonly note: string | null;
};

/** Choice wording mirrors the W10 panel exactly. */
export const evidencePlanPreviewChoiceLabels: Record<ReviewChoice, string> = {
  limited_support: "有限支持",
  no_clue: "暂无线索",
  pending: "待核对",
};

export const evidencePlanPreviewChoiceNotes: Record<ReviewChoice, string> = {
  limited_support: "当前核对材料只支持部分范围，不代表整条要求已满足。",
  no_clue: "当前核对材料里暂无线索，不能据此断言本人没有相关经历。",
  pending: "可以停下继续检查，但待核对条目不能进入计划确认。",
};

export const evidencePlanPreviewQualificationLabel = "资格结论（服务端确立）";

/**
 * Binding shown in the header. A future host would invalidate a plan when any
 * of these moves — that is what the conflict scenario is about.
 */
export const evidencePlanPreviewBinding = {
  draftId: "DEMO-DRAFT-1",
  draftRevision: 3,
  profileVersion: 7,
} as const;

export const evidencePlanPreviewRows: readonly EvidencePlanPreviewRow[] = [
  {
    jdId: "DEMO-JD-1",
    category: "核心职责",
    exactText: "收集客户使用反馈，整理成可跟进的问题记录。",
    choice: "limited_support",
    selections: [
      {
        actionKey: "act-w11-4",
        factId: "DEMO-W11-4",
        quote: "在校内工具试用中收集使用反馈并整理问题记录",
        evidenceType: "same_task",
      },
    ],
    existingAction: "在校内工具试用中收集使用反馈并整理问题记录",
    missingScope: "企业客户反馈渠道、正式问题流转工具",
    checked: true,
    qualificationStatus: null,
    note: null,
  },
  {
    jdId: "DEMO-JD-2",
    category: "核心职责",
    exactText: "协助维护产品使用说明与常见问题文档。",
    choice: "limited_support",
    selections: [
      {
        actionKey: "act-w11-2",
        factId: "DEMO-W11-2",
        quote: "独立完成个人工具的界面与流程整理",
        evidenceType: "transferable",
      },
    ],
    existingAction: "独立完成个人工具的界面与流程整理",
    missingScope: "企业产品文档体系、多人协作维护",
    checked: false,
    qualificationStatus: null,
    note: null,
  },
  {
    jdId: "DEMO-JD-3",
    category: "资格条件",
    exactText: "本科在读或应届毕业生。",
    choice: "limited_support",
    selections: [
      {
        actionKey: "act-w11-1",
        factId: "DEMO-W11-1",
        quote: "本科在读",
        evidenceType: "qualification",
      },
    ],
    existingAction: "本科在读",
    missingScope: "",
    checked: true,
    qualificationStatus: "meets",
    note: null,
  },
  {
    jdId: "DEMO-JD-4",
    category: "未分类",
    exactText: "能清晰表达，并独立整理文档。",
    choice: "pending",
    selections: [],
    existingAction: "",
    missingScope: "",
    checked: false,
    qualificationStatus: null,
    note: "该行在 JD 核对中仍为未分类，不能进入证据计划确认。",
  },
];

/**
 * The JD items the rows refer to, taken from the JD-review preview so the two
 * pages can never show different text for the same id. DEMO-JD-5 is omitted: it
 * is a 加分项 already covered by the report preview, and four rows are enough to
 * show every choice once.
 */
export const evidencePlanPreviewRequirements = jdPreviewSegments
  .filter((segment) => segment.id !== "DEMO-JD-5")
  .map((segment) => ({ jdId: segment.id, category: segment.category }));
