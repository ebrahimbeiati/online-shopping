'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Home from '@/components/Home';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <Home searchQuery={searchQuery} />
    </main>
  );
}
