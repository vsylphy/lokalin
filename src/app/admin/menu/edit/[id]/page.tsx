import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/layout/AdminNavbar";
import EditMenuForm from "./EditMenuForm";

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

function AlertIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <circle cx="12" cy="16.3" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: menu } = await supabase
    .from("menu")
    .select("*")
    .eq("id", id)
    .single();

  if (!menu) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-content-offset">
          <main
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              background: "var(--admin-bg)",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  margin: "0 auto 16px",
                  borderRadius: "15px",
                  background: "var(--admin-danger-soft)",
                  color: "var(--admin-danger)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlertIcon />
              </div>
              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "var(--admin-text-primary)",
                }}
              >
                Menu tidak ditemukan
              </h1>
              <p
                style={{
                  color: "var(--admin-text-secondary)",
                  fontSize: "13.5px",
                  marginTop: "8px",
                }}
              >
                Data yang kamu cari mungkin sudah dihapus.
              </p>
              <Link
                href="/admin/menu"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "20px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "var(--admin-accent)",
                  color: "#fff",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Kembali ke Kelola Menu
              </Link>
            </div>
          </main>
        </div>
      </>
    );
  }

  async function updateMenu(formData: FormData) {
    "use server";

    const file = formData.get("gambar") as File;

    let gambarUrl = menu!.gambar;

    if (file && file.size > 0) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP");
      }

      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Ukuran gambar maksimal 2 MB");
      }

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }

      const { data } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName);

      gambarUrl = data.publicUrl;
    }

    await supabase
      .from("menu")
      .update({
        nama_menu: formData.get("nama_menu"),
        harga: Number(formData.get("harga")),
        gambar: gambarUrl,
      })
      .eq("id", id);

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
              Edit Menu
            </h1>
            <p
              style={{
                color: "var(--admin-text-secondary)",
                fontSize: "13.5px",
                marginBottom: "26px",
              }}
            >
              Perbarui data{" "}
              <strong style={{ color: "var(--admin-text-primary)" }}>
                {menu.nama_menu}
              </strong>
              .
            </p>

            <EditMenuForm menu={menu} action={updateMenu} />
          </div>
        </main>
      </div>
    </>
  );
}
