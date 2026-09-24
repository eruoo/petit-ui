<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, useTemplateRef } from 'vue'

const id = useId()
const nameInput = useTemplateRef<HTMLInputElement>('nameInput')
const recipeName = shallowRef('')
const validated = shallowRef(false)
const result = shallowRef('')
const error = computed(() =>
  validated.value && !recipeName.value.trim() ? '请填写配方名称。' : '',
)

async function submit() {
  validated.value = true
  result.value = ''
  if (error.value) {
    await nextTick()
    nameInput.value?.focus()
    return
  }
  result.value = `校验通过：${recipeName.value.trim()}。`
}

function reset() {
  recipeName.value = ''
  validated.value = false
  result.value = ''
  nameInput.value?.focus()
}
</script>

<template>
  <form class="recipe-form" novalidate @submit.prevent="submit">
    <p class="heading">给这杯茶起个名字</p>
    <div class="field-group">
      <label :for="`${id}-name`" class="label">配方名称（必填）</label>
      <input
        :id="`${id}-name`"
        ref="nameInput"
        v-model="recipeName"
        class="field"
        name="recipe-name"
        placeholder="例如：柚子水果茶"
        required
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="`${id}-name-message`"
        @blur="validated = true"
        @input="result = ''"
      />
      <p
        :id="`${id}-name-message`"
        class="field-message"
        :class="{ 'field-error': error }"
        aria-live="polite"
      >
        {{ error || '输入名称后，点击下方按钮检查。' }}
      </p>
    </div>
    <div class="field-grid">
      <div class="field-group">
        <label :for="`${id}-number`" class="label">配方编号（只读）</label>
        <input :id="`${id}-number`" class="field" value="TEA-01" readonly />
      </div>
      <div class="field-group">
        <label :for="`${id}-share`" class="label">分享链接（暂不可用）</label>
        <input :id="`${id}-share`" class="field" placeholder="保存后生成" disabled />
      </div>
    </div>
    <div class="actions">
      <button class="action primary" type="submit">校验配方</button>
      <button class="action" type="button" @click="reset">重置</button>
    </div>
    <p class="result" role="status">{{ result }}</p>
  </form>
</template>

<style scoped>
.recipe-form,
.recipe-form * {
  box-sizing: border-box;
}
.recipe-form {
  padding: 24px;
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: var(--petit-radius-lg);
  background: var(--petit-color-surface);
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
.heading {
  margin: -24px -24px 24px;
  padding: 16px 24px;
  border-radius: calc(var(--petit-radius-lg) - var(--petit-border-width-frame))
    calc(var(--petit-radius-lg) - var(--petit-border-width-frame)) 0 0;
  background: var(--petit-color-surface-band);
  color: var(--petit-color-foreground-heading);
  font-size: 22px;
  font-weight: var(--petit-font-weight-display);
}
.field-group {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.label {
  font-size: 14px;
  font-weight: var(--petit-font-weight-strong);
}
.field,
.action {
  min-width: 0;
  padding: 10px 14px;
  border: 2px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-sm);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  font: inherit;
}
.field {
  width: 100%;
}
.field::placeholder {
  color: var(--petit-color-foreground-muted);
  opacity: 1;
}
.field:enabled:not([readonly]):hover,
.action:enabled:hover {
  background: var(--petit-color-surface-hover);
}
.action:enabled:active {
  background: var(--petit-color-surface-active);
}
.field[aria-invalid='true'] {
  border-color: var(--petit-color-error);
}
.field-message {
  margin: 0;
  font-size: 14px;
  color: var(--petit-color-foreground-muted);
}
.field-error {
  color: var(--petit-color-error);
}
.field:disabled,
.field:disabled::placeholder {
  color: var(--petit-color-foreground-disabled);
}
.field:disabled {
  background: var(--petit-color-surface-hover);
  cursor: not-allowed;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}
.action {
  padding-inline: 24px;
  border-radius: var(--petit-radius-full);
  cursor: pointer;
  font-weight: var(--petit-font-weight-strong);
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
.field:focus-visible,
.action:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.result {
  min-height: 1.6em;
  margin: 16px 0 0;
  color: var(--petit-color-success);
  overflow-wrap: anywhere;
}
@media (max-width: 540px) {
  .recipe-form {
    padding: 20px 16px;
  }
  .heading {
    margin: -20px -16px 20px;
    padding: 16px;
  }
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
