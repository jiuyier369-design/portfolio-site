/**
 * Mock scenarios for the `/ui-preview/**` pages.
 *
 * Everything in this file is invented for display. No value here comes from a
 * real account, profile, JD or report, and nothing is sent anywhere: the preview
 * pages only switch which constant is rendered.
 *
 * The scenario names mirror the states the real screens must handle, so the
 * preview can be reviewed against the same checklist the implementation uses.
 */

/** The states every preview page can switch between. */
export type PreviewScenario =
  | "loading"
  | "ready"
  | "empty"
  | "error"
  | "unauthorized"
  | "submitting"
  | "conflict"
  | "uncertain"
  | "failed";

/** Most preview pages only need the read-path states plus their own extras. */
export const READ_SCENARIOS: readonly PreviewScenario[] = [
  "loading",
  "ready",
  "empty",
  "error",
  "unauthorized",
] as const;

export type PreviewScenarioMeta = {
  readonly id: PreviewScenario;
  readonly label: string;
  /** What this state means, shown next to the switch so the state is unambiguous. */
  readonly note: string;
};

export const PREVIEW_SCENARIOS: Record<PreviewScenario, PreviewScenarioMeta> = {
  loading: { id: "loading", label: "读取中", note: "正在读取，尚未得到结果；不使用占位内容冒充数据。" },
  ready: { id: "ready", label: "正常", note: "内容就绪；来源与时间会标注清楚。" },
  empty: { id: "empty", label: "空状态", note: "读取成功但没有内容，说明为空的原因。" },
  error: { id: "error", label: "失败", note: "读取失败，展示可读错误与重试入口。" },
  unauthorized: { id: "unauthorized", label: "未登录", note: "未登录时指向登录，而不是展示空的个人数据。" },
  submitting: { id: "submitting", label: "提交中", note: "写入请求进行中，控件禁用并提示进度。" },
  conflict: { id: "conflict", label: "版本冲突", note: "服务端版本已变化；保留输入，等待人工核对后重新提交。" },
  uncertain: { id: "uncertain", label: "结果不确定", note: "结果未确认，不能按成功处理，需要重新核对。" },
  failed: {
    id: "failed",
    label: "生成未通过",
    note: "生成结果未通过自动校验，报告未保存；不展示任何报告正文。",
  },
};

/** Freezes a scenario list into the metadata the switcher renders. */
export function scenarioOptions(
  ids: readonly PreviewScenario[],
): readonly PreviewScenarioMeta[] {
  return ids.map((id) => PREVIEW_SCENARIOS[id]);
}

/* ------------------------------------------------------------------ */
/* Sign-in mock                                                        */
/* ------------------------------------------------------------------ */

export type SignInMockOutcome = {
  readonly id: "idle" | "submitting" | "success" | "invalid" | "unauthenticated" | "unavailable";
  readonly label: string;
  readonly note: string;
};

/**
 * Outcomes the sign-in preview can show. `success` only reports what the mock
 * would return; the preview never sets a cookie or establishes a session.
 */
export const SIGN_IN_MOCK_OUTCOMES: readonly SignInMockOutcome[] = [
  { id: "idle", label: "初始", note: "表单为空，等待输入。" },
  { id: "submitting", label: "提交中", note: "请求进行中，按钮与输入框禁用。" },
  { id: "success", label: "成功", note: "Mock 返回通过；预览不创建真实会话或 Cookie。" },
  { id: "invalid", label: "输入无效", note: "服务端返回 INVALID_INPUT，附具体字段问题。" },
  { id: "unauthenticated", label: "账号或密码错误", note: "返回 UNAUTHENTICATED，保留邮箱便于重试。" },
  { id: "unavailable", label: "服务不可用", note: "返回 SERVICE_UNAVAILABLE，可重试。" },
] as const;

/** Deliberately a fake domain, so it cannot be mistaken for a real account. */
export const SIGN_IN_MOCK_EMAIL_HINT = "demo@example.invalid";
export const SIGN_IN_MOCK_PASSWORD_HINT = "演示用占位密码";
