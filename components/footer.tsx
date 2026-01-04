"use client"

import Link from "next/link"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { ViewTransitionLink } from "@/components/view-transition-link"
import { Mail, Github } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Footer() {
  const { t, language } = useLanguage()
  return (
    <footer 
      className="border-t border-border/30 bg-muted/40 backdrop-blur-xl"
      style={{ viewTransitionName: "footer" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">{t.nav.features}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <SmoothScrollLink href="/#features" className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer inline-block min-h-[32px] flex items-center">
                  {t.nav.features}
                </SmoothScrollLink>
              </li>
              <li>
                <SmoothScrollLink href="/#guide" className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer inline-block min-h-[32px] flex items-center">
                  {t.nav.guide}
                </SmoothScrollLink>
              </li>
              <li>
                <ViewTransitionLink href="/converter" className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer inline-block min-h-[32px] flex items-center">
                  {t.nav.startUsing}
                </ViewTransitionLink>
              </li>
              <li>
                <a
                  href="https://github.com/Liboq/wx2md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer inline-block min-h-[32px] flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">{t.footer.legal}</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <SmoothScrollLink href="/#privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer inline-block min-h-[32px] flex items-center">
                  {t.nav.privacy}
                </SmoothScrollLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-3 sm:gap-5 text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{language === "zh" ? "联系方式：" : "Contact:"}</span>
                <a
                  href="mailto:2661158759@qq.com"
                  className="text-primary hover:underline transition-colors duration-200 cursor-pointer"
                >
                  2661158759@qq.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/Liboq/wx2md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors duration-200 cursor-pointer"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="text-center text-xs">
              © {new Date().getFullYear()} {language === "zh" ? "微信文章转换器" : "WeChat Article Converter"}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
