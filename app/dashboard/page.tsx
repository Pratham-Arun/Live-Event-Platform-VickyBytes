'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area
} from 'recharts';
import { 
    Eye, Heart, MessageSquare, Clock, 
    Bookmark, Calendar, Sparkles, Zap
} from 'lucide-react';

const activityTrends = [
  { day: 'Mon', engagement: 12 },
  { day: 'Tue', engagement: 18 },
  { day: 'Wed', engagement: 15 },
  { day: 'Thu', engagement: 22 },
  { day: 'Fri', engagement: 30 },
  { day: 'Sat', engagement: 25 },
  { day: 'Sun', engagement: 28 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    seen: 0,
    liked: 0,
    planned: 0,
    comments: 0
  });

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem('seen_events') || '[]');
    const liked = JSON.parse(localStorage.getItem('saved_events') || '[]');
    const planned = JSON.parse(localStorage.getItem('planned_events') || '[]');
    
    // Count comments - keys are 'comments_EVENTID'
    let commentCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('comments_')) {
            const comments = JSON.parse(localStorage.getItem(key) || '[]');
            // Filter out the initial mock comments if we want to be strict, 
            // but for now let's just count everything.
            commentCount += comments.length;
        }
    }

    setStats({
        seen: seen.length,
        liked: liked.length,
        planned: planned.length,
        comments: commentCount
    });
  }, []);

  return (
    <div className="space-y-10 pb-16 pt-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">User Profile</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">My Activity Hub</h1>
            <p className="text-slate-400 text-lg">Tracking your growth and engagement in the live event ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95">
                <Calendar className="w-5 h-5 text-cyan-400" /> This Week
            </button>
        </div>
      </header>

      {/* Modern Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: 'Events Seen', value: stats.seen, icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { label: 'Liked Total', value: stats.liked, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
            { label: 'Planned Next', value: stats.planned, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Contributions', value: stats.comments, icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.08] transition-all"
            >
                <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-[1.5rem] ${stat.bg} border border-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                    <Zap className="w-5 h-5 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                </div>
                <div className="space-y-1 relative z-10">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                </div>
                <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/5 transition-all" />
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 rounded-[3.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Engagement Flow</h3>
                    <p className="text-slate-400 font-medium">Daily interaction points across the platform</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    LIVE TRACKING
                </div>
            </div>
            
            <div className="h-[350px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityTrends}>
                        <defs>
                            <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                        <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 'bold' }} 
                            dy={15}
                        />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#0f172a', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '24px',
                                backdropFilter: 'blur(16px)',
                                color: '#fff',
                                padding: '16px'
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="engagement" 
                            stroke="#22d3ee" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorEngage)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* Motivation Side Card */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-10 backdrop-blur-2xl flex flex-col justify-center gap-8 text-center"
        >
            <div className="mx-auto w-24 h-24 rounded-[2.5rem] bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <Sparkles className="w-12 h-12 text-indigo-400" />
            </div>
            <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Top Contributor</h3>
                <p className="text-slate-400 font-medium">You've shared thoughts on {stats.comments} events this week. Keep the conversation alive!</p>
            </div>
            <button className="w-full py-5 rounded-[2rem] bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/10">
                Explore More
            </button>
        </motion.div>
      </div>

      {/* Content Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
                whileHover={{ scale: 1.01 }}
                className="group p-8 rounded-[3.5rem] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                        <Bookmark className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">My Watch List</h4>
                        <p className="text-slate-400 font-medium">Quick access to {stats.liked} saved events</p>
                    </div>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Zap className="w-5 h-5" />
                </div>
            </motion.div>

            <motion.div 
                whileHover={{ scale: 1.01 }}
                className="group p-8 rounded-[3.5rem] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">Upcoming Events</h4>
                        <p className="text-slate-400 font-medium">Don't miss the {stats.planned} you've planned</p>
                    </div>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Zap className="w-5 h-5" />
                </div>
            </motion.div>
      </div>
    </div>
  );
}
