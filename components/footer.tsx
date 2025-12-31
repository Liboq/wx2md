"use client"

import Link from "next/link"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">关于</h3>
            <p className="text-sm text-muted-foreground">微信公众号文章转 Markdown 转换工具，让内容管理更简单。</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <SmoothScrollLink href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  功能介绍
                </SmoothScrollLink>
              </li>
              <li>
                <SmoothScrollLink href="/#guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  操作指南
                </SmoothScrollLink>
              </li>
              <li>
                <Link href="/converter" className="text-muted-foreground hover:text-foreground transition-colors">
                  开始转换
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">法律</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <SmoothScrollLink href="/#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  隐私政策
                </SmoothScrollLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>联系方式：</span>
              <a
                href="mailto:2661158759@qq.com"
                className="text-primary hover:underline transition-colors"
              >
                2661158759@qq.com
              </a>
            </div>
            <div className="text-center">
              © {new Date().getFullYear()} 微信文章转换器. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
