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
    { value: "convert", label: "转换", icon: FileText },
    { value: "html-preview", label: "内容预览", icon: Eye, disabled: fetchedArticles.length === 0 },
    { value: "markdown-preview", label: "MD预览", icon: Code2, disabled: convertedArticles.length === 0 },
    { value: "download", label: "下载", icon: Download, disabled: convertedArticles.length === 0 },
    { value: "history", label: "历史记录", icon: History },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance text-foreground">微信公众号文章转换器</h1>
          <p className="text-base md:text-lg text-muted-foreground">将微信公众号文章轻松转换为 Markdown 格式</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 导航栏 - 移动端在上方，桌面端在左侧 */}
          <Card className="w-full md:w-52 shrink-0 p-0 md:p-4 shadow-sm border border-border/50 md:h-fit md:sticky md:top-8 overflow-hidden bg-card">
            <nav className="flex md:flex-col gap-2 md:gap-0 md:space-y-1 overflow-x-auto md:overflow-x-visible scrollbar-hide md:scrollbar-default px-3 py-3 md:px-2 md:py-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.value}
                    onClick={() => !item.disabled && setActiveTab(item.value)}
                    disabled={item.disabled}
                    className={cn(
                      "flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap",
                      "cursor-pointer hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                      "md:w-full shrink-0",
                      activeTab === item.value
                        ? "bg-primary text-primary-foreground shadow-sm"
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

          {/* 内容区 */}
          <Card className="flex-1 shadow-sm border border-border/50 w-full bg-card">
            <div className="p-6 md:p-8">
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

              {activeTab === "markdown-preview" && <MarkdownPreviewTab articles={convertedArticles} />}

              {activeTab === "download" && <DownloadTab articles={convertedArticles} />}

              {activeTab === "history" && <HistoryTab onLoadArticle={loadArticleFromHistory} />}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
