'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { ShoppingBagIcon, CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import PaymentForm from './PaymentForm';

// Modern currency formatter
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function Subtotal() {
  const { items, getTotal, getItemCount } = useCartStore();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleProceedToCheckout = () => {
    setShowPaymentForm(true);
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sticky top-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <CreditCardIcon className="h-6 w-6 text-purple-500" />
          <span>Order Summary</span>
        </h2>
        
        {/* Item Count */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200/50">
          <span className="text-gray-600 font-medium">Items ({getItemCount()}):</span>
          <span className="font-semibold text-gray-900 text-lg">{formatCurrency(getTotal())}</span>
        </div>

        {/* Gift Option */}
        <div className="py-4 border-b border-gray-200/50">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
              />
            </div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
              This order contains a gift
            </span>
          </label>
        </div>

        {/* Total */}
        <div className="py-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {formatCurrency(getTotal())}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleProceedToCheckout}
          disabled={getItemCount() === 0}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg mb-6"
        >
          <ShoppingBagIcon className="h-6 w-6" />
          <span>Proceed to Checkout</span>
        </button>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
          <ShieldCheckIcon className="h-4 w-4 text-green-500" />
          <span>Secure Checkout</span>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            By proceeding, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-gray-200/50">
          <p className="text-xs text-gray-500 text-center mb-3">We accept</p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div className="w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              MC
            </div>
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              PP
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm onClose={handleClosePaymentForm} />
      )}
    </>
  );
}
