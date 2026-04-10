'use client';

import { useState, useRef } from 'react';
import { Maximize2, Minimize2, PictureInPicture, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type VideoPlayerProps = {
  url: string;
  title: string;
};

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isTheater, setIsTheater] = useState(false);
  const [isMini, setIsMini] = useState(false);

  const toggleTheater = () => {
      if (isMini) setIsMini(false);
      setIsTheater(!isTheater);
  };

  const toggleMini = () => {
      if (isTheater) setIsTheater(false);
      setIsMini(!isMini);
  };

  return (
    <>
      {/* Background Dimmer for Theater Mode */}
      <AnimatePresence>
          {isTheater && (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
              />
          )}
      </AnimatePresence>

      <motion.div 
        layout
        className={`overflow-hidden border border-slate-800 bg-black shadow-2xl transition-all duration-500 ease-in-out group ${
            isTheater ? 'fixed inset-x-0 top-[72px] z-[70] max-h-[85vh] mx-4 rounded-3xl border-white/20' : 
            isMini ? 'fixed bottom-6 right-6 z-[80] w-[400px] h-[225px] rounded-2xl shadow-cyan-500/20' : 
            'relative w-full rounded-2xl'
        }`}
      >
        <div className={`relative w-full ${isTheater ? 'h-[85vh]' : isMini ? 'h-full' : 'pt-[56.25%]'}`}>
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Custom Controls Overlay - only visible on hover to not obstruct video */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4">
              <div className="flex items-center justify-end gap-3 pointer-events-auto">
                 <button onClick={toggleMini} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors" title="Mini Player">
                     <PictureInPicture className="w-4 h-4" />
                 </button>
                 <button onClick={toggleTheater} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors" title="Theater Mode">
                     {isTheater ? <Minimize2 className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                 </button>
              </div>
          </div>
        </div>
      </motion.div>
      
      {/* Placeholder to prevent layout shift when full width or mini */}
      {(isTheater || isMini) && (
          <div className="relative w-full pt-[56.25%] rounded-2xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center">
             <span className="text-slate-500 font-medium">Video is playing in {isTheater ? 'Theater' : 'Mini'} Mode</span>
          </div>
      )}
    </>
  );
}
