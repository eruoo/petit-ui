<script setup lang="ts">
import ThemePlayground from '../.vitepress/theme/components/ThemePlayground.vue'
</script>

# 主题与品牌覆盖

Petit UI 只提供浅色默认配色。应用可以通过 CSS 变量覆盖品牌；元素本身仍需要显式使用这些变量。

## 默认配色

导入后，根节点已经包含全部默认值，无需设置主题属性。包不监听系统外观，也不存储偏好；本站固定使用浅色外观。

```css
@import 'petit-ui/tokens.css';

body {
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
}
```

## 品牌覆盖

在 imports 后使用普通、未分层 CSS。默认选择器 specificity 为零，方便直接覆盖：

```css
.brand-scope {
  --petit-color-primary: #654d79;
  --petit-color-primary-hover: #553d69;
  --petit-color-primary-active: #463058;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #78538f;
  --petit-color-scrim: rgb(37 42 40 / 45%);
}
```

主色不会自动推导 hover、active、on-primary 或 focus；请成组调整。普通后代自然继承覆盖。

`scrim` 可独立调整。本站品牌示例把遮罩透明度设为 45%，默认值为 65%。遮罩不用于弹层内容背景或禁用控件，内容面仍使用 `surface`。

## 局部恢复默认配色

`data-theme="light"` 重新声明默认颜色，可让某个子树退出祖先的品牌配色。圆角、边框宽度、字号和字重只在根节点声明，仍会继承祖先的覆盖。其他 `data-theme` 值不匹配规则，继续继承。

```html
<section class="brand-scope">
  <article>继承品牌配色</article>
  <article data-theme="light">恢复默认颜色，仍继承数值覆盖</article>
</section>
```

<ThemePlayground />

品牌区域的 Cook 使用紫色主操作，打开后得到相同品牌的 Dialog。内部带 `data-theme="light"` 的区域恢复默认金黄，胶囊仍继承祖先的圆角覆盖。若需要在该区域再次使用品牌配色，可重新应用品牌类。

## Portal / Teleport

Vue 的逻辑组件关系不会改变，但 CSS 继承沿着实际 DOM 发生。局部品牌里的 Dialog 一旦 Portal 到 `body`，就无法自动继承原来的局部变量。

本站的 [Dialog 示例](/examples/dialog)把同一品牌类显式应用到触发区域、`DialogOverlay` 和 `DialogContent`，将弹层保留在 `body`，避免被局部 overflow 或 transform 裁切。遮罩与内容是并列元素，只给内容设置品牌不会改变遮罩。

```vue
<DialogPortal>
  <DialogOverlay :class="{ 'demo-brand': branded }" />
  <DialogContent :class="{ 'demo-brand': branded }">
    <!-- 弹层内容 -->
  </DialogContent>
</DialogPortal>
```

如果应用还有局部圆角、字体或其他自定义覆盖，也必须将相同覆盖应用到 Portal 内容或专门的弹层容器。本例只显式传递品牌类，不自动复制任意祖先样式。

Dialog 默认关闭，SSR 不依赖浏览器尺寸或随机 ID；Vue 3.5 与 Reka UI 提供稳定的可访问性 ID。点击后才挂载 Portal，并由 Reka 管理焦点、Escape 和返回触发器。
