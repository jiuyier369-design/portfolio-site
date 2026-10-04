import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import {
  portfolioOutcomes,
  portfolioProject,
  showcaseProcessSteps,
  showcaseSiteNav,
} from "@/fixtures/showcase/showcase-nav";
import { portfolioProjects } from "@/fixtures/showcase/personal-site";
import { jobCopilotSections } from "@/fixtures/showcase/job-copilot-project";
import styles from "./job-copilot.module.css";

/**
 * Public portfolio project page for Job Copilot (`/portfolio/job-copilot`).
 *
 * Server component: no state, no data access, no scenario switcher. The
 * positioning and the three product decisions come from the same fixture the
 * portfolio list uses, so the card and this page cannot drift apart. Nothing
 * here claims an outcome, metric or date the person has not confirmed.
 */

export const metadata = {
  title: "Job Copilot · 作品项目",
  description: "作品项目页：Job Copilot 的定位、产品决策、前端预览、开发过程与可核验成果状态。",
};

/** Status belongs to the portfolio list entry, so both pages show the same one. */
const projectStatus =
  portfolioProjects.find((project) => project.id === "job-copilot")?.status ?? "待确认";

export default function JobCopilotProjectPage() {
  return (
    <ShowcaseShell
      eyebrow="PORTFOLIO · 作品项目"
      title={portfolioProject.name}
      intro={portfolioProject.summary}
      nav={showcaseSiteNav("portfolio")}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio" className={styles.backLink}>
          ← 返回作品集
        </Link>
      </p>

      <p className={styles.sectionNote}>Job Copilot 持续完善中，当前公开可审查的工程成果。v2 数据库完整验收和真实报告质量仍待完成。
        <a href="https://github.com/jiuyier369-design/job-copilot" target="_blank" rel="noopener noreferrer"> 查看 GitHub 源码与进度 →</a>
      </p>
      <section className={styles.section} aria-labelledby="job-positioning-heading">
        <h2 id="job-positioning-heading" className={styles.sectionHeading}>
          项目定位
        </h2>
        <p className={styles.sectionNote}>
          这一节只写项目要解决的问题与当前状态；定位文案与作品集里的项目卡片保持一致，不写入未经本人确认的成果数据。
        </p>
        <div className={styles.positionCard}>
          <p className={styles.positionTagline}>{portfolioProject.tagline}</p>
          <span className={styles.statusBadge}>{projectStatus}</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="job-decisions-heading">
        <h2 id="job-decisions-heading" className={styles.sectionHeading}>
          产品决策
        </h2>
        <p className={styles.sectionNote}>
          这三条是项目在取舍上的公开记录，说明它选择怎么做事。它们不是成果展示，也不包含任何数字。
        </p>
        <ul className={styles.decisionList}>
          {portfolioProject.highlights.map((item) => (
            <li key={item.id} className={styles.decisionItem}>
              <p className={styles.decisionTitle}>{item.title}</p>
              <p className={styles.decisionDetail}>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="job-preview-heading">
        <h2 id="job-preview-heading" className={styles.sectionHeading}>
          产品前端预览
        </h2>
        <p className={styles.sectionNote}>
          进入后是 Job Copilot 的视觉外壳与九个功能页的 Mock 预览，全部带演示标记。正式登录、求职画像与
          JD 核对页面已存在于主线，本预览不接入。
        </p>
        <div className={styles.entryCard}>
          <p className={styles.entryTitle}>进入产品前端预览</p>
          <p className={styles.entryText}>
            预览里的每个状态都是虚构样例，不连接真实服务，也不代表任何真实结果。
          </p>
          <Link href="/ui-preview" className={styles.entryLink}>
            进入产品前端预览 →
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="job-process-heading">
        <h2 id="job-process-heading" className={styles.sectionHeading}>
          开发过程
        </h2>
        <p className={styles.sectionNote}>
          这不是成绩展示，而是这个项目实际遵循的几条工作方式；每一条都对应可检查的做法。
        </p>
        <ol className={styles.processList}>
          {showcaseProcessSteps.map((step, index) => (
            <li key={step.id} className={styles.processItem}>
              <span className={styles.processIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.processBody}>
                <p className={styles.processTitle}>{step.title}</p>
                <p className={styles.processDetail}>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="job-outcomes-heading">
        <h2 id="job-outcomes-heading" className={styles.sectionHeading}>
          可核验成果
        </h2>
        <p className={styles.sectionNote}>
          这里只会放可以被打开、运行或核对的产出。没有确认来源的成果一律留空，不用估算数字填充。
        </p>

        {portfolioOutcomes.length === 0 ? (
          <div className={styles.stateCard}>
            <h3 className={styles.stateTitle}>暂无可核验成果</h3>
            <p className={styles.stateText}>
              成果条目需要明确的可核验来源，例如一个可以运行的页面、一段可以查看的记录或一次可以复现的
              验收。这些内容由本人确认后再加入，当前保持为空。
            </p>
            <button type="button" className={styles.closedAction} disabled>
              添加成果（待确认）
            </button>
          </div>
        ) : (
          <ul className={styles.outcomeList}>
            {portfolioOutcomes.map((item) => (
              <li key={item.id} className={styles.outcome}>
                <p className={styles.outcomeLabel}>{item.label}</p>
                <p className={styles.outcomeDetail}>{item.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className={styles.toc} aria-label="本页目录">
        <p className={styles.tocLabel}>本页目录</p>
        <ul className={styles.tocList}>
          {jobCopilotSections.map((item) => (
            <li key={item.id} className={styles.tocItem}>
              <a className={styles.tocLink} href={`#job-${item.id}-heading`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </ShowcaseShell>
  );
}
