'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Play, Radio, Star, Clock, Check } from 'lucide-react';
import type { EventItem, EventCategory } from '@/data/events';
import { useLiveViewers } from '@/hooks/useLiveViewers';

type EventCardProps = {
  event: EventItem;
};

const categoryTheme: Record<EventCategory, { glow: string; badge: string; border: string; button: string; color: string; accent: string }> = {
  Tech: { color: '#06b6d4', glow: 'shadow-cyan-500/20', badge: 'bg-cyan-500/10 text-cyan-300', border: 'hover:border-cyan-500/50', button: 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-500/25', accent: '#0891b2' },
  Music: { color: '#d946ef', glow: 'shadow-fuchsia-500/20', badge: 'bg-fuchsia-500/10 text-fuchsia-300', border: 'hover:border-fuchsia-500/50', button: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 shadow-fuchsia-500/25', accent: '#c026d3' },
  Movies: { color: '#8b5cf6', glow: 'shadow-violet-500/20', badge: 'bg-violet-500/10 text-violet-300', border: 'hover:border-violet-500/50', button: 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/25', accent: '#7c3aed' },
  Trending: { color: '#f43f5e', glow: 'shadow-rose-500/20', badge: 'bg-rose-500/10 text-rose-300', border: 'hover:border-rose-500/50', button: 'bg-gradient-to-r from-rose-600 to-red-600 shadow-rose-500/25', accent: '#e11d48' },
  'Stand Up': { color: '#f59e0b', glow: 'shadow-amber-500/20', badge: 'bg-amber-500/10 text-amber-300', border: 'hover:border-amber-500/50', button: 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/25', accent: '#d97706' },
};

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);
  const [planned, setPlanned] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('saved_events') || '[]';
    if (JSON.parse(saved).includes(event.id)) {
        setLiked(true);
    }
    const plannedSaved = localStorage.getItem('planned_events') || '[]';
    if (JSON.parse(plannedSaved).includes(event.id)) {
        setPlanned(true);
    }
  }, [event.id]);

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct * 5);
    y.set(yPct * -5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem('saved_events') || '[]';
    const parsed = JSON.parse(saved);
    if (liked) {
      const filtered = parsed.filter((id: string) => id !== event.id);
      localStorage.setItem('saved_events', JSON.stringify(filtered));
      setLiked(false);
    } else {
      parsed.push(event.id);
      localStorage.setItem('saved_events', JSON.stringify(parsed));
      setLiked(true);
      const newParticles = Array.from({ length: 12 }, (_, i) => i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1000);
    }
    window.dispatchEvent(new CustomEvent('saved_events_changed'));
  };

  const handlePlanned = (e: React.MouseEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem('planned_events') || '[]';
    const parsed = JSON.parse(saved);
    if (planned) {
      const filtered = parsed.filter((id: string) => id !== event.id);
      localStorage.setItem('planned_events', JSON.stringify(filtered));
      setPlanned(false);
    } else {
      parsed.push(event.id);
      localStorage.setItem('planned_events', JSON.stringify(parsed));
      setPlanned(true);
    }
    window.dispatchEvent(new CustomEvent('planned_events_changed'));
  };

  const theme = categoryTheme[event.category];
  const liveViewers = useLiveViewers(event.id, event.viewers || 0);

  const formattedViewers = useMemo(() => {
    if (!liveViewers) return '';
    return liveViewers > 999 ? (liveViewers / 1000).toFixed(1) + 'k' : liveViewers.toString();
  }, [liveViewers]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-md shadow-2xl transition-colors duration-500 ${theme.glow}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -inset-[150%] left-1/2 top-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 opacity-30"
              style={{
                  background: `conic-gradient(from 0deg, transparent 0 320deg, ${theme.color} 360deg)`
              }}
          />
      </div>
      
      <div className="absolute inset-[1px] bg-[#020617]/90 rounded-2xl z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay pointer-events-none z-10" />

      <div className="relative h-56 w-full overflow-hidden z-20" style={{ transform: "translateZ(30px)" }}>
        <Image 
          src={event.thumbnail} 
          alt={event.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 ${theme.badge}`}>
            {event.category}
          </span>
          
          {event.isLive && (
            <div className="flex items-center gap-1.5 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 px-2.5 py-1 rounded-full text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE
            </div>
          )}
        </div>
        
        {event.isLive && event.viewers && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/80 z-20 font-medium">
                <Radio className="w-3.5 h-3.5 text-white/60" />
                <span>{formattedViewers} watching now</span>
            </div>
        )}
      </div>

      <div className="relative space-y-4 p-5 z-20 bg-gradient-to-b from-transparent to-[#020617]" style={{ transform: "translateZ(40px)" }}>
        <div className="space-y-1">
          <p suppressHydrationWarning className="text-xs font-medium text-slate-400">
            {new Date(event.dateTime).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </p>
          <h2 className="line-clamp-2 text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
            {event.title}
          </h2>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`relative p-2.5 rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 ${liked ? 'text-pink-500 border-pink-500/50' : 'text-slate-300'}`}
              aria-label="Like event"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {particles.map((id) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                        animate={{ 
                            opacity: 0, 
                            scale: Math.random() * 0.5 + 0.5,
                            x: (Math.random() - 0.5) * 60,
                            y: (Math.random() - 0.5) * 60,
                            rotate: Math.random() * 360
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 pointer-events-none text-pink-500"
                        style={{ marginTop: '-8px', marginLeft: '-8px' }}
                    >
                        <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                ))}
              </AnimatePresence>
            </button>
          </div>

          <div className="flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href={`/event/${event.id}`}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 ${theme.button}`}
            >
              <Play className="h-4 w-4 fill-current" /> Watch
            </Link>
            <button 
              onClick={handlePlanned}
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 ${planned ? 'border-amber-500/50 bg-amber-500/20 text-amber-400' : ''}`}
            >
              {planned ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </button>
            <button 
              className="flex h-[36px] w-[36px] items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
