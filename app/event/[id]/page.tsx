import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Radio, Eye } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
import VideoPlayer from '@/components/VideoPlayer';
import { events, type EventCategory } from '@/data/events';

type EventPageProps = {
  params: {
    id: string;
  };
};

const categoryClasses: Record<EventCategory, { text: string; glow: string; border: string }> = {
  Tech: { text: 'text-cyan-400', glow: 'shadow-cyan-500/20', border: 'border-cyan-500/30' },
  Music: { text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/20', border: 'border-fuchsia-500/30' },
  Movies: { text: 'text-violet-400', glow: 'shadow-violet-500/20', border: 'border-violet-500/30' },
  Trending: { text: 'text-rose-400', glow: 'shadow-rose-500/20', border: 'border-rose-500/30' },
  'Stand Up': { text: 'text-amber-400', glow: 'shadow-amber-500/20', border: 'border-amber-500/30' }
};

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  const theme = categoryClasses[event.category];

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
          <div className={`overflow-hidden rounded-2xl border bg-black/50 ${theme.border} ${theme.glow}`}>
               <VideoPlayer url={event.streamUrl} title={event.title} />
          </div>
          
          <section className="relative overflow-hidden space-y-4 rounded-[2rem] border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-8 shadow-2xl">
            {/* Cinematic Gradient Background within Section */}
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
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-auto">
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span>{(event.viewers > 999 ? (event.viewers/1000).toFixed(1) + 'k' : event.viewers)} viewing</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-white md:text-5xl">{event.title}</h1>
            
            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
              <div className="rounded-lg bg-white/5 px-4 py-2 border border-white/10">
                {new Date(event.dateTime).toLocaleString(undefined, {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">About the Event</h3>
                <p className="leading-relaxed text-slate-400 text-lg">{event.description}</p>
            </div>
          </section>
        </div>

        <div className="h-full lg:h-[calc(100vh-140px)] sticky top-[92px]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
