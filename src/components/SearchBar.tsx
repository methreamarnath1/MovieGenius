import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  darkMode: boolean;
}

export function SearchBar({ onSearch, isLoading, darkMode }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your movie preferences (e.g., sci-fi with time travel, directed by Christopher Nolan)"
          className={`w-full px-6 py-4 text-lg rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${
            darkMode
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white p-3 rounded-full transition-colors disabled:bg-purple-400`}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}