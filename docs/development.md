# 开发指南

使用 Node.js 24 LTS，pnpm 版本由根目录 `package.json` 的 `packageManager` 字段固定。

工作区职责见[项目架构](architecture.md)。实现 token 时，以 [token 第一版规范](specs/tokens-v1.md) 的公共接口和验收要求为准。

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

Tailwind 4 的配置入口是 CSS。`test/fixtures/tailwind.css` 导入真实的 `src/tailwind.css`，通过 `@source inline` 固定待生成的类名；`source(none)` 关闭自动扫描，使结果不受其他文件影响。

`test/toolchain.test.mjs` 使用 Node.js 内置测试、已安装的 Tailwind CLI 和 PostCSS，覆盖以下契约：

- 普通入口只声明两套完整颜色和根节点共用数值，主题规则使用零 specificity，不包含 import、Tailwind 指令或元素样式。
- 适配入口导入真实 tokens，以 `@theme inline` 映射全部 39 个变量；仅编译适配入口也包含默认 tokens。
- 真实工具类包含背景、文字、强边框、焦点、圆角、状态 variants 与透明度修饰；保留 Tailwind 默认颜色和 `dark` variant，并完全展开指令。透明度输出同时检查默认颜色 fallback 和 `color-mix()`。
- 从实际 CSS 声明计算浅深主题共 91 组按用途设计的对比度，使用未舍入的比例比较阈值。
- 包只导出三个公开子路径，拒绝包根和 `src/` 深层路径，CSS 发布白名单与可选 peer dependency 保持完整。

PostCSS 在这里作为校验解析器使用，无需另建 `postcss.config`，也不需要额外的 PostCSS 插件或构建工具。

两个正式 CSS 入口已实现，消费示例见[子包 README](../packages/petit-ui/README.md)。具体标准集中维护在 [token 第一版规范](specs/tokens-v1.md#验收)。

## 打包与浏览器验收

在系统临时目录创建验收目录，执行 `pnpm --filter petit-ui pack --pack-destination <临时目录>`。检查 tarball 恰好包含 `package.json`、`README.md`、`src/tokens.css` 和 `src/tailwind.css`。分别建立普通 CSS 和 Tailwind 消费目录，安装该 tarball，避免 workspace 链接掩盖发布文件或导出路径问题。

普通消费目录只安装 tarball，确认没有 Tailwind 或其他运行时依赖，三个公开子路径可解析，两个 CSS 文件的内部依赖完整。通过本地静态服务器提供已解析的 `tokens.css`。Tailwind 消费目录额外安装与工作区一致的 Tailwind 和 CLI，使用公开包名 import 编译，再由浏览器加载输出。

用隔离页面对比两种消费方式的按钮、输入框、卡片与状态文字；检查根主题、嵌套主题、未知属性值、品牌和行内覆盖、颜色重置与圆角继承、透明度，以及真实指针和键盘状态。保留明暗截图或检查记录，并记录实际浏览器版本。另按[三个控件配方](recipes/s03-controls.md)做 S03 原图局部与实现的同尺寸同文案对照，确认实际字体加载，检查比例、厚框、徽章连接、纹样与层级，分别报告功能验收与视觉验收。该流程是发布前的消费验收，不在 `pnpm check` 内启动浏览器或生成 tarball。

项目采用直接发布 CSS 源码的方式，不生成 `dist`。一次性浏览器样例、打包产物和消费检查放在系统临时目录，保留可核对的检查记录；最终所需的独立示例素材、来源和实现截图集中保存在 [S03 资源](assets/s03/README.md)，不依赖临时目录，也不进入发布白名单。版本更新和 changelog 生成方式见[版本与更新日志](release.md)。
