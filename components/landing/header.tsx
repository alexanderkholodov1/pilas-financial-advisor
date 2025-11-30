"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, Globe, DollarSign } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"

interface LandingHeaderProps {
  locale: Locale
  t: Dictionary
}

export function LandingHeader({ locale, t }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const otherLocale = locale === "en" ? "es" : "en"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Pila<span className="text-primary">$</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${locale}#features`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.features}
          </Link>
          <Link
            href={`/${locale}#pricing`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.pricing}
          </Link>
          <Link
            href={`/${locale}#about`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.about}
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/en">English</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/es">Español</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/${locale}/login`}>
            <Button variant="ghost" size="sm">
              {t.nav.login}
            </Button>
          </Link>
          <Link href={`/${locale}/signup`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              {t.nav.signup}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href={`/${locale}#features`}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.features}
            </Link>
            <Link
              href={`/${locale}#pricing`}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href={`/${locale}#about`}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <hr className="my-2 border-border" />
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Globe className="h-4 w-4" />
              {locale === "en" ? "Español" : "English"}
            </Link>
            <hr className="my-2 border-border" />
            <Link
              href={`/${locale}/login`}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.login}
            </Link>
            <Link href={`/${locale}/signup`} onClick={() => setMobileMenuOpen(false)}>
              <Button className="mt-2 w-full bg-primary hover:bg-primary/90">{t.nav.signup}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
