<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'

const messages = {
  success: { icon: 'm6 12 4 4 8-8', title: '已保存', description: '水果茶配方已加入收藏。' },
  warning: {
    icon: 'M12 6v8m0 4h.01',
    title: '食材不足',
    description: '还需要一份水果，再检查一下准备清单。',
  },
  error: {
    icon: 'm7 7 10 10M17 7 7 17',
    title: '保存失败',
    description: '暂时无法保存，请稍后重试。',
  },
}
const tone = shallowRef<keyof typeof messages>('success')
const filled = shallowRef(false)
const message = computed(() => messages[tone.value])
const id = useId()
</script>

<template>
  <div class="feedback-demo">
    <div class="controls">
      <label :for="id" class="tone-label">反馈状态</label>
      <select :id="id" v-model="tone" class="tone-select">
        <option value="success">成功</option>
        <option value="warning">警告</option>
        <option value="error">错误</option>
      </select>
      <label class="fill-label"><input v-model="filled" type="checkbox" />填充整张卡片</label>
    </div>
    <div class="status-card" :class="{ filled }" :data-tone="tone" role="status" aria-atomic="true">
      <span class="symbol" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <path :d="message.icon" />
        </svg>
      </span>
      <div class="status-copy">
        <p class="status-title">{{ message.title }}</p>
        <p class="description">{{ message.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-demo {
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
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.tone-label {
  font-weight: var(--petit-font-weight-strong);
}
.tone-select {
  padding: 8px 12px;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-sm);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  font: inherit;
}
.fill-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  cursor: pointer;
}
.fill-label input {
  width: 18px;
  height: 18px;
  accent-color: var(--petit-color-focus);
}
.tone-select:focus-visible,
.fill-label input:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.status-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
}
.status-card[data-tone='success'] {
  --feedback-color: var(--petit-color-success);
  --feedback-on-color: var(--petit-color-on-success);
}
.status-card[data-tone='warning'] {
  --feedback-color: var(--petit-color-warning);
  --feedback-on-color: var(--petit-color-on-warning);
}
.status-card[data-tone='error'] {
  --feedback-color: var(--petit-color-error);
  --feedback-on-color: var(--petit-color-on-error);
}
.symbol,
.status-title {
  color: var(--feedback-color);
  font-weight: var(--petit-font-weight-display);
}
.symbol {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-border);
  line-height: 1;
}
.status-copy {
  min-width: 0;
  overflow-wrap: anywhere;
}
.status-title {
  margin: 0;
  font-size: 20px;
}
.description {
  margin: 6px 0 0;
  font-size: 14px;
}
.filled {
  background: var(--feedback-color);
  color: var(--feedback-on-color);
}
.filled .symbol {
  background: var(--feedback-on-color);
}
.filled .status-title {
  color: inherit;
}
@media (max-width: 540px) {
  .status-card {
    gap: 12px;
    padding: 16px;
  }
  .symbol {
    width: 40px;
    height: 40px;
  }
}
</style>
