import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '12');
  
  const search = url.searchParams.get('search');
  const location = url.searchParams.get('location');
  const type = url.searchParams.get('type');
  const transmission = url.searchParams.get('transmission');
  const capacity = url.searchParams.get('capacity');
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');
  const sort = url.searchParams.get('sort') ?? 'newest';

  let query = supabase
    .from('vehicles')
    .select('*, images:vehicle_images(*)', { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (location) {
    query = query.eq('location', location);
  }
  if (type) {
    query = query.eq('type', type);
  }
  if (transmission) {
    query = query.eq('transmission', transmission);
  }
  if (capacity) {
    query = query.gte('capacity', Number(capacity));
  }
  if (minPrice) {
    query = query.gte('price_per_day', Number(minPrice));
  }
  if (maxPrice) {
    query = query.lte('price_per_day', Number(maxPrice));
  }

  // Sorting
  if (sort === 'price-low') {
    query = query.order('price_per_day', { ascending: true });
  } else if (sort === 'price-high') {
    query = query.order('price_per_day', { ascending: false });
  } else if (sort === 'rating') {
    query = query.order('rating', { ascending: false });
  } else {
    // newest
    query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    vehicles: data,
    page,
    limit,
    total: count || 0,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Insert into Supabase
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert([
        {
          name: body.name,
          type: body.type,
          location: body.location || 'Jakarta',
          transmission: body.transmission,
          capacity: Number(body.capacity),
          price_per_day: Number(body.price_per_day),
          rating: 5.0,
          status: 'available',
          description: body.description || ''
        }
      ])
      .select()
      .single();

    if (vehicleError) throw vehicleError;

    // Insert primary image if provided
    if (body.image_url) {
      const { error: imageError } = await supabase
        .from('vehicle_images')
        .insert([
          {
            vehicle_id: vehicle.id,
            image_url: body.image_url,
            is_primary: true
          }
        ]);
      
      if (imageError) throw imageError;
    }

    return NextResponse.json({ message: 'Kendaraan berhasil ditambahkan', vehicle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
