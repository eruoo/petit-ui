<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import ButtonStatesDemo from '../.vitepress/theme/components/examples/ButtonStatesDemo.vue'
import StatusFeedbackDemo from '../.vitepress/theme/components/examples/StatusFeedbackDemo.vue'
</script>

# 按钮与状态反馈

在同一个界面里比较主操作、选择、禁用和破坏性操作，再切换成功、警告和错误提示。示例沿用胶囊按钮、奶油厚框和纸色表面，控件与正文保持常规字号。

## 按钮状态

悬停或按住按钮查看背景变化，Tab 查看焦点外圈。水果茶的勾号、选择边和 `aria-pressed` 同步变化，焦点仍有独立外圈。「移除选择」会取消选择并禁用自身，再选中水果茶即可恢复。禁用按钮不会响应点击或改变悬停背景。

<DemoFrame label="主操作、选择与禁用"><ButtonStatesDemo /></DemoFrame>

保存按钮只显示操作反馈；选择状态保留在本页，刷新后恢复。实现沿用[主操作、选择与禁用](/guide/states#主操作、选择与禁用)和[破坏性操作配方](/guide/states#破坏性操作与菜单)。

## 成功、警告和错误

默认用纸色卡片、奶油外框和圆形图标底座展示反馈，状态色集中在标题与图标。切换反馈状态，再勾选「填充整张卡片」，可以比较状态色背景与对应的 `on-*` 文字。填充卡片保留奶油外框，图标底座改用 `on-*`，图标本身保持状态色。

<DemoFrame label="状态卡片的两种配色"><StatusFeedbackDemo /></DemoFrame>

图标、标题和说明共同表达含义，`role="status"` 温和播报变化。这些文案用于演示反馈样式，不代表真实保存结果。可用组合见[状态卡片与模态遮罩](/guide/states#状态卡片与模态遮罩)。

## 完整实现

在 Vue 3.5+ 应用中导入 tokens 后，复制对应组件即可使用。

<details>
<summary>按钮状态的完整实现</summary>

<<< @/.vitepress/theme/components/examples/ButtonStatesDemo.vue

</details>

<details>
<summary>状态反馈的完整实现</summary>

`--feedback-color` 和 `--feedback-on-color` 是此组件内部的 CSS 别名，分别指向选中的状态色和前景色。

<<< @/.vitepress/theme/components/examples/StatusFeedbackDemo.vue

</details>
