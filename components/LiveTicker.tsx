'use client';

import { motion } from 'framer-motion';
import { Flame, Radio } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/data/events';

export default function LiveTicker() {
  // Get top 5 events that are live or trending
  const trendingEvents = events
    .filter(e => e.isLive || e.category === 'Trending')
    .slice(0, 5);

  if (trendingEvents.length === 0) return null;

  return (
    <div className="relative flex w-full items-center overflow-hidden border-y border-white/5 bg-[#0f172a]/80 backdrop-blur-md h-12 z-30">
        <div className="absolute left-0 z-10 flex h-full items-center bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent px-4 pr-12 text-sm font-bold tracking-widest text-white backdrop-blur-sm">
            <Flame className="mr-2 h-4 w-4 text-rose-500" />
            TRENDING
        </div>

        <motion.div
            className="flex w-max items-center whitespace-nowrap pl-32 hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
            {/* Double the list to create an infinite seamless loop */}
            {[...trendingEvents, ...trendingEvents].map((event, i) => (
                <div key={`${event.id}-${i}`} className="flex items-center px-8">
                    <Link href={`/event/${event.id}`} className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                        {event.isLive ? (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        ) : (
                            <Radio className="h-3 w-3 text-slate-500" />
                        )}
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{event.title}</span>
                        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:border-slate-500 group-hover:text-slate-300">
                            {event.category}
                        </span>
                    </Link>
                    <span className="mx-8 text-slate-600">•</span>
                </div>
            ))}
        </motion.div>
        
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />
    </div>
  );
}
