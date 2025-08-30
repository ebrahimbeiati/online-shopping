'use client';

import { StarIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useCartStore, Product as ProductType } from '@/lib/store';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';


interface ProductProps extends ProductType {}

export default function Product({ id, title, image, price, rating, category }: ProductProps) {
  const { addItem, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isLiked = isInWishlist(id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error('Please log in to add items to cart');
      return;
    }
    addItem({ id, title, image, price, rating, category });
    toast.success('Added to cart! 🛍️');
  };

  const handleToggleLike = () => {
    if (!currentUser) {
      toast.error('Please log in to manage your wishlist');
      return;
    }
    
    if (isLiked) {
      removeFromWishlist(id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({ id, title, image, price, rating, category });
      toast.success('Added to wishlist! ❤️');
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Like Button */}
      <button
        onClick={handleToggleLike}
        disabled={!currentUser}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white shadow-sm ${
          currentUser ? 'hover:bg-gray-50' : 'bg-gray-100'
        }`}
      >
        <HeartIcon className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Product Image */}
      <div className="bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-500">({rating})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-base font-bold text-gray-900">£{price.toFixed(2)}</p>
          {price > 100 && <p className="text-xs text-green-600">Free Shipping</p>}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!currentUser}
          className={`w-full py-2 px-3 rounded text-sm font-medium ${
            currentUser 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {currentUser ? 'Add to Cart' : 'Login Required'}
        </button>
      </div>

      {/* Floating Badge */}
      {price < 50 && (
        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          SALE
        </div>
      )}

      {/* Auth Notice */}
      {!currentUser && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-center">
          <p className="text-xs text-yellow-800">
            <a href="/login" className="underline">Sign in</a> to add items
          </p>
        </div>
      )}
    </div>
  );
}
