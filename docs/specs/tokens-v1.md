# Token 第一版规范

状态：用户已认可当前版本作为首版视觉基线（2026-09-23），CSS 功能与消费验证已完成。当前版本、许可证和发布准备状态见[版本与发布](../release.md#当前发布状态)。

本文件维护第一版的公共 token、主题行为、包接口及验收标准。工作区职责见[项目架构](../architecture.md)。实现与规范不一致时，应修正实现，或明确说明取舍并同步修订本文件。

> 范围说明：首版视觉基线的历史验收记录保留在文末。当前功能 alpha 补充模态遮罩及常见 UI 状态合同，保留原有 39 个变量的名称和浅色默认值。当前只提供浅色配色及局部品牌覆盖。已建立的 `site/` 及验证方式见[项目架构](../architecture.md)和[开发指南](../development.md#文档站开发与验证)；文档站不改变 token 包边界。

## 目标与范围

交付 29 个语义颜色、4 个圆角、2 个边框宽度、2 个字重和 3 个字号，共 40 个公共变量，以及普通 CSS 和 Tailwind CSS 4 两个消费入口。按钮、输入框和卡片使用同一套变量，提供浅色默认值、局部颜色重置及用户覆盖。

功能 alpha 是风格基础，提供有限的常见 UI 状态组合。包不提供组件库、完整基础色阶、正文排版或控件密度系统，不新增运行时依赖、构建工具、配置生成器或第三方服务。文档站和 Reka UI 示例属于消费方；JavaScript 主题管理和 OIDC 不在 token 包范围内。

默认视觉转译星布谷地公开界面的奶油纸色、深褐文字、青灰衬底、金黄操作、厚奶油边缘与赭色选择轮廓。颜色值属于可调整的默认主题，语义名称与含义属于公共接口。第一版保持两个样式文件，不增加独立主题包或多套品牌预设。

## 风格依据与网页转译

依据 2026-09-21 的[官方 Final Beta 更新公告](https://www.hoyolab.com/article/46776026)中的三张公开界面图。S03、S04、S06 是本项目的证据编号；不是客户端构建号。以下结论来自公开截图，不代表取得了官方设计 token 或资产授权。

| 证据                          | 可观察的关系                                           | 本包及消费示例的转译                                                          |
| ----------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| S03，公告第 4 张图，烹饪界面  | 青灰卡片、厚奶油框、赭色选中边、纸色详情、金黄深字操作 | 核心浅色依据：分开阅读面与衬底，保留颜色关系和圆润轮廓。                      |
| S04，第 7 张图，蓝图详情      | 浅绿背景、深褐标题、预览与说明分区、深褐胶囊操作       | 辅助青灰／纸色分区与文字层级；次级按钮可用 foreground 填充、background 文字。 |
| S06，第 15 张图，Omnidex 入口 | 深褐胶囊标题、较小的进度行、圆形图标底                 | 标题与辅助文字拉开字号／字重，胶囊操作与圆形标记保留简洁轮廓。                |

S03 保存图为 1778 × 1000。研究采用左上角为原点的 5 × 5 像素 RGB 通道中位数：纸色 `(780,520)` 为 `#f5f4e0`，青灰 `(60,585)` 为 `#9cc2c3`，金黄 `(1700,950)` 为 `#f3c75d`，赭框 `(209,650)` 为 `#b77a32`，深底板 `(1376,950)` 为 `#3a3432`。压缩、纹理、光照和抗锯齿会影响取样；它们不是官方原始 token。对应原始图片地址见文末证据链接。

网页采用 `#f6f3e7` 页面底和取样纸色 `#f5f4e0` 阅读面，把深底板色转作正文，并独立保留 `#564630` 标题褐色。选择外框恢复 `#b77a32`，依靠相邻的奶油内框／纸色背景识别，不再把它直接放在青灰上要求 3:1。其余 hover、active、链接、状态色和功能边缘是网页设计值。

此前 23 色与 4 圆角只能规定色板，不能规定竖卡比例、厚框、文字实际字形或顶部组合轮廓。此次先做 S03 同文案、同尺寸的三个对照样例，再提炼共用参数：新增标题褐色、青灰的深／浅分区、纸面标题带，以及厚框和字重／字号。卡片比例、徽章连接方式、图标位、纹样布局和媒体素材仍由消费实现负责；不能声称只导入 tokens 就能得到这些外观。

英文字体样例实际加载 Nunito 可变字体，标题采用 900；主操作对照 800／850／900 后采用 800，辅助行也采用 800，部分字号按源图进行光学微调；中文单独加载 Noto Sans SC 900。二者采用 OFL-1.1，字体文件和加载声明只属于临时消费样例，不进入包；没有取得或假定使用官方字体。消费方需自行提供已加载的字体，`ui-rounded` 或一个字重数值不能保证实际字形。可复现的结构与 CSS 组合见[三个控件配方](../recipes/s03-controls.md)，包含边框、层级、比例与变量引用。

此前已从蓝灰方案改为 23 色；本轮保留已有名称，增加四个跨组件颜色和七个共用数值，精修中再补充一个仅限大号文字的强调颜色。默认颜色有意进一步校准。曾用 `text-petit-primary` 表达链接的消费方应改用 `text-petit-link`；胶囊操作使用 `rounded-petit-full`。实现阶段没有发布功能版本，后续版本安排由[发布流程](../release.md)维护。

## 分层与命名

- 公共颜色变量采用 `--petit-color-语义名`，圆角采用 `--petit-radius-级别`，名称统一使用 kebab-case。
- 基础色值由下表维护，并直接写入浅色主题的语义声明。第一版不额外导出数字色阶，也不引入可配置的基础变量层。
- 语义变量保存完整的 CSS 颜色值，不能只保存 RGB/HSL 的通道片段。
- Tailwind 映射只引用语义变量，不复制颜色值；所有扩展名称都带 `petit-`，保留使用方已有的 Tailwind 默认主题。
- 不增加按钮、输入框等组件专用变量。组件状态由消费方选择语义变量表达。

将默认色值直接写入语义声明，可以避免祖先节点上的变量别名先求值后继承，使后代覆盖另一层变量却无法影响语义值的问题。以后需要基础色阶时再单独设计其作用域和接口。

## 颜色

下列名称均加上 `--petit-color-` 前缀，组成完整 CSS 变量名。数值是第一版确定的默认值。

| 语义名                  | 默认值                | 用途                                                                 |
| ----------------------- | --------------------- | -------------------------------------------------------------------- |
| `background`            | `#f6f3e7`             | 页面背景。                                                           |
| `surface`               | `#f5f4e0`             | 卡片、输入框等内容表面。                                             |
| `surface-hover`         | `#eee8d8`             | 中性控件悬停表面。                                                   |
| `surface-active`        | `#e3ddcb`             | 中性控件按下或选中表面。                                             |
| `foreground`            | `#3a3432`             | 正文、标题、主要图标。                                               |
| `foreground-muted`      | `#686052`             | 辅助文字及输入提示文字。                                             |
| `foreground-disabled`   | `#9a907d`             | 真正不可交互的禁用内容。                                             |
| `border`                | `#fdf8e1`             | 奶油色装饰边；不承担功能边界。                                       |
| `border-strong`         | `#71634e`             | 需要辨认的输入框等控件边界。                                         |
| `focus`                 | `#285e75`             | 焦点轮廓；样例与控件之间留出背景色间隔。                             |
| `primary`               | `#f3c75d`             | 金黄主操作填充；不用于常规表面的小号文字。                           |
| `primary-hover`         | `#e8b645`             | 主操作悬停背景。                                                     |
| `primary-active`        | `#e5af47`             | 主操作按下背景。                                                     |
| `on-primary`            | `#564630`             | 三种主操作背景上的文字。                                             |
| `success`               | `#365e45`             | 成功状态背景及常规表面上的状态文字。                                 |
| `on-success`            | `#fffcf2`             | 成功状态背景上的文字。                                               |
| `warning`               | `#805514`             | 警告状态背景及常规表面上的状态文字。                                 |
| `on-warning`            | `#fffcf2`             | 警告状态背景上的文字。                                               |
| `error`                 | `#9b3d34`             | 错误状态背景及常规表面上的错误文字。                                 |
| `on-error`              | `#fffcf2`             | 错误状态背景上的文字。                                               |
| `surface-accent`        | `#9cc2c3`             | 青灰衬底、选择区域，搭配 foreground。                                |
| `border-selected`       | `#b77a32`             | 赭色选择轮廓，配合勾选或文字。                                       |
| `link`                  | `#986323`             | 常规表面上的文字链接，常态带下划线。                                 |
| `foreground-heading`    | `#564630`             | 粗标题及重要标签；与正文、辅助字分层。                               |
| `foreground-accent`     | `#a97f1b`             | 常规表面上的大号金色强调文字；只保证 3:1，不用于普通正文或小号链接。 |
| `surface-accent-strong` | `#85b6bc`             | 青灰较深分区，搭配 foreground；不放浅褐标题。                        |
| `surface-accent-soft`   | `#c7dcd6`             | 媒体圆底，搭配 foreground 或 foreground-heading。                    |
| `surface-band`          | `#e5d8ba`             | 纸色面板上的标题带和低对比装饰层。                                   |
| `scrim`                 | `rgb(37 42 40 / 65%)` | 模态内容背后的暗化遮罩，颜色已含透明度；内容面仍使用 surface。       |

`foreground-accent` 用于大号强调标题或大号次级操作标签，避免把金黄填充色当作文字，也不改变普通 `link` 的 4.5:1 要求。仅可用于实际至少 24px 的文字，或至少 18.67px 且达到粗体的文字；这是消费方责任，变量不自动限制字号。本轮 Details 实际为 Nunito 26px／800，浅色在 surface 上约 3.293:1（验收使用未舍入值），保留高于 3:1 的余量；不承诺用于标题带、媒体圆底或任意背景。

新增的 `surface-accent` 将青灰衬底与纸色阅读面分开；`border-selected` 将选择状态与键盘焦点分开；`link` 将可读链接与金黄填充分开。三者均为跨组件语义，不新增组件专用 token。

“常规表面”指 `background` 和 `surface`。`border` 不能代替需要可辨识边界时的 `border-strong`；`foreground-disabled` 不能用于普通辅助文字或 placeholder。状态信息同时提供文字或图标含义，不能只靠颜色区分。`surface-accent` 上只承诺 `foreground` 的正文对比度，辅助文字、链接和状态文字放在纸色阅读面。`primary` 只承担填充，文字链接使用 `link` 并带下划线。

`scrim` 是完整 CSS 颜色，默认 alpha 为 65%。普通后代继承局部覆盖，`data-theme="light"` 恢复默认颜色；需要保留品牌时，在该节点重新应用品牌类。它不用于正文底色，也不单独承诺文字对比度，合成结果取决于遮罩下的内容。透明度修饰会叠加到已有 alpha，例如 `bg-petit-scrim/50` 得到 32.5% alpha。

## 圆角

圆角与下节的边框／排版数值在根节点声明一次，由后代继承。局部恢复默认颜色不会重置这些数值覆盖。

| 变量                  | 默认值    | 用途                      |
| --------------------- | --------- | ------------------------- |
| `--petit-radius-sm`   | `0.75rem` | 小型控件，默认 12px。     |
| `--petit-radius-md`   | `1rem`    | 输入框及卡片，默认 16px。 |
| `--petit-radius-lg`   | `1.5rem`  | 较大面板，默认 24px。     |
| `--petit-radius-full` | `9999px`  | 胶囊和圆形控件。          |

## 共用边框与排版数值

这些变量控制跨卡片、面板、操作标签复用的视觉重量，不包含字体文件或组件几何。rem 数值下的 px 说明以根字号 16px 为例。

| 变量                            | 默认值     | 用途                                             |
| ------------------------------- | ---------- | ------------------------------------------------ |
| `--petit-border-width-frame`    | `0.625rem` | 10px 奶油宽框；面板顶沿与卡片内框。              |
| `--petit-border-width-selected` | `0.5rem`   | 8px 选择外框，完整包裹奶油框。                   |
| `--petit-font-weight-display`   | `900`      | 最高展示强调，如主标题、重要标签。               |
| `--petit-font-weight-strong`    | `800`      | 默认 Cook 主操作及较低强调层级；不限于次级操作。 |
| `--petit-font-size-heading`     | `1.875rem` | 30px 面板标题。                                  |
| `--petit-font-size-label`       | `1.625rem` | 26px 显著标签；不是普通网页正文默认值。          |
| `--petit-font-size-action`      | `2rem`     | 32px 大号胶囊操作文字。                          |

导入入口不会设置元素字体。字号、字重是否适合实际字体需由消费方检查；普通长文仍由使用方设置合适的正文尺度。10px／8px 厚框和 30px／26px／32px 字号属于展示角色，不是普通输入框、紧凑控件或正文的默认值。

## 常见 UI 状态合同

下表限定功能 alpha 的常用组合。尺寸、布局、行为及组件封装由消费方实现，可复制的代码集中维护在[常见 UI 状态配方](../../site/guide/states.md)。

| 场景           | 默认与状态组合                                                                             | 约束                                                                          |
| -------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| 主操作         | `primary`、`primary-hover`、`primary-active` 均配 `on-primary`                             | 原生禁用后排除 hover／active，用 `surface-hover` 与 `foreground-disabled`。   |
| 中性操作与选择 | `foreground` 配 `surface`、`surface-hover`、`surface-active`；选择边用 `border-selected`   | 可用 `primary/on-primary` 强调选中；同时显示勾或“已选”文字，并保留独立焦点。  |
| 字段与校验     | 正常文字、`surface`、`border-strong`；提示用 `foreground-muted`；错误用 `error` 边框及文案 | 只读保持正常可读色；错误文案关联字段，invalid 与 focus 同时可见。             |
| 破坏性文字操作 | `error` 配 `surface`，hover 配 `surface-hover`，active 改为 `error` 背景配 `on-error`      | 不承诺 `error/surface-active`；文字必须说明删除等含义。                       |
| 菜单和普通浮层 | `surface`、`foreground`、`border-strong`；中性条目使用中性状态色                           | 高亮、禁用和键盘行为按组件状态映射；小号 `link` 不用于任意状态底。            |
| 状态卡片       | `success`／`warning`／`error` 文字配常规表面，或状态色填充配对应 `on-*`                    | 显示可读状态文案或图标，不能只依赖颜色；不默认给状态文字套 `surface-active`。 |
| 模态浮层       | `scrim` 遮罩与 `surface` 内容面分开                                                        | Portal 中的遮罩和内容分别接收局部品牌覆盖，遮罩不承担正文阅读面。             |

焦点轮廓与控件之间保留至少 2px 的背景间隔，周围不能裁切轮廓；在选中或错误状态下不复用其边框来替代焦点。原生 `disabled` 才会阻止原生激活；`aria-disabled` 或 `data-disabled` 的行为由消费方或无样式组件实现。禁用与 hover／active 同时存在时，禁用样式优先。

覆盖范围按上述角色和配方限定，不等于完整组件体系或任意颜色组合的可访问性保证。后续只有出现独立、可复用且现有角色无法表达的需求时，才新增公共 token。

## 主题与覆盖

`src/tokens.css` 只声明 CSS 自定义属性，不设置元素的背景、文字、边框、`color-scheme` 或 reset，也不包含 Tailwind 专属指令。

主题选择器固定为：

- `:where(:root, [data-theme='light'])` 声明全部浅色颜色。
- `:where(:root)` 声明圆角、边框宽度与排版数值。

这些规则不放入命名 cascade layer，选择器使用零 specificity。消费方使用普通、未分层的选择器或行内自定义属性覆盖变量；在 Tailwind 项目中，覆盖规则同样写在 imports 后的普通 CSS 中。

行为约定：

1. 根节点直接使用浅色默认值，不跟随操作系统外观。
2. 后代设置 `data-theme="light"` 可重新声明默认颜色，让该子树退出祖先的品牌配色。
3. 其他属性值不匹配主题规则，继续继承最近作用域的值。
4. 主题属性只重置变量，不自动给元素应用样式，也不提供外观切换或偏好存储。
5. 同一作用域可直接覆盖语义变量，普通后代继承该覆盖。需要在恢复默认颜色的节点保留品牌时，在该节点或其内部应用品牌类。
6. 主色、hover、active、on-primary 和 focus 是独立值，修改主色不会自动推导其余值。

全局品牌覆盖建议设置在 `html` 上，让挂载到 `body` 的弹出层也继承。局部覆盖不会自动跨越 DOM 上的 Portal/Teleport 边界。遮罩与内容通常是兄弟元素，局部品牌类须分别传给两者；只设置内容面不会影响遮罩。

覆盖示例属于消费方 CSS，不加入包的默认主题：

```css
.brand-scope {
  --petit-color-primary: #7c3aed;
  --petit-color-primary-hover: #6d28d9;
  --petit-color-primary-active: #5b21b6;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #7c3aed;
  --petit-radius-md: 1rem;
}
```

## CSS 入口与 Tailwind 映射

在 `packages/petit-ui/` 新增 `src/tokens.css`、`src/tailwind.css` 和 `README.md`。

| 公共导出                | 文件               | 使用要求                                                    |
| ----------------------- | ------------------ | ----------------------------------------------------------- |
| `petit-ui/tokens.css`   | `src/tokens.css`   | 普通 CSS，无需安装 Tailwind。                               |
| `petit-ui/tailwind.css` | `src/tailwind.css` | 通过 Tailwind CSS 4 编译；入口自行导入相邻的 `tokens.css`。 |
| `petit-ui/package.json` | `package.json`     | 包元信息。                                                  |

不提供包根导出、JavaScript 入口或 `src/` 深层路径导出。

下文的包名 import 由使用方的 CSS 打包器解析。直接使用浏览器时，应把解析得到的 CSS 文件作为静态资源提供，并通过实际 URL 引入；浏览器本身不解析 npm 包名。

普通 CSS 使用方式：

```css
@import 'petit-ui/tokens.css';

.card {
  color: var(--petit-color-foreground);
  background: var(--petit-color-surface);
  border: 1px solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
}
```

Tailwind 使用方先导入 Tailwind，再导入适配入口：

```css
@import 'tailwindcss';
@import 'petit-ui/tailwind.css';
```

适配文件只包含相邻 token 文件的 import，以及一个顶层 `@theme inline`：

- 颜色表中每个语义名 `X` 对应 `--color-petit-X: var(--petit-color-X)`，共 29 项。
- 圆角表中每个级别 `X` 对应 `--radius-petit-X: var(--petit-radius-X)`，共 4 项。
- 边框宽度映射 `--border-width-petit-X`，得到 `border-petit-frame`／`border-petit-selected`；字体字重映射 `--font-weight-petit-X`，得到 `font-petit-display`／`font-petit-strong`；字号映射 `--text-petit-X`，得到 `text-petit-heading`／`text-petit-label`／`text-petit-action`。总计 40 项映射。
- 不导入 Tailwind 本体、Preflight 或其他外部 CSS，不清空默认命名空间，不改写 Tailwind variants。

由此得到 `bg-petit-surface`、`text-petit-foreground`、`border-petit-border-strong`、`bg-petit-primary`、`text-petit-on-primary`、`outline-petit-focus` 和 `rounded-petit-md` 等类。Tailwind 原有 `hover:`、`active:`、`focus-visible:`、`disabled:` 和透明度修饰继续由 Tailwind 处理。

品牌覆盖直接改变语义变量，同一个工具类随作用域改变颜色。`@theme inline` 使编译后的工具类直接引用语义变量，保留元素所在作用域的覆盖效果。[Tailwind 官方说明](https://tailwindcss.com/docs/theme#referencing-other-variables)

## 包元信息与发布范围

子包 `package.json` 按以下约定配置：

- `description`：`Framework-independent CSS design tokens with an optional Tailwind CSS v4 adapter.`
- `repository`：类型为 `git`，URL 为 `git+https://github.com/eruoo/petit-ui.git`，`directory` 为 `packages/petit-ui`。
- `exports` 只包含上表的三个子路径，分别指向 `./src/tokens.css`、`./src/tailwind.css`、`./package.json`。
- `files` 只列出 `src/tokens.css` 和 `src/tailwind.css`；npm 自动收录包的 `package.json`、README 和 LICENSE。
- `sideEffects` 使用 `["**/*.css"]`，保留使用方主动导入的样式。
- 保留现有名称、测试脚本、开发依赖以及可选 Tailwind peer dependency；版本通过发布流程维护，不增加 `main`、`module`、`types`、构建脚本或 `dist`。

tarball 应恰好包含 `package.json`、`README.md`、`LICENSE`、`src/tokens.css`、`src/tailwind.css` 五个文件；测试、fixture、内部文档和临时产物不进入包。

README 提供两个真实导入入口、主要角色说明、默认配色、局部覆盖、品牌状态值独立、禁用颜色用途，以及当前早期 API 状态。项目许可证、来源与子包的分发要求见[项目许可证](../release.md#项目许可证)。

## 验收

### 自动检查

复用 Node.js 内置测试、已安装的 Tailwind CLI 和 PostCSS。扩展现有测试及 fixture，只有职责明显独立时才拆测试文件。

- 解析真正的 `src/tokens.css`，验证普通入口没有 Tailwind 指令、导入、常规样式声明或运行时依赖；只包含浅色默认颜色及根节点数值，公共名称和圆角值完整。
- Tailwind fixture 导入真正的适配文件，不再只验证 fixture 自己定义的假 token。保留 `source(none)` 与显式 source，隔离工作区扫描影响。
- 覆盖背景、文字、强边框、焦点轮廓、圆角、`enabled:hover`／`enabled:active`／`disabled`、`bg-petit-primary/50`、`bg-petit-scrim` 及 `bg-petit-scrim/50` 的编译。核心断言是生成正确 CSS 属性、引用语义变量且不存在未展开的指令。
- 同时生成一个默认 Tailwind 颜色类，确认适配器未清空原有主题；仅导入适配入口也应带入默认 token 声明。
- 从实际颜色声明计算下述对比度，阈值比较使用未经四舍五入的数值。避免只复制所有颜色常量来测试它们与自身一致。
- 检查打包文件和 exports；在系统临时目录创建实际 tarball，用该 tarball 做独立消费验证，不能由 workspace 链接掩盖缺失文件或错误路径。
- 普通消费验证不安装 Tailwind：确认公开 CSS 子路径可解析，文件内部依赖完整，并能在浏览器中直接消费。仅安装该 tarball 不应拉入框架运行时。
- 已存在的发布工具行为保持不变。本次没有修改发布脚本时，不重复扩张其回归测试。

### 默认对比度

浅色主题验证下列组合，包含选择框与奶油边，总计 47 组。对比度只计算不透明颜色；`scrim` 的类型、作用域和合成透明度另行验证。

| 前景                                    | 背景                                                                             | 最低比例 |
| --------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| `foreground`、`foreground-muted`        | `background`、`surface`、`surface-hover`、`surface-active`                       | `4.5:1`  |
| `foreground`                            | `surface-accent`、`surface-accent-strong`、`surface-accent-soft`、`surface-band` | `4.5:1`  |
| `foreground-heading`                    | `background`、`surface`、`surface-accent`、`surface-accent-soft`、`surface-band` | `4.5:1`  |
| `link`、`success`、`warning`、`error`   | `background`、`surface`                                                          | `4.5:1`  |
| `error`                                 | `surface-hover`                                                                  | `4.5:1`  |
| `foreground-accent`（仅限上述大号文字） | `background`、`surface`                                                          | `3:1`    |
| `on-primary`                            | `primary`、`primary-hover`、`primary-active`                                     | `4.5:1`  |
| `on-success`、`on-warning`、`on-error`  | 各自状态背景                                                                     | `4.5:1`  |
| `border-strong`、`focus`                | 四种页面／中性表面，以及 `surface-accent`                                        | `3:1`    |
| `border-selected`                       | `background`、`surface`、`border`                                                | `3:1`    |

金黄是填充，不作为纸色底上的小号文字；按钮文字以 `on-primary` 检查。浅色按钮按下色调整为 `#e5af47`，使取样褐色文字仍达到 4.5:1。**不强制给主操作套深褐默认边框**：胶囊、粗标签和独立图标共同提供识别，焦点用独立高对比轮廓与间隔；需要边界来识别的输入控件才使用 `border-strong`。

浅色选中外框紧贴奶油内框，与其达到 3:1；不把选择框直接当青灰衬底上的文字／细线。选中状态仍保留非颜色语义与独立焦点。纹样为装饰，不承担状态识别。源图浅色辅助字在网页样例中使用可读的 `foreground-muted`，不照搬其低对比取样；这一差异应在视觉对照中明确显示。

这些约束覆盖默认主题的指定组合，不代表任意 token 组合或用户改色后都满足对比度要求。禁用色和装饰性弱边框不承担上述正文及控件边界职责。文字及非文字阈值依据 [WCAG 2.2 文字对比度说明](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)和[非文字对比度说明](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)。

### 浏览器验收

核心入口使用系统临时目录中的普通 CSS 和实际 Tailwind 编译产物消费页，保持原生 HTML 语义，不依赖 Vue、Reka UI 或 VitePress。S03 造型变更使用同尺度对照页，文档站组件另按开发指南验收。

1. 根节点直接呈现浅色默认值，所有公共变量都有值。
2. 局部品牌、`data-theme="light"` 默认颜色重置，以及未识别的属性值均符合继承约定。
3. 覆盖主色、on-primary 和圆角只影响指定作用域；局部默认颜色重置与圆角继承符合本规范。
4. 普通 CSS 与 Tailwind 区域的计算样式一致；透明度修饰仍引用当前作用域颜色。
5. 实际交互覆盖悬停、按下、键盘焦点和禁用状态。焦点轮廓至少使用 `2px` 宽度和 `2px` offset，禁用字段与正常提示文字分开验证。
6. 独立进行视觉对照：原图仅作为参考视口，控件结构用真实 HTML/CSS，媒体素材独立提供；确认纸色／深褐阅读面、青灰衬底、奶油厚边、赭色选择轮廓、金黄深字胶囊操作、标题与辅助文字层级同时存在；自动测试通过不能替代此检查。
7. 保存默认配色及关键控件状态的截图或检查记录，并报告实际使用的浏览器。浏览器不可用时，如实列出缺口，不能仅凭 CSS 编译成功宣称全部通过。

功能 alpha 补充验收：使用实际 tarball 验证 `scrim` 的普通 CSS／Tailwind 输出、局部覆盖、默认颜色重置和 alpha 叠加；验证状态配方的 selected + focus、invalid + focus、disabled + hover、破坏性 active。文档站检查 Dialog 遮罩与内容的局部品牌、茶杯卡片可见选择标记。历史 S03 截图只作为既有造型基线，不代替新增状态验证。

浏览器样例和一次性打包消费脚本保持临时，不增加长期验收包或仅服务一次验收的工具依赖。

### 完成条件与交付

- 两个入口及全部 token 实现完毕，公共 API 与本规范一致。
- `pnpm check` 通过；实际 tarball 的文件范围、入口和独立消费验证通过；浏览器验收完成并留有结果。
- README 与开发指南同步到实际实现状态，本文件的状态说明同步更新。
- 一次本地实现交付即可独立使用，无需后续站点或 OIDC 才能运行。预计涉及 8 个以上源码、测试和文档文件，修改必须围绕这一个交付范围。
- 首次实现阶段保留了 `0.0.0-alpha` 版本字段，代码通过 PR 合并与功能发版分开处理；后续版本变更与发布按[发布流程](../release.md)执行。

本次没有外部服务、凭据或数据迁移需求。失败时保留诊断结果并修正本地实现；不通过重新发布已有版本处理问题。删除公共名称、修改语义、入口或主题选择方式时，先更新规范并说明消费方迁移方式。

## 首版视觉基线与历史验收记录

用户已认可当前版本作为首版视觉基线。最终独立示例素材、来源和实现截图见 [S03 资源](../assets/s03/README.md)，可复现组合见[三个控件配方](../recipes/s03-controls.md)。无需依赖本地临时目录。官方参考只保留来源链接，不随仓库或包分发。

本轮验证包括 `pnpm check`、实际四文件 tarball、普通 CSS 无 Tailwind 安装、Tailwind 独立编译及公开／私有路径解析。浏览器记录覆盖两种消费方式的根／嵌套／未知主题、颜色与数值覆盖、透明度、真实悬停／按下／焦点／禁用和交互。稳定的范围与复现方法维护在[开发指南](../development.md#打包与浏览器验收)；一次性脚本和中间截图不作为项目工具提交。

字体实测：标题 Nunito Black，Cook 与 Details 为 Nunito ExtraBold，中文为 Noto Sans SC Black。Details 实际 26px／800，浅色纸面对比度 3.2933474744411275:1；普通正文及链接仍按 4.5:1 检查。

最终 Cook 是三齿叉与圆环连体的独立生成徽记，Drink 继续使用库图标。茶杯、符号弧、字形和手绘曲线仍是近似，辅助文字为网页可读性更深；这些边界不影响它作为首版基线，也不代表官方资产或逐像素还原。

## 实现顺序

1. 按颜色及圆角表实现普通 CSS 入口，验证选择器、继承与默认对比度。
2. 实现 Tailwind 映射和 package exports，更新测试去消费真实文件。
3. 补充 README 与元信息，执行实际打包、独立消费和浏览器验收。
4. 更新开发文档与本规范状态，报告文件变更、自动检查、浏览器结果和剩余限制。

## 参考

- [Tailwind theme variables](https://tailwindcss.com/docs/theme)：CSS 主题与 `inline` 映射。
- [Node.js package entry points](https://nodejs.org/api/packages.html#package-entry-points)：显式子路径导出。
- [npm publish 文件范围](https://docs.npmjs.com/cli/v11/commands/npm-publish/#files-included-in-package)：发布白名单和自动收录文件。
- [webpack side effects](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)：CSS 导入的保留声明。
- [Reka UI styling](https://reka-ui.com/docs/guides/styling)：后续示例的样式和状态边界。

### 官方图片证据

- [S03：三测烹饪界面](https://upload-os-bbs.hoyolab.com/upload/2026/09/21/1144120dc6a2b40a3f64bbcd11e35212_4413257537860008632.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_100)
- [S04：三测蓝图详情](https://upload-os-bbs.hoyolab.com/upload/2026/09/21/43b93ae0bd050633e9babb4c6ecf4096_7968201228326700449.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_100)
- [S06：三测图鉴入口 Omnidex](https://upload-os-bbs.hoyolab.com/upload/2026/09/21/33a4522d2b3556ebd936558f7696a54c_3735467248323230851.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_100)
