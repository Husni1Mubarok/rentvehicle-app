"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      let { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Fallback by phone
      if (!bookingData || bookingData.length === 0) {
        const { data: profile } = await supabase
          .from("users")
          .select("phone")
          .eq("id", user.id)
          .single();
        if (profile?.phone) {
          const { data: phoneBookings } = await supabase
            .from("bookings")
            .select("*")
            .eq("whatsapp_number", profile.phone)
            .order("created_at", { ascending: false });
          if (phoneBookings && phoneBookings.length > 0) {
            bookingData = phoneBookings;
          }
        }
      }

      if (bookingData && bookingData.length > 0) {
        const { data: vehicleList } = await supabase
          .from("vehicles")
          .select("id, name, images:vehicle_images(image_url)");

        const mapped = bookingData.map((b) => {
          const v = vehicleList?.find((item) => item.id === b.vehicle_id);
          return { ...b, vehicle: v || { name: "Kendaraan", images: [] } };
        });
        setBookings(mapped);
      } else {
        setBookings([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const statusColor: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    paid:      { bg: "bg-blue-50",   text: "text-blue-600",  border: "border-blue-100",  dot: "bg-blue-400" },
    confirmed: { bg: "bg-blue-50",   text: "text-blue-600",  border: "border-blue-100",  dot: "bg-blue-400" },
    completed: { bg: "bg-green-50",  text: "text-green-600", border: "border-green-100", dot: "bg-green-400" },
    pending:   { bg: "bg-amber-50",  text: "text-amber-600", border: "border-amber-100", dot: "bg-amber-400" },
    cancelled: { bg: "bg-red-50",    text: "text-red-600",   border: "border-red-100",   dot: "bg-red-400" },
  };

  const getStatusStyle = (status: string) => {
    const key = (status || "").toLowerCase();
    return statusColor[key] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100", dot: "bg-gray-400" };
  };

  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter((b) => (b.status || "").toLowerCase() === filter);

  const statusTabs = [
    { key: "all",       label: "Semua" },
    { key: "pending",   label: "Menunggu" },
    { key: "paid",      label: "Dibayar" },
    { key: "confirmed", label: "Dikonfirmasi" },
    { key: "completed", label: "Selesai" },
    { key: "cancelled", label: "Dibatalkan" },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/profile" className="text-gray-400 hover:text-blue-600 text-sm font-medium transition-colors">
                ← Kembali ke Profil
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Riwayat Pemesanan</h1>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              {bookings.length} pemesanan total
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {statusTabs.map((tab) => {
            const count =
              tab.key === "all"
                ? bookings.length
                : bookings.filter((b) => (b.status || "").toLowerCase() === tab.key).length;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filter === tab.key
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                    : "bg-white text-gray-500 border-gray-100 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-semibold">
              {filter === "all" ? "Belum ada riwayat pemesanan." : "Tidak ada pemesanan dengan status ini."}
            </p>
            <Link
              href="/vehicles"
              className="mt-6 inline-block bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Sewa Kendaraan Sekarang
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((b) => {
              const imgUrl =
                b.vehicle?.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800";
              const style = getStatusStyle(b.status);
              const startDate = b.start_date
                ? new Date(b.start_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-";
              const endDate = b.end_date
                ? new Date(b.end_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-";
              const totalPrice = b.total_price
                ? `Rp ${Number(b.total_price).toLocaleString("id-ID")}`
                : "-";

              return (
                <Link
                  key={b.id}
                  href={`/bookings/${b.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all p-5 flex items-center gap-5"
                >
                  {/* Vehicle Image */}
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <Image
                      src={imgUrl}
                      alt={b.vehicle?.name || "Kendaraan"}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-900 leading-snug text-sm truncate">
                          {b.vehicle?.name || "Kendaraan"}
                        </p>
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                          Kode: {b.booking_code || `#${String(b.id).slice(0, 8)}`}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border shrink-0 ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {String(b.status || "").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 font-medium">
                      <span>📅 {startDate} – {endDate}</span>
                      <span>•</span>
                      <span className="font-bold text-gray-700">{totalPrice}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-lg">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
