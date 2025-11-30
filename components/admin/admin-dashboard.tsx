"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { Locale } from "@/lib/i18n/dictionaries"
import type { Profile } from "@/lib/types/database"
import { Users, DollarSign, TrendingUp, Activity, Settings } from "lucide-react"
import Link from "next/link"

interface AdminDashboardProps {
  locale: Locale
  users: Profile[]
  totalUsers: number
  usersByType: { user_type: string }[]
  allSavings: { amount: number; storage_type: string; created_at: string }[]
}

const COLORS = ["hsl(160, 60%, 35%)", "hsl(200, 60%, 45%)", "hsl(85, 60%, 55%)"]

export function AdminDashboard({ locale, users, totalUsers, usersByType, allSavings }: AdminDashboardProps) {
  // Calculate stats
  const totalSavingsAmount = allSavings.reduce((acc, s) => acc + Number(s.amount), 0)

  // User type distribution
  const typeDistribution = usersByType.reduce(
    (acc, u) => {
      acc[u.user_type] = (acc[u.user_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const typeData = Object.entries(typeDistribution).map(([name, value]) => ({
    name:
      locale === "es"
        ? { student: "Estudiantes", small_business: "Pequeñas Empresas", enterprise: "Empresas" }[name]
        : { student: "Students", small_business: "Small Business", enterprise: "Enterprise" }[name],
    value,
  }))

  // Savings by storage type
  const savingsByStorage = allSavings.reduce(
    (acc, s) => {
      acc[s.storage_type] = (acc[s.storage_type] || 0) + Number(s.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const storageData = Object.entries(savingsByStorage).map(([name, value]) => ({
    name:
      locale === "es"
        ? {
            cash: "Efectivo",
            bank_account: "Banco",
            cooperative: "Cooperativa",
            investment: "Inversión",
            other: "Otro",
          }[name]
        : name.replace("_", " "),
    value,
  }))

  // Recent signups (last 7 days simulation)
  const recentUsers = users.filter((u) => {
    const created = new Date(u.created_at)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return created >= weekAgo
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {locale === "es" ? "Panel de Administración" : "Admin Dashboard"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {locale === "es" ? "Visualiza estadísticas y gestiona usuarios" : "View statistics and manage users"}
          </p>
        </div>
        <Link href={`/${locale}/admin/users`}>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            {locale === "es" ? "Gestionar Usuarios" : "Manage Users"}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Total Usuarios" : "Total Users"}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              +{recentUsers} {locale === "es" ? "esta semana" : "this week"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Ahorros Totales" : "Total Savings"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalSavingsAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {allSavings.length} {locale === "es" ? "entradas" : "entries"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Promedio por Usuario" : "Avg per User"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalUsers > 0 ? (totalSavingsAmount / totalUsers).toFixed(2) : "0.00"}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">USD</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Tasa de Actividad" : "Activity Rate"}
            </CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalUsers > 0 ? Math.round((users.filter((u) => u.onboarding_completed).length / totalUsers) * 100) : 0}
              %
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "es" ? "Onboarding completado" : "Onboarding completed"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === "es" ? "Distribución por Tipo" : "Distribution by Type"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {typeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Savings by Storage Type */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === "es" ? "Ahorros por Tipo de Almacenamiento" : "Savings by Storage Type"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storageData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                  />
                  <Bar dataKey="value" fill="hsl(160, 60%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === "es" ? "Usuarios Recientes" : "Recent Users"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === "es" ? "Nombre" : "Name"}</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>{locale === "es" ? "Tipo" : "Type"}</TableHead>
                <TableHead>{locale === "es" ? "Estado" : "Status"}</TableHead>
                <TableHead>{locale === "es" ? "Registro" : "Registered"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 10).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name || "-"}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
                      {locale === "es"
                        ? { student: "Estudiante", small_business: "Empresa", enterprise: "Institucional" }[
                            user.user_type
                          ]
                        : user.user_type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.is_admin ? (
                      <Badge className="bg-primary">Admin</Badge>
                    ) : user.onboarding_completed ? (
                      <Badge variant="outline" className="text-success border-success">
                        {locale === "es" ? "Activo" : "Active"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">{locale === "es" ? "Pendiente" : "Pending"}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString(locale === "es" ? "es-EC" : "en-US")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
