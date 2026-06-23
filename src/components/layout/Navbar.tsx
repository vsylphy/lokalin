"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/umkm", label: "UMKM" },
  { href: "/tentang", label: "Tentang" },
];

// LokalIn SVG Logo Mark
function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Warung/shop silhouette abstracted as overlapping hexagonal facets */}
      <defs>
        <linearGradient
          id="logoGrad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="60%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Base shop roof */}
      <path
        d="M4 14 L16 4 L28 14 L28 28 L4 28 Z"
        fill="url(#logoGrad)"
        opacity="0.15"
      />
      {/* Roof triangle */}
      <path
        d="M2 15 L16 3 L30 15"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Door */}
      <rect x="12" y="19" width="8" height="9" rx="4" fill="url(#logoGrad)" />
      {/* Left window */}
      <rect
        x="5"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#logoGrad)"
        opacity="0.7"
      />
      {/* Right window */}
      <rect
        x="22"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#logoGrad)"
        opacity="0.7"
      />
      {/* Sparkle dot — digital upgrade symbol */}
      <circle cx="27" cy="5" r="2" fill="#F59E0B" />
      <line
        x1="27"
        y1="2"
        x2="27"
        y2="1"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="27"
        y1="8"
        x2="27"
        y2="9"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="5"
        x2="23"
        y2="5"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="5"
        x2="31"
        y2="5"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return null;
  }
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((y / docH) * 100, 100) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes logoShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes indicatorExpand {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }

        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 4px 28px rgba(99,102,241,0.65), 0 0 0 4px rgba(99,102,241,0.1); }
        }

        @keyframes badgeBounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-2px) rotate(2deg); }
        }

        .nav-root {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .logo-text {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          background: linear-gradient(
            120deg,
            #6366F1 0%,
            #A78BFA 30%,
            #F59E0B 55%,
            #6366F1 80%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logoShimmer 4s linear infinite;
          letter-spacing: -0.03em;
        }

        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #94A3B8;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.25s;
        }

        .nav-link:hover {
          color: #E2E8F0;
        }

        .nav-link.active {
          color: #A5B4FC;
          font-weight: 600;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366F1, #F59E0B);
          border-radius: 2px;
          width: 0;
          opacity: 0;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
        }

        .nav-link.active::after,
        .nav-link:hover::after {
          width: 100%;
          opacity: 1;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 100px;
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 60%, #7C3AED 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-decoration: none;
          animation: ctaPulse 3s ease-in-out infinite;
          transition: transform 0.2s, filter 0.2s;
          position: relative;
          overflow: hidden;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          border-radius: inherit;
        }

        .cta-btn:hover {
          transform: translateY(-1px) scale(1.02);
          filter: brightness(1.1);
        }

        .cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .nav-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #F59E0B, #F97316);
          color: #fff;
          padding: 2px 6px;
          border-radius: 100px;
          animation: badgeBounce 2.5s ease-in-out infinite;
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(99,102,241,0.2);
        }

        .scroll-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366F1, #F59E0B);
          border-radius: 2px;
          transition: width 0.1s linear;
        }

        .location-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 500;
          color: #64748B;
          letter-spacing: 0.03em;
        }
      `}</style>

      <nav
        className="nav-root sticky top-0 z-50"
        style={{
          background: scrolled ? "rgba(10,15,30,0.95)" : "rgba(10,15,30,0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(99,102,241,0.18)"
            : "1px solid rgba(99,102,241,0.08)",
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Scroll progress bar */}
        <div className="scroll-bar" style={{ width: `${scrollProgress}%` }} />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <LogoMark />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <span className="logo-text">LokalIn</span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                  marginTop: "1px",
                  opacity: 0.9,
                }}
              >
                UMKM Digital
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "36px" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            <div className="nav-divider" />

            {/* Location chip */}
            <div className="location-chip">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366F1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Indonesia
            </div>

            {/* CTA */}
            <Link href="/login" className="cta-btn">
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Login
              <span className="nav-badge">Admin</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
