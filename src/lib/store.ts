import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

interface CartStore {
  items: Product[];
  wishlist: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      
      addItem: (item: Product) => {
        set((state) => ({
          items: [...state.items, item]
        }));
      },
      
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price, 0);
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.length;
      },

      addToWishlist: (item: Product) => {
        set((state) => {
          if (!state.wishlist.find(wishlistItem => wishlistItem.id === item.id)) {
            return { wishlist: [...state.wishlist, item] };
          }
          return state;
        });
      },

      removeFromWishlist: (id: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter(item => item.id !== id)
        }));
      },

      isInWishlist: (id: string) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === id);
      },

      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    }
  )
);
