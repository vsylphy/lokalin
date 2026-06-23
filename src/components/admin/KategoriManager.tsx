"use client";

import { useRef, useState, useTransition } from "react";
import { addKategori, deleteKategori } from "@/actions/settings";

type KategoriItem = {
  id: string;
  nama: string;
};

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon() {
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
      <path d="M19 7l-.9 12.1a2 2 0 0 1-2 1.9H8a2 2 0 0 1-2-1.9L5 7" />
      <path d="M4 7h16M9.5 11v6M14.5 11v6M8.5 7V4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V7" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "katSpin 0.7s linear infinite" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeleteKategoriBtn({ id, nama }: { id: string; nama: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await deleteKategori(id);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="kat-del-btn"
        aria-label={`Hapus kategori ${nama}`}
      >
        <TrashIcon />
      </button>

      {open && (
        <div
          className="kat-modal-backdrop"
          onClick={() => !isPending && setOpen(false)}
        >
          <div className="kat-modal-scene" onClick={(e) => e.stopPropagation()}>
            <div className="kat-modal-card">
              <h3 className="kat-modal-title">
                Hapus kategori &ldquo;{nama}&rdquo;?
              </h3>
              <p className="kat-modal-desc">
                UMKM yang sudah menggunakan kategori ini tidak akan hilang, tapi
                kategori tidak akan muncul lagi di dropdown form.
              </p>
              <div className="kat-modal-actions">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="kat-modal-btn kat-modal-btn--cancel"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="kat-modal-btn kat-modal-btn--confirm"
                >
                  {isPending ? (
                    <>
                      <SpinnerIcon /> Menghapus...
                    </>
                  ) : (
                    "Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function KategoriManager({
  initialKategori,
}: {
  initialKategori: KategoriItem[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAdd(formData: FormData) {
    setError(null);
    const nama = (formData.get("nama") as string)?.trim();
    if (!nama) return;

    startTransition(async () => {
      try {
        await addKategori(formData);
        formRef.current?.reset();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal menambah kategori",
        );
      }
    });
  }

  return (
    <div className="kat-manager">
      <style>{`
        @keyframes katSpin { to { transform: rotate(360deg); } }

        .kat-manager {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Add form */
        .kat-add-row {
          display: flex;
          gap: 10px;
        }
        .kat-add-input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-primary);
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }
        .kat-add-input::placeholder {
          color: var(--admin-text-tertiary);
        }
        .kat-add-input:focus {
          border-color: var(--admin-accent);
          box-shadow: 0 0 0 3px var(--admin-accent-soft);
        }
        .kat-add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid var(--admin-accent);
          background: var(--admin-accent);
          color: #fff;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.16s ease, opacity 0.16s;
          white-space: nowrap;
        }
        .kat-add-btn:hover:not(:disabled) {
          background: var(--admin-accent-hover);
        }
        .kat-add-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .kat-error {
          font-size: 12.5px;
          color: var(--admin-danger);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Tags list */
        .kat-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .kat-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 6px 14px;
          border-radius: 100px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          font-size: 13px;
          font-weight: 500;
          color: var(--admin-text-primary);
        }
        .kat-del-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--admin-text-tertiary);
          cursor: pointer;
          transition: background 0.14s ease, color 0.14s ease;
        }
        .kat-del-btn:hover {
          background: var(--admin-danger-soft);
          color: var(--admin-danger);
        }

        .kat-empty {
          font-size: 13px;
          color: var(--admin-text-tertiary);
          font-style: italic;
        }

        /* Delete modal */
        .kat-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8,10,16,0.55);
          backdrop-filter: blur(4px);
          padding: 20px;
          animation: katBackdropIn 0.2s ease both;
        }
        @keyframes katBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .kat-modal-scene {
          perspective: 900px;
          animation: katPopIn 0.4s cubic-bezier(0.2,1.2,0.4,1) both;
        }
        @keyframes katPopIn {
          0% { opacity: 0; transform: rotateX(-28deg) translateY(24px) scale(0.92); }
          60% { opacity: 1; transform: rotateX(6deg) translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: rotateX(0deg) translateY(0) scale(1); }
        }
        .kat-modal-card {
          width: min(320px, 90vw);
          border-radius: 16px;
          padding: 22px 20px 18px;
          background: var(--admin-bg-elevated);
          border: 1px solid var(--admin-border-strong);
          box-shadow: var(--admin-shadow-lg);
        }
        .kat-modal-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--admin-text-primary);
          margin-bottom: 8px;
        }
        .kat-modal-desc {
          font-size: 12.5px;
          color: var(--admin-text-secondary);
          line-height: 1.6;
        }
        .kat-modal-actions {
          display: flex;
          gap: 8px;
          margin-top: 18px;
        }
        .kat-modal-btn {
          flex: 1;
          padding: 9px 12px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.14s ease;
        }
        .kat-modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .kat-modal-btn--cancel {
          background: var(--admin-surface);
          border: 1px solid var(--admin-border);
          color: var(--admin-text-secondary);
        }
        .kat-modal-btn--cancel:hover:not(:disabled) {
          background: var(--admin-surface-hover);
        }
        .kat-modal-btn--confirm {
          background: var(--admin-danger);
          border: 1px solid var(--admin-danger);
          color: #fff;
        }
        .kat-modal-btn--confirm:hover:not(:disabled) {
          filter: brightness(1.08);
        }

        @media (max-width: 480px) {
          .kat-add-row { flex-direction: column; }
          .kat-add-btn { justify-content: center; }
        }
      `}</style>

      {/* Add form */}
      <form ref={formRef} action={handleAdd}>
        <div className="kat-add-row">
          <input
            name="nama"
            className="kat-add-input"
            placeholder="Nama kategori baru, contoh: Kuliner"
            maxLength={40}
            autoComplete="off"
          />
          <button type="submit" disabled={isPending} className="kat-add-btn">
            {isPending ? <SpinnerIcon /> : <PlusIcon />}
            {isPending ? "Menyimpan..." : "Tambah"}
          </button>
        </div>
        {error && (
          <p className="kat-error" style={{ marginTop: "8px" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="13" />
              <circle cx="12" cy="16.3" r="0.5" fill="currentColor" />
            </svg>
            {error}
          </p>
        )}
      </form>

      {/* Tags */}
      {initialKategori.length > 0 ? (
        <div className="kat-list">
          {initialKategori.map((kat) => (
            <span key={kat.id} className="kat-tag">
              {kat.nama}
              <DeleteKategoriBtn id={kat.id} nama={kat.nama} />
            </span>
          ))}
        </div>
      ) : (
        <p className="kat-empty">Belum ada kategori. Tambahkan di atas.</p>
      )}
    </div>
  );
}
