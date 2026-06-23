"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const footerLinks = {
  jelajah: [
    { href: "/", label: "Beranda" },
    { href: "/umkm", label: "UMKM" },
    { href: "/tentang", label: "Tentang Kami" },
  ],
  bantuan: [
    { href: "/login", label: "Masuk Admin" },
    { href: "/tentang", label: "Cara Kerja" },
    { href: "/umkm", label: "Daftar UMKM" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
      </svg>
    ),
  },
];

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="footerLogoGrad"
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
      <path
        d="M2 15 L16 3 L30 15"
        stroke="url(#footerLogoGrad)"
        strokeWidth="2.5"
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
        fill="url(#footerLogoGrad)"
      />
      <rect
        x="5"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#footerLogoGrad)"
        opacity="0.7"
      />
      <rect
        x="22"
        y="18"
        width="5"
        height="5"
        rx="1.5"
        fill="url(#footerLogoGrad)"
        opacity="0.7"
      />
      <circle cx="27" cy="5" r="2" fill="#F59E0B" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6366F1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15058.524436444319!2d107.6097062!3d-6.938529199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6279d52ed8b%3A0xfbc31838ba12ddbf!2sUniversitas%20Teknologi%20Bandung!5e1!3m2!1sid!2sid!4v1781857020241!5m2!1sid!2sid";

const MAPS_LINK_SRC =
  "https://www.google.com/maps/place/Universitas+Teknologi+Bandung/@-6.9385292,107.6097062,15z/data=!4m6!3m5!1s0x2e68e6279d52ed8b:0xfbc31838ba12ddbf!8m2!3d-6.9385292!4d107.6097062";

export default function Footer() {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return null;
  }
  return (
    <footer
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #0A0F1E 0%, #0D1425 100%)",
        borderTop: "1px solid rgba(99,102,241,0.15)",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes footerGlowDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }

        @keyframes mapPinPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        .footer-logo-text {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          background: linear-gradient(120deg, #6366F1, #A78BFA, #F59E0B);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .footer-col-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #F59E0B;
          margin-bottom: 18px;
        }

        .footer-link {
          display: block;
          font-size: 14px;
          color: #94A3B8;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s, transform 0.2s;
          width: fit-content;
        }

        .footer-link:hover {
          color: #E2E8F0;
          transform: translateX(4px);
        }

        .footer-social {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.18);
          color: #A5B4FC;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        .footer-social:hover {
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(99,102,241,0.4);
        }

        .footer-glow-a {
          animation: footerGlowDrift 12s ease-in-out infinite;
        }
        .footer-glow-b {
          animation: footerGlowDrift 14s ease-in-out infinite reverse;
        }

        /* ---- Map card ---- */
        .footer-map-frame {
          position: relative;
          border-radius: 22px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(99,102,241,0.45), rgba(255,255,255,0.05) 50%, rgba(245,158,11,0.35));
          height: 100%;
          min-height: 280px;
        }

        .footer-map-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 278px;
          border-radius: 20.5px;
          overflow: hidden;
          background: #0D1425;
        }

        .footer-map-inner iframe {
          width: 100%;
          height: 100%;
          display: block;
          filter: grayscale(0.25) contrast(1.05) brightness(0.92);
          transition: filter 0.4s ease;
        }

        .footer-map-frame:hover .footer-map-inner iframe {
          filter: grayscale(0) contrast(1) brightness(1);
        }

        .footer-map-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 100px;
          background: rgba(10,15,30,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(99,102,241,0.3);
          font-size: 12.5px;
          font-weight: 600;
          color: #E2E8F0;
          text-decoration: none;
          pointer-events: auto;
          transition: border-color 0.25s, background 0.25s;
        }

        .footer-map-badge:hover {
          border-color: rgba(245,158,11,0.5);
          background: rgba(10,15,30,0.95);
        }

        .footer-map-pin-dot {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #F59E0B;
          flex-shrink: 0;
        }

        .footer-map-pin-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #F59E0B;
          animation: mapPinPulse 2s ease-out infinite;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 36px !important;
          }
          .footer-bottom-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-map-frame {
            min-height: 240px;
          }
          .footer-map-inner {
            min-height: 238px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Ambient glow blobs */}
      <div
        className="footer-glow-a"
        style={{
          position: "absolute",
          top: "-80px",
          left: "10%",
          width: "320px",
          height: "320px",
          background: "rgba(99,102,241,0.12)",
          filter: "blur(90px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        className="footer-glow-b"
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "10%",
          width: "320px",
          height: "320px",
          background: "rgba(245,158,11,0.08)",
          filter: "blur(90px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px 0",
        }}
      >
        {/* Top grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "40px",
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              <LogoMark />
              <span className="footer-logo-text">LokalIn</span>
            </Link>
            <p
              style={{
                color: "#64748B",
                fontSize: "14px",
                lineHeight: "1.7",
                marginTop: "16px",
                maxWidth: "300px",
              }}
            >
              Platform digital yang menghubungkan UMKM mahasiswa dan masyarakat
              sekitar kampus dengan pembeli yang tepat.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Jelajah */}
          <div>
            <p className="footer-col-title">Jelajah</p>
            {footerLinks.jelajah.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Bantuan */}
          <div>
            <p className="footer-col-title">Bantuan</p>
            {footerLinks.bantuan.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="footer-col-title">Hubungi Kami</p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <PinIcon />
              <span
                style={{
                  fontSize: "14px",
                  color: "#94A3B8",
                  lineHeight: "1.6",
                }}
              >
                3J22+PC, Kb. Lega, Kota Bandung, Jawa Barat
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366F1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span style={{ fontSize: "14px", color: "#94A3B8" }}>
                halo@lokalin.id
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(99,102,241,0.12)",
            margin: "48px 0 40px",
          }}
        />

        {/* Location + Map section */}
        <div
          className="footer-bottom-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "32px",
            alignItems: "stretch",
            marginBottom: "56px",
          }}
        >
          {/* Left: location text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p className="footer-col-title" style={{ marginBottom: "12px" }}>
              Lokasi Kami
            </p>
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#F1F5F9",
                lineHeight: "1.4",
              }}
            >
              Universitas Teknologi Bandung
            </h3>
            <p
              style={{
                color: "#94A3B8",
                fontSize: "14px",
                lineHeight: "1.7",
                marginTop: "10px",
                maxWidth: "360px",
              }}
            >
              3J22+PC, Kb. Lega, Kota Bandung, Jawa Barat. Pusat operasional
              LokalIn dan basis komunitas UMKM sekitar kampus.
            </p>
            <a
              href={MAPS_LINK_SRC}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "20px",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#A5B4FC",
                textDecoration: "none",
                width: "fit-content",
              }}
              className="footer-link"
            >
              Buka di Google Maps
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* Right: embedded map */}
          <div className="footer-map-frame">
            <div className="footer-map-inner">
              <a
                href={MAPS_LINK_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-badge"
              >
                <span className="footer-map-pin-dot" />
                Universitas Teknologi Bandung
              </a>
              <iframe
                src={MAPS_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi LokalIn — Universitas Teknologi Bandung"
                aria-label="Peta lokasi LokalIn"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            paddingBottom: "28px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#475569" }}>
            © 2026 LokalIn. Seluruh hak cipta dilindungi.
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#475569",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Dibuat dengan
            <span style={{ color: "#F59E0B" }}>♥</span>
            untuk UMKM lokal Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
