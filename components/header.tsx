"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Image from "next/image"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ViewTransitionLink } from "@/components/view-transition-link"
import { useLanguage } from "@/lib/i18n/context"

export function Header() {
  const { t } = useLanguage()

  return (
    <header 
      className="border-b border-border/30 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/50 sticky top-0 z-50 shadow-sm"
      style={{ viewTransitionName: "header" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-14 sm:h-16 md:h-20 lg:h-24 items-center justify-between">
          <ViewTransitionLink href="/" className="flex items-center gap-2 md:gap-3 lg:gap-4 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl min-h-[44px]">
            <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-20 md:h-20 lg:w-24 lg:h-24" src="/logo.png" alt="微信文章转换器" width={96} height={96} />
          </ViewTransitionLink>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <SmoothScrollLink
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {t.nav.features}
            </SmoothScrollLink>
            <SmoothScrollLink
              href="/#guide"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {t.nav.guide}
            </SmoothScrollLink>
            <SmoothScrollLink
              href="/#privacy"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {t.nav.privacy}
            </SmoothScrollLink>
            <LanguageToggle />
            <ThemeToggle />
            <ViewTransitionLink href="/converter">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[36px]">{t.nav.startUsing}</Button>
            </ViewTransitionLink>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <ViewTransitionLink href="/converter">
              <Button size="sm" className="min-h-[36px] px-3 sm:px-4">{t.nav.startUsing}</Button>
            </ViewTransitionLink>
          </div>
        </div>
      </div>
    </header>
  )
}
