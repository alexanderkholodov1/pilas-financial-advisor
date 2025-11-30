import { Target, Users, TrendingUp } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface AboutSectionProps {
  t: Dictionary
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{t.about.description}</p>

            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Target className="h-5 w-5 text-primary" />
                {t.about.mission}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{t.about.missionText}</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-4 text-3xl font-bold text-foreground">10K+</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.nav.home === "Home" ? "Young users in Ecuador" : "Usuarios jóvenes en Ecuador"}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="mt-4 text-3xl font-bold text-foreground">$2M+</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.nav.home === "Home" ? "Savings tracked" : "Ahorros rastreados"}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 hover-lift sm:col-span-2">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">15+</div>
                <p className="mt-2 text-muted-foreground">
                  {t.nav.home === "Home"
                    ? "Partner financial institutions in Ecuador"
                    : "Instituciones financieras asociadas en Ecuador"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
