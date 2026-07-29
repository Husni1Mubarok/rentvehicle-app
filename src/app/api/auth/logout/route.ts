import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Use POST for logout to follow REST conventions and avoid caching issues
export async function POST(request: NextRequest) {
  // Prepare the response early so cookies can be set on it
  const response = NextResponse.redirect(new URL("/login", request.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Forward incoming cookies to Supabase
        getAll: () => request.cookies.getAll(),
        // When Supabase wants to set/delete cookies, apply them to the response
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Setting an empty value with maxAge 0 deletes the cookie
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Sign out the user; Supabase will invoke setAll to clear auth cookies
  await supabase.auth.signOut();

  return response;
}

// Optional: explicitly allow GET to also perform logout for backward compatibility
export async function GET(request: NextRequest) {
  return POST(request);
}
