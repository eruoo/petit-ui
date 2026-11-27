<script setup lang="ts">
import { withBase } from 'vitepress'
import TeaCard from './TeaCard.vue'
import DialogDemo from './DialogDemo.vue'
</script>

<template>
  <main class="petit-home">
    <section class="hero">
      <div class="hero-copy">
        <h1>Petit UI</h1>
        <p class="intro">一套以奶油纸色、圆润轮廓和金黄为特色的 CSS design tokens。</p>
        <div class="actions">
          <a class="primary" :href="withBase('/guide/getting-started')"
            >开始使用 <span aria-hidden="true">→</span></a
          ><a class="secondary" :href="withBase('/examples/tabs')"
            >探索交互示例 <span aria-hidden="true">→</span></a
          >
        </div>
        <p class="release-note">0.x 早期 API · CSS tokens 已发布至 npm</p>
      </div>
      <div class="hero-object petit-demo">
        <div class="tea-display"><TeaCard /></div>
        <p class="object-caption">Aromatic Fruit Tea</p>
        <DialogDemo />
      </div>
    </section>
    <section class="principles" aria-label="Petit UI 的边界">
      <div class="principle">
        <h2>CSS 变量</h2>
        <p>颜色、圆角、边框与排版角色。没有运行时，也不绑定框架。</p>
        <a :href="withBase('/tokens')">浏览全部变量 →</a>
      </div>
      <div class="principle">
        <h2>接入方式</h2>
        <p>使用普通 CSS 变量，或通过 Tailwind CSS 4 工具类应用相同的样式。</p>
        <a :href="withBase('/guide/getting-started#tailwind-css-4')">选择接入方式 →</a>
      </div>
      <div class="principle">
        <h2>主题覆盖</h2>
        <p>局部覆盖品牌配色，也可以在其中恢复默认颜色。</p>
        <a :href="withBase('/guide/themes')">试试主题覆盖 →</a>
      </div>
    </section>
    <section class="closing">
      <a :href="withBase('/examples/dialog')"
        >查看 Reka UI 组合示例 <span aria-hidden="true">→</span></a
      >
    </section>
  </main>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);
  max-width: 1152px;
  margin: auto;
  padding: 72px 40px 64px;
  gap: 60px;
  align-items: center;
}
.hero h1 {
  font-size: clamp(64px, 7vw, 96px);
  font-weight: 900;
  line-height: 1.08;
  color: var(--petit-color-foreground-heading);
  letter-spacing: -5px;
  margin: 0;
}
.intro {
  max-width: 32ch;
  font-size: 16px;
  line-height: 1.8;
  margin: 24px 0;
  color: var(--petit-color-foreground-muted);
}
.actions {
  display: flex;
  align-items: center;
  gap: 24px;
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
  padding: 16px 24px;
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
  margin-top: 24px;
  font-size: 12px;
  color: var(--petit-color-foreground-muted);
}
.hero-object {
  padding: 64px 24px 32px;
  background: var(--petit-color-surface-accent);
  border-radius: 46% 46% 28px 28px / 26% 26% 28px 28px;
  text-align: center;
  color: var(--petit-color-foreground);
  animation: arrive 600ms ease both;
}
.tea-display {
  display: flex;
  justify-content: center;
}
.object-caption {
  margin: 20px 0 24px;
  font-size: 24px;
  font-weight: 900;
  line-height: 1.2;
}
.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  padding: 0 40px 60px;
  max-width: 1152px;
  margin: auto;
}
.principle {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.principle h2 {
  font-size: 21px;
  font-weight: 800;
  margin: 0 0 12px;
}
.principle p {
  font-size: 14px;
  color: var(--petit-color-foreground-muted);
  line-height: 1.85;
  margin-bottom: 16px;
}
.principle a {
  margin-top: auto;
  color: var(--petit-color-link);
  text-decoration: underline;
  text-underline-offset: 5px;
  font-size: 13px;
  font-weight: 800;
}
.closing {
  background: var(--petit-color-surface);
  padding: 24px;
  text-align: center;
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
    gap: 32px;
    padding: 48px 24px;
    grid-template-columns: minmax(0, 1fr) 340px;
  }
  .hero h1 {
    font-size: 66px;
  }
  .principles {
    gap: 24px;
    padding: 0 24px 40px;
  }
}
@media (max-width: 700px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    padding: 40px 24px;
    gap: 36px;
  }
  .hero h1 {
    font-size: 68px;
  }
  .hero-object {
    width: 100%;
    max-width: 370px;
    justify-self: center;
    padding-inline: 16px;
  }
  .principles {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .actions {
    gap: 16px 24px;
  }
}
</style>
