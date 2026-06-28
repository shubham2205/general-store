'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, MapPin, Truck, CheckCircle2, XCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart, Order } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { MithilaBorder, MithilaDivider } from '../../components/MithilaPattern';

export default function MyOrders() {
  const { placedOrders } = useCart();

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>पेंडिंग (Pending)</span>
          </span>
        );
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ClipboardList className="h-3.5 w-3.5" />
            <span>स्वीकार किया गया (Accepted)</span>
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck className="h-3.5 w-3.5" />
            <span>रास्ते में है (Out for Delivery)</span>
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>डिलीवर हुआ (Delivered)</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="h-3.5 w-3.5" />
            <span>रद्द किया गया (Cancelled)</span>
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('hi-IN', options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <MithilaBorder position="bottom" className="sticky top-0 z-50 bg-[#FFFDF9]" />
      
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F250C] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>दुकान पर वापस जाएं</span>
        </Link>

        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#8F250C]">
            मेरे ऑर्डर्स (My Orders)
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            यहाँ आपके द्वारा किए गए सभी ऑर्डर्स की लिस्ट और उनका स्टेटस है।
          </p>
          <MithilaDivider className="py-2" />
        </div>

        {placedOrders.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#8F250C]/15 rounded-3xl shadow-sm space-y-4">
            <ClipboardList className="h-16 w-16 text-gray-300 stroke-[1.25] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-gray-800">
              आपने अभी तक कोई ऑर्डर नहीं किया है!
            </h3>
            <p className="text-gray-500 text-xs max-w-sm mx-auto">
              दुकान की होम पेज पर जाएं और सुंदर ताज़ा किराना सामग्री आर्डर करें।
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-2.5 bg-[#1E4620] hover:bg-[#2A5C2D] text-white text-xs font-bold rounded-full transition-colors"
            >
              सामान देखें
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {placedOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[#8F250C]/10 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Header of Order card */}
                <div className="p-4 sm:p-5 bg-stone-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">
                      ऑर्डर नंबर
                    </span>
                    <h3 className="font-mono text-sm font-extrabold text-gray-800 leading-none">
                      {order.id}
                    </h3>
                  </div>

                  <div className="space-y-1 text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide block">
                      तारीख (Date)
                    </span>
                    <span className="text-xs text-gray-600 font-bold leading-none">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <Link
                      href={`/order-success?orderId=${order.id}`}
                      className="text-xs font-bold text-[#8F250C] hover:underline"
                    >
                      ट्रैक करें
                    </Link>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Items purchased */}
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="font-serif text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="h-4 w-4 text-[#1E4620]" />
                      <span>सामान की लिस्ट (Items)</span>
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-xs font-semibold text-gray-600">
                          <span>
                            {item.product.name} ({item.product.unit}) <span className="text-gray-400 font-normal">x {item.quantity}</span>
                          </span>
                          <span className="text-gray-800">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address details */}
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 space-y-3">
                    <h4 className="font-serif text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#8F250C]" />
                      <span>डिलीवरी का पता (Address)</span>
                    </h4>
                    <div className="text-xs font-semibold text-gray-500 space-y-1">
                      <p className="text-gray-800 font-bold">{order.address.name}</p>
                      <p>फोन: {order.address.phone}</p>
                      <p className="line-clamp-2">{order.address.address}</p>
                      {order.address.landmark && <p className="italic text-[11px]">Landmark: {order.address.landmark}</p>}
                    </div>

                    <div className="pt-2 border-t border-gray-50 flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-400">कुल भुगतान (COD):</span>
                      <span className="font-serif font-black text-[#8F250C] text-sm">₹{order.total}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
