"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { useViewTransitionRouter } from "@/hooks/use-view-transition-router"

interface ViewTransitionLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  replace?: boolean
}

export function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
  replace = false,
  ...props
}: ViewTransitionLinkProps) {
  const pathname = usePathname()
  const [isPending] = useTransition()
  const { push, replace: replaceRoute } = useViewTransitionRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果是外部链接或锚点链接，使用默认行为
    if (
      typeof href === "string" &&
      (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:"))
    ) {
      if (onClick) {
        onClick(e)
      }
      return
    }

    const targetPath = typeof href === "string" ? href : href.pathname || ""

    // 如果目标路径和当前路径相同，不触发动画，直接返回
    if (targetPath === pathname) {
      if (onClick) {
        onClick(e)
      }
      return
    }

    e.preventDefault()

    // 使用视图过渡路由进行导航
    if (replace) {
      replaceRoute(targetPath)
    } else {
      push(targetPath)
    }

    // 调用自定义 onClick 处理器
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-busy={isPending}
      {...props}
    >
      {children}
    </Link>
  )
}

