'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import VehicleModal from '@/components/VehicleModal';
import { getSession } from '@/data';

interface VehicleDetail {
  id: string;
  name: string;
  type: string;
  location: string;
  transmission: string;
  capacity: number;
  price_per_day: number;
  rating: number;
  status: string;
  images: { id?: string; vehicle_id?: string; image_url: string; is_primary: boolean }[];
  description: string;
}

function VehicleDetailContent() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const showModal = searchParams.get('action') === 'sewa';

  useEffect(() => {
    setLoading(true);
    fetch(`/api/vehicles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch vehicle');
        return res.json();
      })
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-600 p-8 text-center">{error}</div>;
  if (!vehicle) return <EmptyState message="Kendaraan tidak ditemukan" />;

  const primaryImage = vehicle.images?.find((img) => img.is_primary) ?? vehicle.images?.[0];
  const imagesToShow = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [{ image_url: '🚐', is_primary: true }];

  const handleBookingRedirect = () => {
    const session = getSession();
    if (session) {
      router.push(`/vehicles/${vehicle.id}?action=sewa`);
    } else {
      router.push(`/login?redirect=/vehicles/${vehicle.id}?action=sewa`);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/vehicles" className="hover:text-blue-600 transition-colors">Daftar Kendaraan</Link>
          <span>/</span>
          <span className="text-gray-600">{vehicle.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Images, Specs, Description & Reviews */}
          <div className="lg:col-span-8 space-y-6">
            {/* Gallery Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="relative h-[320px] md:h-[400px] w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
                {primaryImage && primaryImage.image_url.startsWith('http') ? (
                  <Image src={primaryImage.image_url} alt={vehicle.name} fill className="object-cover" />
                ) : (
                  <span className="text-8xl select-none">{primaryImage?.image_url || '🚐'}</span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {imagesToShow.map((img, idx) => (
                  <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    {img.image_url.startsWith('http') ? (
                      <Image src={img.image_url} alt="" fill className="object-cover" />
                    ) : (
                      <span className="text-3xl">{img.image_url}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Details Specs Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">{vehicle.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-400">★ {vehicle.rating || 4.8}</span>
                    <span className="text-xs text-gray-400 font-semibold">(120+ Penyewaan Berhasil)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-400 block mb-0.5">Harga Mulai</span>
                  <p className="text-xl font-black text-blue-600">Rp {vehicle.price_per_day.toLocaleString('id-ID')}<span className="text-xs font-medium text-gray-400">/hari</span></p>
                </div>
              </div>

              {/* Spec Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Transmisi</span>
                    <span className="text-xs font-bold text-gray-800">{vehicle.transmission}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Kapasitas</span>
                    <span className="text-xs font-bold text-gray-800">{vehicle.capacity} Kursi</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Tahun</span>
                    <span className="text-xs font-bold text-gray-800">2023</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">⛽</span>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Bahan Bakar</span>
                    <span className="text-xs font-bold text-gray-800">Bensin</span>
                  </div>
                </div>
              </div>

              {/* Fasilitas Kendaraan */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <h3 className="font-bold text-gray-900">Fasilitas Kendaraan</h3>
                <div className="flex flex-wrap gap-2.5">
                  {['Full AC', 'Audio System', 'Charger Port', 'Airbag'].map((item) => (
                    <span key={item} className="px-4 py-2 bg-blue-50/50 text-blue-600 rounded-xl text-xs font-bold flex items-center gap-2">
                      ✔ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900">Deskripsi</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {vehicle.description || 'Nikmati perjalanan keluarga yang nyaman dengan kendaraan handal ini. Cocok untuk kebutuhan perjalanan dalam kota maupun luar kota bersama keluarga tercinta.'}
              </p>
            </div>

            {/* Reviews Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Ulasan Pengguna</h3>
                <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">Lihat Semua</span>
              </div>

              <div className="space-y-6 divide-y divide-gray-100">
                <div className="space-y-3 pt-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Andi Pratama</h4>
                        <span className="text-[10px] text-gray-400 font-medium">2 hari yang lalu</span>
                      </div>
                    </div>
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">"Mobil sangat bersih dan mesinnya halus sekali. Pelayanan dari tim RentVehicle juga sangat ramah dan proses serah terima mobil cepat."</p>
                </div>

                <div className="space-y-3 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Siti Aminah</h4>
                        <span className="text-[10px] text-gray-400 font-medium">1 minggu yang lalu</span>
                      </div>
                    </div>
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">"Sangat terbantu untuk perjalanan dinas kemarin. AC dingin, interior wangi. Sedikit kendala saat penjemputan tapi segera diatasi admin. Mantap!"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 pb-3 border-b border-gray-100">Ringkasan Pemesanan</h3>

              {/* Date Input */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pilih Tanggal</span>
                <div
                  onClick={handleBookingRedirect}
                  className="relative bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 text-sm text-gray-800 font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span>📅</span>
                  <span>Pilih Tanggal Sewa</span>
                </div>
              </div>

              {/* Pricing Rows */}
              <div className="space-y-3 pt-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Durasi Sewa</span>
                  <span className="font-bold text-gray-800">3 Hari</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Sewa</span>
                  <span className="font-bold text-gray-800">Rp {(vehicle.price_per_day * 3).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asuransi & Proteksi</span>
                  <span className="font-bold text-gray-800">Rp 75.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan</span>
                  <span className="font-bold text-emerald-500">Gratis</span>
                </div>
              </div>

              {/* Total Pricing */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-black text-gray-900 text-sm">Total Harga</span>
                <span className="text-xl font-black text-blue-600">Rp {(vehicle.price_per_day * 3 + 75000).toLocaleString('id-ID')}</span>
              </div>

              {/* Rent Action Button */}
              <button
                onClick={handleBookingRedirect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-600/20"
              >
                Sewa Sekarang <span>➔</span>
              </button>

              <p className="text-[10px] text-gray-400 font-medium text-center">Tidak ada biaya tersembunyi. Pembatalan gratis hingga 24 jam.</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && vehicle && (
        <VehicleModal
          vehicle={{
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            location: vehicle.location || 'Jakarta',
            transmission: vehicle.transmission,
            capacity: vehicle.capacity,
            price_per_day: vehicle.price_per_day,
            rating: vehicle.rating,
            status: vehicle.status as any,
            description: vehicle.description,
            images: vehicle.images.map((img, idx) => ({
              id: img.id || `${vehicle.id}-img-${idx}`,
              vehicle_id: img.vehicle_id || vehicle.id,
              image_url: img.image_url,
              is_primary: img.is_primary
            }))
          }}
          onClose={() => router.push(`/vehicles/${vehicle.id}`)}
        />
      )}
    </div>
  );
}

export default function VehicleDetailPage() {
  return (
    <React.Suspense fallback={<div className="py-24 flex justify-center"><LoadingSpinner /></div>}>
      <VehicleDetailContent />
    </React.Suspense>
  );
}

