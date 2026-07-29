"use client";

import Link from "next/link";
import { getSession } from '@/data';

export default function StickyRentButton({ vehicleId }: { vehicleId: string }) {
  const session = getSession();
  const href = session ? `/vehicles/${vehicleId}?action=sewa` : `/login?redirect=/vehicles/${vehicleId}?action=sewa`;
  return (
    <div
      id="sticky-rent-button"
      className="sticky bottom-0 z-30 mt-6 rounded-t-2xl border-t border-gray-200 bg-white p-4 shadow-[0_-6px_20px_rgba(0,0,0,0.08)]"
    >
      <Link
        href={href}
        className="block w-full rounded-xl bg-emerald-500 py-3 text-center font-bold text-white hover:bg-emerald-600 transition-colors"
      >
        Sewa Sekarang
      </Link>
    </div>
  );
}