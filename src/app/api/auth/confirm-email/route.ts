import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    // In a real app you would verify the token against the DB.
    // For this mock setup we simply accept any non‑empty token.
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (_e) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}
