export type VehicleStatus = 'available' | 'booked' | 'rented' | 'maintenance';

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  location: string;
  transmission: string;
  capacity: number;
  price_per_day: number;
  rating: number;
  status: VehicleStatus;
  description: string;
  images?: VehicleImage[];
}
