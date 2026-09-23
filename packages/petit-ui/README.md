# petit-ui

与框架无关的 CSS design tokens，提供可选的 Tailwind CSS 4 适配入口。包含 28 个语义颜色、4 个圆角、2 个边框宽度、2 个字重和 3 个字号，不包含组件、reset 或 JavaScript 运行时。

默认浅色转译星布谷地公开界面的奶油纸色、深褐文字、青灰衬底、金黄操作、厚奶油边缘和赭色选择轮廓。深色是协调这些关系的网页扩展设计，非官方完整深色主题。颜色来自截图观察与独立网页设计，不是官方 token；未包含游戏图片或字体。

当前为 alpha API，公共名称和默认值仍可能在后续版本调整。本 README 描述当前源码；此前发布的 `0.0.0-alpha` 只有工程初始化内容，尚不包含这些入口。功能版本由维护者另行发布。

## 普通 CSS

```css
@import 'petit-ui/tokens.css';

.card {
  color: var(--petit-color-foreground);
  background: var(--petit-color-surface);
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
}

.button {
  color: var(--petit-color-on-primary);
  background: var(--petit-color-primary);
  border: 0;
  border-radius: var(--petit-radius-full);
  padding: 0.75rem 1.5rem;
  font-size: var(--petit-font-size-action);
  font-weight: var(--petit-font-weight-strong);
}

.button:hover {
  background: var(--petit-color-primary-hover);
}

.button:active {
  background: var(--petit-color-primary-active);
}

.button:focus-visible {
  outline: 2px solid var(--petit-color-focus);
  outline-offset: 2px;
}
```

普通入口无需 Tailwind。包名 import 需要使用方的 CSS 打包器解析；直接在浏览器使用时，将 `tokens.css` 作为静态资源提供，再用实际 URL 引入。

## Tailwind CSS 4

安装 Tailwind CSS 4 并通过其工具链编译：

```css
@import 'tailwindcss';
@import 'petit-ui/tailwind.css';
```

```html
<article class="bg-petit-surface text-petit-foreground rounded-petit-lg">
  <button
    class="bg-petit-primary text-petit-on-primary rounded-petit-full border-0 px-6 py-3 text-petit-action font-petit-strong hover:bg-petit-primary-hover active:bg-petit-primary-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petit-focus disabled:text-petit-foreground-disabled"
  >
    保存
  </button>
</article>
```

适配入口自动导入 tokens，保留 Tailwind 默认主题和 variants。`bg-petit-primary/50` 等透明度修饰可直接使用。同一工具类随所在主题作用域变化，无需另写 `dark:` 颜色类。

## 主题与覆盖

默认浅色，不自动跟随系统。建议在 `html` 设置 `data-theme="dark"` 或 `data-theme="light"`；主题偏好存储和切换行为由应用负责。变量本身不会给元素设置颜色或 `color-scheme`。

```html
<html data-theme="dark">
  <body>
    <section data-theme="light">
      <article class="brand-scope">局部品牌配色</article>
      <article data-theme="dark">嵌套深色</article>
    </section>
  </body>
</html>
```

在 imports 之后，用普通、未分层的 CSS 或行内自定义属性覆盖：

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

普通后代继承覆盖；后代显式主题重新声明全部颜色，但保留继承的圆角、边框宽度和排版数值覆盖。要让品牌配色跨过主题边界，应在新主题节点或其内部再次应用品牌类。主色、hover、active、on-primary 和 focus 相互独立，覆盖主色不会自动推导其他值。未知主题值继承最近作用域的颜色；根节点仍有浅色默认值。局部主题不会跨越 DOM 上的 Portal/Teleport 边界。

## 语义选择

- `background` 用于页面，`surface`、`surface-hover`、`surface-active` 用于中性表面及其状态。
- `foreground` 用于正文，`foreground-muted` 用于辅助文字和 placeholder；`foreground-disabled` 仅用于真正禁用的内容。
- `border` 是奶油色装饰边，可用较厚边缘呈现卡片；需要靠边缘辨认的输入等控件使用 `border-strong`。金黄主操作不强制附加深色边框。焦点使用 `focus`，建议至少 2px 轮廓和 2px offset。
- `primary`、`primary-hover`、`primary-active` 是金黄操作填充，搭配深褐 `on-primary`，不要作为纸色背景上的小号文字。链接使用 `link` 并加下划线；`success`、`warning`、`error` 分别搭配对应的 `on-*`。状态同时提供文字或图标含义。
- `surface-accent` 是青灰衬底，搭配 `foreground` 正文；辅助、链接和状态文字留在常规阅读面。`border-selected` 是赭色选择轮廓，配勾选或“已选”文字；浅色外框紧贴奶油内框，深色相对于深色表面识别，键盘焦点另用 `focus` 表达。
- `foreground-accent` 用于常规表面的大号金色强调文字，Tailwind 为 `text-petit-foreground-accent`。仅保证 3:1，必须实际达到至少 24px，或至少 18.67px 且粗体；不能代替普通正文／小号链接的 `foreground`／`link`。本轮 Details 为 26px／800；普通链接仍保持 4.5:1。
- `foreground-heading` 是标题褐色；`surface-accent-strong`／`surface-accent-soft` 分别用于青灰分区与媒体圆底，`surface-band` 用于纸色标题带。
- 共用粗框使用 `--petit-border-width-frame`／`--petit-border-width-selected`；大号文字使用 `--petit-font-size-heading`／`label`／`action`，字重使用 `--petit-font-weight-display`／`strong`。Tailwind 对应 `border-petit-frame`、`border-petit-selected`、`text-petit-heading`、`text-petit-label`、`text-petit-action`、`font-petit-display`、`font-petit-strong`。
- 圆角提供 `sm`、`md`、`lg`、`full`，默认对应 12/16/24px（根字号 16px 时）与胶囊。普通 CSS 使用 `--petit-radius-*`，Tailwind 使用 `rounded-petit-*`。

普通颜色变量统一为 `--petit-color-*`，Tailwind 映射为 `bg-petit-*`、`text-petit-*`、`border-petit-*` 等。默认对比度针对约定组合验证；自定义配色需要重新检查。

仅导出 `petit-ui/tokens.css`、`petit-ui/tailwind.css` 和 `petit-ui/package.json`，不提供包根或源码深层路径导出。

## 风格依据与消费样式

浅色核心依据是[官方 Final Beta 公告](https://www.hoyolab.com/article/46776026)第 4 张烹饪界面的纸色面板、青灰卡片、奶油厚边、赭色选框和金黄按钮；第 7 张蓝图详情与第 15 张 Omnidex 入口补充深褐标题、圆形标记和胶囊操作的层级关系。第 9 张夜蓝地图不代表完整深色规范。取样色、网页调整与来源边界详见[项目规范](https://github.com/eruoo/petit-ui/blob/main/docs/specs/tokens-v1.md#风格依据与网页转译)（对应源码版本）。

仅导入 tokens 不会生成游戏控件。三控件配方见[源码文档](https://github.com/eruoo/petit-ui/blob/main/docs/recipes/s03-controls.md)（对应源码版本）：包括竖卡、双层厚框、圆形媒体、宽厚胶囊及顶部徽章连接面板。公共数值负责共用视觉重量，具体比例、轮廓组合、纹样和素材由消费 CSS 负责。

实际字体同样由使用方加载。临时对照采用 Nunito（英文标题 900，主操作及辅助行 800）和 Noto Sans SC（中文 900），字体由消费方按来源与许可下载加载，不随包分发；单写 `ui-rounded` 或最大字重不能保证相似字形。当前版本已获用户认可作为首版视觉基线；其示例素材与组合规则保存在源码文档，不随 npm 包分发。

此前未发布的蓝灰默认方案已调整；若消费代码曾用 `text-petit-primary` 表示链接，请改为 `text-petit-link`，并复查圆角和自定义覆盖。
