import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { ShowcaseNavCardList } from "@/components/showcase/showcase-nav-card";
import { showcaseNavItems, showcasePreviewPages, showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import styles from "./ui-preview.module.css";

/**
 * Product preview shell and navigation.
 *
 * Server component. This page deliberately does not rebuild any real screen: it
 * maps out the shell, the navigation structure and the honest status of every
 * entry point. Generation, profile writes and dashboard statistics are not
 * claimed to be available anywhere on this page.
 */

const nav = showcaseSiteNav();

/** The layout skeleton of the product shell, described rather than imitated. */
const shellRegions = [
  {
    id: "topbar",
    label: "顶部栏",
    detail: "产品名、当前页面与登录状态的位置。预览中始终显示为演示状态，不读取会话。",
  },
  {
    id: "nav",
    label: "主导航",
    detail: "画像、JD 核对、报告、投递记录四个主入口。窄屏下换行而不横向滚动。",
  },
  {
    id: "content",
    label: "内容区",
    detail: "每个功能页自己的标题、状态说明和主要内容；空态与错误态与正常态同级对待。",
  },
  {
    id: "feedback",
    label: "反馈区",
    detail: "保存中、版本冲突、不确定和失败结果的提示位置。失败不会被包装成成功。",
  },
] as const;

/** States every screen must be able to show. This is the target, not a claim that
 * every screen already demonstrates them; the per-page previews link below. */
const stateChecklist = [
  { id: "loading", label: "读取中", detail: "有明确进度提示，不显示占位数据冒充真实内容。" },
  { id: "ready", label: "正常", detail: "内容就绪，来源与时间标注清楚。" },
  { id: "empty", label: "空状态", detail: "说明为什么为空，以及下一步可以做什么。" },
  { id: "error", label: "失败", detail: "展示可读错误与重试入口，不隐藏失败。" },
  { id: "unauthorized", label: "未登录", detail: "指向登录，而不是展示空的个人数据。" },
] as const;

export const metadata = {
  title: "产品预览 · Job Copilot",
  description: "Job Copilot 视觉外壳、导航结构与各功能入口的开放状态。",
};

export default function UiPreviewPage() {
  const openCount = showcaseNavItems.filter((item) => item.availability === "preview").length;
  const closedCount = showcaseNavItems.filter((item) => item.availability === "closed").length;
  // The number of actual /ui-preview/** Mock pages, not the nav cards that
  // describe them — the card below counts the pages, so it cannot drift from
  // the links in the next section.
  const previewPageCount = showcasePreviewPages.length;

  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW"
      title="产品预览"
      intro="这里是 Job Copilot 的视觉外壳和导航结构预览。登录、画像、JD 核对、证据计划、生成请求、报告列表、报告详情、投递记录与 Dashboard 已有 Mock 预览页。所有预览都不连接真实服务。"
      nav={nav}
    >
      <section className={styles.section} aria-labelledby="ui-status-heading">
        <h2 id="ui-status-heading" className={styles.sectionHeading}>
          预览状态
        </h2>
        <div className={styles.statusGrid}>
          <div className={styles.statusCard}>
            <p className={styles.statusValue}>{showcaseNavItems.length}</p>
            <p className={styles.statusLabel}>已列出的入口</p>
            <p className={styles.statusNote}>包含本页与作品集自身。</p>
          </div>
          <div className={styles.statusCard}>
            <p className={styles.statusValue}>{openCount}</p>
            <p className={styles.statusLabel}>本预览可直接打开</p>
            <p className={styles.statusNote}>只统计已存在的展示路由，不代表正式功能状态。</p>
          </div>
          <div className={styles.statusCard}>
            <p className={styles.statusValue}>{previewPageCount}</p>
            <p className={styles.statusLabel}>已有 Mock 预览页</p>
            <p className={styles.statusNote}>登录、画像、JD 核对、报告、投递记录与 Dashboard；均为虚构数据。</p>
          </div>
          <div className={styles.statusCard}>
            <p className={styles.statusValue}>{closedCount}</p>
            <p className={styles.statusLabel}>本预览尚未接入</p>
            <p className={styles.statusNote}>五个正式入口在本预览中只显示卡片；对应 Mock 预览页见下方链接。</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ui-pages-heading">
        <h2 id="ui-pages-heading" className={styles.sectionHeading}>
          已完成的 Mock 预览页
        </h2>
        <p className={styles.sectionNote}>
          以下页面真实存在并可打开，全部使用虚构数据，不连接任何服务。每页顶部可切换场景，逐页对照状态清单。
        </p>
        <ul className={styles.previewList}>
          {showcasePreviewPages.map((page) => (
            <li key={page.id} className={styles.previewItem}>
              <Link href={page.href} className={styles.previewLink}>
                <span className={styles.previewTitle}>{page.title}</span>
                <span className={styles.previewSummary}>{page.summary}</span>
                <span className={styles.previewStates}>场景：{page.states}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="ui-nav-heading">
        <h2 id="ui-nav-heading" className={styles.sectionHeading}>
          功能入口与开放状态
        </h2>
        <p className={styles.sectionNote}>
          每张卡片独立标注自己的状态：可打开、Mock 演示或本预览未接入。正式生成、投递写入和统计能力仍由主线安排。
        </p>
        <ShowcaseNavCardList items={showcaseNavItems} currentHref="/ui-preview" />
      </section>

      <section className={styles.section} aria-labelledby="ui-shell-heading">
        <h2 id="ui-shell-heading" className={styles.sectionHeading}>
          视觉外壳
        </h2>
        <p className={styles.sectionNote}>
          产品各功能页共用的四个区域。这里是结构说明，不是可交互的仿真界面。
        </p>
        <ul className={styles.regionList}>
          {shellRegions.map((region) => (
            <li key={region.id} className={styles.region}>
              <p className={styles.regionLabel}>{region.label}</p>
              <p className={styles.regionDetail}>{region.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="ui-states-heading">
        <h2 id="ui-states-heading" className={styles.sectionHeading}>
          状态覆盖
        </h2>
        <p className={styles.sectionNote}>
          每个功能页的目标是覆盖以下状态；本预览已为登录、画像、JD 核对、报告、投递记录与 Dashboard 逐页展示。写入界面另需提交中、成功、版本冲突与不确定状态。
        </p>
        <ul className={styles.checkList}>
          {stateChecklist.map((state) => (
            <li key={state.id} className={styles.checkItem}>
              <span className={styles.checkMark} aria-hidden="true">
                ✓
              </span>
              <div className={styles.checkBody}>
                <p className={styles.checkLabel}>{state.label}</p>
                <p className={styles.checkDetail}>{state.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="ui-boundary-heading">
        <h2 id="ui-boundary-heading" className={styles.sectionHeading}>
          预览的边界
        </h2>
        <div className={styles.boundaryCard}>
          <ul className={styles.boundaryList}>
            <li className={styles.boundaryItem}>不连接登录、数据库或模型服务，不创建任何 Cookie。</li>
            <li className={styles.boundaryItem}>不写入 localStorage，也不读取任何真实画像、JD 或报告。</li>
            <li className={styles.boundaryItem}>
              未开放的动作使用禁用态或明确标签，不提供看起来可点击却没有真实行为的按钮。
            </li>
            <li className={styles.boundaryItem}>
              需要用户确认的信息（个人资料、成果、联系方式）在作品集中保持中性占位。
            </li>
          </ul>
          <button type="button" className={styles.closedAction} disabled>
            需要正式宿主（由 Codex 接线）
          </button>
        </div>
      </section>

      <aside className={styles.related} aria-label="相关工作区">
        <p className={styles.relatedLabel}>相关工作区</p>
        <p className={styles.relatedText}>
          本预览属于作品集与产品外观支线。真实 API、认证、数据库与模型逻辑由主线负责，不在本页范围内。
        </p>
        <Link href="/portfolio/job-copilot" className={styles.relatedLink}>
          ← 返回项目
        </Link>
      </aside>
    </ShowcaseShell>
  );
}
