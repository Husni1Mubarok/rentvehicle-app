"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getSession, setSession, clearSession } from "@/data";
import { supabase } from "@/lib/supabaseClient";

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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [session, setSessionState] = useState<{ nama?: string; role?: string } | null>(null);

  useEffect(() => {
    async function syncSession() {
      // Force clear stuck session ONCE
      if (!sessionStorage.getItem("stuck_session_cleared")) {
        await supabase.auth.signOut();
        clearSession();
        sessionStorage.setItem("stuck_session_cleared", "true");
        setSessionState(null);
        return;
      }

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
    setShowLogoutConfirm(false);
    setProfileOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await supabase.auth.signOut();
      clearSession();
      setSessionState(null);
      router.push("/");
      router.refresh();
    } catch {
      await supabase.auth.signOut();
      clearSession();
      setSessionState(null);
      window.location.href = "/";
    }
  };

  const isAdmin = session?.role === 'admin' || session?.role === 'super_admin';
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAuthPage) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="flex items-center justify-between px-6 md:px-10 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href={isAdminRoute ? "/admin/dashboard" : "/"} className="flex items-center gap-2 text-xl font-black tracking-tight text-blue-600">
          <Image
            src="/logo.png"
            alt="RentVehicle Logo"
            width={28}
            height={28}
            style={{ width: "auto", height: "auto" }}
            className="object-contain rounded-md"
          />
          <span>RentVehicle</span>
        </Link>

        {!isAuthPage && (
          <>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold">
              {isAdminRoute ? (
                <>
                  <Link
                    href="/admin/dashboard?tab=vehicles"
                    className="text-gray-700 hover:text-blue-600 font-bold transition-colors py-1"
                  >
                    Kelola Kendaraan
                  </Link>
                  <Link
                    href="/admin/dashboard?tab=bookings"
                    className="text-gray-700 hover:text-blue-600 font-bold transition-colors py-1"
                  >
                    Kelola Booking
                  </Link>
                </>
              ) : (
                navLinks.map((link) => {
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
                })
              )}

              {/* Profile Icon Button - Sejajar langsung di dalam baris navigasi */}
              {session ? (
                <div ref={profileRef} className="relative flex items-center">
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="rounded-full bg-gray-100 p-2.5 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-700 shadow-sm"
                    aria-label="Profil"
                    id="profile-menu-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.834 6.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-2xl z-50">
                      {(session.role === 'admin' || session.role === 'super_admin') && !isAdminRoute ? (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Dashboard Admin
                        </Link>
                      ) : null}
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profil
                      </Link>
                      <div className="border-t border-gray-100" />
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          setShowLogoutConfirm(true);
                        }}
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
                  Masuk
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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
          {isAdminRoute ? (
            <>
              <Link
                href="/admin/dashboard?tab=vehicles"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold text-gray-700 hover:text-blue-600 py-1"
              >
                Kelola Kendaraan
              </Link>
              <Link
                href="/admin/dashboard?tab=bookings"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold text-gray-700 hover:text-blue-600 py-1"
              >
                Kelola Booking
              </Link>
            </>
          ) : (
            navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold text-gray-700 hover:text-blue-600 py-1"
              >
                {link.label}
              </Link>
            ))
          )}
          {!session ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold text-white bg-blue-600 rounded-lg px-4 py-2 text-center hover:bg-blue-700 transition-colors mt-2"
            >
              Masuk
            </Link>
          ) : (
            <>
              <div className="border-t border-gray-100 my-2" />
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold text-gray-700 hover:text-blue-600 py-2"
              >
                Profil
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full text-left block text-sm font-bold text-red-500 hover:text-red-600 py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Custom Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-5 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Keluar Akun</h3>
            <p className="text-center text-gray-500 text-sm mb-8">Apakah Anda yakin ingin keluar dari akun ini?</p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}