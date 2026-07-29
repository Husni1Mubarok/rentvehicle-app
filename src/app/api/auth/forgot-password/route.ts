import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.headers.get('cookie') ? [{ name: 'cookie', value: request.headers.get('cookie')! }] : [] } }
  );

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: 'Password reset email sent.' }, { status: 200 });
}
