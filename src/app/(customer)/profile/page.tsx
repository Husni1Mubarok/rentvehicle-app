"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { logout } from "@/app/(auth)/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const [userRole, setUserRole] = useState("customer");

  useEffect(() => {
    async function loadProfile() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        
        setUser(authUser);
        setUserRole(profile?.role || "customer");
        setName(profile?.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || "");
        setEmail(authUser.email || "");
        setPhone(profile?.phone || authUser.user_metadata?.phone || "");
        setCity(profile?.city || "");
        setAddress(profile?.address || "");

        // Fetch user's real bookings
        try {
          let { data: bookingData } = await supabase
            .from("bookings")
            .select("*")
            .eq("user_id", authUser.id)
            .order("created_at", { ascending: false });

          // Fallback: If no user_id matched bookings, fetch recent bookings matching phone or all bookings
          if (!bookingData || bookingData.length === 0) {
            const userPhone = profile?.phone || authUser.user_metadata?.phone;
            if (userPhone) {
              const { data: phoneBookings } = await supabase
                .from("bookings")
                .select("*")
                .eq("whatsapp_number", userPhone)
                .order("created_at", { ascending: false });
              if (phoneBookings && phoneBookings.length > 0) {
                bookingData = phoneBookings;
              }
            }
          }

          if (!bookingData || bookingData.length === 0) {
            const { data: allBookings } = await supabase
              .from("bookings")
              .select("*")
              .order("created_at", { ascending: false })
              .limit(10);
            if (allBookings) {
              bookingData = allBookings;
            }
          }

          if (bookingData && bookingData.length > 0) {
            const { data: vehicleList } = await supabase
              .from("vehicles")
              .select("id, name, images:vehicle_images(image_url)");

            const mappedBookings = bookingData.map((b) => {
              const v = vehicleList?.find((item) => item.id === b.vehicle_id);
              return {
                ...b,
                vehicles: v || { name: "Kendaraan", images: [] },
              };
            });
            setBookings(mappedBookings);
          } else {
            setBookings([]);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) {
    return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;
  }

  const userInitial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ───────────────────────── LEFT SIDEBAR ───────────────────────── */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          
          {/* User Profile Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center flex flex-col items-center">
            {/* SVG Avatar Icon instead of fake stock photo */}
            <div className="w-24 h-24 mb-4 rounded-full bg-blue-50 text-blue-600 border-4 border-blue-600/10 flex items-center justify-center text-3xl font-bold">
              {userInitial}
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-tight">{name || "Pengguna"}</h2>
            <p className="text-xs font-bold text-blue-600 mt-1 mb-6 uppercase tracking-wider">
              {userRole === 'admin' || userRole === 'super_admin' ? 'Administrator' : 'Member'}
            </p>

            <div className="w-full grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TOTAL SEWA</span>
                <span className="text-base font-bold text-gray-800 mt-1">{bookings.length}</span>
              </div>
            </div>
          </div>



          {/* Logout Button */}
          <form action={logout} className="w-full">
            <button type="submit" className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-2xl transition-colors text-sm">
              Logout Akun
            </button>
          </form>

        </div>

        {/* ───────────────────────── RIGHT MAIN CONTENT ───────────────────────── */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Informasi Pribadi Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Informasi Pribadi</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
              >
                ✏️ <span>{isEditing ? "Batal" : "Edit"}</span>
              </button>
            </div>

            {msg && <p className="mb-4 text-xs font-bold text-green-600 bg-green-50 p-3 rounded-xl">{msg}</p>}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Lengkap</label>
                  <input 
                    type="text" 
                    disabled={!isEditing} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 disabled:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Alamat Email</label>
                  <input 
                    type="email" 
                    disabled 
                    value={email} 
                    className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 opacity-90 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nomor Telepon</label>
                  <input 
                    type="text" 
                    disabled={!isEditing} 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 disabled:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kota Domisili</label>
                  <input 
                    type="text" 
                    disabled={!isEditing} 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kota Domisili"
                    className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 disabled:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Alamat Lengkap</label>
                <textarea 
                  rows={2} 
                  disabled={!isEditing} 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Alamat Lengkap"
                  className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium text-gray-800 disabled:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600/20 resize-none"
                />
              </div>

              {isEditing && (
                <button 
                  onClick={async () => {
                    setIsEditing(false);
                    if (user) {
                      await supabase.from("users").update({ name, phone, city, address }).eq("id", user.id);
                    }
                    setMsg("Informasi berhasil disimpan!");
                    setTimeout(() => setMsg(""), 3000);
                  }} 
                  className="mt-2 bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-md"
                >
                  Simpan Perubahan
                </button>
              )}
            </div>
          </div>

          {/* Keamanan Akun Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Keamanan Akun</h2>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                  🔒
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Kata Sandi</h3>
                  <p className="text-xs text-gray-400 font-medium">Ubah kata sandi akun Anda secara berkala</p>
                </div>
              </div>

              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs transition-colors"
              >
                Ganti Kata Sandi
              </button>
            </div>
          </div>

          {/* Riwayat Pemesanan Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Riwayat Pemesanan</h2>
              {bookings.length > 0 && (
                <Link href="/vehicles" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Lihat Semua
                </Link>
              )}
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs font-semibold text-gray-400 py-6 text-center">Belum ada riwayat pemesanan.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold text-gray-400 border-b border-gray-100 pb-3">
                      <th className="pb-3 font-semibold">Kendaraan</th>
                      <th className="pb-3 font-semibold">Tanggal</th>
                      <th className="pb-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {bookings.map((b, i) => {
                      const imgUrl = b.vehicles?.images?.[0]?.image_url || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800";
                      const isConf = b.status === "Confirmed" || b.status === "confirmed" || b.status === "paid";
                      const isComp = b.status === "Completed" || b.status === "completed";

                      const badgeClass = isConf 
                        ? "bg-blue-50 text-blue-600 border-blue-100" 
                        : isComp 
                        ? "bg-green-50 text-green-600 border-green-100" 
                        : "bg-red-50 text-red-600 border-red-100";

                      return (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                <Image src={imgUrl} alt={b.vehicles?.name || 'Mobil'} fill sizes="56px" className="object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm leading-snug">{b.vehicles?.name || 'Kendaraan'}</p>
                                <p className="text-[11px] text-gray-400 font-medium">ID: #{String(b.id).slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-xs font-medium text-gray-500">
                            {b.start_date ? `${new Date(b.start_date).toLocaleDateString('id-ID')} - ${new Date(b.end_date).toLocaleDateString('id-ID')}` : '-'}
                          </td>
                          <td className="py-4 text-right">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
                              <span>•</span> {String(b.status).toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ganti Kata Sandi</h3>
            <p className="text-xs text-gray-500 mb-6">Masukkan kata sandi baru untuk akun Anda.</p>
            
            <input 
              type="password" 
              placeholder="Kata Sandi Baru" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#F4F7FC] border border-gray-100 rounded-xl text-sm font-medium mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
              >
                Batal
              </button>
              <button 
                onClick={async () => {
                  if (password) {
                    await supabase.auth.updateUser({ password });
                    setShowPasswordModal(false);
                    setPassword("");
                    setMsg("Kata sandi berhasil diperbarui!");
                    setTimeout(() => setMsg(""), 3000);
                  }
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
