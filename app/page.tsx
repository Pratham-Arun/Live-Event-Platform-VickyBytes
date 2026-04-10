'use client';

import { useMemo, Suspense } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MonitorPlay, Music, Tv2, Flame, Mic2, Search, Loader2 } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import EventCard from '@/components/EventCard';
import LiveTicker from '@/components/LiveTicker';
import { events, type EventCategory } from '@/data/events';

const categories: Array<{ id: EventCategory | 'All'; icon: React.ElementType; themeClass: string }> = [
  { id: 'All', icon: Flame, themeClass: 'border-white/20 text-slate-300 hover:bg-white/10' },
  { id: 'Trending', icon: Flame, themeClass: 'border-rose-500/30 text-rose-300 hover:bg-rose-500/10' },
  { id: 'Music', icon: Music, themeClass: 'border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-500/10' },
  { id: 'Tech', icon: MonitorPlay, themeClass: 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10' },
  { id: 'Movies', icon: Tv2, themeClass: 'border-violet-500/30 text-violet-300 hover:bg-violet-500/10' },
  { id: 'Stand Up', icon: Mic2, themeClass: 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10' }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = searchParams.get('q') || '';
  const activeCategory = (searchParams.get('category') as EventCategory | 'All') || 'All';

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-12 pb-12">
      {/* Cinematic Hero */}
      <div className="space-y-0">
          <section className="relative overflow-hidden rounded-t-[2.5rem] border border-b-0 border-white/5 bg-[#0f172a]/40 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center px-6 py-20 text-center shadow-2xl md:px-12 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/80 to-[#020617]" />
            
            {/* Ambient Glowing Orbs Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-60">
                <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-600/30 blur-[100px]" />
                <motion.div animate={{ rotate: -360, x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-fuchsia-600/20 blur-[100px]" />
                <motion.div animate={{ x: [0, -40, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex animate-shimmer items-center justify-center rounded-full border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-1.5 text-sm font-medium text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 shadow-lg shadow-black/50">
                  ✨ Discover Premium Live Experiences
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                Your Front Row Seat to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">Everything</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl drop-shadow-md">
                Stream high-quality live events from tech talks and movie premieres to stand-up comedy and global music festivals.
              </motion.p>
            </div>
          </section>
          
          <div className="rounded-b-[2.5rem] overflow-hidden border border-t-0 border-white/5">
              <LiveTicker />
          </div>
      </div>

      {/* Filters and Search */}
      <section className="sticky top-[72px] z-40 -mx-4 px-4 py-4 backdrop-blur-xl bg-[#020617]/80 md:mx-0 md:px-0 md:py-0 border-b border-white/5 md:border-none">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2">
          <div className="relative group w-full md:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 transition-colors group-focus-within:text-cyan-400" />
            <input
              value={search}
              onChange={(event) => updateUrl('q', event.target.value)}
              placeholder="Search events, shows..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 shadow-inner shadow-black/50"
            />
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mb-2 md:pb-0 md:mb-0 hide-scrollbar scroll-smooth snap-x">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              let activeClass = 'bg-white/10 text-white border-white/30';
              if (cat.id === 'Tech') activeClass = 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-lg shadow-cyan-500/20';
              if (cat.id === 'Music') activeClass = 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400 shadow-lg shadow-fuchsia-500/20';
              if (cat.id === 'Movies') activeClass = 'bg-violet-500/20 text-violet-200 border-violet-400 shadow-lg shadow-violet-500/20';
              if (cat.id === 'Trending') activeClass = 'bg-rose-500/20 text-rose-200 border-rose-400 shadow-lg shadow-rose-500/20';
              if (cat.id === 'Stand Up') activeClass = 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-lg shadow-amber-500/20';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateUrl('category', cat.id)}
                  className={`snap-start flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive ? activeClass : cat.themeClass + ' bg-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  {cat.id}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <motion.div 
        key={activeCategory + search} 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredEvents.map((event) => (
            <motion.div key={event.id} variants={itemVariants} layout>
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 py-24 text-center"
        >
          <div className="rounded-full bg-white/5 p-4 mb-4">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">No experiences found</h3>
          <p className="mt-2 text-slate-400 max-w-sm">
            We couldn&apos;t find any events matching your current search and filters. Try adjusting them.
          </p>
        </motion.div>
      )}
    </div>
  );
}

function PageSkeleton() {
    return (
        <div className="space-y-12 pb-12 pt-20 animate-pulse flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin opacity-50" />
            <p className="text-slate-400 font-medium">Loading platform...</p>
        </div>
    );
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
        <HomeContent />
    </Suspense>
  )
}
