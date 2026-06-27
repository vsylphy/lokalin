import Link from "next/link";
export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { deleteUmkm } from "@/actions/umkm";
import DeleteForm from "@/components/admin/DeleteForm";
import AdminNavbar from "@/components/layout/AdminNavbar";

function PlusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function EditIcon() {
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
      <path d="M12.5 4.5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.5" />
      <path d="m18.4 3.6 2 2L9.5 16.5 6.5 17.5l1-3Z" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg
      width="18"
      height="18"
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

export default async function AdminUmkmPage() {
  const { data: umkm } = await supabase
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminNavbar />

      <div className="admin-content-offset">
        <main className="admin-page">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

            .admin-page {
              font-family: 'Inter', system-ui, sans-serif;
              background: var(--admin-bg);
              min-height: 100vh;
              padding: 32px;
              color: var(--admin-text-primary);
            }

            .admin-page-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: 16px;
              margin-bottom: 26px;
              flex-wrap: wrap;
            }

            .admin-page-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 800;
              font-size: 1.65rem;
              letter-spacing: -0.02em;
            }

            .admin-page-subtitle {
              color: var(--admin-text-secondary);
              font-size: 13.5px;
              margin-top: 5px;
            }

            .admin-add-btn {
              display: flex;
              align-items: center;
              gap: 7px;
              padding: 10px 18px;
              border-radius: 10px;
              background: var(--admin-accent);
              border: 1px solid var(--admin-accent);
              color: #fff;
              font-size: 13.5px;
              font-weight: 600;
              text-decoration: none;
              transition: background 0.16s ease, transform 0.12s ease;
              flex-shrink: 0;
            }
            .admin-add-btn:hover {
              background: var(--admin-accent-hover);
            }
            .admin-add-btn:active {
              transform: scale(0.98);
            }

            .umkm-list {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .umkm-row {
              display: flex;
              align-items: center;
              gap: 16px;
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              border-radius: 14px;
              padding: 16px 18px;
              transition: border-color 0.18s ease, box-shadow 0.18s ease;
            }

            .umkm-row:hover {
              border-color: var(--admin-border-strong);
              box-shadow: var(--admin-shadow-sm);
            }

            .umkm-row-icon {
              width: 42px;
              height: 42px;
              border-radius: 11px;
              background: var(--admin-accent-soft);
              color: var(--admin-accent);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .umkm-row-info {
              flex: 1;
              min-width: 0;
            }

            .umkm-row-name {
              font-size: 14.5px;
              font-weight: 600;
              color: var(--admin-text-primary);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .umkm-row-category {
              display: inline-flex;
              align-items: center;
              margin-top: 4px;
              font-size: 11.5px;
              font-weight: 600;
              color: var(--admin-accent);
              background: var(--admin-accent-soft);
              padding: 3px 9px;
              border-radius: 100px;
            }

            .umkm-row-actions {
              display: flex;
              align-items: center;
              gap: 8px;
              flex-shrink: 0;
            }

            .umkm-edit-btn {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 8px 13px;
              border-radius: 9px;
              border: 1px solid var(--admin-border);
              background: var(--admin-surface);
              color: var(--admin-text-secondary);
              font-size: 13px;
              font-weight: 500;
              text-decoration: none;
              transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
            }
            .umkm-edit-btn:hover {
              background: var(--admin-accent-soft);
              border-color: var(--admin-accent-border);
              color: var(--admin-accent);
            }

            .admin-empty-state {
              text-align: center;
              padding: 64px 24px;
              background: var(--admin-surface);
              border: 1px dashed var(--admin-border-strong);
              border-radius: 16px;
              color: var(--admin-text-secondary);
            }

            .admin-empty-icon {
              width: 48px;
              height: 48px;
              margin: 0 auto 14px;
              border-radius: 14px;
              background: var(--admin-accent-soft);
              color: var(--admin-accent);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0.7;
            }

            @media (max-width: 1024px) {
              .admin-page { padding: 20px; }
            }

            @media (max-width: 640px) {
              .umkm-row {
                flex-wrap: wrap;
              }
              .umkm-row-actions {
                width: 100%;
                justify-content: flex-end;
                margin-top: 4px;
              }
            }
          `}</style>

          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Kelola UMKM</h1>
              <p className="admin-page-subtitle">
                {umkm?.length ?? 0} UMKM terdaftar di platform
              </p>
            </div>

            <Link href="/admin/umkm/create" className="admin-add-btn">
              <PlusIcon />
              Tambah UMKM
            </Link>
          </div>

          {umkm && umkm.length > 0 ? (
            <div className="umkm-list">
              {umkm.map((item) => (
                <div key={item.id} className="umkm-row">
                  <span className="umkm-row-icon">
                    <StoreIcon />
                  </span>

                  <div className="umkm-row-info">
                    <p className="umkm-row-name">{item.nama}</p>
                    {item.kategori && (
                      <span className="umkm-row-category">{item.kategori}</span>
                    )}
                  </div>

                  <div className="umkm-row-actions">
                    <Link
                      href={`/admin/umkm/edit/${item.id}`}
                      className="umkm-edit-btn"
                    >
                      <EditIcon />
                      Edit
                    </Link>

                    <DeleteForm
                      itemLabel="UMKM"
                      itemName={item.nama}
                      action={async () => {
                        "use server";
                        await deleteUmkm(item.id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <StoreIcon />
              </div>
              <p
                style={{
                  fontWeight: 600,
                  color: "var(--admin-text-primary)",
                  marginBottom: "4px",
                }}
              >
                Belum ada UMKM
              </p>
              <p style={{ fontSize: "13px" }}>
                Klik &quot;Tambah UMKM&quot; untuk menambahkan data pertama.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
