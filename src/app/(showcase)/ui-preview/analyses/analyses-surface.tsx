"use client";

import { useState } from "react";
import Link from "next/link";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { scenarioOptions } from "@/fixtures/showcase/showcase-preview-states";
import {
  analysesPreviewActions,
  analysesPreviewItems,
  analysesPreviewStatusLabels,
  analysesPreviewStatusNotes,
} from "@/fixtures/showcase/analyses-preview";
import type { AnalysisListPreviewItem } from "@/fixtures/showcase/analyses-preview";
import styles from "./analyses-preview.module.css";

/**
 * Mock preview of the report-list screen.
 *
 * The real `/analyses` route exists but shows a fixed report sample, and
 * `/api/analyses` is POST only — there is no list endpoint yet. This preview
 * therefore never says a real list was read: every scenario line is phrased as
 * what a future host *would* do, and the rows are fixtures.
 *
 * Page-level read state (loading/ready/empty/error/unauthorized) is kept
 * strictly apart from each row's run result (processing/completed/failed/
 * uncertain). Only a completed row has an analysis to open; the other three are
 * generation requests and get a disabled control, never a report link.
 */

const ANALYSES_SCENARIOS = scenarioOptions([
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
] as const);

/** Only the read-path states: a run result belongs to a row, not to the page. */
type Scenario = "loading" | "ready" | "empty" | "error" | "unauthorized";

/** Every line is a pretence about a future host; the component adds 「模拟：」. */
const DEMO_SCENARIO_TEXT: Record<Scenario, string> = {
  loading: "假设未来宿主读取列表，正在等待结果返回。",
  ready: "假设未来宿主读取成功，账号下有多条生成请求，结果各不相同。",
  empty: "假设未来宿主读取成功，但账号下还没有任何生成请求。",
  error: "假设未来宿主读取列表时，服务端返回 SERVICE_UNAVAILABLE。",
  unauthorized: "假设未来宿主打开列表页，服务端返回 UNAUTHENTICATED。",
};

export default function AnalysesPreviewSurface() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <>
      <PreviewScenarioBar
        label="预览场景"
        value={scenario}
        onChange={(id) => setScenario(id as Scenario)}
        options={ANALYSES_SCENARIOS.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock
            kind="loading"
            title="正在读取报告列表"
            body="正在读取生成请求列表，尚未得到结果；不使用占位内容冒充记录。"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.loading}</PreviewDemoScenario>
            <PreviewLoadingRows rows={4} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有生成请求"
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
            title="读取报告列表失败"
            body="展示可读错误与重新读取入口；失败时不会用旧列表顶替。"
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
            body="生成请求与报告都属于个人数据；未登录时指向登录页。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.unauthorized}</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>{DEMO_SCENARIO_TEXT.ready}</PreviewDemoScenario>
            <AnalysesSurface />
          </>
        ) : null}
      </div>
    </>
  );
}

/** Static stand-in for the list, drawn entirely from fixtures. */
function AnalysesSurface() {
  return (
    <div className={styles.surface}>
      <div className={styles.surfaceHead}>
        <div className={styles.surfaceHeading}>
          <h3 className={styles.surfaceTitle}>报告列表</h3>
          <span className={styles.demoBadge}>演示数据</span>
        </div>
        <button type="button" className={styles.closedAction} disabled>
          生成报告（预览不可用）
        </button>
      </div>

      <p className={styles.surfaceNote}>
        共 {analysesPreviewItems.length} 条虚构生成请求，覆盖生成中、已生成、未通过校验与结果不确定
        四种结果；按样例给定顺序展示，未按时间或状态排序。
      </p>
      <p className={styles.surfaceNote}>
        每条记录只标它当前处于哪一步。已生成并通过校验的记录才能打开报告；未通过校验与结果不确定的记录
        没有报告，也不提供报告链接。
      </p>

      <ul className={styles.list}>
        {analysesPreviewItems.map((item) => (
          <AnalysisCard key={item.rowId} item={item} />
        ))}
      </ul>

      <p className={styles.traceNote}>
        失败与不确定的记录是生成请求，不是已保存的报告：它们的 analysisId 为 null，页面不提供报告链接。
      </p>
    </div>
  );
}

function AnalysisCard({ item }: { item: AnalysisListPreviewItem }) {
  const canOpenReport = item.status === "completed" && item.analysisId !== null;
  const finished = item.finishedAt === null ? "" : ` · 完成 ${item.finishedAt}`;

  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardHeading}>
          <p className={styles.company}>{item.company}</p>
          <h4 className={styles.jobTitle}>{item.jobTitle}</h4>
        </div>
        <span className={`${styles.statusBadge} ${styles[`status_${item.status}`]}`}>
          {analysesPreviewStatusLabels[item.status]}
        </span>
      </div>

      <p className={styles.meta}>
        请求 {item.requestId} · 开始 {item.startedAt}
        {finished}
      </p>

      <p className={styles.statusNote}>{analysesPreviewStatusNotes[item.status]}</p>

      <p className={styles.actionRow}>
        {canOpenReport ? (
          <Link href="/ui-preview/report" className={styles.reportLink}>
            {analysesPreviewActions.completed}
          </Link>
        ) : (
          <button type="button" className={styles.closedAction} disabled>
            {analysesPreviewActions[item.status]}
          </button>
        )}
      </p>
    </li>
  );
}
