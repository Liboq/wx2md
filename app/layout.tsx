import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ViewTransitionProvider } from "@/components/view-transition-provider"
import { LanguageProvider } from "@/lib/i18n/context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "微信公众号文章转换器 - Markdown 转换工具",
  description: "将微信公众号文章轻松转换为 Markdown 格式，支持批量转换、图片下载和文件导出。本地处理，保护隐私安全。",
  keywords: ["微信公众号", "Markdown", "文章转换", "图片下载", "批量处理"],
  generator: "v0.app",
  icons: {
    icon: [

      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ViewTransitionProvider>
              {children}
            </ViewTransitionProvider>
            <Analytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
