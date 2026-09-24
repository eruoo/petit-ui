# 常见 UI 状态配方

这些配方组合现有 tokens，供应用编写自己的控件样式。输入框与正文使用常规字号，细边框明确功能边界；展示面板可组合奶油厚框、纸色表面和标题带，操作按钮可使用胶囊圆角。可用颜色组合的边界见[语义与使用边界](/guide/semantics)。

以下 HTML 展示状态快照。应用负责更新 `aria-pressed`、`aria-invalid`、错误文案和真正的 `disabled` 属性；颜色本身不会实现这些行为。

可操作的完整示例：[表单校验](/examples/form)、[按钮与状态反馈](/examples/states)、[下拉菜单](/examples/menu)。示例页直接引用运行中的组件源码，便于复制和修改。

交互示例使用 Nunito 与系统回退字体。本站自行加载 Nunito，复制组件后未加载该字体时会使用系统字体；字体来源和许可见[字体说明](/credits#字体)。

## 共用表面与焦点

在局部主题容器上同时消费背景和文字，避免只更换变量却沿用外层颜色。焦点轮廓与控件之间留出表面色间隔，使它可以和选中、错误状态同时出现。容器还需留出轮廓空间，避免被裁切。

```css
@import 'petit-ui/tokens.css';

.ui-scope {
  padding: 1rem;
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
  font:
    1rem/1.5 system-ui,
    sans-serif;
}

.action,
.choice,
.field {
  box-sizing: border-box;
  padding: 0.625rem 1rem;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-sm);
  font: inherit;
}

:where(.action, .choice, .field, .menu-item):focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}

:where(.action, .choice, .field):disabled {
  cursor: not-allowed;
}
```

## 主操作、选择与禁用

主操作使用 `primary` 的三个背景和 `on-primary`。中性选择使用 `surface-active`、`foreground`、选择边和可见勾号；如果需要金黄强调选中，也可使用 `primary/on-primary` 配对。选择标记保留时，键盘焦点另画外圈。

```html
<section class="ui-scope">
  <button class="action" type="button">保存</button>
  <button class="action" type="button" disabled>保存暂不可用</button>
  <button class="choice" type="button" aria-pressed="true">
    <span class="choice-check" aria-hidden="true">✓</span> 水果茶
  </button>
</section>
```

```css
.action {
  border-color: transparent;
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
}
.action:enabled:hover {
  background: var(--petit-color-primary-hover);
}
.action:enabled:active {
  background: var(--petit-color-primary-active);
}
.choice {
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
}
.choice:enabled:hover {
  background: var(--petit-color-surface-hover);
}
.choice:enabled:active,
.choice[aria-pressed='true'] {
  background: var(--petit-color-surface-active);
}
.choice[aria-pressed='true'] {
  border-color: var(--petit-color-border-selected);
}
.choice-check {
  visibility: hidden;
}
.choice[aria-pressed='true'] .choice-check {
  visibility: visible;
}
.action:disabled,
.choice:disabled {
  background: var(--petit-color-surface-hover);
  color: var(--petit-color-foreground-disabled);
}
```

原生按钮的 Tailwind 写法如下。`enabled:` 限制悬停和按下，避免禁用后仍出现主操作色。`aria-disabled` 和 `data-disabled` 不等同于原生 `disabled`，需要按使用方的组件行为另外处理。

```html
<button
  type="button"
  class="rounded-petit-sm border-0 bg-petit-primary px-4 py-2 text-petit-on-primary enabled:hover:bg-petit-primary-hover enabled:active:bg-petit-primary-active focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-petit-focus disabled:bg-petit-surface-hover disabled:text-petit-foreground-disabled disabled:cursor-not-allowed"
  disabled
>
  保存暂不可用
</button>
```

## 字段与校验

标签、提示和输入值使用正常文字角色。只读仍然可读，不使用禁用色。错误状态同时保留边框、文案及关联关系；获得焦点后仍显示错误边框，外圈表示焦点。

```html
<section class="ui-scope">
  <label for="recipe-name">配方名称</label>
  <input
    id="recipe-name"
    class="field"
    placeholder="例如：水果茶"
    aria-invalid="true"
    aria-describedby="recipe-name-error"
  />
  <p id="recipe-name-error" class="field-error">错误：请填写配方名称。</p>
  <label for="recipe-id">配方编号（只读）</label>
  <input id="recipe-id" class="field" value="TEA-01" readonly />
</section>
```

```css
.field {
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
}
.field::placeholder {
  color: var(--petit-color-foreground-muted);
  opacity: 1;
}
.field:enabled:not([readonly]):hover {
  background: var(--petit-color-surface-hover);
}
.field[aria-invalid='true'] {
  border-color: var(--petit-color-error);
}
.field-error {
  color: var(--petit-color-error);
}
.field:disabled,
.field:disabled::placeholder {
  color: var(--petit-color-foreground-disabled);
}
.field:disabled {
  background: var(--petit-color-surface-hover);
}
```

恢复有效状态时同步移除或更新错误文案、`aria-invalid` 和 `aria-describedby`。不要用颜色代替校验消息。

## 破坏性操作与菜单

破坏性文字操作在 `surface` 和 `surface-hover` 上使用 `error`；按下时切换为 `error` 背景与 `on-error` 文字。小号 `link` 不作为任意菜单状态的文字色；其他组合需自行验证。

在已建立的 Reka UI 菜单中，将下面的类传给内容面和条目。`data-highlighted`、`data-disabled` 由 Reka UI 维护，键盘移动、禁用和选中行为仍由菜单组件处理。

```vue
<DropdownMenuContent class="floating-surface">
  <DropdownMenuItem class="menu-item">编辑配方</DropdownMenuItem>
  <DropdownMenuItem class="menu-item danger">删除配方</DropdownMenuItem>
  <DropdownMenuItem class="menu-item danger" disabled>删除锁定配方</DropdownMenuItem>
</DropdownMenuContent>
```

```css
.floating-surface {
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-md);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
}
.menu-item {
  padding: 0.625rem 1rem;
  border: 0;
  border-radius: var(--petit-radius-sm);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  font: inherit;
}
.menu-item:not([data-disabled])[data-highlighted] {
  background: var(--petit-color-surface-hover);
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.menu-item:not([data-disabled]):active {
  background: var(--petit-color-surface-active);
}
.danger {
  background: var(--petit-color-surface);
  color: var(--petit-color-error);
}
.action.danger:enabled:hover {
  background: var(--petit-color-surface-hover);
}
.action.danger:enabled:active,
.menu-item.danger:not([data-disabled]):active {
  background: var(--petit-color-error);
  color: var(--petit-color-on-error);
}
.menu-item[data-disabled] {
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground-disabled);
}
```

普通破坏性按钮使用 `<button class="action danger" type="button">删除配方</button>`，沿用前面的原生禁用和焦点样式。浮层的定位、层叠顺序及尺寸由应用处理；Portal 中要显式传入局部品牌覆盖。

## 状态卡片与模态遮罩

成功、警告和错误卡片可复用上面的 `floating-surface`，在中性阅读面上显示状态文字。若整个卡片使用状态色填充，文字必须改为对应的 `on-success`、`on-warning` 或 `on-error`。描述和图标应表达明确含义。

```html
<article class="floating-surface">
  <strong class="status-success">✓ 已保存</strong>
  <p>配方已保存到收藏。</p>
</article>
<article class="floating-surface">
  <strong class="status-warning">注意：食材不足</strong>
  <p>还需要一份水果。</p>
</article>
<article class="floating-surface">
  <strong class="status-error">错误：保存失败</strong>
  <p>请检查网络后重试。</p>
</article>
```

```css
.status-success {
  color: var(--petit-color-success);
}
.status-warning {
  color: var(--petit-color-warning);
}
.status-error {
  color: var(--petit-color-error);
}
.modal-scrim {
  position: fixed;
  inset: 0;
  background: var(--petit-color-scrim);
}
```

遮罩默认已含 65% alpha，Tailwind 使用 `bg-petit-scrim`；再加 `/50` 会将 alpha 变为 32.5%。遮罩上不直接放正文，内容仍使用独立的 `surface`。遮罩与内容通常是 Portal 中的兄弟元素，两者都需接收局部品牌覆盖，完整实现见 [Dialog 示例](/examples/dialog)。
