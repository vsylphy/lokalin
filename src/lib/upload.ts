import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("umkm-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("umkm-images").getPublicUrl(fileName);

  return data.publicUrl;
}
