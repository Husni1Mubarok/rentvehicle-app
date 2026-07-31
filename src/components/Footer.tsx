import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] pt-20 pb-10 px-6 border-t border-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-white mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain filter brightness-0 invert" />
            </div>
            <span>RentVehicle</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            Penyedia layanan rental kendaraan premium terpercaya di Indonesia dengan jaringan luas dan pelayanan profesional.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Navigasi</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
            <li><Link href="/vehicles" className="hover:text-white transition-colors">Katalog Mobil</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <span className="text-blue-500 shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <span className="leading-relaxed">Jl. Romokalisari, Surabaya<br/>Jawa Timur, Indonesia</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <span>087761709094</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-700 pt-8 flex flex-col items-center justify-center gap-4 text-xs text-slate-500 text-center">
        <p>© 2026 RentVehicle. All rights reserved. Motion System by Executive Design.</p>
      </div>
    </footer>
  );
}
