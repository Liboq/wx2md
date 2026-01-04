"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/context"
import { Language } from "@/lib/i18n/translations"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] min-w-[44px]"
          aria-label="切换语言"
        >
          <Languages className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="clay-card min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? "bg-accent/50 font-semibold" : ""
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

