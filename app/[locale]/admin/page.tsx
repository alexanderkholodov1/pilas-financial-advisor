import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardShell } from "@/components/dashboard/shell"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries"

export default async function AdminPage({
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

  // Fetch user profile and check admin status
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect(`/${locale}/dashboard`)
  }

  // Fetch all users for admin view
  const { data: users, count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  // Fetch user type distribution
  const { data: usersByType } = await supabase.from("profiles").select("user_type")

  // Fetch total savings across all users
  const { data: allSavings } = await supabase
    .from("user_savings")
    .select("amount, storage_type, created_at")
    .eq("is_active", true)

  const t = getDictionary(locale as Locale)

  return (
    <DashboardShell locale={locale as Locale} profile={profile}>
      <AdminDashboard
        locale={locale as Locale}
        users={users || []}
        totalUsers={totalUsers || 0}
        usersByType={usersByType || []}
        allSavings={allSavings || []}
      />
    </DashboardShell>
  )
}
