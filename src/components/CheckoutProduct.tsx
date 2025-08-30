'use client';

import { StarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore, Product as ProductType } from '@/lib/store';
import toast from 'react-hot-toast';

interface CheckoutProductProps extends ProductType {}

export default function CheckoutProduct({ id, image, title, price, rating }: CheckoutProductProps) {
  const { removeItem, items } = useCartStore();

  const handleRemove = () => {
    console.log('Removing item with ID:', id);
    console.log('Current cart items before removal:', items);
    
    removeItem(id);
    
    // Log after removal for debugging
    setTimeout(() => {
      console.log('Cart items after removal:', useCartStore.getState().items);
    }, 100);
    
    toast.success('Product removed from cart');
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-24 h-24 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500 font-medium">({rating})</span>
          </div>

          {/* Product ID for debugging */}
          <p className="text-xs text-gray-400 mb-2">ID: {id}</p>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col items-end space-y-4">
          <div className="text-right">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              £{price.toFixed(2)}
            </p>
            {price > 100 && (
              <p className="text-sm text-green-600 font-medium">Free Shipping</p>
            )}
          </div>
          
          <button
            onClick={handleRemove}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
