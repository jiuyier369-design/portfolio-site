"use client";

import { useState } from "react";
import Link from "next/link";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import type { PreviewScenarioOption } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { analysisRunJobLabels } from "@/types/analysis-run-ui";
import type { AnalysisRunJobField, AnalysisRunJobFields } from "@/types/analysis-run-ui";
import {
  analysisRunPreviewAnalysisId,
  analysisRunPreviewBlockedReason,
  analysisRunPreviewFieldErrors,
  analysisRunPreviewFields,
  analysisRunPreviewRequestIds,
  analysisRunPreviewSafetyNotice,
  analysisRunPreviewStateNotes,
} from "@/fixtures/showcase/analysis-run-preview";
import { reportPreviewUncertain } from "@/fixtures/showcase/report-preview";
import styles from "./analysis-run-preview.module.css";

/**
 * Mock preview of the generation-request screen.
 *
 * The real `/analysis-run` route exists and is owned by the mainline. This
 * preview mirrors only the screen's shape and its state machine with fixtures:
 * nothing is sent, nothing costs anything, nothing is saved.
 *
 * The nine scenarios cover every `kind` of the frozen `AnalysisRunUiState`.
 * Only three things are clickable and all three are navigation, never business
 * actions: 查看报告 →, 去登录 →, 去核对 JD →. Every other control is disabled
 * and says so, because there is nothing behind it.
 */

const SCENARIO_OPTIONS: readonly PreviewScenarioOption[] = [
  { id: "ready", label: "就绪", note: "表单可以填写；发起按钮在预览里为禁用态。" },
  { id: "invalid", label: "填写校验", note: "校验未通过，错误显示在对应字段下方，输入保留。" },
  { id: "unauthorized", label: "未登录", note: "指向登录页，不展示空的个人数据。" },
  { id: "blocked", label: "受阻", note: "JD 草稿还有未确认条目，生成入口关闭并引导先去核对。" },
  { id: "submitting", label: "提交中", note: "请求已发出但尚未受理，不显示任何结果暗示。" },
  { id: "processing", label: "生成中", note: "已受理，结果尚未返回；可查询原请求状态。" },
  { id: "completed", label: "已完成", note: "生成完成并通过自动校验，可打开报告。" },
  { id: "failed", label: "生成未通过", note: "报告未保存，不显示任何报告正文，也不说明是哪一类原因。" },
  { id: "uncertain", label: "结果不确定", note: "结果暂无法确认，可查询原请求状态，不按成功处理。" },
];

type Scenario =
  | "ready"
  | "invalid"
  | "unauthorized"
  | "blocked"
  | "submitting"
  | "processing"
  | "completed"
  | "failed"
  | "uncertain";

/** Every line is a pretence about a future host; the component adds 「模拟：」. */
const DEMO_SCENARIO_TEXT: Record<Scenario, string> = {
  ready: "假设未来宿主读取到已确认的 JD 与完整画像，表单可以填写。",
  invalid: "假设未来宿主校验表单时返回 INVALID_INPUT，错误显示在对应字段下方。",
  unauthorized: "假设未来宿主读取会话返回 UNAUTHENTICATED，页面指向登录。",
  blocked: "假设未来宿主发现 JD 草稿存在未确认条目，生成入口关闭并引导先去核对。",
  submitting: "假设未来宿主已收到生成请求，正在等待受理结果。",
  processing: "假设未来宿主受理了 DEMO-REQ-2，结果尚未返回，可查询原请求状态。",
  completed: "假设未来宿主对 DEMO-REQ-1 返回已完成，报告通过自动校验。",
  failed: "假设未来宿主对生成请求返回 REPORT_INVALID，报告未保存。",
  uncertain: "假设未来宿主查询原请求，返回结果暂无法确认。",
};

const FIELD_ORDER: readonly AnalysisRunJobField[] = [
  "company",
  "jobTitle",
  "city",
  "direction",
  "jdSourceUrl",
];

export default function AnalysisRunPreviewSurface() {
  const [scenario, setScenario] = useState<Scenario>("ready");
  // Local only: whatever is typed here stays in the browser.
  const [fields, setFields] = useState<AnalysisRunJobFields>(analysisRunPreviewFields);

  const showErrors = scenario === "invalid";
  const errors = showErrors ? analysisRunPreviewFieldErrors : {};

  return (
    <>
      <PreviewScenarioBar
        label="预览场景"
        value={scenario}
        onChange={(id) => setScenario(id as Scenario)}
        options={SCENARIO_OPTIONS}
      />

      <div className={styles.panel}>
        <div className={styles.surface}>
          <h3 className={styles.surfaceTitle}>岗位信息</h3>
          <p className={styles.surfaceNote}>
            字段可以在预览里填写，输入不会离开浏览器；标签与正式页面的字段一致。
          </p>

          <div className={styles.formGrid}>
            {FIELD_ORDER.map((field) => (
              <div key={field} className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`analysis-run-${field}`}>
                  {analysisRunJobLabels[field]}
                </label>
                <input
                  id={`analysis-run-${field}`}
                  className={field === "jdSourceUrl" ? styles.inputMuted : styles.input}
                  type="text"
                  value={fields[field]}
                  readOnly={field === "jdSourceUrl"}
                  onChange={(event) =>
                    setFields((current) => ({ ...current, [field]: event.target.value }))
                  }
                />
                {errors[field] ? (
                  <p className={styles.fieldError}>{errors[field]}</p>
                ) : (
                  <p className={styles.fieldHint}>&nbsp;</p>
                )}
              </div>
            ))}
          </div>

          <p className={styles.safety}>{analysisRunPreviewSafetyNotice}</p>
        </div>

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.ready}</PreviewDemoScenario>
            <div className={styles.statusCard}>
              <p className={styles.statusTitle}>可以发起生成</p>
              <p className={styles.statusBody}>
                填写完成后可发起；本预览的发起按钮为禁用态，不会发起一次不存在的生成。
              </p>
              <ActionRow primary="发起生成（预览不可用）" />
            </div>
          </>
        ) : null}

        {scenario === "invalid" ? (
          <PreviewStateBlock
            kind="error"
            code="INVALID_INPUT"
            title="表单校验未通过"
            body="错误显示在对应字段下方，已填内容全部保留；不清除输入。"
            action="发起生成（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.invalid}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="生成请求属于个人数据；未登录时指向登录页。正式登录页已存在，本预览不接入。"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.unauthorized}</PreviewDemoScenario>
            <p className={styles.guideRow}>
              <Link href="/ui-preview/login" className={styles.guideLink}>
                去登录 →
              </Link>
            </p>
          </PreviewStateBlock>
        ) : null}

        {scenario === "blocked" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.blocked}</PreviewDemoScenario>
            <div className={styles.statusCard}>
              <p className={styles.statusTitle}>暂时无法发起生成</p>
              <p className={styles.statusBody}>
                还有岗位要求未确认；完成核对后再回来发起。
              </p>
              <p className={styles.blockedReason}>{analysisRunPreviewBlockedReason}</p>
              <p className={styles.guideRow}>
                <Link href="/ui-preview/jd-review" className={styles.guideLink}>
                  去核对 JD →
                </Link>
              </p>
            </div>
          </>
        ) : null}

        {scenario === "submitting" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.submitting}</PreviewDemoScenario>
            <div className={styles.statusCard}>
              <p className={styles.statusTitle}>正在提交生成请求</p>
              <p className={styles.statusBody}>
                请求已发出但尚未受理；控件禁用并提示进度，不显示任何结果暗示。
              </p>
              <ActionRow primary="发起生成（预览不可用）" />
            </div>
          </>
        ) : null}

        {scenario === "processing" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.processing}</PreviewDemoScenario>
            <div className={styles.statusCard}>
              <div className={styles.statusHead}>
                <p className={styles.statusTitle}>生成中</p>
                <RequestBadge requestId={analysisRunPreviewRequestIds.processing} />
              </div>
              <p className={styles.statusBody}>
                已受理，结果尚未返回；可以查询原请求状态，不会用占位内容冒充结果。
              </p>
              <ActionRow primary="查询状态（预览不可用）" />
            </div>
          </>
        ) : null}

        {scenario === "completed" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.completed}</PreviewDemoScenario>
            <div className={`${styles.statusCard} ${styles.statusCardDone}`}>
              <div className={styles.statusHead}>
                <p className={styles.statusTitle}>生成完成</p>
                <RequestBadge requestId={analysisRunPreviewRequestIds.completed} />
              </div>
              <p className={styles.statusBody}>{analysisRunPreviewStateNotes.completed}</p>
              <p className={styles.analysisId}>
                分析报告 {analysisRunPreviewAnalysisId}
              </p>
              <p className={styles.guideRow}>
                <Link href="/ui-preview/report" className={styles.guideLink}>
                  查看报告 →
                </Link>
              </p>
              <ActionRow primary="发起新请求（预览不可用）" />
            </div>
          </>
        ) : null}

        {scenario === "failed" ? (
          <PreviewStateBlock
            kind="error"
            code="REPORT_INVALID"
            title={analysisRunPreviewStateNotes.failed}
            body="未通过校验的内容不会保存，也不会在本页展示任何报告正文；不说明是哪一类原因。"
            action="发起新请求（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.failed}</PreviewDemoScenario>
            <p className={styles.requestMeta}>请求 {analysisRunPreviewRequestIds.failed}</p>
          </PreviewStateBlock>
        ) : null}

        {scenario === "uncertain" ? (
          <PreviewStateBlock
            kind="uncertain"
            title={analysisRunPreviewStateNotes.uncertain}
            body={reportPreviewUncertain.body}
            action="查询状态（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.uncertain}</PreviewDemoScenario>
            <p className={styles.requestMeta}>请求 {analysisRunPreviewRequestIds.uncertain}</p>
          </PreviewStateBlock>
        ) : null}
      </div>
    </>
  );
}

/** Disabled controls only — a preview must not offer an action that does nothing. */
function ActionRow({ primary }: { primary: string }) {
  return (
    <p className={styles.actionRow}>
      <button type="button" className={styles.closedAction} disabled>
        {primary}
      </button>
    </p>
  );
}

function RequestBadge({ requestId }: { requestId: string }) {
  return <span className={styles.requestBadge}>{requestId}</span>;
}
