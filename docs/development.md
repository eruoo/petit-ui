# 开发指南

使用 Node.js 24 LTS，pnpm 版本由根目录 `package.json` 的 `packageManager` 字段固定。

工作区职责见[项目架构](architecture.md)。实现 token 时，以 [token 第一版规范](specs/tokens-v1.md) 的公共接口和验收要求为准。

## 安装与检查

首次安装执行 `pnpm install`；CI 使用 `pnpm install --frozen-lockfile`。

| 命令                | 用途                                                               |
| ------------------- | ------------------------------------------------------------------ |
| `pnpm check`        | 依次执行代码、格式、token 与发布校验测试、站点类型检查和静态构建。 |
| `pnpm lint`         | 使用 Oxlint 检查 JS/TS，错误和警告均使检查失败。                   |
| `pnpm lint:fix`     | 修复 Oxlint 可自动修复的问题。                                     |
| `pnpm format`       | 使用 Oxfmt 格式化代码、CSS、配置和文档。                           |
| `pnpm format:check` | 只检查格式，不修改文件。                                           |
| `pnpm test`         | 运行 token 与发布元信息的 Node.js 测试。                           |
| `pnpm test:release` | 只运行版本、发布标签与 npm dist-tag 的校验测试。                   |
| `pnpm prepare`      | 安装或更新 Git hooks。                                             |

Oxlint 使用根目录 `.oxlintrc.json`，启用 correctness 检查和 Node.js 环境。Oxfmt 使用 `.oxfmtrc.json`，JS/TS 使用单引号、不写分号，其他格式采用工具默认值。锁文件由 pnpm 维护，不交给 Oxfmt 格式化。两者均遵循 `.gitignore`。

GitHub Actions 的 CI 对面向 `main` 的 PR 和 `main` 推送运行同一套 `pnpm check`。发布标签触发的流程会再次执行检查，版本格式、OIDC 绑定与发布步骤见[版本与发布](release.md)。

## Git hooks

根包的 `prepare` 在安装依赖时调用 simple-git-hooks。依赖本身的 postinstall 保持禁用，避免重复安装。

- `pre-commit` 执行 `pnpm check`，不自动修改或暂存文件。
- `commit-msg` 使用 `commitlint.config.mjs` 校验 Conventional Commits，例如 `chore: configure tooling`。
- 保留未由本项目配置的其他 hooks。

## CSS 工具链

Tailwind CSS、Tailwind CLI 和 PostCSS 由 `packages/petit-ui/` 管理。

Tailwind 4 的配置入口是 CSS。`test/fixtures/tailwind.css` 导入真实的 `src/tailwind.css`，通过 `@source inline` 固定待生成的类名；`source(none)` 关闭自动扫描，使结果不受其他文件影响。

`test/toolchain.test.mjs` 使用 Node.js 内置测试、已安装的 Tailwind CLI 和 PostCSS，覆盖以下契约：

- 普通入口只声明浅色默认颜色和根节点共用数值，主题规则使用零 specificity，不包含 import、Tailwind 指令或元素样式。
- 适配入口导入真实 tokens，以 `@theme inline` 映射全部 40 个变量；仅编译适配入口也包含默认 tokens。
- 真实工具类包含背景、文字、强边框、焦点、圆角、状态 variants 与透明度修饰；保留 Tailwind 默认颜色，并完全展开指令。验证 `enabled:hover`／`enabled:active` 排除禁用；主色和遮罩的透明度输出同时检查默认颜色 fallback 和 `color-mix()`。
- 从实际 CSS 声明计算浅色主题共 47 组按用途设计的对比度，包含 `error/surface-hover`，使用未舍入的比例比较阈值。遮罩是带 alpha 的完整颜色，不进入不透明色的亮度计算。
- 包只导出三个公开子路径，拒绝包根和 `src/` 深层路径，CSS 发布白名单与可选 peer dependency 保持完整。

PostCSS 在这里作为校验解析器使用，无需另建 `postcss.config`，也不需要额外的 PostCSS 插件或构建工具。

两个正式 CSS 入口已实现，消费示例见[子包 README](../packages/petit-ui/README.md)。具体标准集中维护在 [token 第一版规范](specs/tokens-v1.md#验收)。

## 打包与浏览器验收

在系统临时目录创建验收目录，执行 `pnpm --filter petit-ui pack --pack-destination <临时目录>`。检查 tarball 恰好包含 `package.json`、`README.md`、`src/tokens.css` 和 `src/tailwind.css`。分别建立普通 CSS 和 Tailwind 消费目录，安装该 tarball，避免 workspace 链接掩盖发布文件或导出路径问题。

普通消费目录只安装 tarball，确认没有 Tailwind 或其他运行时依赖，三个公开子路径可解析，两个 CSS 文件的内部依赖完整。通过本地静态服务器提供已解析的 `tokens.css`。Tailwind 消费目录额外安装与工作区一致的 Tailwind 和 CLI，使用公开包名 import 编译，再由浏览器加载输出。

用隔离页面对比两种消费方式的按钮、输入框、卡片与状态文字；检查浅色默认值、品牌和行内覆盖、局部默认颜色重置与圆角继承、透明度，以及真实指针和键盘状态。保留截图或检查记录，并记录实际浏览器版本。另按[三个控件配方](recipes/s03-controls.md)做 S03 原图局部与实现的同尺寸同文案对照，确认实际字体加载，检查比例、厚框、徽章连接、纹样与层级，分别报告功能验收与视觉验收。该流程是发布前的消费验收，不在 `pnpm check` 内启动浏览器或生成 tarball。

状态配方变更按[常见 UI 状态配方](../site/guide/states.md)提取消费代码，验证选中与焦点、错误与焦点、禁用与悬停，以及破坏性操作的按下配对。遮罩验证默认 alpha、局部覆盖、局部默认颜色重置和 Tailwind `/50` 的叠加结果。按变更范围复用未受影响的历史造型记录，不把历史记录写成新一轮结果。

项目采用直接发布 CSS 源码的方式，不生成 `dist`。一次性浏览器样例、打包产物和消费检查放在系统临时目录，保留可核对的检查记录；最终所需的独立示例素材、来源和实现截图集中保存在 [S03 资源](assets/s03/README.md)，不依赖临时目录，也不进入发布白名单。版本更新和 changelog 生成方式见[版本与发布](release.md)。

## 文档站开发与验证

`site/` 是私有 pnpm 子包，使用 VitePress 1.6.4、Vite 5、Vue 3.5 和 Tailwind 4；确切版本以 `site/package.json` 与锁文件为准。VitePress 自带 Vue 插件，不另行配置第二份。依赖安装需要 esbuild 和 vue-demi 的初始化脚本，许可在 workspace 的 `allowBuilds` 中显式声明。

- `pnpm site:dev`：启动本地 VitePress 开发服务器。
- `pnpm site:check`：用 vue-tsc 检查站点 Vue/TypeScript。
- `pnpm site:build`：构建完整站点，验证 Markdown、代码引入和内部链接。
- `pnpm site:preview`：预览 `site/.vitepress/dist/` 的静态产物。

站点产物与缓存已忽略。本站未配置部署；npm 当前占名版本不含 CSS 功能，因此用户安装指南提供源码打包路径。未发布前不要改写成直接从 registry 安装即可使用。

Token 浏览器的数据加载器通过包公开导出定位 CSS，只读取规范中“颜色”“圆角”“共用边框与排版数值”定义章节的用途，避免后续对比度或配方表覆盖说明；新增或修改 token 后两者必须保持一致。字体自托管于站点，原始校验值在 `docs/assets/s03/sources.json`，许可证与字体一起保留。代码块直接引用运行中的组件，修改示例后无需维护另一份源码展示。

浏览器验收按实际变更覆盖桌面/窄屏布局、导航和本地搜索、固定浅色外观、局部品牌与默认颜色重置、Tabs 方向键、Dialog 打开/Escape/焦点返回与焦点圈定、Checkbox 标签/空格，以及 Portal 的品牌覆盖。检查控制台无 hydration 警告；截图前等待字体加载。一次性验收脚本与截图留在系统临时目录，不为此增加长期浏览器测试框架。

新增状态示例的验收覆盖空值提交与错误聚焦、有效输入后清除错误、只读与禁用、重置、选中与焦点并存、按钮禁用后的悬停、三种反馈色与填充配对，以及菜单的方向键、禁用项跳过、选择、Escape 和焦点返回。菜单打开期间同样验证搜索快捷键隔离，关闭后验证搜索恢复。

修改模态或搜索交互时，验证 Dialog 打开期间 `⌘K`、`Ctrl+K` 和 `/` 不会同时启动全站搜索，关闭后这些快捷键仍可用。修改可复制示例的颜色样式时，在只导入 tokens、没有文档站外壳样式的消费页面中检查局部品牌，确保背景和文字都消费局部 token。
