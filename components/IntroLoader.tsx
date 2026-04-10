'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';

const signatureFont = Dancing_Script({ 
    subsets: ['latin'],
    weight: ['400', '700'] 
});

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto'; // restore scroll
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]"
        >
          {/* Radial ambient glow behind signature */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="w-96 h-96 bg-cyan-600/30 blur-[100px] rounded-full" 
              />
          </div>

          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className={`${signatureFont.className} px-8 py-4 text-6xl md:text-8xl text-white font-bold tracking-wider drop-shadow-2xl z-10`}
          >
            Live Events
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
