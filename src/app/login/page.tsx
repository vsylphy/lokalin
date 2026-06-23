"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { supabaseClient } from "@/lib/supabase-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

type Floater = {
  title: string;
  tag: string;
  icon: "store" | "bag" | "craft";
  hue: "indigo" | "gold";
  top: string;
  left: string;
  z: number;
  delay: string;
};

const FLOATERS: Floater[] = [
  {
    title: "Kantin & Kuliner",
    tag: "42 unit aktif",
    icon: "store",
    hue: "indigo",
    top: "8%",
    left: "6%",
    z: 90,
    delay: "0s",
  },
  {
    title: "Fashion & Aksesori",
    tag: "31 unit aktif",
    icon: "bag",
    hue: "gold",
    top: "46%",
    left: "62%",
    z: 140,
    delay: "0.6s",
  },
  {
    title: "Kriya & Jasa Kampus",
    tag: "27 unit aktif",
    icon: "craft",
    hue: "indigo",
    top: "70%",
    left: "10%",
    z: 60,
    delay: "1.1s",
  },
];

const STATS = [
  { value: "150+", label: "UMKM terdaftar" },
  { value: "12", label: "Fakultas terhubung" },
  { value: "Rp 1.2M+", label: "Transaksi tercatat" },
];

const TYPED_PHRASES = [
  "seluruh UMKM kampus.",
  "produk dan pesanan.",
  "performa unit usaha.",
];

/* ============================================================
   Icons — refined, smaller stroke-weight, more precise paths
   ============================================================ */

function Icon({ name }: { name: Floater["icon"] }) {
  if (name === "store") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 9.5 5.2 4.5h13.6L20 9.5" />
        <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
        <path d="M10 19.5v-5.5h4v5.5" />
        <path d="M4 9.5h16" />
      </svg>
    );
  }
  if (name === "bag") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 7.5h10l.9 12h-11.8z" />
        <path d="M9.3 7.5a2.7 2.7 0 0 1 5.4 0" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4.2c4.2 0 7.5 3.4 7.5 7.5a3.2 3.2 0 0 1-3.2 3.2h-.9a1.8 1.8 0 0 0-1.3 3.1 1.25 1.25 0 0 1-.9 1.9C8.9 20.5 4.5 16.6 4.5 11.7c0-4.2 3.3-7.5 7.5-7.5Z" />
      <circle cx="8.8" cy="11.7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="11" cy="8.3" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="9" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 12S5.7 6.3 12 6.3 21.5 12 21.5 12 18.3 17.7 12 17.7 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l18 18" />
      <path d="M10.8 5.4A9.8 9.8 0 0 1 12 5.3c6 0 9.5 6.7 9.5 6.7a15.6 15.6 0 0 1-3.7 4.5M6.9 6.9C4.4 8.5 2.5 12 2.5 12s3.5 6.7 9.5 6.7a9 9 0 0 0 3.7-.8" />
      <path d="M10 10.2a2.4 2.4 0 0 0 3.4 3.4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m4.5 7.2 7.5 5.6 7.5-5.6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10.8" width="14" height="9" rx="2.2" />
      <path d="M7.8 10.8V8.3a4.2 4.2 0 0 1 8.4 0v2.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.8 18.5 6.3v5c0 4.3-2.8 7.4-6.5 8.4-3.7-1-6.5-4.1-6.5-8.4v-5L12 3.8Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <line x1="12" y1="9.5" x2="12" y2="13.5" />
      <circle cx="12" cy="16.3" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ============================================================
   Typewriter headline hook
   ============================================================ */

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        45,
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        28,
      );
    } else if (deleting && text.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      }, 350);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

/* ============================================================
   Page
   ============================================================ */

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  // 3D popup modal state
  const [popup, setPopup] = useState<{
    open: boolean;
    kind: "empty" | "invalid" | "error";
    message: string;
  }>({ open: false, kind: "empty", message: "" });

  const [fieldShake, setFieldShake] = useState<
    "email" | "password" | "both" | null
  >(null);

  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneTilt, setSceneTilt] = useState({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const typed = useTypewriter(TYPED_PHRASES);

  function handleSceneMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setSceneTilt({ x: py * -14, y: px * 18 });
  }

  function handleCardMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: py * -3, y: px * 3.5 });
  }

  function closePopup() {
    setPopup((p) => ({ ...p, open: false }));
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Empty-field validation — its own popup, with field shake
    if (!trimmedEmail && !trimmedPassword) {
      setFieldShake("both");
      setPopup({
        open: true,
        kind: "empty",
        message: "Email dan kata sandi belum diisi. Lengkapi dulu ya.",
      });
      setTimeout(() => setFieldShake(null), 500);
      return;
    }
    if (!trimmedEmail) {
      setFieldShake("email");
      setPopup({
        open: true,
        kind: "empty",
        message: "Email belum diisi.",
      });
      setTimeout(() => setFieldShake(null), 500);
      return;
    }
    if (!trimmedPassword) {
      setFieldShake("password");
      setPopup({
        open: true,
        kind: "empty",
        message: "Kata sandi belum diisi.",
      });
      setTimeout(() => setFieldShake(null), 500);
      return;
    }

    setLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    setLoading(false);

    if (error) {
      setFieldShake("both");
      setPopup({
        open: true,
        kind: "invalid",
        message:
          error.message === "Invalid login credentials"
            ? "Email atau kata sandi yang dimasukkan tidak sesuai."
            : error.message,
      });
      setTimeout(() => setFieldShake(null), 500);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main
      className={`${inter.variable} relative min-h-screen overflow-hidden bg-[#0A0F1E] font-[var(--font-inter)] text-[#F8FAFC]`}
    >
      {/* ---------------- shared ambient light ---------------- */}
      <div className="ambient-glow ambient-glow--indigo" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--gold" aria-hidden="true" />
      <div
        className="ambient-glow ambient-glow--indigo-soft"
        aria-hidden="true"
      />

      <div className="relative z-10 lg:grid lg:grid-cols-[1.1fr_1fr]">
        {/* ---------------- LEFT: 3D BRAND SCENE ---------------- */}
        <section
          ref={sceneRef}
          onMouseMove={handleSceneMove}
          onMouseLeave={() => setSceneTilt({ x: 0, y: 0 })}
          className="relative hidden min-h-screen flex-col justify-between overflow-hidden px-12 py-12 lg:flex"
          style={{ perspective: "1400px" }}
        >
          <div className="grid-floor" aria-hidden="true" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4338CA] shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <span className="font-[var(--font-display)] text-base font-bold text-[#F8FAFC]">
                U
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-[var(--font-display)] text-sm font-semibold tracking-wide">
                UMKM Kampus
              </p>
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#94A3B8]">
                Admin Panel
              </p>
            </div>
          </div>

          {/* 3D floating scene */}
          <div
            className="scene-rotator relative z-10 mx-auto my-10 h-[360px] w-full max-w-md flex-1"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${sceneTilt.x}deg) rotateY(${sceneTilt.y}deg)`,
            }}
          >
            {FLOATERS.map((f) => (
              <div
                key={f.title}
                className="floater-orbit absolute"
                style={{
                  top: f.top,
                  left: f.left,
                  animationDelay: f.delay,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`floater-card floater-card--${f.hue}`}
                  style={{ transform: `translateZ(${f.z}px)` }}
                >
                  <span className="floater-icon">
                    <Icon name={f.icon} />
                  </span>
                  <span className="block font-[var(--font-display)] text-[12.5px] font-semibold leading-tight text-[#F8FAFC]">
                    {f.title}
                  </span>
                  <span className="text-[10.5px] text-[#94A3B8]">{f.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* headline + stats */}
          <div className="relative z-10 max-w-md">
            <h1 className="font-[var(--font-display)] text-[34px] font-bold leading-[1.12] tracking-tight">
              Satu etalase digital untuk
              <br />
              <span className="typed-line">
                {typed}
                <span className="typed-caret" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
              Pantau produk, pesanan, dan performa unit usaha mahasiswa dari
              satu dashboard terpusat, dirancang khusus untuk pengelola
              inkubator bisnis kampus.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-[var(--font-display)] text-xl font-bold text-[#F8FAFC]">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#94A3B8]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- RIGHT: LOGIN FORM ---------------- */}
        <section className="relative flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-[420px]">
            {/* mobile brand header with mini 3D cube */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="cube-wrap">
                <div className="cube">
                  <span className="cube-face cube-face--front">U</span>
                  <span className="cube-face cube-face--back">K</span>
                  <span className="cube-face cube-face--right" />
                  <span className="cube-face cube-face--left" />
                  <span className="cube-face cube-face--top" />
                  <span className="cube-face cube-face--bottom" />
                </div>
              </div>
              <div className="leading-tight">
                <p className="font-[var(--font-display)] text-base font-semibold">
                  UMKM Kampus
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* gradient-rim card frame */}
            <div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseLeave={() => setCardTilt({ x: 0, y: 0 })}
              className="login-card-frame"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              }}
            >
              <div className="login-card">
                <div className="card-sheen" aria-hidden="true" />

                <div
                  className="anim-up inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#94A3B8]"
                  style={{ animationDelay: "0s" }}
                >
                  <span className="h-2.5 w-2.5 text-[#FBBF24]">
                    <LockIcon />
                  </span>
                  Akses Admin Terbatas
                </div>

                <div
                  className="anim-up mt-4"
                  style={{ animationDelay: "0.06s" }}
                >
                  <h2 className="font-[var(--font-display)] text-[26px] font-bold tracking-tight text-[#F8FAFC] sm:text-[28px]">
                    Masuk ke Dashboard
                  </h2>
                  <p className="mt-2 text-sm text-[#94A3B8]">
                    Kelola etalase dan pesanan UMKM kampus Anda.
                  </p>
                </div>

                <form
                  onSubmit={handleLogin}
                  className="mt-7 space-y-4"
                  noValidate
                >
                  <div
                    className={`anim-up ${fieldShake === "email" || fieldShake === "both" ? "field-shake" : ""}`}
                    style={{ animationDelay: "0.12s" }}
                  >
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#94A3B8]"
                    >
                      Email
                    </label>
                    <div className="field-shell">
                      <span className="field-icon">
                        <MailIcon />
                      </span>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@kampus.ac.id"
                        className="field-input-bare"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    className={`anim-up ${fieldShake === "password" || fieldShake === "both" ? "field-shake" : ""}`}
                    style={{ animationDelay: "0.18s" }}
                  >
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#94A3B8]"
                    >
                      Kata Sandi
                    </label>
                    <div className="field-shell">
                      <span className="field-icon">
                        <LockIcon />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="field-input-bare"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword
                            ? "Sembunyikan kata sandi"
                            : "Tampilkan kata sandi"
                        }
                        className="field-icon field-icon--button"
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </div>

                  <div
                    className="anim-up flex items-center pt-1"
                    style={{ animationDelay: "0.24s" }}
                  >
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#94A3B8]">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="checkbox"
                      />
                      Ingat saya di perangkat ini
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn anim-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <span className="submit-btn__sheen" aria-hidden="true" />
                    {loading ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        Masuk
                        <span className="submit-btn__arrow">
                          <ArrowIcon />
                        </span>
                      </>
                    )}
                  </button>
                </form>

                <p
                  className="anim-up mt-7 flex items-start justify-center gap-2 text-xs leading-relaxed text-[#64748B]"
                  style={{ animationDelay: "0.36s" }}
                >
                  <span className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#475569]">
                    <ShieldIcon />
                  </span>
                  <span>
                    Khusus admin pengelola UMKM kampus. Hubungi Unit Inkubator
                    Bisnis Kampus bila mengalami kendala akses.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- 3D ERROR / VALIDATION POPUP ---------------- */}
      {popup.open && (
        <div className="popup-backdrop" onClick={closePopup}>
          <div
            className="popup-scene"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: "900px" }}
          >
            <div className="popup-card">
              <div className="popup-icon-wrap">
                <AlertIcon />
              </div>
              <h3 className="popup-title">
                {popup.kind === "empty" ? "Form Belum Lengkap" : "Gagal Masuk"}
              </h3>
              <p className="popup-message">{popup.message}</p>
              <button type="button" className="popup-btn" onClick={closePopup}>
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap");
        :root {
          --font-display:
            "Clash Display", var(--font-inter), ui-sans-serif, system-ui,
            sans-serif;
        }
      `}</style>

      <style jsx>{`
        /* ---------- shared ambient light ---------- */
        .ambient-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 0;
        }
        .ambient-glow--indigo {
          width: 560px;
          height: 560px;
          top: -180px;
          left: -160px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.55),
            transparent 70%
          );
        }
        .ambient-glow--gold {
          width: 620px;
          height: 620px;
          top: -60px;
          left: 38%;
          background: radial-gradient(
            circle,
            rgba(245, 158, 11, 0.32),
            transparent 70%
          );
        }
        .ambient-glow--indigo-soft {
          width: 480px;
          height: 480px;
          bottom: -200px;
          left: 4%;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.22),
            transparent 70%
          );
        }

        /* ---------- perspective floor ---------- */
        .grid-floor {
          position: absolute;
          inset: auto 0 0 0;
          height: 55%;
          background-image:
            linear-gradient(rgba(99, 102, 241, 0.14) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(99, 102, 241, 0.14) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
          transform: perspective(600px) rotateX(72deg) scale(1.6);
          transform-origin: bottom;
          -webkit-mask-image: linear-gradient(to top, black, transparent 75%);
          mask-image: linear-gradient(to top, black, transparent 75%);
          opacity: 0.55;
          z-index: 0;
        }

        /* ---------- typewriter headline ---------- */
        .typed-line {
          display: inline-block;
          background: linear-gradient(120deg, #818cf8, #fbbf24);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          min-height: 1.2em;
        }
        .typed-caret {
          display: inline-block;
          width: 2.5px;
          height: 0.85em;
          margin-left: 3px;
          background: #fbbf24;
          vertical-align: -0.1em;
          animation: caretBlink 0.9s steps(1) infinite;
        }
        @keyframes caretBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        /* ---------- floating product cards ---------- */
        .floater-orbit {
          animation: floatY 5.5s ease-in-out infinite;
        }
        .floater-card {
          width: 160px;
          padding: 13px 15px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.02)
          );
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.55);
        }
        .floater-card--indigo .floater-icon {
          color: #818cf8;
          background: rgba(99, 102, 241, 0.16);
        }
        .floater-card--gold .floater-icon {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.16);
        }
        .floater-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          margin-bottom: 7px;
        }
        .floater-icon svg {
          width: 13px;
          height: 13px;
        }

        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(1.2deg);
          }
        }

        /* ---------- mobile 3D cube mark ---------- */
        .cube-wrap {
          width: 38px;
          height: 38px;
          perspective: 240px;
        }
        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: spinCube 9s linear infinite;
        }
        .cube-face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: #f8fafc;
          border-radius: 9px;
          background: linear-gradient(160deg, #6366f1, #4338ca);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .cube-face--front {
          transform: translateZ(19px);
        }
        .cube-face--back {
          transform: rotateY(180deg) translateZ(19px);
        }
        .cube-face--right {
          transform: rotateY(90deg) translateZ(19px);
          background: linear-gradient(160deg, #f59e0b, #b45309);
        }
        .cube-face--left {
          transform: rotateY(-90deg) translateZ(19px);
          background: linear-gradient(160deg, #f59e0b, #b45309);
        }
        .cube-face--top {
          transform: rotateX(90deg) translateZ(19px);
          background: rgba(248, 250, 252, 0.12);
        }
        .cube-face--bottom {
          transform: rotateX(-90deg) translateZ(19px);
          background: rgba(248, 250, 252, 0.12);
        }

        @keyframes spinCube {
          from {
            transform: rotateX(-18deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-18deg) rotateY(360deg);
          }
        }

        /* ---------- login card ---------- */
        .login-card-frame {
          position: relative;
          border-radius: 28px;
          padding: 1.5px;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.55),
            rgba(255, 255, 255, 0.06) 45%,
            rgba(245, 158, 11, 0.4)
          );
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.65);
          transition: transform 0.25s ease-out;
          will-change: transform;
        }
        .login-card {
          position: relative;
          overflow: hidden;
          border-radius: 26.5px;
          background: rgba(13, 18, 34, 0.82);
          backdrop-filter: blur(20px);
          padding: 2rem 1.75rem;
        }
        @media (min-width: 640px) {
          .login-card {
            padding: 2.75rem;
          }
        }
        .card-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(99, 102, 241, 0.1),
            transparent 40%,
            rgba(245, 158, 11, 0.07)
          );
          pointer-events: none;
        }

        .anim-up {
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ---------- field shake on validation error ---------- */
        .field-shake .field-shell {
          animation: shakeX 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          border-color: rgba(248, 113, 113, 0.5) !important;
        }
        @keyframes shakeX {
          10%,
          90% {
            transform: translateX(-1px);
          }
          20%,
          80% {
            transform: translateX(2px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-4px);
          }
          40%,
          60% {
            transform: translateX(4px);
          }
        }

        /* ---------- form fields ---------- */
        .field-shell {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }
        .field-shell:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .field-shell:focus-within {
          border-color: #f59e0b;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.18);
        }
        .field-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 42px;
          flex-shrink: 0;
          color: #94a3b8;
        }
        .field-icon svg {
          width: 13px;
          height: 13px;
        }
        .field-icon--button {
          margin-left: auto;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s ease;
        }
        .field-icon--button:hover {
          color: #f8fafc;
        }
        .field-input-bare {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          padding: 11px 14px 11px 0;
          font-size: 14px;
          color: #f8fafc;
        }
        .field-input-bare::placeholder {
          color: #64748b;
        }

        /* ---------- checkbox ---------- */
        .checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          border-radius: 5px;
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.04);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition:
            background 0.15s ease,
            border-color 0.15s ease;
        }
        .checkbox:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }
        .checkbox:checked {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          border-color: #f59e0b;
        }
        .checkbox:checked::after {
          content: "";
          width: 4px;
          height: 7px;
          border: solid #0a0f1e;
          border-width: 0 1.6px 1.6px 0;
          transform: rotate(45deg) translate(-1px, -1px);
        }

        /* ---------- submit button ---------- */
        .submit-btn {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          font-weight: 600;
          color: #0a0f1e;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition:
            transform 0.15s ease,
            box-shadow 0.2s ease;
          box-shadow: 0 12px 28px -10px rgba(245, 158, 11, 0.55);
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px -10px rgba(245, 158, 11, 0.7);
        }
        .submit-btn:active {
          transform: translateY(0px);
        }
        .submit-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none;
        }
        .submit-btn__sheen {
          position: absolute;
          top: 0;
          left: -60%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }
        .submit-btn:hover .submit-btn__sheen {
          left: 130%;
        }
        .submit-btn__arrow {
          display: inline-flex;
          width: 15px;
          height: 15px;
          transform: translateX(0);
          transition: transform 0.2s ease;
        }
        .submit-btn:hover .submit-btn__arrow {
          transform: translateX(4px);
        }

        .spinner {
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          border: 2px solid rgba(10, 15, 30, 0.35);
          border-top-color: #0a0f1e;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---------- 3D error / validation popup ---------- */
        .popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 8, 18, 0.65);
          backdrop-filter: blur(6px);
          padding: 20px;
          animation: backdropIn 0.25s ease both;
        }
        @keyframes backdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .popup-scene {
          animation: popupEnter 0.5s cubic-bezier(0.2, 1.3, 0.4, 1) both;
        }
        @keyframes popupEnter {
          0% {
            opacity: 0;
            transform: rotateX(-35deg) translateY(40px) scale(0.85);
          }
          60% {
            opacity: 1;
            transform: rotateX(8deg) translateY(-4px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0) scale(1);
          }
        }

        .popup-card {
          width: min(360px, 92vw);
          border-radius: 22px;
          padding: 30px 26px 26px;
          text-align: center;
          background: linear-gradient(
            165deg,
            rgba(24, 20, 38, 0.96),
            rgba(13, 18, 34, 0.97)
          );
          border: 1px solid rgba(248, 113, 113, 0.25);
          box-shadow:
            0 30px 70px -16px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.04) inset;
          transform-style: preserve-3d;
        }

        .popup-icon-wrap {
          width: 52px;
          height: 52px;
          margin: 0 auto 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fb7185;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.3);
          animation: iconPop 0.5s cubic-bezier(0.3, 1.4, 0.5, 1) 0.15s both;
        }
        @keyframes iconPop {
          0% {
            transform: scale(0) rotate(-12deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .popup-icon-wrap svg {
          width: 24px;
          height: 24px;
        }

        .popup-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: #f8fafc;
        }
        .popup-message {
          margin-top: 8px;
          font-size: 13.5px;
          line-height: 1.6;
          color: #94a3b8;
        }
        .popup-btn {
          margin-top: 22px;
          width: 100%;
          padding: 11px 16px;
          border-radius: 11px;
          font-size: 13.5px;
          font-weight: 600;
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.15s ease;
        }
        .popup-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.24);
        }
        .popup-btn:active {
          transform: scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .floater-orbit,
          .cube,
          .submit-btn__sheen,
          .spinner,
          .anim-up,
          .typed-caret,
          .popup-scene,
          .popup-icon-wrap,
          .field-shake .field-shell {
            animation: none !important;
          }
          .login-card-frame {
            transition: none !important;
          }
        }

        @media (max-width: 640px) {
          .popup-card {
            padding: 26px 22px 22px;
          }
        }
      `}</style>
    </main>
  );
}
