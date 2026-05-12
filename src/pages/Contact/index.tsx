import { motion } from 'motion/react';
import { AnimatedText } from '../../components/AnimatedText';

export default function Contact({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <motion.main 
      key="contact"
      className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 py-20 text-center select-none"
    >
      <div className="max-w-3xl space-y-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-normal text-white/95 leading-tight"
        >
          Drink <span className="font-editorial italic">e-coffee</span> with us
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group w-full sm:w-auto px-10 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[11px] font-medium hover:bg-white hover:text-stone-900 transition-all shadow-xl uppercase tracking-widest">
            <AnimatedText text="Schedule a coffee" />
          </button>
          <button className="group w-full sm:w-auto px-10 py-3 bg-white text-stone-900 rounded-full text-[11px] font-medium hover:scale-105 transition-transform shadow-xl uppercase tracking-widest">
            <AnimatedText text="Contact us" />
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
