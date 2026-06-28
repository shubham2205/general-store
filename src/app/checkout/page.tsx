'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Building, ShieldCheck, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart, ShippingAddress } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { MithilaBorder, MithilaDivider } from '../../components/MithilaPattern';

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartSubtotal, deliveryFee, cartTotal, placeOrder } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    landmark: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push('/');
    }
  }, [cartItems, router, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingAddress]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!formData.name.trim()) tempErrors.name = 'कृपया अपना नाम दर्ज करें';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = 'कृपया अपना मोबाइल नंबर दर्ज करें';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      tempErrors.phone = 'कृपया एक सही 10-अंकों का मोबाइल नंबर दर्ज करें';
    }

    if (!formData.address.trim()) tempErrors.address = 'कृपया अपना पूरा पता दर्ज करें';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const createdOrder = placeOrder(formData);
      router.push(`/order-success?orderId=${createdOrder.id}`);
    }, 1500);
  };

  if (cartItems.length === 0 && !isSubmitting) {
    return null; // or loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <MithilaBorder position="bottom" className="sticky top-0 z-50 bg-[#FFFDF9]" />
      
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F250C] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>सामान की लिस्ट पर वापस जाएं</span>
        </Link>

        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#8F250C]">
            ऑर्डर पूरा करें (Checkout)
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            कृपया अपनी डिलीवरी जानकारी दर्ज करें। केवल नकद भुगतान (COD)।
          </p>
          <MithilaDivider className="py-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#8F250C]/10 p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#8F250C] pb-2 border-b border-[#8F250C]/10 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#1E4620]" />
              <span>डिलीवरी का पता (Delivery Address)</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">
                  पूरा नाम (Full Name) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="जैसे: राम कुमार झा"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-[#8F250C]/15 focus:border-[#8F250C] focus:ring-[#8F250C]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[11px] font-bold mt-0.5">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">
                  मोबाइल नंबर (Mobile Number) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="जैसे: 9340947431"
                    maxLength={10}
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.phone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-[#8F250C]/15 focus:border-[#8F250C] focus:ring-[#8F250C]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[11px] font-bold mt-0.5">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">
                  पूरा पता (Full Address - मकान नंबर, गली) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <Building className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="जैसे: CETI, सिंगरौली, मध्य प्रदेश - 486892"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.address 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-[#8F250C]/15 focus:border-[#8F250C] focus:ring-[#8F250C]'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-[11px] font-bold mt-0.5">{errors.address}</p>}
              </div>

              {/* Landmark */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">
                  प्रसिद्ध स्थल (Landmark - वैकल्पिक)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="जैसे: हनुमान मंदिर के पास"
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-[#8F250C]/15 rounded-xl text-sm focus:outline-none focus:border-[#8F250C] focus:ring-1 focus:ring-[#8F250C] transition-all"
                  />
                </div>
              </div>

              {/* Payment Method Option */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  भुगतान का माध्यम (Payment Method)
                </label>
                <div className="border-2 border-[#E5A93B] bg-[#E5A93B]/5 p-4 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#8F250C] text-white rounded-lg">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-xs sm:text-sm text-[#8F250C]">
                        नकद भुगतान (Cash on Delivery)
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium">
                        सामान घर पहुंचने पर नकद भुगतान करें।
                      </p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full bg-[#1E4620] flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3 bg-[#8F250C] hover:bg-[#A52E12] text-[#FFFDF9] rounded-full font-serif font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>ऑर्डर प्रोसेस हो रहा है...</span>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    <span>ऑर्डर पक्का करें (Confirm Order)</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order Summary Drawer style */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl border border-[#8F250C]/10 p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#8F250C] pb-2 border-b border-[#8F250C]/10 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#1E4620]" />
              <span>आपके सामान (Order Summary)</span>
            </h2>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center gap-2 text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{item.product.name}</span>
                    <span className="text-[10px] text-[#8F250C] font-serif font-semibold">
                      {item.product.hindiName} ({item.product.unit})
                    </span>
                    <span className="text-[10px] text-gray-400">₹{item.product.price} x {item.quantity}</span>
                  </div>
                  <span className="font-black text-[#1E4620]">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#8F250C]/10 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>सामान का मूल्य (Subtotal)</span>
                <span className="font-semibold text-gray-800">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>डिलीवरी शुल्क (Delivery Fee)</span>
                <span className="font-semibold text-gray-800">
                  {deliveryFee === 0 ? <span className="text-[#1E4620] font-bold">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="h-[1px] bg-[#8F250C]/5 my-2" />
              <div className="flex justify-between text-sm font-serif font-bold text-gray-800">
                <span>कुल मूल्य (Total Amount)</span>
                <span className="text-base text-[#8F250C]">₹{cartTotal}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
