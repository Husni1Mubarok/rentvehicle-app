/**
 * mockData.ts
 * Data kendaraan statis untuk digunakan ketika Supabase tidak tersedia.
 * Ini diimpor di API routes untuk menggantikan Supabase query.
 */
import { Vehicle } from './types';

export let MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'K001',
    name: 'Toyota Avanza',
    type: 'MPV',
    location: 'Jakarta',
    transmission: 'Manual',
    capacity: 7,
    price_per_day: 400000,
    rating: 4.7,
    status: 'available',
    description: 'Nikmati perjalanan keluarga yang nyaman dengan Toyota Avanza. MPV yang andal untuk berbagai kebutuhan perjalanan dalam dan luar kota.',
    images: [{ id: 'K001-img', vehicle_id: 'K001', image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K002',
    name: 'Honda Brio',
    type: 'Hatchback',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 5,
    price_per_day: 300000,
    rating: 4.5,
    status: 'available',
    description: 'Kendaraan kompak dan lincah, cocok untuk perjalanan dalam kota. Hemat bahan bakar dan mudah diparkir.',
    images: [{ id: 'K002-img', vehicle_id: 'K002', image_url: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K003',
    name: 'Daihatsu Xenia',
    type: 'MPV',
    location: 'Surabaya',
    transmission: 'Manual',
    capacity: 7,
    price_per_day: 350000,
    rating: 4.3,
    status: 'rented',
    description: 'MPV keluarga yang nyaman dengan kapasitas 7 penumpang. Hemat bahan bakar dan mudah dikendarai.',
    images: [{ id: 'K003-img', vehicle_id: 'K003', image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K004',
    name: 'Mitsubishi Pajero Sport',
    type: 'SUV',
    location: 'Bali',
    transmission: 'Otomatis',
    capacity: 7,
    price_per_day: 750000,
    rating: 4.9,
    status: 'available',
    description: 'SUV premium dengan performa tangguh. Ideal untuk perjalanan jauh dan medan yang beragam.',
    images: [{ id: 'K004-img', vehicle_id: 'K004', image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K005',
    name: 'Yamaha NMAX',
    type: 'Motor',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 2,
    price_per_day: 120000,
    rating: 4.6,
    status: 'available',
    description: 'Skuter premium dengan performa mesin 155cc. Nyaman untuk berkendara dalam kota maupun luar kota.',
    images: [{ id: 'K005-img', vehicle_id: 'K005', image_url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K006',
    name: 'Toyota Hiace',
    type: 'Van',
    location: 'Yogyakarta',
    transmission: 'Manual',
    capacity: 15,
    price_per_day: 1000000,
    rating: 4.5,
    status: 'maintenance',
    description: 'Minibus kapasitas 15 penumpang. Sangat cocok untuk perjalanan grup wisata atau rombongan perusahaan.',
    images: [{ id: 'K006-img', vehicle_id: 'K006', image_url: '🚌', is_primary: true }],
  },
  {
    id: 'K007',
    name: 'Honda HRV',
    type: 'SUV',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 5,
    price_per_day: 500000,
    rating: 4.7,
    status: 'available',
    description: 'SUV kompak yang stylish dan nyaman. Dilengkapi fitur modern untuk kenyamanan perjalanan Anda.',
    images: [{ id: 'K007-img', vehicle_id: 'K007', image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K008',
    name: 'Suzuki Ertiga',
    type: 'MPV',
    location: 'Bandung',
    transmission: 'Manual',
    capacity: 7,
    price_per_day: 380000,
    rating: 4.4,
    status: 'available',
    description: 'MPV keluarga yang efisien dengan kapasitas 7 penumpang. Cocok untuk perjalanan keluarga sehari-hari.',
    images: [{ id: 'K008-img', vehicle_id: 'K008', image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K009',
    name: 'Toyota Yaris',
    type: 'Hatchback',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 5,
    price_per_day: 350000,
    rating: 4.5,
    status: 'available',
    description: 'Hatchback stylish dengan teknologi canggih. Ideal untuk perjalanan dalam kota yang dinamis.',
    images: [{ id: 'K009-img', vehicle_id: 'K009', image_url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K010',
    name: 'Honda Beat',
    type: 'Motor',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 2,
    price_per_day: 80000,
    rating: 4.3,
    status: 'available',
    description: 'Skuter matic terpopuler di Indonesia. Lincah, hemat bahan bakar, dan mudah dikendarai.',
    images: [{ id: 'K010-img', vehicle_id: 'K010', image_url: '🛵', is_primary: true }],
  },
  {
    id: 'K011',
    name: 'Hyundai Palisade',
    type: 'SUV',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 7,
    price_per_day: 1200000,
    rating: 4.9,
    status: 'available',
    description: 'SUV premium baris tiga yang mewah. Cocok untuk keluarga yang menginginkan kenyamanan maksimal.',
    images: [{ id: 'K011-img', vehicle_id: 'K011', image_url: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K012',
    name: 'Isuzu Elf',
    type: 'Van',
    location: 'Surabaya',
    transmission: 'Manual',
    capacity: 19,
    price_per_day: 1100000,
    rating: 4.4,
    status: 'available',
    description: 'Minibus besar untuk kebutuhan transportasi rombongan. Andal dan terawat untuk jarak jauh sekalipun.',
    images: [{ id: 'K012-img', vehicle_id: 'K012', image_url: '🚌', is_primary: true }],
  },
  {
    id: 'K013',
    name: 'Honda Jazz',
    type: 'Hatchback',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 5,
    price_per_day: 320000,
    rating: 4.6,
    status: 'rented',
    description: 'Hatchback premium dengan desain sporty. Kabin yang lega berkat teknologi Magic Seat milik Honda.',
    images: [{ id: 'K013-img', vehicle_id: 'K013', image_url: '🚗', is_primary: true }],
  },
  {
    id: 'K014',
    name: 'Vespa Primavera',
    type: 'Motor',
    location: 'Bali',
    transmission: 'Otomatis',
    capacity: 2,
    price_per_day: 150000,
    rating: 4.7,
    status: 'available',
    description: 'Skuter ikonik Italia yang elegan. Sempurna untuk menjelajahi kota dengan gaya.',
    images: [{ id: 'K014-img', vehicle_id: 'K014', image_url: '🛵', is_primary: true }],
  },
  {
    id: 'K015',
    name: 'Toyota Innova Zenix',
    type: 'MPV',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 7,
    price_per_day: 650000,
    rating: 4.8,
    status: 'available',
    description: 'MPV premium generasi terbaru dengan teknologi hybrid. Perjalanan keluarga menjadi lebih nyaman dan efisien.',
    images: [{ id: 'K015-img', vehicle_id: 'K015', image_url: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K017',
    name: 'Mitsubishi Xpander',
    type: 'MPV',
    location: 'Bandung',
    transmission: 'Manual',
    capacity: 7,
    price_per_day: 420000,
    rating: 4.6,
    status: 'available',
    description: 'MPV modern dengan desain stylish. Ruang kabin yang luas dan fitur keselamatan lengkap.',
    images: [{ id: 'K017-img', vehicle_id: 'K017', image_url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K019',
    name: 'Daihatsu Terios',
    type: 'SUV',
    location: 'Yogyakarta',
    transmission: 'Manual',
    capacity: 7,
    price_per_day: 450000,
    rating: 4.4,
    status: 'available',
    description: 'SUV compact yang tangguh dengan ground clearance tinggi. Cocok untuk berbagai medan perjalanan.',
    images: [{ id: 'K019-img', vehicle_id: 'K019', image_url: '🚙', is_primary: true }],
  },
  {
    id: 'K020',
    name: 'Toyota Alphard',
    type: 'MPV',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 7,
    price_per_day: 1800000,
    rating: 5.0,
    status: 'available',
    description: 'MPV mewah kelas atas dengan interior premium. Pengalaman perjalanan setara business class untuk Anda.',
    images: [{ id: 'K020-img', vehicle_id: 'K020', image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', is_primary: true }],
  },
  {
    id: 'K021',
    name: 'Yamaha Aerox',
    type: 'Motor',
    location: 'Jakarta',
    transmission: 'Otomatis',
    capacity: 2,
    price_per_day: 130000,
    rating: 4.7,
    status: 'available',
    description: 'Skuter sporty dengan akselerasi responsif. Desain futuristik yang stylish untuk kaum muda.',
    images: [{ id: 'K021-img', vehicle_id: 'K021', image_url: '🏍️', is_primary: true }],
  },
  {
    id: 'K023',
    name: 'Kawasaki Ninja ZX-25R',
    type: 'Motor',
    location: 'Jakarta',
    transmission: 'Manual',
    capacity: 2,
    price_per_day: 350000,
    rating: 4.9,
    status: 'available',
    description: 'Motor sport 4-silinder 250cc yang bertenaga. Pengalaman berkendara sport yang sesungguhnya.',
    images: [{ id: 'K023-img', vehicle_id: 'K023', image_url: '🏍️', is_primary: true }],
  },
];

/**
 * Mengambil semua kendaraan dengan filter opsional
 */
export function getMockVehicles(params: {
  search?: string;
  type?: string;
  transmission?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const {
    search,
    type,
    transmission,
    capacity,
    minPrice,
    maxPrice,
    location,
    sort = 'newest',
    page = 1,
    limit = 12,
  } = params;

  let filtered = [...MOCK_VEHICLES];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (v) => v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q)
    );
  }
  if (type) filtered = filtered.filter((v) => v.type === type);
  if (transmission) filtered = filtered.filter((v) => v.transmission === transmission);
  if (capacity) filtered = filtered.filter((v) => v.capacity >= capacity);
  if (minPrice !== undefined) filtered = filtered.filter((v) => v.price_per_day >= minPrice);
  if (maxPrice !== undefined) filtered = filtered.filter((v) => v.price_per_day <= maxPrice);
  if (location) filtered = filtered.filter((v) => v.location === location);

  // Sort
  switch (sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price_per_day - b.price_per_day);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price_per_day - a.price_per_day);
      break;
    case 'rating_desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  const total = filtered.length;
  const from = (page - 1) * limit;
  const paginated = filtered.slice(from, from + limit);

  return { data: paginated, total };
}

/**
 * Mengambil satu kendaraan berdasarkan ID
 */
export function getMockVehicleById(id: string): Vehicle | null {
  return MOCK_VEHICLES.find((v) => v.id === id) ?? null;
}

export function addMockVehicle(vehicle: Vehicle) {
  MOCK_VEHICLES.unshift(vehicle);
  return vehicle;
}

export function updateMockVehicle(id: string, data: Partial<Vehicle>) {
  const idx = MOCK_VEHICLES.findIndex(v => v.id === id);
  if (idx > -1) {
    MOCK_VEHICLES[idx] = { ...MOCK_VEHICLES[idx], ...data };
    return MOCK_VEHICLES[idx];
  }
  return null;
}

export function deleteMockVehicle(id: string) {
  const initialLength = MOCK_VEHICLES.length;
  MOCK_VEHICLES = MOCK_VEHICLES.filter(v => v.id !== id);
  return MOCK_VEHICLES.length < initialLength;
}
