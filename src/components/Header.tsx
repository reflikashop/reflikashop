import React from 'react';
import { View } from '../App';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onCartClick: () => void;
  currentView: View;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  onCartClick,
  currentView,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">☕</span>
            <span className="font-serif text-xl sm:text-2xl text-warm-900 group-hover:text-ember transition-colors">
              Ember & Oak
            </span>
          </button>

          {/* Search Bar - Hidden on checkout */}
          {currentView === 'shop' && (
            <div className="hidden sm:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-warm-100 border border-warm-200 
                           text-warm-800 placeholder-warm-400 
                           focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent
                           transition-all duration-300"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2.5 rounded-full hover:bg-warm-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-warm-800"
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
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-ember text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search */}
        {currentView === 'shop' && (
          <div className="sm:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-warm-100 border border-warm-200 
                         text-warm-800 placeholder-warm-400 
                         focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent
                         transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
