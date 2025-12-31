"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Trash2, FileText, Eye, History, Copy } from "lucide-react"
import { getHistory, removeFromHistory, clearHistory, type HistoryArticle } from "@/lib/history-storage"
import { useToast } from "@/hooks/use-toast"

interface HistoryTabProps {
  onLoadArticle: (article: HistoryArticle) => void
}

export function HistoryTab({ onLoadArticle }: HistoryTabProps) {
  const [history, setHistory] = useState<HistoryArticle[]>([])
  const { toast } = useToast()

  const loadHistory = () => {
    setHistory(getHistory())
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const handleRemove = (id: string) => {
    removeFromHistory(id)
    loadHistory()
  }

  const handleClearAll = () => {
    if (window.confirm("确定要清除所有历史记录吗？")) {
      clearHistory()
      loadHistory()
    }
  }

  const handleCopyUrl = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "复制成功",
        description: "链接已复制到剪贴板",
      })
    } catch (error) {
      toast({
        title: "复制失败",
        description: "请手动复制链接",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "刚刚"
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`

    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  if (history.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">历史记录</h2>
          <p className="text-muted-foreground">查看和管理已获取的文章记录</p>
        </div>

        <Alert className="bg-muted/50">
          <History className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-1">暂无历史记录</p>
            <p className="text-sm text-muted-foreground">获取文章后，会自动保存到历史记录中，方便您随时查看。</p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">历史记录</h2>
          <p className="text-muted-foreground">共 {history.length} 条记录</p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleClearAll}>
          <Trash2 className="h-4 w-4 mr-2" />
          清除全部
        </Button>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2 mb-1">{item.title || "无标题"}</CardTitle>
                    <div className="flex items-center gap-2">
                      <CardDescription className="text-xs line-clamp-1 flex-1">{item.url}</CardDescription>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={(e) => handleCopyUrl(item.url, e)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {item.htmlContent && (
                      <Badge variant="secondary" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        已获取
                      </Badge>
                    )}
                    {item.markdown && (
                      <Badge variant="default" className="text-xs">
                        MD
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(item.savedAt)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onLoadArticle(item)}>
                    <Eye className="h-4 w-4 mr-1" />
                    查看
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleRemove(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
