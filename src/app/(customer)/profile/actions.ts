"use server";

import { createClient } from "@/lib/db/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const updates: any = {};
  if (name) {
    updates.data = { name }; // Update meta data
  }
  if (password) {
    updates.password = password;
  }

  if (Object.keys(updates).length > 0) {
    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      return { error: error.message };
    }

    // Since we also have a public.users table, we should update the name there too.
    if (name) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
             await supabase
                .from("users")
                .update({ name, updated_at: new Date().toISOString() })
                .eq("id", user.id);
        }
    }
  }

  revalidatePath("/profile");
  return { success: true, message: "Profil berhasil diperbarui" };
}
