"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md relative">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-black focus:border-black transition-all"
          placeholder="Search Unsplash photos..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-black rounded-r-lg hover:bg-gray-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}