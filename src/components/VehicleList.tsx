'use client';
import React from 'react';
import VehicleCard from './VehicleCard';
import { Vehicle } from '@/lib/types';

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
