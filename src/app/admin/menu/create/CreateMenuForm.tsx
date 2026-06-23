"use client";

import { useState } from "react";
import { TextField, SelectField } from "@/components/admin/FormField";
import FileInput from "@/components/admin/FileInput";
import SubmitButton from "@/components/admin/SubmitButton";
import { CancelButton } from "@/components/admin/CancelButton";

function MenuNameIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5a2 2 0 0 1 2-2h8.5L20 7.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M14 3v4.5a1 1 0 0 0 1 1H20" />
    </svg>
  );
}
function PriceIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2.5" x2="12" y2="21.5" />
      <path d="M16.5 6.5h-6a2.8 2.8 0 0 0 0 5.5h3a2.8 2.8 0 0 1 0 5.5h-6.5" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5 5.2 4.5h13.6L20 9.5" />
      <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
      <path d="M10 19.5v-5.5h4v5.5" />
    </svg>
  );
}

type UmkmOption = {
  id: string;
  nama: string;
};

export default function CreateMenuForm({
  umkmList,
  action,
}: {
  umkmList: UmkmOption[];
  action: (formData: FormData) => Promise<void>;
}) {
  const [isDirty, setIsDirty] = useState(false);

  function markDirty() {
    if (!isDirty) setIsDirty(true);
  }

  return (
    <form action={action} onChange={markDirty} className="admin-form">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .admin-form {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .admin-form-panel {
          background: var(--admin-surface);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 26px;
          box-shadow: var(--admin-shadow-sm);
        }

        .admin-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .admin-form-field-full {
          margin-bottom: 18px;
        }

        .admin-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid var(--admin-border);
        }

        @media (max-width: 640px) {
          .admin-form-grid {
            grid-template-columns: 1fr;
          }
          .admin-form-panel {
            padding: 18px;
          }
          .admin-form-actions {
            flex-direction: column-reverse;
          }
          .admin-form-actions > * {
            width: 100%;
          }
        }
      `}</style>

      <div className="admin-form-panel">
        <div className="admin-form-field-full">
          <SelectField
            name="umkm_id"
            label="UMKM"
            icon={<StoreIcon />}
            placeholder="Pilih UMKM pemilik menu"
            options={umkmList.map((u) => ({ value: u.id, label: u.nama }))}
            required
          />
        </div>

        <div className="admin-form-grid">
          <TextField
            name="nama_menu"
            label="Nama Menu"
            icon={<MenuNameIcon />}
            placeholder="Contoh: Nasi Goreng Spesial"
            required
          />
          <TextField
            name="harga"
            label="Harga"
            icon={<PriceIcon />}
            type="number"
            min={0}
            placeholder="15000"
            required
          />
        </div>

        <div className="admin-form-field-full" style={{ marginBottom: 0 }}>
          <FileInput name="gambar" label="Foto Menu" required />
        </div>
      </div>

      <div className="admin-form-actions">
        <CancelButton isDirty={isDirty} href="/admin/menu" />
        <SubmitButton idleLabel="Simpan Menu" pendingLabel="Menyimpan..." />
      </div>
    </form>
  );
}
