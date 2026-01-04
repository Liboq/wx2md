"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText, Loader2, Sparkles, Code2, Clipboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/context"

interface Article {
  id: string
  title?: string
  htmlContent?: string
  status: "fetched" | "converting" | "converted" | "error"
}

interface HtmlPreviewTabProps {
  articles: Article[]
  onConvert: (articleId: string) => void
}

export function HtmlPreviewTab({ articles, onConvert }: HtmlPreviewTabProps) {
  const { toast } = useToast()
  const { t, language } = useLanguage()

  const handleCopyToWeChat = async (article: Article) => {
    if (!article.htmlContent) return

    try {
      // Create a temporary div to hold the content
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = article.htmlContent
      document.body.appendChild(tempDiv)

      // Select the content
      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)

      // Copy to clipboard
      document.execCommand("copy")

      // Clean up
      document.body.removeChild(tempDiv)
      selection?.removeAllRanges()

      toast({
        title: t.language === "zh" ? "复制成功" : "Copied Successfully",
        description: t.language === "zh" ? "内容已复制，可直接粘贴到微信公众号编辑器" : "Content copied, can be pasted directly into WeChat editor",
      })
    } catch (error) {
      toast({
        title: t.language === "zh" ? "复制失败" : "Copy Failed",
        description: t.language === "zh" ? "请手动选择内容进行复制" : "Please manually select content to copy",
        variant: "destructive",
      })
    }
  }

  const handleConvert = async (articleId: string) => {
    toast({
      title: t.language === "zh" ? "开始转换" : "Conversion Started",
      description: t.language === "zh" ? "正在将文章转换为Markdown格式..." : "Converting article to Markdown format...",
    })
    await onConvert(articleId)
    toast({
      title: t.language === "zh" ? "转换成功" : "Conversion Successful",
      description: t.language === "zh" ? "文章已成功转换为Markdown格式" : "Article successfully converted to Markdown format",
    })
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-muted-foreground">
        <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm sm:text-base">{t.htmlPreview.noArticles}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* 标题区域 - 弱化描述 */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.htmlPreview.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground/70">{t.htmlPreview.description}</p>
      </div>

      {articles.map((article) => (
        <Card key={article.id} className="p-6 sm:p-8 md:p-10 space-y-6 border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 sm:gap-6">
            <div className="flex-1 w-full sm:w-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-foreground">{article.title || (language === "zh" ? "无标题" : "Untitled")}</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Button
                variant="outline"
                onClick={() => handleCopyToWeChat(article)}
                disabled={!article.htmlContent}
                size="lg"
                className="w-full sm:w-auto min-h-[48px] text-sm sm:text-base"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                {t.htmlPreview.copyToWeChat}
              </Button>
              <Button
                onClick={() => handleConvert(article.id)}
                disabled={article.status === "converting" || article.status === "converted"}
                className="w-full sm:w-auto sm:min-w-[160px] min-h-[48px] text-sm sm:text-base font-semibold"
                size="lg"
              >
                {article.status === "converting" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.htmlPreview.converting}
                  </>
                ) : article.status === "converted" ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t.htmlPreview.converted}
                  </>
                ) : (
                  <>
                    <Code2 className="h-4 w-4 mr-2" />
                    {t.htmlPreview.convertToMarkdown}
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px] w-full rounded-md border border-border/50 p-4 sm:p-6 bg-muted/30">
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || "" }}
            />
          </ScrollArea>
        </Card>
      ))}
    </div>
  )
}
