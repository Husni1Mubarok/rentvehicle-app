'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import LoadingSpinner from '@/components/LoadingSpinner';

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');

  const [session, setSession] = useState<any>(undefined);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tabQuery === 'bookings' || tabQuery === 'vehicles') {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  // Modal State for CRUD
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'MPV',
    transmission: 'Otomatis',
    capacity: 5,
    price_per_day: 400000,
    location: 'Jakarta',
    description: '',
    image_url: ''
  });

  // Modal State for Booking Detail
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  useEffect(() => {
    async function checkAdminAuth() {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        // Fallback check session storage
        const localSession = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('session') || 'null') : null;
        if (!localSession || (localSession.role && localSession.role !== 'admin' && localSession.role !== 'super_admin')) {
          router.push('/login?redirect=/admin/dashboard');
          return;
        }
        setSession(localSession);
      } else {
        // Check database profile role
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', currentSession.user.id)
          .single();

        if (profile && profile.role !== 'admin' && profile.role !== 'super_admin') {
          // Regular customer user redirect to profile
          router.push('/profile');
          return;
        }
        setSession(currentSession);
      }
      await Promise.all([fetchVehicles(), fetchBookings()]);
      setLoading(false);
    }
    checkAdminAuth();
  }, [router]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles?limit=100');
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) {
        setBookingsList(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setBookingsList(bookingsList.map(b => b.id === id ? { ...b, status: newStatus } : b));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (e) {
      console.error('Gagal update status:', e);
      alert('Gagal mengupdate status booking');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kendaraan ini dari katalog?')) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
      } else {
        alert('Gagal menghapus kendaraan.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, image_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const method = editingVehicle ? 'PUT' : 'POST';
    const url = editingVehicle ? `/api/vehicles/${editingVehicle.id}` : '/api/vehicles';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        await fetchVehicles();
      } else {
        const data = await res.json();
        alert(data.message || 'Gagal menyimpan data kendaraan');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan koneksi');
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (vehicle: any = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      const img = vehicle.images?.[0]?.image_url || '';
      setFormData({
        name: vehicle.name || '',
        type: vehicle.type || 'MPV',
        transmission: vehicle.transmission || 'Otomatis',
        capacity: vehicle.capacity || 5,
        price_per_day: vehicle.price_per_day || 400000,
        location: vehicle.location || 'Jakarta',
        description: vehicle.description || '',
        image_url: img
      });
    } else {
      setEditingVehicle(null);
      setFormData({
        name: '',
        type: 'MPV',
        transmission: 'Otomatis',
        capacity: 5,
        price_per_day: 400000,
        location: 'Jakarta',
        description: '',
        image_url: ''
      });
    }
    setShowModal(true);
  };

  const openDetailModal = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const printReport = () => {
    window.print();
  };

  if (session === undefined || loading) {
    return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500">Kelola katalog produk kendaraan dan daftar booking penyewaan</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => openModal()} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 hide-on-print"
            >
              <span>+</span> Tambah Produk Kendaraan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden print-container">
          <div className="p-6">
            {/* TAB 1: KELOLA KENDARAAN */}
            {activeTab === 'vehicles' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-4 hide-on-print">
                  <h2 className="text-xl font-bold text-gray-800">Daftar Produk Kendaraan</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Nama Produk</th>
                        <th className="px-4 py-3">Spesifikasi</th>
                        <th className="px-4 py-3">Kapasitas</th>
                        <th className="px-4 py-3">Harga / Hari</th>
                        <th className="px-4 py-3 text-right rounded-r-xl hide-on-print">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {vehicles.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-400 font-semibold">
                            Belum ada data kendaraan. Klik tombol "+ Tambah Produk Kendaraan" untuk membuat produk baru.
                          </td>
                        </tr>
                      ) : (
                        vehicles.map(v => (
                          <tr key={v.id} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3.5 font-bold text-gray-900 flex items-center gap-3">
                              {v.images?.[0]?.image_url && (
                                <img src={v.images[0].image_url} alt={v.name} className="w-10 h-8 object-cover rounded-lg border border-gray-100" />
                              )}
                              <span>{v.name}</span>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 font-medium">{v.type} ({v.transmission})</td>
                            <td className="px-4 py-3.5 text-gray-600 font-medium">{v.capacity} Orang</td>
                            <td className="px-4 py-3.5 font-bold text-blue-600">Rp {(v.price_per_day || 0).toLocaleString('id-ID')}</td>
                            <td className="px-4 py-3.5 text-right space-x-3 hide-on-print">
                              <button onClick={() => openModal(v)} className="text-blue-600 font-bold hover:underline">Edit</button>
                              <button onClick={() => handleDelete(v.id)} className="text-red-600 font-bold hover:underline">Hapus</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: KELOLA BOOKING */}
            {activeTab === 'bookings' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Laporan Booking Penyewaan</h2>
                  <button onClick={printReport} className="bg-gray-800 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-gray-900 hide-on-print">
                    🖨️ Print / Cetak Laporan
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">Kode Booking</th>
                        <th className="px-4 py-3">Penyewa</th>
                        <th className="px-4 py-3">WhatsApp</th>
                        <th className="px-4 py-3">Kendaraan</th>
                        <th className="px-4 py-3">Tanggal Sewa</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Total Harga</th>
                        <th className="px-4 py-3 text-center rounded-r-xl hide-on-print">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookingsList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-8 text-gray-400 font-semibold">
                            Belum ada pesanan booking masuk.
                          </td>
                        </tr>
                      ) : (
                        bookingsList.map((b) => {
                          const isConf = b.status === "Confirmed" || b.status === "confirmed" || b.status === "paid";
                          const isComp = b.status === "Completed" || b.status === "completed";

                          const badgeClass = isConf 
                            ? "bg-blue-50 text-blue-600 border-blue-100" 
                            : isComp 
                            ? "bg-green-50 text-green-600 border-green-100" 
                            : "bg-amber-50 text-amber-600 border-amber-100";

                          return (
                            <tr key={b.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3.5 font-bold text-gray-900">{b.booking_code || `#${String(b.id).slice(0, 8)}`}</td>
                              <td className="px-4 py-3.5 font-semibold text-gray-800">{b.borrower_name || 'Pelanggan'}</td>
                              <td className="px-4 py-3.5 text-gray-600 font-medium">{b.whatsapp_number || '-'}</td>
                              <td className="px-4 py-3.5 text-gray-600 font-medium">{vehicles.find(v => v.id === b.vehicle_id)?.name || 'Kendaraan'}</td>
                              <td className="px-4 py-3.5 text-xs text-gray-500 font-medium">
                                {b.start_date ? `${b.start_date} s/d ${b.end_date}` : '-'}
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
                                  • {String(b.status || 'pending').toUpperCase()}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-right font-bold text-blue-600">
                                Rp {(b.total_price || 0).toLocaleString('id-ID')}
                              </td>
                              <td className="px-4 py-3.5 text-center hide-on-print">
                                <button 
                                  onClick={() => openDetailModal(b)} 
                                  className="text-white bg-blue-600 hover:bg-blue-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors"
                                >
                                  Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Kendaraan */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#0f172a] mb-1">{editingVehicle ? 'Edit' : 'Tambah'} Produk Kendaraan</h2>
            <p className="text-xs text-gray-400 mb-6 font-medium">Lengkapi informasi kendaraan di bawah ini untuk menambahkan unit baru.</p>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Kendaraan / Produk</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="Contoh: Toyota Fortuner VRZ"
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipe Kendaraan</label>
                  <select 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})} 
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="MPV">MPV</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Motor">Motor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Transmisi</label>
                  <select 
                    value={formData.transmission} 
                    onChange={e => setFormData({...formData, transmission: e.target.value})} 
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="Otomatis">Otomatis</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kapasitas (Orang)</label>
                  <input 
                    required 
                    type="number" 
                    value={formData.capacity} 
                    onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} 
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga per Hari (Rp)</label>
                  <input 
                    required 
                    type="number" 
                    value={formData.price_per_day} 
                    onChange={e => setFormData({...formData, price_per_day: Number(e.target.value)})} 
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Foto Utama Produk (Upload File atau URL)</label>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={formData.image_url} 
                    onChange={e => setFormData({...formData, image_url: e.target.value})} 
                    placeholder="Tempelkan URL gambar (http://... atau https://...)" 
                    className="w-full border border-gray-200 px-4 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                  <div className="flex justify-center px-6 pt-4 pb-4 border-2 border-gray-100 border-dashed rounded-xl bg-[#fcfdfd] relative overflow-hidden group hover:bg-gray-50 hover:border-blue-300 transition-colors">
                    <div className="space-y-1 text-center relative z-10 flex flex-col items-center">
                      <div className="flex text-[13px] text-gray-500 font-medium justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-semibold text-blue-600 focus-within:outline-none">
                          <span className="text-gray-500 font-medium">Atau unggah berkas dari komputer </span>
                          <span className="underline decoration-1 underline-offset-2">pilih file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                        </label>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Mendukung format: JPG, PNG, WEBP (Maks. 5MB)</p>
                    </div>
                  </div>
                  {formData.image_url && (
                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Kendaraan</label>
                <textarea 
                  rows={3}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="Jelaskan spesifikasi & kondisi kendaraan..."
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 resize-none" 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-5 py-2.5 bg-transparent rounded-xl font-bold text-xs text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-8 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-bold text-xs transition-all disabled:opacity-50"
                >
                  {submitting ? 'Memproses...' : 'Simpan Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Booking (Matches Mockup) */}
      {showDetailModal && selectedBooking && (() => {
        const vehicle = vehicles.find(v => v.id === selectedBooking.vehicle_id);
        const vehicleImg = vehicle?.images?.[0]?.image_url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800";
        const invNumber = `INV/${new Date().getFullYear()}/${String(selectedBooking.booking_code || selectedBooking.id).slice(-3)}`;
        
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div className="bg-[#F8FAFC] w-full max-w-6xl rounded-3xl p-6 md:p-10 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 border border-white">
              
              {/* Header & Breadcrumbs */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-semibold text-gray-400 space-x-1">
                    <span>Dashboard</span>
                    <span>/</span>
                    <span>Booking History</span>
                    <span>/</span>
                    <span className="text-blue-600 font-bold">Detail Booking</span>
                  </div>
                  <h1 className="text-3xl font-black text-[#0f172a] mt-1">Detail Booking</h1>
                </div>

                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>Tutup Detail</span>
                </button>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* ────────────────── COLUMN 1: INFORMASI PEMESANAN ────────────────── */}
                <div className="flex flex-col gap-6">
                  {/* Card 1: Informasi Pemesanan */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-6">
                        <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">📋</span>
                        <span>INFORMASI PEMESANAN</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Kode Booking</span>
                          <span className="text-lg font-black text-gray-900">{selectedBooking.booking_code || `#${String(selectedBooking.id).slice(0, 8)}`}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Tanggal Sewa</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-800">{selectedBooking.start_date || '21 Juli 2026'} — {selectedBooking.end_date || '30 Juli 2026'}</span>
                            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                              {selectedBooking.total_day || 1} Hari
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Total Biaya</span>
                          <span className="text-2xl font-black text-blue-600 block mt-1">Rp {(selectedBooking.total_price || 0).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Status Pembayaran / Sewa</label>
                          <select 
                            value={selectedBooking.status || 'pending'} 
                            onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value)}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 bg-gray-50/80 text-gray-800"
                          >
                            <option value="pending">🕒 Pending</option>
                            <option value="confirmed">✅ Confirmed (Lunas)</option>
                            <option value="completed">🎉 Completed (Selesai)</option>
                            <option value="cancelled">❌ Cancelled (Batal)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Generated Box */}
                  <div className="bg-blue-600 rounded-3xl p-5 text-white flex items-center justify-between shadow-xl shadow-blue-600/25">
                    <div>
                      <span className="block text-xs font-semibold text-blue-200">Invoice Generated</span>
                      <span className="text-sm font-bold tracking-wider">{invNumber}</span>
                    </div>
                    <button 
                      onClick={() => window.print()}
                      className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
                      title="Cetak / Download Invoice"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ────────────────── COLUMN 2 & 3 RIGHT CONTAINER ────────────────── */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Top Row: Data Penyewa & Kendaraan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Card 2: Data Penyewa */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-6">
                          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">👤</span>
                          <span>DATA PENYEWA</span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Nama Penyewa</span>
                            <span className="text-base font-bold text-gray-900">{selectedBooking.borrower_name || '-'}</span>
                          </div>
                          <div>
                            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">No. WhatsApp</span>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm font-bold text-gray-800">{selectedBooking.whatsapp_number || '-'}</span>
                              {selectedBooking.whatsapp_number && (
                                <a 
                                  href={`https://wa.me/${selectedBooking.whatsapp_number.replace(/\D/g,'')}`} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors shadow-sm shadow-emerald-500/20"
                                >
                                  <span>💬</span> Chat WA
                                </a>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Tujuan Sewa</span>
                            <span className="text-sm font-semibold text-gray-800 block mt-0.5">{selectedBooking.purpose || '-'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <span>📍</span>
                          <span>Alamat Penjemputan: {selectedBooking.purpose || 'Lokasi Kantor'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>🕒</span>
                          <span>Jam Diambil: 07:02</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Kendaraan */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
                          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">🚗</span>
                          <span>KENDARAAN</span>
                        </div>

                        <div>
                          <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Unit Terpilih</span>
                          <span className="text-lg font-black text-gray-900">{vehicle?.name || 'Toyota Agya'}</span>
                        </div>
                      </div>

                      <div className="relative h-44 w-full rounded-2xl overflow-hidden mt-4 bg-gray-900 border border-gray-100 group">
                        <img 
                          src={vehicleImg} 
                          alt={vehicle?.name || 'Mobil'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                            ⚙️ {vehicle?.transmission || 'AT'}
                          </span>
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                            ⛽ Bensin
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Row: Dokumen Jaminan */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-6">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">🛡️</span>
                      <span>DOKUMEN JAMINAN</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* FOTO KTP */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">FOTO KTP</span>
                        {selectedBooking.ktp_url ? (
                          <a 
                            href={selectedBooking.ktp_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden relative group flex items-center justify-center hover:border-blue-400 transition-colors p-2"
                          >
                            <img src={selectedBooking.ktp_url} alt="KTP" className="w-full h-full object-contain rounded-xl" />
                            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                              <span className="text-lg mb-1">🔍</span>
                              <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">Klik untuk memperbesar</span>
                            </div>
                          </a>
                        ) : (
                          <div className="w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs font-medium">
                            Foto KTP tidak tersedia
                          </div>
                        )}
                      </div>

                      {/* FOTO SIM */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">FOTO SIM</span>
                        {selectedBooking.sim_url ? (
                          <a 
                            href={selectedBooking.sim_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden relative group flex items-center justify-center hover:border-blue-400 transition-colors p-2"
                          >
                            <img src={selectedBooking.sim_url} alt="SIM" className="w-full h-full object-contain rounded-xl" />
                            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                              <span className="text-lg mb-1">🔍</span>
                              <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">Klik untuk memperbesar</span>
                            </div>
                          </a>
                        ) : (
                          <div className="w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs font-medium">
                            Foto SIM tidak tersedia
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        );
      })()}

      <style jsx global>{`
        @media print {
          .hide-on-print { display: none !important; }
          body { background: white !important; }
          .print-container { box-shadow: none !important; border: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="py-24 flex justify-center"><LoadingSpinner /></div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
