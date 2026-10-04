import Link from "next/link";
import styles from "./showcase-shell.module.css";

/**
 * Page chrome shared by the two showcase routes.
 *
 * This is presentational only: it renders a label, a set of links it is given,
 * and whatever content the page passes as children. It holds no state, reads no
 * data and performs no navigation of its own.
 */

export type ShowcaseNavLink = {
  readonly href: string;
  readonly label: string;
  /** Marks the entry matching the current route. The page owns this decision. */
  readonly current?: boolean;
};

export function ShowcaseShell({
  eyebrow,
  title,
  intro,
  nav,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  nav: readonly ShowcaseNavLink[];
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      {/* Parity with the product shell: every preview is clearly labelled as data. */}
      <div className={styles.demoStrip} role="note">
        <span className={styles.demoStripBadge}>演示数据</span>
        <span className={styles.demoStripText}>
          本页为作品集与产品预览外壳，个人信息为占位、展示样例为虚构数据；不连接登录、数据库或模型服务。
        </span>
      </div>

      <header className={styles.bar}>
        <div className={styles.barInner}>
          <Link href="/showcase" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              JC
            </span>
            <span className={styles.brandText}>Job Copilot</span>
          </Link>

          <nav className={styles.nav} aria-label="预览导航">
            <ul className={styles.navList}>
              {nav.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={item.current ? `${styles.navLink} ${styles.navLinkCurrent}` : styles.navLink}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.hero}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
          </div>

          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>
            作品集与产品预览外壳：仅静态展示，不发起业务 API 请求，不写入任何数据。
          </p>
          <p className={styles.footerText}>
            个人介绍、项目成果与联系方式均为中性占位，需由用户确认后填写。
          </p>
        </div>
      </footer>
    </div>
  );
}
