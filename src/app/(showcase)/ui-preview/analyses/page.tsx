import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import AnalysesPreviewSurface from "./analyses-surface";
import styles from "./analyses-preview.module.css";

/**
 * Report-list Mock preview (`/ui-preview/analyses`).
 *
 * Server component: it owns the page chrome and the metadata, while the
 * scenario switcher and the list live in the client surface beside it. Nothing
 * here reads data — the rows come from a fixture file.
 *
 * The real `/analyses` route shows a fixed report sample and `/api/analyses` is
 * POST only, so this page never says a real list was read.
 */

export const metadata = {
  title: "报告列表 · Job Copilot",
  description:
    "报告列表 Mock 预览：同一账号下多条生成请求在生成中、已生成、未通过校验与结果不确定四种状态下的外观。",
};

const nav = showcaseSiteNav();

export default function AnalysesPreviewPage() {
  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 报告列表"
      title="报告列表（Mock 预览）"
      intro="这是报告列表的 Mock 预览。正式 /analyses 目前展示固定报告样例，尚无列表读取接口；本页仅用虚构数据展示生成中、已生成、未通过校验和结果不确定四种记录外观，不读取任何真实报告。"
      nav={nav}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio/job-copilot" className={styles.backLink}>
          ← 返回项目
        </Link>
      </p>

      <AnalysesPreviewSurface />

      <section className={styles.notes} aria-labelledby="analyses-notes-heading">
        <h2 id="analyses-notes-heading" className={styles.sectionHeading}>
          预览的边界
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>
            读取中、正常、空记录、读取失败与未登录五种页面状态；生成中、已生成、未通过校验、结果不确定
            四种记录状态。两者分开处理，不混为一谈。
          </li>
          <li className={styles.noteItem}>
            只有已生成并通过校验的记录提供报告链接；其余三态使用禁用控件，不提供报告地址。
          </li>
          <li className={styles.noteItem}>
            失败与不确定的记录是生成请求，analysisId 为 null；失败文案统一为「生成结果未通过自动校验，
            报告未保存」，不推断原因，也不展示原始错误码。
          </li>
          <li className={styles.noteItem}>
            正式 /analyses 目前是固定报告样例，/api/analyses 只有 POST、没有列表 GET；本页不发起任何
            真实请求，未来列表接口由 Codex 另行设计。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}
