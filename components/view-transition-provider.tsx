"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useViewTransitionRouter, historyStack } from "@/hooks/use-view-transition-router"

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { back } = useViewTransitionRouter()

  useEffect(() => {
    // 为页面内容添加视图过渡名称，确保过渡效果正确应用
    if (typeof document !== "undefined" && document.startViewTransition) {
      const main = document.querySelector("main")
      if (main) {
        main.style.viewTransitionName = "main-content"
      }
    }
  }, [pathname])

  // 监听浏览器后退/前进按钮
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handlePopState = () => {
      // 检测是否为后退导航
      const currentIndex = historyStack.indexOf(pathname)
      const isBackNavigation = currentIndex > -1 && currentIndex < historyStack.length - 1

      // 在视图过渡开始前设置动画
      if (isBackNavigation) {
        document.documentElement.style.setProperty(
          "--vt-old-animation",
          "slideBackOld 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        )
        document.documentElement.style.setProperty(
          "--vt-new-animation",
          "slideBackNew 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        )
      } else {
        document.documentElement.style.setProperty(
          "--vt-old-animation",
          "slideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        )
        document.documentElement.style.setProperty(
          "--vt-new-animation",
          "slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        )
      }

      // 使用 requestAnimationFrame 确保 CSS 变量已设置
      requestAnimationFrame(() => {
        if (document.startViewTransition) {
          const transition = document.startViewTransition(() => {
            // Next.js 会自动处理路由变化
          })
          // 过渡完成后重置动画变量
          transition.finished.finally(() => {
            setTimeout(() => {
              document.documentElement.style.removeProperty("--vt-old-animation")
              document.documentElement.style.removeProperty("--vt-new-animation")
            }, 50)
          })
        }
      })
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [pathname])

  return <>{children}</>
}

