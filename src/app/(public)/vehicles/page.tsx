"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import VehicleList from '@/components/VehicleList';
import VehicleFilters from '@/components/VehicleFilters';
import PaginationControls from '@/components/PaginationControls';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

import { MOCK_VEHICLES } from '@/lib/mockData';

interface ApiResponse {
  vehicles: any[];
  page: number;
  limit: number;
  total: number;
}

function VehiclesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<any[]>(() => MOCK_VEHICLES.slice(0, 12));
  const [page, setPage] = useState<number>(Number(searchParams.get('page') ?? '1'));
  const [total, setTotal] = useState<number>(() => MOCK_VEHICLES.length);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Search Bar state
  const [searchText, setSearchText] = useState(searchParams.get('search') ?? '');
  const [sortValue, setSortValue] = useState(searchParams.get('sort') ?? 'price-low');

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

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchText.trim()) {
      params.set('search', searchText.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    setSortValue(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Keyword Search Bar */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-4 md:p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔍</span>
              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cari kata kunci nama atau merk kendaraan (cth: Avanza, Innova, NMAX, Vespa)..." 
                className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" 
              />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Cari Kendaraan
            </button>
          </div>
        </form>

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
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {searchParams.get('search') ? (
                    <span>Hasil pencarian untuk <strong className="text-blue-600">"{searchParams.get('search')}"</strong> ({total} ditemukan)</span>
                  ) : (
                    <span>Menampilkan {total} kendaraan terbaik</span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Urutkan:</span>
                <select 
                  value={sortValue}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="price-low">Harga: Terendah ke Tertinggi</option>
                  <option value="price-high">Harga: Tertinggi ke Terendah</option>
                  <option value="rating">Populer & Rating</option>
                  <option value="newest">Terbaru</option>
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

