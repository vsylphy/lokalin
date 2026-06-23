import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/layout/AdminNavbar";
import CreateUmkmForm from "./CreateUmkmForm";

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

export default async function CreateUmkmPage() {
  const [{ data: kategoriData }] = await Promise.all([
    supabase.from("kategori").select("nama").order("nama"),
  ]);

  const kategoriList = (kategoriData ?? []).map((k) => k.nama as string);

  async function createUmkm(formData: FormData) {
    "use server";

    const file = formData.get("gambar") as File;
    if (!file || file.size === 0) {
      throw new Error("Foto UMKM wajib diupload");
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

    const { error } = await supabase.storage
      .from("umkm-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("umkm-images")
      .getPublicUrl(fileName);

    gambarUrl = data.publicUrl;

    await supabase.from("umkm").insert({
      nama: formData.get("nama"),
      kategori: formData.get("kategori"),
      deskripsi: formData.get("deskripsi"),
      alamat: formData.get("alamat"),
      whatsapp: formData.get("whatsapp"),
      jam_buka: formData.get("jam_buka"),
      gambar: gambarUrl,
    });

    redirect("/admin/umkm");
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
              href="/admin/umkm"
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
              Kembali ke Kelola UMKM
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
              Tambah UMKM Baru
            </h1>
            <p
              style={{
                color: "var(--admin-text-secondary)",
                fontSize: "13.5px",
                marginBottom: "26px",
              }}
            >
              Lengkapi data di bawah untuk mendaftarkan UMKM baru.
            </p>

            <CreateUmkmForm action={createUmkm} kategoriList={kategoriList} />
          </div>
        </main>
      </div>
    </>
  );
}
