<script setup lang="ts">
import DialogDemo from './DialogDemo.vue'
</script>

<template>
  <div class="petit-demo theme-samples">
    <p class="sample-label">默认浅色配色</p>
    <div class="theme-sample demo-brand">
      <p class="sample-label">局部品牌覆盖</p>
      <DialogDemo branded />
      <div data-theme="light" class="theme-sample default-colors">
        <p class="sample-label">恢复默认颜色</p>
        <span class="status-dot" aria-hidden="true" /> 胶囊仍继承祖先的圆角覆盖
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-samples {
  --petit-radius-full: 20px;
  padding: 22px;
  border-radius: 24px;
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
}
.theme-sample {
  margin-top: 18px;
  padding: 20px;
  background: var(--petit-color-surface);
  border: 1px solid var(--petit-color-border-strong);
  color: var(--petit-color-foreground);
  border-radius: 16px;
}
.sample-label {
  margin: 0 0 20px;
  font-size: 13px;
  font-weight: 800;
}
.default-colors {
  font-size: 13px;
  line-height: 1.8;
}
.status-dot {
  display: inline-block;
  width: 30px;
  height: 18px;
  vertical-align: middle;
  background: var(--petit-color-primary);
  border-radius: var(--petit-radius-full);
}
@media (max-width: 480px) {
  .theme-samples,
  .theme-sample {
    padding: 14px;
  }
}
</style>
