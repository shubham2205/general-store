'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, Smile, Store, Home, ArrowRight, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart, Order } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { MithilaBorder, MithilaDivider } from '../../components/MithilaPattern';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { placedOrders } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      const foundOrder = placedOrders.find((o) => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        // Fire confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8F250C', '#E5A93B', '#1E4620', '#A020F0']
        });
      } else {
        // If not found in memory, try loading from localStorage directly in case context hadn't sync'd yet
        const stored = localStorage.getItem('mithila_orders');
        if (stored) {
          try {
            const list: Order[] = JSON.parse(stored);
            const found = list.find((o) => o.id === orderId);
            if (found) {
              setOrder(found);
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#8F250C', '#E5A93B', '#1E4620', '#A020F0']
              });
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [orderId, placedOrders]);

  if (!orderId) {
    return (
      <div className="text-center py-20">
        <p className="text-[#8F250C] font-bold">कोई आर्डर आई.डी. नहीं मिली!</p>
        <Link href="/" className="mt-4 inline-block px-6 py-2 bg-[#8F250C] text-white rounded-full">होम पेज पर जाएं</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-gray-500 animate-pulse">ऑर्डर की जानकारी लोड हो रही है...</p>
      </div>
    );
  }

  // Determine stage active based on order status
  const getStageIndex = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Accepted': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);

  const stages = [
    { label: 'ऑर्डर दर्ज हुआ', sub: 'Order Placed', icon: CheckCircle2, color: 'text-blue-600 bg-blue-50' },
    { label: 'सामान पैक हो रहा है', sub: 'Packaging', icon: Package, color: 'text-amber-600 bg-amber-50' },
    { label: 'रास्ते में है', sub: 'Out for Delivery', icon: Truck, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'पहुंच गया', sub: 'Delivered', icon: Smile, color: 'text-emerald-600 bg-emerald-50' }
  ];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
      {/* Success Hero Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-2 border-[#E5A93B]/30 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#1E4620]/5 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#8F250C]/5 rounded-full blur-xl" />

        <div className="w-16 h-16 bg-[#1E4620]/10 text-[#1E4620] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#8F250C]">
            ऑर्डर पक्का हो गया है!
          </h1>
          <p className="text-[#1E4620] font-bold text-xs sm:text-sm">
            Mithila Laxmi General Store की ओर से धन्यवाद।
          </p>
        </div>

        <div className="inline-block bg-stone-100 rounded-xl px-4 py-2 border border-gray-200">
          <span className="text-xs text-gray-500 font-bold block leading-none mb-1">ऑर्डर संख्या (Order ID)</span>
          <span className="font-mono text-sm font-extrabold text-gray-800">{order.id}</span>
        </div>

        <div className="max-w-md mx-auto text-xs text-gray-500 leading-relaxed font-semibold">
          आपका ऑर्डर प्राप्त हो गया है। हमारी टीम जल्द ही सामान पैक कर आपके पते पर पहुंचाएगी। भुगतान केवल सामान मिलने पर (नकद) करना है।
        </div>
      </motion.div>

      {/* Order Status Tracker */}
      <div className="bg-white rounded-3xl border border-[#8F250C]/10 p-6 shadow-sm space-y-6">
        <h2 className="font-serif text-base sm:text-lg font-bold text-[#8F250C] flex items-center gap-2 border-b border-gray-100 pb-3">
          <Clock className="h-5 w-5 text-[#1E4620]" />
          <span>डिलीवरी ट्रैकर (Delivery Tracker)</span>
          <span className="ml-auto text-xs font-bold bg-[#E5A93B]/20 text-[#8F250C] px-2 py-0.5 rounded-full">
            अनुमानित समय: {order.deliveryEstimate}
          </span>
        </h2>

        {/* Tracker Progress Visual */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[22px] left-[12%] right-[12%] h-1 bg-stone-200 z-0">
            <div 
              className="bg-[#1E4620] h-full transition-all duration-500" 
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx <= currentStageIndex;
            const isActive = idx === currentStageIndex;

            return (
              <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center relative z-10">
                {/* Stage Circle Icon */}
                <div
                  className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-[#1E4620] border-[#1E4620] text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isActive ? 'ring-4 ring-[#1E4620]/20' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Stage Details */}
                <div>
                  <h4 className={`text-xs font-bold leading-tight ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                    {stage.label}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium">{stage.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary details */}
      <div className="bg-white rounded-3xl border border-[#8F250C]/10 p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Shipping details */}
        <div className="space-y-3">
          <h3 className="font-serif text-sm font-bold text-[#8F250C] border-b border-gray-100 pb-2">
            डिलीवरी की जानकारी
          </h3>
          <div className="space-y-1.5 text-xs font-semibold text-gray-600">
            <p><span className="text-gray-400">ग्राहक का नाम:</span> {order.address.name}</p>
            <p><span className="text-gray-400">मोबाइल नंबर:</span> {order.address.phone}</p>
            <p><span className="text-gray-400">पूरा पता:</span> {order.address.address}</p>
            {order.address.landmark && <p><span className="text-gray-400">लैंडमार्क:</span> {order.address.landmark}</p>}
          </div>
        </div>

        {/* Pricing details */}
        <div className="space-y-3">
          <h3 className="font-serif text-sm font-bold text-[#8F250C] border-b border-gray-100 pb-2">
            भुगतान की जानकारी
          </h3>
          <div className="space-y-1.5 text-xs font-semibold text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">कुल सामान:</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">डिलीवरी शुल्क:</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="h-[1px] bg-gray-100 my-1" />
            <div className="flex justify-between text-[#8F250C] font-serif font-black text-sm">
              <span>कुल राशि (नकद भुगतान):</span>
              <span>₹{order.total}</span>
            </div>
            <p className="text-[10px] text-[#1E4620] bg-[#1E4620]/5 px-2 py-1 rounded-md text-center mt-2">
              💵 केवल कैश ऑन डिलीवरी (सामान मिलने पर भुगतान)
            </p>
          </div>
        </div>

      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          href="/orders"
          className="w-full sm:w-auto px-6 py-3 border-2 border-[#8F250C] text-[#8F250C] rounded-full text-center text-xs font-bold hover:bg-[#8F250C]/5 transition-all flex items-center justify-center gap-1.5"
        >
          <span>मेरे ऑर्डर्स देखें (Track Orders)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 bg-[#1E4620] hover:bg-[#2A5C2D] text-white rounded-full text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <Home className="h-4 w-4" />
          <span>और खरीदारी करें (Continue Shopping)</span>
        </Link>
      </div>

    </div>
  );
}

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <MithilaBorder position="bottom" className="sticky top-0 z-50 bg-[#FFFDF9]" />
      
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <Suspense fallback={
          <div className="text-center py-20">
            <p className="text-gray-500 animate-pulse">ऑर्डर की जानकारी लोड हो रही है...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
