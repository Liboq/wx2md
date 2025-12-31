"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SmoothScrollLink({ href, children, className }: SmoothScrollLinkProps) {
  const pathname = usePathname()
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果是锚点链接且在当前页面
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      
      if (element) {
        const headerHeight = 64 // header 高度
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight - 16 // 额外 16px 间距
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
    // 如果是跨页面的锚点链接
    else if (href.includes("#") && !href.startsWith("#")) {
      const [path, hash] = href.split("#")
      if (pathname !== path) {
        // 跨页面导航，让 Next.js Link 处理
        return
      }
      e.preventDefault()
      const element = document.getElementById(hash)
      
      if (element) {
        const headerHeight = 64
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight - 16
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

