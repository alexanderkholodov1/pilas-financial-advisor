"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type Dictionary, type Locale, getDictionary } from "./dictionaries"

interface I18nContextType {
  locale: Locale
  t: Dictionary
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  const t = getDictionary(locale)

  return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
