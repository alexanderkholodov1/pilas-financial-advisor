import type React from "react"
import { I18nProvider } from "@/lib/i18n/context"
import type { Locale } from "@/lib/i18n/dictionaries"
import { notFound } from "next/navigation"

const locales = ["en", "es"] as const

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <I18nProvider locale={locale as Locale}>
      <div lang={locale}>{children}</div>
    </I18nProvider>
  )
}
