'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, ShieldCheck, Heart, ArrowDown, MapPin, Phone, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, CATEGORIES } from '../data/products';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { MithilaBorder, MithilaSun, MithilaDivider } from '../components/MithilaPattern';

export default function Home() {
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products by search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.hindiName.includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      {/* Repeating Top Cultural Border */}
      <MithilaBorder position="bottom" className="sticky top-0 z-50 bg-[#FFFDF9]" />

      {/* Navbar */}
      <Navbar
        onCartToggle={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#8F250C]/10 bg-gradient-to-b from-[#E5A93B]/5 to-transparent">
        {/* Animated Background Sun */}
        <div className="absolute right-[-40px] top-[-20px] md:right-[5%] md:top-[10%] opacity-15 pointer-events-none">
          <MithilaSun size={250} />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8F250C]/10 border border-[#8F250C]/20 text-[#8F250C] text-xs font-bold"
            >
              <Heart className="h-3.5 w-3.5 fill-[#8F250C]" />
              <span>सिंगरौली का अपना पसंदीदा किराना स्टोर</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#8F250C] leading-tight"
            >
              मिथिला की सोंधी खुशबू <br />
              <span className="text-[#1E4620]">और घर का शुद्ध राशन</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              घर बैठे मंगवाएं सर्वोत्तम क्वालिटी का मिथिला मखाना, सुगन्धित कतरनी चावल, शुद्ध सत्तू, मसाले और रोज़ाना का किराना। भुगतान केवल सामान मिलने पर (नकद)।
            </motion.p>

            {/* Quick Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 pt-2 text-[10px] sm:text-xs font-bold text-[#1E4620]"
            >
              <div className="flex items-center gap-1 sm:gap-1.5 bg-[#1E4620]/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl">
                <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8F250C]" />
                <span>⚡️ 2 घंटे में डिलीवरी</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-[#1E4620]/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E5A93B]" />
                <span>📦 नकद भुगतान (COD)</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-[#1E4620]/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#1E4620]" />
                <span>🌾 100% शुद्ध एवं ताज़ा</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8F250C] hover:bg-[#A52E12] text-[#FFFDF9] rounded-full font-serif font-bold text-sm shadow-lg transition-all"
              >
                <span>सामान की लिस्ट देखें</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </motion.div>
          </div>

          {/* Featured Poster / Artwork Grid */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative p-6 bg-white border-4 border-[#8F250C] rounded-2xl shadow-xl max-w-sm overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5A93B]/20 rounded-full blur-xl" />
              
              <div className="relative border border-[#1E4620] p-4 text-center space-y-4">
                <h3 className="font-serif text-[#8F250C] text-lg font-black tracking-wide border-b border-[#8F250C]/10 pb-2">
                  आज का मिथिला स्पेशल
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80"
                  alt="Mithila Makhana"
                  className="rounded-xl w-full h-36 object-cover"
                />
                <div>
                  <h4 className="font-sans font-bold text-sm text-gray-800">Premium Phool Makhana</h4>
                  <p className="font-serif text-xs text-[#8F250C] font-semibold">प्रीमियम दरभंगिया मखाना</p>
                  <p className="text-[#1E4620] font-black text-base mt-1">₹180 / 250gm</p>
                </div>
                <button
                  onClick={() => {
                    const makhana = products.find(p => p.id === 'm1');
                    if (makhana) {
                      addToCart(makhana);
                    }
                  }}
                  className="w-full py-2 bg-[#1E4620] hover:bg-[#2A5C2D] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  झटपट खरीदें (Quick Buy)
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <main id="catalog" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#8F250C]">
            दुकान की सामग्रियां (Our Products)
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            सभी शुद्ध उत्पाद सीधे आपके घर तक डिलीवर किए जाते हैं
          </p>
          <MithilaDivider />
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all whitespace-nowrap border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#8F250C] text-[#FFFDF9] border-[#8F250C] shadow-md'
                  : 'bg-[#FFFDF9] text-[#1E4620] border-[#8F250C]/15 hover:bg-[#8F250C]/5'
              }`}
            >
              <span className="font-serif font-black">{cat.name}</span>
              <span className="block text-[8px] sm:text-[9px] font-normal opacity-85 leading-tight">{cat.englishName}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#8F250C]/5 rounded-3xl shadow-sm space-y-4">
            <span className="text-5xl">🌾</span>
            <h3 className="font-serif font-bold text-lg text-gray-800">
              क्षमा करें, कोई सामान नहीं मिला!
            </h3>
            <p className="text-gray-500 text-xs max-w-sm mx-auto">
              सर्च टर्म बदलें या किसी अन्य केटेगरी में खोजें।
            </p>
          </div>
        )}
      </main>

      {/* Traditional Footer */}
      <footer className="bg-[#1E4620] text-[#FFFDF9] pt-12 pb-6 border-t-4 border-[#E5A93B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#FFFDF9]/10">
          
          {/* Shop details */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold tracking-wide">
              मिथिला लक्ष्मी जनरल स्टोर
            </h3>
            <p className="text-xs text-[#FFFDF9]/85 leading-relaxed max-w-xs mx-auto md:mx-0">
              हमारा लक्ष्य है आपके घर तक शुद्ध, ताज़ा और उत्तम कोटि के खाद्य पदार्थ एवं घरेलू राशन को पहुंचाना।
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-[#E5A93B] text-[#8F250C] font-black uppercase text-[10px]">
                Only Cash on Delivery
              </span>
            </div>
          </div>

          {/* Quick Contact & Timings */}
          <div className="space-y-3 flex flex-col items-center justify-center">
            <h4 className="font-serif text-sm font-bold text-[#E5A93B]">दुकान की जानकारी</h4>
            <div className="space-y-2 text-xs text-[#FFFDF9]/85">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-[#E5A93B] shrink-0" />
                <span>सी.ई.टी.आई. (CETI), सिंगरौली, मध्य प्रदेश - 486892</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-[#E5A93B]" />
                <span>+91 9340947431</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-[#E5A93B]" />
                <span>सुबह 07:00 बजे से रात 09:00 बजे तक (रोज़)</span>
              </div>
            </div>
          </div>

          {/* Cultural Border Pattern Illustration */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <MithilaSun size={90} className="text-[#E5A93B] opacity-80" />
            <span className="font-serif text-[10px] tracking-widest text-[#E5A93B] uppercase">
              • शुभ लाभ •
            </span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFDF9]/60">
          <span>&copy; {new Date().getFullYear()} Mithila Laxmi General Store. सर्वाधिकार सुरक्षित।</span>
          <span className="mt-2 sm:mt-0 font-serif">Made with ❤️ for Mithila</span>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
