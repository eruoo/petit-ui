<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
const packed = shallowRef(false)
const id = useId()
</script>

<template>
  <div class="checklist">
    <p class="heading">Before we cook</p>
    <div class="check-row">
      <CheckboxRoot :id="id" v-model="packed" class="checkbox">
        <CheckboxIndicator class="indicator">✓</CheckboxIndicator>
      </CheckboxRoot>
      <label :for="id" class="label">食材准备好了</label>
    </div>
    <p class="status" role="status">
      {{ packed ? '准备就绪，可以开始烹饪。' : '备好水果、茶叶和一杯热水。' }}
    </p>
  </div>
</template>

<style scoped>
.checklist {
  color: var(--petit-color-foreground);
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
  background: var(--petit-color-surface);
  padding: 24px;
}
.heading {
  font-size: 24px;
  font-weight: var(--petit-font-weight-display);
  color: var(--petit-color-foreground-heading);
  margin: 0 0 24px;
}
.check-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.checkbox {
  width: 28px;
  height: 28px;
  flex: none;
  display: grid;
  place-items: center;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: 8px;
  background: var(--petit-color-surface);
}
.checkbox[data-state='checked'] {
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
}
.indicator {
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
}
.label {
  cursor: pointer;
  font-size: 16px;
  padding: 8px 0;
}
.status {
  font-size: 14px;
  line-height: 1.7;
  color: var(--petit-color-foreground-muted);
  margin: 18px 0 0;
}
.checkbox:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 4px;
}
</style>
