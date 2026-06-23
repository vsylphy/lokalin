"use client";

import { useRef, useState } from "react";

function UploadIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M4.5 15v3.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V15" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="9" cy="9" r="1.8" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

type FileInputProps = {
  name: string;
  required?: boolean;
  /** Existing image URL, e.g. when editing a record that already has one */
  defaultPreview?: string | null;
  label?: string;
  helperText?: string;
};

export default function FileInput({
  name,
  required = false,
  defaultPreview = null,
  label = "Foto",
  helperText = "JPG, PNG, atau WEBP — maksimal 2 MB",
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultPreview);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_SIZE = 2 * 1024 * 1024;

  function processFile(file: File) {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format harus JPG, PNG, atau WEBP");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ukuran maksimal 2 MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && inputRef.current) {
      // sync to the actual input so the form submits it
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
      processFile(file);
    }
  }

  function clearFile(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="file-input-field">
      <style>{`
        .file-input-field {
          width: 100%;
        }

        .file-input-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--admin-text-secondary);
          margin-bottom: 7px;
        }

        .file-drop-zone {
          position: relative;
          border: 1.5px dashed ${dragActive ? "var(--admin-accent)" : "var(--admin-border-strong)"};
          border-radius: 14px;
          background: ${dragActive ? "var(--admin-accent-soft)" : "var(--admin-surface)"};
          padding: ${preview ? "0" : "28px 20px"};
          cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease;
          overflow: hidden;
        }

        .file-drop-zone:hover {
          border-color: var(--admin-accent);
        }

        .file-drop-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          color: var(--admin-text-secondary);
        }

        .file-drop-empty svg {
          color: var(--admin-text-tertiary);
        }

        .file-drop-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .file-drop-helper {
          font-size: 11.5px;
          color: var(--admin-text-tertiary);
        }

        .file-preview-wrap {
          position: relative;
          width: 100%;
          height: 200px;
        }

        .file-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .file-preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%);
          display: flex;
          align-items: flex-end;
          padding: 12px;
        }

        .file-preview-name {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          background: rgba(0,0,0,0.4);
          padding: 5px 10px;
          border-radius: 8px;
          max-width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-preview-remove {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(15,20,25,0.7);
          backdrop-filter: blur(4px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.16s ease;
        }

        .file-preview-remove:hover {
          background: var(--admin-danger);
        }

        .file-input-hidden {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .file-input-error {
          margin-top: 7px;
          font-size: 12px;
          color: var(--admin-danger);
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>

      <label className="file-input-label">
        {label}{" "}
        {required && <span style={{ color: "var(--admin-danger)" }}>*</span>}
      </label>

      <div
        className="file-drop-zone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <div className="file-preview-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="file-preview-img" />
            <div className="file-preview-overlay">
              {fileName && (
                <span className="file-preview-name">
                  <ImageIcon />
                  {fileName}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="file-preview-remove"
              aria-label="Hapus gambar"
            >
              <XIcon />
            </button>
          </div>
        ) : (
          <div className="file-drop-empty">
            <UploadIcon />
            <span className="file-drop-title">
              Klik atau seret gambar ke sini
            </span>
            <span className="file-drop-helper">{helperText}</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          required={required && !preview}
          onChange={handleChange}
          className="file-input-hidden"
        />
      </div>

      {error && (
        <p className="file-input-error">
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
            <line x1="12" y1="8" x2="12" y2="12.5" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
