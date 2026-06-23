"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   Reveal-on-scroll helper (shared pattern with Tentang page)
   ============================================================ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Data
   ============================================================ */

const steps = [
  {
    num: "01",
    title: "Jelajahi & Cari",
    desc: "Telusuri UMKM di sekitar kampus berdasarkan nama atau filter kategori usaha yang kamu butuhkan.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Lihat Detail Usaha",
    desc: "Cek deskripsi, lokasi, kategori, hingga daftar menu atau produk yang ditawarkan secara lengkap.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Kunjungi & Dukung",
    desc: "Datangi langsung lokasinya atau hubungi pemilik usaha untuk memesan produk maupun layanan.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const kategoriUsaha = [
  {
    label: "Kuliner",
    desc: "Warung, kafe, jajanan",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    label: "Fashion",
    desc: "Pakaian, aksesoris",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    label: "Jasa",
    desc: "Laundry, servis, les",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Kerajinan",
    desc: "Handmade, souvenir",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Digital",
    desc: "Konten, desain, IT",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: "Lainnya",
    desc: "Usaha Kreatif lain",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    ),
  },
];

const whyUs = [
  {
    title: "Verifikasi Manual",
    desc: "Setiap UMKM yang tampil sudah dicek oleh admin, bukan asal input data.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Fokus Sekitar Kampus",
    desc: "Bukan platform nasional yang generik — semua usaha relevan dengan kebutuhan harian mahasiswa.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    ),
  },
  {
    title: "Tanpa Biaya Pencarian",
    desc: "Gratis sepenuhnya untuk pengguna — cukup cari, lihat detail, dan kunjungi langsung.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const tingkatanUmkm = [
  {
    tier: "Mikro",
    modal: "≤ Rp1 Miliar",
    omzet: "≤ Rp2 Miliar / tahun",
    desc: "Usaha rumahan, pedagang kaki lima, hingga warung kelontong yang dikelola langsung oleh pemiliknya.",
    color: "#6366F1",
  },
  {
    tier: "Kecil",
    modal: "Rp1 M – Rp5 M",
    omzet: "Rp2 M – Rp15 M / tahun",
    desc: "Struktur usaha lebih tertata, biasanya sudah punya beberapa karyawan dan sistem manajemen dasar.",
    color: "#8B5CF6",
  },
  {
    tier: "Menengah",
    modal: "Rp5 M – Rp10 M",
    omzet: "Rp15 M – Rp50 M / tahun",
    desc: "Skala operasional besar dengan manajemen lebih profesional, satu langkah menuju usaha besar.",
    color: "#F59E0B",
  },
];

/* ============================================================
   Component
   ============================================================ */

export default function LandingExtras() {
  return (
    <div
      style={{
        background: "#0A0F1E",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes extrasOrbA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,-25px)} }
        @keyframes extrasOrbB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,30px)} }
        @keyframes tierBarGrow { from{ transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes arrowBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }

        .extras-section-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #F59E0B;
          display: block;
          margin-bottom: 10px;
        }

        .extras-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }

        .extras-section-sub {
          color: #94A3B8;
          font-size: 16px;
          margin-top: 14px;
          max-width: 560px;
        }

        /* ---- Steps (Cara Kerja) ---- */
        .step-card {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(99,102,241,0.16);
          border-radius: 24px;
          padding: 32px 28px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s;
        }
        .step-card:hover {
          transform: translateY(-6px);
          border-color: rgba(99,102,241,0.4);
        }
        .step-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #F59E0B;
          letter-spacing: 0.04em;
        }
        .step-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.12));
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A5B4FC;
          margin: 14px 0 18px;
        }
        .step-card h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #F1F5F9;
          margin-bottom: 10px;
        }
        .step-card p {
          color: #94A3B8;
          font-size: 14.5px;
          line-height: 1.7;
        }
        .step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366F1;
          opacity: 0.5;
        }
        .step-arrow svg {
          animation: arrowBounce 2s ease-in-out infinite;
        }

        /* ---- Kategori grid ---- */
        .kategori-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(99,102,241,0.14);
          border-radius: 20px;
          padding: 24px 20px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .kategori-card:hover {
          transform: translateY(-5px);
          border-color: rgba(245,158,11,0.4);
          background: rgba(245,158,11,0.04);
        }
        .kategori-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A5B4FC;
          margin: 0 auto 14px;
          transition: all 0.3s;
        }
        .kategori-card:hover .kategori-icon {
          background: rgba(245,158,11,0.15);
          border-color: rgba(245,158,11,0.4);
          color: #FBBF24;
        }
        .kategori-card h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #F1F5F9;
        }
        .kategori-card p {
          color: #64748B;
          font-size: 12.5px;
          margin-top: 4px;
        }

        /* ---- Why us ---- */
        .why-card {
          display: flex;
          gap: 18px;
          padding: 26px;
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(99,102,241,0.12);
          transition: border-color 0.3s, background 0.3s;
        }
        .why-card:hover {
          border-color: rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.04);
        }
        .why-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: 13px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FBBF24;
        }
        .why-card h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #F1F5F9;
          margin-bottom: 6px;
        }
        .why-card p {
          color: #94A3B8;
          font-size: 14px;
          line-height: 1.65;
        }

        /* ---- Tingkatan UMKM ---- */
        .tier-card {
          position: relative;
          border-radius: 24px;
          padding: 30px 28px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(99,102,241,0.14);
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .tier-card:hover {
          transform: translateY(-6px);
        }
        .tier-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          transform-origin: left;
          animation: tierBarGrow 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
        .tier-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
        }
        .tier-meta-row {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(148,163,184,0.12);
        }
        .tier-meta-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748B;
          font-weight: 600;
        }
        .tier-meta-value {
          font-size: 14px;
          font-weight: 700;
          color: #E2E8F0;
          margin-top: 4px;
        }
        .tier-card p.tier-desc {
          color: #94A3B8;
          font-size: 13.5px;
          line-height: 1.65;
          margin-top: 16px;
        }
        .tier-source {
          text-align: center;
          color: #475569;
          font-size: 12.5px;
          margin-top: 28px;
        }

        .extras-grid-3 { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 20px; align-items: stretch; }
        .kategori-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        @media (max-width: 900px) {
          .extras-grid-3 { grid-template-columns: 1fr; }
          .step-arrow { transform: rotate(90deg); margin: -8px 0; }
          .kategori-grid { grid-template-columns: repeat(3, 1fr); }
          .why-grid { grid-template-columns: 1fr; }
          .tier-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .kategori-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-80px",
          width: "360px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "extrasOrbA 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "-100px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "extrasOrbB 18s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "20px 24px 0",
        }}
      >
        {/* ============ CARA KERJA ============ */}
        <section style={{ padding: "100px 0" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span
                className="extras-section-eyebrow"
                style={{ textAlign: "center" }}
              >
                Cara Kerja
              </span>
              <h2 className="extras-section-title">Tiga Langkah Mudah</h2>
              <p
                className="extras-section-sub"
                style={{ margin: "14px auto 0" }}
              >
                Tidak perlu daftar akun untuk mulai menjelajah usaha lokal di
                sekitarmu.
              </p>
            </div>
          </Reveal>

          <div className="extras-grid-3">
            {steps.map((step, idx) => (
              <div key={step.num} style={{ display: "contents" }}>
                <Reveal delay={idx * 130}>
                  <div className="step-card">
                    <span className="step-num">{step.num}</span>
                    <div className="step-icon-circle">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </Reveal>
                {idx < steps.length - 1 && (
                  <div className="step-arrow">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============ KATEGORI USAHA ============ */}
        <section style={{ padding: "60px 0 100px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                className="extras-section-eyebrow"
                style={{ textAlign: "center" }}
              >
                Ragam Usaha
              </span>
              <h2 className="extras-section-title">Kategori UMKM Populer</h2>
              <p
                className="extras-section-sub"
                style={{ margin: "14px auto 0" }}
              >
                Dari urusan perut sampai kebutuhan harian, semua ada di sekitar
                kampus.
              </p>
            </div>
          </Reveal>

          <div className="kategori-grid">
            {kategoriUsaha.map((kat, idx) => (
              <Reveal key={kat.label} delay={idx * 70}>
                <div className="kategori-card">
                  <div className="kategori-icon">{kat.icon}</div>
                  <h4>{kat.label}</h4>
                  <p>{kat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ KENAPA LOKALIN ============ */}
        <section style={{ padding: "60px 0 100px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                className="extras-section-eyebrow"
                style={{ textAlign: "center" }}
              >
                Kenapa LokalIn
              </span>
              <h2 className="extras-section-title">
                Dibangun untuk Komunitas Kampus
              </h2>
            </div>
          </Reveal>

          <div className="why-grid">
            {whyUs.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="why-card">
                  <div className="why-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ TINGKATAN UMKM DI INDONESIA ============ */}
        <section style={{ padding: "60px 0 120px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span
                className="extras-section-eyebrow"
                style={{ textAlign: "center" }}
              >
                Edukasi UMKM
              </span>
              <h2 className="extras-section-title">
                Mengenal Tingkatan UMKM di Indonesia
              </h2>
              <p
                className="extras-section-sub"
                style={{ margin: "14px auto 0" }}
              >
                Berdasarkan PP No. 7 Tahun 2021, UMKM diklasifikasikan ke dalam
                tiga tingkatan menurut modal usaha dan omzet tahunan.
              </p>
            </div>
          </Reveal>

          <div className="tier-grid" style={{ marginTop: "48px" }}>
            {tingkatanUmkm.map((tier, idx) => (
              <Reveal key={tier.tier} delay={idx * 120}>
                <div className="tier-card">
                  <div
                    className="tier-bar"
                    style={{ background: tier.color }}
                  />
                  <span className="tier-label" style={{ color: tier.color }}>
                    {tier.tier}
                  </span>

                  <div className="tier-meta-row">
                    <div>
                      <div className="tier-meta-label">Modal Usaha</div>
                      <div className="tier-meta-value">{tier.modal}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="tier-meta-label">Omzet</div>
                      <div className="tier-meta-value">{tier.omzet}</div>
                    </div>
                  </div>

                  <p className="tier-desc">{tier.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={360}>
            <p className="tier-source">
              Sumber: PP No. 7 Tahun 2021 tentang Kemudahan, Pelindungan, dan
              Pemberdayaan Koperasi dan UMKM — turunan UU Cipta Kerja.
            </p>
          </Reveal>
        </section>

        {/* ============ CTA PENUTUP ============ */}
        <Reveal>
          <section
            style={{
              padding: "56px 40px",
              borderRadius: "32px",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(245,158,11,0.08))",
              border: "1px solid rgba(99,102,241,0.25)",
              textAlign: "center",
              marginBottom: "100px",
            }}
          >
            <h2
              className="extras-section-title"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)" }}
            >
              Punya usaha di sekitar kampus?
            </h2>
            <p
              style={{
                color: "#94A3B8",
                marginTop: "12px",
                fontSize: "15.5px",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Daftarkan UMKM-mu dan jangkau lebih banyak mahasiswa serta warga
              sekitar.
            </p>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "26px",
                padding: "15px 30px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14.5px",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(99,102,241,0.35)",
              }}
            >
              Hubungi Admin
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
