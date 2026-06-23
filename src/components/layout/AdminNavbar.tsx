"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/admin/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/umkm",
    label: "Kelola UMKM",
    icon: (
      <svg
        width="17"
        height="17"
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
    ),
  },
  {
    href: "/admin/menu",
    label: "Kelola Menu",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19V5a2 2 0 0 1 2-2h8.5L20 7.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M14 3v4.5a1 1 0 0 0 1 1H20" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "Pengaturan",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V11a1.65 1.65 0 0 0 1.51 1H19a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
];

function LogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="adminLogoGrad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M2 15 L16 3 L30 15"
        stroke="url(#adminLogoGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="12"
        y="19"
        width="8"
        height="9"
        rx="4"
        fill="url(#adminLogoGrad)"
      />
      <rect
        x="5"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#adminLogoGrad)"
        opacity="0.7"
      />
      <rect
        x="22"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#adminLogoGrad)"
        opacity="0.7"
      />
    </svg>
  );
}

export default function AdminNavbar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .admin-shell-font {
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ---------- Desktop sidebar ---------- */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${collapsed ? "76px" : "248px"};
          background: var(--admin-bg-elevated);
          border-right: 1px solid var(--admin-border);
          display: flex;
          flex-direction: column;
          z-index: 40;
          transition: width 0.22s cubic-bezier(0.22,1,0.36,1);
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 264px;
            box-shadow: var(--admin-shadow-lg);
            transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
          }
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
        }

        .admin-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "space-between"};
          gap: 10px;
          padding: ${collapsed ? "20px 12px" : "20px 18px"};
          border-bottom: 1px solid var(--admin-border);
          flex-shrink: 0;
        }

        .admin-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          min-width: 0;
        }

        .admin-logo-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15.5px;
          color: var(--admin-text-primary);
          white-space: nowrap;
          line-height: 1.2;
        }

        .admin-logo-sub {
          font-size: 10.5px;
          color: var(--admin-text-tertiary);
          font-weight: 500;
          white-space: nowrap;
        }

        .collapse-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-secondary);
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.18s, border-color 0.18s;
        }
        .collapse-btn:hover {
          background: var(--admin-surface-hover);
          border-color: var(--admin-border-strong);
        }
        @media (min-width: 1025px) {
          .collapse-btn { display: flex; }
        }

        .mobile-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-secondary);
          cursor: pointer;
        }
        @media (min-width: 1025px) {
          .mobile-close-btn { display: none; }
        }

        .admin-nav-list {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: ${collapsed ? "10px" : "10px 12px"};
          justify-content: ${collapsed ? "center" : "flex-start"};
          border-radius: 10px;
          color: var(--admin-text-secondary);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          transition: background 0.16s ease, color 0.16s ease;
          position: relative;
        }

        .admin-nav-link:hover {
          background: var(--admin-surface-hover);
          color: var(--admin-text-primary);
        }

        .admin-nav-link.active {
          background: var(--admin-accent-soft);
          color: var(--admin-accent);
          font-weight: 600;
        }

        .admin-nav-link.active::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 18px;
          border-radius: 0 4px 4px 0;
          background: var(--admin-accent);
        }

        .admin-nav-link svg {
          flex-shrink: 0;
        }

        .admin-nav-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .admin-sidebar-footer {
          padding: 12px;
          border-top: 1px solid var(--admin-border);
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        /* ---------- Mobile topbar ---------- */
        .admin-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 16px;
          background: var(--admin-bg-elevated);
          border-bottom: 1px solid var(--admin-border);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        @media (max-width: 1024px) {
          .admin-topbar { display: flex; }
        }

        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-secondary);
          cursor: pointer;
        }

        /* ---------- Backdrop ---------- */
        .admin-sidebar-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 35;
        }
        @media (max-width: 1024px) {
          .admin-sidebar-backdrop.open {
            display: block;
          }
        }

        /* ---------- Content offset (apply to layout wrapper) ---------- */
        .admin-content-offset {
          margin-left: ${collapsed ? "76px" : "248px"};
          transition: margin-left 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        @media (max-width: 1024px) {
          .admin-content-offset {
            margin-left: 0;
          }
        }
      `}</style>

      {/* ---------- Mobile topbar ---------- */}
      <div className="admin-topbar admin-shell-font">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu navigasi"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link
          href="/admin/dashboard"
          className="admin-logo-row"
          style={{ justifyContent: "center" }}
        >
          <LogoMark />
          <span className="admin-logo-text">LokalIn Admin</span>
        </Link>

        <div style={{ width: "36px" }} />
      </div>

      {/* ---------- Backdrop (mobile) ---------- */}
      <div
        className={`admin-sidebar-backdrop${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ---------- Sidebar ---------- */}
      <aside
        className={`admin-sidebar admin-shell-font${mobileOpen ? " mobile-open" : ""}`}
      >
        <div className="admin-sidebar-header">
          <Link href="/admin/dashboard" className="admin-logo-row">
            <LogoMark />
            {!collapsed && (
              <span style={{ minWidth: 0 }}>
                <span className="admin-logo-text" style={{ display: "block" }}>
                  LokalIn
                </span>
                <span className="admin-logo-sub">Admin Panel</span>
              </span>
            )}
          </Link>

          <button
            type="button"
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Lebarkan sidebar" : "Ciutkan sidebar"}
            title={collapsed ? "Lebarkan sidebar" : "Ciutkan sidebar"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: collapsed ? "rotate(180deg)" : "none",
                transition: "transform 0.22s ease",
              }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu navigasi"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="admin-nav-list">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${isActive ? " active" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <span className="admin-nav-label">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <ThemeToggle collapsed={collapsed} />
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}
