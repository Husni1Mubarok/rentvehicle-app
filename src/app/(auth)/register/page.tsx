"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useState } from "react";
import { register } from "../actions";

export default function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      setErrorMsg(null);

      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const agreement = formData.get("agreement");

      if (password !== confirmPassword) {
        setErrorMsg("Kata sandi dan konfirmasi kata sandi tidak cocok.");
        return null;
      }

      if (!agreement) {
        setErrorMsg("Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi.");
        return null;
      }

      const res = await register(formData);
      if (res?.error) {
        setErrorMsg(res.error);
      }
      return res;
    },
    null
  );

  return (
    <div className="register-page-wrapper">
      {/* ─── LEFT PANEL ─── */}
      <div className="register-left-panel">
        {/* Background image */}
        <div className="register-bg-image" />
        {/* Dark/Blue gradient overlay - more transparent and vibrant */}
        <div className="register-overlay" />

        {/* Content */}
        <div className="register-left-content">
          {/* Logo top-left */}
          <div className="register-logo">
            <span className="register-logo-text">RentVehicle</span>
          </div>

          {/* Headline */}
          <div className="register-headline-container">
            <h1 className="register-headline">
              Bergabunglah dengan<br />Kami
            </h1>
            <p className="register-subheadline">
              Rasakan kebebasan berkendara dengan armada premium terbaik untuk kebutuhan perjalanan profesional maupun pribadi Anda.
            </p>
          </div>

          {/* Bottom stats */}
          <div className="register-stats-container">
            <div className="register-stat-divider" />
            <div className="register-stats">
              <div className="register-stat-item">
                <span className="register-stat-number">15k+</span>
                <span className="register-stat-label">Kendaraan Tersedia</span>
              </div>
              <div className="register-stat-item">
                <span className="register-stat-number">98%</span>
                <span className="register-stat-label">Pelanggan Puas</span>
              </div>
              <div className="register-stat-item">
                <span className="register-stat-number">24/7</span>
                <span className="register-stat-label">Layanan Dukungan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ─── */}
      <div className="register-right-panel">
        <div className="register-form-container">
          <div className="register-form-header">
            <h2>Buat Akun Baru</h2>
            <p>Lengkapi data di bawah ini untuk mulai menyewa.</p>
          </div>

          <form action={formAction} className="register-form">
            {/* Nama Lengkap */}
            <div className="register-field">
              <label htmlFor="name">Nama Lengkap</label>
              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  className="register-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="register-field">
              <label htmlFor="email">Email</label>
              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  className="register-input"
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div className="register-field">
              <label htmlFor="phone">Nomor Telepon</label>
              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="0812-xxxx-xxxx"
                  className="register-input"
                />
              </div>
            </div>

            {/* Kata Sandi */}
            <div className="register-field">
              <label htmlFor="password">Kata Sandi</label>
              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="register-input"
                />
              </div>
            </div>

            {/* Konfirmasi Kata Sandi */}
            <div className="register-field">
              <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.56-.56" />
                    <rect x="9" y="10" width="6" height="5" rx="1" />
                    <path d="M10.5 10V8.5a1.5 1.5 0 1 1 3 0V10" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="register-input"
                />
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="register-agreement">
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  name="agreement"
                  required
                  className="register-checkbox"
                />
                <span className="register-checkbox-text">
                  Saya menyetujui <span className="register-link">Syarat & Ketentuan</span> serta <span className="register-link">Kebijakan Privasi</span>.
                </span>
              </label>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="register-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="register-submit-btn"
            >
              {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>
          </form>

          {/* Divider */}
          <div className="register-divider">
            <span>atau daftar dengan</span>
          </div>

          {/* Google Button */}
          <button type="button" className="register-google-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          {/* Login link */}
          <p className="register-login-link">
            Sudah memiliki akun? <Link href="/login">Masuk di sini</Link>
          </p>

          {/* Copyright */}
          <p className="register-copyright">
            © 2024 RentVehicle. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>

      <style>{`
        .register-page-wrapper {
          display: flex;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #ffffff;
        }

        /* ─── LEFT PANEL ─── */
        .register-left-panel {
          position: relative;
          width: 50%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .register-left-panel { display: none; }
          .register-right-panel { width: 100%; }
        }

        .register-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/register-bg.png');
          background-size: cover;
          background-position: center;
        }

        .register-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .register-left-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 2rem 2.5rem;
          box-sizing: border-box;
        }

        .register-logo {
          display: flex;
          align-items: center;
        }

        .register-logo-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .register-headline-container {
          margin-top: auto;
          margin-bottom: 1.5rem;
        }

        .register-headline {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem 0;
        }

        .register-subheadline {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
          max-width: 400px;
          margin: 0;
        }

        .register-stats-container {
          margin-top: 1rem;
        }

        .register-stat-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin-bottom: 1rem;
        }

        .register-stats {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .register-stat-item {
          display: flex;
          flex-direction: column;
        }

        .register-stat-number {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }

        .register-stat-label {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.65);
          margin-top: 0.15rem;
        }

        /* ─── RIGHT PANEL ─── */
        .register-right-panel {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-sizing: border-box;
          height: 100vh;
          overflow-y: auto;
        }

        .register-form-container {
          width: 100%;
          max-width: 400px;
          margin: auto;
        }

        .register-form-header {
          margin-bottom: 1rem;
        }

        .register-form-header h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.02em;
          margin: 0 0 0.25rem 0;
        }

        .register-form-header p {
          font-size: 0.85rem;
          color: #4b5563;
          margin: 0;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .register-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .register-field label {
          font-size: 0.8rem;
          font-weight: 500;
          color: #374151;
        }

        .register-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .register-input-icon {
          position: absolute;
          left: 0.8rem;
          color: #9ca3af;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .register-input {
          width: 100%;
          padding: 0.55rem 0.85rem 0.55rem 2.2rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #111827;
          background: #ffffff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .register-input::placeholder {
          color: #9ca3af;
          opacity: 0.8;
        }

        .register-input:focus {
          border-color: #0b4bc8;
          box-shadow: 0 0 0 3px rgba(11, 75, 200, 0.1);
        }

        .register-agreement {
          margin-top: 0.1rem;
        }

        .register-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
          user-select: none;
        }

        .register-checkbox {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          border: 1px solid #d1d5db;
          accent-color: #0b4bc8;
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .register-checkbox-text {
          font-size: 0.78rem;
          color: #4b5563;
          line-height: 1.3;
        }

        .register-link {
          font-weight: 600;
          color: #0b4bc8;
          cursor: pointer;
        }

        .register-link:hover {
          text-decoration: underline;
        }

        /* Error message */
        .register-error {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
          font-size: 0.8rem;
        }

        /* Submit button */
        .register-submit-btn {
          width: 100%;
          padding: 0.7rem;
          background: #0b4bc8;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.15s;
          margin-top: 0.25rem;
        }

        .register-submit-btn:hover:not(:disabled) {
          background: #093ea6;
        }

        .register-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Divider */
        .register-divider {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.75rem 0;
        }

        .register-divider::before,
        .register-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .register-divider span {
          font-size: 0.7rem;
          color: #9ca3af;
          white-space: nowrap;
        }

        /* Google button */
        .register-google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem 0.85rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .register-google-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        /* Login link */
        .register-login-link {
          text-align: center;
          font-size: 0.8rem;
          color: #4b5563;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .register-login-link a {
          font-weight: 600;
          color: #0b4bc8;
          text-decoration: none;
        }

        .register-login-link a:hover {
          text-decoration: underline;
        }

        /* Copyright */
        .register-copyright {
          text-align: center;
          font-size: 0.68rem;
          color: #9ca3af;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
