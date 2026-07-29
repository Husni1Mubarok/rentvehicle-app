import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [] } }
    );

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Verification email sent.' }, { status: 200 });
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Unexpected error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
