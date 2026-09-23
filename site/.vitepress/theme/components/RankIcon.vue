<template>
  <svg
    class="rank-icon"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"
    />
    <path d="M6 17h12" fill="none" />
  </svg>
</template>

<style scoped>
/* Original Lucide chef-hat paths; license linked from /credits. */
.rank-icon {
  display: block;
  color: color-mix(
    in srgb,
    var(--petit-color-border-selected) 45%,
    var(--petit-color-foreground-muted)
  );
  fill: var(--petit-color-border);
  stroke-width: 1.65;
}
</style>
