import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import AnalysisRunPreviewSurface from "./analysis-run-surface";
import styles from "./analysis-run-preview.module.css";

/**
 * Generation-request Mock preview (`/ui-preview/analysis-run`).
 *
 * Server component: it owns the page chrome and the metadata, while the
 * scenario switcher and the form live in the client surface beside it. Nothing
 * is requested from a server — the fields start from a fixture and any typing
 * stays in the browser.
 *
 * The real `/analysis-run` route exists and is owned by the mainline; the
 * frozen contract is `src/types/analysis-run-ui.ts`, which this page reads by
 * type import only.
 */

export const metadata = {
  title: "生成请求 · Job Copilot",
  description:
    "生成请求 Mock 预览：填写、校验、提交、跟踪与各结果状态的外观，失败与不确定不显示报告。",
};

const nav = showcaseSiteNav();

export default function AnalysisRunPreviewPage() {
  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 生成请求"
      title="生成请求（Mock 预览）"
      intro="这是发起岗位分析请求在预览里的样子。正式的 /analysis-run 页面已存在并由主线维护；本页只用虚构场景展示填写、校验、提交与跟踪各状态，不发起任何真实请求，也不产生费用。"
      nav={nav}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio/job-copilot" className={styles.backLink}>
          ← 返回项目
        </Link>
      </p>

      <AnalysisRunPreviewSurface />

      <section className={styles.notes} aria-labelledby="analysis-run-notes-heading">
        <h2 id="analysis-run-notes-heading" className={styles.sectionHeading}>
          预览的边界
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>
            就绪、填写校验、未登录、受阻、提交中、生成中、已完成、生成未通过、结果不确定九种状态；未通过与不确定不渲染任何报告正文。
          </li>
          <li className={styles.noteItem}>
            生成入口由宿主决定是否启用；本预览的发起、查询与新请求一律为禁用态，不模拟一次不存在的生成。
          </li>
          <li className={styles.noteItem}>
            已完成场景对应报告列表的 DEMO-REQ-1，报告链接指向报告预览页；生成中对应 DEMO-REQ-2，与列表的生成中行是同一虚构请求。
          </li>
          <li className={styles.noteItem}>
            正式 /analysis-run 与 GET /api/analysis-runs/:requestId 已存在；本预览不发起任何真实请求。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}
