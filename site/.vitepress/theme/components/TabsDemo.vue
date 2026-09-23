<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import TeaCard from './TeaCard.vue'
</script>

<template>
  <TabsRoot default-value="tea" class="recipe-tabs">
    <TabsList class="tabs-list" aria-label="果茶手册">
      <TabsTrigger class="tab" value="tea">果茶图鉴</TabsTrigger>
      <TabsTrigger class="tab" value="recipe">制作配方</TabsTrigger>
    </TabsList>
    <TabsContent value="tea" class="tab-panel">
      <TeaCard />
      <div class="description">
        <p class="eyebrow">THE LITTLE RECIPE BOOK</p>
        <h3 class="title">Aromatic<br />Fruit Tea</h3>
        <p class="copy">一杯果香，一段闲暇。<br />点按卡片，试试选择状态。</p>
        <span class="tag">Drink · Strength +30</span>
      </div>
    </TabsContent>
    <TabsContent value="recipe" class="tab-panel recipe-copy">
      <div>
        <p class="eyebrow">A MOMENT TO MAKE</p>
        <h3 class="title">把日常，煮得暖一点。</h3>
        <p class="copy">水果切片，加入茶叶与热水。<br />静候三分钟，即可享用。</p>
        <p class="tag">示例配方 · 交互由 Reka UI 提供</p>
      </div>
    </TabsContent>
  </TabsRoot>
</template>

<style scoped>
.recipe-tabs {
  color: var(--petit-color-foreground);
}
.tabs-list {
  display: flex;
  gap: 8px;
  padding: 6px;
  width: fit-content;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-surface);
  border: 1px solid var(--petit-color-border-strong);
}
.tab {
  padding: 10px 18px;
  border-radius: var(--petit-radius-full);
  color: var(--petit-color-foreground);
  font-weight: 800;
  font-size: 15px;
}
.tab[data-state='active'] {
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
}
.tab[data-state='active']::after {
  content: ' •';
}
.tab-panel {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 28px;
  min-height: 235px;
}
.tab-panel[data-state='inactive'] {
  display: none;
}
.title {
  margin: 10px 0 14px;
  font-size: var(--petit-font-size-heading);
  font-weight: var(--petit-font-weight-display);
  line-height: 1.15;
  color: var(--petit-color-foreground-heading);
  border: 0;
}
.eyebrow {
  font-size: 10px;
  letter-spacing: 1.8px;
  margin: 0;
  font-weight: 800;
}
.copy {
  font-size: 15px;
  line-height: 1.8;
  margin: 0 0 18px;
}
.tag {
  font-size: 13px;
  color: var(--petit-color-foreground-muted);
}
.recipe-copy {
  padding: 12px;
}
@media (max-width: 600px) {
  .tab-panel {
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
  }
  .description {
    padding: 0 8px;
  }
}
.tab:focus-visible,
.tab-panel:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 4px;
}
</style>
