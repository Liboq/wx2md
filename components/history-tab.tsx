"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Trash2, FileText, Eye, History, Copy, Code2 } from "lucide-react"
import { getHistory, removeFromHistory, clearHistory, type HistoryArticle } from "@/lib/history-storage"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/context"

interface HistoryTabProps {
  onLoadArticle: (article: HistoryArticle) => void
}

export function HistoryTab({ onLoadArticle }: HistoryTabProps) {
  const { t, language } = useLanguage()
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
    const confirmMessage = language === "zh" ? "确定要清除所有历史记录吗？" : "Are you sure you want to clear all history records?"
    if (window.confirm(confirmMessage)) {
      clearHistory()
      loadHistory()
    }
  }

  const handleCopyUrl = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: t.history.copySuccess,
        description: t.history.copySuccessDesc,
      })
    } catch (error) {
      toast({
        title: t.history.copyFailed,
        description: t.history.copyFailedDesc,
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

    if (language === "zh") {
      if (diffMins < 1) return "刚刚"
      if (diffMins < 60) return `${diffMins}分钟前`
      if (diffHours < 24) return `${diffHours}小时前`
      if (diffDays < 7) return `${diffDays}天前`
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } else {
      if (diffMins < 1) return "Just now"
      if (diffMins < 60) return `${diffMins} min ago`
      if (diffHours < 24) return `${diffHours} hours ago`
      if (diffDays < 7) return `${diffDays} days ago`
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }
  }

  if (history.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">历史记录</h2>
          <p className="text-sm sm:text-base text-muted-foreground">查看和管理已获取的文章记录</p>
        </div>

        <Alert className="bg-muted/50 border-border/50">
          <History className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-1 text-sm sm:text-base text-foreground">暂无历史记录</p>
            <p className="text-xs sm:text-sm text-muted-foreground">获取文章后，会自动保存到历史记录中，方便您随时查看。</p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-foreground">历史记录</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">共 {history.length} 条记录</p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleClearAll} className="min-h-[44px] w-full sm:w-auto">
          <Trash2 className="h-4 w-4 mr-2" />
          清除全部
        </Button>
      </div>

      <ScrollArea className="h-[500px] sm:h-[600px] pr-2 sm:pr-4">
        <div className="space-y-5 sm:space-y-6">
          {history.map((item, index) => {
            // 根据索引选择不同的渐变颜色
            const gradients = [
              "from-purple-500/20 via-pink-500/20 to-rose-500/20",
              "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
              "from-orange-500/20 via-red-500/20 to-pink-500/20",
              "from-green-500/20 via-emerald-500/20 to-teal-500/20",
            ]
            const gradient = gradients[index % gradients.length]
            
            return (
              <Card 
                key={item.id} 
                className="group relative overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer clay-card-hover"
              >
                {/* 左侧渐变装饰条 */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* 背景渐变装饰 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      {/* 标题区域 - 添加图标装饰 */}
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-2 mb-2 text-foreground font-bold group-hover:text-primary transition-colors duration-300">
                            {item.title || (language === "zh" ? "无标题" : "Untitled")}
                          </CardTitle>
                          {/* URL 区域 - 改善样式 */}
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors duration-300">
                            <div className="flex-1 min-w-0">
                              <CardDescription className="text-xs sm:text-sm line-clamp-1 font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {item.url}
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0 min-h-[32px] min-w-[32px] hover:bg-primary/10 hover:text-primary transition-all duration-200"
                              onClick={(e) => handleCopyUrl(item.url, e)}
                            >
                              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 状态徽章区域 - 改善样式 */}
                    <div className="flex flex-col gap-2 shrink-0">
                      {item.htmlContent && (
                        <Badge variant="secondary" className="text-xs w-fit shadow-sm bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300">
                          <FileText className="h-3 w-3 mr-1.5" />
                          {t.history.fetched}
                        </Badge>
                      )}
                      {item.markdown && (
                        <Badge variant="default" className="text-xs w-fit shadow-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300">
                          <Code2 className="h-3 w-3 mr-1.5" />
                          MD
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 pb-4 relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    {/* 时间信息 - 改善样式 */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors duration-300">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
                        {formatDate(item.savedAt)}
                      </span>
                    </div>
                    
                    {/* 操作按钮区域 - 改善样式 */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onLoadArticle(item)} 
                        className="flex-1 sm:flex-none min-h-[44px] border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        {t.history.view}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemove(item.id)} 
                        className="min-h-[44px] min-w-[44px] hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
