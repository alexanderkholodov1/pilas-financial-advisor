import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"

interface HeroSectionProps {
  locale: Locale
  t: Dictionary
}

export function HeroSection({ locale, t }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              {locale === "es" ? "Fintech para jóvenes ecuatorianos" : "Fintech for young Ecuadorians"}
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={`/${locale}/signup`}>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 sm:w-auto">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}#features`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                {locale === "es" ? "100% Manual - Sin conexión bancaria" : "100% Manual - No bank connection"}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                {locale === "es" ? "Tasas actualizadas de Ecuador" : "Updated Ecuador rates"}
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="animate-fade-in delay-200 lg:pl-8">
            <div className="relative">
              {/* Main card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xl hover-lift">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {locale === "es" ? "Tu Balance Total" : "Your Total Balance"}
                  </span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    +12.5%
                  </span>
                </div>
                <div className="text-3xl font-bold text-foreground">$2,450.00</div>
                <div className="mt-1 text-sm text-muted-foreground">USD</div>

                {/* Mini chart representation */}
                <div className="mt-6 flex h-20 items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 75, 95, 85, 100].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/20 transition-all hover:bg-primary/40"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating recommendation card */}
              <div className="absolute -bottom-6 -right-4 w-64 animate-slide-in-right delay-400 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {locale === "es" ? "Recomendación" : "Recommendation"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "es"
                        ? "JEP ofrece 9.5% anual en plazo fijo"
                        : "JEP offers 9.5% annually on fixed term"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -left-4 top-1/2 w-48 -translate-y-1/2 animate-slide-in-right delay-300 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="text-xs font-medium text-muted-foreground">
                  {locale === "es" ? "Distribución" : "Distribution"}
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{locale === "es" ? "Banco" : "Bank"}</span>
                    <span className="font-medium text-foreground">65%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{locale === "es" ? "Efectivo" : "Cash"}</span>
                    <span className="font-medium text-foreground">25%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{locale === "es" ? "Inversión" : "Investment"}</span>
                    <span className="font-medium text-foreground">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
