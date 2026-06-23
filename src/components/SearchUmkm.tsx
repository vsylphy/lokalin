"use client";

import { useState } from "react";

export default function SearchUmkm({ data }: { data: any[] }) {
  const [keyword, setKeyword] = useState("");

  const filtered = data.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <>
      <input
        type="text"
        placeholder="Cari UMKM..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border p-3 rounded-xl mb-6"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            {item.gambar && (
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="font-bold text-xl">{item.nama}</h2>

              <p className="text-green-600">{item.kategori}</p>

              <p className="text-gray-600 mt-2">{item.deskripsi}</p>

              <a
                href={`/umkm/${item.id}`}
                className="inline-block mt-4 border px-4 py-2 rounded-lg"
              >
                Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
