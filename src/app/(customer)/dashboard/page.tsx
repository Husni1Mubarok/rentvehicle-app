import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { createClient } from "@/lib/db/server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Pelanggan</h1>
                    <div className="flex gap-4 items-center">
                        <Link href="/profile" className="text-blue-600 hover:underline font-medium">
                            Profil Saya
                        </Link>
                        <form action={logout}>
                            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
                <p className="text-gray-600 mb-8">
                    Selamat datang! Anda sedang login sebagai <span className="font-semibold">{user?.email}</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h2 className="text-xl font-bold text-blue-900 mb-2">Riwayat Booking</h2>
                        <p className="text-blue-700 text-sm">Belum ada booking aktif saat ini.</p>
                        <Link href="/vehicles" className="inline-block mt-4 text-blue-600 font-semibold hover:underline">
                            Cari Kendaraan &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
