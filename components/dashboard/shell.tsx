"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Locale } from "@/lib/i18n/dictionaries"
import type { Profile } from "@/lib/types/database"
import {
  DollarSign,
  LayoutDashboard,
  PiggyBank,
  BarChart3,
  Lightbulb,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  User,
  Shield,
} from "lucide-react"

interface DashboardShellProps {
  locale: Locale
  profile: Profile | null
  children: React.ReactNode
}

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelEn: "Overview", labelEs: "Resumen" },
  { href: "/dashboard/savings", icon: PiggyBank, labelEn: "Savings", labelEs: "Ahorros" },
  { href: "/dashboard/compare", icon: BarChart3, labelEn: "Compare", labelEs: "Comparar" },
  { href: "/dashboard/tips", icon: Lightbulb, labelEn: "Tips", labelEs: "Tips" },
]

export function DashboardShell({ locale, profile, children }: DashboardShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const otherLocale = locale === "en" ? "es" : "en"

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
    router.refresh()
  }

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`)
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <DollarSign className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Pila<span className="text-primary">$</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {locale === "en" ? item.labelEn : item.labelEs}
              </Link>
            )
          })}

          {profile?.is_admin && (
            <>
              <div className="my-4 border-t border-border" />
              <Link
                href={`/${locale}/admin`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.includes("/admin")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </>
          )}
        </nav>

        <div className="border-t border-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{profile?.full_name || profile?.email?.split("@")[0]}</p>
                  <p className="text-xs text-muted-foreground">{profile?.email}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/dashboard/settings`} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {locale === "en" ? "Settings" : "Configuración"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={pathname.replace(`/${locale}`, `/${otherLocale}`)} className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {locale === "en" ? "Español" : "English"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                {locale === "en" ? "Log Out" : "Cerrar Sesión"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <DollarSign className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-foreground">
            Pila<span className="text-primary">$</span>
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-card pt-16">
            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {locale === "en" ? item.labelEn : item.labelEs}
                  </Link>
                )
              })}

              {profile?.is_admin && (
                <>
                  <div className="my-4 border-t border-border" />
                  <Link
                    href={`/${locale}/admin`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      pathname.includes("/admin")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                </>
              )}
            </nav>

            <div className="absolute inset-x-0 bottom-0 border-t border-border p-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                {locale === "en" ? "Log Out" : "Cerrar Sesión"}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pl-64 lg:pt-0">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
