import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Artists from './Artists';
import OurStory from './OurStory';

export default function About({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [view, setView] = useState<'main' | 'artists' | 'story'>('main');

  return (
    <motion.main 
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
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
              A <span className="font-editorial italic">Polish-Singaporean creative studio</span> shaping brands through strategy, design and motion. We create designs that connect across mediums and dimensions.
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-8 text-[9px] uppercase tracking-[0.25em] text-white/30 font-medium">
              <div className="hover:text-white transition-colors cursor-default">Visual strategy</div>
              <div className="hover:text-white transition-colors cursor-default">Web development</div>
              <div className="hover:text-white transition-colors cursor-default">Branding</div>
              <div className="hover:text-white transition-colors cursor-default">3D Animation</div>
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
