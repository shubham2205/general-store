'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, ClipboardList, Store, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onCartToggle?: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCartToggle,
  searchQuery = '',
  setSearchQuery,
}) => {
  const { cartCount, placedOrders } = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if we are on pages that shouldn't show search
  const showSearch = setSearchQuery && (pathname === '/' || pathname === '/#catalog');

  const activeOrders = placedOrders.filter(
    (order) => order.status !== 'Delivered' && order.status !== 'Cancelled'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-[#8F250C]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-[#8F250C]/10 rounded-full text-[#8F250C]"
            >
              <Store className="h-6 w-6" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#8F250C] tracking-wide leading-none group-hover:text-[#A0250C] transition-colors">
                Mithila Laxmi
              </span>
              <span className="font-serif text-[10px] sm:text-xs text-[#1E4620] font-semibold tracking-wider uppercase">
                General Store • मिथिला लक्ष्मी
              </span>
            </div>
          </Link>

          {/* Instant Search Bar */}
          {showSearch ? (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#8F250C]/60" />
              </div>
              <input
                type="text"
                placeholder="सर्च करें (जैसे: मखाना, तेल, दाल, साबुन)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#8F250C]/20 rounded-full bg-[#FFFDF9] text-[#8F250C] placeholder-[#8F250C]/40 focus:outline-none focus:border-[#8F250C] focus:ring-1 focus:ring-[#8F250C] transition-all text-sm"
              />
            </div>
          ) : (
            <div className="hidden md:block flex-1" />
          )}

          {/* Desktop Navigation Options */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/orders"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors px-3 py-2 rounded-lg ${
                pathname === '/orders'
                  ? 'text-[#8F250C] bg-[#E5A93B]/10'
                  : 'text-[#1E4620] hover:text-[#8F250C] hover:bg-[#FFFDF9]'
              }`}
            >
              <ClipboardList className="h-4.5 w-4.5" />
              <span>मेरे ऑर्डर्स (My Orders)</span>
              {activeOrders > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-[#E5A93B] text-[#8F250C] rounded-full animate-pulse">
                  {activeOrders}
                </span>
              )}
            </Link>
          </nav>

          {/* Action Buttons (Cart & Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            {onCartToggle && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartToggle}
                className="relative p-2.5 rounded-full bg-[#8F250C] text-[#FFFDF9] hover:bg-[#A52E12] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F250C] cursor-pointer flex items-center justify-center shadow-md"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5.5 w-5.5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E5A93B] text-[10px] font-black text-[#8F250C] ring-2 ring-[#FFFDF9]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#8F250C] hover:bg-[#8F250C]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8F250C] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar (under header on small screens) */}
      {showSearch && (
        <div className="block md:hidden px-4 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#8F250C]/60" />
            </div>
            <input
              type="text"
              placeholder="सर्च करें (जैसे: मखाना, तेल, दाल, साबुन)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#8F250C]/20 rounded-full bg-[#FFFDF9] text-[#8F250C] placeholder-[#8F250C]/40 focus:outline-none focus:border-[#8F250C] focus:ring-1 focus:ring-[#8F250C] transition-all text-sm"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#8F250C]/10 bg-[#FFFDF9] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  pathname === '/orders'
                    ? 'bg-[#E5A93B]/20 text-[#8F250C]'
                    : 'text-[#1E4620] hover:bg-[#8F250C]/5 hover:text-[#8F250C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5" />
                  <span>मेरे ऑर्डर्स (My Orders)</span>
                </div>
                {activeOrders > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#E5A93B] text-[#8F250C] rounded-full">
                    {activeOrders} Active
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
