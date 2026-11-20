#!/usr/bin/env node
// 用法: npm run new -- <english-slug> [页面标题]
// 例:   npm run new -- export-data 数据导出
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

const slug = args[0]
const title = args.slice(1).join(' ').trim() || slug

if (!slug) {
  console.log(`
用法: npm run new -- <文件名> [页面标题]

  npm run new -- export-data 数据导出
  → 创建 docs/help/export-data.md
`)
  process.exit(1)
}

if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(`✗ 文件名只能用英文小写、数字和连字符，例如 export-data（当前: ${slug}）`)
  console.error('  中文标题放在第二个参数里。')
  process.exit(1)
}

const dir = resolve(root, 'docs/help')
mkdirSync(dir, { recursive: true })
const file = resolve(dir, `${slug}.md`)

if (existsSync(file)) {
  console.error(`✗ 文件已存在: docs/help/${slug}.md`)
  process.exit(1)
}

const body = `# ${title}

<!-- 正文从这里开始。下面几行是示例，改完删掉即可。 -->

用一两句话说明这个功能是做什么的。

## 怎么用

1. 第一步
2. 第二步
3. 第三步

::: tip 小技巧
补充说明、注意事项写在这里。
:::

## 常见问题

**问题写在这里？**

答案写在这里。
`

writeFileSync(file, body, 'utf8')

console.log(`✓ 已创建 docs/help/${slug}.md`)
console.log(`
最后一步：打开 docs/.vitepress/config.mts，在 sidebar 对应分组里加一行：

  { text: '${title}', link: '/help/${slug}' }
`)
