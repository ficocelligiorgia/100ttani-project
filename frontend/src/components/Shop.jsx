import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";

const mockProducts = [
  {
    id: 1,
    name: "Giacca da moto",
    image: "/images/giacca.jpg", // salva in public/images
    price: 99.99,
    description: "Giacca protettiva resistente e comoda.",
  },
  {
    id: 2,
    name: "Casco integrale",
    image: "/images/casco.jpg",
    price: 149.99,
    description: "Casco integrale omologato per uso stradale.",
  },
  {
    id: 3,
    name: "Guanti racing",
    image: "/images/guanti.jpg",
    price: 39.99,
    description: "Guanti da corsa resistenti e traspiranti.",
  },
];

function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1> Shop</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default Shop;
