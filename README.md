# 微信公众号文章转 Markdown 工具

一个功能强大的 Web 应用，用于将微信公众号文章快速转换为 Markdown 格式，支持批量处理、图片下载和本地存储。

## 📋 目录

- [项目简介](#项目简介)
- [营销文案](#营销文案)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [使用指南](#使用指南)
- [API 接口](#api-接口)
- [项目结构](#项目结构)
- [核心功能说明](#核心功能说明)
- [隐私与安全](#隐私与安全)
- [常见问题](#常见问题)
- [开发说明](#开发说明)

## 🎯 项目简介

本项目是一个基于 Next.js 构建的 Web 应用，旨在帮助用户将微信公众号文章转换为 Markdown 格式。工具支持：

- ✅ 批量处理多篇文章
- ✅ 自动下载文章中的图片
- ✅ HTML 内容预览
- ✅ Markdown 格式转换
- ✅ 本地历史记录管理
- ✅ 灵活的导出选项（单独 Markdown 或完整 ZIP 包）
- ✅ 流光卡片图片导出（将 Markdown 转换为精美图片）

## 📢 营销文案

### 文案一：痛点共鸣型
**还在手动复制粘贴微信公众号文章？**
3 秒转换，一键下载，图片自动打包。告别繁琐操作，让好文章轻松归档。

👉 [立即体验](http://localhost:3000/converter)

### 文案二：价值主张型
**微信公众号 → Markdown，一步到位**
批量处理、自动下载图片、本地存储历史。知识管理者的必备工具，让收藏更高效。

👉 [免费使用](http://localhost:3000/converter)

### 文案三：场景化型
**写笔记、建知识库、做备份？**
把微信公众号文章变成标准 Markdown，支持批量导出 ZIP。隐私安全，数据不上传，完全本地处理。

👉 [开始转换](http://localhost:3000/converter)

---

> 💡 **提示**：详细的使用向导请查看 [使用向导文档](./使用向导.md)

## ✨ 功能特性

### 1. 文章获取
- 支持输入一个或多个微信公众号文章链接
- 自动提取文章标题和 HTML 内容
- 实时显示获取状态和错误信息

### 2. 内容预览
- **HTML 预览**：获取文章后可以预览原始 HTML 内容，确认无误后再转换
- **Markdown 预览**：转换后可以实时预览 Markdown 格式效果

### 3. 格式转换
- 使用 Turndown 库将 HTML 转换为 Markdown
- 保留文章结构和格式
- 自动处理图片路径，使用相对路径引用

### 4. 图片处理
- 自动识别文章中的所有图片
- 下载图片并转换为 Base64 格式
- 在 Markdown 中使用相对路径引用图片（`./images/filename.jpg`）

### 5. 文件下载
- **单独 Markdown**：下载仅包含 Markdown 文本的文件
- **完整 ZIP 包**：下载包含 Markdown 文件和所有图片的压缩包
- **批量下载**：一次性下载所有已转换的文章

### 6. 历史记录
- 自动保存获取和转换的文章记录
- 支持查看、重新加载和删除历史记录
- 最多保存 50 条记录（可配置）
- 数据存储在浏览器本地（localStorage）

### 7. 流光卡片图片导出 🆕
- **精美卡片设计**：将 Markdown 内容转换为精美的图片卡片
- **多种模板**：支持 8 种模板样式（默认、金句、书摘、便当、备忘录等）
- **智能分段**：根据内容长度和高度自动分段，长文章自动生成多张图片
- **自动打包**：多张图片自动打包为 ZIP 压缩包
- **自定义配置**：可调整宽度、高度、内边距、分辨率等参数
- **一键导出**：单张图片直接下载，多张图片自动打包

## 🛠 技术栈

### 前端框架
- **Next.js 16** - React 全栈框架
- **React 19** - UI 库
- **TypeScript** - 类型安全

### UI 组件
- **Radix UI** - 无障碍 UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 图标库

### 核心依赖
- **Cheerio** - 服务器端 HTML 解析
- **Turndown** - HTML 转 Markdown
- **JSZip** - ZIP 文件生成
- **React Markdown** - Markdown 渲染
- **Remark GFM** - GitHub Flavored Markdown 支持
- **流光卡片 API** - 将文本转换为精美图片（由 302.ai 提供）

### 其他特性
- **View Transition API** - 流畅的页面切换动画
- **next-themes** - 主题切换（亮色/暗色模式）
- **响应式设计** - 完美适配移动端和桌面端

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm（推荐）或 npm/yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd we-chat-article-to-markdown
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
```

3. **启动开发服务器**
```bash
pnpm dev
# 或
npm run dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📖 使用指南

### 基本使用流程

#### 步骤 1：输入文章链接
1. 访问 `/converter` 页面
2. 在"转换"标签页中输入微信公众号文章 URL（格式：`https://mp.weixin.qq.com/s/...`）
3. 可以点击"添加更多文章"按钮批量添加多个链接

#### 步骤 2：获取文章内容
1. 点击"获取文章内容"按钮
2. 系统会自动获取每篇文章的标题和 HTML 内容
3. 获取成功后会自动切换到"内容预览"标签页

#### 步骤 3：预览内容
1. 在"内容预览"标签页中查看文章的原始 HTML 内容
2. 确认内容正确后，点击"转换为 Markdown"按钮

#### 步骤 4：转换为 Markdown
1. 系统会自动下载文章中的所有图片
2. 将 HTML 转换为 Markdown 格式
3. 转换完成后会自动切换到"MD预览"标签页

#### 步骤 5：下载文件
1. 在"下载"标签页中选择下载选项：
   - **仅 Markdown**：下载单独的 `.md` 文件
   - **完整包（含图片）**：下载包含 Markdown 和图片的 ZIP 文件
2. 批量转换时，可以点击"下载完整压缩包"一次性下载所有文章

#### 步骤 6：导出为图片（可选）🆕
1. 在"MD预览"标签页中，点击文章卡片上的 **"导出为图片"** 按钮
2. 在配置弹窗中设置：
   - **模板类型**：选择喜欢的卡片模板（默认、金句、书摘等）
   - **标题和内容**：可以编辑标题和内容
   - **样式设置**：调整宽度、高度、内边距
   - **分辨率**：选择图片清晰度（1x/2x/3x）
3. 点击 **"导出图片"** 按钮
4. 系统会自动判断：
   - 内容较短 → 生成单张 PNG 图片并下载
   - 内容较长 → 自动分段生成多张图片并打包为 ZIP

### 历史记录功能

- 所有获取和转换的文章都会自动保存到历史记录
- 在"历史记录"标签页中可以：
  - 查看所有历史记录
  - 点击"查看"按钮重新加载文章
  - 删除单条记录或清除全部记录
  - 复制文章链接

## 🔌 API 接口

### POST `/api/fetch`

获取微信公众号文章的 HTML 内容。

**请求参数：**
```typescript
{
  url: string  // 微信公众号文章链接
}
```

**响应格式：**
```typescript
{
  title: string        // 文章标题
  htmlContent: string  // HTML 内容
  success: boolean     // 是否成功
}
```

**错误响应：**
```typescript
{
  error: string  // 错误信息
}
```

**使用示例：**
```typescript
const response = await fetch('/api/fetch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://mp.weixin.qq.com/s/...' })
})
const data = await response.json()
```

### POST `/api/convert`

将微信公众号文章转换为 Markdown 格式并下载图片。

**请求参数：**
```typescript
{
  url: string  // 微信公众号文章链接
}
```

**响应格式：**
```typescript
{
  title: string           // 文章标题
  markdown: string         // Markdown 内容
  images: ImageData[]      // 图片数据数组
  success: boolean         // 是否成功
}

interface ImageData {
  originalUrl: string  // 原始图片 URL
  filename: string     // 文件名
  data: string         // Base64 编码的图片数据
  mimeType: string     // MIME 类型（如 image/jpeg）
}
```

**错误响应：**
```typescript
{
  error: string  // 错误信息
}
```

**使用示例：**
```typescript
const response = await fetch('/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://mp.weixin.qq.com/s/...' })
})
const data = await response.json()
```

## 📁 项目结构

```
we-chat-article-to-markdown/
├── app/                          # Next.js App Router 目录
│   ├── api/                      # API 路由
│   │   ├── convert/              # 转换接口
│   │   │   └── route.ts          # POST /api/convert
│   │   └── fetch/                # 获取接口
│   │       └── route.ts          # POST /api/fetch
│   ├── converter/                # 转换器页面
│   │   └── page.tsx              # 主转换页面
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # React 组件
│   ├── ui/                       # UI 基础组件（Radix UI）
│   ├── convert-tab.tsx           # 转换标签页
│   ├── download-tab.tsx          # 下载标签页
│   ├── history-tab.tsx           # 历史记录标签页
│   ├── html-preview-tab.tsx     # HTML 预览标签页
│   ├── markdown-preview-tab.tsx  # Markdown 预览标签页
│   ├── firefly-card-config-dialog.tsx  # 流光卡片配置弹窗 🆕
│   ├── view-transition-link.tsx  # 视图过渡链接组件
│   ├── view-transition-provider.tsx  # 视图过渡提供者
│   ├── smooth-scroll-link.tsx    # 平滑滚动链接组件
│   ├── header.tsx                # 页头组件
│   ├── footer.tsx                # 页脚组件
│   └── theme-provider.tsx        # 主题提供者
├── hooks/                        # React Hooks
│   ├── use-mobile.ts             # 移动端检测 Hook
│   ├── use-toast.ts              # Toast 通知 Hook
│   └── use-view-transition-router.ts  # 视图过渡路由 Hook 🆕
├── hooks/                        # React Hooks
│   ├── use-mobile.ts             # 移动端检测 Hook
│   └── use-toast.ts              # Toast 通知 Hook
├── lib/                          # 工具库
│   ├── history-storage.ts        # 历史记录存储工具
│   └── utils.ts                  # 通用工具函数
├── public/                       # 静态资源
├── styles/                       # 样式文件
├── next.config.mjs               # Next.js 配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 项目文档
```

## 🔧 核心功能说明

### 1. 文章获取 (`/api/fetch`)

**功能：** 从微信公众号文章页面提取标题和 HTML 内容

**实现原理：**
- 使用 `fetch` 请求文章页面
- 使用 Cheerio 解析 HTML
- 提取 `#activity-name` 元素作为标题
- 提取 `#js_content` 元素作为文章内容

**关键代码：**
```typescript
const html = await response.text()
const $ = cheerio.load(html)
const title = $("#activity-name").text().trim()
const htmlContent = $("#js_content").html() || ""
```

### 2. Markdown 转换 (`/api/convert`)

**功能：** 将 HTML 转换为 Markdown 并处理图片

**实现流程：**
1. 获取文章 HTML 内容
2. 提取所有图片 URL（支持 `data-src` 和 `src` 属性）
3. 下载所有图片并转换为 Base64
4. 将图片 URL 替换为相对路径（`./images/filename.jpg`）
5. 使用 Turndown 将 HTML 转换为 Markdown

**关键代码：**
```typescript
// 提取图片
$content("img").each((_, img) => {
  const $img = $content(img)
  const dataSrc = $img.attr("data-src")
  const src = $img.attr("src")
  // ...
})

// 下载图片
const imagePromises = imageUrls.map((url) => downloadImage(url))
const images = await Promise.all(imagePromises)

// 替换图片路径
$img.attr("src", `./images/${filename}`)

// 转换为 Markdown
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
})
const markdown = turndownService.turndown($content.html())
```

### 3. 历史记录管理 (`lib/history-storage.ts`)

**功能：** 使用 localStorage 存储和管理转换历史

**主要函数：**

- `saveToHistory(article)` - 保存文章到历史记录
  - 如果文章已存在（通过 URL 判断），则更新
  - 如果不存在，则添加到列表开头
  - 最多保存 50 条记录

- `getHistory()` - 获取所有历史记录
  - 从 localStorage 读取数据
  - 返回 `HistoryArticle[]` 数组

- `removeFromHistory(id)` - 删除指定记录

- `clearHistory()` - 清除所有历史记录

**数据结构：**
```typescript
interface HistoryArticle {
  id: string
  url: string
  title?: string
  htmlContent?: string
  markdown?: string
  images?: ImageData[]
  savedAt: string  // ISO 时间字符串
}
```

### 4. 文件下载 (`components/download-tab.tsx`)

**功能：** 提供多种下载选项

**下载方式：**

1. **单独 Markdown 文件**
   - 创建 Blob 对象
   - 使用 `URL.createObjectURL` 生成下载链接
   - 文件名格式：`{title}.md`

2. **完整 ZIP 包（单篇文章）**
   - 使用 JSZip 创建压缩包
   - 添加 Markdown 文件到根目录
   - 添加所有图片到 `images/` 文件夹
   - 文件名格式：`{title}.zip`

3. **批量下载 ZIP**
   - 为每篇文章创建独立文件夹
   - 每个文件夹包含 Markdown 文件和 `images/` 文件夹
   - 文件名格式：`wechat_articles_{timestamp}.zip`

### 5. 流光卡片图片导出 🆕 (`components/markdown-preview-tab.tsx`)

**功能：** 将 Markdown 内容转换为精美的图片卡片

**实现原理：**

1. **内容分段算法**
   - 根据图片高度、宽度和内边距计算可用内容区域
   - 考虑标题和作者占用的空间（约 150px）
   - 估算每行字符数和每页行数
   - 智能按段落分割内容，确保每段不超过单页容量

2. **API 调用**
   - 使用流光卡片 API (`https://fireflycard-api.302ai.cn/api/saveImg`)
   - POST 请求，JSON 格式传递配置参数
   - 每次调用生成一张图片

3. **自动判断导出方式**
   - 如果只有一段内容 → 调用一次 API → 直接下载 PNG
   - 如果有多段内容 → 循环调用 API → 收集所有图片 → 打包为 ZIP

**配置参数：**

```typescript
{
  form: {
    title: string      // 标题
    content: string    // 内容（Markdown 格式）
    author?: string   // 作者（可选）
  },
  style: {
    width: number     // 宽度（px），默认 800
    height: number    // 高度（px），默认 1200
    padding: number   // 内边距（px），默认 40
  },
  temp: string       // 模板类型（tempA, tempC, tempJin 等）
  imgScale: number   // 分辨率（1/2/3），默认 2
}
```

**支持的模板：**
- `tempA` - 默认模板 A
- `tempC` - 默认模板 C
- `tempJin` - 金句模板
- `tempB` - 书摘模板
- `tempEasy` - 便当模板
- `tempMemo` - 备忘录模板
- `tempBlackSun` - 黑日模板
- `tempE` - 框界模板

**关键代码：**
```typescript
// 计算分段
const maxCharsPerPage = Math.floor(charsPerLine * linesPerPage * 0.8)

// 智能分段
if (segments.length === 1) {
  // 单张图片：直接下载
  const blob = await response.blob()
  downloadFile(blob, `${title}.png`)
} else {
  // 多张图片：打包为 ZIP
  const zip = new JSZip()
  for (const segment of segments) {
    const blob = await generateImage(segment)
    zip.file(`firefly_card_${index}.png`, blob)
  }
  const zipBlob = await zip.generateAsync({ type: "blob" })
  downloadFile(zipBlob, `${title}_cards.zip`)
}
```

## 🔒 隐私与安全

### 数据处理方式

- ✅ **客户端处理**：所有文章内容和转换操作均在浏览器中完成
- ✅ **无服务器存储**：不会收集、存储或上传文章内容到服务器
- ✅ **本地存储**：历史记录仅保存在浏览器的 localStorage 中

### 图片处理

- 转换过程中需要通过服务器代理获取图片（解决 CORS 问题）
- 图片不会被保存到服务器
- 下载后的图片仅存储在用户下载的 ZIP 文件中

### 注意事项

- 请遵守微信公众平台的相关使用条款和版权规定
- 仅用于个人学习和研究目的
- 请勿用于商业用途或批量爬取

## ❓ 常见问题

### Q1: 为什么获取文章失败？

**可能原因：**
- URL 格式不正确（必须是 `https://mp.weixin.qq.com/s/...` 格式）
- 文章链接已失效或需要登录
- 网络连接问题
- 微信公众号的反爬虫机制

**解决方案：**
- 确认 URL 格式正确
- 尝试在浏览器中打开链接，确认可以正常访问
- 检查网络连接
- 如果频繁失败，可能是触发了反爬虫机制，请稍后再试

### Q2: 图片下载失败怎么办？

**可能原因：**
- 图片 URL 无效或已过期
- 网络连接问题
- 图片服务器拒绝访问

**解决方案：**
- 图片下载失败不会影响 Markdown 转换，但图片路径可能无效
- 可以手动替换 Markdown 中的图片链接
- 或者使用"仅 Markdown"选项下载，然后手动添加图片

### Q3: 历史记录丢失了？

**可能原因：**
- 清除了浏览器缓存
- 使用了隐私模式/无痕模式
- 更换了浏览器或设备

**解决方案：**
- 历史记录存储在浏览器的 localStorage 中
- 清除浏览器数据会删除历史记录
- 建议定期导出重要文章

### Q4: 转换后的 Markdown 格式不正确？

**可能原因：**
- 原始 HTML 结构复杂
- Turndown 转换规则限制

**解决方案：**
- 可以在 Markdown 预览中查看效果
- 手动调整 Markdown 格式
- 或使用其他 Markdown 编辑器进一步编辑

### Q5: 支持批量转换吗？

**支持！**
- 可以添加多个文章链接
- 一次性获取所有文章
- 逐个转换为 Markdown
- 最后可以一次性下载所有文章

### Q6: 如何导出为图片？🆕

**操作步骤：**
1. 完成文章转换后，切换到"MD预览"标签页
2. 点击文章卡片上的"导出为图片"按钮
3. 在弹窗中配置卡片参数（模板、样式、尺寸等）
4. 点击"导出图片"按钮即可

**说明：**
- 系统会根据内容长度和高度自动判断生成单张或多张图片
- 内容较长时会自动分段并打包为 ZIP
- 可以调整高度来控制每张图片的内容量
- 建议使用 2x 分辨率，平衡清晰度和文件大小

**常见问题：**
- **Q: 为什么生成了多张图片？**  
  A: 当内容超过单张图片容量时，系统会自动分段。可以调整高度参数来控制分段。

- **Q: 图片清晰度如何选择？**  
  A: 1x 适合快速预览，2x 适合一般使用（推荐），3x 适合高质量输出。

- **Q: 可以自定义卡片样式吗？**  
  A: 目前支持调整宽度、高度、内边距和模板类型。更多样式定制请参考流光卡片 API 文档。

## 💻 开发说明

### 开发环境设置

1. **安装依赖**
```bash
pnpm install
```

2. **启动开发服务器**
```bash
pnpm dev
```

3. **代码检查**
```bash
pnpm lint
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 组件使用函数式组件和 Hooks
- 使用 Tailwind CSS 进行样式设计

### 主要技术点

1. **Next.js App Router**
   - 使用最新的 App Router 架构
   - API 路由位于 `app/api/` 目录

2. **服务端渲染**
   - API 路由在服务端执行
   - 使用 Cheerio 进行 HTML 解析

3. **客户端状态管理**
   - 使用 React Hooks 管理状态
   - localStorage 用于持久化存储

4. **文件处理**
   - 使用 JSZip 生成 ZIP 文件
   - Base64 编码处理图片数据

### 扩展建议

1. **功能扩展**
   - 支持更多文章平台（如知乎、CSDN 等）
   - 添加 Markdown 编辑器
   - 支持自定义转换规则
   - 添加导出为 PDF 功能
   - 支持更多流光卡片模板和样式定制

2. **性能优化**
   - 添加图片压缩功能
   - 优化批量处理性能
   - 添加进度条显示
   - 优化流光卡片生成性能

3. **用户体验**
   - 添加拖拽上传功能
   - 支持快捷键操作
   - 流光卡片预览功能
   - 批量导出图片功能

4. **已实现功能** ✅
   - View Transition API 页面切换动画
   - 亮色/暗色主题切换
   - 响应式移动端适配
   - 流光卡片图片导出

## 📝 更新日志

### v0.2.0 (最新版本) 🆕
- ✨ **新增功能**：流光卡片图片导出
  - 支持将 Markdown 内容转换为精美图片卡片
  - 8 种模板样式可选
  - 智能分段，自动处理长文章
  - 可自定义尺寸、样式、分辨率
- ✨ **UI 优化**：蓝色系主题设计
  - 专业的蓝色系配色方案
  - 极简主义设计风格
  - 完善的亮色/暗色模式支持
- ✨ **交互优化**：流畅的页面切换动画
  - 使用 View Transition API 实现平滑过渡
  - 前进/后退导航动画
  - 导航栏固定，不参与动画
- 🎨 **样式优化**：响应式设计改进
  - 移动端导航栏优化
  - 英雄区域设计优化
  - 整体间距和留白优化

### v0.1.0
- ✅ 基础功能实现
- ✅ 文章获取和转换
- ✅ 图片下载和处理
- ✅ 历史记录管理
- ✅ 文件下载功能

## 📄 许可证

本项目仅供学习和研究使用。请遵守相关平台的使用条款和版权规定。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意：** 本项目仅用于个人学习和研究目的，请勿用于商业用途或批量爬取。使用本工具时，请遵守相关平台的使用条款和版权规定。

