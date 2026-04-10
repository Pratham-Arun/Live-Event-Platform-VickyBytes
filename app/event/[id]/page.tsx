'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Radio, Eye, Heart, Share2, MessageSquare, Clock, Check } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
import VideoPlayer from '@/components/VideoPlayer';
import EventCard from '@/components/EventCard';
import LiveViewerCount from '@/components/LiveViewerCount';
import ShareModal from '@/components/ShareModal';
import CommentSection from '@/components/CommentSection';
import { events, type EventCategory } from '@/data/events';

const categoryClasses: Record<EventCategory, { text: string; glow: string; border: string; accent: string }> = {
  Tech: { text: 'text-cyan-400', glow: 'shadow-cyan-500/20', border: 'border-cyan-500/30', accent: 'bg-cyan-500' },
  Music: { text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/20', border: 'border-fuchsia-500/30', accent: 'bg-fuchsia-500' },
  Movies: { text: 'text-violet-400', glow: 'shadow-violet-500/20', border: 'border-violet-500/30', accent: 'bg-violet-500' },
  Trending: { text: 'text-rose-400', glow: 'shadow-rose-500/20', border: 'border-rose-500/30', accent: 'bg-rose-500' },
  'Stand Up': { text: 'text-amber-400', glow: 'shadow-amber-500/20', border: 'border-amber-500/30', accent: 'bg-amber-500' }
};

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = events.find((item) => item.id === eventId);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isPlanned, setIsPlanned] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (!event) return;
    const saved = localStorage.getItem('saved_events') || '[]';
    if (JSON.parse(saved).includes(event.id)) {
        setIsLiked(true);
    }
    const plannedSaved = localStorage.getItem('planned_events') || '[]';
    if (JSON.parse(plannedSaved).includes(event.id)) {
        setIsPlanned(true);
    }

    const savedComments = localStorage.getItem(`comments_${event.id}`);
    if (savedComments) {
        setCommentCount(JSON.parse(savedComments).length);
    } else {
        setCommentCount(2); // Initial mock count
    }

    const handleCommentChange = (e: any) => {
        if (e.detail.eventId === event.id) {
            setCommentCount(e.detail.count);
        }
    };
    window.addEventListener('comments_changed', handleCommentChange as any);

    // Track as 'Seen' after 5 seconds
    const seenTimer = setTimeout(() => {
        const seen = JSON.parse(localStorage.getItem('seen_events') || '[]');
        if (!seen.includes(event.id)) {
            localStorage.setItem('seen_events', JSON.stringify([...seen, event.id]));
        }
    }, 5000);

    return () => {
        window.removeEventListener('comments_changed', handleCommentChange as any);
        clearTimeout(seenTimer);
    };
  }, [event]);

  if (!event) {
    notFound();
    return null;
  }

  const theme = categoryClasses[event.category];

  const handleLike = () => {
    const saved = localStorage.getItem('saved_events') || '[]';
    let parsed = JSON.parse(saved);
    
    if (isLiked) {
        parsed = parsed.filter((id: string) => id !== event.id);
        setIsLiked(false);
    } else {
        parsed.push(event.id);
        setIsLiked(true);
    }
    
    localStorage.setItem('saved_events', JSON.stringify(parsed));
    window.dispatchEvent(new CustomEvent('saved_events_changed'));
  };

  const handlePlanned = () => {
    const saved = localStorage.getItem('planned_events') || '[]';
    let parsed = JSON.parse(saved);
    
    if (isPlanned) {
        parsed = parsed.filter((id: string) => id !== event.id);
        setIsPlanned(false);
    } else {
        parsed.push(event.id);
        setIsPlanned(true);
    }
    
    localStorage.setItem('planned_events', JSON.stringify(parsed));
    window.dispatchEvent(new CustomEvent('planned_events_changed'));
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="space-y-6 pb-12 pt-4">
      <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
        <div className="flex p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Discover
      </Link>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className={`overflow-hidden rounded-[2.5rem] border bg-black/50 ${theme.border} ${theme.glow}`}>
               <VideoPlayer url={event.streamUrl} title={event.title} />
          </div>

          {/* Social Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
             <div className="flex items-center gap-2">
                <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${
                        isLiked 
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                </button>
                <button 
                    onClick={handlePlanned}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${
                        isPlanned 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                >
                    {isPlanned ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    {isPlanned ? 'Planned' : 'Remind Me'}
                </button>
                <button 
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold transition-all active:scale-95"
                >
                    <Share2 className="w-5 h-5" />
                    Share
                </button>
             </div>

             <div className="flex items-center gap-6 pr-4">
                <a href="#comments" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <MessageSquare className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-sm font-bold uppercase tracking-wider">{commentCount} Comments</span>
                </a>
             </div>
          </div>
          
          <section className="relative overflow-hidden space-y-4 rounded-[2.5rem] border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-10 shadow-2xl">
            {/* Cinematic Gradient Background */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 bg-current pointer-events-none ${theme.text}`} />
            
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md bg-white/5 border border-white/10 ${theme.text}`}>
                {event.category}
              </span>
              
              {event.isLive && (
                <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  LIVE NOW
                </div>
              )}
              
              {event.isLive && event.viewers && (
                <LiveViewerCount eventId={event.id} initialViewers={event.viewers} />
              )}
            </div>

            <h1 className="text-4xl font-extrabold text-white md:text-6xl tracking-tight">{event.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <div suppressHydrationWarning className="rounded-xl bg-white/5 px-4 py-2 border border-white/10 font-bold uppercase tracking-wide">
                  {new Date(event.dateTime).toLocaleString(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}
                </div>
              </div>

              <Link href={`/creator/${event.host.id}`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-5 py-2.5 transition-all group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                    <img src={event.host.avatar} alt={event.host.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Hosted By</span>
                    <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{event.host.name}</span>
                </div>
              </Link>
            </div>
            
            <div className="pt-6">
                <h3 className="text-xl font-bold text-white mb-3">About the Event</h3>
                <p className="leading-relaxed text-slate-400 text-lg md:text-xl font-medium">{event.description}</p>
            </div>
          </section>

          {/* Comment Section Integration */}
          <CommentSection eventId={event.id} />

          {/* Recommendation Rail */}
          <section className="space-y-6 pt-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {events
                .filter((e) => e.category === event.category && e.id !== event.id)
                .slice(0, 2)
                .map((relatedEvent) => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
            </div>
          </section>
        </div>

        <div className="h-full lg:h-[calc(100vh-140px)] sticky top-[92px]">
          <ChatBox />
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        url={shareUrl} 
        title={event.title} 
      />
    </div>
  );
}

