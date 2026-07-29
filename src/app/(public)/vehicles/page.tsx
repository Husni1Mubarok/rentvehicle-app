"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VehicleList from '@/components/VehicleList';
import VehicleFilters from '@/components/VehicleFilters';
import PaginationControls from '@/components/PaginationControls';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

interface ApiResponse {
  vehicles: any[];
  page: number;
  limit: number;
  total: number;
}

function VehiclesContent() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(Number(searchParams.get('page') ?? '1'));
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const buildApiUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get('page')) params.set('page', String(page));
    return `/api/vehicles?${params.toString()}`;
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(buildApiUrl())
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch vehicles');
        return res.json();
      })
      .then((data: ApiResponse) => {
        setVehicles(data.vehicles);
        setPage(data.page);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Search Bar / Pick Up Header Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 mb-1.5">Lokasi Penjemputan</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
              <input type="text" defaultValue="Jakarta, Indonesia" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 mb-1.5">Tanggal Sewa</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
              <input type="text" placeholder="Pilih Tanggal" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 mb-1.5">Waktu</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⏰</span>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">
                <option>09:00 WIB</option>
                <option>12:00 WIB</option>
                <option>15:00 WIB</option>
              </select>
            </div>
          </div>

          <div className="flex items-end h-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <span>🔍</span> Cari Kendaraan
            </button>
          </div>
        </div>

        {/* Main Content Area: Sidebar Filter + Grid List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter Sidebar */}
          <aside className="lg:col-span-3">
            <VehicleFilters initialValues={Object.fromEntries(searchParams.entries())} />
          </aside>

          {/* Right Column: Vehicle Grid List */}
          <section className="lg:col-span-9">
            {/* Header Result info & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Pilihan Kendaraan Untuk Anda</h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Menampilkan {total} kendaraan terbaik</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Urutkan:</span>
                <select className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none">
                  <option>Harga: Terendah ke Tertinggi</option>
                  <option>Harga: Tertinggi ke Terendah</option>
                  <option>Populer</option>
                </select>
              </div>
            </div>

            {loading && <LoadingSpinner />}
            {error && (
              <div className="text-red-600 p-4 bg-red-100 rounded mb-4">{error}</div>
            )}
            {!loading && !error && vehicles.length === 0 && <EmptyState />}
            {!loading && !error && vehicles.length > 0 && (
              <div className="space-y-8">
                <VehicleList vehicles={vehicles} />
                <PaginationControls currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <React.Suspense fallback={<div className="py-24 flex justify-center"><LoadingSpinner /></div>}>
      <VehiclesContent />
    </React.Suspense>
  );
}

