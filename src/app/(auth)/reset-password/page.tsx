"use client";

import { useActionState } from "react";
import { resetPassword } from "../actions";

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await resetPassword(formData);
    },
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Masukkan password baru Anda.
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password Baru
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-colors"
                placeholder="Password Baru"
              />
            </div>
          </div>

          {state?.error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{state.error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-colors shadow-md"
            >
              {isPending ? "Memproses..." : "Ubah Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
