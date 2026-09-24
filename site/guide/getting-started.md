<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import TailwindDemo from '../.vitepress/theme/components/TailwindDemo.vue'
</script>

# 快速开始

Petit UI 提供 CSS 自定义属性，以及可选的 Tailwind CSS 4 映射。选择一种方式，就能开始组合自己的界面。

## 安装

```sh
pnpm add petit-ui
```

CSS 导出从 `0.0.1` 开始提供。普通 CSS 用法无需安装 Tailwind；使用 Tailwind 适配入口时，再按下方说明安装对应工具链。

若应用本来就在该仓库的 pnpm workspace 内，也可以使用 `"petit-ui": "workspace:*"`。本文档站使用这一方式，并且只通过公开子路径导入。

## Agent skill

使用 AI 编程助手时，可通过 [skills CLI](https://github.com/vercel-labs/skills) 安装仓库中的 `petit-ui` skill：

```sh
npx skills add eruoo/petit-ui --skill petit-ui
```

skill 提供普通 CSS、Tailwind CSS 4、语义 token、控件状态及主题覆盖指导，附带参考文件会一起安装。它不会安装 npm 包，应用仍需完成上面的依赖安装。安装时选择要使用的编程助手；如需安装到全局，添加 `-g`。

在本仓库中验证尚未推送的 skill 时，使用本地路径：

```sh
npx skills add . --list
```

在目标应用目录运行 `npx skills add /absolute/path/to/petit-ui --skill petit-ui` 可安装本地版本。仓库远程安装使用已推送的内容。

## 普通 CSS

在支持 npm 包解析的 CSS 打包器中，例如 Vite，导入：

```css
@import 'petit-ui/tokens.css';

.action {
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
  border: 0;
  border-radius: var(--petit-radius-full);
  padding: 12px 24px;
  font:
    800 16px/1.5 system-ui,
    sans-serif;
  cursor: pointer;
}
.action:hover {
  background: var(--petit-color-primary-hover);
}
.action:active {
  background: var(--petit-color-primary-active);
}
.action:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 4px;
}
```

```html
<button class="action" type="button">收藏这份配方</button>
```

在 Vite 应用入口导入自己的样式文件：

```ts
import './style.css'
```

不使用打包器时，先用 `import.meta.resolve('petit-ui/tokens.css')` 定位已安装的 CSS，将该文件提供为静态资源，再使用实际 URL：

```html
<link rel="stylesheet" href="/assets/petit-tokens.css" />
```

浏览器不会直接解析 `petit-ui/tokens.css` 这样的 npm 包名。

## Tailwind CSS 4

完成上方安装后，在已有 Vite 应用中安装 Tailwind 及插件：

```sh
pnpm add -D tailwindcss@4 @tailwindcss/vite@4
```

将插件添加到现有 Vite 配置，保留应用已经使用的 Vue 等插件：

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

样式入口中导入 Tailwind 与适配文件，再从应用入口导入该样式：

```css
@import 'tailwindcss';
@import 'petit-ui/tailwind.css';
```

适配入口已经包含 tokens，不需要再导入 `tokens.css`。全部扩展名称带 `petit-`，不会替换 Tailwind 自带主题。

<DemoFrame label="真实 Tailwind 编译示例"><TailwindDemo /></DemoFrame>

下面就是这个交互示例的完整 Vue 源码。`bg-petit-primary` 等工具类来自真实适配入口；`px-6` 等间距由 Tailwind 提供。

<<< @/.vitepress/theme/components/TailwindDemo.vue

### 与现有文档样式共存

`@import 'tailwindcss'` 会引入 Preflight。本文档站已经有 VitePress 基础样式，因此按 [Tailwind 官方方式](https://tailwindcss.com/docs/preflight#disabling-preflight)只导入主题与 utilities：

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css';
@import 'petit-ui/tailwind.css';
```

VitePress 的基础样式未分层，因此这里也将 utilities 保持为未分层样式，避免按钮的背景、内边距被基础规则覆盖。

本站另用 `source(none)` 与 `@source` 将扫描范围限制为示例组件，避免文档代码块中的类名生成无关样式。

## 下一步

- [了解语义与边界](./semantics)：哪些颜色可以做正文，哪些只适合装饰。
- [主题与品牌覆盖](./themes)：全局、局部与 Portal 的颜色覆盖。
- [查看 Reka UI 示例](/examples/tabs)：将样式与无样式交互控件组合。
