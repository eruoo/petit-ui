---
outline: false
---

<script setup lang="ts">
import TokenBrowser from './.vitepress/theme/components/TokenBrowser.vue'
</script>

# Token 浏览器

查找变量、查看默认值，直接复制 CSS 名称。颜色值从 `petit-ui/tokens.css` 在构建时读取；用途说明来自内部 Token 规范，不维护第二份默认值表。

<TokenBrowser />

变量只提供值，不会自动应用背景、字体或交互样式。使用前请阅读[语义与限制](/guide/semantics)；需要改色时参见[主题与品牌覆盖](/guide/themes)。
