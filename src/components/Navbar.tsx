"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
import { getSession, setSession, clearSession } from "@/data";
import { supabase } from "@/lib/supabaseClient";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/vehicles", label: "Kendaraan" },
  { href: "/about", label: "Tentang Kami" },
];

const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

function AdminNavLinks() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get("tab") || "vehicles" : "vehicles";

  return (
    <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-2xl border border-gray-200/60">
      <Link
        href="/admin/dashboard?tab=vehicles"
        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
          currentTab === "vehicles"
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
        }`}
      >
        <span>🚗</span> Kelola Kendaraan
      </Link>
      <Link
        href="/admin/dashboard?tab=bookings"
        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
          currentTab === "bookings"
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
        }`}
      >
        <span>📋</span> Kelola Booking
      </Link>
    </div>
  );
}

function MobileAdminNavLinks({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get("tab") || "vehicles" : "vehicles";

  return (
    <div className="space-y-1">
      <Link
        href="/admin/dashboard?tab=vehicles"
        onClick={() => setMobileOpen(false)}
        className={`block px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
          currentTab === "vehicles"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        🚗 Kelola Kendaraan
      </Link>
      <Link
        href="/admin/dashboard?tab=bookings"
        onClick={() => setMobileOpen(false)}
        className={`block px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
          currentTab === "bookings"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        📋 Kelola Booking
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = authRoutes.includes(pathname);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [session, setSessionState] = useState<{ nama?: string; role?: string } | null>(() => getSession());

  useEffect(() => {
    async function syncSession() {
      if (typeof window !== "undefined" && !sessionStorage.getItem("stuck_session_cleared")) {
        await supabase.auth.signOut();
        clearSession();
        if (typeof window !== "undefined") sessionStorage.setItem("stuck_session_cleared", "true");
        setSessionState(null);
        return;
      }

      const localSess = getSession();
      if (localSess && !session) {
        setSessionState(localSess);
      }

      try {
        const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
        const authTask = supabase.auth.getUser();
        const authRes = await Promise.race([authTask, timeout]);

        const user = authRes?.data?.user;
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
        } else if (authRes !== null) {
          clearSession();
          setSessionState(null);
        }
      } catch (err) {
        console.warn("[Navbar] Session sync error, using local session:", err);
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
    clearSession();
    setSessionState(null);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="Logo" width={22} height={22} className="object-contain filter brightness-0 invert" />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              RentVehicle
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-2">
              {isAdminRoute ? (
                <Suspense fallback={
                  <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-2xl border border-gray-200/60 text-xs font-bold text-gray-500 px-4 py-1.5">
                    Loading Admin Menu...
                  </div>
                }>
                  <AdminNavLinks />
                </Suspense>
              ) : (
                <div className="flex items-center gap-1.5">
                  {navLinks.map((link) => {
                    const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                          active
                            ? "bg-blue-50 text-blue-600 border border-blue-200/60 font-black shadow-xs"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Profile Icon Button */}
              {session ? (
                <div ref={profileRef} className="relative flex items-center ml-2">
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="rounded-full bg-gray-100 p-2.5 hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center text-gray-700 shadow-xs"
                    aria-label="Profil"
                    id="profile-menu-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.834 6.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-2xl z-50 animate-in fade-in zoom-in-95">
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
                  className="px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                >
                  Masuk
                </Link>
              )}
            </nav>
          )}

          {/* Mobile hamburger */}
          {!isAuthPage && (
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 text-gray-600 hover:text-gray-900 active:scale-95 transition-all"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {!isAuthPage && mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-2 fixed top-16 left-0 right-0 z-40 shadow-xl animate-in slide-in-from-top-2">
          {isAdminRoute ? (
            <Suspense fallback={<div className="text-sm font-bold text-gray-500 py-2">Loading Admin Menu...</div>}>
              <MobileAdminNavLinks setMobileOpen={setMobileOpen} />
            </Suspense>
          ) : (
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? "bg-blue-50 text-blue-600 border border-blue-200/60 font-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
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
    </>
  );
}