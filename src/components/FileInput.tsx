"use client";

type Props = {
  name: string;
  required?: boolean;
};

export default function FileInput({ name, required = false }: Props) {
  return (
    <>
      <input
        type="file"
        name={name}
        required={required}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="w-full border p-3 rounded"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ];

          if (!allowedTypes.includes(file.type)) {
            alert("Format harus JPG, PNG, atau WEBP");
            e.target.value = "";
            return;
          }

          if (file.size > 2 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 2 MB");
            e.target.value = "";
            return;
          }
        }}
      />

      <p className="text-sm text-gray-500">Maksimal 2 MB (JPG, PNG, WEBP)</p>
    </>
  );
}
