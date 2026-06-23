"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const developers = [
  {
    name: "Nama Developer 1",
    role: "Project Manager",
    image: "/team/dev1.jpg",
  },
  {
    name: "Nama Developer 2",
    role: "Frontend Developer",
    image: "/team/dev2.jpg",
  },
  {
    name: "Nama Developer 3",
    role: "Backend Developer",
    image: "/team/dev3.jpg",
  },
  {
    name: "Nama Developer 4",
    role: "UI/UX Designer",
    image: "/team/dev4.jpg",
  },
];

const misiList = [
  {
    num: "01",
    title: "Mendukung UMKM",
    desc: "Memberikan wadah promosi digital yang mudah digunakan oleh pelaku usaha lokal.",
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
        <line x1="12" y1="12" x2="12" y2="19" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Mempermudah Pencarian",
    desc: "Membantu pengguna menemukan produk dan layanan terbaik berdasarkan lokasi dan kategori usaha.",
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
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Membangun Ekosistem",
    desc: "Menghubungkan UMKM, mahasiswa, dan masyarakat dalam satu platform digital yang bermanfaat.",
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
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M12 7v6m0 0l-5.5 4.5M12 13l5.5 4.5" />
      </svg>
    ),
  },
];

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

function RevealBlock({
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
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function TentangPage() {
  return (
    <main
      style={{
        background: "#0A0F1E",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes aboutOrbA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes aboutOrbB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,35px)} }
        @keyframes shimmerText { 0%{background-position:-150% center} 100%{background-position:150% center} }
        @keyframes lineGrow { from{height:0} to{height:100%} }
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .about-hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          letter-spacing: -0.03em;
          line-height: 1.08;
        }

        .about-gradient-word {
          background: linear-gradient(120deg, #818CF8, #C4B5FD, #FBBF24, #818CF8);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 6s linear infinite;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 100px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.28);
          color: #C7D2FE;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }

        .section-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #F59E0B;
          margin-bottom: 10px;
          display: block;
        }

        /* Visi - signature element: orbit ring */
        .visi-orbit-wrap {
          position: relative;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 64px 40px;
          border-radius: 32px;
          background: linear-gradient(160deg, rgba(99,102,241,0.08), rgba(245,158,11,0.04));
          border: 1px solid rgba(99,102,241,0.18);
          text-align: center;
          overflow: hidden;
        }

        .visi-ring {
          position: absolute;
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .visi-quote-mark {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 5rem;
          font-weight: 800;
          color: rgba(99,102,241,0.25);
          line-height: 0.5;
          display: block;
        }

        /* Misi - timeline rail */
        .misi-rail {
          position: relative;
        }

        .misi-item {
          position: relative;
          display: flex;
          gap: 28px;
          padding-bottom: 48px;
        }

        .misi-item:last-child {
          padding-bottom: 0;
        }

        .misi-line {
          position: absolute;
          left: 27px;
          top: 56px;
          bottom: 0;
          width: 1.5px;
          background: linear-gradient(180deg, rgba(99,102,241,0.4), rgba(99,102,241,0.05));
        }

        .misi-icon-circle {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(245,158,11,0.1));
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A5B4FC;
          position: relative;
          z-index: 2;
        }

        .misi-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #F59E0B;
          letter-spacing: 0.05em;
        }

        .misi-card {
          flex: 1;
          padding-top: 4px;
        }

        .misi-card h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: #F1F5F9;
          margin-bottom: 8px;
        }

        .misi-card p {
          color: #94A3B8;
          font-size: 14.5px;
          line-height: 1.7;
        }

        /* Team cards */
        .dev-card {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(99,102,241,0.15);
          background: rgba(255,255,255,0.02);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.4s;
        }

        .dev-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 24px 50px rgba(0,0,0,0.45);
        }

        .dev-img-wrap {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: linear-gradient(160deg, rgba(99,102,241,0.15), rgba(245,158,11,0.08));
        }

        .dev-img {
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .dev-card:hover .dev-img {
          transform: scale(1.07);
        }

        .dev-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(10,15,30,0.85) 100%);
          opacity: 0;
          transition: opacity 0.35s;
        }

        .dev-card:hover .dev-img-overlay {
          opacity: 1;
        }

        .dev-info {
          padding: 22px 20px;
          text-align: center;
        }

        .dev-info h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #F1F5F9;
        }

        .dev-role-badge {
          display: inline-block;
          margin-top: 8px;
          padding: 4px 14px;
          border-radius: 100px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #A5B4FC;
          font-size: 12px;
          font-weight: 600;
        }

        .float-dot {
          position: absolute;
          border-radius: 50%;
          animation: floatSlow 5s ease-in-out infinite;
        }

        @media (max-width: 720px) {
          .misi-item { gap: 18px; }
          .misi-line { left: 23px; }
          .misi-icon-circle { width: 48px; height: 48px; }
        }
      `}</style>

      {/* Ambient background */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "0",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "aboutOrbA 15s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "600px",
          right: "0",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "aboutOrbB 17s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "100px 24px 120px",
        }}
      >
        {/* ===== HERO HEADER ===== */}
        <RevealBlock>
          <section style={{ textAlign: "center", marginBottom: "120px" }}>
            <span className="about-eyebrow">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Tentang Kami
            </span>

            <h1
              className="about-hero-title"
              style={{ color: "#F8FAFC", marginTop: "28px" }}
            >
              Cerita di Balik
              <br />
              <span className="about-gradient-word">LokalIn</span>
            </h1>

            <p
              style={{
                maxWidth: "640px",
                margin: "32px auto 0",
                color: "#94A3B8",
                fontSize: "17px",
                lineHeight: "1.8",
              }}
            >
              LokalIn adalah platform digital yang membantu masyarakat menemukan
              UMKM lokal di sekitar kampus. Website ini dibuat untuk mendukung
              promosi usaha kecil, meningkatkan visibilitas pelaku UMKM, dan
              mempermudah pengguna menemukan produk maupun layanan terbaik di
              lingkungan sekitar.
            </p>
          </section>
        </RevealBlock>

        {/* ===== VISI — signature orbit element ===== */}
        <RevealBlock delay={60}>
          <section style={{ marginBottom: "120px" }}>
            <div className="visi-orbit-wrap">
              {/* decorative rings */}
              <div
                className="visi-ring"
                style={{
                  width: "440px",
                  height: "440px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
              <div
                className="visi-ring"
                style={{
                  width: "340px",
                  height: "340px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />

              <span
                className="float-dot"
                style={{
                  top: "16%",
                  left: "12%",
                  width: "8px",
                  height: "8px",
                  background: "#6366F1",
                  opacity: 0.6,
                }}
              />
              <span
                className="float-dot"
                style={{
                  bottom: "20%",
                  right: "14%",
                  width: "10px",
                  height: "10px",
                  background: "#F59E0B",
                  opacity: 0.5,
                  animationDelay: "1.4s",
                }}
              />

              <span className="visi-quote-mark">&ldquo;</span>

              <span className="section-eyebrow" style={{ marginTop: "8px" }}>
                Visi Kami
              </span>

              <p
                style={{
                  position: "relative",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)",
                  color: "#F1F5F9",
                  lineHeight: "1.5",
                  letterSpacing: "-0.01em",
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Menjadi platform digital yang menghubungkan masyarakat dengan
                UMKM lokal secara{" "}
                <span style={{ color: "#A5B4FC" }}>
                  mudah, cepat, dan terpercaya
                </span>{" "}
                sehingga mampu meningkatkan pertumbuhan ekonomi lokal serta
                mendukung perkembangan usaha kecil dan menengah.
              </p>
            </div>
          </section>
        </RevealBlock>

        {/* ===== MISI — timeline rail ===== */}
        <section style={{ marginBottom: "130px" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="section-eyebrow" style={{ textAlign: "center" }}>
                Tiga Langkah
              </span>
              <h2 className="section-title">Misi Kami</h2>
            </div>
          </RevealBlock>

          <div
            className="misi-rail"
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            <div className="misi-line" />
            {misiList.map((misi, idx) => (
              <RevealBlock key={misi.num} delay={idx * 110}>
                <div className="misi-item">
                  <div className="misi-icon-circle">{misi.icon}</div>
                  <div className="misi-card">
                    <span className="misi-num">{misi.num}</span>
                    <h3>{misi.title}</h3>
                    <p>{misi.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>

        {/* ===== TIM PENGEMBANG ===== */}
        <section>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="section-eyebrow">Di Balik Layar</span>
              <h2 className="section-title">Tim Pengembang</h2>
              <p
                style={{
                  color: "#64748B",
                  marginTop: "14px",
                  fontSize: "15px",
                }}
              >
                Orang-orang yang membangun LokalIn dari nol.
              </p>
            </div>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="dev-grid"
          >
            {developers.map((dev, idx) => (
              <RevealBlock key={dev.name} delay={idx * 90}>
                <div className="dev-card">
                  <div className="dev-img-wrap">
                    <Image
                      src={dev.image}
                      alt={dev.name}
                      fill
                      className="dev-img"
                    />
                    <div className="dev-img-overlay" />
                  </div>
                  <div className="dev-info">
                    <h3>{dev.name}</h3>
                    <span className="dev-role-badge">{dev.role}</span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dev-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .dev-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
