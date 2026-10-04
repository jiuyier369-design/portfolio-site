"use client";

import { useCallback, useId, useState } from "react";
import styles from "./preview-scenario-bar.module.css";

/**
 * Scenario switcher for the Mock preview pages.
 *
 * This is the only interactive piece the preview pages own, and it is deliberately
 * narrow: it holds which local scenario is displayed and reports changes upward.
 * It never fetches, never persists and never contacts a service — the parent page
 * decides what a scenario renders.
 *
 * Using a real `role="group"` of toggle buttons (rather than tabs) keeps the
 * behaviour honest: the buttons choose a rendering, they do not navigate.
 */

export type PreviewScenarioOption = {
  readonly id: string;
  readonly label: string;
  readonly note?: string;
};

export function PreviewScenarioBar({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly PreviewScenarioOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  // useId() is stable between the server and client render, so the label/group
  // pair never disagrees across hydration. A Math.random() id here would produce
  // a hydration mismatch on every load.
  const rawId = useId();
  const groupId = `preview-scenario-${rawId}`;
  const active = options.find((option) => option.id === value) ?? options[0];

  const select = useCallback(
    (id: string) => {
      onChange(id);
    },
    [onChange],
  );

  return (
    <div className={styles.bar}>
      <div className={styles.barTop}>
        <span className={styles.barLabel} id={groupId}>
          {label}
        </span>
        <div className={styles.buttons} role="group" aria-labelledby={groupId}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.button}
              aria-pressed={option.id === value}
              onClick={() => select(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {active?.note ? (
        // Announced politely: switching scenarios changes the whole panel, and a
        // screen-reader user needs to know which state is now shown.
        <p className={styles.note} role="status" aria-live="polite">
          <span className={styles.noteLabel}>{active.label}</span>
          {active.note}
        </p>
      ) : null}
    </div>
  );
}

/** Local state helper so a page does not repeat the useState plumbing. */
export function useScenario<T extends string>(initial: T) {
  const [scenario, setScenario] = useState<T>(initial);
  return { scenario, setScenario };
}
