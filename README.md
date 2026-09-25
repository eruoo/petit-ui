# Petit UI

与框架无关的 CSS design tokens，提供浅色默认主题和可选的 Tailwind CSS 4 适配层。奶油纸色、深褐文字、青灰衬底和金黄操作色，搭配圆角、边框与排版数值，供应用组合自己的控件。

[文档站](https://petit-ui-site.l709937065.workers.dev) · [快速开始](https://petit-ui-site.l709937065.workers.dev/guide/getting-started) · [Token 浏览器](https://petit-ui-site.l709937065.workers.dev/tokens) · [主题与覆盖](https://petit-ui-site.l709937065.workers.dev/guide/themes) · [交互示例](https://petit-ui-site.l709937065.workers.dev/examples/tabs)

## 安装

```sh
pnpm add petit-ui
```

普通 CSS 项目在支持 npm 包解析的样式入口导入：

```css
@import 'petit-ui/tokens.css';

.card {
  color: var(--petit-color-foreground);
  background: var(--petit-color-surface);
  border-radius: var(--petit-radius-lg);
}
```

使用 Tailwind CSS 4 时，在已配置好 Tailwind 的项目中导入适配入口：

```css
@import 'tailwindcss';
@import 'petit-ui/tailwind.css';
```

随后可使用 `bg-petit-surface`、`text-petit-foreground`、`rounded-petit-lg` 等工具类。工具链配置、浏览器直接使用和完整示例见[快速开始](https://petit-ui-site.l709937065.workers.dev/guide/getting-started)，控件组合见[常见 UI 状态配方](https://petit-ui-site.l709937065.workers.dev/guide/states)。

包只提供 tokens，不包含组件、reset 或 JavaScript 运行时。当前为 0.x 早期 API，公共名称与默认值仍可能调整，版本记录见[更新日志](packages/petit-ui/CHANGELOG.md)。

## Agent skill

为 AI 编程助手安装接入、语义选择、状态配方和主题覆盖指导：

```sh
npx skills add eruoo/petit-ui --skill petit-ui
```

skill 与 npm 包分别安装。全局安装与本地验证方式见[Agent skill 说明](https://petit-ui-site.l709937065.workers.dev/guide/getting-started#agent-skill)。

## 本地开发

使用 Node.js 24，pnpm 版本由根目录 `package.json` 指定。

```sh
pnpm install
pnpm site:dev
```

运行 `pnpm check` 检查代码、格式、测试、站点类型和构建。开发约定见[开发指南](docs/development.md)，内部规范从[文档索引](docs/index.md)查阅。

## 许可与来源

[MIT](LICENSE)。默认风格参考星布谷地公开界面，由截图观察与独立网页设计转译；设计来源、示例素材和第三方许可见[设计来源与许可](https://petit-ui-site.l709937065.workers.dev/credits)。
