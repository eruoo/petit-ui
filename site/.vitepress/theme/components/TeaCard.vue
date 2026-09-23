<script setup lang="ts">
import tea from '../../../../docs/assets/s03/tea.png'
import RankIcon from './RankIcon.vue'
const selected = defineModel<boolean>({ default: true })
const symbols = [
  'leaf',
  'spiral',
  'sun',
  'flower',
  'spiral',
  'leaf',
  'flower',
  'sun',
  'spiral',
  'leaf',
  'flower',
]
</script>

<template>
  <button
    class="recipe-card"
    type="button"
    aria-label="选择 Aromatic Fruit Tea"
    :aria-pressed="selected"
    @click="selected = !selected"
  >
    <span class="card-shell"
      ><span class="card-surface">
        <span class="card-arc" aria-hidden="true">
          <i
            v-for="(symbol, index) in symbols"
            :key="index"
            class="arc-symbol"
            :class="`arc-${symbol}`"
            :style="{ '--angle': `${-76 + index * 15.2}deg` }"
          />
        </span>
        <span class="card-pattern" aria-hidden="true" />
        <span class="media-disc"
          ><img class="tea" :src="tea" alt="" width="104" height="104"
        /></span>
        <span class="card-rank" aria-hidden="true"><RankIcon /><RankIcon /></span> </span
    ></span>
  </button>
</template>

<style scoped>
.recipe-card,
.recipe-card * {
  box-sizing: border-box;
}
.recipe-card {
  width: 190px;
  height: 223px;
  border: var(--petit-border-width-selected) solid transparent;
  padding: 0;
  border-radius: 18px 17px 16px 18px;
  background: transparent;
  position: relative;
  appearance: none;
}
.recipe-card[aria-pressed='true'] {
  background: var(--petit-color-border-selected);
  border-color: var(--petit-color-border-selected);
}
.card-shell {
  display: block;
  width: 100%;
  height: 100%;
  border: var(--petit-border-width-frame) solid var(--petit-color-border);
  border-radius: 24px 24px 22px 22px / 28px 22px 24px 22px;
  overflow: hidden;
}
.card-surface {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--petit-color-surface-accent);
  overflow: hidden;
  border-radius: 12px 13px 14px 12px;
}
.card-surface:after {
  content: '';
  position: absolute;
  inset: 124px 0 0;
  background: var(--petit-color-surface-accent-strong);
}
.card-pattern {
  position: absolute;
  z-index: 1;
  inset: 103px 0 auto;
  height: 40px;
  background: conic-gradient(
    from 90deg,
    transparent 25%,
    color-mix(in srgb, var(--petit-color-border) 18%, transparent) 0 50%,
    transparent 0 75%,
    color-mix(in srgb, var(--petit-color-border) 18%, transparent) 0
  );
  background-size: 36px 36px;
  transform: rotate(-1deg);
}
.media-disc {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
  width: 112px;
  height: 112px;
  background: var(--petit-color-surface-accent-soft);
  border-radius: 50%;
}
.tea {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.media-disc .tea {
  width: 104px;
  height: 104px;
  position: absolute;
  left: 4px;
  top: 3px;
  object-fit: contain;
}
.card-rank {
  position: absolute;
  z-index: 3;
  bottom: 7px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0;
  color: var(--petit-color-border);
  filter: none;
}
.card-rank .rank-icon {
  width: 31px;
  height: 31px;
}
.card-arc {
  position: absolute;
  z-index: 1;
  inset: 0;
  color: color-mix(
    in srgb,
    var(--petit-color-surface-accent-strong) 85%,
    var(--petit-color-foreground)
  );
  opacity: 0.32;
  pointer-events: none;
}
.arc-symbol {
  position: absolute;
  left: 69px;
  top: 77px;
  width: 13px;
  height: 13px;
  background: currentColor;
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  transform: rotate(var(--angle)) translateY(-61px);
}
.arc-spiral {
  mask-image: url('../../../../docs/assets/s03/spiral.svg');
}
.arc-flower {
  mask-image: url('../../../../docs/assets/s03/flower.svg');
}
.arc-leaf {
  mask-image: url('../../../../docs/assets/s03/leaf.svg');
}
.arc-sun {
  mask-image: url('../../../../docs/assets/s03/sun.svg');
}

.recipe-card {
  cursor: pointer;
  flex: none;
  transition: transform 160ms ease;
}
.recipe-card:hover {
  transform: translateY(-3px);
}
.card-rank :deep(.rank-icon) {
  width: 31px;
  height: 31px;
}
.recipe-card:focus-visible {
  outline: 3px solid var(--petit-color-focus);
  outline-offset: 4px;
}
</style>
