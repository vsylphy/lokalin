// app/admin/layout.tsx
// Layout khusus untuk seluruh halaman di bawah /admin.
// Membungkus semua halaman admin dengan AdminThemeProvider supaya
// dark/light mode konsisten di Dashboard, Kelola UMKM, Kelola Menu, dst.

import type { Metadata } from "next";
import "./admin-theme.css"; // sesuaikan path jika diletakkan di lokasi lain
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";

export const metadata: Metadata = {
  title: "LokalIn — Admin Panel",
  description: "Panel pengelolaan UMKM LokalIn",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <div style={{ background: "var(--admin-bg)", minHeight: "100vh" }}>
        {children}
      </div>
    </AdminThemeProvider>
  );
}
