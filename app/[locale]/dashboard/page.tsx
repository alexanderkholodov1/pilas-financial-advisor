import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardOverview } from "@/components/dashboard/overview"
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user savings
  const { data: savings } = await supabase
    .from("user_savings")
    .select("*, institution:institutions(*)")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  // Fetch institutions for dropdown
  const { data: institutions } = await supabase.from("institutions").select("*").eq("is_active", true).order("name")

  // Fetch financial tips
  const { data: tips } = await supabase
    .from("financial_tips")
    .select("*")
    .eq("is_active", true)
    .contains("target_user_type", [profile?.user_type || "student"])
    .limit(3)

  // Fetch financial products for recommendations
  const { data: products } = await supabase
    .from("financial_products")
    .select("*, institution:institutions(*)")
    .eq("is_active", true)
    .eq("is_youth_friendly", true)
    .order("interest_rate", { ascending: false })
    .limit(5)

  const t = getDictionary(locale as Locale)

  return (
    <DashboardShell locale={locale as Locale} profile={profile}>
      <DashboardOverview
        locale={locale as Locale}
        t={t}
        profile={profile}
        savings={savings || []}
        institutions={institutions || []}
        tips={tips || []}
        products={products || []}
      />
    </DashboardShell>
  )
}
