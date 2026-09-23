<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
</script>

<template>
  <button class="cook" type="button" :disabled="disabled">
    <span class="cook-icon" aria-hidden="true"><i class="cook-emblem" /></span>
    <span class="cook-label">Cook</span>
    <span class="cook-pattern" aria-hidden="true" />
  </button>
</template>

<style scoped>
.cook {
  width: 296px;
  height: 76px;
  border: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
  font:
    var(--petit-font-weight-strong) var(--petit-font-size-action)/1 Nunito,
    sans-serif;
  isolation: isolate;
}

.cook:hover {
  background: var(--petit-color-primary-hover);
}

.cook:active {
  background: var(--petit-color-primary-active);
}

.cook-label {
  position: absolute;
  left: 92px;
  right: 54px;
  top: 22px;
  white-space: nowrap;
  z-index: 2;
}

.cook-icon {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 51px;
  height: 51px;
  color: color-mix(
    in srgb,
    var(--petit-color-on-primary) var(--recipe-dark-mix),
    color-mix(in srgb, var(--petit-color-primary) 50%, var(--petit-color-border-selected))
  );
}

.cook-pattern {
  position: absolute;
  width: 106px;
  height: 90px;
  right: 42px;
  top: -13px;
  opacity: 0.11;
  transform: rotate(31deg);
  background: none;
  border-radius: 40px;
}

.cook:disabled {
  background: var(--petit-color-surface-hover);
  color: var(--petit-color-foreground-disabled);
}

.cook:disabled .cook-icon {
  opacity: 0.4;
}

.cook-pattern:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 25px;
  height: 25px;
  border-radius: 8px;
  background: var(--petit-color-border-selected);
  box-shadow:
    30px 0 0 var(--petit-color-border-selected),
    30px 30px 0 var(--petit-color-border-selected),
    60px 30px 0 var(--petit-color-border-selected),
    60px 60px 0 var(--petit-color-border-selected),
    90px 60px 0 var(--petit-color-border-selected);
}

.cook-icon::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-border);
}

.cook-emblem {
  position: absolute;
  inset: 0;
  display: block;
  background: currentColor;
  mask: url('../../../../docs/assets/s03/cook-emblem-mask.png') center / contain no-repeat;
}

.cook {
  max-width: 100%;
  cursor: pointer;
}
.cook:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 5px;
}
</style>
