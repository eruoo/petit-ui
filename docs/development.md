# 开发指南

使用 Node.js 24 LTS，pnpm 版本由根目录 `package.json` 的 `packageManager` 字段固定。

## 安装与检查

首次安装执行 `pnpm install`；CI 使用 `pnpm install --frozen-lockfile`。

| 命令                | 用途                                             |
| ------------------- | ------------------------------------------------ |
| `pnpm check`        | 依次执行代码检查、格式检查和子包测试。           |
| `pnpm lint`         | 使用 Oxlint 检查 JS/TS，错误和警告均使检查失败。 |
| `pnpm lint:fix`     | 修复 Oxlint 可自动修复的问题。                   |
| `pnpm format`       | 使用 Oxfmt 格式化代码、CSS、配置和文档。         |
| `pnpm format:check` | 只检查格式，不修改文件。                         |
| `pnpm test`         | 运行 `petit-ui` 子包的 Node.js 测试。            |
| `pnpm prepare`      | 安装或更新 Git hooks。                           |

Oxlint 使用根目录 `.oxlintrc.json`，启用 correctness 检查和 Node.js 环境。Oxfmt 使用 `.oxfmtrc.json`，JS/TS 使用单引号、不写分号，其他格式采用工具默认值。锁文件由 pnpm 维护，不交给 Oxfmt 格式化。两者均遵循 `.gitignore`。

## Git hooks

根包的 `prepare` 在安装依赖时调用 simple-git-hooks。依赖本身的 postinstall 保持禁用，避免重复安装。

- `pre-commit` 执行 `pnpm check`，不自动修改或暂存文件。
- `commit-msg` 使用 `commitlint.config.mjs` 校验 Conventional Commits，例如 `chore: configure tooling`。
- 保留未由本项目配置的其他 hooks。

## CSS 工具链

Tailwind CSS、Tailwind CLI 和 PostCSS 由 `packages/petit-ui/` 管理。

Tailwind 4 的配置入口是 CSS。`test/fixtures/tailwind.css` 使用 `@theme inline` 声明验证用映射，通过 `@source inline` 固定待生成的类名；`source(none)` 关闭自动扫描，使结果不受其他文件影响。

`test/toolchain.test.mjs` 调用已安装的 Tailwind CLI，将输出直接交给 PostCSS 解析，检查 CSS 变量、生成的工具类和指令展开结果。PostCSS 在这里作为校验解析器使用，无需另建 `postcss.config`，也不需要额外的 PostCSS 插件或构建工具。

该样例验证工具链，不定义正式的 token API。目前不生成 `dist`，也未配置包发布入口。版本更新和 changelog 生成方式见[版本与更新日志](release.md)。
