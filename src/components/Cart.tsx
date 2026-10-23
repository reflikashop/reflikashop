import React from 'react';
import { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-warm-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-warm-100">
            <h2 className="font-serif text-2xl text-warm-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-warm-100 transition-colors"
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
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-5xl mb-4">🛒</span>
                <p className="text-warm-500 text-lg">Your cart is empty</p>
                <p className="text-warm-400 text-sm mt-2">
                  Add some specialty coffee to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-cream rounded-xl"
                  >
                    {/* Product Icon */}
                    <div className="w-16 h-16 bg-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.product.image}</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-warm-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-warm-500">
                        ${item.product.price.toFixed(2)} / {item.product.weight}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-warm-200 rounded-full bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 hover:bg-warm-100 rounded-l-full transition-colors"
                          >
                            <svg
                              className="w-3 h-3 text-warm-700"
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
                          <span className="px-3 text-sm font-medium text-warm-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-warm-100 rounded-r-full transition-colors"
                          >
                            <svg
                              className="w-3 h-3 text-warm-700"
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

                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-warm-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemove(item.product.id)}
                            className="p-1.5 text-warm-400 hover:text-ember transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-warm-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-warm-600">Subtotal</span>
                <span className="text-xl font-bold text-warm-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-warm-500">
                Shipping and taxes calculated at checkout
              </p>
              <button onClick={onCheckout} className="btn-secondary w-full">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
