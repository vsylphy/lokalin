"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  kategoriList?: string[];
  currentKategori?: string;
};

export default function SearchBar({
  kategoriList = [],
  currentKategori = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/umkm?${params.toString()}`);
    }, 400);
  }

  function handleKategori(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value === "") {
      params.delete("kategori");
    } else {
      params.set("kategori", e.target.value);
    }

    router.push(`/umkm?${params.toString()}`);
  }

  function clearSearch() {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/umkm?${params.toString()}`);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
        marginBottom: "36px",
      }}
      className="searchbar-row"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .search-input-wrap {
          position: relative;
          flex: 1 1 320px;
          min-width: 0;
        }

        .search-input {
          width: 100%;
          padding: 14px 44px 14px 46px;
          border-radius: 14px;
          border: 1px solid rgba(99,102,241,0.18);
          background: rgba(255,255,255,0.03);
          color: #F1F5F9;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        .search-input::placeholder {
          color: #64748B;
        }

        .search-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
          box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6366F1;
          pointer-events: none;
          transition: color 0.25s;
        }

        .search-input:focus ~ .search-icon {
          color: #818CF8;
        }

        .search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(148,163,184,0.12);
          color: #94A3B8;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-clear:hover {
          background: rgba(239,68,68,0.15);
          color: #F87171;
        }

        .kategori-select-wrap {
          position: relative;
          flex: 1 1 200px;
          min-width: 0;
          max-width: 240px;
        }

        .kategori-select {
          width: 100%;
          appearance: none;
          padding: 14px 40px 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(99,102,241,0.18);
          background: rgba(255,255,255,0.03);
          color: #F1F5F9;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          /* prevent iOS Safari auto-zoom on focus */
          -webkit-text-size-adjust: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .kategori-select:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
        }

        .kategori-select option {
          background: #0D1425;
          color: #F1F5F9;
        }

        .kategori-chevron {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #6366F1;
          pointer-events: none;
        }

        /* Tablet & small laptop: still side-by-side but select shrinks gracefully */
        @media (max-width: 900px) {
          .kategori-select-wrap {
            flex: 1 1 160px;
            max-width: 200px;
          }
        }

        /* Mobile: stack fully, both elements take full width, no flex-basis fights */
        @media (max-width: 640px) {
          .searchbar-row {
            flex-direction: column;
            flex-wrap: nowrap;
            gap: 12px;
          }

          .search-input-wrap {
            flex: 1 1 auto;
            width: 100%;
          }

          .kategori-select-wrap {
            flex: 1 1 auto;
            width: 100%;
            max-width: none;
          }

          .search-input,
          .kategori-select {
            width: 100%;
            font-size: 16px;
            padding-top: 13px;
            padding-bottom: 13px;
          }

          .kategori-select {
            white-space: normal;
          }
        }
      `}</style>

      <div className="search-input-wrap">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          placeholder="Cari UMKM..."
          onChange={handleSearchChange}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="search-clear"
            aria-label="Hapus pencarian"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="kategori-select-wrap">
        <select
          value={currentKategori}
          onChange={handleKategori}
          className="kategori-select"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>
        <svg
          className="kategori-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
