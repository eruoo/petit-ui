<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import CheckboxDemo from '../.vitepress/theme/components/CheckboxDemo.vue'
</script>

# Checkbox · 准备食材

厚奶油边框负责风格，深色功能边界负责辨认。勾选状态同时使用金黄填充与勾号，不只依靠颜色。

<DemoFrame label="准备清单"><CheckboxDemo /></DemoFrame>

## 标签与键盘

点击「食材准备好了」和点击方框具有相同效果。Tab 聚焦后按 Space 切换。说明文字会随状态更新，并通过 `role="status"` 温和播报。

标签使用 `for` 与稳定 ID 关联。Reka UI 维护 `aria-checked`，样式通过 `data-state="checked"` 选择；不自行模拟原生键盘事件。

## 完整实现

在导入 tokens、安装 `reka-ui` 后，复制以下组件即可运行。它没有本站特定素材依赖。

<<< @/.vitepress/theme/components/CheckboxDemo.vue

应用需要禁用状态时，请同步设置 Reka 的 `disabled` 属性，再用 `data-disabled` 表达外观；不能只换成禁用色却仍允许点击。
