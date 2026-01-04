"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Link2, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/context"

interface Article {
  id: string
  url: string
  status: "idle" | "fetching" | "fetched" | "converting" | "converted" | "error"
  error?: string
}

interface ConvertTabProps {
  articles: Article[]
  onAddArticle: () => void
  onRemoveArticle: (id: string) => void
  onUpdateUrl: (id: string, url: string) => void
  onFetch: () => void
  hasValidUrls: boolean
  isFetching: boolean
}

export function ConvertTab({
  articles,
  onAddArticle,
  onRemoveArticle,
  onUpdateUrl,
  onFetch,
  hasValidUrls,
  isFetching,
}: ConvertTabProps) {
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleFetch = async () => {
    toast({
      title: t.language === "zh" ? "开始获取" : "Fetching Started",
      description: t.language === "zh" ? "正在获取文章内容..." : "Fetching article content...",
    })
    await onFetch()
  }

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      {/* 标题区域 - 弱化描述，突出标题 */}
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{t.convert.title}</h2>
        <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-2xl">{t.convert.description}</p>
      </div>

      {/* 输入区域 - 增加间距 */}
      <div className="space-y-4 sm:space-y-5">
        {articles.map((article, index) => (
          <div key={article.id} className="flex gap-2 items-start">
            <div className="flex-1 relative min-w-0">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                placeholder={t.convert.placeholder}
                value={article.url}
                onChange={(e) => onUpdateUrl(article.id, e.target.value)}
                className="pl-10 w-full text-sm sm:text-base border-border/50 focus:border-primary focus:ring-primary/20 min-h-[44px]"
                disabled={isFetching}
              />
              {article.status === "error" && <p className="text-xs sm:text-sm text-destructive mt-1.5">{article.error}</p>}
            </div>
            {articles.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveArticle(article.id)}
                disabled={isFetching}
                className="shrink-0 h-11 w-11 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px]"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 次要操作 - 弱化样式 */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          onClick={onAddArticle} 
          disabled={isFetching} 
          className="w-full bg-transparent border-border/50 hover:border-primary/30 hover:bg-accent/50 text-sm sm:text-base transition-all duration-200 min-h-[44px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.convert.addMore}
        </Button>
        <p className="text-xs sm:text-sm text-muted-foreground/60 leading-relaxed text-center">{t.convert.placeholder}</p>
      </div>

      {/* 主要操作 - 突出显示 */}
      <div className="pt-4">
        <Button
          onClick={handleFetch}
          disabled={!hasValidUrls || isFetching}
          className="w-full h-14 sm:h-16 text-base sm:text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 min-h-[56px] active:scale-[0.98]"
          size="lg"
        >
          {isFetching ? (
            <>
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 mr-3 animate-spin" />
              {t.convert.fetching}
            </>
          ) : (
            t.convert.fetchButton
          )}
        </Button>
      </div>

      {/* 帮助信息 - 弱化显示 */}
      <Alert className="bg-muted/30 dark:bg-muted/20 border-border/30">
        <AlertDescription>
          <p className="font-medium mb-3 text-xs sm:text-sm text-muted-foreground/70">{t.convert.usageTitle}</p>
          <ol className="space-y-2 text-xs sm:text-sm text-muted-foreground/60 leading-relaxed list-decimal list-inside">
            <li>{t.convert.usage1}</li>
            <li>{t.convert.usage2}</li>
            <li>{t.convert.usage3}</li>
            <li>{t.convert.usage4}</li>
            <li>{t.convert.usage5}</li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  )
}
