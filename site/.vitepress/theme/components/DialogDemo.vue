<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import CookButton from './CookButton.vue'
import tea from '../../../../docs/assets/s03/tea.png'
defineProps<{ branded?: boolean }>()

function containSearchShortcut(event: KeyboardEvent) {
  const commandSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
  if (commandSearch || event.key === '/') {
    // VitePress search has a separate focus trap that cannot coexist with this modal.
    event.stopPropagation()
    if (commandSearch) event.preventDefault()
  }
}
</script>

<template>
  <div :class="{ 'demo-brand': branded }" class="dialog-demo">
    <DialogRoot>
      <DialogTrigger as-child><CookButton /></DialogTrigger>
      <DialogPortal>
        <!-- Portal changes DOM ancestry. Repeat the brand on both siblings. -->
        <DialogOverlay class="dialog-overlay" :class="{ 'demo-brand': branded }" />
        <DialogContent
          class="petit-dialog"
          :class="{ 'demo-brand': branded }"
          @keydown="containSearchShortcut"
        >
          <img class="dialog-tea" :src="tea" width="112" height="112" alt="一杯芳香果茶" />
          <DialogTitle class="dialog-title">A little cup of joy.</DialogTitle>
          <DialogDescription class="dialog-description"
            >果茶已经准备好了。这是一次本地交互示例，不会提交订单或保存数据。</DialogDescription
          >
          <DialogClose class="dialog-confirm">享用果茶</DialogClose>
          <DialogClose class="dialog-cancel">再等一会儿</DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped>
.petit-dialog,
.petit-dialog * {
  box-sizing: border-box;
}
.dialog-demo {
  text-align: center;
}
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--petit-color-scrim);
  animation: fade-in 160ms ease;
}
.petit-dialog {
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, calc(100vw - 40px));
  max-height: calc(100dvh - 40px);
  overflow: auto;
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: 32px;
  padding: 28px;
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  text-align: center;
  font-family: Nunito, system-ui, sans-serif;
  animation: fade-in 160ms ease;
}
.dialog-tea {
  display: block;
  margin: 0 auto 20px;
  object-fit: contain;
  background: var(--petit-color-surface-accent-soft);
  border-radius: 50%;
}
.dialog-title {
  font-size: var(--petit-font-size-heading);
  font-weight: var(--petit-font-weight-display);
  color: var(--petit-color-foreground-heading);
  line-height: 1.2;
}
.dialog-description {
  margin: 18px 0 24px;
  font-size: 15px;
  line-height: 1.8;
}
.dialog-confirm {
  display: block;
  width: 100%;
  border-radius: var(--petit-radius-full);
  padding: 14px;
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
  font-weight: 800;
  cursor: pointer;
}
.dialog-confirm:hover {
  background: var(--petit-color-primary-hover);
}
.dialog-confirm:active {
  background: var(--petit-color-primary-active);
}
.dialog-cancel {
  margin-top: 12px;
  padding: 10px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.petit-dialog :focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 4px;
}
</style>
