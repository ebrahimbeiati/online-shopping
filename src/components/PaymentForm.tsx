'use client';

import { useState, useEffect } from 'react';
import { 
  CreditCardIcon, 
  LockClosedIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronRightIcon,
  UserIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/store';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import toast from 'react-hot-toast';
import Link from 'next/link';

type PaymentMethod = 'card' | 'paypal' | 'apple-pay' | 'google-pay';

interface PaymentFormProps {
  onClose: () => void;
}

export default function PaymentForm({ onClose }: PaymentFormProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: ''
  });

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      
      // Pre-fill email if user is logged in
      if (user?.email) {
        setFormData(prev => ({ ...prev, email: user.email }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! 🎉 Your order has been placed.');
      clearCart();
      onClose();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit / Debit Card',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, American Express',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      icon: CreditCardIcon,
      description: 'Pay with your PayPal account',
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 'apple-pay' as PaymentMethod,
      name: 'Apple Pay',
      icon: CreditCardIcon,
      description: 'Quick and secure payment',
      color: 'from-gray-800 to-gray-900'
    },
    {
      id: 'google-pay' as PaymentMethod,
      name: 'Google Pay',
      icon: CreditCardIcon,
      description: 'Fast and convenient',
      color: 'from-green-500 to-green-600'
    }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login requirement
  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to complete your purchase. This helps us provide better service and order tracking.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <UserIcon className="h-5 w-5" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/register"
              className="w-full bg-white border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-2xl hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
            </Link>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Why Login?</p>
                <p className="text-xs text-blue-600">Order tracking, faster checkout, exclusive offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <CreditCardIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
                <p className="text-gray-600">Welcome back, {currentUser.displayName || currentUser.email}!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                      paymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${method.color} p-2 rounded-lg`}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircleIcon className="h-5 w-5 text-purple-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* User Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Logged in as {currentUser.email}</p>
                    <p className="text-xs text-green-600">Your order will be saved to your account</p>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Secure Payment</p>
                    <p className="text-xs text-blue-600">Your data is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                      <CreditCardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData(prev => ({ ...prev, expiryDate: formatted }));
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Email (pre-filled for logged-in users) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                      required
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email from your account</p>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* City and Postal Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="London"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="SW1A 1AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+44 123 456 7890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <LockClosedIcon className="h-5 w-5" />
                        <span>Pay £{getTotal().toFixed(2)}</span>
                        <ChevronRightIcon className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel & Return to Cart
                  </button>
                </form>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <p className="text-blue-800 font-medium">PayPal Integration</p>
                    <p className="text-blue-600 text-sm mt-2">Redirect to PayPal for secure payment</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-4 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                  >
                    Cancel & Return to Cart
                  </button>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="text-center py-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <p className="text-gray-800 font-medium">Apple Pay</p>
                    <p className="text-gray-600 text-sm mt-2">Use Apple Pay for quick checkout</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-4 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                  >
                    Cancel & Return to Cart
                  </button>
                </div>
              )}

              {paymentMethod === 'google-pay' && (
                <div className="text-center py-8">
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                    <p className="text-green-800 font-medium">Google Pay</p>
                    <p className="text-green-600 text-sm mt-2">Use Google Pay for quick checkout</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-4 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                  >
                    Cancel & Return to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-sm text-gray-600">Qty: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">£{item.price.toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    £{getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
