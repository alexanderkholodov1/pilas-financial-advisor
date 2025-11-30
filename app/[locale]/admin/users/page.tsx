import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardShell } from "@/components/dashboard/shell"
import { AdminUserManagement } from "@/components/admin/admin-user-management"
import type { Locale } from "@/lib/i18n/dictionaries"

export default async function AdminUsersPage({
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

  // Fetch all users with their savings data
  const { data: users } = await supabase
    .from("profiles")
    .select(
      `
      *,
      user_savings (
        id,
        amount,
        storage_type,
        institution_id,
        created_at
      )
    `,
    )
    .order("created_at", { ascending: false })

  return (
    <DashboardShell locale={locale as Locale} profile={profile}>
      <AdminUserManagement locale={locale as Locale} users={users || []} />
    </DashboardShell>
  )
}
