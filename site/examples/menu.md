<script setup lang="ts">
import DemoFrame from '../.vitepress/theme/components/DemoFrame.vue'
import DropdownMenuDemo from '../.vitepress/theme/components/examples/DropdownMenuDemo.vue'
</script>

# Dropdown Menu · 配方操作

用 Reka UI 管理打开、关闭、键盘导航和禁用项，Petit UI 提供菜单表面、焦点和破坏性操作的颜色。

<DemoFrame label="配方操作菜单"><DropdownMenuDemo /></DemoFrame>

## 试试键盘

聚焦「配方操作」，按 Enter、Space 或向下方向键打开菜单。上下方向键在可用条目间循环，Home / End 跳到首项或末项，禁用项会被跳过。Enter 或 Space 选择条目后关闭菜单，Escape 取消并返回触发按钮。

点击菜单外部也可以关闭。创建副本和删除配方只更新下方反馈，不修改真实数据。禁用项同时提供原生组件行为、`aria-disabled` 和禁用样式。

## 高亮与破坏性操作

Reka 的 `data-highlighted` 驱动悬停和键盘高亮，`data-disabled` 排除禁用项。删除条目在中性表面上使用 `error` 文字，按住时使用 `error/on-error` 配对。状态样式见[破坏性操作与菜单](/guide/states#破坏性操作与菜单)。

菜单通过 Portal 挂载到 `body`，避开示例框的裁切，并显式消费背景、文字和字体。内容高度受可用空间限制，窄屏保留左右边距。需要局部品牌时，将覆盖类同时应用到触发区域与菜单内容，具体规则见[主题与品牌覆盖](/guide/themes#portal-teleport)。

这个示例使用 Reka 默认的模态菜单。打开期间拦截全站搜索的 `⌘K`、`Ctrl+K` 和 `/`，避免两套焦点控制同时运行。关闭后搜索快捷键恢复。

## 完整实现

在 Vue 3.5+ 应用中安装 `reka-ui`，按[快速开始](/guide/getting-started)导入 tokens，再复制组件即可使用。示例不依赖本站素材或外壳样式。

<<< @/.vitepress/theme/components/examples/DropdownMenuDemo.vue
