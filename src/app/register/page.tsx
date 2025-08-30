'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import RegisterPage from '@/components/RegisterPage';
import { useRouter } from 'next/navigation';

export default function RegisterPageRoute() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Redirect to home page with search query
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <RegisterPage />
    </main>
  );
}
