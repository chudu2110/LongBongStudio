import React from 'react';
import { motion } from 'motion/react';

export default function Home({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <motion.main 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center select-none"
    >
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl text-xl md:text-3xl lg:text-4xl font-normal leading-[1.2] tracking-tight text-white/95"
      >
        A <span className="font-editorial italic font-light">creative design studio</span> for<br/>
        branding, immersive web<br/>
        and 3D motion.
      </motion.h1>
      
      {/* Buttons removed as requested */}
    </motion.main>
  );
}
