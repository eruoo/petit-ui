<script setup lang="ts">
import DialogDemo from './DialogDemo.vue'
</script>

<template>
  <div class="petit-demo theme-samples" data-theme="dark">
    <p class="sample-label">深色作用域</p>
    <div data-theme="light" class="theme-sample">
      <p class="sample-label">嵌套浅色 · 品牌覆盖</p>
      <DialogDemo theme="light" branded />
      <div data-theme="dark" class="theme-sample inner-dark">
        <p class="sample-label">再次嵌套深色 · 回到默认颜色</p>
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
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
  border-radius: 16px;
}
.sample-label {
  margin: 0 0 20px;
  font-size: 13px;
  font-weight: 800;
}
.inner-dark {
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
