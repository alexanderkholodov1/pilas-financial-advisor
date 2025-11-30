import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const publicRoutes = ["/", "/en", "/es", "/en/login", "/es/login", "/en/signup", "/es/signup", "/auth/callback"]
const protectedPrefixes = ["/en/dashboard", "/es/dashboard", "/en/admin", "/es/admin"]

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Handle root path redirect to default language
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url))
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (isProtectedRoute && !user) {
    const locale = pathname.startsWith("/en") ? "en" : "es"
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // Check admin routes
  if (pathname.includes("/admin") && user) {
    // We'll check is_admin in the page component since we can't easily query here
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
