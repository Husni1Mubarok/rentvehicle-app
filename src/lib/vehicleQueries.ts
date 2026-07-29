import { supabase } from './supabaseClient';

export interface GetVehiclesParams {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  type?: string;
  transmission?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
}

export async function getVehicles(params: GetVehiclesParams) {
  const {
    page = 1,
    limit = 12,
    search,
    location,
    type,
    transmission,
    capacity,
    minPrice,
    maxPrice,
    sort = 'newest',
  } = params;

  let query = supabase.from('vehicles').select('*', { count: 'exact' });

  if (search) query = query.ilike('name', `%${search}%`);
  if (location) query = query.eq('location', location);
  if (type) query = query.eq('type', type);
  if (transmission) query = query.eq('transmission', transmission);
  if (capacity) query = query.eq('capacity', capacity);
  if (minPrice !== undefined) query = query.gte('price_per_day', minPrice);
  if (maxPrice !== undefined) query = query.lte('price_per_day', maxPrice);

  // Sorting
  switch (sort) {
    case 'price_asc':
      query = query.order('price_per_day', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price_per_day', { ascending: false });
      break;
    case 'rating_desc':
      query = query.order('rating', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await query.range(from, to);

  return { data, error, total: count ?? 0 };
}

export async function getVehicleById(id: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*, images(*)')
    .eq('id', id)
    .single();
  return { data, error };
}
