'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/data';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(undefined);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for CRUD
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', type: 'MPV', transmission: 'Otomatis', capacity: 5, price_per_day: 0
  });

  useEffect(() => {
    const s = getSession();
    if (s === null) {
      router.push('/login');
    } else if (s && s.role !== 'admin') {
      router.push('/'); // Or unauthorized
    } else {
      setSession(s);
      fetchVehicles();
    }
  }, [router]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vehicles?limit=50');
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kendaraan ini?')) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
        fetchVehicles();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (vehicle: any = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        name: vehicle.name,
        type: vehicle.type,
        transmission: vehicle.transmission,
        capacity: vehicle.capacity,
        price_per_day: vehicle.price_per_day
      });
    } else {
      setEditingVehicle(null);
      setFormData({ name: '', type: 'MPV', transmission: 'Otomatis', capacity: 5, price_per_day: 0 });
    }
    setShowModal(true);
  };

  const printReport = () => {
    window.print();
  };

  if (session === undefined || loading) return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500">Kelola data kendaraan dan booking aplikasi</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden print-container">
          <div className="flex border-b border-gray-100 hide-on-print">
            <button 
              onClick={() => setActiveTab('vehicles')}
              className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'vehicles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Kelola Kendaraan
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Kelola Booking
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'vehicles' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between mb-4 hide-on-print">
                  <h2 className="text-xl font-bold text-gray-800">Daftar Kendaraan</h2>
                  <button onClick={() => openModal()} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    + Tambah Kendaraan
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">ID</th>
                        <th className="px-4 py-3">Nama Kendaraan</th>
                        <th className="px-4 py-3">Tipe</th>
                        <th className="px-4 py-3">Harga / Hari</th>
                        <th className="px-4 py-3 text-right rounded-r-xl hide-on-print">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {vehicles.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-semibold text-gray-900">{v.id}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{v.name}</td>
                          <td className="px-4 py-3 text-gray-500">{v.type} ({v.transmission})</td>
                          <td className="px-4 py-3 font-semibold text-blue-600">Rp {v.price_per_day.toLocaleString('id-ID')}</td>
                          <td className="px-4 py-3 text-right space-x-2 hide-on-print">
                            <button onClick={() => openModal(v)} className="text-indigo-600 font-bold hover:underline">Edit</button>
                            <button onClick={() => handleDelete(v.id)} className="text-red-600 font-bold hover:underline">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Laporan Booking</h2>
                  <button onClick={printReport} className="bg-gray-800 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-900 hide-on-print">
                    Export PDF / Print
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">Booking ID</th>
                        <th className="px-4 py-3">Penyewa</th>
                        <th className="px-4 py-3">Kendaraan</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right rounded-r-xl">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-gray-900">BKG-8831</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">John Doe</td>
                        <td className="px-4 py-3 text-gray-500">Toyota Avanza (K001)</td>
                        <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Confirmed</span></td>
                        <td className="px-4 py-3 text-right font-semibold">Rp 1.200.000</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-gray-900">BKG-9922</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">Jane Smith</td>
                        <td className="px-4 py-3 text-gray-500">Honda Brio (K002)</td>
                        <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                        <td className="px-4 py-3 text-right font-semibold">Rp 900.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{editingVehicle ? 'Edit' : 'Tambah'} Kendaraan</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipe</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border px-3 py-2 rounded-lg text-sm">
                    <option>MPV</option><option>SUV</option><option>Hatchback</option><option>Motor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Transmisi</label>
                  <select value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} className="w-full border px-3 py-2 rounded-lg text-sm">
                    <option>Otomatis</option><option>Manual</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kapasitas</label>
                  <input required type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} className="w-full border px-3 py-2 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga/Hari</label>
                  <input required type="number" value={formData.price_per_day} onChange={e => setFormData({...formData, price_per_day: Number(e.target.value)})} className="w-full border px-3 py-2 rounded-lg text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 rounded-lg font-bold text-sm hover:bg-gray-200">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700">Simpan</button>
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
