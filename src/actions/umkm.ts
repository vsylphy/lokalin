"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteUmkm(id: string) {
  const { data: umkm } = await supabase
    .from("umkm")
    .select("gambar")
    .eq("id", id)
    .single();

  if (umkm?.gambar) {
    const path = umkm.gambar.split("/umkm-images/")[1];

    if (path) {
      await supabase.storage.from("umkm-images").remove([path]);
    }
  }

  await supabase.from("umkm").delete().eq("id", id);

  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}
