<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import FormDemo from '../.vitepress/theme/components/examples/FormDemo.vue'
</script>

# 表单 · 配方校验

用原生输入框展示正常、错误、只读和禁用状态。输入值、提示文字和功能边界分别消费对应的 tokens，校验由 Vue 管理。

<DemoFrame label="给水果茶起名"><FormDemo /></DemoFrame>

## 试试校验和键盘

留空点击「校验配方」，或离开空白名称输入框，会出现错误提示。提交失败时焦点回到名称输入框，红色边框和蓝色焦点外圈同时保留。填入非空名称后，错误消失，再提交即可看到校验结果。

Tab 可以聚焦只读编号并选择其中的文字，会跳过禁用的分享链接。点击「重置」清空名称和结果，回到初始校验状态。所有状态只保留在当前页面。

## 标签、错误与焦点

`useId()` 为每个实例生成稳定 ID。标签通过 `for` 关联输入框，提示通过 `aria-describedby` 关联；错误时设置 `aria-invalid="true"`，恢复有效状态后移除。提示和校验结果使用温和播报，不依靠边框颜色传达含义。

表单使用 `novalidate`，由示例统一显示错误文案并聚焦字段。`required` 保留必填语义。只读字段继续使用正常文字色，禁用字段通过原生 `disabled` 限制交互。颜色组合见[字段与校验](/guide/states#字段与校验)。

## 完整实现

在 Vue 3.5+ 应用中按[快速开始](/guide/getting-started)导入 tokens，复制下面的组件即可使用，无需安装 Reka UI。校验仅检查名称是否为空，不发送请求。

<<< @/.vitepress/theme/components/examples/FormDemo.vue
