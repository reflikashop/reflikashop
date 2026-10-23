import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-warm-100 transition-colors"
        >
          <svg
            className="w-5 h-5 text-warm-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Product Image */}
        <div className="h-56 sm:h-64 bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center rounded-t-3xl">
          <span className="text-8xl">{product.image}</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-warm-900">
                {product.name}
              </h2>
              <p className="text-warm-500 mt-1">{product.origin}</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
              <span className="text-amber-500">★</span>
              <span className="font-medium text-warm-800">{product.rating}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-warm-100 rounded-full text-sm text-warm-700">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-warm-100 rounded-full text-sm text-warm-700">
              {product.roast} Roast
            </span>
            <span className="px-3 py-1 bg-warm-100 rounded-full text-sm text-warm-700">
              {product.weight}
            </span>
          </div>

          {/* Description */}
          <p className="text-warm-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Flavor Notes */}
          <div className="mb-8">
            <h3 className="font-medium text-warm-800 mb-3">Flavor Notes</h3>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-4 py-2 bg-cream border border-warm-200 rounded-full text-sm text-warm-700"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="border-t border-warm-100 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-3xl font-bold text-warm-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-warm-500 ml-2">/ {product.weight}</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-warm-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-warm-100 rounded-l-full transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-warm-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="px-4 font-medium text-warm-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-warm-100 rounded-r-full transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-warm-700"
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

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(quantity)}
                  className="btn-primary flex items-center gap-2"
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
