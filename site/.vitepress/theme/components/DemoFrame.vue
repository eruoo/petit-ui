<script setup lang="ts">
import { shallowRef, useId } from 'vue'
const props = withDefaults(defineProps<{ label: string; initialTheme?: 'light' | 'dark' }>(), {
  initialTheme: 'light',
})
const theme = shallowRef(props.initialTheme)
const id = useId()
</script>

<template>
  <section class="demo-frame" :aria-label="label">
    <div class="toolbar">
      <span>{{ label }}</span>
      <label :for="id">局部主题</label>
      <select :id="id" v-model="theme">
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
    </div>
    <div class="demo-stage petit-demo not-prose" :data-theme="theme"><slot :theme="theme" /></div>
  </section>
</template>

<style scoped>
.demo-frame {
  margin: 28px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  overflow: hidden;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  font-size: 13px;
  background: var(--vp-c-bg-soft);
}
.toolbar > span {
  margin-right: auto;
  font-weight: 800;
}
.toolbar select {
  border: 1px solid var(--petit-color-border-strong);
  border-radius: 8px;
  padding: 3px 8px;
  background: var(--vp-c-bg);
}
.demo-stage {
  padding: 32px;
  background: var(--petit-color-background);
}
@media (max-width: 480px) {
  .demo-stage {
    padding: 24px 16px;
  }
  .toolbar {
    gap: 8px;
    padding: 12px;
  }
}
</style>
