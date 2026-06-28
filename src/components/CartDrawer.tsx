'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    freeDeliveryThreshold,
  } = useCart();

  const progressToFreeDelivery = Math.min((cartSubtotal / freeDeliveryThreshold) * 100, 100);
  const neededForFreeDelivery = freeDeliveryThreshold - cartSubtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-[#FFFDF9] border-l-2 border-[#8F250C]/20 shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#8F250C]/10 flex items-center justify-between bg-[#8F250C] text-[#FFFDF9]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5.5 w-5.5 text-[#E5A93B]" />
                <h2 className="font-serif text-lg font-bold">थैला (Your Cart)</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-[#FFFDF9]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Free Delivery Banner */}
            {cartSubtotal > 0 && (
              <div className="bg-[#E5A93B]/10 p-4 border-b border-[#E5A93B]/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#8F250C]">
                  <Truck className="h-4.5 w-4.5" />
                  <span className="text-xs font-bold">
                    {neededForFreeDelivery > 0
                      ? `₹${neededForFreeDelivery} की और खरीदारी पर मिलेगी फ्री डिलीवरी!`
                      : 'बधाई हो! आपको फ्री डिलीवरी मिलेगी!'}
                  </span>
                </div>
                {neededForFreeDelivery > 0 && (
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#E5A93B] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressToFreeDelivery}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 stroke-[1.5] mb-4" />
                  <p className="font-serif text-gray-500 font-bold">आपका थैला खाली है!</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-[250px]">
                    दुकान से सामान चुनकर थैले में जोड़ें।
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2 bg-[#1E4620] text-white text-xs font-bold rounded-full hover:bg-[#2A5C2D] transition-colors cursor-pointer"
                  >
                    सामान देखें (Shop Now)
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-[#8F250C]/5 shadow-sm"
                  >
                    {/* Item Image */}
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-gray-800 leading-snug">
                          {item.product.name}
                        </h4>
                        <span className="font-serif text-[10px] text-[#8F250C] font-semibold">
                          {item.product.hindiName} ({item.product.unit})
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full border border-gray-300 hover:border-gray-500 text-gray-600 transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-700 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full border border-gray-300 hover:border-gray-500 text-gray-600 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price and Delete */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                      <span className="text-sm font-black text-[#1E4620]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Calculation & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#8F250C]/10 bg-[#FFFDF9] shadow-[0_-4px_10px_rgba(0,0,0,0.02)] space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>सामान का मूल्य (Subtotal)</span>
                    <span className="font-semibold text-gray-800">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>डिलीवरी शुल्क (Delivery Fee)</span>
                    <span className="font-semibold text-gray-800">
                      {deliveryFee === 0 ? (
                        <span className="text-[#1E4620] font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="h-[1px] bg-[#8F250C]/5 my-2" />
                  <div className="flex justify-between text-sm font-serif font-bold text-gray-800">
                    <span>कुल मूल्य (Total Amount)</span>
                    <span className="text-base text-[#8F250C]">₹{cartTotal}</span>
                  </div>
                </div>

                <div className="bg-[#1E4620]/5 px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 text-[10px] text-[#1E4620] font-bold">
                  <span>🔒 Payment: <b>CASH ON DELIVERY (नकद भुगतान) Only</b></span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-3 bg-[#8F250C] hover:bg-[#A52E12] text-[#FFFDF9] rounded-full font-serif font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ऑर्डर करें (Order Now)</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
