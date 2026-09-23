<script setup lang="ts">
import { shallowRef } from 'vue'
const saved = shallowRef(false)
</script>

<template>
  <button
    type="button"
    :aria-pressed="saved"
    class="rounded-petit-full bg-petit-primary px-6 py-3 text-petit-on-primary font-petit-strong hover:bg-petit-primary-hover active:bg-petit-primary-active focus-visible:outline-2 focus-visible:outline-petit-focus focus-visible:outline-offset-4"
    @click="saved = !saved"
  >
    {{ saved ? '已收藏 ✓' : '收藏这份配方' }}
  </button>
</template>
