<script setup lang="ts">
import DialogDemo from './DialogDemo.vue'
</script>

<template>
  <div class="petit-demo demo-brand theme-samples">
    <fieldset class="theme-sample">
      <legend>局部品牌覆盖</legend>
      <DialogDemo branded />
    </fieldset>
    <fieldset class="theme-sample" data-theme="light">
      <legend>恢复默认颜色</legend>
      <DialogDemo />
    </fieldset>
  </div>
</template>

<style scoped>
.theme-samples {
  --petit-radius-full: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 248px), 1fr));
  gap: 24px;
  padding: 24px;
  border-radius: var(--petit-radius-lg);
  background: var(--petit-color-surface-hover);
}
.theme-sample {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.theme-sample legend {
  margin: 0 auto 12px;
  padding: 0;
  color: var(--petit-color-foreground);
  font-size: 14px;
  font-weight: 800;
}
@media (max-width: 480px) {
  .theme-samples {
    padding: 16px;
  }
}
</style>
