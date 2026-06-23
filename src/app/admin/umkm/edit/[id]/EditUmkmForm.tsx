"use client";

import { useState } from "react";
import {
  TextField,
  TextAreaField,
  SelectField,
} from "@/components/admin/FormField";
import FileInput from "@/components/admin/FileInput";
import SubmitButton from "@/components/admin/SubmitButton";
import { CancelButton } from "@/components/admin/CancelButton";

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
    </svg>
  );
}
function TagIcon() {
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
      <path d="M12.6 3.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-8.6 8.6a1 1 0 0 1-1.4 0l-6.7-6.7a1 1 0 0 1 0-1.4l8.6-8.6a1 1 0 0 1 .4-.6Z" />
      <circle cx="16.5" cy="7.5" r="1.2" />
    </svg>
  );
}
function AlignIcon() {
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
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="16" y2="12" />
      <line x1="4" y1="18" x2="12" y2="18" />
    </svg>
  );
}
function PinIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function WhatsappIcon() {
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
      <path d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 1.5.4 2.9 1.1 4.1L3.5 20.5l4.5-1.1a8.5 8.5 0 0 0 4 1c4.7 0 8.5-3.8 8.5-8.5s-3.8-8.4-8.5-8.4Z" />
    </svg>
  );
}
function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

type Umkm = {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  alamat: string;
  whatsapp: string;
  jam_buka: string;
  gambar: string | null;
};

export default function EditUmkmForm({
  umkm,
  action,
  kategoriList,
}: {
  umkm: Umkm;
  action: (formData: FormData) => Promise<void>;
  kategoriList: string[];
}) {
  const [isDirty, setIsDirty] = useState(false);

  function markDirty() {
    if (!isDirty) setIsDirty(true);
  }

  return (
    <form action={action} onChange={markDirty} className="admin-form">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .admin-form { font-family: 'Inter', system-ui, sans-serif; }

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

        .admin-form-field-full { margin-bottom: 18px; }

        .admin-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid var(--admin-border);
        }

        @media (max-width: 640px) {
          .admin-form-grid { grid-template-columns: 1fr; }
          .admin-form-panel { padding: 18px; }
          .admin-form-actions { flex-direction: column-reverse; }
          .admin-form-actions > * { width: 100%; }
        }
      `}</style>

      <div className="admin-form-panel">
        <div className="admin-form-field-full">
          <TextField
            name="nama"
            label="Nama UMKM"
            icon={<StoreIcon />}
            defaultValue={umkm.nama}
            required
          />
        </div>

        <div className="admin-form-grid">
          <SelectField
            name="kategori"
            label="Kategori"
            icon={<TagIcon />}
            placeholder="Pilih kategori"
            options={kategoriList.map((k) => ({ value: k, label: k }))}
            defaultValue={umkm.kategori}
            required
          />
          <TextField
            name="jam_buka"
            label="Jam Buka"
            icon={<ClockIcon />}
            defaultValue={umkm.jam_buka}
            required
          />
        </div>

        <div className="admin-form-field-full">
          <TextAreaField
            name="deskripsi"
            label="Deskripsi"
            icon={<AlignIcon />}
            defaultValue={umkm.deskripsi}
            required
          />
        </div>

        <div className="admin-form-grid">
          <TextField
            name="alamat"
            label="Alamat"
            icon={<PinIcon />}
            defaultValue={umkm.alamat}
            required
          />
          <TextField
            name="whatsapp"
            label="Nomor WhatsApp"
            icon={<WhatsappIcon />}
            defaultValue={umkm.whatsapp}
            type="tel"
            required
          />
        </div>

        <div className="admin-form-field-full" style={{ marginBottom: 0 }}>
          <FileInput
            name="gambar"
            label="Foto UMKM"
            defaultPreview={umkm.gambar}
            helperText="Biarkan kosong jika tidak ingin mengganti foto"
          />
        </div>
      </div>

      <div className="admin-form-actions">
        <CancelButton isDirty={isDirty} href="/admin/umkm" />
        <SubmitButton idleLabel="Update UMKM" pendingLabel="Menyimpan..." />
      </div>
    </form>
  );
}
