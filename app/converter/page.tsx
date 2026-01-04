"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ConvertTab } from "@/components/convert-tab"
import { HtmlPreviewTab } from "@/components/html-preview-tab"
import { MarkdownPreviewTab } from "@/components/markdown-preview-tab"
import { DownloadTab } from "@/components/download-tab"
import { HistoryTab } from "@/components/history-tab"
import { Header } from "@/components/header"
import { saveToHistory, type HistoryArticle } from "@/lib/history-storage"
import { cn } from "@/lib/utils"
import { FileText, Eye, Code2, Download, History } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

interface ImageData {
  originalUrl: string
  filename: string
  data: string
  mimeType: string
}

interface Article {
  id: string
  url: string
  title?: string
  htmlContent?: string
  markdown?: string
  images?: ImageData[]
  status: "idle" | "fetching" | "fetched" | "converting" | "converted" | "error"
  error?: string
}

export default function ConverterPage() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([{ id: "1", url: "", status: "idle" }])
  const [activeTab, setActiveTab] = useState("convert")

  const addArticle = () => {
    setArticles([
      ...articles,
      {
        id: Date.now().toString(),
        url: "",
        status: "idle",
      },
    ])
  }

  const removeArticle = (id: string) => {
    if (articles.length > 1) {
      setArticles(articles.filter((article) => article.id !== id))
    }
  }

  const updateArticleUrl = (id: string, url: string) => {
    setArticles(articles.map((article) => (article.id === id ? { ...article, url } : article)))
  }

  const fetchArticles = async () => {
    setArticles(articles.map((article) => ({ ...article, status: "fetching" })))

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i]
      if (!article.url) continue

      try {
        const response = await fetch("/api/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: article.url }),
        })

        const data = await response.json()

        if (response.ok) {
          const fetchedArticle = {
            id: article.id,
            url: article.url,
            title: data.title,
            htmlContent: data.htmlContent,
            savedAt: new Date().toISOString(),
          }
          saveToHistory(fetchedArticle)

          setArticles((prev) =>
            prev.map((a) =>
              a.id === article.id ? { ...a, title: data.title, htmlContent: data.htmlContent, status: "fetched" } : a,
            ),
          )
        } else {
          throw new Error(data.error || "Failed to fetch article")
        }
      } catch (error) {
        setArticles((prev) =>
          prev.map((a) =>
            a.id === article.id
              ? { ...a, status: "error", error: error instanceof Error ? error.message : "Unknown error" }
              : a,
          ),
        )
      }
    }

    setActiveTab("html-preview")
  }

  const convertToMarkdown = async (articleId: string) => {
    const article = articles.find((a) => a.id === articleId)
    if (!article || !article.url) return

    setArticles((prev) => prev.map((a) => (a.id === articleId ? { ...a, status: "converting" } : a)))

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: article.url }),
      })

      const data = await response.json()

      if (response.ok) {
        const convertedArticle = {
          id: article.id,
          url: article.url,
          title: article.title,
          htmlContent: article.htmlContent,
          markdown: data.markdown,
          images: data.images,
          savedAt: new Date().toISOString(),
        }
        saveToHistory(convertedArticle)

        setArticles((prev) =>
          prev.map((a) =>
            a.id === articleId ? { ...a, markdown: data.markdown, images: data.images, status: "converted" } : a,
          ),
        )
        setActiveTab("markdown-preview")
      } else {
        throw new Error(data.error || "Conversion failed")
      }
    } catch (error) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === articleId
            ? { ...a, status: "error", error: error instanceof Error ? error.message : "Conversion error" }
            : a,
        ),
      )
    }
  }

  const loadArticleFromHistory = (historyArticle: HistoryArticle) => {
    const newArticle: Article = {
      id: Date.now().toString(),
      url: historyArticle.url,
      title: historyArticle.title,
      htmlContent: historyArticle.htmlContent,
      markdown: historyArticle.markdown,
      images: historyArticle.images,
      status: historyArticle.markdown ? "converted" : historyArticle.htmlContent ? "fetched" : "idle",
    }

    setArticles([newArticle])

    if (historyArticle.markdown) {
      setActiveTab("markdown-preview")
    } else if (historyArticle.htmlContent) {
      setActiveTab("html-preview")
    } else {
      setActiveTab("convert")
    }
  }

  const hasValidUrls = articles.some((a) => a.url.trim() !== "")
  const isFetching = articles.some((a) => a.status === "fetching")
  const fetchedArticles = articles.filter((a) => a.status === "fetched" || a.status === "converted")
  const convertedArticles = articles.filter((a) => a.status === "converted")

  const navItems = [
    { value: "convert", label: t.converter.tabConvert, icon: FileText },
    { value: "html-preview", label: t.converter.tabHtmlPreview, icon: Eye, disabled: fetchedArticles.length === 0 },
    { value: "markdown-preview", label: t.converter.tabMarkdownPreview, icon: Code2, disabled: convertedArticles.length === 0 },
    { value: "download", label: t.converter.tabDownload, icon: Download, disabled: convertedArticles.length === 0 },
    { value: "history", label: t.converter.tabHistory, icon: History },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 lg:py-16 max-w-7xl">
        {/* 标题区域 - 增加呼吸感，弱化次要信息 */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 text-balance text-foreground">{t.converter.title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">{t.converter.subtitle}</p>
        </div>

        {/* 主要内容区域 - 增加间距 */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* 导航栏 - 移动端在上方，桌面端在左侧 */}
          <Card className="w-full md:w-56 lg:w-64 shrink-0 p-0 md:p-5 md:h-fit md:sticky md:top-10 overflow-hidden">
            <nav className="flex md:flex-col gap-2 md:gap-0 md:space-y-2 overflow-x-auto md:overflow-x-visible scrollbar-hide md:scrollbar-default px-4 py-3 md:px-3 md:py-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.value}
                    onClick={() => !item.disabled && setActiveTab(item.value)}
                    disabled={item.disabled}
                    className={cn(
                      "flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 sm:px-4 md:px-4 py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px]",
                      "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:backdrop-filter disabled:blur-sm",
                      "md:w-full shrink-0",
                      activeTab === item.value
                        ? "clay-button text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>

          {/* 内容区 - 增加内边距 */}
          <Card className="flex-1 w-full">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              {activeTab === "convert" && (
                <ConvertTab
                  articles={articles}
                  onAddArticle={addArticle}
                  onRemoveArticle={removeArticle}
                  onUpdateUrl={updateArticleUrl}
                  onFetch={fetchArticles}
                  hasValidUrls={hasValidUrls}
                  isFetching={isFetching}
                />
              )}

              {activeTab === "html-preview" && (
                <HtmlPreviewTab articles={fetchedArticles} onConvert={convertToMarkdown} />
              )}

              {activeTab === "markdown-preview" && (
                <MarkdownPreviewTab
                  articles={convertedArticles}
                  onUpdateMarkdown={(articleId, markdown) => {
                    setArticles((prev) =>
                      prev.map((a) => (a.id === articleId ? { ...a, markdown } : a)),
                    )
                  }}
                />
              )}

              {activeTab === "download" && <DownloadTab articles={convertedArticles} />}

              {activeTab === "history" && <HistoryTab onLoadArticle={loadArticleFromHistory} />}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
