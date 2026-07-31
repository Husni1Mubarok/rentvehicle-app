import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from '@/lib/requireRole';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const currentPath = request.nextUrl.pathname;

  // Default role
  let role = "customer";

  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role) {
      role = profile.role;
    }
  }

  // Email confirmation guard (already added earlier)

  // 1. Auth routes (/login, /register, dll)
  const isAuthRoute = currentPath === "/login" || currentPath === "/register" || currentPath === "/forgot-password" || currentPath === "/reset-password";
  if (isAuthRoute && user) {
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    if (role === "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL(redirectTo || "/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL(redirectTo || "/dashboard", request.url));
  }

  // 2. Customer protected routes
  const isCustomerRoute = currentPath.startsWith("/dashboard") || currentPath.startsWith("/booking") || currentPath.startsWith("/profile");
  if (isCustomerRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Admin protected routes (admin and super_admin)
  const isAdminRoute = currentPath.startsWith("/admin");
  if (isAdminRoute) {
    const adminCheck = await requireRole(request, ["admin", "super_admin"]);
    if (adminCheck) return adminCheck;
  }

  // 4. Super Admin only routes
  if (currentPath.startsWith("/admin/super")) {
    const superCheck = await requireRole(request, ["super_admin"]);
    if (superCheck) return superCheck;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};