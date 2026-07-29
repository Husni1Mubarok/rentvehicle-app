"use client";

import { useEffect, useState } from "react";
import VehicleList from "@/components/VehicleList";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import { Vehicle } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Kategori persis seperti mockup: Mobil, Sedan, SUV, MPV, Pick Up
const categories = [
  { label: "Mobil",   value: "Hatchback", icon: "/icons/cat-car.svg",   emoji: "🚗" },
  { label: "Sedan",   value: "Sedan",     icon: "/icons/cat-sedan.svg",  emoji: "🚙" },
  { label: "SUV",     value: "SUV",       icon: "/icons/cat-suv.svg",    emoji: "🚙" },
  { label: "MPV",     value: "MPV",       icon: "/icons/cat-mpv.svg",    emoji: "🚐" },
  { label: "Pick Up", value: "Van",       icon: "/icons/cat-van.svg",    emoji: "🚌" },
];

// Fitur "Mengapa Memilih Kami" — 3 kolom seperti mockup
const features = [
  {
    icon: "📅",
    title: "Booking Online",
    desc: "Proses pemesanan yang mudah dan cepat hanya dalam hitungan menit dari ponsel Anda.",
  },
  {
    icon: "💵",
    title: "Harga Transparan",
    desc: "Tidak ada biaya tersembunyi. Semua harga yang tertera adalah harga final yang Anda bayarkan.",
  },
  {
    icon: "🛡️",
    title: "Kendaraan Berkualitas",
    desc: "Semua armada kami selalu dalam kondisi prima dan mendapatkan servis rutin secara berkala.",
  },
];

const testimonials = [
  {
    rating: 5,
    text: '"Pelayanan luar biasa! Mobilnya bersih banget dan wangi. Proses ambil dan kembalikan juga sangat praktis. Sangat merekomendasikan RentVehicle untuk urusan sewa mobil."',
    name: "Jordi Pratama",
    job: "Wiraswasta",
    initial: "J",
  },
  {
    rating: 5,
    text: '"Sangat puas dengan RentVehicle. Harganya paling kompetitif dan tidak ada biaya aneh-aneh. Mobil Xpandernya mantap buat jalan-jalan bareng keluarga ke luar kota."',
    name: "Sari Wijaya",
    job: "Ibu Rumah Tangga",
    initial: "S",
  },
];

export default function LandingPage() {
  const [activeType, setActiveType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeType) params.set("type", activeType);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    params.set("limit", "6");

    fetch(`/api/vehicles?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => { setVehicles(d.vehicles ?? []); setLoading(false); })
      .catch(() => { setVehicles([]); setLoading(false); });
  }, [activeType, searchQuery]);

  const scrollToList = () => {
    document.getElementById("daftar-kendaraan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative min-h-[580px] flex items-center bg-gray-900 overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
            alt="RentVehicle Hero"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Search bar at top — persis seperti mockup */}
            <div className="relative max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari kendaraan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Temukan Kendaraan<br />
              Terbaik untuk Perjalanan<br />
              Anda
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
              Booking kendaraan menjadi lebih mudah, cepat, dan aman hanya melalui RentVehicle.
            </p>

            {/* Booking Widget */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 grid grid-cols-3 gap-3 max-w-lg">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lokasi</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📍</span>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full pl-7 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Mulai</label>
                <input
                  type="date"
                  className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Kembali</label>
                <div className="flex gap-1.5">
                  <input
                    type="date"
                    className="flex-1 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={scrollToList}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-lg text-xs transition-colors whitespace-nowrap"
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>

            {/* Featured vehicle label — persis seperti mockup */}
            <div>
              <h3 className="text-white text-xl font-bold">Audi Q8 - Premium SUV</h3>
              <p className="text-blue-400 font-bold text-base">Rp 1.800.000 / hari</p>
              <p className="text-gray-400 text-xs mt-1">5 Kursi &nbsp;•&nbsp; Bensin &nbsp;•&nbsp; Transmisi: Otomatis</p>
              <div className="flex gap-3 mt-4">
                <Link
                  href="/vehicles/K020"
                  className="px-5 py-2.5 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors shadow"
                >
                  Pesan Sekarang
                </Link>
                <Link
                  href="/vehicles/K020"
                  className="px-5 py-2.5 bg-transparent border border-white/40 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Detail Kendaraan
                </Link>
              </div>
            </div>
          </div>

          {/* Right — kosong, foto sudah jadi bg */}
          <div />
        </div>
      </section>

      {/* ───────────────────────── KATEGORI ───────────────────────── */}
      <section className="py-14 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">Kategori Kendaraan</h2>
          <div className="flex justify-center gap-5 flex-wrap">
            {categories.map((cat) => {
              const isActive = activeType === cat.value;
              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    setActiveType(isActive ? "" : cat.value);
                    scrollToList();
                  }}
                  className={`flex flex-col items-center gap-2.5 px-6 py-5 rounded-2xl border transition-all min-w-[88px] ${
                    isActive
                      ? "bg-blue-50 border-blue-500 shadow-md"
                      : "bg-white border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  {/* Circular icon background — persis seperti mockup */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${
                    isActive ? "bg-blue-100" : "bg-blue-50"
                  }`}>
                    {cat.emoji}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-gray-700"}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── KENDARAAN UNGGULAN ───────────────────────── */}
      <section id="daftar-kendaraan" className="py-14 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Kendaraan Unggulan</h2>
              <p className="mt-1 text-sm text-gray-500">Pilihan armada terbaik untuk kenyamanan Anda</p>
            </div>
            <Link
              href="/vehicles"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              Lihat Semua <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center"><LoadingSpinner /></div>
          ) : vehicles.length === 0 ? (
            <EmptyState />
          ) : (
            <VehicleList vehicles={vehicles} />
          )}
        </div>
      </section>

      {/* ───────────────────────── MENGAPA MEMILIH KAMI ───────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">Mengapa Memilih Kami?</h2>
          <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
            Kami memberikan pelayanan terbaik untuk menjamin kenyamanan dan keamanan perjalanan Anda.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center px-6 py-8 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── TESTIMONIAL ───────────────────────── */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold mb-12">Apa Kata Pelanggan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <div className="flex gap-0.5 text-yellow-400 text-sm mb-4">
                  {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                </div>
                <p className="text-white/90 italic text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-white/70">{t.job}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-black mb-3">RentVehicle</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Solusi penyewaan kendaraan terpercaya untuk segala kebutuhan perjalanan Anda, mulai dari harian hingga bulanan.
            </p>
            <div className="mt-5 flex gap-4 text-base">
              <span className="cursor-pointer hover:text-white transition-colors">🌐</span>
              <span className="cursor-pointer hover:text-white transition-colors">✉️</span>
              <span className="cursor-pointer hover:text-white transition-colors">📞</span>
            </div>
          </div>

          {/* Menu Cepat */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Menu Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Kendaraan</Link></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Promo</span></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-white transition-colors">Bantuan</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Kebijakan Privasi</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Syarat &amp; Ketentuan</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">FAQ</span></li>
            </ul>
          </div>

          {/* Berlangganan */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Berlangganan</h4>
            <p className="text-sm text-gray-500 mb-3">Dapatkan info promo terbaru langsung di email Anda.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 min-w-0"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap">
                Daftar
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} RentVehicle. All rights reserved.
        </div>
      </footer>
    </div>
  );
}