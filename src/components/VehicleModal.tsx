'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';

interface VehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export default function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  const [namaPeminjam, setNamaPeminjam] = useState('');
  const [noWA, setNoWA] = useState('');
  const [tglMulai, setTglMulai] = useState('');
  const [tglSelesai, setTglSelesai] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [simFile, setSimFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const primaryImage = vehicle.images?.find((img) => img.is_primary) ?? vehicle.images?.[0];

  const isValidUrl = (url: string): boolean => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const calculateDays = () => {
    if (!tglMulai || !tglSelesai) return 0;
    const m = new Date(tglMulai);
    const s = new Date(tglSelesai);
    const diff = Math.round((s.getTime() - m.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const totalHarga = days * vehicle.price_per_day;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (days <= 0) {
      setAlert({ type: 'error', message: 'Tanggal selesai harus setelah tanggal mulai.' });
      return;
    }
    if (!ktpFile || !simFile) {
      setAlert({ type: 'error', message: 'KTP dan SIM harus diupload.' });
      return;
    }
    
    setIsLoading(true);
    setAlert(null);

    try {
      const formData = new FormData();
      formData.append('vehicle_id', vehicle.id);
      formData.append('borrower_name', namaPeminjam);
      formData.append('whatsapp_number', noWA);
      formData.append('start_date', tglMulai);
      formData.append('end_date', tglSelesai);
      formData.append('purpose', tujuan);
      formData.append('total_price', totalHarga.toString());
      formData.append('ktp', ktpFile);
      formData.append('sim', simFile);

      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setAlert({ type: 'error', message: errorData.message || 'Gagal mengajukan booking.' });
        setIsLoading(false);
        return;
      }
      
      setAlert({ type: 'success', message: 'Booking berhasil diajukan! Menunggu persetujuan admin.' });
      setNamaPeminjam('');
      setNoWA('');
      setTglMulai('');
      setTglSelesai('');
      setTujuan('');
      setKtpFile(null);
      setSimFile(null);
    } catch (_error) {
      setAlert({ type: 'error', message: 'Terjadi kesalahan jaringan.' });
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = {
    available: 'bg-green-100 text-green-800',
    booked: 'bg-yellow-100 text-yellow-800',
    rented: 'bg-red-100 text-red-800',
    maintenance: 'bg-gray-100 text-gray-800',
  }[vehicle.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          ✕
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column: Details */}
          <div>
            <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
              {primaryImage && isValidUrl(primaryImage.image_url) ? (
                <Image
                  src={primaryImage.image_url}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              ) : primaryImage ? (
                <div className="flex items-center justify-center h-full w-full text-4xl">
                  {primaryImage.image_url}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400">No Image</div>
              )}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{vehicle.name}</h2>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}>
                {vehicle.status === 'available' ? 'Tersedia' : vehicle.status}
              </span>
            </div>
            
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Tipe</span>
                <span className="font-medium text-gray-900">{vehicle.type}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Transmisi</span>
                <span className="font-medium text-gray-900">{vehicle.transmission}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Kapasitas</span>
                <span className="font-medium text-gray-900">{vehicle.capacity} orang</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Harga Sewa</span>
                <span className="font-medium text-blue-600">Rp {vehicle.price_per_day.toLocaleString('id-ID')} / hari</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Lokasi</span>
                <span className="font-medium text-gray-900">{vehicle.location}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Booking Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">Formulir Booking</h3>
            
            {alert && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                alert.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {alert.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nama Peminjam</label>
                <input
                  type="text"
                  required
                  value={namaPeminjam}
                  onChange={(e) => setNamaPeminjam(e.target.value)}
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={noWA}
                  onChange={(e) => setNoWA(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={tglMulai}
                    onChange={(e) => setTglMulai(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Tanggal Selesai</label>
                  <input
                    type="date"
                    required
                    value={tglSelesai}
                    onChange={(e) => setTglSelesai(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Tujuan Perjalanan</label>
                <textarea
                  required
                  rows={2}
                  value={tujuan}
                  onChange={(e) => setTujuan(e.target.value)}
                  placeholder="Contoh: Perjalanan dinas ke Surabaya"
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload KTP</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setKtpFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500
                      file:mr-3 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 cursor-pointer
                      border border-gray-200 rounded-xl bg-gray-50 p-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload SIM</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setSimFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500
                      file:mr-3 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 cursor-pointer
                      border border-gray-200 rounded-xl bg-gray-50 p-1"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t mt-6">
                <span className="text-gray-600 font-medium">Estimasi Total</span>
                <span className="text-xl font-bold text-blue-600">Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>
              
              <button
                type="submit"
                disabled={vehicle.status !== 'available' || isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all transform hover:-translate-y-0.5 shadow-lg ${
                  vehicle.status === 'available' && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/25'
                    : 'bg-gray-400 cursor-not-allowed transform-none shadow-none'
                }`}
              >
                {isLoading ? 'Memproses...' : vehicle.status === 'available' ? 'Ajukan Booking' : 'Kendaraan Tidak Tersedia'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
