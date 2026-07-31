import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { booking_id, status } = await request.json();

    if (!booking_id || !status) {
      return NextResponse.json({ message: 'booking_id dan status wajib diisi' }, { status: 400 });
    }

    // Update status booking di database
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: status })
      .eq('id', booking_id)
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ message: 'Gagal memperbarui status booking' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Status booking berhasil diperbarui', data }, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Terjadi kesalahan pada server';
    console.error('Server error:', error);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
