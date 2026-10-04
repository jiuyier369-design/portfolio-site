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
  applicationsPreviewRecords,
  applicationsPreviewStatusLabels,
  applicationsPreviewEmptyField,
  applicationsPreviewNotApplied,
} from "@/fixtures/showcase/applications-preview";
import type { ApplicationsPreviewRecord } from "@/fixtures/showcase/applications-preview";
import styles from "./applications-preview.module.css";

/**
 * Mock preview of the application-records screen.
 *
 * The real route `/applications` exists and shows a fixed read-only sample; the
 * list endpoint is not implemented, so there is no real read/write/statistics
 * API for this surface. This preview mirrors the visual shape of a list with
 * fictional records so the layout and the read states can be reviewed — it
 * never claims a record was actually created or updated.
 *
 * Write states (新增、编辑、状态流转) are deliberately absent: no API exists
 * for them yet, so this page does not even offer disabled stand-ins that could
 * be mistaken for a planned write flow. That decision is documented in the
 * notes section below the panel.
 */

const nav = showcaseSiteNav();

const APPLICATIONS_SCENARIOS = scenarioOptions([
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
] as const);

type Scenario = (typeof APPLICATIONS_SCENARIOS)[number]["id"];

export default function ApplicationsPreviewPage() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 投递记录"
      title="投递记录（Mock 预览）"
      intro="这是投递记录页在预览里的样子。正式 /applications 页已有固定只读样例；读写与统计 API 尚未建立，因此本页只展示读取路径的各种状态，全部为虚构演示数据。"
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
        options={APPLICATIONS_SCENARIOS.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock kind="loading" title="正在读取投递记录" body="正在读取当前账号的投递记录，尚未得到结果。">
            <PreviewDemoScenario>正式宿主正在读取投递记录，尚未返回。</PreviewDemoScenario>
            <PreviewLoadingRows rows={4} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有投递记录"
            body="记录为空时，页面说明记录投递后可以在这里查看进度、下一步动作和备注；不提供伪装成可用的写入入口。"
          >
            <PreviewDemoScenario>正式宿主读取成功，但账号下还没有投递记录。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取投递记录失败"
            body="展示可读错误与重试入口；失败不会被悄悄变成空记录。"
            action="重新读取（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中读取投递记录时，服务端返回 SERVICE_UNAVAILABLE。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="投递记录属于个人数据；未登录时指向登录页，而不是展示空列表。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中打开投递记录页，服务端返回 UNAUTHENTICATED。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>正式宿主读取成功，返回当前投递记录。</PreviewDemoScenario>
            <ApplicationsSurface />
          </>
        ) : null}
      </div>

      <section className={styles.notes} aria-labelledby="applications-notes-heading">
        <h2 id="applications-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>读取中、正常、空记录、读取失败与未登录五种读取状态。</li>
          <li className={styles.noteItem}>
            状态徽章区分「准备中」与「已投递」：准备中的记录投递日期显示「尚未投递」，不会被渲染成已投递。
          </li>
          <li className={styles.noteItem}>
            没有关联分析报告的记录直接说明「未关联分析报告」，不伪造指向报告的链接。
          </li>
          <li className={styles.noteItem}>
            写入状态（新增、编辑、状态流转）不在本页：正式读写 API 尚未建立，本预览不提供任何写入入口。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}

/**
 * Static stand-in for the records list. The real list lives under
 * `components/applications` and is owned by the applications task; this mirrors
 * only its shape with fictional records and no interactivity at all.
 */
function ApplicationsSurface() {
  return (
    <div className={styles.surface}>
      <div className={styles.surfaceHead}>
        <h3 className={styles.surfaceTitle}>投递记录</h3>
        <span className={styles.demoBadge}>演示数据</span>
      </div>
      <p className={styles.surfaceNote}>
        共 {applicationsPreviewRecords.length} 条虚构记录，按样例给定顺序展示，未按时间或状态排序。
      </p>

      <ul className={styles.list}>
        {applicationsPreviewRecords.map((record) => (
          <ApplicationCard key={record.id} record={record} />
        ))}
      </ul>

      <p className={styles.traceNote}>
        记录 ID 仅用于预览排查；正式读写与统计 API 尚未建立，本页不写入任何数据。
      </p>
    </div>
  );
}

function ApplicationCard({ record }: { record: ApplicationsPreviewRecord }) {
  const appliedOn =
    record.appliedOn === null
      ? record.status === "preparing"
        ? applicationsPreviewNotApplied
        : applicationsPreviewEmptyField
      : record.appliedOn;

  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardHeading}>
          <p className={styles.company}>{record.company}</p>
          <h4 className={styles.jobTitle}>{record.jobTitle}</h4>
        </div>
        <span className={`${styles.statusBadge} ${styles[`status_${record.status}`]}`}>
          {applicationsPreviewStatusLabels[record.status]}
        </span>
      </div>

      <dl className={styles.fields}>
        <Field label="城市" value={record.city} />
        <Field label="方向" value={record.direction} />
        <Field label="投递日期" value={appliedOn} muted={record.appliedOn === null} />
      </dl>

      <div className={styles.cardSection}>
        <p className={styles.cardSectionLabel}>下一步动作</p>
        <p className={record.nextAction === null ? styles.cardSectionMuted : styles.cardSectionText}>
          {record.nextAction ?? applicationsPreviewEmptyField}
        </p>
      </div>

      <div className={styles.cardSection}>
        <p className={styles.cardSectionLabel}>备注</p>
        <p className={record.notes === null ? styles.cardSectionMuted : styles.cardSectionText}>
          {record.notes ?? applicationsPreviewEmptyField}
        </p>
      </div>

      <div className={styles.trace}>
        <span className={styles.traceId}>{record.id}</span>
        <span aria-hidden="true">·</span>
        {record.hasLinkedReport ? (
          <span className={styles.traceLinked}>已关联分析报告（演示）</span>
        ) : (
          <span className={styles.traceAbsent}>未关联分析报告</span>
        )}
      </div>
    </li>
  );
}

function Field({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string | null;
  muted?: boolean;
}) {
  const empty = value === null;
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={empty || muted ? styles.fieldMuted : styles.fieldValue}>
        {empty ? applicationsPreviewEmptyField : value}
      </dd>
    </div>
  );
}
