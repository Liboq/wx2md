"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, FileText, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FireflyCardConfigDialog, type FireflyCardConfig } from "@/components/firefly-card-config-dialog"

interface Article {
  id: string
  title?: string
  markdown?: string
}

interface MarkdownPreviewTabProps {
  articles: Article[]
}

const FIREFLY_CARD_API_URL = "https://fireflycard-api.302ai.cn/api/saveImg"

export function MarkdownPreviewTab({ articles }: MarkdownPreviewTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const copyToClipboard = (text: string, articleId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(articleId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleExportFireflyCard = async (config: FireflyCardConfig) => {
    if (!selectedArticle) return

    try {
      const content = config.form.content || selectedArticle.markdown || ""
      const height = config.style?.height || 1200
      const width = config.style?.width || 800
      const padding = config.style?.padding || 40

      // 估算每张图片可容纳的内容量
      // 基于高度、宽度和内边距计算可用内容区域
      const availableHeight = height - padding * 2
      const availableWidth = width - padding * 2
      
      // 考虑标题和作者占用的空间（大约 100-150px）
      const headerHeight = 150
      const contentHeight = availableHeight - headerHeight
      
      // 更准确的估算：
      // - 中文字符平均宽度约 14-16px（考虑字体大小）
      // - 行高约 28-32px（考虑行间距）
      const avgCharWidth = 14
      const avgLineHeight = 30
      const charsPerLine = Math.floor(availableWidth / avgCharWidth)
      const linesPerPage = Math.floor(contentHeight / avgLineHeight)
      const maxCharsPerPage = Math.floor(charsPerLine * linesPerPage * 0.8) // 留 20% 余量

      console.log('分段计算参数:', {
        height,
        width,
        padding,
        availableHeight,
        availableWidth,
        contentHeight,
        charsPerLine,
        linesPerPage,
        maxCharsPerPage,
        contentLength: content.length
      })

      // 将内容分段处理
      const segments: string[] = []
      
      // 如果内容为空，直接返回
      if (!content.trim()) {
        throw new Error("内容为空")
      }

      // 如果内容很短，直接返回单段
      if (content.length <= maxCharsPerPage) {
        segments.push(content.trim())
      } else {
        // 内容较长，需要分段
        const paragraphs = content.split(/\n\n+/)
        let currentSegment = ""

        for (let i = 0; i < paragraphs.length; i++) {
          const paragraph = paragraphs[i].trim()
          if (!paragraph) continue

          // 计算添加这个段落后的长度
          const separator = currentSegment ? "\n\n" : ""
          const testSegment = currentSegment + separator + paragraph
          const testLength = testSegment.length

          // 如果单个段落就超过容量，需要强制分割段落
          if (paragraph.length > maxCharsPerPage) {
            // 先保存当前段（如果有）
            if (currentSegment.trim()) {
              segments.push(currentSegment.trim())
              currentSegment = ""
            }
            
            // 强制分割超长段落（按句子或固定长度）
            const sentences = paragraph.split(/([。！？\n])/g)
            let currentLongSegment = ""
            
            for (const sentence of sentences) {
              if (!sentence.trim()) continue
              
              const testLongSegment = currentLongSegment + sentence
              if (testLongSegment.length > maxCharsPerPage && currentLongSegment) {
                segments.push(currentLongSegment.trim())
                currentLongSegment = sentence
              } else {
                currentLongSegment += sentence
              }
            }
            
            if (currentLongSegment.trim()) {
              currentSegment = currentLongSegment.trim()
            }
          } 
          // 如果加上这个段落会超过容量，保存当前段
          else if (testLength > maxCharsPerPage && currentSegment.trim()) {
            segments.push(currentSegment.trim())
            currentSegment = paragraph
          } 
          // 否则添加到当前段
          else {
            currentSegment = testSegment
          }
        }

        // 添加最后一段
        if (currentSegment.trim()) {
          segments.push(currentSegment.trim())
        }
      }

      if (segments.length === 0) {
        throw new Error("内容为空，无法生成图片")
      }

      console.log('分段结果:', {
        segmentsCount: segments.length,
        segmentsLengths: segments.map(s => s.length),
        totalLength: segments.reduce((sum, s) => sum + s.length, 0),
        originalLength: content.length
      })

      // 构建基础请求体
      const baseRequestBody = {
        form: {
          title: config.form.title || selectedArticle.title || "无标题",
          author: config.form.author || "",
        },
        style: {
          width,
          height,
          padding,
          ...config.style,
        },
        temp: config.temp,
        subTempId: config.subTempId,
        imgScale: config.imgScale || 2,
      }
      if (segments.length === 1) {
        // 只有一张图片，直接调用接口并下载
        const requestBody = {
          ...baseRequestBody,
          form: {
            ...baseRequestBody.form,
            content: segments[0],
          },
        }

        const response = await fetch(FIREFLY_CARD_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API 请求失败: ${errorText}`)
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${selectedArticle.title || "article"}_firefly_card.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        // 多张图片：多次调用接口，每次生成一张图片，然后打包为压缩包
        const JSZip = (await import("jszip")).default
        const zip = new JSZip()

        // 为每个内容段调用接口生成图片
        for (let i = 0; i < segments.length; i++) {
          const segmentRequest = {
            ...baseRequestBody,
            form: {
              ...baseRequestBody.form,
              content: segments[i],
              title:
                i === 0
                  ? baseRequestBody.form.title
                  : `${baseRequestBody.form.title} (${i + 1})`,
            },
          }

          // 调用接口生成单张图片
          const response = await fetch(FIREFLY_CARD_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(segmentRequest),
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`生成第 ${i + 1} 张图片失败: ${errorText}`)
          }

          // 获取图片 blob 并添加到压缩包
          const blob = await response.blob()
          zip.file(`firefly_card_${i + 1}.png`, blob)
        }

        // 生成压缩包并下载
        const zipBlob = await zip.generateAsync({ type: "blob" })
        const url = window.URL.createObjectURL(zipBlob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${selectedArticle.title || "article"}_firefly_cards.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("导出失败:", error)
      throw error
    }
  }

  const openConfigDialog = (article: Article) => {
    setSelectedArticle(article)
    setConfigDialogOpen(true)
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>暂无Markdown内容</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Markdown预览</h2>
        <p className="text-muted-foreground">查看转换后的Markdown内容</p>
      </div>

      {articles.map((article) => (
        <Card key={article.id} className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-semibold text-foreground">{article.title || "无标题"}</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openConfigDialog(article)}
                className="border-border/50 hover:border-primary/30"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                导出为图片
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(article.markdown || "", article.id)}
                className="border-border/50 hover:border-primary/30"
              >
                {copiedId === article.id ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    复制Markdown
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">预览</TabsTrigger>
              <TabsTrigger value="source">源码</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.markdown || ""}</ReactMarkdown>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="source" className="mt-4">
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                <pre className="text-sm whitespace-pre-wrap font-mono">{article.markdown}</pre>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      ))}

      {selectedArticle && (
        <FireflyCardConfigDialog
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          markdownContent={selectedArticle.markdown || ""}
          articleTitle={selectedArticle.title}
          onExport={handleExportFireflyCard}
        />
      )}
    </div>
  )
}
