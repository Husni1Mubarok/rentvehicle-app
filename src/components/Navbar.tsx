"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getSession, setSession, clearSession } from "@/data";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/vehicles", label: "Kendaraan" },
  { href: "/about", label: "Tentang Kami" },
];

const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = authRoutes.includes(pathname);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [session, setSessionState] = useState<{ nama?: string; role?: string } | null>(null);

  useEffect(() => {
    async function syncSession() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        const sessionUser = {
          id: user.id,
          email: user.email,
          nama: profile?.name || user.user_metadata?.name || user.email?.split("@")[0],
          role: profile?.role || "customer"
        };
        setSession(sessionUser);
        setSessionState(sessionUser);
      } else {
        clearSession();
        setSessionState(null);
      }
    }
    syncSession();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      window.location.href = "/api/auth/logout";
    }
  };

  if (isAuthPage) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="flex items-center justify-between px-6 md:px-10 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-blue-600">
          <Image
            src="/logo.png"
            alt="RentVehicle Logo"
            width={28}
            height={28}
            className="object-contain rounded-md"
          />
          <span>RentVehicle</span>
        </Link>

        {!isAuthPage && (
          <>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition-colors py-1 ${
                      active
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {session ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-700"
                    aria-label="Profil"
                    id="profile-menu-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.834 6.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-2xl z-50">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profil
                      </Link>
                      <div className="border-t border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        id="logout-button"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Login
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </>
        )}
      </nav>

      {/* Mobile Menu */}
      {!isAuthPage && mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-blue-600 py-1"
            >
              {link.label}
            </Link>
          ))}
          {!session && (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold text-white bg-blue-600 rounded-lg px-4 py-2 text-center hover:bg-blue-700 transition-colors mt-2"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}