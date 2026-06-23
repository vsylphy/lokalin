"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "UMKM Terdaftar", color: "#6366F1" },
  { value: 500, suffix: "+", label: "Produk Lokal", color: "#F59E0B" },
  { value: 24, suffix: "/7", label: "Akses Informasi", color: "#6366F1" },
];

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

function StatCard({
  value,
  suffix,
  label,
  color,
  delay,
  visible,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
  visible: boolean;
}) {
  const count = useCountUp(value, visible);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(99,102,241,0.15)",
        borderRadius: "24px",
        padding: "32px",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      className="hero-stat-card"
    >
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "2.5rem",
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        {suffix}
      </h3>
      <p style={{ color: "#94A3B8", marginTop: "8px", fontSize: "15px" }}>
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0A0F1E",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes heroOrbDriftA {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes heroOrbDriftB {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.05); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloatDot {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        @keyframes badgeShimmer {
          0% { background-position: -150% center; }
          100% { background-position: 150% center; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 100px;
          background: linear-gradient(90deg, rgba(99,102,241,0.15), rgba(245,158,11,0.15), rgba(99,102,241,0.15));
          background-size: 200% auto;
          border: 1px solid rgba(99,102,241,0.3);
          color: #C7D2FE;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          animation: badgeShimmer 5s linear infinite, heroFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 6.5vw, 5rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #F8FAFC;
          animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }

        .hero-title-gradient {
          display: block;
          background: linear-gradient(120deg, #818CF8 0%, #C4B5FD 35%, #FBBF24 70%, #818CF8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: badgeShimmer 6s linear infinite;
        }

        .hero-sub {
          color: #94A3B8;
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          line-height: 1.7;
          animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }

        .hero-cta-row {
          animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both;
        }

        .hero-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 17px 32px;
          border-radius: 16px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6 60%, #7C3AED);
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(99,102,241,0.4);
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s;
          overflow: hidden;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(99,102,241,0.55);
        }
        .hero-btn-primary svg {
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-btn-primary:hover svg {
          transform: translateX(4px);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 17px 32px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(148,163,184,0.25);
          color: #E2E8F0;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(245,158,11,0.4);
          transform: translateY(-3px);
        }

        .hero-stat-card:hover {
          border-color: rgba(99,102,241,0.4) !important;
          background: rgba(255,255,255,0.05) !important;
          transform: translateY(-4px) !important;
        }

        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
          animation: gridPulse 6s ease-in-out infinite;
        }

        .hero-float-dot {
          position: absolute;
          border-radius: 50%;
          animation: heroFloatDot 5s ease-in-out infinite;
        }
      `}</style>

      {/* Grid background */}
      <div className="hero-grid-overlay" />

      {/* Ambient gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "5%",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "heroOrbDriftA 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "3%",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "heroOrbDriftB 16s ease-in-out infinite",
        }}
      />

      {/* Floating decorative dots */}
      <span
        className="hero-float-dot"
        style={{
          top: "18%",
          left: "12%",
          width: "10px",
          height: "10px",
          background: "#6366F1",
          opacity: 0.6,
          animationDelay: "0s",
        }}
      />
      <span
        className="hero-float-dot"
        style={{
          top: "65%",
          left: "8%",
          width: "6px",
          height: "6px",
          background: "#F59E0B",
          opacity: 0.5,
          animationDelay: "1.2s",
        }}
      />
      <span
        className="hero-float-dot"
        style={{
          top: "30%",
          right: "10%",
          width: "8px",
          height: "8px",
          background: "#F59E0B",
          opacity: 0.6,
          animationDelay: "0.6s",
        }}
      />
      <span
        className="hero-float-dot"
        style={{
          top: "75%",
          right: "15%",
          width: "12px",
          height: "12px",
          background: "#8B5CF6",
          opacity: 0.4,
          animationDelay: "1.8s",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px 100px",
          textAlign: "center",
        }}
      >
        {loaded && (
          <span className="hero-eyebrow">
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
              <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.6h7.6z" />
            </svg>
            Platform UMKM Kampus #1
          </span>
        )}

        <h1 className="hero-title" style={{ marginTop: "32px" }}>
          Temukan
          <span className="hero-title-gradient">UMKM Lokal Terbaik</span>
        </h1>

        <p
          className="hero-sub"
          style={{ maxWidth: "620px", margin: "32px auto 0" }}
        >
          Dukung usaha mahasiswa dan masyarakat sekitar kampus dengan menemukan
          produk serta layanan terbaik dalam satu platform.
        </p>

        <div
          className="hero-cta-row"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "44px",
          }}
        >
          <Link href="/umkm" className="hero-btn-primary">
            Jelajahi UMKM
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="hero-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "88px",
          }}
        >
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
              delay={idx * 120}
              visible={statsVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
