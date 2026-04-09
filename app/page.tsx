'use client';

import { useMemo, useState } from 'react';
import EventCard from '@/components/EventCard';
import { events, type EventCategory } from '@/data/events';

const categories: Array<EventCategory | 'All'> = ['All', 'Trending', 'Music', 'Tech'];

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
      <div className="space-y-3">
        <h1 className="text-2xl font-bold md:text-3xl">Live Event Streaming Platform</h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Discover trending streams, tech talks, and live music events. Search and filter to find your
          next live experience.
        </p>
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
                  ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200'
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
