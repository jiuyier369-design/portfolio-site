import Link from "next/link";
import { ShowcaseShell } from "@/components/showcase/showcase-shell";
import { showcaseSiteNav } from "@/fixtures/showcase/showcase-nav";
import {
  resumeIdentity,
  resumeTimeline,
  resumeSkills,
  resumeProjects,
  resumeContacts,
} from "@/fixtures/showcase/personal-site";
import styles from "./resume.module.css";

/**
 * Resume page (`/resume`).
 *
 * The most sensitive page on the personal site: it *looks like* a resume, so
 * any invented fact here would read as a real claim. Every entry therefore
 * renders as a 待确认 placeholder row — no school names, employers, dates,
 * scores, counts or rankings, and no plausible-looking date ranges. Contact
 * slots are plain text, never links: no mailto, no external href, not even a
 * "#" stand-in.
 *
 * These are placeholder rows, not an empty state: the page says "waiting for
 * the person's confirmation", not "nothing here".
 *
 * Server component: no state, no data access.
 */

export const metadata = {
  title: "简历 · Job Copilot",
  description: "简历页结构预览：教育、经历、技能与联系方式均为待确认占位。",
};

export default function ResumePage() {
  return (
    <ShowcaseShell
      eyebrow="RESUME"
      title="简历"
      intro="这里放本人的教育背景、经历、技能与联系方式。所有条目在本人确认前保持为待确认占位，不使用任何推测内容填充。"
      nav={showcaseSiteNav("resume")}
    >
      {/* Identity slot */}
      <section className={styles.identity} aria-labelledby="resume-identity-heading">
        <h2 id="resume-identity-heading" className={styles.visuallyHidden}>
          姓名与目标方向
        </h2>
        <p className={styles.identityName}>
          <span className={styles.placeholder}>{resumeIdentity.namePlaceholder}</span>
        </p>
        <p className={styles.identityDirection}>
          目标岗位方向：<span className={styles.placeholder}>{resumeIdentity.directionPlaceholder}</span>
        </p>
        <p className={styles.identitySummary}>
          <span className={styles.placeholder}>{resumeIdentity.summaryPlaceholder}</span>
        </p>
        <p className={styles.identityNote}>{resumeIdentity.summaryNote}</p>
      </section>

      {/* Timeline */}
      {resumeTimeline.map((section) => (
        <section
          key={section.id}
          className={styles.section}
          aria-labelledby={`resume-${section.id}-heading`}
        >
          <h2 id={`resume-${section.id}-heading`} className={styles.sectionHeading}>
            {section.title}
          </h2>
          <ul className={styles.entryList}>
            {section.entries.map((entry) => (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <span className={styles.placeholder}>{entry.period}</span>
                </div>
                <dl className={styles.entryFields}>
                  <div className={styles.entryField}>
                    <dt className={styles.fieldLabel}>机构</dt>
                    <dd className={styles.fieldValue}>
                      <span className={styles.placeholder}>{entry.organization}</span>
                    </dd>
                  </div>
                  <div className={styles.entryField}>
                    <dt className={styles.fieldLabel}>角色</dt>
                    <dd className={styles.fieldValue}>
                      <span className={styles.placeholder}>{entry.role}</span>
                    </dd>
                  </div>
                  <div className={styles.entryField}>
                    <dt className={styles.fieldLabel}>描述</dt>
                    <dd className={styles.fieldValue}>
                      <span className={styles.placeholder}>{entry.description}</span>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Skills */}
      <section className={styles.section} aria-labelledby="resume-skills-heading">
        <h2 id="resume-skills-heading" className={styles.sectionHeading}>
          技能
        </h2>
        <div className={styles.skillGrid}>
          {resumeSkills.map((group) => (
            <div key={group.id} className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>{group.title}</h3>
              <ul className={styles.skillList}>
                {group.items.map((item, index) => (
                  <li key={index} className={styles.skillItem}>
                    <span className={styles.placeholder}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects: placeholders only, details live in /portfolio */}
      <section className={styles.section} aria-labelledby="resume-projects-heading">
        <h2 id="resume-projects-heading" className={styles.sectionHeading}>
          项目经历
        </h2>
        <p className={styles.sectionNote}>{resumeProjects.note}</p>
        <ul className={styles.entryList}>
          {resumeProjects.entries.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <p className={styles.projectName}>
                <span className={styles.placeholder}>{entry.name}</span>
              </p>
              <p className={styles.projectDescription}>
                <span className={styles.placeholder}>{entry.description}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className={styles.sectionNote}>
          <Link href="/portfolio" className={styles.inlineLink}>
            前往作品集查看已公开的项目内容
          </Link>
        </p>
      </section>

      {/* Contact: plain-text slots, never links */}
      <section className={styles.section} aria-labelledby="resume-contact-heading">
        <h2 id="resume-contact-heading" className={styles.sectionHeading}>
          联系方式
        </h2>
        <ul className={styles.contactList}>
          {resumeContacts.map((item) => (
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
    </ShowcaseShell>
  );
}
