import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Quote, Sparkles } from 'lucide-react';
import infoData from '../../data/info.json';
import ArtistGallery from './ArtistGallery';

type Member = (typeof infoData.team)[0];
type Project = Member['projects'][0] & { gallery?: string[] };

export default function Artists({ onBack }: { onBack: () => void }) {
  const [selectedArtist, setSelectedArtist] = useState<Member | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-6xl w-full relative"
    >
      <div className="fixed inset-0 bg-stone-950 -z-10" />
      <AnimatePresence mode="wait">
        {!selectedArtist ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <button 
              onClick={onBack}
              className="mb-12 flex items-center justify-center gap-2 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-tighter hover:bg-white/10 transition-all mx-auto"
            >
              <ArrowLeft className="w-3 h-3" /> Back to About
            </button>

            <h2 className="text-2xl md:text-4xl font-editorial italic mb-16 text-white/90">Our Artists</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {infoData.team.map((member, i) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedArtist(member as Member)}
                  className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] cursor-pointer hover:bg-white/10 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                  
                  <div className="flex items-start gap-6">
                    <img 
                      src={(member as any).image} 
                      alt={member.name}
                      className="w-20 h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                    />
                    <div>
                      <h3 className="text-xl font-medium mb-1 group-hover:text-white transition-colors">{member.name}</h3>
                      <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-white/60 leading-relaxed text-[13px] line-clamp-2">
                    {member.bio}
                  </p>
                  
                  <div className="mt-8 flex justify-end">
                    <span className="text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white/80 transition-colors flex items-center gap-2">
                      View Profile <ArrowLeft className="w-3 h-3 rotate-180" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : selectedProject ? (
          <ArtistGallery 
            key="gallery"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full text-left"
          >
            <button 
              onClick={() => setSelectedArtist(null)}
              className="mb-12 flex items-center justify-center gap-2 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-tighter hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-3 h-3" /> Back to List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    src={(selectedArtist as any).image} 
                    alt={selectedArtist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 rotate-6 shadow-xl">
                  <Quote className="w-8 h-8 text-white/20" />
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium mb-3"
                  >
                    {selectedArtist.role}
                  </motion.p>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-editorial italic text-white"
                  >
                    {selectedArtist.name}
                  </motion.h3>
                </div>

                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="relative"
                >
                  <Quote className="absolute -top-6 -left-8 w-12 h-12 text-white/5" />
                  <p className="text-lg md:text-xl font-light text-white/80 italic leading-relaxed font-editorial">
                    "{(selectedArtist as any).quote}"
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="text-[10px] uppercase tracking-widest text-white/20 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Core Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedArtist as any).specialties?.map((spec: string) => (
                      <span key={spec} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] text-white/60">
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>

                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/50 leading-relaxed text-sm"
                  >
                    {selectedArtist.bio}
                  </motion.p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-24"
            >
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-white/10" /> Featured Works
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedArtist as any).projects?.map((project: any, idx: number) => (
                  <motion.div 
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                      <h5 className="text-white text-base font-editorial italic">{project.title}</h5>
                      <span className="text-white/40 text-[8px] uppercase tracking-widest mt-2">View Gallery</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
