'use client';
import React, { useState, useEffect } from 'react';
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
  
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [simFile, setSimFile] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      if (!nama || !wa || !tujuan || !tglMulai || !tglSelesai) {
        setErrorMsg('Semua kolom harus diisi.');
        return;
      }
      if (days <= 0) {
        setErrorMsg('Tanggal selesai harus setelah tanggal mulai.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!ktpFile || !simFile) {
        setErrorMsg('Mohon unggah dokumen KTP dan SIM Anda.');
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    setErrorMsg('');
    setStep(step - 1);
  };

  const submitBooking = async () => {
    setErrorMsg('');
    setSubmitting(true);
    
    try {
      let ktpUrl = 'https://via.placeholder.com/800x600.png?text=KTP+Dokumen';
      let simUrl = 'https://via.placeholder.com/800x600.png?text=SIM+Dokumen';

      const formData = new FormData();
      formData.append('vehicle_id', vehicle.id);
      formData.append('borrower_name', nama);
      formData.append('whatsapp_number', wa);
      formData.append('start_date', tglMulai);
      formData.append('end_date', tglSelesai);
      formData.append('purpose', tujuan);
      formData.append('total_price', totalPrice.toString());
      if (ktpUrl) formData.append('ktp_url', ktpUrl);
      if (simUrl) formData.append('sim_url', simUrl);

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

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Title & Subtitle Centered */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Checkout Booking</h1>
          <p className="text-sm text-gray-400 font-light">Selesaikan proses penyewaan kendaraan Anda dengan langkah mudah.</p>
        </div>
        
        {/* Stepper */}
        <div className="mb-12 px-4">
          <div className="flex items-center justify-between relative">
            {/* Connecting lines */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
            <div 
              className="absolute top-5 left-0 h-[2px] bg-blue-600 transition-all duration-300 -z-0" 
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            ></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                1
              </div>
              <span className={`text-xs font-semibold mt-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Form Data</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                2
              </div>
              <span className={`text-xs font-semibold mt-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Upload Dokumen</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10 bg-[#F8FAFC] px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                3
              </div>
              <span className={`text-xs font-semibold mt-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Ringkasan</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100">
          {step === 1 && (
            <div className="space-y-6">
              {/* Heading with Vertical Blue Accent */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Data Penyewa & Jadwal</h2>
              </div>
              
              {/* Nama Peminjam */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Nama Peminjam</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input 
                    type="text" 
                    value={nama} 
                    onChange={e => setNama(e.target.value)} 
                    placeholder="Sesuai KTP" 
                    className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" 
                  />
                </div>
              </div>
              
              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">💬</span>
                  <input 
                    type="tel" 
                    value={wa} 
                    onChange={e => setWa(e.target.value)} 
                    placeholder="08123456789" 
                    className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" 
                  />
                </div>
              </div>

              {/* Tanggal Mulai & Tanggal Selesai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
                  <input 
                    type="date" 
                    value={tglMulai} 
                    onChange={e => setTglMulai(e.target.value)} 
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Tanggal Selesai</label>
                  <input 
                    type="date" 
                    value={tglSelesai} 
                    onChange={e => setTglSelesai(e.target.value)} 
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors cursor-pointer" 
                  />
                </div>
              </div>

              {/* Tujuan Perjalanan */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Tujuan Perjalanan</label>
                <textarea 
                  rows={3} 
                  value={tujuan} 
                  onChange={e => setTujuan(e.target.value)} 
                  placeholder="Contoh: Perjalanan dinas" 
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors resize-none" 
                />
              </div>
              
              {/* Submit Button */}
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

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Upload Dokumen Persyaratan</h2>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Upload KTP</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setKtpFile(e.target.files?.[0] || null)} 
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Upload SIM A / C</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setSimFile(e.target.files?.[0] || null)} 
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={prevStep} className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50">
                  Kembali
                </button>
                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 text-sm">
                  Lanjut <span>→</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
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
    </div>
  );
}
