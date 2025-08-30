'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Login from '@/components/Login';

export default function LoginPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Redirect to home page with search query
    if (query.trim()) {
      window.location.href = `/?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <Login />
    </main>
  );
}
