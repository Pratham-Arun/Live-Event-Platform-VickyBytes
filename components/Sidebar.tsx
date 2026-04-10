'use client';

import { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Flame, 
  Bookmark, 
  LayoutDashboard, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import NextLink from 'next/link';

const sidebarItems = [
  { name: 'Discover', icon: Home, path: '/' },
  { name: 'My List', icon: Bookmark, path: '/saved' },
  { name: 'My Profile', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Creators', icon: Users, path: '/creators' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Handle mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Trigger */}
      <button 
        onClick={toggleMobile}
        className="fixed bottom-6 left-6 z-[60] flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-2xl shadow-cyan-500/50 lg:hidden"
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        animate={{ 
            width: isOpen ? '280px' : '88px',
            x: isMobileOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -300
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 z-[58] flex h-screen flex-col border-r border-white/5 bg-[#020617]/80 backdrop-blur-3xl transition-colors duration-300 ${isMobileOpen ? 'w-[280px] x-0' : ''}`}
      >
        {/* Logo and Toggle */}
        <div className="flex h-[72px] items-center justify-between px-6 border-b border-white/5">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div 
                        key="logo-full"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2"
                    >
                         <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20" />
                         <span className="text-xl font-bold tracking-tight text-white">
                            Live<span className="text-slate-500 font-light">Events</span>
                         </span>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="logo-mini"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg"
                    >
                        <span className="font-bold text-white uppercase text-xs">LE</span>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
                {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-2 px-3 py-6 overflow-y-auto hide-scrollbar">
            {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                
                return (
                    <NextLink
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                            isActive 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                            : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                    >
                        <Icon className={`w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                        
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-sm font-semibold tracking-wide whitespace-nowrap"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {isActive && (
                            <motion.div 
                                layoutId="active-pill"
                                className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                            />
                        )}
                    </NextLink>
                );
            })}
        </nav>

        {/* User Quick Access */}
        <div className="p-4 border-t border-white/5">
            <div className={`p-2 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 shadow-lg border border-white/20 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">G</span>
                </div>
                {isOpen && (
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white truncate">Guest User</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Free Account</span>
                    </div>
                )}
            </div>
        </div>
      </motion.aside>
    </>
  );
}
