'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Share2 } from 'lucide-react';
import { useState } from 'react';

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
};

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { name: 'Twitter', icon: X, color: 'hover:text-sky-400', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', icon: Send, color: 'hover:text-emerald-400', href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
    { name: 'Telegram', icon: Share2, color: 'hover:text-blue-400', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f172a]/90 p-8 shadow-2xl backdrop-blur-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Share Event</h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative z-10 space-y-8">
              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-4">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/20 group ${link.color}`}
                  >
                    <link.icon className="w-8 h-8 transition-transform group-hover:scale-125" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-white">{link.name}</span>
                  </a>
                ))}
              </div>

              {/* Copy Link Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Or copy link</p>
                <div className="flex items-center gap-3 p-2 pl-4 rounded-2xl bg-black/40 border border-white/10 focus-within:border-cyan-500/50 transition-all">
                  <span className="flex-1 text-sm text-slate-400 truncate font-medium">{url}</span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                        copied 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white text-black hover:bg-slate-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
