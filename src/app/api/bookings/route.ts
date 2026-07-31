import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db/server';


export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('[API/Bookings] Current Auth User:', user ? user.id : 'NULL - Not Authenticated!');
    
    const formData = await request.formData();
    
    const vehicle_id = formData.get('vehicle_id') as string;
    const borrower_name = formData.get('borrower_name') as string;
    const whatsapp_number = formData.get('whatsapp_number') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const purpose = formData.get('purpose') as string;
    const total_price = formData.get('total_price') as string;
    
    const ktp_url = formData.get('ktp_url') as string;
    const sim_url = formData.get('sim_url') as string;

    if (!vehicle_id || !borrower_name || !whatsapp_number || !start_date || !end_date || !ktp_url || !sim_url) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 });
    }

    // Generate required schema fields
    const booking_code = `RV-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const pickup_date = start_date;
    const return_date = end_date;
    
    // Calculate total days
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const total_day = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Ensure user exists in public.users table to satisfy FK constraint
    if (user?.id) {
      try {
        await supabase.from('users').upsert({
          id: user.id,
          name: borrower_name || 'Pelanggan',
          email: user.email || `${user.id}@example.com`,
          phone: whatsapp_number || null
        }, { onConflict: 'id' });
      } catch (err) {
        console.warn('Could not auto-create user in public.users:', err);
      }
    }

    const payload = {
      user_id: user?.id,
      booking_code,
      vehicle_id,
      pickup_date,
      return_date,
      total_day,
      borrower_name,
      whatsapp_number,
      start_date,
      end_date,
      purpose,
      total_price: parseFloat(total_price || '0'),
      ktp_url,
      sim_url,
      status: 'pending'
    };

    // 2. Insert into database
    let { data, error } = await supabase
      .from('bookings')
      .insert([payload])
      .select();

    // Fallback: If user_id FK constraint fails, retry with user_id = null
    if (error && error.message.includes('bookings_user_id_fkey')) {
      console.warn('Retrying insert without user_id FK...');
      const fallbackPayload = { ...payload, user_id: null };
      const retryResult = await supabase
        .from('bookings')
        .insert([fallbackPayload])
        .select();
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error('Database error:', error);
      // Let's return the actual error message so the client sees what went wrong!
      return NextResponse.json({ message: 'Gagal menyimpan data booking: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking berhasil dibuat', data }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Terjadi kesalahan pada server';
    console.error('Server error:', error);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
