import React from "react";

/**
 * PermitRequirementsPage
 * Halaman informasi hukum yang menjadi tujuan tombol
 * "Cek Persyaratan Perizinan" pada komponen ProductCatalog.
 * Rute: /legal/permit-requirements
 */

const PERMIT_ITEMS = [
  {
    title: "Kategori Replika / Airsoft Non-Firearm",
    content:
      "Senjata airsoft di Indonesia umumnya diperlakukan sebagai replika senjata api. Pastikan produk memiliki dokumen asal-usul dari distributor resmi dan tidak termasuk kategori senjata api tajam/api asli.",
  },
  {
    title: "Izin Kepemilikan & Penggunaan di Field",
    content:
      "Penggunaan airsoft hanya diizinkan di area/field resmi yang terdaftar, dengan pengawasan klub atau penyelenggara berizin. Simpan bukti keanggotaan klub saat membawa unit.",
  },
  {
    title: "Batas Kecepatan Muzzle (FPS/Joule)",
    content:
      "Setiap field menetapkan batas FPS/Joule berbeda (umumnya 300-450 FPS untuk AEG). Unit yang melebihi batas wajib di-downgrade sebelum digunakan.",
  },
  {
    title: "Transportasi & Pembelian Online",
    content:
      "Perhatikan regulasi pengiriman: unit harus dalam kondisi terpisah/tidak terakit, dan pembelian lintas daerah dapat memerlukan dokumen tambahan dari penjual.",
  },
  {
    title: "Disclaimer",
    content:
      "Informasi ini bersifat umum dan bukan nasihat hukum. Selalu konsultasikan dengan pihak berwenang (Polres/Polsek setempat) serta peraturan internal komunitas airsoft di wilayah Anda.",
  },
];

export default function PermitRequirementsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Persyaratan Perizinan Produk Airsoft</h1>
      <p style={{ color: "#555" }}>
        Halaman informasi hukum ini menjelaskan hal-hal yang perlu Anda cek
        sebelum membeli dan menggunakan produk airsoft.
      </p>

      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PERMIT_ITEMS.map((item) => (
          <div
            key={item.title}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 16,
              background: "#fafafa",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 18 }}>{item.title}</h2>
            <p style={{ marginBottom: 0, color: "#444" }}>{item.content}</p>
          </div>
        ))}
      </section>

      <a href="/" style={{ display: "inline-block", marginTop: 24 }}>
        &larr; Kembali ke Katalog
      </a>
    </main>
  );
}
