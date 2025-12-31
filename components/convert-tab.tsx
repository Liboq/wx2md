"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Link2, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

  const handleFetch = async () => {
    toast({
      title: "开始获取",
      description: "正在获取文章内容...",
    })
    await onFetch()
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">转换微信公众号文章</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">输入一个或多个微信公众号文章的URL，将其转换为Markdown格式</p>
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="flex gap-2 items-start">
            <div className="flex-1 relative min-w-0">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                placeholder={`https://mp.weixin.qq.com/s/...`}
                value={article.url}
                onChange={(e) => onUpdateUrl(article.id, e.target.value)}
                className="pl-10 w-full text-sm md:text-base border-border/50 focus:border-primary focus:ring-primary/20"
                disabled={isFetching}
              />
              {article.status === "error" && <p className="text-xs md:text-sm text-destructive mt-1">{article.error}</p>}
            </div>
            {articles.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveArticle(article.id)}
                disabled={isFetching}
                className="shrink-0 h-10 w-10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        onClick={onAddArticle} 
        disabled={isFetching} 
        className="w-full bg-transparent border-border/50 hover:border-primary/30 hover:bg-accent/50 text-sm md:text-base transition-all duration-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        添加更多文章
      </Button>

      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">输入微信公众号文章的URL（例如：https://mp.weixin.qq.com/s/...）</p>

      <Button
        onClick={handleFetch}
        disabled={!hasValidUrls || isFetching}
        className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        size="lg"
      >
        {isFetching ? (
          <>
            <Loader2 className="h-4 w-4 md:h-5 md:w-5 mr-2 animate-spin" />
            获取中...
          </>
        ) : (
          "获取文章内容"
        )}
      </Button>

      <Alert className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-200/50 dark:border-blue-900/30">
        <AlertDescription>
          <p className="font-semibold mb-3 text-sm md:text-base text-foreground">使用说明：</p>
          <ol className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed list-decimal list-inside">
            <li>输入一个或多个微信公众号文章链接</li>
            <li>点击"获取文章内容"按钮，工具将获取文章的原始内容</li>
            <li>在内容预览页面中，点击"转换为Markdown"按钮进行转换</li>
            <li>图片将会自动下载到本地，并在Markdown中使用相对路径引用</li>
            <li>完成后可以复制Markdown内容或下载为.md文件</li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  )
}
