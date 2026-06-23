import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/layout/AdminNavbar";
import CreateMenuForm from "./CreateMenuForm";

function ChevronLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export default async function CreateMenuPage() {
  const { data: umkm } = await supabase.from("umkm").select("id, nama");

  async function createMenu(formData: FormData) {
    "use server";

    const file = formData.get("gambar") as File;
    if (!file || file.size === 0) {
      throw new Error("Foto menu wajib diupload");
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP");
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Ukuran gambar maksimal 2 MB");
    }

    let gambarUrl = "";

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    gambarUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from("menu").insert({
      umkm_id: formData.get("umkm_id"),
      nama_menu: formData.get("nama_menu"),
      harga: Number(formData.get("harga")),
      gambar: gambarUrl,
    });

    if (insertError) {
      console.error(insertError);
      throw new Error(insertError.message);
    }

    redirect("/admin/menu");
  }

  return (
    <>
      <AdminNavbar />

      <div className="admin-content-offset">
        <main
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            background: "var(--admin-bg)",
            minHeight: "100vh",
            padding: "32px",
            color: "var(--admin-text-primary)",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <Link
              href="/admin/menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--admin-text-secondary)",
                textDecoration: "none",
                marginBottom: "18px",
              }}
            >
              <ChevronLeftIcon />
              Kembali ke Kelola Menu
            </Link>

            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "1.65rem",
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              Tambah Menu Baru
            </h1>
            <p
              style={{
                color: "var(--admin-text-secondary)",
                fontSize: "13.5px",
                marginBottom: "26px",
              }}
            >
              Lengkapi data di bawah untuk menambahkan menu baru.
            </p>

            <CreateMenuForm umkmList={umkm ?? []} action={createMenu} />
          </div>
        </main>
      </div>
    </>
  );
}
