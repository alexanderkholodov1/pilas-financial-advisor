import { SignupForm } from "@/components/auth/signup-form"
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries"
import Link from "next/link"
import { DollarSign } from "lucide-react"

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getDictionary(locale as Locale)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <Link href={`/${locale}`} className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <DollarSign className="h-6 w-6" />
        </div>
        <span className="text-2xl font-bold text-foreground">
          Pila<span className="text-primary">$</span>
        </span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">{t.auth.signup}</h1>
        <SignupForm locale={locale as Locale} t={t} />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {t.auth.hasAccount}{" "}
        <Link href={`/${locale}/login`} className="font-medium text-primary hover:underline">
          {t.auth.login}
        </Link>
      </p>
    </div>
  )
}
