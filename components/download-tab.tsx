"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Package } from "lucide-react"
import { ImageIcon } from "lucide-react"
import JSZip from "jszip"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/context"

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
  const { t } = useLanguage()

  const downloadMarkdown = (article: Article) => {
    if (!article.markdown) return

    const blob = new Blob([article.markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${article.title || t.download.untitled}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: t.language === "zh" ? "下载成功" : "Download Successful",
      description: t.language === "zh" ? `已下载 ${article.title || "文章"}.md` : `Downloaded ${article.title || "article"}.md`,
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
      title: t.language === "zh" ? "下载成功" : "Download Successful",
      description: t.language === "zh" ? `已下载完整包 ${article.title || "文章"}.zip` : `Downloaded complete package ${article.title || "article"}.zip`,
    })
  }

  const downloadAllAsZip = async () => {
    toast({
      title: t.language === "zh" ? "正在打包" : "Packaging",
      description: t.language === "zh" ? "正在打包所有文章和图片..." : "Packaging all articles and images...",
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
      title: t.language === "zh" ? "下载成功" : "Download Successful",
      description: t.language === "zh" ? "已下载所有文章完整包" : "Downloaded complete package with all articles",
    })
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* 标题区域 - 弱化描述 */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.download.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground/70">{t.download.description}</p>
      </div>

      {/* 下载卡片 - 增加间距 */}
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {articles.map((article) => (
          <Card key={article.id} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 sm:p-8">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2 text-foreground font-bold line-clamp-2">{article.title || t.download.untitled}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm truncate text-muted-foreground/70">{article.url}</CardDescription>
                </div>
                {article.images && article.images.length > 0 && (
                  <Badge variant="secondary" className="shrink-0 text-xs sm:text-sm px-3 py-1">
                    <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                    {article.images.length} {t.download.images}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 pt-0">
              <Button onClick={() => downloadMarkdown(article)} variant="outline" className="flex-1 min-h-[48px] text-sm sm:text-base">
                <FileText className="h-4 w-4 mr-2" />{t.download.markdownOnly}
              </Button>
              {article.images && article.images.length > 0 && (
                <Button onClick={() => downloadWithImages(article)} className="flex-1 min-h-[48px] text-sm sm:text-base font-semibold">
                  <Package className="h-4 w-4 mr-2" />
                  {t.download.fullPackage}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {articles.length > 1 && (
          <Card className="border-primary/50 hover:border-primary transition-all duration-200 p-6 sm:p-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl md:text-2xl text-foreground font-bold">{t.download.downloadAll}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground/70 mt-2">{t.download.downloadAllDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button onClick={downloadAllAsZip} className="w-full min-h-[52px] text-base sm:text-lg font-semibold" size="lg">
                <Package className="h-5 w-5 mr-2" />
                {t.download.downloadAllButton}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
