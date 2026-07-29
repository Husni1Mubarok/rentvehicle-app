"use client";

import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "./actions";
import { createClient } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/actions";

// We use a client supabase instance just to fetch the initial data quickly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await updateProfile(formData);
    },
    null
  );

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();
         
         setUser({ ...user, ...profile });
      }
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
              <form action={logout}>
                <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800">
                    Logout
                </button>
              </form>
          </div>
          
          <div className="mb-8">
            <p className="text-sm text-gray-500">Email (Tidak dapat diubah)</p>
            <p className="font-medium text-gray-900">{user?.email}</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user?.name || user?.user_metadata?.name || ""}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Ubah Password</h2>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password Baru (Kosongkan jika tidak ingin mengubah)
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                />
              </div>
            </div>

            {state?.error && (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            )}
            
            {state?.success && (
              <div className="rounded-md bg-green-50 p-4 mt-4">
                <p className="text-sm text-green-700">{state.message}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
              >
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
