<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import DialogDemo from '../.vitepress/theme/components/DialogDemo.vue'
</script>

# Dialog · 开始烹饪

保留已确认的 Cook 胶囊轮廓、三齿叉与圆环连体徽记，让 Reka UI 处理模态对话框行为。

<DemoFrame label="Cook 对话框" initial-theme="dark" v-slot="{ theme }"><DialogDemo :theme="theme" /></DemoFrame>

## 焦点与关闭

点击 Cook 或聚焦后按 Enter / Space 打开。焦点进入 Dialog，Tab / Shift+Tab 留在弹层内；Escape 或关闭按钮结束交互，焦点返回 Cook。标题与描述通过 Reka 提供的组件关联。

弹窗打开期间，`⌘K` / `Ctrl+K` 和 `/` 不会唤起全站搜索，避免两套焦点陷阱相互争夺焦点。关闭弹窗后，这些搜索快捷键恢复可用。

这是本地展示，不会发送请求或保存数据。

## 局部主题跟随 Portal

这个示例默认深色，即使文档是浅色也保持独立。切换上方局部主题再打开，对话框会跟随示例区域。Portal 内容显式重复同一主题，而不是依赖原始父节点的 CSS 继承。[嵌套主题与品牌示例](/guide/themes#局部与嵌套主题)还展示了品牌色的跨 Portal 传递。

## 完整实现

先安装 `reka-ui`、导入 tokens。将以下两个组件放在同一目录；茶杯与 mask 使用本站保存的独立示例素材，复制时调整资源路径。以 `<DialogDemo theme="dark" />` 使用。

<<< @/.vitepress/theme/components/DialogDemo.vue

<details>
<summary>CookButton 的完整实现</summary>

此 mask 只用于 Cook。它不是通用刀叉图标，不能替换为 Drink 的餐具图标。Nunito 字体在本站加载；如果换字体，需重新检查字重、宽度和基线。[素材与字体说明](/credits)。

<<< @/.vitepress/theme/components/CookButton.vue

</details>

品牌类与主题辅助变量由消费方提供，本站定义如下：

```css
:where(:root, [data-theme='light']) {
  --recipe-dark-mix: 0%;
}
:where([data-theme='dark']) {
  --recipe-dark-mix: 100%;
}

.demo-brand {
  --petit-color-primary: #654d79;
  --petit-color-primary-hover: #553d69;
  --petit-color-primary-active: #463058;
  --petit-color-on-primary: #ffffff;
  --petit-color-focus: #78538f;
}
```

示例中没有将默认打开状态依赖于 `window`、屏幕宽度或随机值，避免 SSR 与客户端首次渲染不同。
