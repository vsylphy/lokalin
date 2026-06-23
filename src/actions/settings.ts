"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

/* ================================================================
   KATEGORI ACTIONS
   ================================================================ */

export async function addKategori(formData: FormData) {
  const nama = (formData.get("nama") as string)?.trim();
  if (!nama) return;

  // Title-case supaya konsisten
  const namaTitleCase =
    nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();

  const { error } = await supabase
    .from("kategori")
    .insert({ nama: namaTitleCase });

  if (error) {
    console.error("addKategori error:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/settings");
}

export async function deleteKategori(id: string) {
  const { error } = await supabase.from("kategori").delete().eq("id", id);

  if (error) {
    console.error("deleteKategori error:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/settings");
}

/* ================================================================
   EXPORT ACTIONS
   Returns a base64 string of the xlsx file — the client component
   decodes it and triggers a browser download.
   ================================================================ */

export async function exportUmkmToExcel(): Promise<string> {
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("nama, kategori, alamat, whatsapp, jam_buka, deskripsi, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const xlsx = await import("xlsx");

  const rows = (umkm ?? []).map((item, idx) => ({
    No: idx + 1,
    Nama: item.nama,
    Kategori: item.kategori,
    Alamat: item.alamat,
    WhatsApp: item.whatsapp,
    "Jam Buka": item.jam_buka,
    Deskripsi: item.deskripsi,
    "Tanggal Daftar": item.created_at
      ? new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
  }));

  const ws = xlsx.utils.json_to_sheet(rows);

  // Set column widths
  ws["!cols"] = [
    { wch: 5 }, // No
    { wch: 30 }, // Nama
    { wch: 16 }, // Kategori
    { wch: 35 }, // Alamat
    { wch: 18 }, // WhatsApp
    { wch: 18 }, // Jam Buka
    { wch: 50 }, // Deskripsi
    { wch: 20 }, // Tanggal
  ];

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "UMKM");

  const buf: Uint8Array = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  return Buffer.from(buf).toString("base64");
}

export async function exportMenuToExcel(): Promise<string> {
  const { data, error } = await supabase
    .from("menu")
    .select("nama_menu, harga, umkm(nama)")
    .order("umkm_id");

  if (error) throw new Error(error.message);

  const xlsx = await import("xlsx");

  const rows = (
    (data as unknown as Array<{
      nama_menu: string;
      harga: number;
      umkm: { nama: string } | null;
    }>) ?? []
  ).map((item, idx) => ({
    No: idx + 1,
    "Nama Menu": item.nama_menu,
    "Harga (Rp)": item.harga,
    UMKM: item.umkm?.nama ?? "-",
  }));

  const ws = xlsx.utils.json_to_sheet(rows);
  ws["!cols"] = [{ wch: 5 }, { wch: 30 }, { wch: 16 }, { wch: 30 }];

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Menu");

  const buf: Uint8Array = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  return Buffer.from(buf).toString("base64");
}

/* ================================================================
   STORAGE INFO
   ================================================================ */

export type StorageStat = {
  bucket: string;
  label: string;
  count: number;
};

export async function getStorageStats(): Promise<StorageStat[]> {
  const buckets: Array<{ id: string; label: string }> = [
    { id: "umkm-images", label: "Foto UMKM" },
    { id: "menu-images", label: "Foto Menu" },
  ];

  const results: StorageStat[] = [];

  for (const bucket of buckets) {
    const { data, error } = await supabase.storage
      .from(bucket.id)
      .list("", { limit: 1000 });

    results.push({
      bucket: bucket.id,
      label: bucket.label,
      count: error ? 0 : (data?.length ?? 0),
    });
  }

  return results;
}
