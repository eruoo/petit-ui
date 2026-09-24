---
name: petit-ui
description: 使用 petit-ui 的 CSS design tokens 和 Tailwind CSS 4 适配层构建界面。用于接入 petit-ui、选择语义 token、编写控件状态、覆盖品牌主题，以及组合原生控件或 Reka UI；仅在使用或计划采用 petit-ui 的项目中应用。
---

# petit-ui

在应用中消费 petit-ui 的视觉变量，沿用项目已有框架、样式工具链和交互组件。petit-ui 提供颜色、圆角、边框宽度、字号与字重；布局、间距、字体加载、素材、动效和交互由应用负责。它没有 Button、Dialog 等组件导出，也没有 JavaScript 运行时或 reset。

本 skill 依据 `0.0.1` 的公开接口编写。先查看应用已安装的版本、CSS 入口和依赖；版本不一致时，以对应版本的包导出、CSS 和文档为准。`0.0.0-alpha` 是占名版本，不包含 CSS 功能。

## 接入现有应用

缺少依赖时，使用项目现有包管理器安装，例如：

```sh
pnpm add petit-ui
```

仅使用以下公开子路径：`petit-ui/tokens.css`、`petit-ui/tailwind.css` 和 `petit-ui/package.json`。不要从包根导入组件，也不要使用 `petit-ui/src/*` 深层路径。

### 普通 CSS

无需安装 Tailwind。在应用实际加载的样式入口导入 tokens，并显式消费背景和文字变量：

```css
@import 'petit-ui/tokens.css';

.ui-scope {
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
}

.card {
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
  padding: 1.5rem;
}
```

包名 import 需要 Vite 等 CSS 打包器解析；直接在浏览器使用时，将已安装的 `tokens.css` 提供为静态资源，以实际 URL 引入。仅声明或导入变量不会给元素着色。

### Tailwind CSS 4

使用应用已有的 Tailwind 4 编译流程，在 CSS 入口中按顺序导入：

```css
@import 'tailwindcss';
@import 'petit-ui/tailwind.css';
```

适配入口已经导入 tokens，保留 Tailwind 默认主题和 variants；不需要再次导入 `tokens.css`、复制 token 值或扩展 JavaScript 主题配置。普通间距、布局等继续使用 Tailwind 自带工具类。

```html
<article
  class="rounded-petit-lg border-petit-frame border-solid border-petit-border bg-petit-surface p-6 text-petit-foreground"
>
  卡片内容
</article>
```

| 角色     | CSS 自定义属性                             | Tailwind 工具类示例                                                |
| -------- | ------------------------------------------ | ------------------------------------------------------------------ |
| 颜色     | `--petit-color-{角色}`                     | `bg-petit-surface`、`text-petit-foreground`、`outline-petit-focus` |
| 圆角     | `--petit-radius-{sm,md,lg,full}`           | `rounded-petit-md`                                                 |
| 边框宽度 | `--petit-border-width-{frame,selected}`    | `border-petit-frame`、`border-petit-selected`                      |
| 字重     | `--petit-font-weight-{display,strong}`     | `font-petit-display`、`font-petit-strong`                          |
| 字号     | `--petit-font-size-{heading,label,action}` | `text-petit-heading`、`text-petit-label`、`text-petit-action`      |

注意 `border-petit-selected` 是宽度；选择边的颜色是 `border-petit-border-selected`。`text-petit-heading` 是字号，标题颜色是 `text-petit-foreground-heading`。

`bg-petit-primary/50` 等透明度修饰可用。`scrim` 本身已有透明度，`bg-petit-scrim/50` 会把现有 alpha 再减半。

`@import 'tailwindcss'` 会带入 Preflight。与已有基础样式共存时，按应用需要选择是否加载；适配入口本身不包含 Preflight。具体选择性导入方式见[快速开始](https://github.com/eruoo/petit-ui/blob/main/site/guide/getting-started.md)。

## 按语义选择 token

默认风格由奶油纸色、深褐文字、青灰衬底、金黄主操作和圆润轮廓组成。优先用语义变量表达这些角色，具体轮廓和尺寸由应用决定。

| 使用场景       | 选择与边界                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 页面与中性表面 | 页面用 `background`，内容用 `surface`，悬停与按下用 `surface-hover`／`surface-active`。                                      |
| 正文与辅助文字 | 用 `foreground`／`foreground-muted`；placeholder 也用后者。`foreground-disabled` 只用于真正禁用的内容。                      |
| 主操作         | `primary`／`primary-hover`／`primary-active` 搭配 `on-primary`。金黄填充色不适合纸色面上的小号文字。                         |
| 链接           | 使用 `link` 并保留下划线；小号链接仅承诺页面和普通内容表面，不任意放到 hover／active 底色上。                                |
| 状态           | `success`、`warning`、`error` 可作普通阅读面上的状态文字；用它们填充时，文字配对应 `on-*`，同时提供文字或图标含义。          |
| 功能边界与装饰 | 输入等控件使用 `border-strong`。`border` 是奶油装饰边，适合展示厚框。                                                        |
| 选择与焦点     | `border-selected` 表达选择，配可见勾选或文字；`focus` 独立表达键盘焦点，建议至少 2px 轮廓和 2px offset。                     |
| 青灰衬底       | `surface-accent`／`surface-accent-strong`／`surface-accent-soft` 优先配 `foreground`；辅助、链接和状态文字放回纸色阅读面。   |
| 展示标题       | `foreground-heading` 配普通纸色面、`surface-accent`、`surface-accent-soft` 或 `surface-band`，不配 `surface-accent-strong`。 |
| 金色强调文字   | `foreground-accent` 仅用于 `background`／`surface` 上的大字：至少 24px，或至少 18.67px 且粗体；不用于普通正文或小号链接。    |
| 模态遮罩       | 使用 `scrim`，内容面另用 `surface`；定位、层叠及模态行为由应用实现。                                                         |

`heading`／`label`／`action` 是大号展示字号，`frame`／`selected` 是展示厚框，不是所有正文、输入和紧凑控件的默认尺寸。`display`／`strong` 只设置字重，不会加载字体；按应用需要加载实际字体与对应字重。

## 按任务读取配方

- 实现按钮、字段校验、选中、禁用、菜单或状态反馈时，读取[控件状态](references/states.md)。原生语义和交互库负责行为，颜色不会阻止激活或实现键盘操作。
- 调整品牌、恢复默认配色或处理 Portal／Teleport 时，读取[主题与作用域](references/themes.md)。只提供浅色默认值；`data-theme="dark"` 不会自动创建暗色主题。

完成后，运行应用已有的相关检查。对修改的控件验证禁用与悬停、选择或错误与焦点的组合；更改配色时检查实际前景与背景对比度；涉及 Portal 时检查遮罩和内容的品牌继承。Tailwind 用法应经过真实编译。

## 对照来源

需要核对接口或更多示例时，按需查看以下仓库文档。安装后的 skill 不要求持有 petit-ui 源码仓库；上述相对链接仅指向随 skill 分发的文件。

- [包说明](https://github.com/eruoo/petit-ui/blob/main/packages/petit-ui/README.md)：公开入口和消费边界。
- [Token 规范](https://github.com/eruoo/petit-ui/blob/main/docs/specs/tokens-v1.md)：默认值、主题行为与允许的颜色组合；文档的 `main` 可能领先于已安装版本。
- [三控件视觉配方](https://github.com/eruoo/petit-ui/blob/main/docs/recipes/s03-controls.md)：需要茶杯卡片、宽厚胶囊和徽章连接面板时再读取。素材、字体与示例组件不随 npm 包分发。
