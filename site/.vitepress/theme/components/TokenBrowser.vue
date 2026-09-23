<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { data } from '../../tokens.data'
const query = shallowRef('')
const rows = computed(() =>
  data.filter((row) =>
    `${row.name} ${row.usage}`.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <div class="token-browser">
    <label class="filter-label" for="token-filter">查找名称或用途</label>
    <input
      id="token-filter"
      v-model="query"
      class="filter"
      type="search"
      placeholder="例如 surface、边框、标题"
    />
    <p class="count" role="status">
      {{ rows.length }} / {{ data.length }} 个 tokens · 默认值来自当前 CSS
    </p>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Token 默认值表，可横向滚动">
      <table>
        <thead>
          <tr>
            <th>CSS 变量 / 用途</th>
            <th>浅色</th>
            <th>深色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
              <p class="usage">{{ row.usage }}</p>
            </td>
            <td>
              <span v-if="row.color" class="swatch" :style="{ background: row.light }" /><code>{{
                row.light
              }}</code>
            </td>
            <td>
              <span v-if="row.color" class="swatch" :style="{ background: row.dark }" /><code>{{
                row.dark
              }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="!rows.length">没有匹配的 token，试试更短的关键词。</p>
  </div>
</template>

<style scoped>
.filter-label {
  display: block;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
}
.filter {
  width: 100%;
  padding: 12px 16px;
  background: var(--petit-color-surface);
  border: 1px solid var(--petit-color-border-strong);
  border-radius: var(--petit-radius-sm);
}
.count {
  font-size: 13px;
  color: var(--petit-color-foreground-muted);
}
.table-scroll {
  overflow-x: auto;
}
.table-scroll table {
  display: table;
  width: 100%;
  margin: 0;
}
.table-scroll td {
  vertical-align: top;
}
.table-scroll td:first-child {
  min-width: 300px;
}
.table-scroll td:not(:first-child) {
  min-width: 108px;
}
.table-scroll code {
  font-size: 12px;
  white-space: nowrap;
  padding: 0;
  background: transparent;
}
.usage {
  font-size: 13px;
  line-height: 1.6;
  margin: 8px 0 0;
}
.swatch {
  display: block;
  width: 36px;
  height: 26px;
  border-radius: 7px;
  border: 1px solid var(--vp-c-divider);
  margin: 3px 0 9px;
}
</style>
