"use client";

import { useState, useTransition } from "react";
import { exportUmkmToExcel, exportMenuToExcel } from "@/actions/settings";

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4.5 18h15" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "exportSpin 0.7s linear infinite" }}
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

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function triggerDownload(base64: string, filename: string) {
  const byteChars = atob(base64);
  const byteArr = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteArr[i] = byteChars.charCodeAt(i);
  }
  const blob = new Blob([byteArr], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ExportButton({
  label,
  filename,
  action,
}: {
  label: string;
  filename: string;
  action: () => Promise<string>;
}) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleClick() {
    startTransition(async () => {
      try {
        const base64 = await action();
        triggerDownload(base64, filename);
        setDone(true);
        setTimeout(() => setDone(false), 2500);
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <>
      <style>{`@keyframes exportSpin { to { transform: rotate(360deg); } }`}</style>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="export-btn"
      >
        <style>{`
          .export-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            border-radius: 10px;
            border: 1px solid var(--admin-border);
            background: var(--admin-surface);
            color: var(--admin-text-secondary);
            font-size: 13.5px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.16s ease;
          }
          .export-btn:hover:not(:disabled) {
            border-color: var(--admin-accent-border);
            background: var(--admin-accent-soft);
            color: var(--admin-accent);
          }
          .export-btn:active:not(:disabled) {
            transform: scale(0.98);
          }
          .export-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .export-btn-done {
            border-color: rgba(52,211,153,0.4) !important;
            background: var(--admin-success-soft) !important;
            color: var(--admin-success) !important;
          }
        `}</style>
        {isPending ? (
          <>
            <SpinnerIcon />
            Mengekspor...
          </>
        ) : done ? (
          <>
            <CheckIcon />
            Berhasil!
          </>
        ) : (
          <>
            <DownloadIcon />
            {label}
          </>
        )}
      </button>
    </>
  );
}

export default function ExportSection({
  umkmCount,
  menuCount,
}: {
  umkmCount: number;
  menuCount: number;
}) {
  return (
    <div className="export-section">
      <style>{`
        .export-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .export-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 12px;
          background: var(--admin-bg);
          border: 1px solid var(--admin-border);
        }
        .export-row-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-text-primary);
          margin-bottom: 3px;
        }
        .export-row-info p {
          font-size: 12.5px;
          color: var(--admin-text-tertiary);
        }
        @media (max-width: 560px) {
          .export-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .export-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="export-row">
        <div className="export-row-info">
          <h4>Data UMKM</h4>
          <p>{umkmCount} UMKM • Format .xlsx</p>
        </div>
        <ExportButton
          label="Download Excel"
          filename={`umkm-lokalin-${new Date().toISOString().slice(0, 10)}.xlsx`}
          action={exportUmkmToExcel}
        />
      </div>

      <div className="export-row">
        <div className="export-row-info">
          <h4>Data Menu</h4>
          <p>{menuCount} menu • Format .xlsx</p>
        </div>
        <ExportButton
          label="Download Excel"
          filename={`menu-lokalin-${new Date().toISOString().slice(0, 10)}.xlsx`}
          action={exportMenuToExcel}
        />
      </div>
    </div>
  );
}
