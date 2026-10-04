"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { PreviewScenarioBar } from "@/components/showcase/preview-scenario-bar";
import { PreviewStateBlock } from "@/components/showcase/preview-state-block";
import { PreviewDemoScenario } from "@/components/showcase/preview-demo-scenario";
import { SIGN_IN_MOCK_OUTCOMES } from "@/fixtures/showcase/showcase-preview-states";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import styles from "./sign-in-preview.module.css";

/**
 * Mock preview of the sign-in screen.
 *
 * This page renders the real form's visual shape against invented scenarios. It
 * deliberately does NOT use the production `SignInForm` component: that component
 * is owned by the sign-in task and wired to a real `onSubmit` by Codex. Reusing it
 * here would either require a fake host or risk implying a working login.
 *
 * Nothing on this page submits anywhere. The input is a non-submitting field kept
 * for layout fidelity, and the primary button is disabled so no click can be
 * mistaken for a real authentication attempt.
 */

const nav = showcaseSiteNav();

type Outcome = (typeof SIGN_IN_MOCK_OUTCOMES)[number]["id"];

export default function SignInPreviewPage() {
  const [outcome, setOutcome] = useState<Outcome>("idle");
  const [email, setEmail] = useState("");

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 登录"
      title="登录与会话（Mock 预览）"
      intro="这是登录页在预览里的样子。真实的登录页与 /api/auth/sign-in、/api/session 已存在并由主线维护；本页只用虚构场景展示表单在不同结果下的外观，不会真正登录，也不会写入 Cookie 或会话。"
      nav={nav}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio/job-copilot" className={styles.backLink}>
          ← 返回项目
        </Link>
      </p>

      <PreviewScenarioBar
        label="预览场景"
        value={outcome}
        onChange={(id) => setOutcome(id as Outcome)}
        options={SIGN_IN_MOCK_OUTCOMES.map((item) => ({
          id: item.id,
          label: item.label,
          note: item.note,
        }))}
      />

      <div className={styles.layout}>
        <section className={styles.card} aria-labelledby="signin-form-heading">
          <h2 id="signin-form-heading" className={styles.cardTitle}>
            登录
          </h2>
          <p className={styles.cardNote}>
            使用测试账号登录。演示阶段请勿输入任何真实密码。
          </p>

          <form className={styles.form} onSubmit={(event) => event.preventDefault()} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="preview-signin-email">
                邮箱
              </label>
              <input
                id="preview-signin-email"
                className={styles.input}
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="demo@example.invalid"
                autoComplete="off"
                disabled={outcome === "submitting"}
                aria-describedby="preview-signin-email-hint"
              />
              <p className={styles.hint} id="preview-signin-email-hint">
                演示占位符，不会发送到任何服务。
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="preview-signin-password">
                密码
              </label>
              {/* Never pre-filled, and never a real credential: this is layout only. */}
              <input
                id="preview-signin-password"
                className={styles.input}
                type="password"
                name="password"
                placeholder="演示用占位密码"
                autoComplete="off"
                readOnly
                disabled={outcome === "submitting"}
              />
            </div>

            <button type="submit" className={styles.submit} disabled>
              {outcome === "submitting" ? "登录中…" : "登录"}
            </button>
            <p className={styles.submitNote}>
              预览中按钮不可用：真实登录由主线宿主接线。
            </p>
          </form>
        </section>

        <section className={styles.statePanel} aria-labelledby="signin-state-heading">
          <h2 id="signin-state-heading" className={styles.cardTitle}>
            当前场景结果
          </h2>
          {renderOutcome(outcome)}
        </section>
      </div>

      <section className={styles.notes} aria-labelledby="signin-notes-heading">
        <h2 id="signin-notes-heading" className={styles.sectionHeading}>
          这个预览覆盖什么
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>空表单、输入格式错误与提交中的禁用状态。</li>
          <li className={styles.noteItem}>账号或密码错误（UNAUTHENTICATED）与服务不可用（SERVICE_UNAVAILABLE）。</li>
          <li className={styles.noteItem}>
            成功分支只展示 Mock 文案；本页不创建会话，因此也不展示登录后页面。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}

function renderOutcome(outcome: Outcome) {
  switch (outcome) {
    case "idle":
      return (
        <PreviewStateBlock
          kind="empty"
          title="等待输入"
          body="表单为空。输入邮箱和密码后，真实页面会提交到 /api/auth/sign-in；本预览不会提交。"
        >
          <PreviewDemoScenario>用户刚打开登录页，表单为空。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
    case "submitting":
      return (
        <PreviewStateBlock
          kind="loading"
          title="正在提交"
          body="请求进行中：输入框与按钮禁用，界面提示当前正在处理的动作，避免重复提交。"
        >
          <PreviewDemoScenario>在正式宿主中点击登录后，请求正在进行。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
    case "success":
      return (
        <PreviewStateBlock
          kind="empty"
          title="Mock：登录成功"
          body="真实宿主在成功后跳转并刷新会话。本预览只展示这段文案，不设置 Cookie、不建立会话、不跳转。"
        >
          <PreviewDemoScenario>在正式宿主中提交后，服务端返回登录成功。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
    case "invalid":
      return (
        <PreviewStateBlock
          kind="error"
          code="INVALID_INPUT"
          title="输入无效"
          body="服务端会指出具体字段问题，例如邮箱格式不正确；填写内容会被保留以便修改后重试。"
        >
          <PreviewDemoScenario>在正式宿主中提交后，服务端返回 INVALID_INPUT。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
    case "unauthenticated":
      return (
        <PreviewStateBlock
          kind="error"
          code="UNAUTHENTICATED"
          title="账号或密码错误"
          body="邮箱保留在表单中便于纠正；密码不会回填，需要重新输入。"
        >
          <PreviewDemoScenario>在正式宿主中提交后，服务端返回 UNAUTHENTICATED。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
    case "unavailable":
      return (
        <PreviewStateBlock
          kind="error"
          code="SERVICE_UNAVAILABLE"
          title="服务暂时不可用"
          body="可以稍后重试；界面不把这种情况说成账号问题。"
        >
          <PreviewDemoScenario>在正式宿主中提交后，服务端返回 SERVICE_UNAVAILABLE。</PreviewDemoScenario>
        </PreviewStateBlock>
      );
  }
}
