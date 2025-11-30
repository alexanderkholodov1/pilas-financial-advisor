import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { AboutSection } from "@/components/landing/about-section"
import { LandingFooter } from "@/components/landing/footer"
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries"

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getDictionary(locale as Locale)

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader locale={locale as Locale} t={t} />
      <main>
        <HeroSection locale={locale as Locale} t={t} />
        <FeaturesSection t={t} />
        <PricingSection locale={locale as Locale} t={t} />
        <AboutSection t={t} />
      </main>
      <LandingFooter locale={locale as Locale} t={t} />
    </div>
  )
}
