"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Image from "next/image"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ViewTransitionLink } from "@/components/view-transition-link"

export function Header() {
  return (
    <header 
      className="border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50"
      style={{ viewTransitionName: "header" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-18 items-center justify-between">
          <ViewTransitionLink href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Image className="w-40 h-40" src="/logo.png" alt="微信文章转换器" width={64} height={64} />
          </ViewTransitionLink>

          <nav className="hidden md:flex items-center gap-8">
            <SmoothScrollLink
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              功能介绍
            </SmoothScrollLink>
            <SmoothScrollLink
              href="/#guide"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              操作指南
            </SmoothScrollLink>
            <SmoothScrollLink
              href="/#privacy"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              隐私政策
            </SmoothScrollLink>
            <ThemeToggle />
            <ViewTransitionLink href="/converter">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">开始使用</Button>
            </ViewTransitionLink>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <ViewTransitionLink href="/converter">
              <Button>开始使用</Button>
            </ViewTransitionLink>
          </div>
        </div>
      </div>
    </header>
  )
}
