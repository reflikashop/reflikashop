const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ProductCatalog = require("../src/components/ProductCatalog.jsx").default;

const html = renderToStaticMarkup(React.createElement(ProductCatalog));

const checks = [
  ["Filter kategori (Rifle)", html.includes(">Rifle</button>")],
  ["Filter kategori (Pistol)", html.includes(">Pistol</button>")],
  ["Tombol Cek Persyaratan Perizinan", html.includes("Cek Persyaratan Perizinan")],
  ["Produk tampil", html.includes("AEG M4 SOPMOD")],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
