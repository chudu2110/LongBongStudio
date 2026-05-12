import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import storiesData from '../../data/stories.json';

export default function OurStory({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl w-full relative"
    >
      <div className="fixed inset-0 bg-stone-950 -z-10" />
      <button 
        onClick={onBack}
        className="mb-12 flex items-center justify-center gap-2 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-tighter hover:bg-white/10 transition-all mx-auto"
      >
        <ArrowLeft className="w-3 h-3" /> Back to About
      </button>

      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-white/40 mb-6 border border-white/5">
          <BookOpen className="w-3 h-3" /> Chronicles
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial italic text-white/90">Our Story</h2>
      </div>

      <div className="space-y-32">
        {storiesData.map((story, i) => (
          <motion.section 
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}
          >
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src={story.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={story.title} 
              />
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">{story.category}</span>
              <h3 className="text-2xl md:text-3xl font-editorial italic text-white">{story.title}</h3>
              <p className="text-white/60 leading-relaxed text-base font-light">
                {story.content}
              </p>
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-40 pt-20 border-t border-white/5 text-center text-white/20 italic font-editorial text-lg pb-20">
        The story continues with every pixel we craft.
      </div>
    </motion.div>
  );
}
