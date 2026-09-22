# 版本与更新日志

版本号由 `packages/petit-ui/package.json` 维护。根包 `petit-ui-monorepo` 为私有工作区，不设置发布版本。

## 命令

在仓库根目录执行：

| 命令                                        | 行为                                                       |
| ------------------------------------------- | ---------------------------------------------------------- |
| `pnpm changelog`                            | 根据已有提交和标签预览更新日志，输出到终端。               |
| `pnpm changelog --unreleased`               | 仅预览最近一个匹配标签之后的变更。                         |
| `pnpm release:bump`                         | 先运行项目检查，再交互选择版本，更新子包版本与 changelog。 |
| `pnpm release:bump --release 0.1.0-alpha.0` | 指定版本，确认后更新文件。                                 |

日常检查命令见[开发指南](development.md)。

## bumpp

根目录 `bump.config.mjs` 将版本更新范围限定为 `packages/petit-ui/package.json`。更新后读取 git-cliff 的 JSON 上下文，设置待发布分段的版本与日期，再按 `cliff.toml` 渲染到 `packages/petit-ui/CHANGELOG.md`。

即使 HEAD 已有预发布标签且没有新增提交，也会生成正式版的独立记录，标注“无新增变更”，并保留预发布历史。例如从 `0.1.0-alpha.0` 更新为 `0.1.0` 时，不会把预发布记录改名或重复收录其中的变更。

自动提交、打标签和推送均关闭；该命令准备可供检查的本地文件变更，不执行 npm 发布。首次发布版本定为 `0.0.0-alpha`。

## git-cliff

根目录 `cliff.toml` 规定：

- 只收录改动 `packages/petit-ui/` 的提交；仅修改根目录或文档站的提交不会进入包的更新日志。
- 按 Conventional Commits 分类，保留破坏性变更标记。普通的 `chore(release): ...` 版本提交用于保留版本分段，其条目不显示在日志中。
- 只识别 `petit-ui@版本号` 形式的标签，例如 `petit-ui@0.1.0-alpha.0` 和 `petit-ui@0.1.0`。
- 输出中文分组和提交链接，通过本地 Git 历史生成内容，无需请求远程 API。

bumpp 在生成上下文时加入虚拟的版本提交，确保待发布分段始终存在；这不会创建真实 Git 提交或标签。后续发布时需在对应发布提交上创建匹配标签，供下一次生成日志划分版本范围。建议版本提交信息使用 `chore(release): petit-ui@版本号`。

更新日志按 Git 中已有的提交生成，不包含未提交的代码变更。应先提交待发布改动，再更新版本并检查生成结果。当前包尚未配置正式 CSS 导出入口，版本工具配置完成不代表包已具备发布内容。
