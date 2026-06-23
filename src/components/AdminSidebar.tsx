import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">LokalIn</h1>

        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        <Link
          href="/admin/dashboard"
          className="px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/admin/umkm"
          className="px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          🏪 Kelola UMKM
        </Link>

        <Link
          href="/admin/menu"
          className="px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          🍜 Kelola Menu
        </Link>
      </nav>
    </aside>
  );
}
