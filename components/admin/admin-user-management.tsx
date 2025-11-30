"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Locale } from "@/lib/i18n/dictionaries"
import type { Profile } from "@/lib/types/database"
import {
  Shield,
  ShieldOff,
  Search,
  Eye,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AdminUserManagementProps {
  locale: Locale
  users: (Profile & { user_savings?: any[] })[]
}

export function AdminUserManagement({ locale, users: initialUsers }: AdminUserManagementProps) {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const t =
    locale === "es"
      ? {
          title: "Gestión de Usuarios",
          description: "Administra usuarios, permisos y visualiza información detallada",
          search: "Buscar usuarios...",
          filterAll: "Todos",
          filterStudent: "Estudiantes",
          filterBusiness: "Empresas",
          filterEnterprise: "Institucionales",
          filterAdmin: "Administradores",
          name: "Nombre",
          email: "Correo",
          type: "Tipo",
          status: "Estado",
          registered: "Registro",
          actions: "Acciones",
          makeAdmin: "Hacer Admin",
          removeAdmin: "Quitar Admin",
          viewDetails: "Ver Detalles",
          userDetails: "Detalles del Usuario",
          close: "Cerrar",
          totalSavings: "Ahorros Totales",
          savingsEntries: "Entradas de Ahorro",
          memberSince: "Miembro desde",
          onboarding: "Onboarding",
          completed: "Completado",
          pending: "Pendiente",
          active: "Activo",
          admin: "Admin",
          student: "Estudiante",
          smallBusiness: "Pequeña Empresa",
          enterprise: "Empresa Grande",
          success: "Éxito",
          error: "Error",
          adminGranted: "Permisos de administrador otorgados",
          adminRevoked: "Permisos de administrador revocados",
          cannotRevokeYourself: "No puedes quitarte tus propios permisos de admin",
        }
      : {
          title: "User Management",
          description: "Manage users, permissions, and view detailed information",
          search: "Search users...",
          filterAll: "All",
          filterStudent: "Students",
          filterBusiness: "Small Business",
          filterEnterprise: "Enterprise",
          filterAdmin: "Admins",
          name: "Name",
          email: "Email",
          type: "Type",
          status: "Status",
          registered: "Registered",
          actions: "Actions",
          makeAdmin: "Make Admin",
          removeAdmin: "Remove Admin",
          viewDetails: "View Details",
          userDetails: "User Details",
          close: "Close",
          totalSavings: "Total Savings",
          savingsEntries: "Savings Entries",
          memberSince: "Member Since",
          onboarding: "Onboarding",
          completed: "Completed",
          pending: "Pending",
          active: "Active",
          admin: "Admin",
          student: "Student",
          smallBusiness: "Small Business",
          enterprise: "Enterprise",
          success: "Success",
          error: "Error",
          adminGranted: "Admin permissions granted",
          adminRevoked: "Admin permissions revoked",
          cannotRevokeYourself: "You cannot revoke your own admin permissions",
        }

  // Filter users based on search and type
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      filterType === "all" ||
      (filterType === "admin" && user.is_admin) ||
      (filterType !== "admin" && user.user_type === filterType)

    return matchesSearch && matchesType
  })

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    setIsLoading(true)
    try {
      // Check if trying to revoke own admin
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      if (currentUser?.id === userId && currentStatus) {
        alert(t.cannotRevokeYourself)
        setIsLoading(false)
        return
      }

      const { error } = await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", userId)

      if (error) throw error

      // Update local state
      setUsers(users.map((u) => (u.id === userId ? { ...u, is_admin: !currentStatus } : u)))

      alert(currentStatus ? t.adminRevoked : t.adminGranted)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error toggling admin status:", error)
      alert(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserTypeLabel = (type: string) => {
    if (locale === "es") {
      return { student: "Estudiante", small_business: "Pequeña Empresa", enterprise: "Empresa Grande" }[type]
    }
    return type.replace("_", " ")
  }

  const calculateTotalSavings = (user: Profile & { user_savings?: any[] }) => {
    if (!user.user_savings) return 0
    return user.user_savings.reduce((sum, saving) => sum + Number(saving.amount), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{t.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.description}</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filterAll}</SelectItem>
                <SelectItem value="student">{t.filterStudent}</SelectItem>
                <SelectItem value="small_business">{t.filterBusiness}</SelectItem>
                <SelectItem value="enterprise">{t.filterEnterprise}</SelectItem>
                <SelectItem value="admin">{t.filterAdmin}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredUsers.length} {t.filterAll}
          </CardTitle>
          <CardDescription>
            {locale === "es"
              ? "Gestiona permisos y visualiza información detallada de cada usuario"
              : "Manage permissions and view detailed information for each user"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.name}</TableHead>
                  <TableHead>{t.email}</TableHead>
                  <TableHead>{t.type}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{locale === "es" ? "Ahorros" : "Savings"}</TableHead>
                  <TableHead>{t.registered}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const totalSavings = calculateTotalSavings(user)
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name || "-"}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.user_type === "enterprise"
                              ? "default"
                              : user.user_type === "small_business"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {getUserTypeLabel(user.user_type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.is_admin ? (
                          <Badge className="bg-primary">
                            <Shield className="mr-1 h-3 w-3" />
                            {t.admin}
                          </Badge>
                        ) : user.onboarding_completed ? (
                          <Badge variant="outline" className="border-success text-success">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {t.active}
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <XCircle className="mr-1 h-3 w-3" />
                            {t.pending}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${totalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString(locale === "es" ? "es-EC" : "en-US")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{t.userDetails}</DialogTitle>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label className="text-muted-foreground">{t.name}</Label>
                                      <p className="font-medium">{selectedUser.full_name || "-"}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-muted-foreground">{t.email}</Label>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{selectedUser.email}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-muted-foreground">{t.type}</Label>
                                      <p className="font-medium">{getUserTypeLabel(selectedUser.user_type)}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-muted-foreground">{t.memberSince}</Label>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                          {new Date(selectedUser.created_at).toLocaleDateString(
                                            locale === "es" ? "es-EC" : "en-US",
                                            { year: "numeric", month: "long", day: "numeric" },
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid gap-4 sm:grid-cols-3">
                                    <Card>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                          {t.totalSavings}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4 text-success" />
                                          <span className="text-2xl font-bold">
                                            $
                                            {calculateTotalSavings(selectedUser).toLocaleString("en-US", {
                                              minimumFractionDigits: 2,
                                            })}
                                          </span>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                          {t.savingsEntries}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex items-center gap-2">
                                          <TrendingUp className="h-4 w-4 text-accent" />
                                          <span className="text-2xl font-bold">
                                            {selectedUser.user_savings?.length || 0}
                                          </span>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                          {t.onboarding}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex items-center gap-2">
                                          {selectedUser.onboarding_completed ? (
                                            <>
                                              <CheckCircle className="h-4 w-4 text-success" />
                                              <span className="text-lg font-bold text-success">{t.completed}</span>
                                            </>
                                          ) : (
                                            <>
                                              <XCircle className="h-4 w-4 text-warning" />
                                              <span className="text-lg font-bold text-warning">{t.pending}</span>
                                            </>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant={user.is_admin ? "destructive" : "default"}
                            size="sm"
                            onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                            disabled={isLoading}
                          >
                            {user.is_admin ? (
                              <>
                                <ShieldOff className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
