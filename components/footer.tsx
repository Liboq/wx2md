"use client"

import Link from "next/link"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { ViewTransitionLink } from "@/components/view-transition-link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer 
      className="border-t border-border/50 bg-muted/30"
      style={{ viewTransitionName: "footer" }}
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3 className="font-semibold mb-4 text-foreground">关于</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">微信公众号文章转 Markdown 转换工具，让内容管理更简单。</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">快速链接</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <SmoothScrollLink href="/#features" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  功能介绍
                </SmoothScrollLink>
              </li>
              <li>
                <SmoothScrollLink href="/#guide" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  操作指南
                </SmoothScrollLink>
              </li>
              <li>
                <ViewTransitionLink href="/converter" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  开始转换
                </ViewTransitionLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">法律</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <SmoothScrollLink href="/#privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  隐私政策
                </SmoothScrollLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>联系方式：</span>
              <a
                href="mailto:2661158759@qq.com"
                className="text-primary hover:underline transition-colors duration-200"
              >
                2661158759@qq.com
              </a>
            </div>
            <div className="text-center text-xs">
              © {new Date().getFullYear()} 微信文章转换器. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
