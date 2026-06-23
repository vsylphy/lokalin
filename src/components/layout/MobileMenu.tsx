"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Beranda",
    icon: (
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/umkm",
    label: "UMKM",
    icon: (
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
        <line x1="12" y1="12" x2="12" y2="19" />
      </svg>
    ),
  },
  {
    href: "/tentang",
    label: "Tentang",
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes menuSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes linkFadeUp {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 24px rgba(99,102,241,0.8); }
        }

        @keyframes hamburgerTopOpen {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(6px) rotate(45deg); }
        }

        @keyframes hamburgerMidClose {
          from { opacity: 1; transform: scaleX(1); }
          to { opacity: 0; transform: scaleX(0); }
        }

        @keyframes hamburgerBotOpen {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-6px) rotate(-45deg); }
        }

        .mob-link-1 { animation: linkFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .mob-link-2 { animation: linkFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
        .mob-link-3 { animation: linkFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.19s both; }
        .mob-link-cta { animation: linkFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.26s both; }
      `}</style>

      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className="md:hidden relative flex flex-col justify-center items-center w-11 h-11 rounded-xl transition-colors duration-200"
        style={{
          background: open ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.06)",
        }}
      >
        <span
          style={{
            display: "block",
            width: "22px",
            height: "2px",
            backgroundColor: "#6366F1",
            borderRadius: "2px",
            transformOrigin: "center",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            transform: open ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "22px",
            height: "2px",
            backgroundColor: "#6366F1",
            borderRadius: "2px",
            margin: "4px 0",
            transition: "opacity 0.2s, transform 0.3s",
            opacity: open ? 0 : 1,
            transform: open ? "scaleX(0)" : "scaleX(1)",
          }}
        />
        <span
          style={{
            display: "block",
            width: open ? "22px" : "14px",
            height: "2px",
            backgroundColor: "#6366F1",
            borderRadius: "2px",
            transformOrigin: "center",
            transition:
              "transform 0.3s cubic-bezier(0.22,1,0.36,1), width 0.3s",
            transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
            alignSelf: "flex-end",
            marginRight: open ? "0" : "0",
          }}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background: "rgba(10,15,30,0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {open && (
        <div
          className="absolute left-0 right-0 z-50"
          style={{
            top: "calc(100% + 8px)",
            animation: "menuSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          <div
            style={{
              margin: "0 12px",
              background: "linear-gradient(145deg, #0D1425 0%, #111827 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "20px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1) inset",
              overflow: "hidden",
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                height: "2px",
                background: "linear-gradient(90deg, #6366F1, #F59E0B, #6366F1)",
                backgroundSize: "200% 100%",
              }}
            />

            <div style={{ padding: "20px 16px 24px" }}>
              {/* Nav Links */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`mob-link-${idx + 1}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        textDecoration: "none",
                        color: isActive ? "#A5B4FC" : "#94A3B8",
                        background: isActive
                          ? "rgba(99,102,241,0.12)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(99,102,241,0.25)"
                          : "1px solid transparent",
                        fontSize: "15px",
                        fontWeight: isActive ? "600" : "400",
                        letterSpacing: "0.01em",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(99,102,241,0.06)";
                          (e.currentTarget as HTMLElement).style.color =
                            "#E2E8F0";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "#94A3B8";
                        }
                      }}
                    >
                      <span
                        style={{
                          color: isActive ? "#6366F1" : "#64748B",
                          flexShrink: 0,
                          transition: "color 0.2s",
                        }}
                      >
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                      {isActive && (
                        <span
                          style={{
                            marginLeft: "auto",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#6366F1",
                            animation: "glowPulse 2s infinite",
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(99,102,241,0.12)",
                  margin: "16px 0",
                }}
              />

              {/* CTA Button */}
              <div className="mob-link-cta">
                <Link
                  href="/login"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "14px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #F59E0B 100%)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                    animation: "glowPulse 3s infinite",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Masuk sebagai Admin
                </Link>

                {/* Tag line */}
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "12px",
                    fontSize: "12px",
                    color: "#475569",
                    letterSpacing: "0.03em",
                  }}
                >
                  Platform Digital UMKM Lokal 🇮🇩
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
