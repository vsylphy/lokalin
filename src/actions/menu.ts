"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteMenu(id: string) {
  const { data: menu } = await supabase
    .from("menu")
    .select("gambar")
    .eq("id", id)
    .single();

  if (menu?.gambar) {
    const path = menu.gambar.split("/menu-images/")[1];

    if (path) {
      await supabase.storage.from("menu-images").remove([path]);
    }
  }

  await supabase.from("menu").delete().eq("id", id);

  revalidatePath("/admin/menu");
}
