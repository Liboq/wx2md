"use client"

import { useRouter, usePathname } from "next/navigation"
import { useRef, useEffect } from "react"

// 路由历史栈
export const historyStack: string[] = []
export const isBack = { current: false }

export function useViewTransitionRouter() {
  const router = useRouter()
  const pathname = usePathname()
  const isInitialized = useRef(false)

  // 初始化历史栈
  useEffect(() => {
    if (!isInitialized.current && historyStack.length === 0) {
      historyStack.push(pathname)
      isInitialized.current = true
    }
  }, [pathname])

  /**
   * 导航方法
   */
  function navigate(
    to: string,
    replace = false,
    direction?: "forward" | "back"
  ) {
    const targetPath = to

    // 如果目标路径和当前路径相同，不触发动画
    if (targetPath === pathname) {
      return
    }

    // 替换默认页
    if (replace) {
      historyStack.length = 0
      historyStack.push(targetPath)
    }

    // 检测导航方向
    if (direction) {
      isBack.current = direction === "back"
    } else {
      isBack.current =
        historyStack.length > 1 &&
        historyStack[historyStack.length - 2] === targetPath
    }

    // 在 startViewTransition 之前设置动画 CSS 变量，避免闪烁
    if (!replace) {
      if (isBack.current) {
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
    } else {
      // replace 时清空动画
      document.documentElement.style.setProperty("--vt-old-animation", "none")
      document.documentElement.style.setProperty("--vt-new-animation", "none")
    }

    const doNavigate = () => {
      // 更新历史栈
      if (replace) {
        // replace 模式：清空历史栈，只保留目标路径
        historyStack.length = 0
        historyStack.push(targetPath)
      } else if (isBack.current) {
        // 后退：移除当前路径
        if (historyStack.length > 1) {
          historyStack.pop()
        }
      } else {
        // 前进：添加新路径
        // 确保当前路径在历史栈中
        const currentIndex = historyStack.indexOf(pathname)
        if (currentIndex === -1) {
          historyStack.push(pathname)
        }
        // 添加目标路径
        historyStack.push(targetPath)
      }
      
      // 执行导航
      replace ? router.replace(targetPath) : router.push(targetPath)
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // 使用 requestAnimationFrame 确保 CSS 变量在视图过渡开始前已设置
      requestAnimationFrame(() => {
        const transition = document.startViewTransition(() => {
          doNavigate()
        })
        // 过渡完成后重置动画变量
        transition.finished.finally(() => {
          // 延迟清除，确保动画完全完成
          setTimeout(() => {
            document.documentElement.style.removeProperty("--vt-old-animation")
            document.documentElement.style.removeProperty("--vt-new-animation")
          }, 50)
        })
      })
    } else {
      doNavigate()
    }
  }

  /** 前进跳转 */
  function push(to: string) {
    navigate(to, false, "forward")
  }

  /** 替换当前页面 */
  function replace(to: string) {
    navigate(to, true, "forward")
  }

  /** 后退 */
  function back() {
    if (historyStack.length > 1) {
      const lastPath = historyStack[historyStack.length - 2]
      navigate(lastPath, false, "back")
    } else {
      // 已经到最初页面，回首页
      navigate("/", true)
    }
  }

  return { push, replace, back, isBack, historyStack }
}

