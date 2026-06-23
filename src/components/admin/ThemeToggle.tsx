"use client";

import { useAdminTheme } from "./AdminThemeProvider";

export default function ThemeToggle({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const { theme, toggleTheme } = useAdminTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      title={isDark ? "Mode Terang" : "Mode Gelap"}
    >
      <style>{`
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "space-between"};
          width: 100%;
          padding: ${collapsed ? "10px" : "8px 10px"};
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.18s ease, background 0.18s ease;
        }

        .theme-toggle:hover {
          border-color: var(--admin-border-strong);
          background: var(--admin-surface-hover);
        }

        .theme-toggle-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--admin-text-secondary);
        }

        .theme-toggle-label svg {
          color: var(--admin-text-secondary);
        }

        .theme-toggle-track {
          position: relative;
          width: 36px;
          height: 20px;
          border-radius: 100px;
          background: ${isDark ? "var(--admin-accent)" : "var(--admin-border-strong)"};
          transition: background 0.25s ease;
          flex-shrink: 0;
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 2px;
          left: ${isDark ? "18px" : "2px"};
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
          transition: left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {!collapsed && (
        <span className="theme-toggle-label">
          {isDark ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          )}
          {isDark ? "Mode Gelap" : "Mode Terang"}
        </span>
      )}

      {collapsed ? (
        isDark ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--admin-text-secondary)" }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--admin-text-secondary)" }}
          >
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        )
      ) : (
        <span className="theme-toggle-track">
          <span className="theme-toggle-thumb" />
        </span>
      )}
    </button>
  );
}
