"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { scenarioOptions } from "@/fixtures/showcase/showcase-preview-states";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import {
  dashboardPreviewStats,
  dashboardPreviewReports,
  dashboardPreviewNextActions,
  dashboardPreviewLimits,
} from "@/fixtures/showcase/dashboard-preview";
import styles from "./dashboard-preview.module.css";

/**
 * Mock preview of a Dashboard overview screen.
 *
 * The product has no real dashboard route and no statistics API yet: this page
 * exists only to review what an overview could look like. Every number on it is
 * a fictional constant displayed next to its own demo marker, so the page can
 * never be read as statistics computed from real records.
 *
 * Because no aggregation API exists, the page deliberately shows no write
 * entry points at all — not even disabled stand-ins. An overview with a
 * disabled "新增" button would still imply a write flow that does not exist.
 */

const nav = showcaseSiteNav();

const DASHBOARD_SCENARIOS = scenarioOptions([
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
] as const);

type Scenario = (typeof DASHBOARD_SCENARIOS)[number]["id"];

export default function DashboardPreviewPage() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · DASHBOARD"
      title="Dashboard 总览（Mock 预览）"
      intro="这是产品总览页在预览里的样子。正式产品目前还没有 Dashboard 路由，也没有统计 API；本页的数字、报告与待办全部是虚构演示常量，用来评审布局，不代表任何真实统计结果。"
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
        options={DASHBOARD_SCENARIOS.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock kind="loading" title="正在汇总总览" body="正在读取画像、报告与投递记录，尚未得到结果。">
            <PreviewDemoScenario>正式宿主正在汇总总览，尚未返回。</PreviewDemoScenario>
            <PreviewLoadingRows rows={4} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有任何内容"
            body="画像为空且没有报告与投递记录时，总览说明从补充画像开始，而不是显示一组全零的假统计。"
          >
            <PreviewDemoScenario>正式宿主读取成功，但账号下还没有画像、报告或投递记录。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取总览失败"
            body="展示可读错误与重新读取入口；失败时绝不用上一次缓存的数字顶替。"
            action="重新读取（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中读取总览时，服务端返回 SERVICE_UNAVAILABLE。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="总览汇总的是个人数据；未登录时指向登录页。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中打开总览页，服务端返回 UNAUTHENTICATED。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>正式宿主汇总成功，返回当前总览内容。</PreviewDemoScenario>
            <DashboardSurface />
          </>
        ) : null}
      </div>

      <section className={styles.notes} aria-labelledby="dashboard-notes-heading">
        <h2 id="dashboard-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>读取中、正常、全空、读取失败与未登录五种读取状态。</li>
          <li className={styles.noteItem}>
            每个统计数字旁都有「演示」标记；这些数字是虚构常量，不是从记录聚合出来的。
          </li>
          <li className={styles.noteItem}>
            正式统计 API 建立前，本预览不出现任何写入入口，包括禁用态的占位按钮。
          </li>
        </ul>
        <ul className={styles.limitList} aria-label="预览未覆盖的能力">
          {dashboardPreviewLimits.map((limit) => (
            <li key={limit} className={styles.limitItem}>
              {limit}
            </li>
          ))}
        </ul>
      </section>
    </ShowcaseShell>
  );
}

/**
 * Static stand-in for the dashboard surface. Everything rendered here comes
 * from fictional constants; no number is derived from any record, and nothing
 * on the surface is interactive.
 */
function DashboardSurface() {
  return (
    <div className={styles.surface}>
      <div className={styles.surfaceHead}>
        <h3 className={styles.surfaceTitle}>总览</h3>
        <span className={styles.demoBadge}>演示数据</span>
      </div>
      <p className={styles.surfaceNote}>
        以下为虚构演示布局；正式统计 API 尚未建立，数字不代表真实聚合结果。
      </p>

      <div className={styles.statGrid} role="list" aria-label="总览统计（演示）">
        <StatCard label="画像事实" value={dashboardPreviewStats.profileFacts} hint="演示" />
        <StatCard label="分析报告" value={dashboardPreviewStats.reports} hint="演示" />
        <StatCard label="投递记录" value={dashboardPreviewStats.applications} hint="演示" />
        <StatCard label="进行中" value={dashboardPreviewStats.inProgress} hint="演示" />
      </div>

      <div className={styles.columns}>
        <section className={styles.column} aria-labelledby="dashboard-actions-heading">
          <h4 id="dashboard-actions-heading" className={styles.columnTitle}>
            下一步动作（演示）
          </h4>
          <ul className={styles.rowList}>
            {dashboardPreviewNextActions.map((item) => (
              <li key={item.id} className={styles.row}>
                <p className={styles.rowPrimary}>{item.action}</p>
                <p className={styles.rowSecondary}>
                  {item.company} · {item.dueHint}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.column} aria-labelledby="dashboard-reports-heading">
          <h4 id="dashboard-reports-heading" className={styles.columnTitle}>
            最近报告（演示）
          </h4>
          <ul className={styles.rowList}>
            {dashboardPreviewReports.map((report) => (
              <li key={report.id} className={styles.row}>
                <p className={styles.rowPrimary}>
                  {report.company} · {report.jobTitle}
                </p>
                <p className={styles.rowSecondary}>
                  {report.id} · {report.createdOn}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className={styles.statCard} role="listitem">
      <p className={styles.statValue}>
        {value}
        <span className={styles.statHint}>{hint}</span>
      </p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}
