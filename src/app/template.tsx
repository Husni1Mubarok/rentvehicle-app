"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Trigger smooth top bar indicator on route/page change
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative w-full">
      {/* Top Page Transition Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 z-[9999] transition-all duration-300 ease-out origin-left pointer-events-none ${
          isNavigating ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
        style={{
          boxShadow: "0 0 12px rgba(37, 99, 235, 0.8), 0 0 6px rgba(14, 165, 233, 0.6)"
        }}
      />
      {/* Smooth Page Slide & Fade Transition Wrapper */}
      <div key={pathname} className="animate-page-slide w-full">
        {children}
      </div>
    </div>
  );
}
