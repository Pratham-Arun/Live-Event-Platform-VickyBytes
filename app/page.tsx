'use client';

import { useMemo, useState } from 'react';
import EventCard from '@/components/EventCard';
import { categoryOrder, categoryTheme } from '@/data/categoryTheme';
import { events, type EventCategory } from '@/data/events';

const categories: Array<EventCategory | 'All'> = ['All', ...categoryOrder];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'All'>('All');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-10 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />
        <h1 className="text-2xl font-bold md:text-3xl">Live Event Streaming Platform</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
          BookMyShow × District inspired vibe: bold cards, rich gradients, cinematic dark surfaces, and
          energetic category identities.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryOrder.map((category) => (
            <span
              key={category}
              className={`rounded-full border px-3 py-1 text-xs ${categoryTheme[category].badge}`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search event title..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm outline-none ring-cyan-500 transition focus:ring-2 md:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                activeCategory === category
                  ? 'border-rose-400 bg-rose-400/10 text-rose-200 shadow-lg shadow-rose-500/20'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {filteredEvents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-300">
          No events match your current search and filter.
        </p>
      ) : null}
    </section>
  );
}
