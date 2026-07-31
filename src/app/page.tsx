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

export default function LandingPage() {
  const [activeType, setActiveType] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeType) params.set("type", activeType);
    // Fetch only top 4 for the custom grid
    params.set("limit", "4");

    fetch(`/api/vehicles?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => { setVehicles(d.vehicles ?? []); setLoading(false); })
      .catch(() => { setVehicles([]); setLoading(false); });
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
            
            {/* Booking Widget */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mt-4 border border-gray-100">
              <div className="flex-1 flex flex-col px-3 py-1 border-r border-gray-100 w-full sm:w-auto">
                <label className="text-[10px] text-gray-400 font-medium mb-1">📍 Lokasi Penjemputan</label>
                <select className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer">
                  <option>Jakarta Pusat</option>
                  <option>Jakarta Selatan</option>
                  <option>Bandung</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col px-3 py-1 w-full sm:w-auto">
                <label className="text-[10px] text-gray-400 font-medium mb-1">📅 Tanggal Sewa</label>
                <input type="date" className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer" />
              </div>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                🔍 Cari
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Car" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── KATEGORI KENDARAAN ───────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kategori Kendaraan</h2>
              <p className="text-sm text-gray-500 mt-2 font-light">Pilih tipe mobil yang sesuai dengan kebutuhan Anda.</p>
            </div>
            <Link href="/vehicles" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hidden sm:flex items-center gap-2">
              Lihat Semua <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="bg-[#F8FAFF] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors border border-blue-50/50">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 bg-white shadow-sm text-blue-600`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.label}</h3>
                <p className="text-xs text-gray-400 font-medium">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ARMADA TERPOPULER ───────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-50">
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
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow">
                  <div className="relative h-[250px] md:h-auto md:w-1/2 bg-gray-100">
                    <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Unggulan</span>
                    {vehicles[0].images?.[0]?.image_url && isUrl(vehicles[0].images[0].image_url) ? (
                      <Image src={vehicles[0].images[0].image_url} alt={vehicles[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-6 md:p-10 flex flex-col flex-1 md:w-1/2">
                    <h3 className="text-2xl font-bold text-gray-900">{vehicles[0].name}</h3>
                    <p className="text-blue-600 font-bold mt-2 text-lg">Rp {vehicles[0].price_per_day.toLocaleString('id-ID')} <span className="text-sm font-medium text-gray-400">/ Hari</span></p>
                    
                    <div className="flex items-center gap-6 mt-6 mb-8 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-2">👤 {vehicles[0].capacity} Kursi</span>
                      <span className="flex items-center gap-2">⚙️ {vehicles[0].transmission}</span>
                      <span className="flex items-center gap-2">⛽ Bensin</span>
                    </div>
                    
                    <Link href={`/vehicles/${vehicles[0].id}`} className="mt-auto w-full text-center py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                      Sewa Sekarang
                    </Link>
                  </div>
                </div>
              )}

              {/* Small Card 1 */}
              {vehicles[1] && (
                <Link href={`/vehicles/${vehicles[1].id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow md:col-span-1">
                  <div className="relative h-[180px] w-full bg-gray-100">
                    {vehicles[1].images?.[0]?.image_url && isUrl(vehicles[1].images[0].image_url) ? (
                      <Image src={vehicles[1].images[0].image_url} alt={vehicles[1].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{vehicles[1].name}</h3>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">🤍</button>
                    </div>
                    <p className="text-blue-600 font-bold text-sm">Rp {vehicles[1].price_per_day.toLocaleString('id-ID')} <span className="text-xs font-medium text-gray-400">/ Hari</span></p>
                    <div className="flex items-center gap-4 mt-4 mb-5 text-xs text-gray-500">
                      <span>👤 {vehicles[1].capacity} Kursi</span>
                      <span>⚙️ Auto</span>
                    </div>
                    <span className="mt-auto w-full text-center py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-sm">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Card 2 */}
              {vehicles[2] && (
                <Link href={`/vehicles/${vehicles[2].id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow md:col-span-1">
                  <div className="relative h-[180px] w-full bg-gray-100">
                    {vehicles[2].images?.[0]?.image_url && isUrl(vehicles[2].images[0].image_url) ? (
                      <Image src={vehicles[2].images[0].image_url} alt={vehicles[2].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{vehicles[2].name}</h3>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">🤍</button>
                    </div>
                    <p className="text-blue-600 font-bold text-sm">Rp {vehicles[2].price_per_day.toLocaleString('id-ID')} <span className="text-xs font-medium text-gray-400">/ Hari</span></p>
                    <div className="flex items-center gap-4 mt-4 mb-5 text-xs text-gray-500">
                      <span>👤 {vehicles[2].capacity} Kursi</span>
                      <span>⚡ EV</span>
                    </div>
                    <span className="mt-auto w-full text-center py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-sm">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Card 3 */}
              {vehicles[3] && (
                <Link href={`/vehicles/${vehicles[3].id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow md:col-span-1">
                  <div className="relative h-[180px] w-full bg-gray-100">
                    {vehicles[3].images?.[0]?.image_url && isUrl(vehicles[3].images[0].image_url) ? (
                      <Image src={vehicles[3].images[0].image_url} alt={vehicles[3].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{vehicles[3].name}</h3>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">🤍</button>
                    </div>
                    <p className="text-blue-600 font-bold text-sm">Rp {vehicles[3].price_per_day.toLocaleString('id-ID')} <span className="text-xs font-medium text-gray-400">/ Hari</span></p>
                    <div className="flex items-center gap-4 mt-4 mb-5 text-xs text-gray-500">
                      <span>👤 {vehicles[3].capacity} Kursi</span>
                      <span>🚙 4x4</span>
                    </div>
                    <span className="mt-auto w-full text-center py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-sm">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              )}
              
              {/* Blue CTA Box */}
              <div className="bg-blue-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white shadow-xl shadow-blue-700/20 md:col-span-1 min-h-[350px]">
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center mb-6 text-2xl bg-blue-600/50">
                  🧭
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-snug">Jelajahi 50+ Armada<br/>Lainnya</h3>
                <p className="text-blue-100 text-sm mb-8 font-light">Temukan mobil yang paling cocok dengan gaya hidup Anda.</p>
                <Link href="/vehicles" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-lg">
                  Lihat Galeri
                </Link>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────── MENGAPA RENTVEHICLE ───────────────────────── */}
      <section className="py-24 px-6 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920" 
                alt="Chauffeur service" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Floating Glass Box */}
            <div className="absolute bottom-6 left-6 md:-left-6 right-6 md:right-auto bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white">
              <div className="text-blue-600 font-bold text-3xl">15k+</div>
              <p className="text-xs font-semibold text-gray-600 max-w-[150px]">Pelanggan Puas Selama 10 Tahun Melayani</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <span className="text-blue-600 font-bold text-sm tracking-wide">Mengapa RentVehicle?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-10 leading-tight">Solusi Transportasi Terpercaya Anda</h2>
            
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-sm border border-blue-100">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
              Konsultasi Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-blue-600 text-xl font-black tracking-tight mb-4">RentVehicle</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
              Penyedia layanan rental mobil premium terbaik di Indonesia. Kami mengutamakan kenyamanan, keamanan, dan kepuasan Anda dalam setiap perjalanan.
            </p>
            <div className="flex gap-3">
              {['🌐', '🐦', '📷'].map((icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-blue-600 mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link></li>
              <li><Link href="/vehicles" className="hover:text-blue-600 transition-colors">Kendaraan</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">Tentang Kami</Link></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Testimoni</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-blue-600 mb-6 text-sm">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Contact Us</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">FAQ</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-blue-600 mb-6 text-sm">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3">
                <span className="text-gray-400">📞</span>
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✉️</span>
                <span>info@rentvehicle.com</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">📍</span>
                <span className="leading-relaxed">Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 RentVehicle. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <span>Clean White Edition</span>
            <span>Corporate Reliable Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}