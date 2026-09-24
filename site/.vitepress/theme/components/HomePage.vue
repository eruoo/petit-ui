<script setup lang="ts">
import { withBase } from 'vitepress'
import TeaCard from './TeaCard.vue'
import DialogDemo from './DialogDemo.vue'
</script>

<template>
  <main class="petit-home">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">A SMALL PALETTE, A WARMER WEB.</p>
        <h1>Petit UI<span>给界面一点温度。</span></h1>
        <p class="intro">
          奶油纸色、圆润轮廓与恰好的金黄。<br />一套轻巧的 CSS tokens，由你自由组合。
        </p>
        <div class="actions">
          <a class="primary" :href="withBase('/guide/getting-started')"
            >开始使用 <span aria-hidden="true">↗</span></a
          ><a class="secondary" :href="withBase('/examples/tabs')"
            >探索交互示例 <span aria-hidden="true">→</span></a
          >
        </div>
        <p class="release-note">源码预览版 · CSS 功能尚未发布至 npm</p>
      </div>
      <div class="hero-object petit-demo">
        <span class="object-index">01 / THE RECIPE COLLECTION</span>
        <div class="tea-display"><TeaCard /></div>
        <div class="object-caption"><span>Aromatic Fruit Tea</span><span>一杯果茶的灵感</span></div>
        <DialogDemo />
        <p class="object-hint">点按 Cook，体验真实交互</p>
      </div>
    </section>
    <section class="principles" aria-label="Petit UI 的边界">
      <div class="principle">
        <span class="section-index">01 — FOUNDATION</span>
        <h2>只提供 tokens</h2>
        <p>颜色、圆角、边框与排版角色。没有运行时，也不绑定框架。</p>
        <a :href="withBase('/tokens')">浏览全部变量 →</a>
      </div>
      <div class="principle">
        <span class="section-index">02 — COMPOSITION</span>
        <h2>外观由你组合</h2>
        <p>普通 CSS 或 Tailwind CSS 4，让同一套语义融入自己的界面。</p>
        <a :href="withBase('/guide/getting-started#tailwind-css-4')">选择接入方式 →</a>
      </div>
      <div class="principle">
        <span class="section-index">03 — PERSONALITY</span>
        <h2>留出改变的余地</h2>
        <p>从奶油纸色出发。覆盖变量，就能写下自己的品牌配色。</p>
        <a :href="withBase('/guide/themes')">试试主题覆盖 →</a>
      </div>
    </section>
    <section class="closing">
      <p>样式是一份配方，交互有自己的职责。</p>
      <a :href="withBase('/examples/dialog')"
        >看看如何与 Reka UI 组合 <span aria-hidden="true">↗</span></a
      >
    </section>
  </main>
</template>

<style scoped>
.petit-home {
  overflow: hidden;
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);
  max-width: 1152px;
  margin: auto;
  padding: 72px 40px 64px;
  gap: 60px;
  align-items: center;
}
.eyebrow {
  font-size: 11px;
  letter-spacing: 2.5px;
  font-weight: 800;
  margin-bottom: 24px;
}
.hero h1 {
  font-size: clamp(64px, 7vw, 96px);
  font-weight: 900;
  line-height: 1.08;
  color: var(--petit-color-foreground-heading);
  letter-spacing: -5px;
  margin: 0;
}
.hero h1 span {
  display: block;
  font-size: clamp(27px, 3vw, 36px);
  letter-spacing: -1px;
  margin-top: 20px;
  font-weight: 800;
}
.intro {
  font-size: 17px;
  line-height: 1.95;
  margin: 28px 0;
  color: var(--petit-color-foreground-muted);
}
.actions {
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: wrap;
  font-size: 15px;
  font-weight: 800;
}
.primary {
  display: inline-flex;
  gap: 32px;
  align-items: center;
  background: var(--petit-color-primary);
  color: var(--petit-color-on-primary);
  padding: 15px 24px;
  border-radius: var(--petit-radius-full);
  transition:
    transform 180ms ease,
    background 180ms ease;
}
.primary:hover {
  background: var(--petit-color-primary-hover);
  transform: translateY(-2px);
}
.secondary {
  text-decoration: underline;
  text-underline-offset: 6px;
}
.release-note {
  margin-top: 26px;
  font-size: 12px;
  color: var(--petit-color-foreground-muted);
}
.hero-object {
  position: relative;
  padding: 32px 24px 22px;
  background: var(--petit-color-surface-accent);
  border-radius: 46% 46% 28px 28px / 26% 26% 28px 28px;
  text-align: center;
  color: var(--petit-color-foreground);
  animation: arrive 600ms ease both;
}
.object-index {
  display: block;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.8px;
  margin: 16px 0 24px;
}
.tea-display {
  display: flex;
  justify-content: center;
}
.object-caption {
  margin: 20px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.object-caption span:first-child {
  font-size: 24px;
  font-weight: 900;
}
.object-caption span:last-child {
  font-size: 13px;
}
.object-hint {
  font-size: 11px;
  margin-top: 16px;
}
.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  padding: 48px 40px 60px;
  max-width: 1152px;
  margin: auto;
  border-top: 1px solid var(--vp-c-divider);
}
.section-index {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: var(--petit-color-foreground-muted);
}
.principle h2 {
  font-size: 21px;
  font-weight: 800;
  margin: 16px 0 12px;
}
.principle p {
  font-size: 14px;
  color: var(--petit-color-foreground-muted);
  line-height: 1.85;
  margin-bottom: 18px;
}
.principle a {
  color: var(--petit-color-link);
  text-decoration: underline;
  text-underline-offset: 5px;
  font-size: 13px;
  font-weight: 800;
}
.closing {
  background: var(--petit-color-surface);
  padding: 42px 24px;
  text-align: center;
}
.closing p {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 18px;
}
.closing a {
  font-size: 14px;
  text-decoration: underline;
  text-underline-offset: 5px;
}
@keyframes arrive {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 860px) {
  .hero {
    gap: 30px;
    padding: 50px 24px;
    grid-template-columns: 1fr 340px;
  }
  .hero h1 {
    font-size: 66px;
  }
  .hero h1 span {
    font-size: 27px;
  }
  .principles {
    gap: 24px;
    padding: 40px 24px;
  }
}
@media (max-width: 700px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 42px 24px;
    gap: 36px;
  }
  .hero h1 {
    font-size: 68px;
  }
  .hero-object {
    width: 100%;
    max-width: 370px;
    justify-self: center;
  }
  .principles {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .principle {
    padding-bottom: 28px;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .intro {
    font-size: 16px;
  }
  .actions {
    gap: 22px;
  }
}
</style>
