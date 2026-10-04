/**
 * Content for the public Job Copilot project page (`/portfolio/job-copilot`).
 *
 * This page is a public portfolio project page — it is not a route of the
 * signed-in Job Copilot product and it never reads private data. Every string
 * here describes how the project works; nothing states a metric, date or
 * outcome that the person has not confirmed.
 */

/** One entry in the project page's own table of contents. */
export type JobCopilotSection = {
  readonly id: string;
  readonly label: string;
};

/**
 * Section anchors for the project page. The page renders its own contents list
 * from this array so the list cannot drift from the headings below it.
 */
export const jobCopilotSections: readonly JobCopilotSection[] = [
  { id: "positioning", label: "项目定位" },
  { id: "decisions", label: "产品决策" },
  { id: "preview", label: "产品前端预览" },
  { id: "process", label: "开发过程" },
  { id: "outcomes", label: "可核验成果" },
];
