import { NextResponse } from 'next/server';
import { getMockVehicles } from '@/lib/mockData';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '12');
  const search = url.searchParams.get('search') ?? undefined;
  const location = url.searchParams.get('location') ?? undefined;
  const type = url.searchParams.get('type') ?? undefined;
  const transmission = url.searchParams.get('transmission') ?? undefined;
  const capacity = url.searchParams.get('capacity')
    ? Number(url.searchParams.get('capacity'))
    : undefined;
  const minPrice = url.searchParams.get('minPrice')
    ? Number(url.searchParams.get('minPrice'))
    : undefined;
  const maxPrice = url.searchParams.get('maxPrice')
    ? Number(url.searchParams.get('maxPrice'))
    : undefined;
  const sort = url.searchParams.get('sort') ?? 'newest';

  const { data, total } = getMockVehicles({
    page,
    limit,
    search,
    location,
    type,
    transmission,
    capacity,
    minPrice,
    maxPrice,
    sort,
  });

  return NextResponse.json({
    vehicles: data,
    page,
    limit,
    total,
  });
}
