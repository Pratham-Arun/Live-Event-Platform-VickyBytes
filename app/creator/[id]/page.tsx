'use client';

import { useParams } from 'next/navigation';
import { events, type Host } from '@/data/events';
import EventCard from '@/components/EventCard';
import { motion, type Variants } from 'framer-motion';
import { User, Calendar, Users, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatorProfilePage() {
  const { id } = useParams();
  
  // Find host by looking through events
  const host = events.find(e => e.host.id === id)?.host;
  const creatorEvents = events.filter(e => e.host.id === id);

  if (!host) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-white">Creator not found</h2>
        <Link href="/" className="text-cyan-400 hover:underline">Return to Home</Link>
      </div>
    );
  }

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

  return (
    <div className="space-y-12 pb-12">
      {/* Premium Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f172a]/40 p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Link href="/" className="relative z-10 group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Explore
        </Link>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full p-1.5 bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-amber-500 shadow-2xl"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a]">
              <img src={host.avatar} alt={host.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-cyan-500 p-2 rounded-full border-4 border-[#0f172a] shadow-lg">
                <Users className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-extrabold text-white"
                >
                    {host.name}
                </motion.h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {creatorEvents.length} Events</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 125k Followers</span>
                </div>
            </div>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-slate-300 text-lg leading-relaxed"
            >
                {host.bio}
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center md:justify-start gap-4 pt-4"
            >
                <button className="px-8 py-3 rounded-2xl bg-white text-black font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/5 active:scale-95">
                    Follow
                </button>
                <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95">
                    <Share2 className="w-5 h-5" />
                </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Hosted Grid */}
      <section className="space-y-8 px-4 md:px-0">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Hosted Events</h2>
            <span className="text-slate-400 text-sm font-medium">{creatorEvents.length} Total</span>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {creatorEvents.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
