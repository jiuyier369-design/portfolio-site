import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import PlanPreviewSurface from "./plan-surface";
import styles from "./evidence-plan-preview.module.css";

/**
 * Evidence-plan Mock preview (`/ui-preview/evidence-plan`).
 *
 * Server component: it owns the page chrome and the metadata, while the
 * scenario switcher and the review surface live in the client component beside
 * it. Nothing is read from a server — every row comes from a fixture.
 *
 * The real prototype lives at `/evidence-plan-demo` and is owned by the W10
 * task; it is a fictional in-memory review with no save endpoint. This preview
 * mirrors only its shape and states.
 */

export const metadata = {
  title: "证据计划 · Job Copilot",
  description:
    "证据计划 Mock 预览：逐条证据核对界面在读取中、正常、空、失败、未登录、提交中与版本冲突七种状态下的外观。",
};

const nav = showcaseSiteNav();

export default function EvidencePlanPreviewPage() {
  return (
    <ShowcaseShell
      eyebrow="UI PREVIEW · 证据计划"
      title="证据计划（Mock 预览）"
      intro="这是逐条证据核对在预览里的样子。正式的 /evidence-plan-demo 是纯虚构内存原型：不调用模型、不产生费用、不保存账号数据。本页同样只用虚构样例展示形态与各状态，全程可交互的控件一律为禁用态。"
      nav={nav}
    >
      <p className={styles.backRow}>
        <Link href="/portfolio/job-copilot" className={styles.backLink}>
          ← 返回项目
        </Link>
      </p>

      <PlanPreviewSurface />

      <section className={styles.notes} aria-labelledby="evidence-plan-notes-heading">
        <h2 id="evidence-plan-notes-heading" className={styles.sectionHeading}>
          预览的边界
        </h2>
        <ul className={styles.noteList}>
          <li className={styles.noteItem}>
            读取中、正常、空、失败、未登录五种读取状态，加上提交中与绑定版本冲突两种写入状态。
          </li>
          <li className={styles.noteItem}>
            选择「有限支持」不代表整条要求已满足；「暂无线索」不能据此断言本人没有相关经历。
          </li>
          <li className={styles.noteItem}>
            资格结论只显示服务端已确立的判断，不由页面点击推断；笔记不能代替画像事实。
          </li>
          <li className={styles.noteItem}>
            正式保存 API 尚未建立：确认只在本演示内生效，不调用模型、不产生费用、不写入账号数据。
          </li>
          <li className={styles.noteItem}>
            本页复用 JD 核对页的 DEMO-JD-* 编号与画像的 DEMO-W11-* 事实编号，三页是同一套虚构场景。
          </li>
        </ul>
      </section>
    </ShowcaseShell>
  );
}
