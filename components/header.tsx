"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Image className="w-40 h-40" src="/logo.png" alt="微信文章转换器" width={64} height={64} />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              功能介绍
            </Link>
            <Link
              href="/#guide"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              操作指南
            </Link>
            <Link
              href="/#privacy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              隐私政策
            </Link>
            <Link href="/converter">
              <Button>开始使用</Button>
            </Link>
          </nav>

          <Link href="/converter" className="md:hidden">
            <Button>开始使用</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
