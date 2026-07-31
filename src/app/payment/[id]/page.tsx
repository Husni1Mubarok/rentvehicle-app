"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PaymentPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Wizard state: 1 (Metode), 2 (Simulasi), 3 (Sukses), 4 (Gagal)
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');

  useEffect(() => {
    // Simulate loading booking summary
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSimulatePayment = async (status: 'paid' | 'cancelled') => {
    setProcessing(true);
    try {
      const res = await fetch("/api/payment/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: id, status }),
      });
      if (res.ok) {
        setStep(status === 'paid' ? 3 : 4);
      } else {
        setStep(4);
      }
    } catch (e) {
      setStep(4);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-lg w-full">
        
        {step === 1 && (
          <div className="animate-in fade-in zoom-in duration-300">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Metode Pembayaran</h1>
            <p className="text-gray-500 mb-8">Pilih cara bayar untuk booking ID: <span className="font-bold text-gray-800">{id}</span></p>

            <div className="space-y-4 mb-8">
              <div 
                onClick={() => setSelectedMethod('bank')}
                className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition-all ${selectedMethod === 'bank' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <span className="text-2xl">🏦</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Transfer Bank / Virtual Account</h3>
                  <p className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'bank' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}></div>
              </div>

              <div 
                onClick={() => setSelectedMethod('ewallet')}
                className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition-all ${selectedMethod === 'ewallet' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <span className="text-2xl">📱</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">E-Wallet</h3>
                  <p className="text-sm text-gray-500">GoPay, OVO, Dana</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'ewallet' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}></div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedMethod}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              Bayar Sekarang
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in zoom-in duration-300">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Simulasi Pembayaran</h1>
            <p className="text-gray-500 mb-8">Pilih hasil simulasi pembayaran gateway untuk testing.</p>

            <div className="space-y-4">
              <button
                onClick={() => handleSimulatePayment('paid')}
                disabled={processing}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {processing ? "Memproses..." : "Simulasi Bayar Berhasil"}
              </button>
              
              <button
                onClick={() => handleSimulatePayment('cancelled')}
                disabled={processing}
                className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all disabled:opacity-50"
              >
                {processing ? "Memproses..." : "Simulasi Bayar Gagal"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in zoom-in duration-300 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Pembayaran Sukses!</h1>
            <p className="text-gray-500 mb-8">Booking Anda telah dikonfirmasi dan siap digunakan.</p>
            
            <div className="space-y-3">
              <Link href="/" className="block w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
                Kembali ke Beranda
              </Link>
              <Link href="/profile" className="block w-full py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all">
                Lihat Booking Saya (Riwayat)
              </Link>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in zoom-in duration-300 text-center">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✕</div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Pembayaran Gagal</h1>
            <p className="text-gray-500 mb-8">Terjadi kesalahan pada saat memproses pembayaran Anda.</p>
            <button onClick={() => setStep(1)} className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-all mb-3">
              Coba Lagi
            </button>
            <Link href="/profile" className="block w-full py-3.5 text-blue-600 font-bold hover:underline transition-all">
              Kembali ke Profil
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
