import { NextResponse } from 'next/server';
import { getMockVehicleById } from '@/lib/mockData';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vehicle = getMockVehicleById(id);

  if (!vehicle) {
    return NextResponse.json({ error: 'Kendaraan tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(vehicle);
}
