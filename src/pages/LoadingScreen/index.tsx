import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onWelcome: () => void;
}

export default function LoadingScreen({ onWelcome }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds for loading
    const interval = 30; // update every 30ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Calculate blur based on progress (from 15px to 0px)
  const blurValue = Math.max(15 - (progress / 100) * 15, 0);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-sans">

      {/* Main Content wrapper with blur effect */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
        style={{ filter: `blur(${blurValue}px)` }}
      >
        {/* Content Container */}
        <div className="relative flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-base md:text-lg font-editorial font-light tracking-widest text-white/90 mb-4 select-none"
          >
            <span className="italic pr-1.5">Lông Bông</span><span className="opacity-80">Studio</span>
          </motion.h1>

          <div className="h-10 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {isFinished && (
                <motion.button
                  key="welcome-button"
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.2
                  }}
                  onClick={onWelcome}
                  className="group px-5 py-1 border border-white/20 rounded-full text-white/80 text-[9px] font-sans tracking-widest hover:border-white hover:text-white transition-colors active:scale-95 overflow-hidden"
                >
                  <div className="relative flex uppercase overflow-hidden">
                    {/* Top layer */}
                    <div className="flex">
                      {"Welcome".toUpperCase().split('').map((char, i) => (
                        <span
                          key={`top-${i}`}
                          className="inline-block group-hover:-translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                          style={{ transitionDelay: `${i * 20}ms` }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    {/* Bottom layer */}
                    <div className="absolute inset-0 flex" aria-hidden="true">
                      {"Welcome".toUpperCase().split('').map((char, i) => (
                        <span
                          key={`bottom-${i}`}
                          className="inline-block translate-y-[120%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                          style={{ transitionDelay: `${i * 20}ms` }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Loading Counter */}
        <div className="absolute bottom-10 right-12 text-xl font-editorial italic text-white/90 select-none">
          {Math.round(progress)}
        </div>
      </motion.div>

      {/* Overlay Mist Particles (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      </div>
    </div>
  );
}
