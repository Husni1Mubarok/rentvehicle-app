import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const primaryImage = vehicle.images?.find((img) => img.is_primary) ?? vehicle.images?.[0];

  const isUrl = (s: string) => {
    try { return Boolean(new URL(s)); } catch { return false; }
  };

  const statusBadge: Record<string, { label: string; cls: string }> = {
    available:   { label: 'TERSEDIA',    cls: 'bg-emerald-500 text-white' },
    rented:      { label: 'DISEWA',      cls: 'bg-red-500 text-white' },
    booked:      { label: 'DIPESAN',     cls: 'bg-amber-500 text-white' },
    maintenance: { label: 'PERAWATAN',   cls: 'bg-gray-400 text-white' },
  };
  const badge = statusBadge[vehicle.status] ?? statusBadge.available;

  return (
    <div className="group rounded-3xl bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col p-3">
      {/* Image Area */}
      <div className="relative h-[220px] w-full bg-gray-50 overflow-hidden rounded-2xl">
        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${badge.cls}`}>
            {badge.label}
          </span>
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm bg-amber-400 text-white">
            PREMIUM
          </span>
        </div>

        {primaryImage && isUrl(primaryImage.image_url) ? (
          <Image
            src={primaryImage.image_url}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl select-none bg-gray-100">
            {primaryImage?.image_url ?? '🚗'}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 pt-5">
        <h3 className="font-bold text-gray-900 text-lg leading-snug">
          {vehicle.name}
        </h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          MASTERPIECE • {vehicle.transmission ? vehicle.transmission.toUpperCase() : 'AUTO'}
        </p>

        {/* Specs row */}
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 font-medium pb-4">
          <span className="flex items-center gap-1.5"><span className="text-blue-500">👤</span> {vehicle.capacity} Kursi</span>
          <span className="flex items-center gap-1.5"><span className="text-blue-500">⚡</span> Bensin</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-gray-50">
          <div>
            <span className="text-lg font-bold text-blue-600">
              Rp {vehicle.price_per_day.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] font-medium text-gray-400 ml-1">/hari</span>
          </div>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
          >
            Sewa Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
