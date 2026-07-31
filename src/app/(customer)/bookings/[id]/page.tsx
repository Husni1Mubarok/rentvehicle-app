"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BookingDetailPage() {
  const { id } = useParams() as { id: string };
  const [booking, setBooking] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = `/login?redirect=/bookings/${id}`;
        return;
      }

      const { data, error: bookingErr } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();

      if (bookingErr || !data) {
        setError("Booking tidak ditemukan.");
        setLoading(false);
        return;
      }

      setBooking(data);

      // Fetch vehicle
      if (data.vehicle_id) {
        const { data: v } = await supabase
          .from("vehicles")
          .select("*, images:vehicle_images(image_url)")
          .eq("id", data.vehicle_id)
          .single();
        setVehicle(v || null);
      }

      setLoading(false);
    }
    load();
  }, [id]);

  const statusColor: Record<string, { bg: string; text: string; border: string; ring: string; label: string }> = {
    paid:      { bg: "bg-blue-50",   text: "text-blue-600",  border: "border-blue-200",  ring: "ring-blue-100",  label: "Sudah Dibayar" },
    confirmed: { bg: "bg-blue-50",   text: "text-blue-600",  border: "border-blue-200",  ring: "ring-blue-100",  label: "Dikonfirmasi" },
    completed: { bg: "bg-green-50",  text: "text-green-600", border: "border-green-200", ring: "ring-green-100", label: "Selesai" },
    pending:   { bg: "bg-amber-50",  text: "text-amber-600", border: "border-amber-200", ring: "ring-amber-100", label: "Menunggu Konfirmasi" },
    cancelled: { bg: "bg-red-50",    text: "text-red-600",   border: "border-red-200",   ring: "ring-red-100",   label: "Dibatalkan" },
  };

  const getStyle = (status: string) => {
    const key = (status || "").toLowerCase();
    return statusColor[key] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", ring: "ring-gray-100", label: status };
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pt-28 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-gray-600 font-semibold">{error || "Booking tidak ditemukan."}</p>
        <Link href="/bookings" className="text-blue-600 font-bold hover:underline">
          ← Kembali ke Riwayat
        </Link>
      </div>
    );
  }

  const style = getStyle(booking.status);
  const imgUrl =
    vehicle?.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800";

  const startDate = booking.start_date
    ? new Date(booking.start_date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";
  const endDate = booking.end_date
    ? new Date(booking.end_date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";
  const createdAt = booking.created_at
    ? new Date(booking.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const totalDays = booking.total_day || (() => {
    if (!booking.start_date || !booking.end_date) return 0;
    return Math.max(1, Math.ceil(
      (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) /
        (1000 * 60 * 60 * 24)
    ));
  })();

  const pricePerDay = vehicle?.price_per_day
    ? `Rp ${Number(vehicle.price_per_day).toLocaleString("id-ID")}`
    : "-";
  const totalPrice = booking.total_price
    ? `Rp ${Number(booking.total_price).toLocaleString("id-ID")}`
    : "-";

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/bookings"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 font-medium mb-6 transition-colors"
        >
          ← Kembali ke Riwayat Pemesanan
        </Link>

        {/* Status Banner */}
        <div className={`rounded-2xl p-5 mb-6 flex items-center justify-between border ${style.bg} ${style.border}`}>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status Pemesanan</p>
            <p className={`text-xl font-black ${style.text}`}>{style.label}</p>
          </div>
          <div className={`text-4xl`}>
            {booking.status === "completed" ? "✅" :
             booking.status === "paid" || booking.status === "confirmed" ? "✔️" :
             booking.status === "cancelled" ? "❌" : "⏳"}
          </div>
        </div>

        {/* Vehicle Card */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="relative w-full h-52 bg-gray-100">
            <Image
              src={imgUrl}
              alt={vehicle?.name || "Kendaraan"}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              {vehicle?.category || "Kendaraan"}
            </p>
            <h1 className="text-xl font-black text-gray-900 leading-tight">
              {vehicle?.name || "Kendaraan"}
            </h1>
            {vehicle?.brand && (
              <p className="text-sm text-gray-400 font-medium mt-1">{vehicle.brand}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Booking Info */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              📋 Detail Pemesanan
            </h2>
            <div className="space-y-3">
              <InfoRow label="Kode Booking" value={booking.booking_code || `#${String(booking.id).slice(0, 8)}`} mono />
              <InfoRow label="Tanggal Mulai" value={startDate} />
              <InfoRow label="Tanggal Selesai" value={endDate} />
              <InfoRow label="Durasi" value={`${totalDays} hari`} />
              <InfoRow label="Tujuan" value={booking.purpose || "-"} />
              <InfoRow label="Dibuat Pada" value={createdAt} />
            </div>
          </div>

          {/* Borrower Info */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              👤 Data Peminjam
            </h2>
            <div className="space-y-3">
              <InfoRow label="Nama" value={booking.borrower_name || "-"} />
              <InfoRow label="WhatsApp" value={booking.whatsapp_number || "-"} />
            </div>

            {/* Document Links */}
            <div className="mt-5 pt-4 border-t border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Dokumen</p>
              <div className="flex flex-col gap-2">
                {booking.ktp_url ? (
                  <a
                    href={booking.ktp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    🪪 Lihat Foto KTP
                  </a>
                ) : (
                  <p className="text-xs text-gray-400">KTP tidak tersedia</p>
                )}
                {booking.sim_url ? (
                  <a
                    href={booking.sim_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    🪪 Lihat Foto SIM
                  </a>
                ) : (
                  <p className="text-xs text-gray-400">SIM tidak tersedia</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mt-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">💳 Ringkasan Pembayaran</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Harga per hari</span>
              <span className="font-bold text-gray-800">{pricePerDay}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Durasi</span>
              <span className="font-bold text-gray-800">{totalDays} hari</span>
            </div>
            <div className="border-t border-dashed border-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">Total Pembayaran</span>
              <span className="text-lg font-black text-blue-600">{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            href="/bookings"
            className="flex-1 text-center py-3 rounded-2xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Kembali ke Riwayat
          </Link>
          {vehicle && (
            <Link
              href={`/vehicles/${booking.vehicle_id}`}
              className="flex-1 text-center py-3 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
            >
              Lihat Kendaraan Lagi
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs font-semibold text-gray-400 shrink-0">{label}</span>
      <span className={`text-xs font-bold text-gray-800 text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
