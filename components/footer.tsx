import Link from "next/link"

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
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  功能介绍
                </Link>
              </li>
              <li>
                <Link href="/#guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  操作指南
                </Link>
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
                <Link href="/#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 微信文章转换器. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
