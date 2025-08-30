'use client';

import Link from 'next/link';
import { ShoppingBagIcon, BuildingStorefrontIcon, MagnifyingGlassIcon, UserIcon, HeartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const { getItemCount, getWishlistCount } = useCartStore();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    // Real-time search as user types
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <BuildingStorefrontIcon className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-all duration-300 transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:bg-purple-300/30 transition-all duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                ShopHub
              </span>
              <p className="text-xs text-purple-300 -mt-1">Premium Shopping</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-purple-400/50 transition-all duration-300">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={handleInputChange}
                  placeholder="Search for amazing products..."
                  className="w-full pl-6 pr-16 py-3 bg-transparent text-white placeholder-purple-200/70 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-300 hover:text-white hover:bg-purple-500/30 rounded-xl transition-all duration-200"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/wishlist" className="relative group">
              <div className="p-2 rounded-xl group-hover:bg-white/10 transition-all duration-200">
                <HeartIcon className="h-6 w-6 text-purple-300 group-hover:text-pink-400 transition-colors duration-200" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {getWishlistCount()}
                  </span>
                )}
              </div>
            </Link>
            
            {/* Show different content based on authentication status */}
            {!isLoading && (
              <>
                {currentUser ? (
                  // Logged in user - show user menu and sign out
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-purple-200">
                      <div className="p-2 rounded-xl bg-white/10">
                        <UserIcon className="h-5 w-5 text-white" />
                      </div>
                      <span className="hidden sm:block font-medium text-white">
                        {currentUser.displayName || currentUser.email?.split('@')[0]}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors duration-200 group"
                    >
                      <div className="p-2 rounded-xl group-hover:bg-white/10 transition-all duration-200">
                        <span className="text-sm font-medium">Sign Out</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  // Not logged in - show sign in and create account
                  <>
                    <Link href="/login" className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors duration-200 group">
                      <div className="p-2 rounded-xl group-hover:bg-white/10 transition-all duration-200">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <span className="hidden sm:block font-medium">Sign In</span>
                    </Link>
                    
                    <Link href="/register" className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <PlusIcon className="h-4 w-4" />
                      <span className="hidden sm:block font-medium">Create Account</span>
                      <span className="sm:hidden font-medium">Register</span>
                    </Link>
                  </>
                )}
              </>
            )}
            
            <Link href="/checkout" className="relative group">
              <div className="p-3 rounded-xl group-hover:bg-white/10 transition-all duration-200">
                <ShoppingBagIcon className="h-6 w-6 text-purple-300 group-hover:text-white transition-colors duration-200" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {getItemCount()}
                  </span>
                )}
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
