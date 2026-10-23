import React, { useState } from 'react';
import { CartItem } from '../App';

interface CheckoutProps {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  cartTotal,
  onBack,
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-warm-600 hover:text-warm-900 mb-8 transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Shop
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-warm-900 mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
            <h2 className="font-serif text-xl text-warm-900 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-ember text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-ember text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
            <h2 className="font-serif text-xl text-warm-900 mb-4">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="123 Coffee Lane"
                />
                {errors.address && (
                  <p className="text-ember text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.city ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="Portland"
                />
                {errors.city && (
                  <p className="text-ember text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.zip ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="97201"
                />
                {errors.zip && (
                  <p className="text-ember text-xs mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
            <h2 className="font-serif text-xl text-warm-900 mb-4">
              Payment Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.cardNumber ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-ember text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.expiry ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiry && (
                  <p className="text-ember text-xs mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.cvv ? 'border-ember' : 'border-warm-200'
                  } bg-cream focus:outline-none focus:ring-2 focus:ring-warm-400 transition-all`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-ember text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-warm-400 mt-3 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              This is a simulated checkout — no real payment is processed
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
              isProcessing
                ? 'bg-warm-400 text-warm-200 cursor-not-allowed'
                : 'bg-warm-800 text-cream hover:bg-warm-900 active:scale-[0.98] shadow-lg hover:shadow-xl'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Place Order — $${total.toFixed(2)}`
            )}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100 sticky top-24">
            <h2 className="font-serif text-xl text-warm-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{item.product.image}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warm-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-warm-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-warm-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-warm-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-warm-600">Subtotal</span>
                <span className="text-warm-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-600">Shipping</span>
                <span className="text-warm-800">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-600">Tax</span>
                <span className="text-warm-800">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-warm-100 pt-2 flex justify-between">
                <span className="font-semibold text-warm-900">Total</span>
                <span className="font-bold text-warm-900 text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {cartTotal < 50 && (
              <p className="text-xs text-warm-500 mt-3 text-center">
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
