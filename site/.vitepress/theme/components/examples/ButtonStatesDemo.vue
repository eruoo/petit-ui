<script setup lang="ts">
import { shallowRef } from 'vue'

const selected = shallowRef(true)
const result = shallowRef('水果茶已选中，可以用 Tab 查看焦点外圈。')

function toggleSelection() {
  selected.value = !selected.value
  result.value = selected.value ? '已选中水果茶。' : '已取消选择。'
}

function removeSelection() {
  selected.value = false
  result.value = '已移除选择。再次选择水果茶，就可以继续操作。'
}
</script>

<template>
  <div class="button-demo">
    <div class="actions">
      <button class="action primary" type="button" @click="result = '已触发保存操作。'">
        保存配方
      </button>
      <button class="action primary" type="button" disabled>暂不可用</button>
    </div>
    <div class="actions choices">
      <button class="action choice" type="button" :aria-pressed="selected" @click="toggleSelection">
        <span class="check" aria-hidden="true">✓</span> 水果茶
      </button>
      <button class="action danger" type="button" :disabled="!selected" @click="removeSelection">
        移除选择
      </button>
    </div>
    <p class="result" role="status">{{ result }}</p>
  </div>
</template>

<style scoped>
.button-demo {
  padding: 8px;
  background: var(--petit-color-background);
  color: var(--petit-color-foreground);
  font:
    1rem/1.6 Nunito,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.choices {
  margin-top: 24px;
}
.action {
  box-sizing: border-box;
  padding: 10px 24px;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  font: inherit;
  font-weight: var(--petit-font-weight-strong);
  cursor: pointer;
}
.action:enabled:hover {
  background: var(--petit-color-surface-hover);
}
.action:enabled:active,
.choice[aria-pressed='true'] {
  background: var(--petit-color-surface-active);
}
.choice[aria-pressed='true'] {
  border-color: var(--petit-color-border-selected);
}
.check {
  visibility: hidden;
}
.choice[aria-pressed='true'] .check {
  visibility: visible;
}
.primary {
  border-color: transparent;
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
}
.primary:enabled:hover {
  background: var(--petit-color-primary-hover);
}
.primary:enabled:active {
  background: var(--petit-color-primary-active);
}
.danger {
  color: var(--petit-color-error);
}
.danger:enabled:active {
  background: var(--petit-color-error);
  color: var(--petit-color-on-error);
}
.action:disabled {
  background: var(--petit-color-surface-hover);
  color: var(--petit-color-foreground-disabled);
  cursor: not-allowed;
}
.action:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.result {
  margin: 24px 0 0;
  color: var(--petit-color-foreground-muted);
  font-size: 14px;
}
</style>
