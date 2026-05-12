import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Layers } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  story?: string;
  image: string;
  gallery?: string[];
  isArchive: boolean;
}

export default function ProjectDetail({ project, onBack }: { project: any; onBack: () => void; key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl w-full relative"
    >
      <div className="fixed inset-0 bg-stone-950 -z-10" />
      <button 
        onClick={onBack}
        className="mb-12 flex items-center justify-center gap-2 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-tighter hover:bg-white/10 transition-all"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Projects
      </button>

      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                <Layers className="w-3 h-3 text-white/40" />
                <span className="text-[9px] uppercase tracking-widest text-white/60">{project.category}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                <Calendar className="w-3 h-3 text-white/40" />
                <span className="text-[9px] uppercase tracking-widest text-white/60">{project.year}</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial italic text-white leading-tight">
              {project.title}
            </h2>
          </div>
          <p className="max-w-xs text-white/40 text-[13px] leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
        >
          <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
        </motion.div>

        {/* Content Wrapper */}
        <div className="max-w-4xl mx-auto py-16 md:py-24 space-y-24">
          {/* The Story */}
          {project.story && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium">The Narrative</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <p className="text-lg md:text-3xl font-light text-white font-editorial leading-relaxed">
                "{project.story}"
              </p>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium">Visual Gallery</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl ${i === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} gallery ${i}`} 
                      className="w-full h-auto hover:scale-105 transition-transform duration-1000" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-20 border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/10 mb-2">Lông Bông Studio © {project.year}</p>
            <p className="text-white/20 font-editorial italic text-xs">Where digital meets tangible</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
