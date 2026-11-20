import { defineConfig } from 'vitepress'

// 部署到 GitHub Pages 的项目站点时，路径会带仓库名（如 /scatterfuture/）。
// 工作流里会自动注入 BASE_PATH，本地开发时默认是 '/'。
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '散点未来',
  description: '散点未来隐私政策与使用条款',

  base,
  cleanUrls: true,       // 生成 /privacy 而不是 /privacy.html
  lastUpdated: true,     // 显示"最后更新于"（需要 git 仓库）
  srcExclude: ['**/README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
    ['meta', { name: 'theme-color', content: '#4F7BF2' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '散点未来' }],
    ['meta', { property: 'og:description', content: '散点未来隐私政策与使用条款' }],
    ['meta', { property: 'og:image', content: `${base}logo.png` }]
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: '散点未来',

    nav: [
      { text: '首页', link: '/' },
      { text: '隐私政策', link: '/privacy', activeMatch: '/privacy' },
      { text: '使用条款', link: '/terms', activeMatch: '/terms' }
    ],

    outline: { level: [2, 3], label: '本页目录' },
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'medium' } }
  }
})
