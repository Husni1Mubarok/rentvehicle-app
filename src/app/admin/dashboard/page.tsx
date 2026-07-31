'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(undefined);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          // Regular customer user redirect to dashboard
          router.push('/dashboard');
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
        .select('*, vehicles(name)')
        .order('created_at', { ascending: false });
      if (data) {
        setBookingsList(data);
      }
    } catch (e) {
      console.error(e);
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
          <div className="flex border-b border-gray-100 hide-on-print">
            <button 
              onClick={() => setActiveTab('vehicles')}
              className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'vehicles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Kelola Kendaraan ({vehicles.length})
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Kelola Booking ({bookingsList.length})
            </button>
          </div>

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
                        <th className="px-4 py-3 rounded-l-xl">Nama Kendaraan</th>
                        <th className="px-4 py-3">Tipe & Transmisi</th>
                        <th className="px-4 py-3">Kapasitas</th>
                        <th className="px-4 py-3">Lokasi</th>
                        <th className="px-4 py-3">Harga / Hari</th>
                        <th className="px-4 py-3 text-right rounded-r-xl hide-on-print">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {vehicles.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-400 font-semibold">
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
                            <td className="px-4 py-3.5 text-gray-600 font-medium">{v.location || 'Jakarta'}</td>
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
                        <th className="px-4 py-3 text-right rounded-r-xl">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookingsList.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-gray-400 font-semibold">
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
                              <td className="px-4 py-3.5 text-gray-600 font-medium">{b.vehicles?.name || 'Kendaraan'}</td>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">{editingVehicle ? 'Edit' : 'Tambah Produk'} Kendaraan</h2>
            
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Lokasi Kendaraan</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                  placeholder="Jakarta, Bandung, Surabaya..."
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Foto Utama Produk</label>
                <input 
                  type="url" 
                  value={formData.image_url} 
                  onChange={e => setFormData({...formData, image_url: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                />
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

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xs text-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {submitting ? 'Memproses...' : 'Simpan Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
