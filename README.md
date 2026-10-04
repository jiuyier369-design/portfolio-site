# 个人网站与作品集

独立的 Next.js 前端项目，来自已实现的展示页面，供后续代理继续完善。**当前尚未部署，个人资料仍为待确认占位。**

网站通过链接展示 [Job Copilot 工程作品](https://github.com/jiuyier369-design/job-copilot)，不提供它的真实登录、分析或数据库接口。

## 运行与交接

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

打开 `/`、`/portfolio`、`/portfolio/job-copilot` 和 `/resume`。`/ui-preview/**` 是虚构数据的交互展示，不是实际求职服务。

构建配置为静态导出，输出 `out/`。后续由网站代理选择托管方案并验收；本次只准备源码仓库，不自动发布网站。

继续开发先读 [AGENT_HANDOFF.md](AGENT_HANDOFF.md)。网站内容属于公开信息；姓名、学校、经历、联系方式等须由用户确认。现有个人资料占位不得自行编造。

## 来源

展示层来源提交 `c42c59bfb33b34795b2938f5dc2b4cbee0534566`。原文件包含 WorkBuddy 实现与 Codex 审查；本次独立抽取、项目骨架及发布说明由 Codex 完成，采用新 Git 根提交。

原 Job Copilot 开发目录、linked worktree 与私有历史完整保留。此目录有独立 `.git`，不是原项目的 worktree；后续代理应只打开这个新项目。

暂未授予开源许可证。
