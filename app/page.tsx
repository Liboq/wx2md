"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ViewTransitionLink } from "@/components/view-transition-link"
import { FileText, Download, ImageIcon, History, Zap, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Vibrant Gradient with Better Breathing Space */}
        <section className="relative py-20 sm:py-28 md:py-36 lg:py-40 px-4 sm:px-6 overflow-hidden">
          {/* Vibrant 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 dark:from-purple-600 dark:via-pink-600 dark:to-orange-500" />
          
          {/* 装饰性光效和动画 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,200,0,0.15),transparent_50%)]" />
          
          {/* 内容区域 - 增加呼吸感 */}
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="block-section clay-card bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 p-8 sm:p-10 md:p-12 lg:p-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-10 text-balance text-white drop-shadow-2xl leading-tight">
                {t.home.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-pretty text-white/95 drop-shadow-lg max-w-2xl mx-auto px-2 leading-relaxed">
                {t.home.subtitle}
              </p>
              <ViewTransitionLink href="/converter" className="inline-block">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-10 sm:px-12 md:px-14 py-7 sm:py-8 md:py-9 min-h-[56px] !bg-white !text-slate-900 hover:!bg-white/95 shadow-2xl hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 font-bold dark:!bg-white dark:!text-slate-900 dark:hover:!bg-white/95"
                >
                  {t.home.startConvert}
                </Button>
              </ViewTransitionLink>
            </div>
          </div>
          
          {/* 底部渐变遮罩，平滑过渡到下一部分 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-background to-transparent dark:from-background" />
        </section>

        {/* Features Section - Block-based Grid with Vibrant Background */}
        <section id="features" className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
          {/* Vibrant 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.05),transparent_50%)]" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* 标题区域 - 增加呼吸感 */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{t.home.featuresTitle}</h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
            </div>
            {/* 功能卡片网格 - 增加间距 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-indigo-500/30">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature1}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature1Desc}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-pink-500/30">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature2}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature2Desc}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-cyan-500/30">
                    <ImageIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature3}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature3Desc}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-orange-500/30">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature4}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature4Desc}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-green-500/30">
                    <History className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature5}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature5Desc}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer group block-card p-6 sm:p-8">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-purple-500/30">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl mb-3 text-foreground font-bold">{t.home.feature6}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.feature6Desc}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Guide Section - Vibrant Gradient Background */}
        <section id="guide" className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
          {/* Vibrant 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{t.home.guideTitle}</h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-bold">
                    <span className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-lg sm:text-xl md:text-2xl shrink-0 shadow-xl shadow-pink-500/40">
                      1
                    </span>
                    {t.home.step1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.step1Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-bold">
                    <span className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white font-bold text-lg sm:text-xl md:text-2xl shrink-0 shadow-xl shadow-cyan-500/40">
                      2
                    </span>
                    {t.home.step2}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.step2Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-bold">
                    <span className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg sm:text-xl md:text-2xl shrink-0 shadow-xl shadow-orange-500/40">
                      3
                    </span>
                    {t.home.step3}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.step3Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-bold">
                    <span className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-lg sm:text-xl md:text-2xl shrink-0 shadow-xl shadow-green-500/40">
                      4
                    </span>
                    {t.home.step4}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.step4Desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Section - Block-based with Vibrant Accents */}
        <section id="privacy" className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
          {/* Vibrant 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.05),transparent_50%)]" />
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{t.home.privacyTitle}</h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
                      <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-bold">{t.home.privacyData}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.privacyDataDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                      <History className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-bold">{t.home.privacyStorage}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.privacyStorageDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30 shrink-0">
                      <ImageIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-bold">{t.home.privacyImages}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.privacyImagesDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="block-card p-6 sm:p-8 md:p-10">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                      <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-bold">{t.home.privacyThirdParty}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t.home.privacyThirdPartyDesc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
