"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ConfirmEmailContent() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams?.get('token');

  const verify = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/confirm-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Your email has been successfully confirmed!');
        setTimeout(() => router.push('/'), 3000);
      } else {
        setMessage(data.error ?? 'Failed to confirm email.');
      }
    } catch (_e) {
      setMessage('Unexpected error occurred while confirming email.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      verify(token);
    } else {
      setMessage('Missing verification token.');
    }
  }, [token, verify]);

  const resend = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Verification email has been resent. Please check your inbox.');
      } else {
        setMessage(data.error ?? 'Failed to resend verification email.');
      }
    } catch (_e) {
      setMessage('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-600 p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 w-full max-w-md text-center shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Confirm Your Email</h1>
        {loading && <p className="text-white mb-4">Processing...</p>}
        {message && <p className="text-white mb-4">{message}</p>}
        {!loading && (
          <button
            onClick={resend}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded transition-transform transform hover:scale-105"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </section>
  );
}

export default function ConfirmEmailPage() {
  return (
    <React.Suspense fallback={
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-600 p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 w-full max-w-md text-center shadow-lg">
          <p className="text-white">Loading...</p>
        </div>
      </section>
    }>
      <ConfirmEmailContent />
    </React.Suspense>
  );
}

