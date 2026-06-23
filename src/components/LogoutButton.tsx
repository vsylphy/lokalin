"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";

function LogoutIcon() {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "logoutSpin 0.7s linear infinite" }}
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

export default function LogoutButton({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await supabaseClient.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="admin-logout-btn"
      title="Keluar"
      aria-label="Keluar dari akun admin"
    >
      <style>{`
        @keyframes logoutSpin {
          to { transform: rotate(360deg); }
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "flex-start"};
          gap: 10px;
          width: 100%;
          padding: ${collapsed ? "10px" : "10px 12px"};
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-secondary);
          font-size: 13.5px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }

        .admin-logout-btn:hover:not(:disabled) {
          background: var(--admin-danger-soft);
          border-color: rgba(248, 113, 113, 0.3);
          color: var(--admin-danger);
        }

        .admin-logout-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .admin-logout-btn svg {
          flex-shrink: 0;
        }
      `}</style>
      {loading ? <SpinnerIcon /> : <LogoutIcon />}
      {!collapsed && <span>{loading ? "Keluar..." : "Keluar"}</span>}
    </button>
  );
}
