import React from 'react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-warm-100 group">
      {/* Product Image Area */}
      <div
        className="relative h-48 bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center cursor-pointer"
        onClick={onSelect}
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-warm-700">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-warm-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-cream">
            {product.roast} Roast
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              className="font-serif text-lg text-warm-900 cursor-pointer hover:text-ember transition-colors"
              onClick={onSelect}
            >
              {product.name}
            </h3>
            <p className="text-sm text-warm-500">{product.origin}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-sm font-medium text-warm-700">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 bg-cream-dark rounded-full text-xs text-warm-600"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-warm-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-warm-500 ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="p-2.5 bg-warm-800 text-cream rounded-full hover:bg-warm-900 
                     transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
            title="Add to cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
