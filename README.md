# App 帮助中心 / 协议站点

用 [VitePress](https://vitepress.dev) 搭建的静态文档站，适合放：

- 应用帮助中心（功能说明、FAQ、排查步骤）
- 隐私政策、用户协议（应用商店审核需要的可访问链接）

所有内容都是 Markdown 文件，构建后是一堆纯静态 HTML，可以直接扔到 GitHub Pages、Cloudflare Pages、Vercel 等任意静态托管。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 docs/.vitepress/dist
npm run preview  # 预览构建结果
```

## 目录结构

```
docs/
├── .vitepress/config.mts    # 站点配置：标题、导航、侧边栏、搜索
├── public/                  # 静态资源（logo.svg、图片、CNAME）
├── index.md                 # 首页
├── privacy.md               # 隐私政策
├── terms.md                 # 用户协议
└── help/                    # 帮助中心各页面
    ├── index.md
    ├── faq.md
    ├── membership.md
    └── ...
.github/workflows/deploy.yml # 推送 main 自动部署到 Pages
```

## 日常维护

### 改一篇已有的文章

直接编辑 `docs/help/xxx.md` 里的文字，保存后 `npm run dev` 的页面会立刻刷新。改完 push 就上线了。

### 加一篇新文章

```bash
npm run new -- export-data 数据导出
```

会生成 `docs/help/export-data.md`，并提示你往 `docs/.vitepress/config.mts` 的 `sidebar` 里加一行：

```ts
{ text: '数据导出', link: '/help/export-data' }
```

不加这一行的话页面能访问，但左侧目录里看不到入口。

### 加一整个新分组

在 `sidebar` 数组里追加一个对象：

```ts
{
  text: '📤 数据管理',
  collapsed: false,
  items: [
    { text: '数据导出', link: '/help/export-data' },
    { text: '数据删除', link: '/help/delete-data' }
  ]
}
```

### 加图片

放进 `docs/public/images/`，正文里用绝对路径引用：

```md
![截图](/images/export.png)
```

### 改站点标题 / 导航

`docs/.vitepress/config.mts` 顶部的 `title`、`description`、`nav`。

## 换配色 / 样式

样式全部在 `docs/.vitepress/theme/custom.css`，目前是照着 `flyrees.github.io`（Hexo NexT · Pisces）调的一套：

| 元素 | 值 |
| --- | --- |
| 页面底色 | `#f5f7f9` 浅冷灰 |
| 内容卡片 | 纯白，圆角 12px，柔和投影 |
| 主色 | `#fc6423` 橙（正文链接用 `#c0480f`，保证白底对比度） |
| 正文 | `#555`，行高 1.95 |
| 字体 | Lato（拉丁）+ PingFang SC |

改主题色只要换 `:root` 里的 `--vp-c-brand-*` 三个变量；换底色改 `--vp-c-bg` 和 `--vp-c-bg-elv`。深色模式在 `.dark` 块里，单独一套值。

字体用的是 `@fontsource/lato` 本地打包，不依赖 Google Fonts（国内访问不了），所以构建产物里自带 woff2 文件。

## 改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 站点标题、描述 | `docs/.vitepress/config.mts` 里的 `title` / `description` |
| 顶部导航 | `config.mts` 的 `nav` |
| 左侧目录 | `config.mts` 的 `sidebar` |
| 某个页面的正文 | `docs/help/xxx.md`，直接用 Markdown 写 |
| 新增一个页面 | 在 `docs/help/` 下新建 `.md`，再到 `sidebar` 里加一行 `{ text: '标题', link: '/help/文件名' }` |
| Logo / 图标 | 替换 `docs/public/logo.svg` |

Markdown 里可以用 VitePress 的提示块：

```md
::: tip 小技巧
内容
:::

::: warning 注意
内容
:::

::: danger 危险操作
内容
:::
```

## 发到 GitHub Pages

### 1. 建仓库并推送

```bash
cd app-docs
git init
git add .
git commit -m "init docs site"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

仓库名建议用 `app-docs`（会出现在网址里：`https://<用户名>.github.io/app-docs/`）。

### 2. 开启 Pages

仓库 → **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

推送后 Actions 会自动构建部署，几十秒后网址生效：

```
https://<用户名>.github.io/<仓库名>/
```

以后每次 `git push` 都会自动重新部署，不需要手动构建。

### 3. 绑定自定义域名（可选）

想要 `help.你的域名.com` 这种地址：

1. 在域名服务商加一条 CNAME：`help` → `<你的用户名>.github.io`
2. 仓库 → Settings → Pages → Custom domain 填入 `help.你的域名.com`，勾选 Enforce HTTPS
3. 仓库 → Settings → Secrets and variables → Actions → **Variables** → 新建 `BASE_PATH`，值填 `/`

   这一步很关键：默认站点在子路径下（`/仓库名/`），绑了独立域名后路径变成根目录 `/`，不改会导致样式和图片 404。

## 上架前要做的三件事

1. **替换占位符**：`privacy.md` / `terms.md` 里所有 `【】` 都是占位符（公司名、邮箱、地址、SDK 列表），必须换成真实信息。
2. **核对数据项**：隐私政策必须和应用实际收集的信息、集成的第三方 SDK 一致，否则会被审核驳回或后续被投诉。
3. **找律师过一遍**：这两份是通用模板，不构成法律意见。

## 常见问题

**构建报 dead link？**

侧边栏或正文里写了指向不存在文件的链接。检查路径拼写，或以 `/help/xxx`（不带 `.html`）的格式书写。

**部署后页面样式丢失 / 图片 404？**

`BASE_PATH` 不对。项目站点要用 `/仓库名/`，自定义域名要用 `/`。

**想换成 Docsify / Docusaurus？**

内容都是 Markdown，换框架只需要重写侧边栏配置，正文可直接复用。
