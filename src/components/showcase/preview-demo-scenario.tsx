import type { ReactNode } from "react";
import styles from "./preview-demo-scenario.module.css";

/**
 * "演示情景" label line rendered inside a preview state block.
 *
 * Every Mock scenario is a pretence: the page shows what a real outcome would
 * look like without that outcome ever having happened. This line makes the
 * pretence explicit and unmissable — the label is a distinct badge, and the
 * sentence after it always reads 「模拟：…」, describing what the preview
 * assumes happened. It is never a server diagnosis, an error-code explanation
 * or a root-cause claim.
 *
 * Passed to `PreviewStateBlock` via its `children` slot, so the shared block
 * itself does not change.
 */
export function PreviewDemoScenario({ children }: { children: ReactNode }) {
  return (
    <p className={styles.line}>
      <span className={styles.label}>演示情景</span>
      <span className={styles.text}>模拟：{children}</span>
    </p>
  );
}
