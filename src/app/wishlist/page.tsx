'use client';

import { useCartStore } from '@/lib/store';
import Header from '@/components/Header';
import { HeartIcon, TrashIcon, ShoppingBagIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addItem, getWishlistCount } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      
      // Redirect to login if not authenticated
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveFromWishlist = (id: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to manage your wishlist');
      return;
    }
    removeFromWishlist(id);
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item: any) => {
    if (!currentUser) {
      toast.error('You must be logged in to add items to cart');
      return;
    }
    addItem(item);
    toast.success('Added to cart!');
  };

  const filteredWishlist = wishlist.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading while checking authentication
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

  // Don't render wishlist if not authenticated (will redirect)
  if (!currentUser) {
    return null;
  }

  if (getWishlistCount() === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <Header onSearch={handleSearch} searchQuery={searchQuery} />
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20">
                <HeartIcon className="h-24 w-24 text-pink-400 mx-auto" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Start adding products to your wishlist to save them for later!
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full mb-6">
            <HeartIcon className="h-6 w-6" />
            <span className="font-semibold">My Wishlist</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Saved for Later</h1>
          <p className="text-gray-600 text-lg">
            {getWishlistCount()} item{getWishlistCount() !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <HeartIcon className="h-6 w-6 text-pink-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Wishlist Results for "{searchQuery}"
              </h3>
            </div>
            <p className="text-gray-600 mt-2">
              Found {filteredWishlist.length} item{filteredWishlist.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
        )}

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredWishlist.map((item) => (
            <div key={item.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200 group/btn"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500 group-hover/btn:text-red-600" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.rating})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    £{item.price.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Results */}
        {searchQuery && filteredWishlist.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No wishlist items found</h3>
              <p className="text-gray-600 mb-6">
                No items in your wishlist match "{searchQuery}". Try adjusting your search terms.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Wishlist Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
