'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, MoreHorizontal, Heart } from 'lucide-react';

type Comment = {
  id: string;
  user: string;
  text: string;
  time: string;
  likes: number;
};

type CommentSectionProps = {
  eventId: string;
};

export default function CommentSection({ eventId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`comments_${eventId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      // Mock initial comments
      const initial = [
        { id: '1', user: 'Alex Rivera', text: "This event looks incredible! Can't wait for the keynote.", time: '2 hours ago', likes: 12 },
        { id: '2', user: 'Jamie Chen', text: 'The production quality of this stream is top-notch.', time: '45 mins ago', likes: 5 },
      ];
      setComments(initial);
      localStorage.setItem(`comments_${eventId}`, JSON.stringify(initial));
    }
  }, [eventId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
        const comment: Comment = {
            id: Math.random().toString(36).substring(2, 9),
            user: 'Guest User',
            text: newComment,
            time: 'Just now',
            likes: 0
        };

        const updated = [comment, ...comments];
        setComments(updated);
        localStorage.setItem(`comments_${eventId}`, JSON.stringify(updated));
        setNewComment('');
        setIsSubmitting(false);

        // Notify parent of comment count change (if needed)
        window.dispatchEvent(new CustomEvent('comments_changed', { detail: { eventId, count: updated.length } }));
    }, 600);
  };

  const handleLike = (id: string) => {
    const updated = comments.map(c => 
        c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    localStorage.setItem(`comments_${eventId}`, JSON.stringify(updated));
  };

  return (
    <div className="space-y-10 py-12 border-t border-white/10" id="comments">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Discussion</h3>
            </div>
            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{comments.length} Comments</span>
        </div>

        {/* Post Comment Input */}
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center shrink-0 border border-white/20">
                    <span className="text-white font-bold">G</span>
                </div>
                <div className="flex-1 relative group">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Join the conversation..."
                        className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-3xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none text-lg"
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <button 
                            type="submit"
                            disabled={isSubmitting || !newComment.trim()}
                            className="bg-white text-black font-bold px-6 py-2.5 rounded-2xl hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>Post <Send className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>

        {/* Comment List */}
        <div className="space-y-6">
            <AnimatePresence mode="popLayout">
                {comments.map((comment, index) => (
                    <motion.div 
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all"
                    >
                        <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">{comment.user}</span>
                                    <span className="text-xs text-slate-500">• {comment.time}</span>
                                </div>
                                <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{comment.text}</p>
                            <div className="flex items-center gap-4 pt-2">
                                <button 
                                    onClick={() => handleLike(comment.id)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-400 transition-colors"
                                >
                                    <Heart className="w-4 h-4" /> {comment.likes}
                                </button>
                                <button className="text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
  );
}
