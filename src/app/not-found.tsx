import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black">404</h1>

      <p className="text-gray-500 mt-4">Halaman tidak ditemukan</p>

      <Link href="/" className="mt-6 px-5 py-3 bg-black text-white rounded-xl">
        Kembali
      </Link>
    </div>
  );
}
