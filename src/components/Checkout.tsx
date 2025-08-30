'use client';

import { useCartStore } from '@/lib/store';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import { ShoppingBagIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Checkout() {
  const { items, getItemCount } = useCartStore();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login requirement
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20">
              <LockClosedIcon className="h-24 w-24 text-red-400 mx-auto" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            You must be logged in to access the checkout page. Please sign in to continue with your purchase.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl w-full justify-center"
            >
              <span>Sign In</span>
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gray-600 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full justify-center"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (getItemCount() === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20">
              <ShoppingBagIcon className="h-24 w-24 text-purple-400 mx-auto" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Looks like you haven't added any products to your cart yet. 
            Start shopping to discover amazing products!
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your items and proceed to checkout</p>
        </div>



        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Cart Items ({getItemCount()})</h2>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'}
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-6">
                {items.map((item, index) => (
                  <CheckoutProduct key={`${item.id}-${index}`} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <Subtotal />
          </div>
        </div>
      </div>
    </div>
  );
}
