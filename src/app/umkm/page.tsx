import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import SearchBar from "./SearchBar";

type Props = {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
  }>;
};

const categoryStyles: Record<string, { bg: string; color: string }> = {
  default: { bg: "rgba(99,102,241,0.12)", color: "#A5B4FC" },
};

function getCategoryStyle() {
  return categoryStyles.default;
}

export default async function UmkmPage({ searchParams }: Props) {
  const params = await searchParams;

  const q = params.q ?? "";
  const kategori = params.kategori ?? "";

  let query = supabase
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.ilike("nama", `%${q}%`);
  }

  if (kategori && kategori !== "Semua") {
    query = query.eq("kategori", kategori);
  }

  const { data: umkm } = await query;

  const kategoriList = [
    "Semua",
    ...new Set((umkm ?? []).map((item) => item.kategori).filter(Boolean)),
  ];

  return (
    <main
      style={{
        background: "#0A0F1E",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes pageFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardStagger {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes umkmOrbDrift {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(30px, -25px); }
        }

        @keyframes emptyBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .umkm-page-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          letter-spacing: -0.03em;
          color: #F8FAFC;
          animation: pageFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .umkm-page-sub {
          color: #94A3B8;
          font-size: 17px;
          margin-top: 14px;
          animation: pageFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.08s both;
        }

        .umkm-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(99,102,241,0.14);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.35s;
          animation: cardStagger 0.55s cubic-bezier(0.22,1,0.36,1) both;
          display: flex;
          flex-direction: column;
        }

        .umkm-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15);
        }

        .umkm-card-img-wrap {
          position: relative;
          width: 100%;
          height: 208px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(245,158,11,0.1));
        }

        .umkm-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .umkm-card:hover .umkm-card-img {
          transform: scale(1.08);
        }

        .umkm-card-img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366F1;
          opacity: 0.4;
        }

        .umkm-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #A5B4FC;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .umkm-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: #F1F5F9;
          margin-top: 14px;
          letter-spacing: -0.01em;
        }

        .umkm-card-desc {
          color: #94A3B8;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .umkm-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding: 12px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }

        .umkm-card-cta:hover {
          transform: translateX(3px);
          box-shadow: 0 6px 22px rgba(99,102,241,0.5);
        }

        .umkm-card-cta svg {
          transition: transform 0.25s;
        }

        .umkm-card-cta:hover svg {
          transform: translateX(3px);
        }

        .umkm-empty-icon {
          animation: emptyBounce 2.5s ease-in-out infinite;
        }

        .umkm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 36px;
        }

        @media (max-width: 1024px) {
          .umkm-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .umkm-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Ambient background orbs */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "umkmOrbDrift 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "200px",
          right: "0",
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "umkmOrbDrift 18s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <h1 className="umkm-page-title">Jelajahi UMKM Lokal</h1>
          <p className="umkm-page-sub">
            Temukan usaha terbaik di sekitar kampus.
          </p>
        </div>

        <SearchBar kategoriList={kategoriList} currentKategori={kategori} />

        {umkm?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "90px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(99,102,241,0.12)",
              borderRadius: "28px",
            }}
          >
            <div
              className="umkm-empty-icon"
              style={{ display: "inline-flex", marginBottom: "8px" }}
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: "#E2E8F0",
                marginTop: "12px",
              }}
            >
              Tidak ada UMKM ditemukan
            </h2>
            <p
              style={{ color: "#64748B", marginTop: "10px", fontSize: "15px" }}
            >
              Coba kata kunci atau kategori lain.
            </p>
          </div>
        ) : (
          <div className="umkm-grid">
            {umkm?.map((item, idx) => {
              const style = getCategoryStyle();
              return (
                <div
                  key={item.id}
                  className="umkm-card"
                  style={{ animationDelay: `${Math.min(idx * 70, 420)}ms` }}
                >
                  <div className="umkm-card-img-wrap">
                    {item.gambar ? (
                      <Image
                        src={item.gambar}
                        alt={item.nama}
                        width={500}
                        height={300}
                        className="umkm-card-img"
                      />
                    ) : (
                      <div className="umkm-card-img-fallback">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                          <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                          <line x1="12" y1="12" x2="12" y2="19" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "24px" }}>
                    <span
                      className="umkm-badge"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {item.kategori}
                    </span>

                    <h2 className="umkm-card-title">{item.nama}</h2>

                    <p className="umkm-card-desc">{item.deskripsi}</p>

                    <Link href={`/umkm/${item.id}`} className="umkm-card-cta">
                      Lihat Detail
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
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
