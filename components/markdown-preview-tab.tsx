"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, FileText } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Article {
  id: string
  title?: string
  markdown?: string
}

interface MarkdownPreviewTabProps {
  articles: Article[]
}

export function MarkdownPreviewTab({ articles }: MarkdownPreviewTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, articleId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(articleId)
    setTimeout(() => setCopiedId(null), 2000)
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{article.title || "无标题"}</h3>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(article.markdown || "", article.id)}>
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
    </div>
  )
}
