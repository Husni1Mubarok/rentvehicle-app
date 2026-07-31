import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: vehicle, error } = await supabase
      .from('vehicles')
      .select('*, images:vehicle_images(*)')
      .eq('id', id)
      .single();

    if (error || !vehicle) {
      return NextResponse.json({ error: 'Kendaraan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { data: updated, error } = await supabase
      .from('vehicles')
      .update({
        name: body.name,
        type: body.type,
        location: body.location,
        transmission: body.transmission,
        capacity: Number(body.capacity),
        price_per_day: Number(body.price_per_day),
        description: body.description,
        status: body.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json({ message: 'Gagal mengupdate kendaraan' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Kendaraan berhasil diupdate', vehicle: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Gagal menghapus kendaraan' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Kendaraan berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
