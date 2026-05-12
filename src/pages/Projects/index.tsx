import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import ProjectDetail from './ProjectDetail';
import { AnimatedText } from '../../components/AnimatedText';

type Project = (typeof projectsData)[0];

export default function Projects({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [view, setView] = useState<'main' | 'list'>('main');
  const [filter, setFilter] = useState<'all' | 'current' | 'archive'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter(p => {
    if (filter === 'current') return !p.isArchive;
    if (filter === 'archive') return p.isArchive;
    return true;
  });

  return (
    <motion.main 
      key="projects"
      className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 py-24 select-none"
    >
      <AnimatePresence>
        {view === 'list' && (
          <motion.div 
            key="list-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-stone-900 z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {view === 'main' ? (
          <motion.div 
            key="main-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl text-center space-y-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl lg:text-5xl font-normal leading-tight text-white/95"
            >
              See selection of <span className="font-editorial italic text-white">our recent work</span><br/>
              across branding, web and motion.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={() => setView('list')}
                className="group px-10 py-3.5 bg-white text-stone-900 rounded-full text-[12px] font-medium hover:scale-105 transition-transform shadow-xl tracking-wide"
              >
                <AnimatedText text="Visit our Projects" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-20 w-full overflow-hidden opacity-80"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                className="flex w-max items-center gap-16 pr-16"
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="text-sm tracking-[0.2em] font-semibold text-white">N A A M A</div>
                    <div className="text-sm font-bold flex items-center gap-2 text-white">
                      <div className="w-5 h-5 bg-white text-black flex items-center justify-center text-[11px] rounded-sm font-black">N</div>
                      NICOMATIC
                    </div>
                    <div className="text-lg font-bold lowercase tracking-tight flex items-center gap-1 text-white">
                      <span className="font-sans">airbnb</span>
                    </div>
                    <div className="text-sm font-bold tracking-widest text-white">GATE.IO</div>
                    <div className="text-sm font-bold tracking-widest italic text-white">EIFFAGE</div>
                    <div className="text-sm font-light tracking-[0.3em] text-white">ELMI</div>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : !selectedProject ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl w-full space-y-12"
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <button 
                onClick={() => setView('main')}
                className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-3 h-3 rotate-180" /> Back
              </button>
              
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {(['all', 'current', 'archive'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all ${
                      filter === f 
                      ? 'bg-white text-stone-900' 
                      : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedProject(project as Project)}
                    className="group relative h-[400px] bg-stone-800 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">{project.category}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-editorial italic text-white mb-2">{project.title}</h3>
                      <p className="text-[11px] text-white/40 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white -rotate-45" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <ProjectDetail 
            key="detail"
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
