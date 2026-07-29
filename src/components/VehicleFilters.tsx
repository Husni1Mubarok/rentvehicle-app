"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface FilterValues {
  search?: string;
  location?: string;
  type?: string;
  transmission?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
}

export default function VehicleFilters({ initialValues }: { initialValues?: FilterValues }) {
  const router = useRouter();
  const [values, setValues] = useState<FilterValues>(initialValues ?? {});
  const [priceRange, setPriceRange] = useState<number>(2000000);

  // Sync to query params
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== undefined && val !== '' && val !== null) {
        params.set(key, String(val));
      }
    });
    if (priceRange !== 2000000) {
      params.set('maxPrice', String(priceRange));
    }
    router.replace(`/vehicles?${params.toString()}`);
  }, [values, priceRange, router]);

  const handleCheckboxChange = (field: 'type' | 'transmission', value: string, checked: boolean) => {
    setValues((prev) => ({
      ...prev,
      [field]: checked ? value : undefined,
    }));
  };

  const handleCapacityClick = (cap: number) => {
    setValues((prev) => ({
      ...prev,
      capacity: prev.capacity === cap ? undefined : cap,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8 text-gray-800">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span>⚙️</span> Filter
        </h3>
        <button onClick={() => { setValues({}); setPriceRange(2000000); }} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Reset
        </button>
      </div>

      {/* Tipe Kendaraan */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipe Kendaraan</h4>
        <div className="space-y-2">
          {[
            { label: 'SUV', value: 'SUV' },
            { label: 'Sedan', value: 'Sedan' },
            { label: 'MPV', value: 'MPV' },
            { label: 'Hatchback', value: 'Hatchback' },
            { label: 'Luxury', value: 'Luxury' },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-3 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={values.type === item.value}
                onChange={(e) => handleCheckboxChange('type', item.value, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Rentang Harga */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rentang Harga (Per Hari)</h4>
        <input
          type="range"
          min="100000"
          max="2000000"
          step="50000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
          <span>Rp 100rb</span>
          <span className="text-blue-600">Rp {priceRange.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Kapasitas Penumpang */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kapasitas Penumpang</h4>
        <div className="grid grid-cols-2 gap-2">
          {[2, 4, 5, 7].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleCapacityClick(num)}
              className={`py-2 px-3 text-xs font-bold border rounded-xl transition-all ${
                values.capacity === num
                  ? 'bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              {num === 7 ? '7+ Orang' : `${num} Orang`}
            </button>
          ))}
        </div>
      </div>

      {/* Transmisi */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transmisi</h4>
        <div className="space-y-2">
          {[
            { label: 'Manual', value: 'Manual' },
            { label: 'Otomatis (Matik)', value: 'Otomatis' },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-3 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={values.transmission === item.value}
                onChange={(e) => handleCheckboxChange('transmission', item.value, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

