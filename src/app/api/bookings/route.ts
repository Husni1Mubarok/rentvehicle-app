import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { uploadDocument } from '@/lib/storage/uploadHelper';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const vehicle_id = formData.get('vehicle_id') as string;
    const borrower_name = formData.get('borrower_name') as string;
    const whatsapp_number = formData.get('whatsapp_number') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const purpose = formData.get('purpose') as string;
    const total_price = formData.get('total_price') as string;
    
    const ktpFile = formData.get('ktp') as File;
    const simFile = formData.get('sim') as File;

    if (!vehicle_id || !borrower_name || !whatsapp_number || !start_date || !end_date || !ktpFile || !simFile) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 });
    }

    // 1. Upload KTP and SIM
    let ktp_url = '';
    let sim_url = '';
    try {
      ktp_url = await uploadDocument(ktpFile, 'ktp');
      sim_url = await uploadDocument(simFile, 'sim');
    } catch (uploadError: unknown) {
      const msg = uploadError instanceof Error ? uploadError.message : 'Upload gagal';
      return NextResponse.json({ message: msg }, { status: 500 });
    }

    // 2. Insert into database
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          vehicle_id,
          borrower_name,
          whatsapp_number,
          start_date,
          end_date,
          purpose,
          total_price: parseFloat(total_price || '0'),
          ktp_url,
          sim_url,
          status: 'pending' // Default status
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ message: 'Gagal menyimpan data booking' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking berhasil dibuat', data }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Terjadi kesalahan pada server';
    console.error('Server error:', error);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
