"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Package } from "lucide-react"
import { ImageIcon } from "lucide-react"
import JSZip from "jszip"
import { useToast } from "@/hooks/use-toast"

interface ImageData {
  originalUrl: string
  filename: string
  data: string
  mimeType: string
}

interface Article {
  id: string
  title?: string
  markdown?: string
  url: string
  images?: ImageData[]
}

interface DownloadTabProps {
  articles: Article[]
}

export function DownloadTab({ articles }: DownloadTabProps) {
  const { toast } = useToast()

  const downloadMarkdown = (article: Article) => {
    if (!article.markdown) return

    const blob = new Blob([article.markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${article.title || "article"}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "下载成功",
      description: `已下载 ${article.title || "文章"}.md`,
    })
  }

  const downloadWithImages = async (article: Article) => {
    if (!article.markdown) return

    toast({
      title: "正在打包",
      description: "正在打包文章和图片...",
    })

    const zip = new JSZip()

    zip.file(`${article.title || "article"}.md`, article.markdown)

    if (article.images && article.images.length > 0) {
      const imagesFolder = zip.folder("images")
      if (imagesFolder) {
        article.images.forEach((image) => {
          imagesFolder.file(image.filename, image.data, { base64: true })
        })
      }
    }

    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = `${article.title || "article"}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "下载成功",
      description: `已下载完整包 ${article.title || "文章"}.zip`,
    })
  }

  const downloadAllAsZip = async () => {
    toast({
      title: "正在打包",
      description: "正在打包所有文章和图片...",
    })

    const zip = new JSZip()

    for (const article of articles) {
      if (!article.markdown) continue

      const articleFolder = zip.folder(article.title || `article_${article.id}`)
      if (!articleFolder) continue

      articleFolder.file(`${article.title || "article"}.md`, article.markdown)

      if (article.images && article.images.length > 0) {
        const imagesFolder = articleFolder.folder("images")
        if (imagesFolder) {
          article.images.forEach((image) => {
            imagesFolder.file(image.filename, image.data, { base64: true })
          })
        }
      }
    }

    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = `wechat_articles_${Date.now()}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "下载成功",
      description: "已下载所有文章完整包",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">下载文件</h2>
        <p className="text-muted-foreground">将转换后的内容保存为 Markdown 文件</p>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-1">{article.title || "未命名文章"}</CardTitle>
                  <CardDescription className="truncate">{article.url}</CardDescription>
                </div>
                {article.images && article.images.length > 0 && (
                  <Badge variant="secondary" className="shrink-0">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    {article.images.length} 张图片
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button onClick={() => downloadMarkdown(article)} variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />仅 Markdown
              </Button>
              {article.images && article.images.length > 0 && (
                <Button onClick={() => downloadWithImages(article)} className="flex-1">
                  <Package className="h-4 w-4 mr-2" />
                  完整包（含图片）
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {articles.length > 1 && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-lg">下载全部</CardTitle>
              <CardDescription>下载包含所有文章和图片的完整压缩包</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={downloadAllAsZip} className="w-full" size="lg">
                <Package className="h-4 w-4 mr-2" />
                下载完整压缩包
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
