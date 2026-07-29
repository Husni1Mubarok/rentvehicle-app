import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token, password } = await request.json();
  if (!token || !password) {
    return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.headers.get('cookie') ? [{ name: 'cookie', value: request.headers.get('cookie')! }] : [] } }
  );

  // Verify the reset token (recovery) and update the password
  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'recovery',
  });

  if (verifyError) {
    return NextResponse.json({ error: verifyError.message }, { status: 400 });
  }

  // After successful verification, update the user's password
  const { error: updateError } = await supabase.auth.updateUser({
    password,
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }
  return NextResponse.json({ message: 'Password has been reset successfully.' }, { status: 200 });
}
