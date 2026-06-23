import AdminNavbar from "@/components/layout/AdminNavbar";
import KategoriManager from "@/components/admin/KategoriManager";
import ExportSection from "@/components/admin/ExportSection";
import { getStorageStats } from "@/actions/settings";
import { supabase } from "@/lib/supabase";

function SettingsSectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: "var(--admin-accent-soft)",
        color: "var(--admin-accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

function TagIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.6 3.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-8.6 8.6a1 1 0 0 1-1.4 0l-6.7-6.7a1 1 0 0 1 0-1.4l8.6-8.6Z" />
      <circle cx="16.5" cy="7.5" r="1.2" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4.5 18h15" />
    </svg>
  );
}
function HardDriveIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function SettingsPanel({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <SettingsSectionIcon>{icon}</SettingsSectionIcon>
        <div>
          <h2 className="settings-panel-title">{title}</h2>
          <p className="settings-panel-desc">{description}</p>
        </div>
      </div>
      <div className="settings-panel-body">{children}</div>
    </div>
  );
}

export default async function SettingsPage() {
  const [
    { data: kategoriData },
    { count: umkmCount },
    { count: menuCount },
    storageStats,
  ] = await Promise.all([
    supabase.from("kategori").select("id, nama").order("nama"),
    supabase.from("umkm").select("*", { count: "exact", head: true }),
    supabase.from("menu").select("*", { count: "exact", head: true }),
    getStorageStats(),
  ]);

  const kategori = (kategoriData ?? []) as Array<{ id: string; nama: string }>;

  return (
    <>
      <AdminNavbar />

      <div className="admin-content-offset">
        <main className="settings-main">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

            .settings-main {
              font-family: 'Inter', system-ui, sans-serif;
              background: var(--admin-bg);
              min-height: 100vh;
              padding: 32px;
              color: var(--admin-text-primary);
            }

            .settings-header {
              margin-bottom: 28px;
            }

            .settings-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 800;
              font-size: 1.65rem;
              letter-spacing: -0.02em;
            }

            .settings-subtitle {
              color: var(--admin-text-secondary);
              font-size: 13.5px;
              margin-top: 5px;
            }

            .settings-stack {
              display: flex;
              flex-direction: column;
              gap: 20px;
              max-width: 780px;
            }

            .settings-panel {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              border-radius: 16px;
              overflow: hidden;
              box-shadow: var(--admin-shadow-sm);
            }

            .settings-panel-header {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 20px 22px;
              border-bottom: 1px solid var(--admin-border);
            }

            .settings-panel-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 700;
              font-size: 15px;
              color: var(--admin-text-primary);
            }

            .settings-panel-desc {
              font-size: 12.5px;
              color: var(--admin-text-secondary);
              margin-top: 2px;
            }

            .settings-panel-body {
              padding: 22px;
            }

            /* Storage stats */
            .storage-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 14px;
            }

            .storage-stat {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              padding: 14px 16px;
              border-radius: 12px;
              background: var(--admin-bg);
              border: 1px solid var(--admin-border);
            }

            .storage-stat-label {
              font-size: 13.5px;
              font-weight: 600;
              color: var(--admin-text-primary);
            }

            .storage-stat-sub {
              font-size: 12px;
              color: var(--admin-text-tertiary);
              margin-top: 2px;
            }

            .storage-stat-count {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 800;
              font-size: 1.6rem;
              color: var(--admin-accent);
              letter-spacing: -0.02em;
            }

            @media (max-width: 1024px) {
              .settings-main { padding: 20px; }
            }

            @media (max-width: 560px) {
              .storage-grid { grid-template-columns: 1fr; }
            }
          `}</style>

          <div className="settings-header">
            <h1 className="settings-title">Pengaturan</h1>
            <p className="settings-subtitle">
              Kelola konfigurasi platform LokalIn.
            </p>
          </div>

          <div className="settings-stack">
            {/* ---- KATEGORI ---- */}
            <SettingsPanel
              icon={<TagIcon />}
              title="Kelola Kategori UMKM"
              description="Daftar kategori ini akan muncul sebagai pilihan dropdown saat menambah atau mengedit UMKM."
            >
              <KategoriManager initialKategori={kategori} />
            </SettingsPanel>

            {/* ---- EXPORT ---- */}
            <SettingsPanel
              icon={<DownloadIcon />}
              title="Export Data"
              description="Download seluruh data UMKM dan menu dalam format Excel (.xlsx) untuk keperluan laporan atau backup."
            >
              <ExportSection
                umkmCount={umkmCount ?? 0}
                menuCount={menuCount ?? 0}
              />
            </SettingsPanel>

            {/* ---- STORAGE ---- */}
            <SettingsPanel
              icon={<HardDriveIcon />}
              title="Informasi Storage"
              description="Jumlah file gambar yang tersimpan di Supabase Storage."
            >
              <div className="storage-grid">
                {storageStats.map((stat) => (
                  <div key={stat.bucket} className="storage-stat">
                    <div>
                      <p className="storage-stat-label">{stat.label}</p>
                      <p className="storage-stat-sub">Bucket: {stat.bucket}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="storage-stat-count">{stat.count}</p>
                      <p className="storage-stat-sub">file</p>
                    </div>
                  </div>
                ))}
              </div>
            </SettingsPanel>
          </div>
        </main>
      </div>
    </>
  );
}
