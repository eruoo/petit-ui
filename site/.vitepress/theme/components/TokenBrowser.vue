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
    <table v-if="rows.length" aria-label="Token 默认值">
      <thead>
        <tr>
          <th scope="col">CSS 变量 / 用途</th>
          <th scope="col">默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>
            <code>{{ row.name }}</code>
            <p class="usage">{{ row.usage }}</p>
          </td>
          <td>
            <span
              v-if="row.color"
              class="swatch"
              :style="{ background: row.value }"
              aria-hidden="true"
            />
            <code>{{ row.value }}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>没有匹配的 token，试试更短的关键词。</p>
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
  font-variant-numeric: tabular-nums;
  color: var(--petit-color-foreground-muted);
}
.token-browser table {
  display: table;
  table-layout: fixed;
  width: 100%;
  margin: 0;
}
.token-browser th:last-child {
  width: 28%;
}
.token-browser td {
  vertical-align: top;
}
.token-browser code {
  font-size: 12px;
  overflow-wrap: anywhere;
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
  margin-bottom: 8px;
}
@media (max-width: 480px) {
  .token-browser th:last-child {
    width: 36%;
  }
  .token-browser :is(th, td) {
    padding-inline: 8px;
  }
}
</style>
