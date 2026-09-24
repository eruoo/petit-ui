# 控件状态

这些是消费方的组合方式，不是 petit-ui 导出的组件。先使用原生控件或应用已有的无样式交互库，再将 token 应用到实际状态。

## 原生按钮

在已导入 tokens 的样式中加入：

```css
.action {
  padding: 0.625rem 1rem;
  border: 0;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
  font: inherit;
  font-weight: var(--petit-font-weight-strong);
  cursor: pointer;
}
.action:enabled:hover {
  background: var(--petit-color-primary-hover);
}
.action:enabled:active {
  background: var(--petit-color-primary-active);
}
.action:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.action:disabled {
  background: var(--petit-color-surface-hover);
  color: var(--petit-color-foreground-disabled);
  cursor: not-allowed;
}
```

```html
<button class="action" type="button">保存</button>
<button class="action" type="button" disabled>暂不可用</button>
```

相同状态可用 Tailwind 4 表达：

```html
<button
  type="button"
  class="rounded-petit-full border-0 bg-petit-primary px-4 py-2 font-petit-strong text-petit-on-primary enabled:hover:bg-petit-primary-hover enabled:active:bg-petit-primary-active focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-petit-focus disabled:bg-petit-surface-hover disabled:text-petit-foreground-disabled disabled:cursor-not-allowed"
>
  保存
</button>
```

原生 `disabled` 阻止激活，`enabled:hover`／`enabled:active` 排除禁用状态。`aria-disabled="true"` 和 `data-disabled` 本身不会实现禁用；按组件的真实属性编写样式，并由应用或交互库阻止激活。

## 选择、字段和状态反馈

| 状态     | 消费规则                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 中性选择 | 默认 `surface/foreground`；悬停 `surface-hover`；按下或选中 `surface-active`。选中另用 `border-selected` 和可见勾号或文字。          |
| 强调选择 | 可用 `primary/on-primary`，仍保留可见选择标记和独立焦点轮廓。按钮更新 `aria-pressed`，Checkbox 使用真实 checked 状态。               |
| 输入字段 | `surface/foreground`、细 `border-strong` 边框，placeholder 用 `foreground-muted`。hover 限定在可用且非 readonly 的字段。             |
| 字段错误 | 边框和错误文案用 `error`，设置 `aria-invalid="true"`，通过 `aria-describedby` 关联可见文案；聚焦时保留错误边框，另画 `focus` 外圈。  |
| 校验恢复 | 同步清除或更新错误文案、`aria-invalid` 与 `aria-describedby`，不要留下失效的错误关联。                                               |
| 只读     | 保留正常可读文字；readonly 不等于 disabled，不套用禁用色。                                                                           |
| 禁用     | 用 `foreground-disabled`，中性底可用 `surface-hover`；同时设置真实禁用行为，排除 hover／active 样式。                                |
| 状态反馈 | `surface` 上用 `success`／`warning`／`error` 表达状态；实色填充时改用对应 `on-success`／`on-warning`／`on-error`。文字明确说明结果。 |

焦点轮廓与控件之间保留表面色间隔，给轮廓留出不被裁切的空间。展示双层框时，`border-selected` 选择外框紧贴奶油 `border` 内框，焦点另画。

## 破坏性操作

文字操作在 `surface` 上用 `error`，悬停用 `surface-hover/error`；按下切换为 `error/on-error` 实色组合。不要把小号 `link` 放到任意菜单状态底色上。

以下规则接在前述 `.action` 样式之后，用于 `<button class="action danger" type="button">删除</button>`：

```css
.action.danger:enabled {
  background: var(--petit-color-surface);
  color: var(--petit-color-error);
}
.action.danger:enabled:hover {
  background: var(--petit-color-surface-hover);
}
.action.danger:enabled:active {
  background: var(--petit-color-error);
  color: var(--petit-color-on-error);
}
```

限定 `:enabled` 可保留共用的禁用样式。是否需要确认删除由应用任务决定。

## 与 Reka UI 等交互库组合

Reka UI 是应用可自行选择的 Vue 依赖，不是 petit-ui 的必需依赖。使用其组件公开的状态属性，不手动模拟它维护的状态；其他框架沿用已有交互方案。

| 控件          | 当前仓库示例使用的状态                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Tabs          | `TabsTrigger[data-state='active']` 使用 `primary/on-primary`，仍有独立焦点提示；方向键行为交给 Tabs。                                |
| Checkbox      | `CheckboxRoot[data-state='checked']` 使用 `primary/on-primary`，通过 indicator 显示勾号并关联可见标签。                              |
| Dropdown Menu | `[data-highlighted]` 表达指针或键盘高亮；`[data-disabled]` 表达禁用。高亮和 active 选择器都加 `:not([data-disabled])`。              |
| Dialog        | 遮罩使用 `scrim`，内容使用 `surface/foreground`，保留标题、描述、Escape、焦点圈定与返回触发器；品牌传递见[主题与作用域](themes.md)。 |

菜单普通项使用 `surface/foreground`、高亮用 `surface-hover` 加焦点提示、按下用 `surface-active`；破坏性项使用上面的 `error` 组合。不要仅凭 `:hover` 表达键盘高亮。

需要完整实现时读取[状态配方](https://github.com/eruoo/petit-ui/blob/main/site/guide/states.md)或[运行中的示例源码](https://github.com/eruoo/petit-ui/tree/main/site/.vitepress/theme/components)。示例中的图片、字体及其他站点组件需要应用自行提供；它们不是包导出。
