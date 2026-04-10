'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { events, type Host } from '@/data/events';
import { Users, Calendar, ArrowRight, Star } from 'lucide-react';

export default function CreatorsPage() {
  // Get all unique creators and their events
  const creators = events.reduce((acc, event) => {
    const hostId = event.host.id;
    if (!acc[hostId]) {
      acc[hostId] = {
        host: event.host,
        events: []
      };
    }
    acc[hostId].events.push(event);
    return acc;
  }, {} as Record<string, { host: Host; events: typeof events }>);

  const creatorList = Object.values(creators);

  return (
    <div className="space-y-12 pb-16 pt-4">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">The Visionaries</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Discover the creators, performers, and industry leaders who bring the stage to life.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {creatorList.map((item, index) => (
          <motion.div
            key={item.host.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col rounded-[3.5rem] border border-white/10 bg-white/5 overflow-hidden backdrop-blur-3xl hover:border-white/20 transition-all"
          >
            {/* Header / Bio Section */}
            <div className="p-10 pb-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-[2rem] overflow-hidden border-2 border-white/20 group-hover:border-cyan-500/50 transition-colors">
                    <img 
                      src={item.host.avatar} 
                      alt={item.host.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-cyan-600 border-4 border-[#020617] flex items-center justify-center text-white">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-white tracking-tight">{item.host.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                      <Calendar className="w-3.5 h-3.5" /> {item.events.length} Events
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium line-clamp-2">
                {item.host.bio || "Leading expert and community organizer dedicated to delivering premium live experiences."}
              </p>
              <Link 
                href={`/creator/${item.host.id}`}
                className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-widest hover:text-cyan-300 transition-colors"
              >
                View Full Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Event Showcase Rail */}
            <div className="px-10 pb-10 space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Latest Content</h4>
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {item.events.map((event) => (
                  <Link 
                    key={event.id}
                    href={`/event/${event.id}`}
                    className="flex-shrink-0 w-48 space-y-3 group/event cursor-pointer"
                  >
                    <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/10 group-hover/event:border-white/30 transition-colors">
                      <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover transition-transform group-hover/event:scale-105" />
                      {event.isLive && (
                         <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-red-500 text-[8px] font-black text-white uppercase tracking-tighter">Live</div>
                      )}
                    </div>
                    <div className="px-1">
                      <h5 className="text-white font-bold text-sm leading-tight line-clamp-1 group-hover/event:text-cyan-400 transition-colors">{event.title}</h5>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{event.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
