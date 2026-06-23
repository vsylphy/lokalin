import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteMenu } from "@/actions/menu";
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

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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

type MenuItem = {
  id: string;
  nama_menu: string;
  harga: number;
  gambar: string | null;
  umkm: { nama: string } | null;
};

export default async function MenuPage() {
  const { data } = await supabase.from("menu").select(`
      *,
      umkm (
        nama
      )
    `);

  const menu = data as unknown as MenuItem[] | null;

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
            .admin-add-btn:hover { background: var(--admin-accent-hover); }
            .admin-add-btn:active { transform: scale(0.98); }

            .menu-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }

            .menu-card {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              border-radius: 16px;
              overflow: hidden;
              transition: border-color 0.18s ease, box-shadow 0.18s ease;
            }

            .menu-card:hover {
              border-color: var(--admin-border-strong);
              box-shadow: var(--admin-shadow-sm);
            }

            .menu-card-img-wrap {
              width: 100%;
              height: 140px;
              background: var(--admin-accent-soft);
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .menu-card-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .menu-card-img-fallback {
              color: var(--admin-accent);
              opacity: 0.5;
            }

            .menu-card-body {
              padding: 14px 16px 16px;
            }

            .menu-card-name {
              font-size: 14px;
              font-weight: 600;
              color: var(--admin-text-primary);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .menu-card-price {
              font-size: 13px;
              font-weight: 700;
              color: var(--admin-success);
              margin-top: 4px;
            }

            .menu-card-umkm {
              display: flex;
              align-items: center;
              gap: 5px;
              font-size: 12px;
              color: var(--admin-text-tertiary);
              margin-top: 6px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .menu-card-actions {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-top: 14px;
              padding-top: 14px;
              border-top: 1px solid var(--admin-border);
            }

            .menu-edit-btn {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              padding: 8px 10px;
              border-radius: 9px;
              border: 1px solid var(--admin-border);
              background: var(--admin-surface);
              color: var(--admin-text-secondary);
              font-size: 12.5px;
              font-weight: 500;
              text-decoration: none;
              transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
            }
            .menu-edit-btn:hover {
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
              grid-column: 1 / -1;
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
              .menu-grid { grid-template-columns: repeat(2, 1fr); }
            }

            @media (max-width: 560px) {
              .menu-grid { grid-template-columns: 1fr; }
            }
          `}</style>

          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Kelola Menu</h1>
              <p className="admin-page-subtitle">
                {menu?.length ?? 0} menu dari seluruh UMKM
              </p>
            </div>

            <Link href="/admin/menu/create" className="admin-add-btn">
              <PlusIcon />
              Tambah Menu
            </Link>
          </div>

          <div className="menu-grid">
            {menu && menu.length > 0 ? (
              menu.map((item) => (
                <div key={item.id} className="menu-card">
                  <div className="menu-card-img-wrap">
                    {item.gambar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.gambar}
                        alt={item.nama_menu}
                        className="menu-card-img"
                      />
                    ) : (
                      <span className="menu-card-img-fallback">
                        <MenuIcon />
                      </span>
                    )}
                  </div>

                  <div className="menu-card-body">
                    <p className="menu-card-name">{item.nama_menu}</p>
                    <p className="menu-card-price">
                      Rp {item.harga?.toLocaleString("id-ID")}
                    </p>
                    {item.umkm?.nama && (
                      <p className="menu-card-umkm">
                        <StoreIconSmall />
                        {item.umkm.nama}
                      </p>
                    )}

                    <div className="menu-card-actions">
                      <Link
                        href={`/admin/menu/edit/${item.id}`}
                        className="menu-edit-btn"
                      >
                        <EditIcon />
                        Edit
                      </Link>

                      <DeleteForm
                        itemLabel="menu"
                        itemName={item.nama_menu}
                        action={async () => {
                          "use server";
                          await deleteMenu(item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-empty-state">
                <div className="admin-empty-icon">
                  <MenuIcon />
                </div>
                <p
                  style={{
                    fontWeight: 600,
                    color: "var(--admin-text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  Belum ada menu
                </p>
                <p style={{ fontSize: "13px" }}>
                  Klik &quot;Tambah Menu&quot; untuk menambahkan data pertama.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function StoreIconSmall() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M4 9.5 5.2 4.5h13.6L20 9.5" />
      <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}
