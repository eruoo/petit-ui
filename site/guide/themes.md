<script setup lang="ts">
import ThemePlayground from '../.vitepress/theme/components/ThemePlayground.vue'
</script>

# 主题与品牌覆盖

主题通过 `data-theme` 切换 CSS 变量，元素本身仍需要显式使用这些变量。

## 全局浅色与深色

未设置主题时使用浅色。把属性放在 `html` 上，让应用与挂载到 `body` 的弹层都能继承：

```html
<html data-theme="dark"></html>
```

```css
body {
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
}
```

```ts
// 在浏览器事件或 mounted 生命周期中运行。
document.documentElement.dataset.theme = 'light'
```

包不监听系统主题，也不存储偏好。本站复用 VitePress 的切换与存储机制，并在首屏绘制前将 `.dark` 同步为 `data-theme`。

## 局部与嵌套主题

最近的显式主题重设全部颜色；未知属性值不匹配规则，继续继承。圆角、边框宽度、字号和字重只在根节点默认声明，局部主题不会重置这些数值。

```html
<section data-theme="dark">
  深色区域
  <article data-theme="light">
    浅色内容
    <aside data-theme="dark">再次切回深色</aside>
  </article>
</section>
```

<ThemePlayground />

这里是深 → 浅 → 深的真实嵌套。浅色区域的 Cook 使用品牌覆盖；打开它，也会得到浅色、同品牌的 Dialog。

## 品牌覆盖

在 imports 后使用普通、未分层 CSS。默认选择器 specificity 为零，方便直接覆盖：

```css
.brand-scope {
  --petit-color-primary: #654d79;
  --petit-color-primary-hover: #553d69;
  --petit-color-primary-active: #463058;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #78538f;
}
```

主色不会自动推导 hover、active、on-primary 或 focus；请成组调整。子树显式设置主题时会重新声明颜色，需要在该主题节点重新应用品牌类。普通后代则自然继承。

## Portal / Teleport

Vue 的逻辑组件关系不会改变，但 CSS 继承沿着实际 DOM 发生。局部深色里的 Dialog 一旦 Portal 到 `body`，就无法自动继承原来的局部变量。

本站的 [Dialog 示例](/examples/dialog)把同一份 `theme` 和品牌类显式应用到触发区域及 `DialogContent`，将弹层保留在 `body`，避免被局部 overflow 或 transform 裁切。

```vue
<DialogPortal>
  <DialogOverlay :data-theme="theme" />
  <DialogContent :data-theme="theme" :class="{ 'demo-brand': branded }">
    <!-- 弹层内容 -->
  </DialogContent>
</DialogPortal>
```

如果你的应用还有局部圆角、字体或其他自定义覆盖，也必须将相同覆盖应用到 Portal 内容或专门的弹层容器。本例显式传递颜色主题与品牌，不是自动复制任意祖先样式的通用封装。

Dialog 默认关闭，SSR 不依赖浏览器尺寸或随机 ID；Vue 3.5 与 Reka UI 提供稳定的可访问性 ID。点击后才挂载 Portal，并由 Reka 管理焦点、Escape 和返回触发器。
