<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <section class="demo-frame" :aria-label="label">
    <div class="toolbar">{{ label }}</div>
    <div class="demo-stage petit-demo not-prose"><slot /></div>
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
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 800;
  background: var(--vp-c-bg-soft);
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
    padding: 12px;
  }
}
</style>
