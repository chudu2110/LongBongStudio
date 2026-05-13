import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Artists from './Artists';
import OurStory from './OurStory';

export default function About({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [view, setView] = useState<'main' | 'artists' | 'story'>('main');

  return (
    <motion.main 
      key="about"
      className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 py-20 text-center select-none"
    >
      <AnimatePresence mode="wait">
        {view === 'main' ? (
          <motion.div 
            key="about-main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl space-y-12"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-normal leading-snug tracking-tight text-white/90">
              <span className="font-editorial italic">Lông Bông</span> is an independent art studio in Vietnam hosting free weekly activities, workshops and collaborative experiences rooted in community and curiosity.
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-8 text-[9px] uppercase tracking-[0.25em] text-white/30 font-medium">
              <div className="hover:text-white transition-colors cursor-default">Art workshops</div>
              <div className="hover:text-white transition-colors cursor-default">Community gatherings</div>
              <div className="hover:text-white transition-colors cursor-default">Creative collaborations</div>
              <div className="hover:text-white transition-colors cursor-default">Open studio events</div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              <button 
                onClick={() => setView('story')}
                className="px-8 py-3 bg-white text-stone-900 rounded-full text-[10px] font-semibold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl"
              >
                Our Story
              </button>
              <button 
                onClick={() => setView('artists')}
                className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-semibold uppercase tracking-widest hover:bg-white/20 transition-all hover:scale-105"
              >
                Meet the Artists
              </button>
            </div>
          </motion.div>
        ) : view === 'artists' ? (
          <Artists onBack={() => setView('main')} />
        ) : (
          <OurStory onBack={() => setView('main')} />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
