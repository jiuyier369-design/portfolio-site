/**
 * Placeholder content for the personal-site pages (`/showcase`, `/resume`) and
 * the portfolio project list.
 *
 * Every personal fact here is a placeholder, never an invention: no name,
 * school, employer, date, score, count or percentage appears anywhere. The
 * placeholder rows exist so the *structure* can be reviewed; the person fills
 * the content in after confirming what may be public.
 */
import { portfolioProject } from "./showcase-nav";

/** The marker every unconfirmed personal fact renders. */
export const PERSONAL_PLACEHOLDER = "待确认";

/* ------------------------------------------------------------------ */
/* /showcase — personal site entry                                     */
/* ------------------------------------------------------------------ */

export const siteHome = {
  /** Slot for the site owner's name or chosen site title. */
  siteTitlePlaceholder: PERSONAL_PLACEHOLDER,
  /** One-line positioning statement. */
  taglinePlaceholder: PERSONAL_PLACEHOLDER,
  /**
   * Intro lines. Each renders as its own placeholder row — three to five rows
   * of self-introduction will live here once confirmed.
   */
  introPlaceholderRows: [
    PERSONAL_PLACEHOLDER,
    PERSONAL_PLACEHOLDER,
    PERSONAL_PLACEHOLDER,
  ] as readonly string[],
  introNote:
    "这里会放三至五行自我介绍。姓名、学校、公司、时间与成果数字等内容需要本人确认后填写，当前一律显示为待确认。",
  contacts: [
    {
      id: "email",
      label: "邮箱",
      placeholder: PERSONAL_PLACEHOLDER,
      note: "本人确认公开后才会填入地址；当前不渲染任何链接。",
    },
    {
      id: "profile",
      label: "在线主页",
      placeholder: PERSONAL_PLACEHOLDER,
      note: "本人确认公开后才会填入地址；当前不渲染任何链接。",
    },
  ] as const,
  statusNote:
    "当前状态：这是个人网站的预览结构，不是已发布的个人主页。站点标题、个人简介、简历条目与联系方式在本人确认前保持待确认；结构与视觉可以先评审。",
} as const;

/* ------------------------------------------------------------------ */
/* /resume — resume page (all placeholders)                            */
/* ------------------------------------------------------------------ */

export type ResumeTimelineEntry = {
  readonly id: string;
  readonly period: string;
  readonly organization: string;
  readonly role: string;
  readonly description: string;
};

export type ResumeTimelineSection = {
  readonly id: string;
  readonly title: string;
  readonly entries: readonly ResumeTimelineEntry[];
};

export const resumeIdentity = {
  namePlaceholder: PERSONAL_PLACEHOLDER,
  directionPlaceholder: PERSONAL_PLACEHOLDER,
  summaryPlaceholder: PERSONAL_PLACEHOLDER,
  summaryNote: "一句话概述会放在这里，由本人确认后填写。",
} as const;

/**
 * Timeline sections. Every field of every entry is 待确认 — dates in
 * particular are never filled with a plausible-looking range.
 */
export const resumeTimeline: readonly ResumeTimelineSection[] = [
  {
    id: "education",
    title: "教育经历",
    entries: [
      {
        id: "edu-1",
        period: PERSONAL_PLACEHOLDER,
        organization: PERSONAL_PLACEHOLDER,
        role: PERSONAL_PLACEHOLDER,
        description: PERSONAL_PLACEHOLDER,
      },
    ],
  },
  {
    id: "work",
    title: "实习或工作经历",
    entries: [
      {
        id: "work-1",
        period: PERSONAL_PLACEHOLDER,
        organization: PERSONAL_PLACEHOLDER,
        role: PERSONAL_PLACEHOLDER,
        description: PERSONAL_PLACEHOLDER,
      },
      {
        id: "work-2",
        period: PERSONAL_PLACEHOLDER,
        organization: PERSONAL_PLACEHOLDER,
        role: PERSONAL_PLACEHOLDER,
        description: PERSONAL_PLACEHOLDER,
      },
    ],
  },
];

export const resumeSkills = [
  {
    id: "professional",
    title: "专业能力",
    items: [PERSONAL_PLACEHOLDER, PERSONAL_PLACEHOLDER] as readonly string[],
  },
  {
    id: "tools",
    title: "工具与方法",
    items: [PERSONAL_PLACEHOLDER, PERSONAL_PLACEHOLDER] as readonly string[],
  },
  {
    id: "language",
    title: "语言",
    items: [PERSONAL_PLACEHOLDER] as readonly string[],
  },
] as const;

/** Projects block: placeholders only; Job Copilot details stay in /portfolio. */
export const resumeProjects = {
  note: "项目条目在本人确认后填写；已公开的项目细节在作品集页整理，不在这里重复。",
  entries: [
    {
      id: "proj-1",
      name: PERSONAL_PLACEHOLDER,
      description: PERSONAL_PLACEHOLDER,
    },
  ] as const,
} as const;

export const resumeContacts = [
  {
    id: "email",
    label: "邮箱",
    placeholder: PERSONAL_PLACEHOLDER,
    note: "本人确认公开后才会填入地址。",
  },
  {
    id: "profile",
    label: "在线主页",
    placeholder: PERSONAL_PLACEHOLDER,
    note: "本人确认公开后才会填入地址。",
  },
] as const;

/* ------------------------------------------------------------------ */
/* /portfolio — project list                                            */
/* ------------------------------------------------------------------ */

export type PortfolioProjectEntry = {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly status: string;
  readonly summary: string;
  readonly href: string;
  readonly hrefLabel: string;
};

/**
 * The portfolio's project list. Currently one entry. The detailed positioning
 * and product decisions live on the project page (`/portfolio/job-copilot`);
 * this card only carries what is meant to be public on the personal site.
 */
export const portfolioProjects: readonly PortfolioProjectEntry[] = [
  {
    id: "job-copilot",
    name: portfolioProject.name,
    tagline: portfolioProject.tagline,
    status: "持续完善中 · 未上线",
    summary: portfolioProject.summary,
    href: "/portfolio/job-copilot",
    hrefLabel: "查看项目",
  },
];

/**
 * How the personal site splits 作品集 and 简历 — shown on the portfolio page so
 * a visitor knows where personal history lives.
 */
export const portfolioDivisionNote =
  "作品集与简历的分工：作品集列出作品项目及其已公开的设计取舍与可核验产出；个人经历、教育背景与联系方式在简历页，不在这里重复。";
