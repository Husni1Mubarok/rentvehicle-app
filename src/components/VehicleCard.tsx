import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const primaryImage = vehicle.images?.find((img) => img.is_primary) ?? vehicle.images?.[0];

  const isUrl = (s: string) => {
    try { return Boolean(new URL(s)); } catch { return false; }
  };

  const statusBadge: Record<string, { label: string; cls: string }> = {
    available:   { label: 'Tersedia',    cls: 'bg-emerald-500 text-white' },
    rented:      { label: 'Disewa',      cls: 'bg-red-500 text-white' },
    booked:      { label: 'Dipesan',     cls: 'bg-yellow-500 text-white' },
    maintenance: { label: 'Perawatan',   cls: 'bg-gray-400 text-white' },
  };
  const badge = statusBadge[vehicle.status] ?? statusBadge.available;

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="group rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 relative block">
      {/* Status Badge */}
      <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badge.cls}`}>
        {badge.label}
      </span>

      {/* Image Area */}
      <div className="relative h-[180px] w-full bg-gray-100 overflow-hidden">
        {primaryImage && isUrl(primaryImage.image_url) ? (
          <Image
            src={primaryImage.image_url}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl select-none bg-gray-50">
            {primaryImage?.image_url ?? '🚗'}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
          {vehicle.name}
        </h3>

        {/* Specs row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1">👤 {vehicle.capacity} Kursi</span>
          <span>•</span>
          <span className="flex items-center gap-1">⚙️ {vehicle.transmission}</span>
          <span>•</span>
          <span className="flex items-center gap-1">⛽ Bensin</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold text-gray-400 block">Mulai Dari</span>
            <p className="text-sm font-extrabold text-blue-600">
              Rp {vehicle.price_per_day.toLocaleString('id-ID')}
              <span className="text-[10px] font-medium text-gray-400">/hari</span>
            </p>
          </div>
          <span
            className="flex-shrink-0 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sewa Sekarang
          </span>
        </div>
      </div>
    </Link>
  );
}
