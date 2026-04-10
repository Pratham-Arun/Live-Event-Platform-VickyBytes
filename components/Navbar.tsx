'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bookmark, User } from 'lucide-react';

export default function Navbar() {
  const [savedCount, setSavedCount] = useState(0);

  const updateCount = () => {
    const saved = JSON.parse(localStorage.getItem('saved_events') || '[]');
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('saved_events_changed', updateCount);
    return () => window.removeEventListener('saved_events_changed', updateCount);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
            Live<span className="text-slate-500 font-medium font-light">Events</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white" title="My List">
            <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'text-pink-400 fill-pink-400/20' : ''}`} />
            <span className="hidden sm:inline">My List</span>
            {savedCount > 0 && (
                <span className="flex items-center justify-center bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 ml-1">
                    {savedCount}
                </span>
            )}
          </button>
          
          <button className="flex items-center gap-2 rounded-full bg-cyan-600/20 border border-cyan-500/30 px-4 py-1.5 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/30 hover:text-cyan-100">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}
