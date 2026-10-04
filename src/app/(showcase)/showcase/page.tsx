import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import { siteHome } from "@/fixtures/showcase/personal-site";
import styles from "./site-home.module.css";

/**
 * Personal site entry (`/showcase`).
 *
 * The product's own home page lives at `/` and is off-limits, so the personal
 * site starts here. This page only lays out structure: the site title, the
 * intro, the contact slots and the section links. Every personal fact renders
 * as 待确认 — nothing here is a plausible invention waiting to be believed.
 *
 * Server component: no state, no data access, no scenario switcher. A static
 * page with a scenario bar would imply there is data being read; there is not.
 */

export const metadata = {
  title: "个人网站 · Job Copilot",
  description: "个人网站入口：个人介绍、简历与作品集的结构预览，个人信息保持待确认占位。",
};

export default function SiteHomePage() {
  return (
    <ShowcaseShell
      eyebrow="PERSONAL SITE"
      title="个人网站"
      intro="这是个人网站的入口。个人介绍、简历与作品集的结构在这里搭好；姓名、学校、公司、时间与成果数字等内容需要本人确认后填写，当前一律显示为待确认。"
      nav={showcaseSiteNav("home")}
    >
      <section className={styles.identity} aria-labelledby="site-title-heading">
        <p className={styles.identityLabel}>站点标题</p>
        <p className={styles.identityTitle}>
          <span className={styles.placeholder}>{siteHome.siteTitlePlaceholder}</span>
        </p>
        <p className={styles.identityTagline}>
          <span className={styles.placeholder}>{siteHome.taglinePlaceholder}</span>
        </p>
      </section>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="site-intro-heading">
          <h2 id="site-intro-heading" className={styles.cardTitle}>
            个人简介
          </h2>
          <ul className={styles.placeholderRows}>
            {siteHome.introPlaceholderRows.map((row, index) => (
              <li key={index} className={styles.placeholderRow}>
                <span className={styles.placeholder}>{row}</span>
              </li>
            ))}
          </ul>
          <p className={styles.cardNote}>{siteHome.introNote}</p>

          <dl className={styles.contactList}>
            {siteHome.contacts.map((item) => (
              <div key={item.id} className={styles.contact}>
                <dt className={styles.contactLabel}>{item.label}</dt>
                <dd className={styles.contactValue}>
                  <span className={styles.placeholder}>{item.placeholder}</span>
                </dd>
                <dd className={styles.contactNote}>{item.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={styles.sideStack}>
          <section className={styles.card} aria-labelledby="site-nav-heading">
            <h2 id="site-nav-heading" className={styles.cardTitle}>
              导航入口
            </h2>
            <ul className={styles.entryList}>
              <li className={styles.entryItem}>
                <Link href="/resume" className={styles.entryLink}>
                  <span className={styles.entryTitle}>简历</span>
                  <span className={styles.entryDetail}>教育背景、经历、技能与联系方式（均为待确认占位）</span>
                </Link>
              </li>
              <li className={styles.entryItem}>
                <Link href="/portfolio" className={styles.entryLink}>
                  <span className={styles.entryTitle}>作品集</span>
                  <span className={styles.entryDetail}>作品项目列表（当前：Job Copilot）</span>
                </Link>
              </li>
            </ul>
          </section>

          <section className={styles.card} aria-labelledby="site-status-heading">
            <h2 id="site-status-heading" className={styles.cardTitle}>
              当前状态说明
            </h2>
            <p className={styles.statusText}>{siteHome.statusNote}</p>
          </section>
        </div>
      </div>
    </ShowcaseShell>
  );
}
