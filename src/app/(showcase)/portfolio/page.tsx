import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav, portfolioContacts, portfolioSections } from "@/fixtures/showcase/showcase-nav";
import { portfolioProjects, portfolioDivisionNote } from "@/fixtures/showcase/personal-site";
import styles from "./portfolio.module.css";

/**
 * Portfolio page (`/portfolio`).
 *
 * This page is the personal site's project list, not a product introduction:
 * it enumerates the person's projects (currently only Job Copilot) and links
 * each one to its own project page, where positioning, design decisions and
 * verifiable outputs are expanded. Personal history, education and contact
 * details live on the resume page instead.
 *
 * Server component with no state and no data access. Anything not yet
 * confirmed by the person stays an explicit placeholder or an empty state —
 * never a plausible invention.
 */

export const metadata = {
  title: "作品集 · Job Copilot",
  description: "作品集：作品项目列表与联系方式，项目详情在各自的项目页。",
};

export default function PortfolioPage() {
  return (
    <ShowcaseShell
      eyebrow="PORTFOLIO"
      title="作品集"
      intro="这里列出本人的作品项目。每个项目链接到自己的项目页，定位、设计取舍与可核验产出在项目页展开；个人经历与教育背景在简历页，不在这里重复。"
      nav={showcaseSiteNav("portfolio")}
    >
      <p className={styles.divisionNote}>{portfolioDivisionNote}</p>

      <section className={styles.section} aria-labelledby="portfolio-project-heading">
        <h2 id="portfolio-project-heading" className={styles.sectionHeading}>
          作品项目
        </h2>
        <p className={styles.sectionNote}>
          当前收录一个项目；卡片只放可对外的定位与状态，不包含未经确认的成果数据。
        </p>
        <ul className={styles.projectList}>
          {portfolioProjects.map((project) => (
            <li key={project.id} className={styles.projectCard}>
              <div className={styles.projectHead}>
                <div className={styles.projectHeadings}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectTagline}>{project.tagline}</p>
                </div>
                <span className={styles.statusBadge}>{project.status}</span>
              </div>
              <p className={styles.projectSummary}>{project.summary}</p>
              <p className={styles.projectAction}>
                <Link href={project.href} className={styles.projectLink}>
                  {project.hrefLabel}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="portfolio-contact-heading">
        <h2 id="portfolio-contact-heading" className={styles.sectionHeading}>
          联系方式
        </h2>
        <p className={styles.sectionNote}>
          联系入口在本人确认公开内容前不会填入任何真实地址，也不提供可点击的外链。
        </p>
        <ul className={styles.contactList}>
          {portfolioContacts.map((item) => (
            <li key={item.id} className={styles.contact}>
              <p className={styles.contactLabel}>{item.label}</p>
              <p className={styles.contactValue}>
                <span className={styles.placeholder}>{item.placeholder}</span>
              </p>
              <p className={styles.contactNote}>{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <nav className={styles.toc} aria-label="作品集目录">
        <p className={styles.tocLabel}>本页目录</p>
        <ul className={styles.tocList}>
          {portfolioSections.map((item) => (
            <li key={item.id} className={styles.tocItem}>
              <a className={styles.tocLink} href={`#portfolio-${item.id}-heading`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </ShowcaseShell>
  );
}
