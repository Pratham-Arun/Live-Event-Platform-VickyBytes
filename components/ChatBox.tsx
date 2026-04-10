'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Crown, Shield, User, Loader2 } from 'lucide-react';
import Pusher from 'pusher-js';

type Role = 'Host' | 'VIP' | 'User';

type Message = {
  id: number;
  author: string;
  role: Role;
  text: string;
  color: string;
};

const initialMessages: Message[] = [
  { id: 1, author: 'Alex_Host', role: 'Host', text: 'Welcome everyone to the live stream! Drop a 🔥 if you are ready.', color: 'from-rose-500 to-red-600' },
  { id: 2, author: 'Ava_VIP', role: 'VIP', text: 'Excited to be here! 🔥🔥', color: 'from-amber-400 to-orange-500' },
  { id: 3, author: 'Noah_99', role: 'User', text: 'Audio and video look great from my end.', color: 'from-cyan-400 to-blue-500' }
];

export default function ChatBox({ eventId = 'global' }: { eventId?: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Generate a random user ID/Color for the session
  const currentUserColor = useMemo(() => {
    const colors = ['from-violet-400 to-fuchsia-500', 'from-cyan-400 to-blue-500', 'from-rose-400 to-pink-500', 'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Only init pusher if environment variable exists
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
        authEndpoint: '/api/pusher/auth',
    });

    const channelName = `presence-chat-${eventId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind('new-message', (data: Message) => {
        // If message is from us, ignore since we perform optimistic UI update
        // But for simplicity/demo without dedicated user_ids, we'll just append it 
        // if it doesn't already exist (we'll generate UUIDs)
        setMessages((current) => {
            if (current.find(m => m.id === data.id)) return current;
            return [...current, data];
        });
    });

    return () => {
        pusher.unsubscribe(channelName);
        pusher.disconnect();
    };
  }, [eventId]);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || isSending) return;

    setIsSending(true);
    const newMessage: Message = {
        id: Date.now(),
        author: 'You',
        role: 'User',
        text,
        color: currentUserColor
    };

    // Optimistic update
    setMessages((current) => [...current, newMessage]);
    setDraft('');

    try {
        await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: newMessage,
                channelId: `presence-chat-${eventId}`
            })
        });
    } catch (error) {
        console.error("Failed to send", error);
    } finally {
        setIsSending(false);
    }
  };

  const getRoleIcon = (role: Role) => {
    if (role === 'Host') return <Shield className="w-3 h-3 text-red-100" />;
    if (role === 'VIP') return <Crown className="w-3 h-3 text-amber-100" />;
    return <User className="w-3 h-3 text-slate-300" />;
  };

  const getRoleBadgeColor = (role: Role) => {
    if (role === 'Host') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (role === 'VIP') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-white/5 text-slate-300 border-white/10';
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a]/80 backdrop-blur-3xl shadow-2xl relative">
      {/* Decorative Glow inside ChatBox */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black/20 z-10">
          <div className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </div>
              <span className="text-sm font-bold tracking-wide text-white">LIVE CHAT</span>
          </div>
          <span className="text-xs font-medium text-slate-400">{messages.length} messages</span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 scroll-smooth hide-scrollbar z-10">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div 
                key={message.id} 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-start gap-3 group"
            >
              {/* Avatar Outline generated by color */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${message.color} shadow-lg shrink-0 border border-white/20`}>
                 <span className="text-xs font-bold text-white shadow-sm drop-shadow-md">
                     {message.author.charAt(0).toUpperCase()}
                 </span>
              </div>

              <div className="flex flex-col items-start min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-slate-200 text-sm drop-shadow-sm">{message.author}</span>
                      {message.role !== 'User' && (
                          <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${getRoleBadgeColor(message.role)}`}>
                             {getRoleIcon(message.role)}
                             {message.role}
                          </span>
                      )}
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-2.5 text-sm text-slate-300 shadow-inner group-hover:bg-white/10 transition-colors">
                      {message.text}
                  </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Mock Typing Indicator */}
        <AnimatePresence>
            {draft.length > 5 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 text-slate-400 text-xs italic ml-2"
                >
                    <div className="flex gap-1 h-4 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    Someone is typing...
                </motion.div>
            )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/10 bg-black/40 p-4 z-10 backdrop-blur-md">
        <div className="relative group flex items-center">
            <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
                }
            }}
            placeholder="Send a message..."
            className="flex-1 rounded-2xl border-2 border-white/5 bg-white/5 py-3 pl-4 pr-14 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:bg-white/10 shadow-inner shadow-black/50"
            />
            <button
            type="button"
            onClick={sendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-cyan-500 p-2 text-slate-950 transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!draft.trim()}
            >
            <Send className="w-4 h-4" />
            </button>
        </div>
      </div>
    </section>
  );
}
