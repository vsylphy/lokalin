import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function DetailUmkm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: umkm } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", id)
    .single();

  const { data: menu } = await supabase
    .from("menu")
    .select("*")
    .eq("umkm_id", id);

  if (!umkm) {
    return (
      <main
        style={{
          background: "#0A0F1E",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        `}</style>
        <div style={{ textAlign: "center", padding: "40px 24px" }}>
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
            style={{ margin: "0 auto 20px" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.8rem",
              color: "#F1F5F9",
            }}
          >
            UMKM tidak ditemukan
          </h1>
          <p style={{ color: "#64748B", marginTop: "10px", fontSize: "15px" }}>
            Usaha yang kamu cari mungkin sudah tidak tersedia.
          </p>
          <Link
            href="/umkm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "26px",
              padding: "13px 26px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            ← Kembali ke Daftar UMKM
          </Link>
        </div>
      </main>
    );
  }

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

        @keyframes detailFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes detailHeroZoom {
          from { transform: scale(1.08); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes detailOrbDrift {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(30px, -25px); }
        }
        @keyframes menuCardIn {
          from { opacity: 0; transform: translateY(26px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .detail-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #94A3B8;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
          animation: detailFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .detail-back-link:hover {
          color: #A5B4FC;
          transform: translateX(-3px);
        }

        .detail-hero-wrap {
          position: relative;
          width: 100%;
          height: 460px;
          border-radius: 32px;
          overflow: hidden;
          margin-top: 20px;
          animation: detailHeroZoom 0.9s cubic-bezier(0.22,1,0.36,1) both;
          border: 1px solid rgba(99,102,241,0.18);
        }

        .detail-hero-img {
          object-fit: cover;
        }

        .detail-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.75) 100%);
        }

        .detail-hero-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 40px;
        }

        .detail-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 18px;
          border-radius: 100px;
          background: rgba(99,102,241,0.18);
          border: 1px solid rgba(165,180,252,0.4);
          backdrop-filter: blur(8px);
          color: #C7D2FE;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          animation: detailFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both;
        }

        .detail-hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.4rem);
          color: #F8FAFC;
          letter-spacing: -0.02em;
          margin-top: 14px;
          animation: detailFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }

        .detail-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #CBD5E1;
          font-size: 14.5px;
          margin-top: 12px;
          animation: detailFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }

        .detail-desc-card {
          margin-top: 36px;
          padding: 32px;
          border-radius: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(99,102,241,0.14);
          animation: detailFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }

        .detail-desc-card p {
          color: #CBD5E1;
          font-size: 16px;
          line-height: 1.85;
        }

        .menu-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 32px;
        }

        .menu-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(99,102,241,0.14);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.35s;
          animation: menuCardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .menu-card:hover {
          transform: translateY(-6px);
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4);
        }

        .menu-img-wrap {
          position: relative;
          width: 100%;
          height: 192px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(245,158,11,0.08));
        }

        .menu-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .menu-card:hover .menu-img {
          transform: scale(1.08);
        }

        .menu-card-body {
          padding: 18px 20px;
        }

        .menu-card-body h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #F1F5F9;
        }

        .menu-price {
          display: inline-flex;
          align-items: center;
          margin-top: 10px;
          padding: 5px 13px;
          border-radius: 100px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.3);
          color: #FBBF24;
          font-size: 13.5px;
          font-weight: 700;
        }

        .menu-empty {
          padding: 60px 24px;
          text-align: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 24px;
          margin-top: 32px;
        }

        .menu-empty p {
          color: #64748B;
          font-size: 15px;
          margin-top: 10px;
        }

        @media (max-width: 1024px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .menu-grid { grid-template-columns: 1fr; }
          .detail-hero-wrap { height: 320px; }
          .detail-hero-content { padding: 24px; }
        }
      `}</style>

      {/* Ambient background orbs */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "-60px",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "detailOrbDrift 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "700px",
          left: "-80px",
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "detailOrbDrift 18s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "40px 24px 110px",
        }}
      >
        <Link href="/umkm" className="detail-back-link">
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali ke Daftar UMKM
        </Link>

        {/* Hero image with overlay content */}
        <div className="detail-hero-wrap">
          {umkm.gambar && (
            <Image
              src={umkm.gambar}
              alt={umkm.nama}
              fill
              className="detail-hero-img"
              priority
            />
          )}
          <div className="detail-hero-overlay" />
          <div className="detail-hero-content">
            <span className="detail-badge">{umkm.kategori}</span>
            <h1 className="detail-hero-title">{umkm.nama}</h1>
            {umkm.alamat && (
              <div className="detail-location">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {umkm.alamat}
              </div>
            )}
            {umkm.whatsapp && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#E2E8F0",
                    fontSize: "14px",
                  }}
                >
                  📞 {umkm.whatsapp}
                </span>

                <a
                  href={`https://wa.me/62${String(umkm.whatsapp).replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    background: "#22C55E",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Chat WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {umkm.deskripsi && (
          <div className="detail-desc-card">
            <p>{umkm.deskripsi}</p>
          </div>
        )}

        {/* Menu section */}
        <div style={{ marginTop: "64px" }}>
          <h2 className="menu-section-title">Daftar Menu</h2>

          {menu && menu.length > 0 ? (
            <div className="menu-grid">
              {menu.map((item, idx) => (
                <div
                  key={item.id}
                  className="menu-card"
                  style={{ animationDelay: `${Math.min(idx * 70, 350)}ms` }}
                >
                  {item.gambar && (
                    <div className="menu-img-wrap">
                      <Image
                        src={item.gambar}
                        alt={item.nama}
                        width={400}
                        height={250}
                        className="menu-img"
                      />
                    </div>
                  )}
                  <div className="menu-card-body">
                    <h3>{item.nama_menu}</h3>

                    <span className="menu-price">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="menu-empty">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
                style={{ margin: "0 auto" }}
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
              </svg>
              <p>Menu belum tersedia untuk UMKM ini.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
