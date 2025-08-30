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
        console.log('Adding item to cart:', item);
        set((state) => {
          const newItems = [...state.items, item];
          console.log('New cart state:', newItems);
          return { items: newItems };
        });
      },
      
      removeItem: (id: string) => {
        console.log('Removing item with ID:', id);
        set((state) => {
          const currentItems = state.items;
          console.log('Current items before removal:', currentItems);
          
          const filteredItems = currentItems.filter((item) => item.id !== id);
          console.log('Items after filtering:', filteredItems);
          
          return { items: filteredItems };
        });
      },
      
      clearCart: () => {
        console.log('Clearing entire cart');
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
