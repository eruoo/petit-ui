# 主题与作用域

## 默认值和覆盖

`tokens.css` 用 `:where(:root, [data-theme='light'])` 声明颜色，用 `:where(:root)` 声明圆角、边框宽度、字号和字重。规则未放入命名 cascade layer，选择器 specificity 为零。

在 imports 之后，用普通、未分层的 CSS 或行内自定义属性覆盖 `--petit-*`。Tailwind 项目也覆盖这些语义变量，不需要重建 `@theme` 映射。

```css
.brand-scope {
  --petit-color-primary: #654d79;
  --petit-color-primary-hover: #553d69;
  --petit-color-primary-active: #463058;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #78538f;
  --petit-color-scrim: rgb(37 42 40 / 45%);
  --petit-radius-full: 1rem;
}

.themed-surface {
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
}
```

这是一组消费示例值。主色、hover、active、on-primary 和 focus 相互独立，应成组调整并检查实际对比度。只改 `primary` 不会推导其他值。

全局品牌可将变量设在 `html` 上，使挂载到 `body` 的浮层也能继承。局部主题面必须显式消费自己的背景与文字变量，避免沿用外层已计算的颜色。

## 局部恢复默认颜色

```html
<section class="brand-scope themed-surface">
  <article>继承品牌变量</article>
  <article class="themed-surface" data-theme="light">恢复默认颜色，仍继承圆角覆盖</article>
</section>
```

`data-theme="light"` 在该节点重新声明默认颜色，使后代退出祖先品牌色。圆角、边框宽度、字号和字重仍继承祖先覆盖；需要恢复这些数值时，应用显式覆盖对应变量。

若要在重置节点或其内部再次采用品牌，重新应用品牌类。除 `light` 外的 `data-theme` 值没有内建规则；包不提供暗色默认值、系统外观同步、`color-scheme` 设置或主题偏好存储。

## Portal / Teleport

CSS 继承依据真实 DOM。局部品牌内的弹层 Portal 到 `body` 后，不再是原品牌容器的后代。

- 将同一品牌类分别应用到遮罩和内容，或应用到能同时包住两者的实际 Portal 容器；只给内容设置品牌不会改变作为兄弟元素的遮罩。
- 局部圆角、字号、字体等覆盖也需要传递。复制品牌类不等于自动复制任意祖先样式。
- 如果把 Portal 挂载回局部容器，需要考虑其 overflow、transform 和层叠环境是否裁切或限制弹层。

遮罩使用 `--petit-color-scrim`／`bg-petit-scrim`，内容用 `surface/foreground`。默认遮罩 alpha 为 65%，`bg-petit-scrim/50` 的结果为 32.5%；不要把额外透明度修饰当成设置最终 50%。

检查局部品牌、内层 `data-theme="light"`、恢复品牌，以及 Portal 打开后的遮罩与内容；同时确认焦点仍可见。更多实现见[主题指南](https://github.com/eruoo/petit-ui/blob/main/site/guide/themes.md)。
