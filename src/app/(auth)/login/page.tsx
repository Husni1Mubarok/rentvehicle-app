"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await login(formData);
    },
    null
  );

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 md:grid-cols-2">
      {/* Panel kiri - biru, dekoratif */}
      <div className="relative hidden flex-col justify-center overflow-hidden bg-primary-dark px-12 py-16 text-white md:flex">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex w-fit gap-1 rounded-lg border border-white/20 bg-white/5 p-2 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
            {["0", "0", "1", "2", "4", "8"].map((digit, i) => (
              <span
                key={i}
                className="flex h-12 w-9 items-center justify-center rounded-md bg-accent/20 text-2xl font-bold text-accent shadow-[0_0_10px_rgba(56,189,248,0.6)]"
              >
                {digit}
              </span>
            ))}
          </div>
          <p className="max-w-[7rem] text-xs font-semibold uppercase leading-snug text-white/60">
            KM Perjalanan Anda Bermula Disini
          </p>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight">
          Setiap perjalanan
          <br />
          dimulai dari satu
          <br />
          kunci kontak.
        </h1>
        <p className="mt-6 max-w-sm text-white/70">
          Login untuk mengelola booking, status, dan riwayat perjalanan Anda.
        </p>

        <svg
          className="mt-14 w-full max-w-md"
          viewBox="0 0 500 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#1e3a8a" opacity="0.6">
            <rect x="40" y="120" width="18" height="55" />
            <rect x="62" y="100" width="16" height="75" />
            <rect x="82" y="130" width="14" height="45" />
            <rect x="100" y="90" width="20" height="85" />
            <rect x="124" y="115" width="16" height="60" />
          </g>
          <path
            d="M55 175 C 130 175, 150 60, 230 70 S 380 130, 470 45"
            stroke="#facc15"
            strokeWidth="3"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />
          <circle cx="55" cy="175" r="7" fill="#facc15" />
          <text x="30" y="200" fill="white" fontSize="13" fontWeight="600">Awal</text>
          <g transform="translate(215, 60)">
            <rect x="0" y="8" width="30" height="12" rx="4" fill="white" />
            <circle cx="7" cy="21" r="4" fill="#0ea5e9" />
            <circle cx="23" cy="21" r="4" fill="#0ea5e9" />
          </g>
          <circle cx="470" cy="45" r="14" fill="#fde68a" stroke="#facc15" strokeWidth="2" />
          <path d="M462 45 a8 8 0 0 1 16 0" fill="#38bdf8" opacity="0.7" />
          <text x="440" y="72" fill="white" fontSize="13" fontWeight="600">Tujuan</text>
          <text x="432" y="88" fill="white" fontSize="11" opacity="0.7">Destinasi</text>
          <g transform="translate(20, 195)">
            <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="white" strokeWidth="1.5" />
            <text x="-4" y="4" fill="white" fontSize="11" fontWeight="700">N</text>
          </g>
        </svg>
      </div>

      {/* Panel kanan - background foto + kartu glass */}
      <div
        className="relative flex items-center justify-center bg-cover bg-center px-6 py-16"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary-dark/60" />

        <div className="relative z-10 w-full max-w-md space-y-5 rounded-3xl border border-white/40 bg-white/85 p-10 shadow-2xl backdrop-blur-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Akun RentVehicle
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-gray-900">Masuk</h2>
            <p className="mt-2 text-sm text-gray-600">
              Baru di sini?{" "}
              <Link href="/register" className="font-medium text-blue-700 hover:text-blue-600">
                Daftar sekarang, gratis!
              </Link>
            </p>
          </div>

          <form className="space-y-4" action={formAction}>
            <div>
              <label
                htmlFor="email-address"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-gray-300 bg-white/90 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-colors"
                  placeholder="mis. budi@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-gray-300 bg-white/90 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Ingat saya
              </label>
              <Link href="/forgot-password" className="font-medium text-blue-700 hover:text-blue-600">
                Lupa password?
              </Link>
            </div>

            {state?.error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-xl bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 px-4 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-opacity"
            >
              {isPending ? "Memproses..." : "MASUK"}
            </button>

            <p className="text-center text-sm text-gray-700">
              Belum punya akun?{" "}
              <Link href="/register" className="font-medium text-blue-700 hover:text-blue-600">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}