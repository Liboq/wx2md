"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText, Loader2, Sparkles, Code2, Clipboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
        title: "复制成功",
        description: "内容已复制，可直接粘贴到微信公众号编辑器",
      })
    } catch (error) {
      toast({
        title: "复制失败",
        description: "请手动选择内容进行复制",
        variant: "destructive",
      })
    }
  }

  const handleConvert = async (articleId: string) => {
    toast({
      title: "开始转换",
      description: "正在将文章转换为Markdown格式...",
    })
    await onConvert(articleId)
    toast({
      title: "转换成功",
      description: "文章已成功转换为Markdown格式",
    })
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>暂无文章预览</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">文章内容预览</h2>
        <p className="text-muted-foreground">查看文章原始内容，点击按钮转换为Markdown格式</p>
      </div>

      {articles.map((article) => (
        <Card key={article.id} className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{article.title || "无标题"}</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                onClick={() => handleCopyToWeChat(article)}
                disabled={!article.htmlContent}
                size="lg"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                复制到公众号
              </Button>
              <Button
                onClick={() => handleConvert(article.id)}
                disabled={article.status === "converting" || article.status === "converted"}
                className="min-w-[140px]"
                size="lg"
              >
                {article.status === "converting" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    转换中...
                  </>
                ) : article.status === "converted" ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    已转换
                  </>
                ) : (
                  <>
                    <Code2 className="h-4 w-4 mr-2" />
                    转换为Markdown
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator />

          <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-muted/30">
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
