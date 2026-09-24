<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import TabsDemo from '../.vitepress/theme/components/TabsDemo.vue'
</script>

# Tabs · 切换内容

用 Reka UI 管理选项卡的状态与键盘行为，用 Petit UI 组织奶油阅读面、金黄选择与茶杯卡片。它是一份可修改的消费示例，不是公共组件 API。

<DemoFrame label="果茶手册"><TabsDemo /></DemoFrame>

## 试试键盘

Tab 聚焦选项卡后，用左右方向键切换，Home / End 跳到首项或末项。激活的标签有 `aria-selected` 和一个可见圆点；茶杯卡片是独立原生按钮，用 `aria-pressed` 表达选择，并在选中时显示勾选标记。

Reka 的 `data-state="active"` 驱动背景样式。焦点轮廓仍独立保留，选择不会替代键盘焦点。

## 组合方式

在 Vue 3.5+ 应用中安装 `reka-ui`，并先按[快速开始](/guide/getting-started)导入 tokens：

```sh
pnpm add reka-ui
```

下面是正在运行的 Tabs 组件。`TeaCard` 是本站的配方展示组件，可替换为你自己的内容。

<<< @/.vitepress/theme/components/TabsDemo.vue

<details>
<summary>茶杯卡片的完整实现与依赖</summary>

复制时同时保留 `RankIcon.vue` 和相对路径指向的素材，或改为你的资源路径。卡片样式由 S03 配方适配，图片与图标来源见[设计来源与许可](/credits)。

<<< @/.vitepress/theme/components/TeaCard.vue

<<< @/.vitepress/theme/components/RankIcon.vue

</details>

图标只作装饰，图片保留比例；可访问名称由按钮提供。窄屏下卡片与说明纵向排列，不缩小文档字号来挤进固定宽度。
