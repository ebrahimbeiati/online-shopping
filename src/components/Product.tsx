'use client';

import { StarIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useCartStore, Product as ProductType } from '@/lib/store';
import toast from 'react-hot-toast';


interface ProductProps extends ProductType {}

export default function Product({ id, title, image, price, rating, category }: ProductProps) {
  const { addItem, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();
  const isLiked = isInWishlist(id);

  const handleAddToCart = () => {
    addItem({ id, title, image, price, rating, category });
    toast.success('Added to cart! 🛍️');
  };

  const handleToggleLike = () => {
    if (isLiked) {
      removeFromWishlist(id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({ id, title, image, price, rating, category });
      toast.success('Added to wishlist! ❤️');
    }
  };

  return (
    <div className="group relative">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Like Button */}
        <button
          onClick={handleToggleLike}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <HeartIcon className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'} transition-colors duration-200`} />
        </button>

        {/* Product Image */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Product Info */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
            {title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 font-medium">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                £{price.toFixed(2)}
              </p>
              {price > 100 && (
                <p className="text-sm text-green-600 font-medium">Free Shipping</p>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn"
          >
            <ShoppingBagIcon className="h-5 w-5 group-hover/btn:animate-bounce" />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Floating Badge */}
        {price < 50 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            SALE
          </div>
        )}
      </div>
    </div>
  );
}
