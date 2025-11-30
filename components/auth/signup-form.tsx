"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"
import { Loader2, GraduationCap, Briefcase, Building2, CheckCircle2 } from "lucide-react"

interface SignupFormProps {
  locale: Locale
  t: Dictionary
}

export function SignupForm({ locale, t }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [userType, setUserType] = useState<"student" | "small_business" | "enterprise">("student")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError(
        locale === "es" ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters",
      )
      setLoading(false)
      return
    }

    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/${locale}/dashboard`,
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    })

    if (error) {
      setError(
        locale === "es" ? "Error al crear la cuenta. Intenta de nuevo." : "Error creating account. Please try again.",
      )
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          {locale === "es" ? "¡Cuenta creada!" : "Account created!"}
        </h2>
        <p className="mt-2 text-muted-foreground">{t.auth.checkEmail}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">{t.auth.fullName}</Label>
        <Input
          id="fullName"
          type="text"
          placeholder={locale === "es" ? "Juan Pérez" : "John Doe"}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.auth.email}</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t.auth.password}</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className="space-y-3">
        <Label>{t.auth.userType}</Label>
        <RadioGroup
          value={userType}
          onValueChange={(value) => setUserType(value as typeof userType)}
          className="grid gap-3"
        >
          <label
            htmlFor="student"
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
              userType === "student" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="student" id="student" />
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{t.auth.student}</span>
          </label>

          <label
            htmlFor="small_business"
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
              userType === "small_business" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="small_business" id="small_business" />
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{t.auth.smallBusiness}</span>
          </label>

          <label
            htmlFor="enterprise"
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
              userType === "enterprise" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="enterprise" id="enterprise" />
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.auth.enterprise}</span>
              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-xs font-medium text-accent">Premium</span>
            </div>
          </label>
        </RadioGroup>
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.common.loading}
          </>
        ) : (
          t.auth.signupCta
        )}
      </Button>
    </form>
  )
}
