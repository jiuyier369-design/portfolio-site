"use client";

import { useState } from "react";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { scenarioOptions } from "@/fixtures/showcase/showcase-preview-states";
import {
  evidencePlanPreviewBinding,
  evidencePlanPreviewChoiceLabels,
  evidencePlanPreviewChoiceNotes,
  evidencePlanPreviewQualificationLabel,
  evidencePlanPreviewRows,
} from "@/fixtures/showcase/evidence-plan-preview";
import type { EvidencePlanPreviewRow } from "@/fixtures/showcase/evidence-plan-preview";
import { reportPreviewEvidenceLabels, reportPreviewQualificationLabels } from "@/fixtures/showcase/report-preview";
import styles from "./evidence-plan-preview.module.css";

/**
 * Mock preview of the evidence-plan review screen.
 *
 * The real thing is the W10 prototype at `/evidence-plan-demo`: a fictional,
 * in-memory review that never calls a model and never saves. This preview
 * renders the same shape with fixtures and **no interactivity** — every control
 * that would act is disabled, because there is nothing to act on.
 *
 * Two honesty rules are stated on the surface itself: choosing 有限支持 does
 * not mean a requirement is met, and 暂无线索 does not mean the person has no
 * relevant experience. Qualification is shown only as a server-established
 * decision, never as something a click produced.
 */

const PLAN_SCENARIOS = scenarioOptions([
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
  "submitting",
  "conflict",
] as const);

type Scenario =
  | "loading"
  | "ready"
  | "empty"
  | "error"
  | "unauthorized"
  | "submitting"
  | "conflict";

/** Every line is a pretence about a future host; the component adds 「模拟：」. */
const DEMO_SCENARIO_TEXT: Record<Scenario, string> = {
  loading: "假设未来宿主读取核对计划，正在等待结果返回。",
  ready: "假设未来宿主读取成功，已确认的 JD 与画像生成了待核对条目。",
  empty: "假设未来宿主读取成功，但还没有可核对的条目。",
  error: "假设未来宿主读取核对计划时，服务端返回 SERVICE_UNAVAILABLE。",
  unauthorized: "假设未来宿主打开核对页，服务端返回 UNAUTHENTICATED。",
  submitting: "假设未来宿主正在提交本轮核对结果，控件暂时禁用。",
  conflict: "假设核对期间 JD 草稿修订或画像版本发生变化，服务端返回版本冲突。",
};

export default function PlanPreviewSurface() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  const checkedCount = evidencePlanPreviewRows.filter((row) => row.checked).length;
  const pendingCount = evidencePlanPreviewRows.filter((row) => row.choice === "pending").length;
  const total = evidencePlanPreviewRows.length;
  const showSurface = scenario === "ready" || scenario === "submitting";

  return (
    <>
      <PreviewScenarioBar
        label="预览场景"
        value={scenario}
        onChange={(id) => setScenario(id as Scenario)}
        options={PLAN_SCENARIOS.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock
            kind="loading"
            title="正在读取证据计划"
            body="正在读取待核对条目，尚未得到结果；不使用占位内容冒充条目。"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.loading}</PreviewDemoScenario>
            <PreviewLoadingRows rows={4} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有待核对条目"
            body="需要先完成 JD 的分段、分类与确认，才能开始逐条证据核对。"
            action="开始核对（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.empty}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取证据计划失败"
            body="展示可读错误与重新读取入口；失败时不会用旧计划顶替。"
            action="重新读取（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.error}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="证据计划属于个人数据；未登录时指向登录页。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.unauthorized}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "conflict" ? (
          <PreviewStateBlock
            kind="conflict"
            title="绑定版本已变化"
            body="JD 草稿修订或画像版本在核对期间变了；保留已填内容，等待人工核对后重新确认。"
            action="重新核对（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.conflict}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "submitting" ? (
          <PreviewStateBlock
            kind="loading"
            title="正在提交本轮核对结果"
            body="控件禁用并提示进度；正式保存 API 尚未建立，提交只在本演示内生效。"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.submitting}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {showSurface ? (
          <>
            {scenario === "ready" ? (
              <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.ready}</PreviewDemoScenario>
            ) : null}
            <div className={styles.surface}>
              <div className={styles.surfaceHead}>
                <div className={styles.surfaceHeading}>
                  <h3 className={styles.surfaceTitle}>逐条证据核对</h3>
                  <span className={styles.demoBadge}>演示数据</span>
                </div>
                <p className={styles.binding}>
                  绑定：JD 草稿 {evidencePlanPreviewBinding.draftId} · 修订
                  {evidencePlanPreviewBinding.draftRevision} · 画像版本
                  {evidencePlanPreviewBinding.profileVersion}
                </p>
              </div>

              <p className={styles.surfaceNote}>
                选择「有限支持」不代表整条要求已满足；「暂无线索」也不能据此断言本人没有相关经历。
                只有「有限支持」可以选择来源动作与链接类型。
              </p>
              <p className={styles.surfaceNote}>
                已核对 {checkedCount}/{total} 条；待核对 {pendingCount} 条不能进入计划确认。
              </p>

              <ul className={styles.list}>
                {evidencePlanPreviewRows.map((row) => (
                  <PlanRow key={row.jdId} row={row} submitting={scenario === "submitting"} />
                ))}
              </ul>

              <div className={styles.confirmRow}>
                <button type="button" className={styles.closedAction} disabled>
                  {scenario === "submitting" ? "提交中…" : "确认核对计划（预览不可用）"}
                </button>
                <p className={styles.confirmNote}>
                  全部条目核对完成后才可确认；正式保存 API 尚未建立，确认只在本演示内生效，不写入账号数据。
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function PlanRow({ row, submitting }: { row: EvidencePlanPreviewRow; submitting: boolean }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardHeading}>
          <p className={styles.requirementMeta}>
            {row.jdId} · {row.category}
          </p>
          <p className={styles.requirementText}>{row.exactText}</p>
        </div>
        <span className={`${styles.statusBadge} ${styles[`status_${row.choice}`]}`}>
          {evidencePlanPreviewChoiceLabels[row.choice]}
        </span>
      </div>

      <p className={styles.choiceNote}>{evidencePlanPreviewChoiceNotes[row.choice]}</p>

      {row.selections.length > 0 ? (
        <div className={styles.cardSection}>
          <p className={styles.cardSectionLabel}>已选来源动作</p>
          <ul className={styles.selectionList}>
            {row.selections.map((selection) => (
              <li key={selection.actionKey} className={styles.selection}>
                <span className={styles.selectionQuote}>{selection.quote}</span>
                <span className={styles.selectionType}>
                  {selection.evidenceType === "qualification"
                    ? evidencePlanPreviewQualificationLabel
                    : reportPreviewEvidenceLabels[selection.evidenceType]}
                </span>
                <span className={styles.selectionFact}>{selection.factId}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.cardSectionMuted}>当前状态下没有可选择的来源动作。</p>
      )}

      {row.qualificationStatus !== null ? (
        <p className={styles.qualification}>
          服务端已确立的资格结论：{reportPreviewQualificationLabels[row.qualificationStatus]}
          （不是页面点击推断的结果）
        </p>
      ) : null}

      <dl className={styles.fields}>
        <Field label="已有动作" value={row.existingAction} />
        <Field label="缺口" value={row.missingScope} />
      </dl>

      {row.note !== null ? <p className={styles.rowNote}>{row.note}</p> : null}

      <p className={styles.trace}>
        <span className={row.checked ? styles.traceDone : styles.traceTodo}>
          {row.checked ? "已核对" : "未核对"}
        </span>
        {submitting ? <span className={styles.traceTodo}>· 本轮核对结果提交中</span> : null}
      </p>
    </li>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  const empty = value.length === 0;
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={empty ? styles.fieldMuted : styles.fieldValue}>{empty ? "尚未填写" : value}</dd>
    </div>
  );
}
