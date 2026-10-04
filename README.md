# Portfolio Site · 个人网站与作品集

> **持续开发中｜展示页面与静态导出已实现｜尚未正式上线**
>
> 本仓库用于建设个人主页、项目作品集和公开简历展示。后续继续完善个人内容、视觉及交互，再部署网站 MVP。

**状态更新：2026-10-04。** 当前个人资料包含待确认占位，不能作为完整个人简历引用。

## 项目介绍

让招聘者快速了解个人方向、项目判断和实际工程成果。首个项目案例为 [Job Copilot](https://github.com/jiuyier369-design/job-copilot)：通过说明、架构、截图和代码链接展示。

网站与 Job Copilot 使用独立仓库及工作目录。**网站不连接 Job Copilot 的登录、分析、数据库或收费模型接口。** 后者当前暂停开发，网站支线继续推进。

## 页面与当前进度

| 页面 / 模块 | 当前状态 |
| --- | --- |
| 个人首页 | 页面已实现，个人信息待确认 |
| 作品集列表与 Job Copilot 案例 | 已实现展示页及 GitHub 外链 |
| 公开简历页 | 页面骨架已有，内容需用户核对 |
| 虚构 UI 预览 | 已实现，仅展示页面交互 |
| 桌面 / 手机适配 | 已完成基础检查，后续页面修改仍需复核 |
| 静态构建 | 已通过，导出到 out/ |
| 托管、正式域名与线上验收 | 尚未完成 |

## 页面截图

截图来自当前本地展示版，个人资料占位与虚构报告不代表真实个人经历或已上线能力。

![Job Copilot 项目案例](docs/images/job-copilot-project.png)

<details>
<summary>查看手机首页截图</summary>

![手机首页](docs/images/site-home-mobile.png)

</details>

## 技术栈与项目边界

**Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS 4 · CSS Modules · 静态导出**

本仓库不包含 API 路由、数据库、模型适配或 Supabase 客户端依赖。展示类型为独立本地拷贝；当前不做跨仓库自动同步。

## 本地查看与构建

使用 Node.js 24（已验证 24.21.x）：

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

启动后打开 http://localhost:3000 ，可访问：

- /：个人首页。
- /portfolio：作品集。
- /portfolio/job-copilot：项目案例。
- /resume：公开简历展示。
- /ui-preview/**：虚构数据交互展示，不是实际求职服务。

构建使用静态导出，输出 out/。当前类型检查及构建通过；桌面、390px 手机展示检查无水平溢出。后续代理选择托管方案并完成线上验收。

## 后续开发计划

1. 用户确认公开姓名、经历、求职方向与联系方式。
2. 完善首页及简历内容，统一视觉、导航和移动端体验。
3. 检查所有项目链接、键盘操作与展示措辞。
4. 部署静态网站，验收线上访问后补充网站地址和上线状态。

继续开发先读 [AGENT_HANDOFF.md](AGENT_HANDOFF.md)。代理只修改本仓库，不读取私有求职资料，不修改 Job Copilot，不编造占位信息。

## 来源与贡献

展示层来源提交 c42c59bfb33b34795b2938f5dc2b4cbee0534566，包含 WorkBuddy 实现与 Codex 审查。独立抽取、项目骨架与发布整理由 Codex 完成；详见 [AUTHORS.md](AUTHORS.md)。

原开发目录和历史完整保留。本仓库独立维护，个人网站完成后会继续更新本说明。

暂未授予开源许可证。
