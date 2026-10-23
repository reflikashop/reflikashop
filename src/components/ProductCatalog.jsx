import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * ProductCatalog
 * Komponen React untuk menampilkan daftar produk Airsoft dengan filter kategori.
 * Setiap kartu produk memiliki tombol "Cek Persyaratan Perizinan" yang
 * mengarah ke halaman informasi hukum (/legal/permit-requirements).
 */

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "AEG M4 SOPMOD",
    category: "Rifle",
    price: 3200000,
    fps: 400,
    image: "/images/m4-sopmod.jpg",
    description:
      "Airsoft electric rifle bergaya SOPMOD, cocok untuk permainan CQB hingga field terbuka.",
  },
  {
    id: 2,
    name: "G36C AEG Compact",
    category: "Rifle",
    price: 2850000,
    fps: 380,
    image: "/images/g36c.jpg",
    description: "Compact AEG dengan body ringkas, cocok untuk pemain pemula.",
  },
  {
    id: 3,
    name: "MK18 CQBR DMR Build",
    category: "Marksman",
    price: 4500000,
    fps: 450,
    image: "/images/mk18-dmr.jpg",
    description: "Build marksman presisi dengan hop-up adjustable dan barrel panjang.",
  },
  {
    id: 4,
    name: "Glock 19 Gen5 Gas Blowback",
    category: "Pistol",
    price: 1450000,
    fps: 300,
    image: "/images/glock19-gbb.jpg",
    description: "Pistol gas blowback full-metal slide, ideal sebagai sidearm.",
  },
  {
    id: 5,
    name: "M870 Pump Action Shotgun",
    category: "Shotgun",
    price: 1900000,
    fps: 350,
    image: "/images/m870.jpg",
    description: "Shotgun pump-action untuk pertempuran jarak dekat.",
  },
  {
    id: 6,
    name: "Tactical Goggle Set",
    category: "Aksesoris",
    price: 350000,
    fps: null,
    image: "/images/goggle-set.jpg",
    description: "Kacamata pelindung ANSI-rated, wajib dipakai di semua field.",
  },
  {
    id: 7,
    name: "High-Capacity Magazine 500rd",
    category: "Aksesoris",
    price: 180000,
    fps: null,
    image: "/images/hicap-mag.jpg",
    description: "Majalah kapasitas tinggi untuk AEG seri M4/AR.",
  },
];

// Halaman tujuan tombol "Cek Persyaratan Perizinan"
export const LEGAL_INFO_PATH = "/legal/permit-requirements";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function ProductCard({ product, onCheckPermit }) {
  return (
    <article
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: 180, objectFit: "cover", background: "#f0f0f0" }}
        loading="lazy"
      />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>{product.name}</h3>
          <span
            style={{
              fontSize: 12,
              padding: "2px 10px",
              borderRadius: 999,
              background: "#eef2ff",
              color: "#3730a3",
            }}
          >
            {product.category}
          </span>
        </div>

        <p style={{ margin: 0, color: "#555", fontSize: 14, flex: 1 }}>
          {product.description}
        </p>

        {typeof product.fps === "number" && (
          <p style={{ margin: 0, fontSize: 13, color: "#777" }}>
            Kecepatan awal: <strong>{product.fps} FPS</strong>
          </p>
        )}

        <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>
          {formatRupiah(product.price)}
        </p>

        {/* Tombol menuju halaman informasi hukum / persyaratan perizinan */}
        <button
          type="button"
          onClick={() => onCheckPermit(product)}
          style={{
            marginTop: 8,
            padding: "10px 14px",
            border: "none",
            borderRadius: 8,
            background: "#b91c1c",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cek Persyaratan Perizinan
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    fps: PropTypes.number,
  }).isRequired,
  onCheckPermit: PropTypes.func.isRequired,
};

export default function ProductCatalog({
  products = DEFAULT_PRODUCTS,
  basePath = LEGAL_INFO_PATH,
  navigate,
}) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === "Semua"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory]
  );

  // Navigasi ke halaman informasi hukum.
  // Jika ada fungsi `navigate` (mis. dari react-router) gunakan itu,
  // jika tidak gunakan window.location sebagai fallback.
  const handleCheckPermit = (product) => {
    const url = `${basePath}?produk=${encodeURIComponent(product.name)}&kategori=${encodeURIComponent(product.category)}`;
    if (typeof navigate === "function") {
      navigate(url);
    } else if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ marginTop: 0 }}>Katalog Produk Airsoft</h1>
        <p style={{ color: "#555" }}>
          Pilih kategori untuk memfilter produk. Setiap produk dilengkapi tautan
          persyaratan perizinan sesuai regulasi yang berlaku.
        </p>
      </header>

      {/* Filter kategori */}
      <div
        role="tablist"
        aria-label="Filter kategori"
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid #ccc",
                cursor: "pointer",
                background: isActive ? "#111827" : "#fff",
                color: isActive ? "#fff" : "#111827",
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid kartu produk */}
      {filteredProducts.length === 0 ? (
        <p style={{ color: "#777" }}>Tidak ada produk pada kategori ini.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCheckPermit={handleCheckPermit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

ProductCatalog.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      fps: PropTypes.number,
    })
  ),
  basePath: PropTypes.string,
  navigate: PropTypes.func,
};
