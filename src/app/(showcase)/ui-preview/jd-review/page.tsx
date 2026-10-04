"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { PREVIEW_SCENARIOS, scenarioOptions } from "@/fixtures/showcase/showcase-preview-states";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import { jdPreviewRawText, jdPreviewSegments } from "@/fixtures/showcase/jd-preview";
import styles from "./jd-review-preview.module.css";

/**
 * Mock preview of the JD review screen.
 *
 * The real page splits a pasted JD with the frozen rule set, lets a human correct
 * every category, and only then records a confirmation. This preview does none of
 * that: the segments below are fixed constants, so the screen shows what the review
 * surface looks like without ever claiming a draft was confirmed.
 *
 * The unclassified row is kept visible on purpose. A confirmation that quietly
 * accepts a rule suggestion is exactly the failure this screen exists to prevent.
 */

const nav = showcaseSiteNav();

const JD_SCENARIOS = [
  ...scenarioOptions(["loading", "ready", "empty", "error", "unauthorized"] as const),
  PREVIEW_SCENARIOS.conflict,
] as const;

type Scenario = (typeof JD_SCENARIOS)[number]["id"];

export default function JdReviewPreviewPage() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · JD 核对"
      title="JD 核对（Mock 预览）"
      intro="这是 JD 核对页在预览里的样子。正式页面会调用 /api/jd-drafts 完成分段、人工分类与确认，由主线维护；本页的分段是固定虚构常量，不执行真实规则，也不产生可信确认。"
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
        options={JD_SCENARIOS.map((item) => ({ id: item.id, label: item.label, note: item.note }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock kind="loading" title="正在分段" body="正在按固定规则切分岗位描述，尚未得到结果。">
            <PreviewDemoScenario>正式宿主正在按规则分段，尚未返回。</PreviewDemoScenario>
            <PreviewLoadingRows rows={4} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有粘贴 JD"
            body="未输入内容时，页面说明需要粘贴完整岗位描述才能开始分段。"
            action="粘贴 JD（预览不可用）"
          >
            <PreviewDemoScenario>正式宿主中的 JD 草稿为空，等待粘贴。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取草稿失败"
            body="展示可读错误与重新读取入口；不会用旧的草稿内容顶替本次失败。"
            action="重新读取（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中读取草稿时，服务端返回 SERVICE_UNAVAILABLE。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="保存草稿需要登录；未登录时指向登录页。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中打开 JD 核对页，服务端返回 UNAUTHENTICATED。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "conflict" ? (
          <>
            <PreviewStateBlock
              kind="conflict"
              code="JD_DRAFT_CONFLICT"
              title="草稿已被修改"
              body="另一个标签页或更早的请求已经推进了版本号。页面保留当前分类结果并要求重新加载核对，不会用本地内容覆盖服务端。"
            >
              <PreviewDemoScenario>在正式宿主中确认草稿时，服务端返回 JD_DRAFT_CONFLICT。</PreviewDemoScenario>
            </PreviewStateBlock>
            <ReviewSurface note="冲突时分类结果仍然可见，等待人工核对。" />
          </>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>正式宿主分段与分类就绪，仍有一行等待人工确认。</PreviewDemoScenario>
            <ReviewSurface note="正常状态：分段与分类结果就绪，仍有一行等待人工确认。" />
          </>
        ) : null}
      </div>

      <section className={styles.notes} aria-labelledby="jd-notes-heading">
        <h2 id="jd-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>读取中、正常、未粘贴、读取失败与未登录五种状态。</li>
          <li className={styles.noteItem}>
            区分「规则建议」与「人工已确认」：未分类的行会一直显示为未确认。
          </li>
          <li className={styles.noteItem}>
            草稿冲突时保留当前分类结果，要求重新核对，不自动覆盖。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}

/**
 * Static stand-in for the review surface. The real workspace lives under
 * `components/jd-review` and is owned by the JD task, so this mirrors only its
 * shape using fixed constants that cannot be edited into a fake confirmation.
 */
function ReviewSurface({ note }: { note: string }) {
  const unconfirmed = jdPreviewSegments.filter((segment) => !segment.confirmed).length;

  return (
    <div className={styles.review}>
      <div className={styles.reviewHead}>
        <h3 className={styles.reviewTitle}>分段与分类</h3>
        <span className={styles.draftBadge}>草稿 · 未确认</span>
      </div>
      <p className={styles.reviewNote}>{note}</p>

      <div className={styles.splitGrid}>
        <section className={styles.column} aria-labelledby="jd-raw-heading">
          <h4 id="jd-raw-heading" className={styles.columnTitle}>
            岗位原文（虚构）
          </h4>
          <pre className={styles.rawText}>{jdPreviewRawText}</pre>
        </section>

        <section className={styles.column} aria-labelledby="jd-segments-heading">
          <h4 id="jd-segments-heading" className={styles.columnTitle}>
            分段结果
          </h4>
          <ul className={styles.segmentList}>
            {jdPreviewSegments.map((segment) => (
              <li key={segment.id} className={styles.segment}>
                <div className={styles.segmentHead}>
                  <span className={styles.segmentId}>{segment.id}</span>
                  <span
                    className={
                      segment.confirmed ? styles.categoryConfirmed : styles.categoryPending
                    }
                  >
                    {segment.category}
                  </span>
                  {!segment.confirmed ? (
                    <span className={styles.pendingTag}>待人工确认</span>
                  ) : null}
                </div>
                <p className={styles.segmentSource}>{segment.source}</p>
                <p className={styles.segmentMeta}>
                  规则建议：{segment.suggestedCategory}
                  {segment.confirmed ? "（已人工确认）" : "（尚未确认）"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className={styles.reviewActions}>
        <span className={styles.unconfirmedCount}>
          {unconfirmed} 行仍待人工确认
        </span>
        <button type="button" className={styles.confirmAction} disabled>
          确认草稿（预览不可用）
        </button>
        <span className={styles.reviewActionsNote}>
          真实确认需要逐行人工核对后由主线宿主提交，本预览不产生任何可信确认。
        </span>
      </div>
    </div>
  );
}
