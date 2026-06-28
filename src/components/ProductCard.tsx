'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check, Percent } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate discount percentage if original price is provided
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, boxShadow: '0 10px 25px -5px rgba(143, 37, 12, 0.1), 0 8px 10px -6px rgba(143, 37, 12, 0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#8F250C]/10 flex flex-col h-full relative"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 sm:top-3 sm:left-3 z-10 bg-[#E5A93B] text-[#8F250C] px-2.5 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs sm:text-xs font-black flex items-center gap-1 sm:gap-1 shadow-sm">
          <Percent className="h-3 w-3 sm:h-3 sm:w-3" />
          <span>{discount}% OFF</span>
        </div>
      )}

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <span className="bg-[#8F250C] text-[#FFFDF9] font-serif font-bold px-4 py-2 rounded-lg text-sm tracking-wider uppercase">
            स्टॉक ख़त्म (Out of Stock)
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-44 sm:h-48 w-full bg-stone-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#FFFDF9] to-transparent pointer-events-none" />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-4 flex flex-col flex-grow">
        {/* Unit badge */}
        <span className="inline-block self-start text-[10px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#1E4620]/10 text-[#1E4620] px-2 py-0.5 sm:px-2 sm:py-0.5 rounded-md mb-2 sm:mb-2">
          {product.unit}
        </span>

        {/* English Name */}
        <h3 className="font-sans font-bold text-gray-800 text-base sm:text-base leading-tight">
          {product.name}
        </h3>

        {/* Hindi Name */}
        <h4 className="font-serif text-sm sm:text-sm font-semibold text-[#8F250C] mt-0.5">
          {product.hindiName}
        </h4>

        {/* Description */}
        <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 sm:mt-4 flex items-center justify-between pt-3 sm:pt-3 border-t border-[#8F250C]/5">
          <div className="flex flex-col">
            <span className="text-xs sm:text-xs text-gray-400 line-through leading-none mb-0.5">
              {product.originalPrice ? `₹${product.originalPrice}` : ''}
            </span>
            <span className="text-lg sm:text-lg font-black text-[#1E4620] leading-none">
              ₹{product.price}
            </span>
          </div>

          {quantity > 0 ? (
            <div className="flex items-center bg-[#8F250C] text-white rounded-full overflow-hidden shadow-sm">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(product)}
                className="px-3 sm:px-3 py-1.5 sm:py-1.5 font-bold hover:bg-[#A52E12] transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{quantity} Added</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => product.inStock && addToCart(product)}
              disabled={!product.inStock}
              className="bg-[#1E4620] hover:bg-[#2A5C2D] text-[#FFFDF9] px-4 sm:px-4 py-1.5 sm:py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">खरीदें (Add)</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
