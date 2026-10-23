import React, { useState, useMemo } from 'react';
import { products, categories, Product } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type View = 'shop' | 'checkout' | 'confirmation';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('shop');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    setCurrentView('checkout');
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setCurrentView('confirmation');
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onLogoClick={handleBackToShop}
      />

      {currentView === 'shop' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-warm-900 mb-4">
              Crafted with Care
            </h1>
            <p className="text-warm-600 text-lg max-w-2xl mx-auto">
              Discover our curated selection of specialty coffees, sourced from
              the world's finest growing regions and roasted to perfection.
            </p>
          </section>

          {/* Category Filters */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-warm-800 text-cream shadow-md'
                      : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-warm-500 text-lg">
                  No coffees found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {currentView === 'checkout' && (
        <Checkout
          cart={cart}
          cartTotal={cartTotal}
          onBack={() => setCurrentView('shop')}
          onComplete={handleOrderComplete}
        />
      )}

      {currentView === 'confirmation' && (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-900 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-warm-600 text-lg mb-8">
            Thank you for your order. Your specialty coffee is being prepared
            with love and will be on its way soon.
          </p>
          <button onClick={handleBackToShop} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      )}

      {/* Footer */}
      {currentView === 'shop' && (
        <footer className="mt-20 border-t border-warm-200 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">☕</span>
                  <span className="font-serif text-lg text-warm-900">
                    Ember & Oak
                  </span>
                </div>
                <p className="text-sm text-warm-600 leading-relaxed">
                  Specialty coffee, thoughtfully sourced and roasted with care.
                  Every cup tells a story.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-warm-900 mb-3">Shop</h3>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Single Origin</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Blends</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Espresso</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Decaf</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-warm-900 mb-3">About</h3>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Our Story</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Sourcing</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Roasting</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Sustainability</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-warm-900 mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-warm-600">
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">FAQ</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Shipping</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Returns</span></li>
                  <li><span className="hover:text-warm-900 cursor-pointer transition-colors">Contact</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-warm-200 mt-8 pt-8 text-center text-sm text-warm-500">
              <p>© 2026 Ember & Oak Coffee Roasters. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(qty: number) => {
            addToCart(selectedProduct, qty);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
