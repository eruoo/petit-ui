<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'

const result = shallowRef('打开菜单，试试方向键和 Escape。')

function containSearchShortcut(event: KeyboardEvent) {
  const commandSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
  if (commandSearch || event.key === '/') {
    // The modal menu and VitePress search cannot own focus at the same time.
    event.stopPropagation()
    if (commandSearch) event.preventDefault()
  }
}
</script>

<template>
  <div class="menu-demo">
    <DropdownMenuRoot>
      <DropdownMenuTrigger class="menu-trigger">
        配方操作
        <span class="menu-toggle-icon" aria-hidden="true">
          <svg
            class="menu-chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          class="menu-content"
          :side-offset="8"
          :collision-padding="16"
          align="start"
          loop
          @keydown="containSearchShortcut"
        >
          <DropdownMenuLabel class="menu-label">水果茶 · TEA-01</DropdownMenuLabel>
          <DropdownMenuItem class="menu-item" @select="result = '已触发创建副本操作。'">
            创建副本
          </DropdownMenuItem>
          <DropdownMenuItem class="menu-item" disabled>分享配方（暂不可用）</DropdownMenuItem>
          <DropdownMenuSeparator class="menu-separator" />
          <DropdownMenuItem
            class="menu-item danger"
            @select="result = '已演示删除操作，原配方仍保留。'"
          >
            删除配方
          </DropdownMenuItem>
          <DropdownMenuItem class="menu-item danger" disabled>删除锁定配方</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
    <p class="result" role="status">{{ result }}</p>
  </div>
</template>

<style scoped>
.menu-demo {
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
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 8px 10px 8px 24px;
  border: 0;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-foreground-heading);
  color: var(--petit-color-border);
  font: inherit;
  font-weight: var(--petit-font-weight-strong);
  cursor: pointer;
}
.menu-trigger:hover {
  background: var(--petit-color-foreground);
}
.menu-toggle-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: var(--petit-radius-full);
  background: var(--petit-color-border);
  color: var(--petit-color-foreground-heading);
}
.menu-chevron {
  display: block;
  flex: none;
}
.menu-trigger:active,
.menu-trigger[data-state='open'] {
  background: var(--petit-color-border-strong);
}
.menu-trigger:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
/* Reka puts the scope attribute on the Popper wrapper, outside the content. */
:deep(.menu-content) {
  box-sizing: border-box;
  z-index: 100;
  width: min(280px, calc(100vw - 32px));
  max-height: var(--reka-dropdown-menu-content-available-height);
  overflow-y: auto;
  padding: 12px;
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
.menu-label {
  margin: -12px -12px 12px;
  padding: 12px 16px;
  border-radius: calc(var(--petit-radius-lg) - var(--petit-border-width-frame))
    calc(var(--petit-radius-lg) - var(--petit-border-width-frame)) 0 0;
  background: var(--petit-color-surface-band);
  color: var(--petit-color-foreground-heading);
  font-size: 14px;
  font-weight: var(--petit-font-weight-strong);
}
.menu-item {
  margin: 4px 0;
  padding: 10px 12px;
  border-radius: var(--petit-radius-sm);
  background: var(--petit-color-surface);
  color: var(--petit-color-foreground);
  cursor: pointer;
}
.menu-item:not([data-disabled])[data-highlighted] {
  background: var(--petit-color-surface-hover);
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 3px;
}
.menu-item:not([data-disabled]):active {
  background: var(--petit-color-surface-active);
}
.danger {
  color: var(--petit-color-error);
}
.menu-item.danger:not([data-disabled]):active {
  background: var(--petit-color-error);
  color: var(--petit-color-on-error);
}
.menu-item[data-disabled] {
  color: var(--petit-color-foreground-disabled);
  cursor: not-allowed;
}
.menu-separator {
  height: 2px;
  margin: 12px 0;
  background: var(--petit-color-surface-band);
}
.result {
  margin: 24px 0 0;
  color: var(--petit-color-foreground-muted);
  font-size: 14px;
}
</style>
