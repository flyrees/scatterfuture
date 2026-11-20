import { defineConfig } from 'vitepress'

// 部署到 GitHub Pages 的项目站点时，路径会带仓库名（如 /app-docs/）。
// 工作流里会自动注入 BASE_PATH，本地开发时默认是 '/'。
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '帮助中心',
  description: '产品帮助文档、隐私政策与用户协议',

  base,
  cleanUrls: true,       // 生成 /privacy 而不是 /privacy.html
  lastUpdated: true,     // 显示"最后更新于"（需要 git 仓库）
  srcExclude: ['**/README.md'],

  head: [
    ['link', { rel: 'icon', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#2b6cb0' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '帮助中心',

    nav: [
      { text: '帮助中心', link: '/help/', activeMatch: '/help/' },
      { text: '隐私政策', link: '/privacy', activeMatch: '/privacy' },
      { text: '用户协议', link: '/terms', activeMatch: '/terms' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '帮助中心首页', link: '/help/' },
          { text: '建议与反馈', link: '/help/feedback' }
        ]
      },
      {
        text: '👋 会员相关',
        collapsed: false,
        items: [
          { text: '会员说明', link: '/help/membership' },
          { text: '恢复会员身份', link: '/help/restore-purchase' },
          { text: '绑定购买信息到安卓 / 鸿蒙', link: '/help/bind-purchase' }
        ]
      },
      {
        text: '🗂 常见问题',
        collapsed: false,
        items: [{ text: '常见问题汇总', link: '/help/faq' }]
      },
      {
        text: '☁️ 云同步与备份',
        collapsed: false,
        items: [
          { text: 'iCloud 云同步', link: '/help/icloud' },
          { text: '数据备份和恢复', link: '/help/backup' }
        ]
      },
      {
        text: '📚 记账功能',
        collapsed: false,
        items: [
          { text: '贷款和分期', link: '/help/loans' },
          { text: '多账本', link: '/help/accounts' },
          { text: '基础功能', link: '/help/basics' }
        ]
      },
      {
        text: '⚙️ 其他',
        collapsed: false,
        items: [{ text: '更新记录', link: '/help/changelog' }]
      },
      {
        text: '📄 法律条款',
        collapsed: false,
        items: [
          { text: '隐私政策', link: '/privacy' },
          { text: '用户协议', link: '/terms' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '切换语言',
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'medium' } }
  }
})
