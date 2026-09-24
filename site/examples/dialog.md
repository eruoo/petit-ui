<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import DialogDemo from '../.vitepress/theme/components/DialogDemo.vue'
</script>

# Dialog · 开始烹饪

保留已确认的 Cook 胶囊轮廓、三齿叉与圆环连体徽记，让 Reka UI 处理模态对话框行为。

<DemoFrame label="Cook 对话框"><DialogDemo /></DemoFrame>

## 焦点与关闭

点击 Cook 或聚焦后按 Enter / Space 打开。焦点进入 Dialog，Tab / Shift+Tab 留在弹层内；Escape 或关闭按钮结束交互，焦点返回 Cook。标题与描述通过 Reka 提供的组件关联。

弹窗打开期间，`⌘K` / `Ctrl+K` 和 `/` 不会唤起全站搜索，避免两套焦点陷阱相互争夺焦点。关闭弹窗后，这些搜索快捷键恢复可用。

这是本地展示，不会发送请求或保存数据。

## 品牌覆盖跟随 Portal

这个示例使用默认浅色配色。[品牌覆盖示例](/guide/themes#局部恢复默认配色)展示了局部颜色的跨 Portal 传递：触发区域、遮罩和内容分别应用同一品牌类。

遮罩使用 `scrim`，内容面使用 `surface`。局部遮罩覆盖也要应用到 `DialogOverlay`；只给 `DialogContent` 加品牌类不会改变它的并列遮罩。

## 完整实现

先安装 `reka-ui`、导入 tokens。将以下两个组件放在同一目录；茶杯与 mask 使用本站保存的独立示例素材，复制时调整资源路径。以 `<DialogDemo />` 使用。

<<< @/.vitepress/theme/components/DialogDemo.vue

<details>
<summary>CookButton 的完整实现</summary>

此 mask 只用于 Cook。它不是通用刀叉图标，不能替换为 Drink 的餐具图标。Nunito 字体在本站加载；如果换字体，需重新检查字重、宽度和基线。[素材与字体说明](/credits)。

<<< @/.vitepress/theme/components/CookButton.vue

</details>

品牌类由消费方提供，本站定义如下：

```css
.demo-brand {
  --petit-color-primary: #654d79;
  --petit-color-primary-hover: #553d69;
  --petit-color-primary-active: #463058;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #78538f;
  --petit-color-scrim: rgb(37 42 40 / 45%);
}
```

示例中没有将默认打开状态依赖于 `window`、屏幕宽度或随机值，避免 SSR 与客户端首次渲染不同。
