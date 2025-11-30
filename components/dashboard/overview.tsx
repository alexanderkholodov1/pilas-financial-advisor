"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"
import type { Profile, UserSavings, Institution, FinancialTip, FinancialProduct } from "@/lib/types/database"
import { Plus, TrendingUp, PiggyBank, Lightbulb, ArrowRight, Building2, Banknote, Landmark, Wallet } from "lucide-react"
import { AddSavingsDialog } from "./add-savings-dialog"
import Link from "next/link"

interface DashboardOverviewProps {
  locale: Locale
  t: Dictionary
  profile: Profile | null
  savings: UserSavings[]
  institutions: Institution[]
  tips: FinancialTip[]
  products: FinancialProduct[]
}

const COLORS = [
  "hsl(160, 60%, 35%)",
  "hsl(200, 60%, 45%)",
  "hsl(85, 60%, 55%)",
  "hsl(280, 40%, 55%)",
  "hsl(25, 60%, 50%)",
]

const storageTypeIcons: Record<string, typeof Wallet> = {
  cash: Banknote,
  bank_account: Landmark,
  cooperative: Building2,
  investment: TrendingUp,
  other: Wallet,
}

export function DashboardOverview({
  locale,
  t,
  profile,
  savings,
  institutions,
  tips,
  products,
}: DashboardOverviewProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  // Calculate total savings
  const totalSavings = savings.reduce((acc, s) => acc + Number(s.amount), 0)

  // Calculate savings by storage type
  const savingsByType = savings.reduce(
    (acc, s) => {
      const type = s.storage_type
      acc[type] = (acc[type] || 0) + Number(s.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(savingsByType).map(([name, value]) => ({
    name:
      locale === "es"
        ? {
            cash: "Efectivo",
            bank_account: "Banco",
            cooperative: "Cooperativa",
            investment: "Inversión",
            other: "Otro",
          }[name]
        : { cash: "Cash", bank_account: "Bank", cooperative: "Cooperative", investment: "Investment", other: "Other" }[
            name
          ],
    value,
  }))

  // Get top recommendations based on user profile
  const topProducts = products.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t.dashboard.welcome}, {profile?.full_name?.split(" ")[0] || profile?.email?.split("@")[0]}!
          </h1>
          <p className="mt-1 text-muted-foreground">{t.dashboard.overview}</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          {t.dashboard.addSavings}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.dashboard.totalSavings}</CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {savings.length} {locale === "es" ? "entradas" : "entries"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Mejor Tasa Disponible" : "Best Available Rate"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">9.50%</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "es" ? "Plazo fijo anual" : "Annual fixed term"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Instituciones" : "Institutions"}
            </CardTitle>
            <Building2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{institutions.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "es" ? "Bancos y cooperativas" : "Banks and cooperatives"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Tips Disponibles" : "Available Tips"}
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{tips.length}+</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "es" ? "Consejos financieros" : "Financial advice"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Savings Distribution Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.dashboard.savingsDistribution}</CardTitle>
          </CardHeader>
          <CardContent>
            {savings.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <PiggyBank className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">{t.dashboard.noSavings}</p>
                <Button onClick={() => setDialogOpen(true)} variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  {t.dashboard.addSavings}
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm text-muted-foreground">{entry.name}</span>
                      </div>
                      <span className="font-medium text-foreground">
                        ${entry.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.dashboard.recommendations}</CardTitle>
            <Link href={`/${locale}/dashboard/compare`}>
              <Button variant="ghost" size="sm">
                {locale === "es" ? "Ver más" : "See more"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{locale === "es" ? product.name_es : product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.institution?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{product.interest_rate}%</p>
                    <p className="text-xs text-muted-foreground">{locale === "es" ? "anual" : "annual"}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Savings & Tips */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Savings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.dashboard.recentActivity}</CardTitle>
            <Link href={`/${locale}/dashboard/savings`}>
              <Button variant="ghost" size="sm">
                {locale === "es" ? "Ver todo" : "View all"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {savings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t.dashboard.noSavings}</p>
            ) : (
              <div className="space-y-3">
                {savings.slice(0, 5).map((saving) => {
                  const Icon = storageTypeIcons[saving.storage_type] || Wallet
                  return (
                    <div
                      key={saving.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {saving.description ||
                              (locale === "es"
                                ? {
                                    cash: "Efectivo",
                                    bank_account: "Cuenta Bancaria",
                                    cooperative: "Cooperativa",
                                    investment: "Inversión",
                                    other: "Otro",
                                  }[saving.storage_type]
                                : {
                                    cash: "Cash",
                                    bank_account: "Bank Account",
                                    cooperative: "Cooperative",
                                    investment: "Investment",
                                    other: "Other",
                                  }[saving.storage_type])}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {saving.institution?.name || (locale === "es" ? "Sin institución" : "No institution")}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-foreground">
                        ${Number(saving.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Tips */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{locale === "es" ? "Tips Financieros" : "Financial Tips"}</CardTitle>
            <Link href={`/${locale}/dashboard/tips`}>
              <Button variant="ghost" size="sm">
                {locale === "es" ? "Ver más" : "See more"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.id} className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/20">
                    <Lightbulb className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{locale === "es" ? tip.title_es : tip.title_en}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {locale === "es" ? tip.content_es : tip.content_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Add Savings Dialog */}
      <AddSavingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        locale={locale}
        t={t}
        institutions={institutions}
      />
    </div>
  )
}
