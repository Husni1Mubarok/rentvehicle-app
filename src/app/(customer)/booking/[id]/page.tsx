'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BookingPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  
  const [session, setSession] = useState<any>(undefined);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Wizard state
  const [step, setStep] = useState(1);
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [tglMulai, setTglMulai] = useState('');
  const [tglSelesai, setTglSelesai] = useState('');
  
  const [alamat, setAlamat] = useState('');
  const [jamAmbil, setJamAmbil] = useState('');
  
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [simFile, setSimFile] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const ktpInputRef = useRef<HTMLInputElement>(null);
  const simInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push(`/login?redirect=/booking/${id}`);
      } else {
        setSession(data.session);
      }
    });
  }, [id, router]);

  useEffect(() => {
    if (!id || session === undefined) return;
    
    // Fetch vehicle info
    fetch(`/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg('Gagal memuat data kendaraan.');
        setLoading(false);
      });
  }, [id, session]);

  if (session === undefined || loading) {
    return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;
  }

  if (!vehicle) {
    return <div className="text-center py-24 text-red-600">Kendaraan tidak ditemukan.</div>;
  }

  const days = (tglMulai && tglSelesai) 
    ? Math.max(0, Math.round((new Date(tglSelesai).getTime() - new Date(tglMulai).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalPrice = days * vehicle.price_per_day;

  const nextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!nama || !wa || !tujuan || !tglMulai || !tglSelesai || !alamat || !jamAmbil) {
        setErrorMsg('Semua kolom data peminjam dan jadwal harus diisi.');
        return;
      }
      if (days <= 0) {
        setErrorMsg('Tanggal selesai harus setelah tanggal mulai.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!nama || !wa || !tujuan || !tglMulai || !tglSelesai || !alamat || !jamAmbil) {
        setErrorMsg('Harap lengkapi data pada Langkah 1 terlebih dahulu.');
        setStep(1);
        return;
      }
      if (!ktpFile || !simFile) {
        setErrorMsg('Mohon unggah dokumen KTP dan SIM Anda.');
        return;
      }
      setStep(3);
    }
  };

  const goToStep = (targetStep: number) => {
    setErrorMsg('');
    if (targetStep > step) {
      if (step === 1 || targetStep >= 2) {
        if (!nama || !wa || !tujuan || !tglMulai || !tglSelesai || !alamat || !jamAmbil) {
          setErrorMsg('Semua kolom data peminjam dan jadwal harus diisi.');
          return;
        }
        if (days <= 0) {
          setErrorMsg('Tanggal selesai harus setelah tanggal mulai.');
          return;
        }
      }
      if (targetStep === 3 && (!ktpFile || !simFile)) {
        setErrorMsg('Mohon unggah dokumen KTP dan SIM Anda.');
        return;
      }
    }
    setStep(targetStep);
  };

  const prevStep = () => {
    setErrorMsg('');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const readAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1000;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.75));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const submitBooking = async () => {
    setErrorMsg('');
    setSubmitting(true);
    
    try {
      let ktpUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
      let simUrl = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800';

      if (ktpFile) {
        const ktpBase64 = await readAndCompressImage(ktpFile);
        if (ktpBase64) ktpUrl = ktpBase64;
      }

      if (simFile) {
        const simBase64 = await readAndCompressImage(simFile);
        if (simBase64) simUrl = simBase64;
      }

      const formData = new FormData();
      if (session?.user?.id) {
        formData.append('user_id', session.user.id);
      }
      formData.append('vehicle_id', vehicle.id);
      formData.append('borrower_name', nama);
      formData.append('whatsapp_number', wa);
      formData.append('start_date', tglMulai);
      formData.append('end_date', tglSelesai);
      
      const finalPurpose = `${tujuan}\n[Alamat Penjemputan: ${alamat}]\n[Jam Diambil: ${jamAmbil}]`;
      formData.append('purpose', finalPurpose);
      
      formData.append('total_price', totalPrice.toString());
      formData.append('ktp_url', ktpUrl);
      formData.append('sim_url', simUrl);

      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Gagal membuat booking');
      }
      
      const bookingId = data.data[0].id;
      router.push(`/payment/${bookingId}`);
    } catch (e: any) {
      setErrorMsg(e.message || 'Terjadi kesalahan');
      setSubmitting(false);
    }
  };

  const uploadedCount = (ktpFile ? 1 : 0) + (simFile ? 1 : 0);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Stepper Navigation */}
        <div className="mb-10 max-w-xl mx-auto px-4">
          <div className="flex items-center justify-between relative">
            {/* Background connecting bar */}
            <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
            <div 
              className="absolute top-4 left-0 h-[2px] bg-blue-600 transition-all duration-300 -z-0" 
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            ></div>

            {/* Step 1: Pilih Mobil */}
            <div 
              onClick={() => goToStep(1)} 
              className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2 cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step > 1 ? 'bg-blue-600 text-white shadow-md' : step === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {step > 1 ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : '1'}
              </div>
              <span className={`text-xs font-semibold mt-2 transition-colors ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                Pilih Mobil
              </span>
            </div>

            {/* Step 2: Dokumen */}
            <div 
              onClick={() => goToStep(2)} 
              className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2 cursor-pointer relative"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step > 2 ? 'bg-blue-600 text-white shadow-md' : step === 2 ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {step > 2 ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : '2'}
              </div>
              <div className="flex flex-col items-center mt-2">
                <span className={`text-xs font-bold transition-colors ${step === 2 ? 'text-blue-600' : step > 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                  Dokumen
                </span>
                {step === 2 && <div className="w-5 h-[2px] bg-blue-600 rounded-full mt-0.5"></div>}
              </div>
            </div>

            {/* Step 3: Pembayaran */}
            <div 
              onClick={() => goToStep(3)} 
              className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2 cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === 3 ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md' : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}>
                3
              </div>
              <span className={`text-xs font-semibold mt-2 transition-colors ${step === 3 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                Pembayaran
              </span>
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Form Data */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Data Penyewa & Jadwal</h2>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Nama Peminjam</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">👤</span>
                <input 
                  type="text" 
                  value={nama} 
                  onChange={e => setNama(e.target.value)} 
                  placeholder="Sesuai KTP" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Nomor WhatsApp</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">💬</span>
                <input 
                  type="tel" 
                  value={wa} 
                  onChange={e => setWa(e.target.value)} 
                  placeholder="08123456789" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all shadow-sm" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Tanggal Mulai</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">📅</span>
                  <input 
                    type="date" 
                    value={tglMulai} 
                    onChange={e => setTglMulai(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm cursor-pointer" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Tanggal Selesai</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">📅</span>
                  <input 
                    type="date" 
                    value={tglSelesai} 
                    onChange={e => setTglSelesai(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Jam Diambil</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">⏰</span>
                  <input 
                    type="time" 
                    value={jamAmbil} 
                    onChange={e => setJamAmbil(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm cursor-pointer" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Tujuan Perjalanan</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">🎯</span>
                  <input 
                    type="text" 
                    value={tujuan} 
                    onChange={e => setTujuan(e.target.value)} 
                    placeholder="Contoh: Perjalanan dinas" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Alamat Penjemputan</label>
              <div className="relative group">
                <span className="absolute left-4 top-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">📍</span>
                <textarea 
                  rows={3} 
                  value={alamat} 
                  onChange={e => setAlamat(e.target.value)} 
                  placeholder="Alamat lengkap lokasi penjemputan" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm resize-none" 
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={nextStep} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 text-sm"
              >
                Lanjut <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Document Verification Redesign */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Header Badge & Titles */}
            <div className="text-center space-y-3">
              <div className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold tracking-wider uppercase">
                LANGKAH VERIFIKASI
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Keamanan adalah Prioritas Kami
              </h1>
              <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                Unggah dokumen identitas Anda untuk memulai pengalaman berkendara yang aman dan nyaman. Data Anda dilindungi dengan teknologi enkripsi terkini.
              </p>
            </div>

            {/* Main 2-Column Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Kriteria Foto & Security Card (4 cols) */}
              <div className="lg:col-span-4 space-y-5">
                {/* Photo Criteria Card */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                      ℹ
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Kriteria Foto</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex gap-3 items-start">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                        {/* Sun / Lighting Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
                          <path strokeLinecap="round" strokeWidth={1.8} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Pencahayaan Baik</h4>
                        <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                          Hindari bayangan atau ruangan yang terlalu gelap.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-3 items-start">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                        {/* No glare / Camera flash slash icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3l18 18M10.5 6.5H15l2 3h4a1 1 0 011 1v9a1 1 0 01-1 1H8m-4 0a1 1 0 01-1-1v-9a1 1 0 011-1h2l1-1.5" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Tanpa Pantulan</h4>
                        <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                          Pastikan tidak ada kilau lampu pada permukaan dokumen.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-3 items-start">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                        {/* Frame icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Terlihat Utuh</h4>
                        <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                          Keempat sudut dokumen harus masuk dalam frame foto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dark Security Guarantee Card */}
                <div className="bg-[#0B192C] text-white rounded-3xl p-6 relative overflow-hidden shadow-lg">
                  {/* Subtle Background Shield Watermark */}
                  <div className="absolute right-[-15px] bottom-[-20px] opacity-10 pointer-events-none">
                    <svg className="w-36 h-36 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-white">Privasi Terjamin</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dokumen Anda diproses menggunakan enkripsi AES-256 bit tingkat bank dan hanya digunakan untuk proses verifikasi penyewaan.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    ISO 27001 CERTIFIED
                  </div>
                </div>
              </div>

              {/* Right Column: Upload Cards & Actions (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* KTP Upload Card */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">KTP</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Kartu Tanda Penduduk</p>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 00-3 3h6a3 3 0 00-3-3z" />
                          </svg>
                        </div>
                      </div>

                      {/* Dropzone KTP */}
                      <input 
                        type="file" 
                        ref={ktpInputRef}
                        accept="image/*"
                        onChange={e => setKtpFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <div 
                        onClick={() => ktpInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[150px] ${
                          ktpFile 
                            ? 'border-green-400 bg-green-50/30' 
                            : 'border-gray-200 bg-[#F8FAFC] hover:bg-blue-50/40 hover:border-blue-300'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                          ktpFile ? 'bg-green-100 text-green-600' : 'bg-blue-100/70 text-blue-600'
                        }`}>
                          {ktpFile ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <circle cx="12" cy="13" r="3" strokeWidth={1.8} />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs font-bold text-gray-800">
                          {ktpFile ? ktpFile.name : 'Ambil Foto KTP'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {ktpFile ? `${(ktpFile.size / 1024 / 1024).toFixed(2)} MB` : 'JPG, PNG (Maks 5MB)'}
                        </p>
                      </div>
                    </div>

                    {/* Notice pill */}
                    <div className="mt-4 py-2.5 px-3 rounded-xl bg-blue-50/80 text-blue-600 text-[11px] font-medium flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Pastikan NIK terlihat sangat jelas</span>
                    </div>
                  </div>

                  {/* SIM A Upload Card */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">SIM A</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Surat Izin Mengemudi</p>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                      </div>

                      {/* Dropzone SIM */}
                      <input 
                        type="file" 
                        ref={simInputRef}
                        accept="image/*"
                        onChange={e => setSimFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <div 
                        onClick={() => simInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[150px] ${
                          simFile 
                            ? 'border-green-400 bg-green-50/30' 
                            : 'border-gray-200 bg-[#F8FAFC] hover:bg-blue-50/40 hover:border-blue-300'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                          simFile ? 'bg-green-100 text-green-600' : 'bg-blue-100/70 text-blue-600'
                        }`}>
                          {simFile ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs font-bold text-gray-800">
                          {simFile ? simFile.name : 'Unggah Foto SIM'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {simFile ? `${(simFile.size / 1024 / 1024).toFixed(2)} MB` : 'JPG, PNG (Maks 5MB)'}
                        </p>
                      </div>
                    </div>

                    {/* Notice pill */}
                    <div className="mt-4 py-2.5 px-3 rounded-xl bg-blue-50/80 text-blue-600 text-[11px] font-medium flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Masa berlaku SIM minimal 3 bulan</span>
                    </div>
                  </div>

                </div>

                {/* Status Bar & Action Buttons */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Status Unggahan</h4>
                      <p className={`text-xs mt-0.5 ${uploadedCount === 2 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                        {uploadedCount === 0 && 'Belum ada file terpilih'}
                        {uploadedCount === 1 && '1 dari 2 dokumen terunggah'}
                        {uploadedCount === 2 && '2 dari 2 dokumen terunggah (Lengkap)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button 
                      onClick={prevStep} 
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-xl transition-colors"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={nextStep} 
                      className="w-1/2 sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Summary */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Kendaraan</span>
                <span className="font-bold text-gray-800">{vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Peminjam</span>
                <span className="font-bold text-gray-800">{nama} ({wa})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Durasi</span>
                <span className="font-bold text-gray-800">{days} Hari</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
                <span className="font-bold text-gray-900">Total Harga</span>
                <span className="font-bold text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">
                Kembali
              </button>
              <button 
                onClick={submitBooking} 
                disabled={submitting} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 text-sm disabled:opacity-50"
              >
                {submitting ? 'Memproses...' : 'Konfirmasi & Bayar'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

