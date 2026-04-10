'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Radio, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Notification = {
    id: string;
    title: string;
    message: string;
    type: 'live' | 'info' | 'success';
    link?: string;
};

export default function NotificationSystem() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((notif: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { ...notif, id }]);
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 6000);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    // Simulate an event going live after 5 seconds on the first mount
    useEffect(() => {
        const timer = setTimeout(() => {
            addNotification({
                title: 'Going Live Now!',
                message: 'The Future of AI Summit has just started. Join 12k others!',
                type: 'live',
                link: '/event/1'
            });
        }, 8000);

        // Listen for custom events if we want to trigger manually
        const handleTrigger = (e: any) => {
            if (e.detail) addNotification(e.detail);
        };
        
        window.addEventListener('trigger-notification', handleTrigger as any);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('trigger-notification', handleTrigger as any);
        };
    }, [addNotification]);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
            <AnimatePresence mode="popLayout">
                {notifications.map((notif) => (
                    <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="pointer-events-auto relative overflow-hidden rounded-[2rem] border border-white/20 bg-[#0f172a]/80 backdrop-blur-2xl p-5 shadow-2xl glass-effect"
                    >
                        {/* Animated background glow for 'live' type */}
                        {notif.type === 'live' && (
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                        )}

                        <div className="flex gap-4 relative z-10">
                            <div className={`p-3 rounded-2xl shrink-0 ${
                                notif.type === 'live' ? 'bg-red-500/20 text-red-400' : 
                                notif.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                                'bg-cyan-500/20 text-cyan-400'
                            }`}>
                                {notif.type === 'live' ? <Radio className="w-6 h-6 animate-pulse" /> : <Bell className="w-6 h-6" />}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-white text-base">{notif.title}</h4>
                                    <button 
                                        onClick={() => removeNotification(notif.id)}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-300 leading-snug">{notif.message}</p>
                                
                                {notif.link && (
                                    <Link 
                                        href={notif.link}
                                        onClick={() => removeNotification(notif.id)}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-1 pt-2"
                                    >
                                        Join Now <ArrowRight className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
