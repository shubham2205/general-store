'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Store, DollarSign, Clock, CheckCircle, Package, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useCart, Order } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { MithilaBorder, MithilaDivider } from '../../components/MithilaPattern';

export default function AdminDashboard() {
  const { placedOrders, updateOrderStatus } = useCart();

  // Metrics calculations        
  const totalSales = placedOrders
    .filter((order) => order.status === 'Delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const activeOrders = placedOrders.filter(
    (order) => order.status !== 'Delivered' && order.status !== 'Cancelled'
  ).length;

  const completedOrders = placedOrders.filter((order) => order.status === 'Delivered').length;

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Accepted': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Out for Delivery': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <MithilaBorder position="bottom" className="sticky top-0 z-50 bg-[#FFFDF9]" />

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F250C] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>दुकान की होम पेज पर जाएं</span>
        </Link>

        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#8F250C]">
            दुकानदार डैशबोर्ड (Shopkeeper Panel)
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            यहाँ से आप सभी प्राप्त ऑर्डर्स को मैनेज कर सकते हैं और उनका डिलीवरी स्टेटस बदल सकते हैं।
          </p>
          <MithilaDivider className="py-2" />
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Sales Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#8F250C]/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">कुल बिक्री (Total Sales)</span>
              <span className="text-2xl font-black text-[#1E4620]">₹{totalSales}</span>
            </div>
            <div className="p-3 bg-[#1E4620]/10 text-[#1E4620] rounded-full">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>

          {/* Active Orders Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#8F250C]/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">सक्रिय ऑर्डर्स (Active Orders)</span>
              <span className="text-2xl font-black text-[#8F250C]">{activeOrders}</span>
            </div>
            <div className="p-3 bg-[#8F250C]/10 text-[#8F250C] rounded-full">
              <Clock className="h-6 w-6 animate-pulse" />
            </div>
          </div>

          {/* Completed Orders Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#8F250C]/10 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">पूरे हुए ऑर्डर्स (Completed)</span>
              <span className="text-2xl font-black text-emerald-700">{completedOrders}</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>

        </div>

        {/* Orders List Area */}
        <div className="space-y-4 pt-4">
          <h2 className="font-serif text-lg font-bold text-[#8F250C] flex items-center gap-2">
            <Package className="h-5.5 w-5.5 text-[#1E4620]" />
            <span>सभी ऑर्डर्स की सूची (All Orders List)</span>
          </h2>

          {placedOrders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#8F250C]/10 rounded-2xl shadow-sm">
              <Package className="h-16 w-16 text-gray-300 stroke-[1.25] mx-auto mb-3" />
              <p className="font-serif text-gray-500 font-bold">अभी तक कोई ऑर्डर नहीं आया है!</p>
              <p className="text-xs text-gray-400 mt-1">जब कोई ग्राहक ऑर्डर करेगा, वह यहाँ दिखाई देगा।</p>
            </div>
          ) : (
            <div className="space-y-6">
              {placedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#8F250C]/10 shadow-sm overflow-hidden flex flex-col"
                >
                  {/* Order Head */}
                  <div className="p-4 sm:p-5 bg-stone-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Order ID</span>
                      <span className="font-mono text-sm font-extrabold text-gray-800">{order.id}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">तारीख (Date)</span>
                      <span className="text-xs text-gray-500 font-bold">{new Date(order.createdAt).toLocaleString('hi-IN')}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Interactive Dropdown to update status */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-500 hidden sm:inline">स्टेटस बदलें:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">पेंडिंग (Pending)</option>
                          <option value="Accepted">स्वीकार किया (Accepted)</option>
                          <option value="Out for Delivery">डिलीवरी पर (Out for Delivery)</option>
                          <option value="Delivered">डिलीवर हुआ (Delivered)</option>
                          <option value="Cancelled">रद्द (Cancelled)</option>
                        </select>
                      </div>

                      <Link
                        href={`/order-success?orderId=${order.id}`}
                        target="_blank"
                        className="text-xs font-bold text-[#8F250C] hover:underline"
                      >
                        ट्रैक लिंक देखें
                      </Link>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Items Grid */}
                    <div className="md:col-span-6 space-y-3">
                      <h4 className="font-serif text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                        <ShoppingBag className="h-4.5 w-4.5 text-[#1E4620]" />
                        <span>ऑर्डर किया गया सामान</span>
                      </h4>
                      <div className="space-y-2 border border-gray-100 rounded-xl p-3 bg-stone-50/50">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center text-xs font-semibold text-gray-600">
                            <span>
                              {item.product.name} ({item.product.unit}) <span className="text-gray-400 font-normal">x {item.quantity}</span>
                            </span>
                            <span className="text-gray-800">₹{item.product.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="h-[1px] bg-gray-200/60 my-2" />
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span>कुल कीमत (Cash on Delivery):</span>
                          <span className="font-serif text-sm font-black text-[#8F250C]">₹{order.total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Address details */}
                    <div className="md:col-span-6 space-y-3">
                      <h4 className="font-serif text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-4.5 w-4.5 text-[#8F250C]" />
                        <span>ग्राहक एवं डिलीवरी विवरण</span>
                      </h4>

                      <div className="border border-gray-100 rounded-xl p-4 space-y-3 text-xs font-semibold text-gray-600 bg-stone-50/50">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">नाम:</span>
                          <span className="text-gray-800 font-bold">{order.address.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-400">फ़ोन:</span>
                          <a href={`tel:${order.address.phone}`} className="text-emerald-700 font-bold hover:underline">
                            {order.address.phone} (कॉल करें)
                          </a>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 shrink-0">पता:</span>
                          <span className="text-gray-800">{order.address.address}</span>
                        </div>

                        {order.address.landmark && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">लैंडमार्क:</span>
                            <span className="text-gray-700 italic">{order.address.landmark}</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
