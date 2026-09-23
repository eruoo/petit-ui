import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Petit UI',
  description: '有温度的 CSS design tokens。奶油纸色、圆润轮廓，自由组合。',
  appearance: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    // VitePress owns preference storage and .dark; sync before paint, outside Vue's app root.
    [
      'script',
      {},
      `(()=>{const root=document.documentElement;const sync=()=>{root.dataset.theme=root.classList.contains('dark')?'dark':'light'};sync();new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['class']})})()`,
    ],
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep license links navigable instead of embedding blocked data: document URLs.
      assetsInlineLimit: (path) => (path.endsWith('-LICENSE') ? false : undefined),
    },
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Tokens', link: '/tokens' },
      { text: '交互示例', link: '/examples/tabs', activeMatch: '/examples/' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '语义与使用边界', link: '/guide/semantics' },
          { text: '主题与品牌覆盖', link: '/guide/themes' },
          { text: 'Token 浏览器', link: '/tokens' },
        ],
      },
      {
        text: '与 Reka UI 组合',
        items: [
          { text: 'Tabs · 切换内容', link: '/examples/tabs' },
          { text: 'Dialog · 开始烹饪', link: '/examples/dialog' },
          { text: 'Checkbox · 准备食材', link: '/examples/checkbox' },
        ],
      },
      { text: '关于', items: [{ text: '设计来源与许可', link: '/credits' }] },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关内容',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换为浅色',
    darkModeSwitchTitle: '切换为深色',
    socialLinks: [{ icon: 'github', link: 'https://github.com/eruoo/petit-ui' }],
    footer: { message: 'CSS tokens，留给你自由组合。', copyright: 'Petit UI · 独立的界面风格探索' },
  },
})
