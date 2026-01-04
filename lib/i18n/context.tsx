"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Language, translations } from "./translations"

type Translations = typeof translations.zh

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  useEffect(() => {
    // 从 localStorage 读取保存的语言设置
    const savedLanguage = localStorage.getItem("language") as Language | null
    let initialLanguage: Language = "zh"
    
    if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
      initialLanguage = savedLanguage
    } else {
      // 根据浏览器语言自动检测
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("en")) {
        initialLanguage = "en"
      }
    }
    
    setLanguageState(initialLanguage)
    document.documentElement.lang = initialLanguage === "zh" ? "zh-CN" : "en"
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    // 更新 HTML lang 属性
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

