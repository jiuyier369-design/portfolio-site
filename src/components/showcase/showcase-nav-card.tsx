import Link from "next/link";
import { AVAILABILITY_DESCRIPTIONS, AVAILABILITY_LABELS } from "@/fixtures/showcase/showcase-nav";
import type { ShowcaseNavItem } from "@/fixtures/showcase/showcase-nav";
import styles from "./showcase-nav-card.module.css";

/**
 * Navigation preview card.
 *
 * The important constraint here is that an entry must never look more functional
 * than it is. `closed` and `placeholder` entries therefore render as a plain
 * `<div>` with a disabled-looking action instead of a link, so a keyboard user
 * cannot tab into a route that does not exist yet.
 */

function badgeClass(availability: ShowcaseNavItem["availability"]) {
  if (availability === "mock") return `${styles.badge} ${styles.badgeMock}`;
  if (availability === "preview") return `${styles.badge} ${styles.badgePreview}`;
  if (availability === "closed") return `${styles.badge} ${styles.badgeClosed}`;
  return `${styles.badge} ${styles.badgePlaceholder}`;
}

function CardBody({ item }: { item: ShowcaseNavItem }) {
  return (
    <>
      <div className={styles.head}>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={badgeClass(item.availability)}>{AVAILABILITY_LABELS[item.availability]}</span>
      </div>
      <p className={styles.summary}>{item.summary}</p>
      <p className={styles.route}>
        <span className={styles.routeLabel}>计划路径</span>
        <code className={styles.routePath}>{item.href}</code>
      </p>
      <p className={styles.planned}>{item.planned}</p>
    </>
  );
}

export function ShowcaseNavCard({
  item,
  currentHref,
}: {
  item: ShowcaseNavItem;
  /** The route rendering this list, so exactly one card can claim to be current. */
  currentHref?: string;
}) {
  const availabilityText = AVAILABILITY_DESCRIPTIONS[item.availability];

  // Only an entry that already resolves to a real route can be a link.
  const isLink = item.availability === "preview" || item.availability === "mock";
  // Only the entry whose href matches the route rendering this list is current.
  const isSelfRoute = currentHref !== undefined && item.href === currentHref;

  if (isLink && !isSelfRoute) {
    return (
      <li className={styles.item}>
        <Link href={item.href} className={styles.card}>
          <CardBody item={item} />
          <p className={styles.availabilityText}>{availabilityText}</p>
          <span className={styles.action}>打开 →</span>
        </Link>
      </li>
    );
  }

  if (isLink && isSelfRoute) {
    return (
      <li className={styles.item}>
        <div className={styles.card}>
          <CardBody item={item} />
          <p className={styles.availabilityText}>{availabilityText}</p>
          <span className={styles.actionClosed}>当前页面</span>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <CardBody item={item} />
        <p className={styles.availabilityText}>{availabilityText}</p>
        {/* Never "未开放": the real route may exist and work. This only states
            that the preview itself has not rebuilt it. */}
        <span className={styles.actionClosed}>
          {item.availability === "closed" ? "本预览未接入" : "待确认"}
        </span>
      </div>
    </li>
  );
}

export function ShowcaseNavCardList({
  items,
  currentHref,
}: {
  items: readonly ShowcaseNavItem[];
  currentHref?: string;
}) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h3 className={styles.emptyTitle}>暂无导航项</h3>
        <p className={styles.emptyText}>当前没有可展示的功能入口。</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <ShowcaseNavCard key={item.id} item={item} currentHref={currentHref} />
      ))}
    </ul>
  );
}
