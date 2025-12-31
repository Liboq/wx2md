import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Download, ImageIcon, History, Zap, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6 text-balance">微信公众号文章转 Markdown</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              快速将微信公众号文章转换为 Markdown 格式，支持批量处理、图片下载和本地存储
            </p>
            <Link href="/converter">
              <Button size="lg" className="text-lg px-8 py-6">
                开始转换
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">功能介绍</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>HTML 内容预览</CardTitle>
                  <CardDescription>获取文章后先预览原始 HTML 内容，确认无误后再转换</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>快速转换</CardTitle>
                  <CardDescription>一键将 HTML 转换为格式规范的 Markdown，保留文章结构</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <ImageIcon className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>图片处理</CardTitle>
                  <CardDescription>自动下载文章图片，在 Markdown 中使用相对路径引用</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Download className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>灵活导出</CardTitle>
                  <CardDescription>支持下载单独 Markdown 文件或包含图片的完整 ZIP 包</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <History className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>历史记录</CardTitle>
                  <CardDescription>本地存储转换历史，随时查看和管理已转换的文章</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>隐私安全</CardTitle>
                  <CardDescription>所有数据本地处理，不上传到服务器，保护您的隐私</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section id="guide" className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">操作指南</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </span>
                    输入文章链接
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    在"转换"标签页中输入一个或多个微信公众号文章的
                    URL。支持批量添加，点击"添加更多文章"按钮可以添加多个链接。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </span>
                    预览文章内容
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    点击"获取文章内容"按钮，系统会获取文章的原始 HTML
                    内容。在"内容预览"标签页中查看文章，确认内容正确后再进行转换。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      3
                    </span>
                    转换为 Markdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    在"内容预览"页面中点击"转换为
                    Markdown"按钮，工具会自动下载图片并转换文章格式。转换完成后可以在"Markdown 预览"标签页查看效果。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      4
                    </span>
                    下载文件
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    在"下载"标签页中选择下载选项：可以下载单独的 Markdown 文件，或下载包含所有图片的完整 ZIP
                    包。批量转换时可以一次性下载所有文章。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">隐私政策</h2>
            <Card>
              <CardContent className="prose prose-sm max-w-none p-6">
                <h3 className="text-xl font-semibold mb-4">数据处理</h3>
                <p className="text-muted-foreground mb-4">
                  本工具采用客户端处理方式，所有文章内容和转换操作均在您的浏览器中完成。我们不会收集、存储或上传您的文章内容到任何服务器。
                </p>

                <h3 className="text-xl font-semibold mb-4">本地存储</h3>
                <p className="text-muted-foreground mb-4">
                  历史记录功能使用浏览器的 localStorage
                  进行本地存储，数据仅保存在您的设备上。您可以随时在"历史记录"标签页中清除这些数据。
                </p>

                <h3 className="text-xl font-semibold mb-4">图片处理</h3>
                <p className="text-muted-foreground mb-4">
                  转换过程中需要下载文章中的图片。图片通过我们的代理服务器获取，但不会被保存。下载后的图片仅存储在您下载的
                  ZIP 文件中。
                </p>

                <h3 className="text-xl font-semibold mb-4">第三方服务</h3>
                <p className="text-muted-foreground">
                  本工具会访问微信公众号的文章页面以获取内容。请遵守微信公众平台的相关使用条款和版权规定。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
