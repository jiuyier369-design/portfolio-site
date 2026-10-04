import type { AnalysisFailureCode, AnalysisRunStatus } from "@/types/api";
import { reportPreviewCompleted } from "./report-preview";

/**
 * Mock-only display shape for the report-list preview (`/ui-preview/analyses`).
 *
 * Defined by `docs/frontend-host-contract-20261004.md` §2 as
 * `AnalysisListPreviewItem`. It borrows `AnalysisRunStatus` and
 * `AnalysisFailureCode` from `src/types/api.ts` so the invented rows cannot
 * drift away from the real vocabulary, but it is **not** an HTTP type: the real
 * list endpoint does not exist yet (`/api/analyses` is POST only), and nothing
 * here is read from or sent anywhere. `src/types/**` is never modified.
 *
 * There is deliberately no `userId`, `jdText`, `profileSnapshot` or model
 * metadata on this shape — those belong to `JobAnalysisRecord` and must never
 * reach a list component.
 */

export type AnalysisListPreviewItem = {
  /** Mock-only list key. A failed or uncertain row is a request, not a report. */
  readonly rowId: string;
  readonly requestId: string;
  /** Only a completed run has an analysis that can be opened. */
  readonly analysisId: string | null;
  readonly company: string;
  readonly jobTitle: string;
  readonly status: AnalysisRunStatus;
  readonly failureCode: AnalysisFailureCode | null;
  readonly startedAt: string;
  readonly finishedAt: string | null;
};

/** Short badge wording per run result. */
export const analysesPreviewStatusLabels: Record<AnalysisRunStatus, string> = {
  processing: "生成中",
  completed: "已生成",
  failed: "未通过校验",
  uncertain: "结果不确定",
};

/**
 * Neutral, frozen wording per run result. Nothing here attributes a failure to
 * a cause: `REPORT_INVALID` and the uncertain codes are only used to pick one of
 * these sentences, and the raw code is never rendered.
 */
export const analysesPreviewStatusNotes: Record<AnalysisRunStatus, string> = {
  processing: "生成请求已提交，结果尚未返回；不用占位内容冒充报告。",
  completed: "报告已生成并通过自动校验，内容待用户核对。",
  failed: "生成结果未通过自动校验，报告未保存。",
  uncertain: "本次结果暂无法确认，可以查询原请求的状态。",
};

/** Only the completed row offers a link; the rest are disabled controls. */
export const analysesPreviewActions: Record<AnalysisRunStatus, string> = {
  processing: "查看报告（生成中）",
  completed: "查看报告 →",
  failed: "查看报告（暂无报告）",
  uncertain: "查看报告（暂无报告）",
};

/**
 * Four invented generation requests, one per run result.
 *
 * The completed row reuses `reportPreviewCompleted` for its id, company, job
 * title and date, so the list and the report page cannot describe two different
 * analyses. The other three rows carry `analysisId: null` — a failed or
 * uncertain row is a generation request, never a saved report, and it must not
 * offer a report link.
 */
export const analysesPreviewItems: readonly AnalysisListPreviewItem[] = [
  {
    rowId: "DEMO-RUN-1",
    requestId: "DEMO-REQ-1",
    analysisId: reportPreviewCompleted.id,
    company: reportPreviewCompleted.company,
    jobTitle: reportPreviewCompleted.jobTitle,
    status: "completed",
    failureCode: null,
    startedAt: reportPreviewCompleted.createdOn,
    finishedAt: reportPreviewCompleted.createdOn,
  },
  {
    rowId: "DEMO-RUN-2",
    requestId: "DEMO-REQ-2",
    analysisId: null,
    company: "演示企业 · 启航",
    jobTitle: "内容运营实习生（虚构演示岗位）",
    status: "processing",
    failureCode: null,
    startedAt: "2026-10-02",
    finishedAt: null,
  },
  {
    rowId: "DEMO-RUN-3",
    requestId: "DEMO-REQ-3",
    analysisId: null,
    company: "演示企业 · 远航",
    jobTitle: "用户研究实习生（虚构演示岗位）",
    status: "failed",
    failureCode: "REPORT_INVALID",
    startedAt: "2026-10-03",
    finishedAt: "2026-10-03",
  },
  {
    rowId: "DEMO-RUN-4",
    requestId: "DEMO-REQ-4",
    analysisId: null,
    company: "演示企业 · 星桥",
    jobTitle: "产品运营实习生（虚构演示岗位）",
    status: "uncertain",
    failureCode: "MODEL_RESULT_UNCERTAIN",
    startedAt: "2026-10-03",
    finishedAt: "2026-10-03",
  },
];
