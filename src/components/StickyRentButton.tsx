"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from '@/data';
import { supabase } from '@/lib/supabaseClient';

export default function StickyRentButton({ vehicleId }: { vehicleId: string }) {
  const [session, setSession] = useState<any>(undefined);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  if (session === undefined) return null; // Or a skeleton

  const href = session ? `/booking/${vehicleId}` : `/login?redirect=/booking/${vehicleId}`;
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