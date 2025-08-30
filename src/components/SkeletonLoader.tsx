'use client';

interface SkeletonLoaderProps {
  type?: 'product' | 'text' | 'button';
  className?: string;
}

export default function SkeletonLoader({ type = 'product', className = '' }: SkeletonLoaderProps) {
  if (type === 'product') {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse ${className}`}>
        <div className="bg-gray-200 h-40"></div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded mb-3 w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (type === 'button') {
    return (
      <div className={`h-12 bg-gray-200 rounded animate-pulse ${className}`}></div>
    );
  }

  return null;
}
