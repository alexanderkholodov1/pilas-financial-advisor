import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"

interface PricingSectionProps {
  locale: Locale
  t: Dictionary
}

export function PricingSection({ locale, t }: PricingSectionProps) {
  const plans = [
    { key: "free" as const, ...t.pricing.free, popular: false },
    { key: "business" as const, ...t.pricing.business, popular: true },
    { key: "enterprise" as const, ...t.pricing.enterprise, popular: false },
  ]

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border p-8 transition-all hover-lift ${
                plan.popular ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  {locale === "es" ? "Más Popular" : "Most Popular"}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href={plan.key === "enterprise" ? `mailto:contact@pilas.app` : `/${locale}/signup`}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
