import { supabase } from '../lib/supabaseClient';

interface SeedVehicle {
  name: string;
  type: string;
  location: string;
  transmission: string;
  capacity: number;
  price_per_day: number;
  rating: number;
  status: 'available' | 'booked' | 'rented' | 'maintenance';
  description: string;
}

const types = ['City Car', 'MPV', 'SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Motorcycle'];
const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];
const transmissions = ['Manual', 'Automatic'];
const statuses: SeedVehicle['status'][] = ['available', 'booked', 'rented', 'maintenance'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateVehicles(count: number): SeedVehicle[] {
  const vehicles: SeedVehicle[] = [];
  for (let i = 1; i <= count; i++) {
    const type = randomItem(types);
    vehicles.push({
      name: `${type} ${i}`,
      type,
      location: randomItem(locations),
      transmission: randomItem(transmissions),
      capacity: Math.floor(Math.random() * 7) + 2,
      price_per_day: Math.floor(Math.random() * 9000) + 1000,
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      status: randomItem(statuses),
      description: `Deskripsi singkat untuk ${type} ke-${i}. Mobil ini nyaman dipakai untuk keperluan harian atau perjalanan jauh.`,
    });
  }
  return vehicles;
}

async function seed() {
  const vehicles = generateVehicles(20);
  // Insert vehicles
  const { data: insertedVehicles, error: vehicleError } = await supabase.from('vehicles').insert(vehicles).select();
  if (vehicleError) {
    console.error('Vehicle insert error:', vehicleError);
    process.exit(1);
  }
  // Insert placeholder images for each vehicle
  const imageRows = insertedVehicles.map((v: { id: string }) => ({
    vehicle_id: v.id,
    image_url: 'https://via.placeholder.com/400',
    is_primary: true,
  }));
  const { error: imageError } = await supabase.from('vehicle_images').insert(imageRows);
  if (imageError) {
    console.error('Image insert error:', imageError);
    process.exit(1);
  }
  console.log('Seed completed: inserted', insertedVehicles.length, 'vehicles with placeholder images');
  process.exit(0);
}

seed();
