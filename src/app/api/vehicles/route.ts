import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { MOCK_VEHICLES } from '@/lib/mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export async function GET(request: Request) {
  try {
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

    let query = supabase.from('vehicles').select('*');

    if (search) query = query.ilike('name', `%${search}%`);
    if (location) query = query.eq('location', location);
    if (type) query = query.eq('type', type);
    if (transmission) query = query.eq('transmission', transmission);
    if (capacity) query = query.gte('capacity', Number(capacity));
    if (minPrice) query = query.gte('price_per_day', Number(minPrice));
    if (maxPrice) query = query.lte('price_per_day', Number(maxPrice));

    if (sort === 'price-low') {
      query = query.order('price_per_day', { ascending: true });
    } else if (sort === 'price-high') {
      query = query.order('price_per_day', { ascending: false });
    } else if (sort === 'rating') {
      query = query.order('rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data: vehicleData, error } = await query;

    if (error || !vehicleData) {
      console.warn('[API/Vehicles] Supabase error, falling back to mock data:', error?.message);
      // Fallback filtering on MOCK_VEHICLES
      let filtered = [...MOCK_VEHICLES];
      if (search) filtered = filtered.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
      if (type) filtered = filtered.filter(v => v.type.toLowerCase() === type.toLowerCase());
      if (transmission) filtered = filtered.filter(v => v.transmission.toLowerCase() === transmission.toLowerCase());
      if (capacity) filtered = filtered.filter(v => v.capacity >= Number(capacity));
      if (minPrice) filtered = filtered.filter(v => v.price_per_day >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(v => v.price_per_day <= Number(maxPrice));

      if (sort === 'price-low') filtered.sort((a, b) => a.price_per_day - b.price_per_day);
      if (sort === 'price-high') filtered.sort((a, b) => b.price_per_day - a.price_per_day);

      const total = filtered.length;
      let actualPage = page;
      let from = (actualPage - 1) * limit;
      if (from >= total && total > 0) {
        actualPage = 1;
        from = 0;
      }
      const paged = filtered.slice(from, from + limit);

      return NextResponse.json({ vehicles: paged, page: actualPage, limit, total });
    }

    // Fetch vehicle images separately to prevent relationship join errors
    const { data: imageList } = await supabase.from('vehicle_images').select('*');

    const mappedVehicles = vehicleData.map((v) => {
      const vImages = imageList?.filter((img) => img.vehicle_id === v.id) || [];
      return {
        ...v,
        images: vImages.length > 0 ? vImages : [{ image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', is_primary: true }]
      };
    });

    const total = mappedVehicles.length;
    let actualPage = page;
    let from = (actualPage - 1) * limit;
    if (from >= total && total > 0) {
      actualPage = 1;
      from = 0;
    }
    const paged = mappedVehicles.slice(from, from + limit);

    return NextResponse.json({
      vehicles: paged,
      page: actualPage,
      limit,
      total,
    });
  } catch (err: any) {
    console.error('[API/Vehicles] Exception:', err);
    return NextResponse.json({ vehicles: MOCK_VEHICLES.slice(0, 12), page: 1, limit: 12, total: MOCK_VEHICLES.length });
  }
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
