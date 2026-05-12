import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface Project {
  title: string;
  image: string;
  gallery?: string[];
}

export default function ArtistGallery({ project, onBack }: { project: any; onBack: () => void; key?: React.Key }) {
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
        className="mb-12 flex items-center justify-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-tighter hover:bg-white/10 transition-all"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Profile
      </button>

      <div className="text-left mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-white/40 border border-white/5">
          <ImageIcon className="w-3 h-3" /> Exhibition
        </div>
        <h2 className="text-4xl md:text-6xl font-editorial italic text-white/90">{project.title}</h2>
        <p className="text-white/30 text-xs uppercase tracking-[0.3em]">Project Gallery & Highlights</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {project.gallery?.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
          >
            <img 
              src={img} 
              alt={`${project.title} ${i}`} 
              className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-32 pt-16 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/10 italic">Lông Bông Studio Portfolio</p>
      </div>
    </motion.div>
  );
}
