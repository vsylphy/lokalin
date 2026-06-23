import { supabase } from "@/lib/supabase";
import AdminNavbar from "@/components/layout/AdminNavbar";

function UmkmIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5 5.2 4.5h13.6L20 9.5" />
      <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
      <path d="M10 19.5v-5.5h4v5.5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5a2 2 0 0 1 2-2h8.5L20 7.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M14 3v4.5a1 1 0 0 0 1 1H20" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: "indigo" | "emerald" | "amber";
  helper?: string;
};

function StatCard({ label, value, icon, accent, helper }: StatCardProps) {
  const accentVar =
    accent === "indigo"
      ? "var(--admin-accent)"
      : accent === "emerald"
        ? "var(--admin-success)"
        : "var(--admin-warning)";
  const accentSoft =
    accent === "indigo"
      ? "var(--admin-accent-soft)"
      : accent === "emerald"
        ? "var(--admin-success-soft)"
        : "var(--admin-warning-soft)";

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span
          className="stat-card-icon"
          style={{ color: accentVar, background: accentSoft }}
        >
          {icon}
        </span>
        {helper && (
          <span className="stat-card-badge">
            <ArrowUpIcon />
            {helper}
          </span>
        )}
      </div>
      <p className="stat-card-label">{label}</p>
      <h2 className="stat-card-value">{value.toLocaleString("id-ID")}</h2>
    </div>
  );
}

export default async function DashboardPage() {
  const { count: totalUmkm } = await supabase.from("umkm").select("*", {
    count: "exact",
    head: true,
  });

  const { count: totalMenu } = await supabase.from("menu").select("*", {
    count: "exact",
    head: true,
  });

  const { data: recentUmkm } = await supabase
    .from("umkm")
    .select("id, nama, kategori, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <>
      <AdminNavbar />

      <div className="admin-content-offset">
        <main className="dashboard-main">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

            .dashboard-main {
              font-family: 'Inter', system-ui, sans-serif;
              background: var(--admin-bg);
              min-height: 100vh;
              padding: 32px;
              color: var(--admin-text-primary);
            }

            .dashboard-header {
              margin-bottom: 28px;
            }

            .dashboard-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 800;
              font-size: 1.75rem;
              color: var(--admin-text-primary);
              letter-spacing: -0.02em;
            }

            .dashboard-subtitle {
              color: var(--admin-text-secondary);
              font-size: 14px;
              margin-top: 6px;
            }

            .stat-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 18px;
              margin-bottom: 32px;
            }

            .stat-card {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              border-radius: 16px;
              padding: 22px;
              box-shadow: var(--admin-shadow-sm);
              transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
            }

            .stat-card:hover {
              border-color: var(--admin-border-strong);
              box-shadow: var(--admin-shadow-md);
              transform: translateY(-2px);
            }

            .stat-card-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
            }

            .stat-card-icon {
              width: 40px;
              height: 40px;
              border-radius: 11px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .stat-card-badge {
              display: flex;
              align-items: center;
              gap: 3px;
              font-size: 11.5px;
              font-weight: 600;
              color: var(--admin-success);
              background: var(--admin-success-soft);
              padding: 3px 8px;
              border-radius: 100px;
            }

            .stat-card-label {
              font-size: 13px;
              color: var(--admin-text-secondary);
              font-weight: 500;
            }

            .stat-card-value {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 800;
              font-size: 2.1rem;
              color: var(--admin-text-primary);
              margin-top: 6px;
              letter-spacing: -0.02em;
            }

            .panel {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              border-radius: 16px;
              box-shadow: var(--admin-shadow-sm);
              overflow: hidden;
            }

            .panel-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 18px 22px;
              border-bottom: 1px solid var(--admin-border);
            }

            .panel-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 700;
              font-size: 15px;
              color: var(--admin-text-primary);
            }

            .panel-link {
              font-size: 12.5px;
              font-weight: 600;
              color: var(--admin-accent);
              text-decoration: none;
            }

            .panel-link:hover {
              text-decoration: underline;
            }

            .recent-row {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 14px 22px;
              border-bottom: 1px solid var(--admin-border);
              transition: background 0.15s ease;
            }

            .recent-row:last-child {
              border-bottom: none;
            }

            .recent-row:hover {
              background: var(--admin-surface-hover);
            }

            .recent-avatar {
              width: 36px;
              height: 36px;
              border-radius: 10px;
              background: var(--admin-accent-soft);
              color: var(--admin-accent);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 13px;
              flex-shrink: 0;
            }

            .recent-name {
              font-size: 13.5px;
              font-weight: 600;
              color: var(--admin-text-primary);
            }

            .recent-meta {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 12px;
              color: var(--admin-text-tertiary);
              margin-top: 2px;
            }

            .recent-category {
              margin-left: auto;
              font-size: 11.5px;
              font-weight: 600;
              color: var(--admin-accent);
              background: var(--admin-accent-soft);
              padding: 4px 10px;
              border-radius: 100px;
              white-space: nowrap;
            }

            .empty-state {
              padding: 40px 22px;
              text-align: center;
              color: var(--admin-text-tertiary);
              font-size: 13.5px;
            }

            @media (max-width: 900px) {
              .stat-grid {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 1024px) {
              .dashboard-main {
                padding: 20px;
              }
            }
          `}</style>

          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Selamat datang kembali. Berikut ringkasan aktivitas LokalIn hari
              ini.
            </p>
          </div>

          <div className="stat-grid">
            <StatCard
              label="Total UMKM"
              value={totalUmkm ?? 0}
              icon={<UmkmIcon />}
              accent="indigo"
            />
            <StatCard
              label="Total Menu"
              value={totalMenu ?? 0}
              icon={<MenuIcon />}
              accent="emerald"
            />
            <StatCard
              label="Rata-rata Menu / UMKM"
              value={
                totalUmkm && totalUmkm > 0
                  ? Math.round((totalMenu ?? 0) / totalUmkm)
                  : 0
              }
              icon={<ActivityIcon />}
              accent="amber"
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">UMKM Terbaru</h3>
              <a href="/admin/umkm" className="panel-link">
                Lihat semua →
              </a>
            </div>

            {recentUmkm && recentUmkm.length > 0 ? (
              recentUmkm.map((item) => (
                <div key={item.id} className="recent-row">
                  <span className="recent-avatar">
                    {item.nama?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p className="recent-name">{item.nama}</p>
                    <div className="recent-meta">
                      <ClockIcon />
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </div>
                  </div>
                  {item.kategori && (
                    <span className="recent-category">{item.kategori}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">Belum ada UMKM yang terdaftar.</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
