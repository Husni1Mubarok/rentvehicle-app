import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Checks if the current user has one of the allowed roles.
 * If not, redirects to an appropriate page.
 * Also enforces email confirmation.
 */
export async function requireRole(request: NextRequest, allowedRoles: string[]) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const currentPath = request.nextUrl.pathname;

  // Email confirmation guard
  if (user && !(user.user_metadata as Record<string, unknown>)?.email_confirmed_at && !user.email_confirmed_at) {
    return NextResponse.redirect(new URL('/confirm-email', request.url));
  }

  // If no user, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Fetch role from profile table
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  const role = (profile as { role?: string } | null)?.role ?? 'customer';

  if (!allowedRoles.includes(role)) {
    // Redirect based on trying to access admin area
    if (currentPath.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // For other protected areas, fallback to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allowed – continue processing
  return null;
}
