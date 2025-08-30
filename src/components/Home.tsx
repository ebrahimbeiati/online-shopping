'use client';

import Product from './Product';
import { Product as ProductType } from '@/lib/store';
import { SparklesIcon, StarIcon, FireIcon, BoltIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';

const products: ProductType[] = [
  {
    id: "12321341",
    title: "Bennett Mystic 15.6 inch Laptop Shoulder Messenger Sling Office Bag, Water Repellent Fabric for Men and Women (Blue)",
    price: 11.96,
    rating: 5,
    image: "https://images-na.ssl-images-amazon.com/images/I/71mEsHyzSCL._SL1000_.jpg",
    category: "fashion"
  },
  {
    id: "49538094",
    title: "IFB 30 L Convection Microwave Oven (30BRC2, Black, With Starter Kit)",
    price: 239.0,
    rating: 4,
    image: "https://images-na.ssl-images-amazon.com/images/I/81D8pNFmWzL._SL1500_.jpg",
    category: "home"
  },
  {
    id: "4903850",
    title: "Smart TV with 4K Ultra HD Display",
    price: 199.99,
    rating: 3,
    image: "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/326ac5f6-6cea-11ea-b76b-e2581aee4843.jpg",
    category: "electronics"
  },
  {
    id: "23445930",
    title: "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
    price: 98.99,
    rating: 5,
    image: "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
    category: "electronics"
  },
  {
    id: "3254354345",
    title: "Washing machine - Silver (4th Generation)",
    price: 598.99,
    rating: 4,
    image: "https://storage.beko.co.uk/blomberg2018products/large/2Blomberg_WashingMachine_LWF28442G_Manhattan_FrontClosed.jpg",
    category: "home"
  },
  {
    id: "90829332",
    title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
    price: 1094.98,
    rating: 4,
    image: "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
    category: "electronics"
  },
  {
    id: "iphone15pro",
    title: "iPhone 15 Pro - 128GB - Natural Titanium - Latest A17 Pro Chip",
    price: 999.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "macbook-air",
    title: "MacBook Air M2 - 13.6-inch - 8GB RAM - 256GB SSD - Midnight",
    price: 1199.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "airpods-pro",
    title: "AirPods Pro (2nd generation) - Active Noise Cancelling - Spatial Audio",
    price: 249.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "ipad-air",
    title: "iPad Air (5th generation) - 10.9-inch - 64GB - Wi-Fi - Space Gray",
    price: 599.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "nike-shoes",
    title: "Nike Air Max 270 - Men's Running Shoes - Breathable Mesh Upper",
    price: 129.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    category: "fashion"
  },
  {
    id: "levis-jeans",
    title: "Levi's 501 Original Fit Jeans - Men's Classic Straight Leg Denim",
    price: 89.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
    category: "fashion"
  },
  {
    id: "adidas-jacket",
    title: "Adidas Tiro Track Jacket - Men's Training Jacket - Lightweight",
    price: 69.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center",
    category: "fashion"
  },
  {
    id: "rayban-sunglasses",
    title: "Ray-Ban Aviator Classic - Gold Frame - Green Lens - UV Protection",
    price: 189.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
    category: "fashion"
  },
  {
    id: "ikea-sofa",
    title: "IKEA KIVIK Sofa - 3-Seat - Dark Gray Fabric - Comfortable Living Room Furniture",
    price: 799.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center",
    category: "home"
  },
  {
    id: "kitchen-aid",
    title: "KitchenAid Artisan Stand Mixer - 5-Quart - Empire Red - Professional Grade",
    price: 449.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    category: "home"
  },
  {
    id: "philips-hue",
    title: "Philips Hue White and Color Ambiance Starter Kit - Smart LED Bulbs",
    price: 199.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&h=400&fit=crop&crop=center",
    category: "home"
  },
  {
    id: "peloton-bike",
    title: "Peloton Bike+ - Premium Indoor Cycling Bike - HD Touchscreen - Live Classes",
    price: 2495.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    category: "sports"
  },
  {
    id: "fitbit-sense",
    title: "Fitbit Sense 2 - Advanced Health Smartwatch - Heart Rate Monitor - GPS",
    price: 299.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    category: "sports"
  },
  {
    id: "yoga-mat",
    title: "Premium Yoga Mat - Non-Slip - Eco-Friendly - 6mm Thick - Multiple Colors",
    price: 49.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
    category: "sports"
  },
  {
    id: "kindle-paperwhite",
    title: "Kindle Paperwhite - 8GB - Waterproof - 6.8-inch Display - Adjustable Light",
    price: 139.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "sony-wh1000xm4",
    title: "Sony WH-1000XM4 - Wireless Noise Cancelling Headphones - 30-Hour Battery",
    price: 349.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  },
  {
    id: "nintendo-switch",
    title: "Nintendo Switch OLED Model - 7-inch OLED Screen - Enhanced Audio - White",
    price: 349.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop&crop=center",
    category: "electronics"
  }
];

const categories = [
  { name: 'Electronics', icon: BoltIcon, color: 'from-blue-500 to-cyan-500', value: 'electronics' },
  { name: 'Fashion', icon: SparklesIcon, color: 'from-pink-500 to-rose-500', value: 'fashion' },
  { name: 'Home & Garden', icon: StarIcon, color: 'from-green-500 to-emerald-500', value: 'home' },
  { name: 'Sports', icon: FireIcon, color: 'from-orange-500 to-red-500', value: 'sports' },
];

interface HomeProps {
  searchQuery?: string;
}

export default function Home({ searchQuery = '' }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category first
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryValue: string) => {
    if (selectedCategory === categoryValue) {
      // If same category is clicked, deselect it
      setSelectedCategory(null);
    } else {
      // Select new category
      setSelectedCategory(categoryValue);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <SparklesIcon className="h-5 w-5 text-purple-400" />
              <span className="text-purple-800 font-medium">Discover Amazing Deals</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Shop the
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Experience premium shopping with our curated collection of high-quality products. 
              From cutting-edge electronics to timeless fashion, find everything you need.
            </p>

          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Explore our wide range of product categories</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.value)}
              className={`group cursor-pointer transition-all duration-300 ${
                selectedCategory === category.value 
                  ? 'transform scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                selectedCategory === category.value 
                  ? 'ring-4 ring-white/50 shadow-2xl' 
                  : ''
              }`}>
                <category.icon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                {selectedCategory === category.value && (
                  <div className="mt-2">
                    <span className="text-white/80 text-sm">✓ Selected</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory || searchQuery) && (
          <div className="text-center mt-8">
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 font-medium py-3 px-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <span>Clear All Filters</span>
              <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {selectedCategory ? '1' : '0'} category, {searchQuery ? '1' : '0'} search
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Search Results Header */}
      {(searchQuery || selectedCategory) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                {searchQuery && selectedCategory 
                  ? `Search Results for "${searchQuery}" in ${categories.find(c => c.value === selectedCategory)?.name}`
                  : searchQuery 
                    ? `Search Results for "${searchQuery}"`
                    : `Products in ${categories.find(c => c.value === selectedCategory)?.name}`
                }
              </h3>
            </div>
            <p className="text-gray-600">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery || selectedCategory ? 'Filtered Results' : 'Featured Products'}
          </h2>
          <p className="text-gray-600">
            {searchQuery && selectedCategory 
              ? `Products matching "${searchQuery}" in ${categories.find(c => c.value === selectedCategory)?.name}`
              : searchQuery 
                ? `Products matching "${searchQuery}"`
                : selectedCategory 
                  ? `All products in ${categories.find(c => c.value === selectedCategory)?.name}`
                  : 'Handpicked products just for you'
            }
          </p>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search terms or selecting a different category.'
                  : 'Try browsing our categories instead.'
                }
              </p>
              <button 
                onClick={clearFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {searchQuery || selectedCategory ? 'Clear Filters' : 'Browse All Products'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-purple-100 mb-8 text-lg">Get the latest deals and product updates delivered to your inbox</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            if (email) {
              // In a real app, you'd send this to your backend/email service
              toast.success('Thank you for subscribing! You\'ll receive updates soon.');
              e.currentTarget.email.value = '';
            }
          }} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="flex-1 px-6 py-3 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-purple-200 text-sm mt-4">
            🔒 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-110 transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
