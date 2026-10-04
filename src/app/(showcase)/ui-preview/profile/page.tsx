"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock, PreviewLoadingRows } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { PREVIEW_SCENARIOS, scenarioOptions } from "@/fixtures/showcase/showcase-preview-states";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import { profilePreviewFacts, profilePreviewDirections } from "@/fixtures/showcase/profile-preview";
import styles from "./profile-preview.module.css";

/**
 * Mock preview of the profile screen.
 *
 * The production page reads and writes the signed-in user's profile through
 * `/api/profile`. This preview never calls it: it renders fixed, invented facts so
 * the layout and the save/conflict states can be reviewed without an account.
 *
 * The version conflict case is the important one. It must keep the user's input on
 * screen and ask for a manual recheck, never silently overwrite with the server copy.
 */

const nav = showcaseSiteNav();

const PROFILE_SCENARIOS = [
  ...scenarioOptions(["loading", "ready", "empty", "error", "unauthorized"] as const),
  PREVIEW_SCENARIOS.conflict,
] as const;

type Scenario = (typeof PROFILE_SCENARIOS)[number]["id"];

export default function ProfilePreviewPage() {
  const [scenario, setScenario] = useState<Scenario>("ready");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 画像"
      title="我的求职画像（Mock 预览）"
      intro="这是画像页在预览里的样子。正式页面通过 /api/profile 读取和保存当前账号的画像并由主线维护；本页只用虚构事实展示布局、保存中、失败与版本冲突的处理方式，不读取也不提交任何真实画像。"
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
        options={PROFILE_SCENARIOS.map((item) => ({ id: item.id, label: item.label, note: item.note }))}
      />

      <div className={styles.panel}>
        {scenario === "loading" ? (
          <PreviewStateBlock kind="loading" title="正在读取画像" body="正在读取当前账号的画像，尚未得到结果。">
            <PreviewDemoScenario>正式宿主正在读取画像，尚未返回。</PreviewDemoScenario>
            <PreviewLoadingRows rows={3} />
          </PreviewStateBlock>
        ) : null}

        {scenario === "empty" ? (
          <PreviewStateBlock
            kind="empty"
            title="还没有画像内容"
            body="画像为空时，页面说明需要先补充哪些事实才能开始分析，而不是显示一个空白表单。"
            action="添加事实（预览不可用）"
          >
            <PreviewDemoScenario>正式宿主读取成功，但账号下还没有画像内容。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "error" ? (
          <PreviewStateBlock
            kind="error"
            code="SERVICE_UNAVAILABLE"
            title="读取画像失败"
            body="展示可读错误与重新读取入口；失败不会被悄悄变成空画像。"
            action="重新读取（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中读取画像时，服务端返回 SERVICE_UNAVAILABLE。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "unauthorized" ? (
          <PreviewStateBlock
            kind="unauthorized"
            code="UNAUTHENTICATED"
            title="需要先登录"
            body="未登录时指向登录页，而不是展示一份空的个人资料。正式登录页已存在，本预览不接入。"
            action="前往登录（预览不可用）"
          >
            <PreviewDemoScenario>在正式宿主中打开画像页，服务端返回 UNAUTHENTICATED。</PreviewDemoScenario>
          </PreviewStateBlock>
        ) : null}

        {scenario === "conflict" ? (
          <>
            <PreviewStateBlock
              kind="conflict"
              code="PROFILE_VERSION_CONFLICT"
              title="画像已有新版本"
              body="服务端版本已变化。页面保留你正在编辑的内容，要求重新加载并人工核对后再提交，绝不自动覆盖。"
            >
              <PreviewDemoScenario>在正式宿主中保存画像时，服务端返回 PROFILE_VERSION_CONFLICT。</PreviewDemoScenario>
            </PreviewStateBlock>
            <ProfileEditorSurface note="冲突时输入仍然可见，等待人工核对。" />
          </>
        ) : null}

        {scenario === "ready" ? (
          <>
            <PreviewDemoScenario>正式宿主读取画像成功，返回当前版本内容。</PreviewDemoScenario>
            <ProfileEditorSurface note="正常状态：内容就绪，来源与版本标注清楚。" />
          </>
        ) : null}
      </div>

      <section className={styles.notes} aria-labelledby="profile-notes-heading">
        <h2 id="profile-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>读取中、正常、空画像、读取失败与未登录五种读取状态。</li>
          <li className={styles.noteItem}>
            保存中的禁用态与版本冲突：冲突时保留用户输入，等待人工核对。
          </li>
          <li className={styles.noteItem}>
            事实分类与情境标签沿用正式契约的中文名称，个人项目不会被写成正式工作经历。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}

/**
 * Static stand-in for the editor surface. The real editor lives under
 * `components/profile-live` and is owned by the profile task; this only mirrors its
 * visual shape with readOnly fields so the preview cannot be typed into.
 */
function ProfileEditorSurface({ note }: { note: string }) {
  return (
    <div className={styles.editor}>
      <div className={styles.editorHead}>
        <h3 className={styles.editorTitle}>画像内容</h3>
        <span className={styles.versionBadge}>版本 3 · 演示</span>
      </div>
      <p className={styles.editorNote}>{note}</p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="preview-profile-directions">
          目标方向
        </label>
        <input
          id="preview-profile-directions"
          className={styles.input}
          value={profilePreviewDirections}
          readOnly
          aria-describedby="preview-profile-directions-hint"
        />
        <p className={styles.hint} id="preview-profile-directions-hint">
          只读演示值。
        </p>
      </div>

      <ul className={styles.factList}>
        {profilePreviewFacts.map((fact) => (
          <li key={fact.factId} className={styles.fact}>
            <div className={styles.factHead}>
              <span className={styles.factId}>{fact.factId}</span>
              <span className={styles.factCategory}>{fact.categoryLabel}</span>
              <span className={styles.factContext}>{fact.contextLabel}</span>
            </div>
            <p className={styles.factStatement}>{fact.statement}</p>
          </li>
        ))}
      </ul>

      <div className={styles.editorActions}>
        <button type="button" className={styles.readOnlyAction} disabled>
          保存（预览不可用）
        </button>
        <span className={styles.editorActionsNote}>
          正式保存由主线宿主提交，并携带 expectedVersion 处理冲突。
        </span>
      </div>
    </div>
  );
}
