"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, FileText, Image as ImageIcon, Save, Edit } from "lucide-react"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FireflyCardConfigDialog, type FireflyCardConfig } from "@/components/firefly-card-config-dialog"
import { useLanguage } from "@/lib/i18n/context"
import { useToast } from "@/hooks/use-toast"

interface Article {
  id: string
  title?: string
  markdown?: string
}

interface MarkdownPreviewTabProps {
  articles: Article[]
  onUpdateMarkdown?: (articleId: string, markdown: string) => void
}

const FIREFLY_CARD_API_URL = "https://fireflycard-api.302ai.cn/api/saveImg"

export function MarkdownPreviewTab({ articles, onUpdateMarkdown }: MarkdownPreviewTabProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  // 存储每个文章的编辑内容
  const [editedContent, setEditedContent] = useState<Record<string, string>>({})
  // 跟踪哪些文章有未保存的更改
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, articleId: string) => {
    // 如果正在编辑，使用编辑后的内容
    const contentToCopy = editedContent[articleId] !== undefined ? editedContent[articleId] : text
    navigator.clipboard.writeText(contentToCopy)
    setCopiedId(articleId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleExportFireflyCard = async (config: FireflyCardConfig) => {
    if (!selectedArticle) return

    try {
      // 使用编辑后的内容（如果有）或原始内容
      const currentContent = editedContent[selectedArticle.id] !== undefined
        ? editedContent[selectedArticle.id]
        : selectedArticle.markdown || ""
      const content = config.form.content || currentContent
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

  // 初始化编辑内容
  useEffect(() => {
    const initialContent: Record<string, string> = {}
    articles.forEach((article) => {
      if (!editedContent[article.id] && article.markdown) {
        initialContent[article.id] = article.markdown
      }
    })
    if (Object.keys(initialContent).length > 0) {
      setEditedContent((prev) => ({ ...prev, ...initialContent }))
    }
  }, [articles])

  // 处理源码编辑
  const handleSourceChange = (articleId: string, value: string) => {
    setEditedContent((prev) => ({ ...prev, [articleId]: value }))
    const originalContent = articles.find((a) => a.id === articleId)?.markdown || ""
    setHasUnsavedChanges((prev) => ({
      ...prev,
      [articleId]: value !== originalContent,
    }))
  }

  // 保存编辑的内容
  const handleSave = (articleId: string) => {
    const content = editedContent[articleId]
    if (content !== undefined && onUpdateMarkdown) {
      onUpdateMarkdown(articleId, content)
      setHasUnsavedChanges((prev) => ({ ...prev, [articleId]: false }))
      toast({
        title: t.language === "zh" ? "保存成功" : "Saved Successfully",
        description: t.language === "zh" ? "Markdown 内容已更新" : "Markdown content updated",
      })
    }
  }

  // 重置编辑内容
  const handleReset = (articleId: string) => {
    const originalContent = articles.find((a) => a.id === articleId)?.markdown || ""
    setEditedContent((prev) => ({ ...prev, [articleId]: originalContent }))
    setHasUnsavedChanges((prev) => ({ ...prev, [articleId]: false }))
  }

  // 获取当前显示的内容（编辑后的或原始的）
  const getDisplayContent = (article: Article) => {
    return editedContent[article.id] !== undefined
      ? editedContent[article.id]
      : article.markdown || ""
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-muted-foreground">
        <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm sm:text-base">暂无Markdown内容</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* 标题区域 - 弱化描述 */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.markdownPreview.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground/70">{t.markdownPreview.description}</p>
      </div>

      {articles.map((article) => (
        <Card key={article.id} className="p-6 sm:p-8 md:p-10 border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex-1">{article.title || (language === "zh" ? "无标题" : "Untitled")}</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openConfigDialog(article)}
                className="border-border/50 hover:border-primary/30 flex-1 sm:flex-none min-h-[44px]"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                导出为图片
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(article.markdown || "", article.id)}
                className="border-border/50 hover:border-primary/30 flex-1 sm:flex-none min-h-[44px]"
              >
                {copiedId === article.id ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {t.markdownPreview.copied}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    {t.markdownPreview.copyMarkdown}
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="text-xs sm:text-sm">预览</TabsTrigger>
              <TabsTrigger value="source" className="text-xs sm:text-sm">源码</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <ScrollArea className="h-[400px] sm:h-[500px] w-full rounded-md border border-border/50 p-3 sm:p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{getDisplayContent(article)}</ReactMarkdown>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="source" className="mt-4">
              <div className="space-y-3">
                {/* 编辑工具栏 */}
                {hasUnsavedChanges[article.id] && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-primary/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Edit className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">
                        {t.language === "zh" ? "有未保存的更改" : "Unsaved changes"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReset(article.id)}
                        className="h-8 text-xs"
                      >
                        {t.language === "zh" ? "重置" : "Reset"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSave(article.id)}
                        className="h-8 text-xs"
                        disabled={!onUpdateMarkdown}
                      >
                        <Save className="h-3 w-3 mr-1.5" />
                        {t.language === "zh" ? "保存" : "Save"}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* 可编辑的源码区域 */}
                <div className="relative">
                  <Textarea
                    value={editedContent[article.id] !== undefined ? editedContent[article.id] : article.markdown || ""}
                    onChange={(e) => handleSourceChange(article.id, e.target.value)}
                    className="h-[400px] sm:h-[500px] w-full rounded-md border border-border/50 p-3 sm:p-4 font-mono text-xs sm:text-sm resize-none focus:ring-2 focus:ring-primary/20"
                    placeholder={t.language === "zh" ? "在此编辑 Markdown 源码..." : "Edit Markdown source here..."}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      ))}

      {selectedArticle && (
        <FireflyCardConfigDialog
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          markdownContent={getDisplayContent(selectedArticle)}
          articleTitle={selectedArticle.title}
          onExport={handleExportFireflyCard}
        />
      )}
    </div>
  )
}
