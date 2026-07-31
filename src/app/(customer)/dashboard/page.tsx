import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/server";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role === "admin" || profile?.role === "super_admin") {
        redirect("/admin/dashboard");
    }

    redirect("/profile");
}
