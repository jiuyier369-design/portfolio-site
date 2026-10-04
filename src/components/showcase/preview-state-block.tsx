import type { ReactNode } from "react";
import styles from "./preview-state-block.module.css";

/**
 * Shared rendering for the non-ready states of a Mock preview.
 *
 * These are presentational: they receive the state and print it. No page may use
 * this to imply a real request happened — the `kind` only decides wording and
 * emphasis, never behaviour.
 *
 * `error` and `conflict` render as `role="alert"` because they interrupt the task;
 * `loading`, `empty` and `unauthorized` are polite status regions.
 */

export type PreviewStateKind =
  | "loading"
  | "empty"
  | "error"
  | "unauthorized"
  | "conflict"
  | "uncertain";

const TONE: Record<PreviewStateKind, string> = {
  loading: "loading",
  empty: "empty",
  error: "error",
  unauthorized: "unauthorized",
  conflict: "conflict",
  uncertain: "uncertain",
};

export function PreviewStateBlock({
  kind,
  title,
  body,
  code,
  action,
  children,
}: {
  kind: PreviewStateKind;
  title: string;
  body: string;
  /** Frozen error code, shown only for error/conflict/uncertain states. */
  code?: string;
  /** Optional disabled action, so a state never offers a control that does nothing. */
  action?: string;
  /**
   * Optional visual aid rendered below the body — used by the loading state to
   * show skeleton rows. It is presentation only, never placeholder data.
   */
  children?: ReactNode;
}) {
  const interrupting = kind === "error" || kind === "conflict" || kind === "uncertain";

  return (
    <div
      className={`${styles.block} ${styles[TONE[kind]]}`}
      role={interrupting ? "alert" : "status"}
    >
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {code ? <code className={styles.code}>{code}</code> : null}
      </div>
      <p className={styles.body}>{body}</p>
      {children}
      {action ? (
        <button type="button" className={styles.action} disabled>
          {action}
        </button>
      ) : null}
    </div>
  );
}

/** Skeleton rows used by the loading state, so it reads as progress, not data. */
export function PreviewLoadingRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className={styles.skeletonRow}>
          <span className={styles.skeletonBar} style={{ width: `${68 - index * 12}%` }} />
          <span className={styles.skeletonBarNarrow} style={{ width: `${38 - index * 6}%` }} />
        </div>
      ))}
    </div>
  );
}
