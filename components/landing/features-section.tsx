import { PiggyBank, BarChart3, Lightbulb, GraduationCap, Shield, Smartphone } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface FeaturesSectionProps {
  t: Dictionary
}

const featureIcons = {
  savings: PiggyBank,
  compare: BarChart3,
  recommendations: Lightbulb,
  tips: GraduationCap,
  security: Shield,
  mobile: Smartphone,
}

export function FeaturesSection({ t }: FeaturesSectionProps) {
  const features = [
    { key: "savings" as const, ...t.features.savings },
    { key: "compare" as const, ...t.features.compare },
    { key: "recommendations" as const, ...t.features.recommendations },
    { key: "tips" as const, ...t.features.tips },
    { key: "security" as const, ...t.features.security },
    { key: "mobile" as const, ...t.features.mobile },
  ]

  return (
    <section id="features" className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{t.features.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.key]
            return (
              <div
                key={feature.key}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover-lift hover:border-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
