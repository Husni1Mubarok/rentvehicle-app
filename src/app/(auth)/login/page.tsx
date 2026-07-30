"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "../actions";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await login(formData, redirectTo);
    },
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-wrapper">
      {/* ─── LEFT PANEL ─── */}
      <div className="login-left-panel">
        {/* Background image */}
        <div className="login-bg-image" />
        {/* Dark overlay */}
        <div className="login-overlay" />

        {/* Content */}
        <div className="login-left-content">
          {/* Logo top-left */}
          <div className="login-logo">
            <Image
              src="/logo.png"
              alt="RentVehicle Logo"
              width={28}
              height={28}
              className="object-contain rounded-md"
            />
            <span className="login-logo-text">RentVehicle</span>
          </div>

          {/* Headline */}
          <div className="login-headline">
            <h1>
              Nikmati<br />
              Kebebasan<br />
              Berkendara.
            </h1>
            <p>
              Akses armada premium kami dengan proses yang aman dan transparan.
              Perjalanan bisnis atau liburan Anda dimulai dari sini.
            </p>
          </div>

          {/* Bottom badges */}
          <div className="login-badges">
            <div className="login-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Asuransi All-Risk</span>
            </div>
            <div className="login-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0015.91 17.7l1.1-1.1a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>24/7 Bantuan</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ─── */}
      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Selamat Datang Kembali</h2>
            <p>Silakan masuk untuk melanjutkan pesanan Anda.</p>
          </div>

          {/* Google Sign In */}
          <button type="button" className="login-google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google
          </button>

          {/* Divider */}
          <div className="login-divider">
            <span>ATAU MASUK DENGAN EMAIL</span>
          </div>

          {/* Form */}
          <form action={formAction} className="login-form">
            {/* Email */}
            <div className="login-field">
              <label htmlFor="email-address">Email</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nama@email.com"
                  className="login-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Kata Sandi</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="login-input login-input-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="login-options">
              <label className="login-remember">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="login-checkbox"
                />
                <span>Ingat Saya</span>
              </label>
              <Link href="/forgot-password" className="login-forgot">
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>{state.error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="login-submit-btn"
            >
              {isPending ? "Memproses..." : "Masuk →"}
            </button>
          </form>

          {/* Register link */}
          <p className="login-register-link">
            Belum punya akun?{" "}
            <Link href="/register">Daftar Sekarang</Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-page-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* ─── LEFT PANEL ─── */
        .login-left-panel {
          position: relative;
          width: 50%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .login-left-panel { display: none; }
          .login-right-panel { width: 100%; }
        }

        .login-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/login-bg.jpg');
          background-size: cover;
          background-position: center;
        }

        .login-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 23, 42, 0.55) 0%,
            rgba(15, 23, 42, 0.30) 40%,
            rgba(15, 23, 42, 0.70) 100%
          );
        }

        .login-left-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 2rem 2.5rem;
        }

        /* Logo */
        .login-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .login-logo-icon {
          width: 36px;
          height: 36px;
          background: #2563eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-logo-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* Headline */
        .login-headline {
          padding-bottom: 2rem;
        }

        .login-headline h1 {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1rem 0;
        }

        .login-headline p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          max-width: 340px;
          margin: 0;
        }

        /* Badges */
        .login-badges {
          display: flex;
          gap: 1.5rem;
        }

        .login-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: rgba(255,255,255,0.85);
          font-size: 0.82rem;
          font-weight: 500;
        }

        /* ─── RIGHT PANEL ─── */
        .login-right-panel {
          width: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 2rem;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
        }

        .login-form-header {
          margin-bottom: 1.75rem;
        }

        .login-form-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.025em;
          margin: 0 0 0.35rem 0;
        }

        .login-form-header p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        /* Google button */
        .login-google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
        }

        .login-google-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        /* Divider */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.25rem 0;
        }

        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .login-divider span {
          font-size: 0.7rem;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .login-field label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input-icon {
          position: absolute;
          left: 0.85rem;
          color: #9ca3af;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          padding: 0.72rem 0.9rem 0.72rem 2.5rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #111827;
          background: #ffffff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .login-input::placeholder {
          color: #d1d5db;
        }

        .login-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }

        .login-input-password {
          padding-right: 2.8rem;
        }

        .login-eye-btn {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.15s;
        }

        .login-eye-btn:hover {
          color: #6b7280;
        }

        /* Options row */
        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -0.25rem;
        }

        .login-remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #374151;
          cursor: pointer;
          user-select: none;
        }

        .login-checkbox {
          width: 15px;
          height: 15px;
          border-radius: 4px;
          accent-color: #2563eb;
          cursor: pointer;
        }

        .login-forgot {
          font-size: 0.85rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          transition: color 0.15s;
        }

        .login-forgot:hover {
          color: #1d4ed8;
        }

        /* Error */
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 0.9rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #b91c1c;
          font-size: 0.85rem;
        }

        /* Submit button */
        .login-submit-btn {
          width: 100%;
          padding: 0.85rem;
          background: #2563eb;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          margin-top: 0.25rem;
        }

        .login-submit-btn:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35);
          transform: translateY(-1px);
        }

        .login-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Register link */
        .login-register-link {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 1.25rem;
        }

        .login-register-link a {
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          transition: color 0.15s;
        }

        .login-register-link a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}