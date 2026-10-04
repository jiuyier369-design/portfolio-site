"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { PREVIEW_SCENARIOS } from "@/fixtures/showcase/showcase-preview-states";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import {
  reportPreviewCompleted,
  reportPreviewJdItems,
  reportPreviewFailed,
  reportPreviewUncertain,
  reportPreviewEvidenceLabels,
  reportPreviewQualificationLabels,
  reportPreviewFitLabels,
  reportPreviewActionLabels,
  reportPreviewNeedsConfirmationTag,
} from "@/fixtures/showcase/report-preview";
import type { ReportPreview } from "@/fixtures/showcase/report-preview";
import styles from "./report-preview.module.css";

/**
 * Mock preview of the job-analysis report screen.
 *
 * The real page reads an auto-validated report through `/api/analyses/:id` and
 * is maintained by the mainline. This preview renders one fictional report so
 * three things can be reviewed on a single screen: how conclusions sit before
 * evidence sits before suggestions, what the page says when generation failed
 * validation, and what it says when the result is uncertain.
 *
 * The failed and uncertain scenarios render no report body at all — a report
 * that did not pass validation must not leak into the page, and an uncertain
 * result must never be dressed up as a report. Neither state offers a link to
 * a report, because no report exists in those states.
 */

const nav = showcaseSiteNav();

const REPORT_SCENARIO_IDS = [
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
  "failed",
  "uncertain",
] as const;

type Scenario = (typeof REPORT_SCENARIO_IDS)[number];

const REPORT_SCENARIOS = REPORT_SCENARIO_IDS.map((id) => PREVIEW_SCENARIOS[id]);

/** What each scenario pretends happened, phrased as 「模拟：…」. */
const DEMO_SCENARIO_TEXT: Record<Scenario, string> = {
  loading: "正式宿主正在读取报告，尚未返回。",
  ready: "在正式宿主中生成完成，服务端返回已通过自动校验的报告。",
  empty: "正式宿主读取成功，但账号下还没有任何报告。",
  error: "在正式宿主中读取报告时，服务端返回 SERVICE_UNAVAILABLE。",
  unauthorized: "在正式宿主中打开报告页，服务端返回 UNAUTHENTICATED。",
  failed: "在正式宿主中点击生成后，服务端返回 REPORT_INVALID。",
  uncertain: "在正式宿主中生成后，查询原请求状态返回 uncertain。",
};

export default function ReportPreviewPage() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 报告"
      title="岗位分析报告（Mock 预览）"
      intro="这是报告页在预览里的样子。正式页面通过 /api/analyses/:id 读取已校验的报告并由主线维护；本页使用虚构报告样例展示结论、证据与待确认事项如何分层，不读取任何真实报告。"
      nav={nav}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio/job-copilot" className={styles.backLink}>
          ← 返回项目
        </Link>
      </p>

      <PreviewScenarioBar
        label="预览场景"
        value={scenario}
        onChange={(id) => setScenario(id as Scenario)}
        options={REPORT_SCENARIOS.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock kind="loading" title="正在读取报告" body="正在读取已校验的报告，尚未得到结果；不使用占位内容冒充报告。">
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.loading}</PreviewDemoScenario>
            <PreviewLoadingRows rows={5} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有报告"
            body="需要先完成已确认的 JD 与画像，才能生成岗位分析报告。"
            action="生成报告（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.empty}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取报告失败"
            body="展示可读错误与重新读取入口；失败时不会用旧报告顶替。"
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
            body="报告属于个人数据；未登录时指向登录页。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.unauthorized}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "failed" ? (
          <PreviewStateBlock
            kind="error"
            code={reportPreviewFailed.code}
            title={reportPreviewFailed.title}
            body="未通过校验的内容不会保存，也不会在本页展示任何报告正文。"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.failed}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "uncertain" ? (
          <PreviewStateBlock
            kind="uncertain"
            title={reportPreviewUncertain.title}
            body={reportPreviewUncertain.body}
            action="查询状态（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.uncertain}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.ready}</PreviewDemoScenario>
            <ReportSurface preview={reportPreviewCompleted} />
          </>
        ) : null}
      </div>

      <section className={styles.notes} aria-labelledby="report-notes-heading">
        <h2 id="report-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>
            通过自动校验的报告按固定顺序分层：结论在前，证据（资格与职责核验）在中间，简历措辞建议在最后；HTML 顺序与视觉顺序一致。
          </li>
          <li className={styles.noteItem}>
            未通过校验时只说明「报告未保存」，不展示任何报告正文，也不说明是哪一类原因。
          </li>
          <li className={styles.noteItem}>
            结果无法确认时只提供查询状态入口，不自动重新生成，不按成功处理。
          </li>
          <li className={styles.noteItem}>
            四种证据标注（同类任务证据／可迁移证据／个人实践／暂无证据）同时可见且互不混同；个人项目不会被表述成正式企业经历。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}

/**
 * Static stand-in for the report surface. The real report view lives under
 * `components/report` and is owned by the mainline; this mirrors only the
 * information layering with fictional constants, so the preview can never be
 * mistaken for a validated report about a real person.
 */
function ReportSurface({ preview }: { preview: ReportPreview }) {
  const { report } = preview;
  const jdText = new Map(reportPreviewJdItems.map((item) => [item.jdId, item.exactText]));

  return (
    <div className={styles.surface}>
      {/* 1. 结论摘要卡（状态徽章与元信息） */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryHead}>
          <div className={styles.summaryHeading}>
            <p className={styles.company}>{preview.company}</p>
            <h3 className={styles.jobTitle}>{preview.jobTitle}</h3>
          </div>
          <span className={styles.completedBadge}>报告已生成并通过自动校验，内容待用户核对</span>
        </div>
        <p className={styles.meta}>
          {preview.id} · 生成于 {preview.createdOn} · 报告结构版本 {preview.structureVersionNote}
        </p>
      </div>

      {/* 2. 适配判断 */}
      <section className={styles.block} aria-labelledby="rpt-fit-heading">
        <div className={styles.blockHead}>
          <h4 id="rpt-fit-heading" className={styles.blockTitle}>
            适配判断
          </h4>
          <span className={`${styles.fitBadge} ${styles[`fit_${report.materialFit.level}`]}`}>
            {reportPreviewFitLabels[report.materialFit.level]}
          </span>
        </div>
        <p className={styles.blockText}>{report.materialFit.summary}</p>
        <p className={styles.blockMeta}>
          支撑项：{report.materialFit.supportingJdIds.join("、")} · 限制项：
          {report.materialFit.limitingJdIds.join("、")}
        </p>
      </section>

      {/* 3. 投递动作建议 */}
      <section className={styles.block} aria-labelledby="rpt-action-heading">
        <div className={styles.blockHead}>
          <h4 id="rpt-action-heading" className={styles.blockTitle}>
            投递动作建议
          </h4>
          <span className={styles.actionBadge}>
            {reportPreviewActionLabels[report.applicationAction.category]}
          </span>
        </div>
        <p className={styles.blockText}>{report.applicationAction.summary}</p>
        {report.applicationAction.conditionalNextAction ? (
          <p className={styles.blockMeta}>条件动作：{report.applicationAction.conditionalNextAction}</p>
        ) : null}
      </section>

      {/* 4. 资格核验（证据，先于建议） */}
      <section className={styles.block} aria-labelledby="rpt-qual-heading">
        <h4 id="rpt-qual-heading" className={styles.blockTitle}>
          资格核验
        </h4>
        <ul className={styles.rowList}>
          {report.qualifications.map((item) => (
            <li key={item.jdId} className={styles.row}>
              <div className={styles.rowHead}>
                <span className={styles.rowId}>{item.jdId}</span>
                <span
                  className={`${styles.qualBadge} ${styles[`qual_${item.status}`]}`}
                >
                  {reportPreviewQualificationLabels[item.status]}
                </span>
              </div>
              <p className={styles.rowJd}>{jdText.get(item.jdId)}</p>
              <p className={styles.rowText}>{item.explanation}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. 职责核验与加分项（证据，先于建议） */}
      <section className={styles.block} aria-labelledby="rpt-duty-heading">
        <h4 id="rpt-duty-heading" className={styles.blockTitle}>
          职责核验
        </h4>
        <ul className={styles.rowList}>
          {report.coreDuties.map((item) => (
            <TaskRow key={item.jdId} item={item} jdText={jdText.get(item.jdId)} />
          ))}
        </ul>

        <h5 className={styles.subTitle}>加分项</h5>
        <ul className={styles.rowList}>
          {report.preferredItems.map((item) => (
            <TaskRow key={item.jdId} item={item} jdText={jdText.get(item.jdId)} />
          ))}
        </ul>
      </section>

      {/* 6. 核验清单 */}
      <section className={styles.block} aria-labelledby="rpt-verify-heading">
        <h4 id="rpt-verify-heading" className={styles.blockTitle}>
          核验清单
        </h4>
        <ul className={styles.rowList}>
          {report.verificationItems.map((item, index) => (
            <li key={index} className={styles.row}>
              <p className={styles.rowQuestion}>{item.question}</p>
              <p className={styles.rowText}>{item.reason}</p>
              <p className={styles.rowMeta}>如何核实：{item.askWhomOrHow}</p>
              <ul className={styles.impactList}>
                {item.answerImpacts.map((impact) => (
                  <li key={impact} className={styles.impactItem}>
                    {impact}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. 简历措辞建议（建议，排在证据之后） */}
      <section className={styles.block} aria-labelledby="rpt-resume-heading">
        <h4 id="rpt-resume-heading" className={styles.blockTitle}>
          简历措辞建议
        </h4>
        <ul className={styles.rowList}>
          {report.resumeSuggestions.map((item, index) => (
            <li key={index} className={styles.row}>
              <p className={styles.rowText}>{item.suggestedWording}</p>
              <p className={styles.rowBoundary}>边界：{item.factualBoundary}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. 推测与不确定性 */}
      <section className={styles.block} aria-labelledby="rpt-infer-heading">
        <h4 id="rpt-infer-heading" className={styles.blockTitle}>
          推测与不确定性
        </h4>
        <ul className={styles.rowList}>
          {report.inferences.map((item, index) => (
            <li key={index} className={styles.row}>
              <p className={styles.rowText}>{item.statement}</p>
              <p className={styles.rowMeta}>不确定：{item.uncertainty}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.surfaceActions}>
        <button type="button" className={styles.generateAction} disabled>
          生成报告
        </button>
        <span className={styles.surfaceActionsNote}>预览中不可用：生成由正式宿主控制。</span>
      </div>
    </div>
  );
}

function TaskRow({
  item,
  jdText,
}: {
  item: ReportPreview["report"]["coreDuties"][number];
  jdText: string | undefined;
}) {
  return (
    <li className={styles.row}>
      <div className={styles.rowHead}>
        <span className={styles.rowId}>{item.jdId}</span>
        <span className={`${styles.evidenceBadge} ${styles[`ev_${item.evidenceType}`]}`}>
          {reportPreviewEvidenceLabels[item.evidenceType]}
        </span>
        {item.needsUserConfirmation ? (
          <span className={styles.confirmTag}>{reportPreviewNeedsConfirmationTag}</span>
        ) : null}
      </div>
      <p className={styles.rowJd}>{jdText}</p>
      <p className={styles.rowText}>{item.explanation}</p>
      {item.evidenceLinks.map((link, index) => (
        <p key={index} className={styles.rowBoundary}>
          {link.connection} 边界：{link.boundary}
        </p>
      ))}
      {item.missingAspects.length > 0 ? (
        <p className={styles.rowMeta}>未覆盖：{item.missingAspects.join("、")}</p>
      ) : null}
    </li>
  );
}
