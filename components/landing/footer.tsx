import Link from "next/link"
import { DollarSign } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"

interface LandingFooterProps {
  locale: Locale
  t: Dictionary
}

export function LandingFooter({ locale, t }: LandingFooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Pila<span className="text-primary">$</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground">{t.footer.product}</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}#features`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#pricing`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.pricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground">{t.footer.company}</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}#about`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:contact@pilas.app`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground">{t.footer.legal}</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pila$. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
