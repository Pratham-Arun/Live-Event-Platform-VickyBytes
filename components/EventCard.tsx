'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Heart, Share2, Play, Radio } from 'lucide-react';
import type { EventItem, EventCategory } from '@/data/events';

type EventCardProps = {
  event: EventItem;
};

const categoryTheme: Record<EventCategory, { glow: string; badge: string; border: string; button: string }> = {
  Tech: { glow: 'shadow-cyan-500/20', badge: 'bg-cyan-500/10 text-cyan-300', border: 'hover:border-cyan-500/50', button: 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-500/25' },
  Music: { glow: 'shadow-fuchsia-500/20', badge: 'bg-fuchsia-500/10 text-fuchsia-300', border: 'hover:border-fuchsia-500/50', button: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 shadow-fuchsia-500/25' },
  Movies: { glow: 'shadow-violet-500/20', badge: 'bg-violet-500/10 text-violet-300', border: 'hover:border-violet-500/50', button: 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/25' },
  Trending: { glow: 'shadow-rose-500/20', badge: 'bg-rose-500/10 text-rose-300', border: 'hover:border-rose-500/50', button: 'bg-gradient-to-r from-rose-600 to-red-600 shadow-rose-500/25' },
  'Stand Up': { glow: 'shadow-amber-500/20', badge: 'bg-amber-500/10 text-amber-300', border: 'hover:border-amber-500/50', button: 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/25' },
};

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);
  
  // 3D Tilt properties
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for rotation
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
    
    // Calculate rotation limits (-5 to +5 degrees)
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct * 5);
    y.set(yPct * -5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const theme = categoryTheme[event.category];
  
  // Viewer formatting
  const formattedViewers = useMemo(() => {
    if (!event.viewers) return '';
    return event.viewers > 999 ? (event.viewers / 1000).toFixed(1) + 'k' : event.viewers.toString();
  }, [event.viewers]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-md shadow-2xl transition-colors duration-500 ${theme.border} ${theme.glow}`}
    >
      {/* Animated Gradient Border (visible on hover) */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay pointer-events-none z-10" />

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
        <Image 
          src={event.thumbnail} 
          alt={event.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent transition-opacity duration-300" />
        
        {/* Top Badges */}
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
        
        {/* Bottom Context inside Image */}
        {event.isLive && event.viewers && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/80 z-20 font-medium">
                <Radio className="w-3.5 h-3.5 text-white/60" />
                <span>{formattedViewers} watching now</span>
            </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative space-y-4 p-5 z-20 bg-gradient-to-b from-transparent to-[#0f172a]" style={{ transform: "translateZ(40px)" }}>
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400">
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
              onClick={() => setLiked((current) => !current)}
              className={`p-2.5 rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 ${liked ? 'text-pink-500 border-pink-500/50' : 'text-slate-300'}`}
              aria-label="Like event"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-white/10 hover:text-white" aria-label="Share event">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <Link
            href={`/event/${event.id}`}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 ${theme.button}`}
          >
            <Play className="w-4 h-4 fill-current" />
            {event.isLive ? 'Join Stream' : 'Details'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
