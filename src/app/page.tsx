"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

// Data Kategori dari Mockup
const categories = [
  { 
    label: "Luxury", count: "12 Mobil", 
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 6-8 14-8-14 8-6z" /></svg>, 
  },
  { 
    label: "SUV", count: "14 Mobil", 
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10V8a2 2 0 012-2h10a2 2 0 012 2v2M3 10v6a2 2 0 002 2h14a2 2 0 002-2v-6" /><circle cx="7" cy="16" r="2" /><circle cx="17" cy="16" r="2" /></svg>, 
  },
  { 
    label: "Electric", count: "6 Mobil", 
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, 
  },
  { 
    label: "Logistics", count: "15 Mobil", 
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h14v8H3v-8zm14 2h4l2 3v3h-6v-6zM7 18h2M15 18h2" /><circle cx="6" cy="18" r="2" /><circle cx="16" cy="18" r="2" /></svg>, 
  },
];

// Data Fitur dari Mockup
const features = [
  {
    icon: "🛡️",
    title: "Asuransi All-Risk",
    desc: "Setiap armada kami dilengkapi dengan asuransi komprehensif untuk keamanan Anda.",
  },
  {
    icon: "🎧",
    title: "Layanan 24/7",
    desc: "Tim dukungan kami siap membantu Anda kapan saja selama masa sewa.",
  },
  {
    icon: "👍",
    title: "Kondisi Prima",
    desc: "Semua mobil melalui inspeksi ketat dan servis rutin sebelum diserahkan ke pelanggan.",
  },
];

import { MOCK_VEHICLES } from "@/lib/mockData";

export default function LandingPage() {
  const [activeType, setActiveType] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => MOCK_VEHICLES.slice(0, 4));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeType) params.set("type", activeType);
    // Fetch only top 4 for the custom grid
    params.set("limit", "4");

    fetch(`/api/vehicles?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.vehicles && d.vehicles.length > 0) {
          setVehicles(d.vehicles);
        }
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, [activeType]);

  const isUrl = (s: string) => {
    try { return Boolean(new URL(s)); } catch { return false; }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="bg-[#F8FAFF] pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-blue-100/50 text-blue-600 px-4 py-2 rounded-full w-max border border-blue-200/50">
              <span className="text-blue-500">🛡️</span>
              <span className="text-xs font-semibold tracking-wide">Premium Rental Service</span>
            </div>
            
            <h1 className="text-4xl md:text-[3.5rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
              Kenyamanan Berkelas<br/>
              Untuk <span className="text-blue-600">Setiap<br/>Perjalanan</span> Anda.
            </h1>
            
            <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mt-2 font-light">
              Nikmati koleksi kendaraan mewah terbaru dengan layanan operasional terbaik yang siap menemani perjalanan bisnis maupun wisata Anda.
            </p>
            
            {/* Search Widget */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get("search") as string;
              if (search.trim()) {
                window.location.href = `/vehicles?search=${encodeURIComponent(search)}`;
              } else {
                window.location.href = `/vehicles`;
              }
            }} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 flex items-center gap-2 w-full max-w-xl mt-4 border border-gray-100">
              <div className="flex-1 flex items-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input name="search" type="text" placeholder="Cari nama atau merk mobil..." className="w-full text-sm font-medium text-gray-800 bg-transparent focus:outline-none py-2" />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shrink-0">
                Cari
              </button>
            </form>
          </div>
          
          {/* Right Image */}
          <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Car" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>



      {/* ───────────────────────── ARMADA TERPOPULER ───────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Armada Terpopuler</h2>
          </div>

          {loading ? (
             <div className="py-20 flex justify-center"><LoadingSpinner /></div>
          ) : vehicles.length === 0 ? (
             <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Featured Card (Span 2 cols) */}
              {vehicles[0] && (
                <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-shadow">
                  <div className="relative h-[250px] md:h-auto md:w-1/2 bg-gray-100 overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Unggulan</span>
                    {vehicles[0].images?.[0]?.image_url && isUrl(vehicles[0].images[0].image_url) ? (
                      <Image src={vehicles[0].images[0].image_url} alt={vehicles[0].name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-6xl text-gray-300">🚗</div>
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-1 md:w-1/2">
                    <span className="text-blue-600 font-bold text-xs mb-2 uppercase tracking-wider">Pilihan Terbaik</span>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{vehicles[0].name}</h3>
                    <p className="text-blue-600 font-black mt-3 text-xl">Rp {vehicles[0].price_per_day.toLocaleString('id-ID')} <span className="text-sm font-medium text-gray-400 font-normal">/ Hari</span></p>
                    
                    <div className="flex items-center gap-6 mt-8 mb-8 text-xs text-gray-500 font-medium">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400 uppercase text-[10px] tracking-wider">Seats</span>
                        <span className="flex items-center gap-1.5 font-semibold text-gray-700">👤 {vehicles[0].capacity} Kursi</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400 uppercase text-[10px] tracking-wider">Trans</span>
                        <span className="flex items-center gap-1.5 font-semibold text-gray-700">⚙️ {vehicles[0].transmission}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400 uppercase text-[10px] tracking-wider">Fuel</span>
                        <span className="flex items-center gap-1.5 font-semibold text-gray-700">⛽ Bensin</span>
                      </div>
                    </div>
                    
                    <Link href={`/vehicles/${vehicles[0].id}`} className="mt-auto w-full text-center py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                      Sewa Sekarang
                    </Link>
                  </div>
                </div>
              )}

              {/* Small Card 1 */}
              {vehicles[1] && (
                <Link href={`/vehicles/${vehicles[1].id}`} className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow md:col-span-1 shadow-sm">
                  <div className="relative h-[200px] w-full bg-gray-100">
                    <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">🤍</button>
                    {vehicles[1].images?.[0]?.image_url && isUrl(vehicles[1].images[0].image_url) ? (
                      <Image src={vehicles[1].images[0].image_url} alt={vehicles[1].name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{vehicles[1].name}</h3>
                    <p className="text-blue-600 font-bold text-base">Rp {vehicles[1].price_per_day.toLocaleString('id-ID')} <span className="text-xs font-medium text-gray-400 font-normal">/ Hari</span></p>
                    <div className="flex items-center gap-4 mt-5 mb-6 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">👤 {vehicles[1].capacity} Kursi</span>
                      <span className="flex items-center gap-1.5">⚙️ {vehicles[1].transmission === 'Otomatis' ? 'Matic' : 'Manual'}</span>
                    </div>
                    <span className="mt-auto w-full text-center py-3 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Card 2 */}
              {vehicles[2] && (
                <Link href={`/vehicles/${vehicles[2].id}`} className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow md:col-span-1 shadow-sm">
                  <div className="relative h-[200px] w-full bg-gray-100">
                    <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">🤍</button>
                    {vehicles[2].images?.[0]?.image_url && isUrl(vehicles[2].images[0].image_url) ? (
                      <Image src={vehicles[2].images[0].image_url} alt={vehicles[2].name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{vehicles[2].name}</h3>
                    <p className="text-blue-600 font-bold text-base">Rp {vehicles[2].price_per_day.toLocaleString('id-ID')} <span className="text-xs font-medium text-gray-400 font-normal">/ Hari</span></p>
                    <div className="flex items-center gap-4 mt-5 mb-6 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">👤 {vehicles[2].capacity} Kursi</span>
                      <span className="flex items-center gap-1.5">⚙️ {vehicles[2].transmission === 'Otomatis' ? 'Matic' : 'Manual'}</span>
                    </div>
                    <span className="mt-auto w-full text-center py-3 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              )}

              {/* Blue CTA Box */}
              <div className="bg-blue-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white shadow-xl shadow-blue-600/30 md:col-span-1 min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-blue-500/50 border border-blue-400 flex items-center justify-center mb-6 text-2xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-snug">Jelajahi 50+<br/>Armada Lainnya</h3>
                <p className="text-blue-100 text-sm mb-8 font-light max-w-[200px]">Temukan mobil yang paling cocok dengan gaya hidup Anda.</p>
                <Link href="/vehicles" className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-lg w-full max-w-[200px]">
                  Lihat Armada
                </Link>
              </div>

            </div>
          )}
        </div>
      </section>

    </div>
  );
}