import type { AnalysisRunJobField, AnalysisRunJobFields } from "@/types/analysis-run-ui";
import { reportPreviewCompleted } from "./report-preview";

/**
 * Invented content for the `/ui-preview/analysis-run` Mock page.
 *
 * The real `/analysis-run` route exists and is owned by the mainline
 * (`AnalysisRunLiveHost` + the frozen `src/types/analysis-run-ui.ts`). This
 * preview mirrors only the screen's shape and its state machine with fixtures:
 * it sends nothing, costs nothing and saves nothing. `src/types/**` is read by
 * type import only and is never modified.
 *
 * `profile-preview.ts` and `report-preview.ts` are deliberately left untouched —
 * both were calibrated by Codex, so the company and job title for the completed
 * scenario are taken from `reportPreviewCompleted` rather than re-invented here.
 */

/**
 * Demo form values. The company and job title come from the same fictional
 * report the report page and the report-list page show, so one scenario cannot
 * describe three different jobs.
 *
 * `jdSourceUrl` is deliberately a sentence, not a URL: the preview must not
 * render a link or invent an address.
 */
export const analysisRunPreviewFields: AnalysisRunJobFields = {
  company: reportPreviewCompleted.company,
  jobTitle: reportPreviewCompleted.jobTitle,
  city: "",
  direction: "",
  jdSourceUrl: "演示占位：确认后的 JD 来源链接会显示在这里",
};

/** Previews of what INVALID_INPUT looks like: the typed value is never cleared. */
export const analysisRunPreviewFieldErrors: Partial<Record<AnalysisRunJobField, string>> = {
  company: "请填写公司名称。",
  city: "城市需为 2–20 个字符。",
};

/**
 * The same request ids the report-list preview uses, so a run shown here and a
 * row shown there are the same fictional request.
 */
export const analysisRunPreviewRequestIds = {
  completed: "DEMO-REQ-1",
  processing: "DEMO-REQ-2",
  failed: "DEMO-REQ-3",
  uncertain: "DEMO-REQ-4",
} as const;

/** Only the completed run has an analysis to open. */
export const analysisRunPreviewAnalysisId = reportPreviewCompleted.id;

/** Blocked reason shown as plain copy — the raw reason code is never rendered. */
export const analysisRunPreviewBlockedReason = "受阻原因（演示）：JD 草稿存在未确认条目";

/** Slot the real page fills with model and cost rules. */
export const analysisRunPreviewSafetyNotice =
  "安全说明：正式页面在此说明模型调用与费用规则。本预览不发起请求、不产生费用。";

/**
 * Frozen state wording, verbatim from the task card — never rephrased and never
 * attributed to a cause. `failed` and `uncertain` say what happened to the run,
 * not why.
 */
export const analysisRunPreviewStateNotes = {
  completed: "报告已生成并通过自动校验，内容待用户核对。",
  failed: "生成结果未通过自动校验，报告未保存。",
  uncertain: "本次结果暂无法确认。",
} as const;
