import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Product from '../Product';

// Mock the hooks and modules
vi.mock('@/lib/store', () => ({
  useCartStore: () => ({
    addItem: vi.fn(),
    addToWishlist: vi.fn(),
    removeFromWishlist: vi.fn(),
    isInWishlist: () => false,
  }),
}));

vi.mock('@/lib/firebase', () => ({
  auth: {},
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
}));

vi.mock('@/hooks/usePerformance', () => ({
  usePerformance: () => ({
    trackInteraction: vi.fn(),
    trackRender: vi.fn(),
    getMetrics: () => ({}),
  }),
}));

const mockProduct = {
  id: 'test-123',
  title: 'Test Product',
  image: 'test-image.jpg',
  price: 99.99,
  rating: 4,
  category: 'electronics',
};

describe('Product Component', () => {
  it('renders product information correctly', () => {
    render(<Product {...mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('£99.99')).toBeInTheDocument();
    expect(screen.getByText('(4)')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('shows login required message when user is not authenticated', () => {
    render(<Product {...mockProduct} />);
    
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText(/Sign in to add items and manage wishlist/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Product {...mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /login required to add items to cart/i });
    expect(addToCartButton).toBeDisabled();
    expect(addToCartButton).toHaveAttribute('aria-label');
  });
});
