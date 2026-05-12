/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  X, 
  Menu,
  Volume2, 
  VolumeX
} from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import LoadingScreen from './pages/LoadingScreen';
import { AnimatedText } from './components/AnimatedText';

const TABS = ['Home', 'About', 'Projects', 'Contact'];
const VIDEO_SOURCES: Record<string, string> = {
  'Home': "/videos/Home Screen.mp4",
  'About': "/videos/About us Screen.mp4",
  'Projects': "/videos/Project Screen.mp4",
  'Contact': "/videos/Contact Screen.mp4"
};

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [direction, setDirection] = useState(0);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    const currentIdx = TABS.indexOf(activeTab);
    const newIdx = TABS.indexOf(newTab);
    setDirection(newIdx > currentIdx ? 1 : -1);
    setActiveTab(newTab);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggleTimeMode = () => {
    const newMode = !isNightMode;
    const projectVideo = videoRefs.current['Projects'];
    if (projectVideo) {
      if (newMode) {
        projectVideo.currentTime = 38;
      } else {
        projectVideo.currentTime = 0;
      }
    }
    setIsNightMode(newMode);
  };

  useEffect(() => {
    if (activeTab !== 'Projects') {
      setIsNightMode(false);
    }
  }, [activeTab]);

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>, tab: string) => {
    if (tab === 'Projects' && isNightMode) {
      e.currentTarget.currentTime = 38;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Content for each tab
  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'Home':
        return <Home onNavigate={handleTabChange} />;
      case 'About':
        return <About onNavigate={handleTabChange} />;
      case 'Projects':
        return <Projects onNavigate={handleTabChange} />;
      case 'Contact':
        return <Contact onNavigate={handleTabChange} />;
      default:
        return null;
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tabVariantsLeft = {
    closed: (i: number) => ({ 
      x: 60,
      scale: 0, 
      opacity: 0,
      width: 0,
      margin: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 1,
        delay: i * 0.05 
      }
    }),
    open: (i: number) => ({ 
      x: 0,
      scale: 1, 
      opacity: 1,
      width: 'auto',
      margin: '0 0.5rem',
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 20,
        mass: 1.2,
        delay: (2 - i) * 0.08 
      }
    })
  };

  const tabVariantsRight = {
    closed: (i: number) => ({ 
      x: -60,
      scale: 0, 
      opacity: 0,
      width: 0,
      margin: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 1,
        delay: (1 - i) * 0.05 
      }
    }),
    open: (i: number) => ({ 
      x: 0,
      scale: 1, 
      opacity: 1,
      width: 'auto',
      margin: '0 0.5rem',
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 20,
        mass: 1.2,
        delay: i * 0.08 
      }
    })
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen onWelcome={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        key="main-app"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen w-full bg-stone-900 overflow-hidden font-sans text-white"
      >
          {/* Background Video Container */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {TABS.map((tab, idx) => {
              const activeIdx = TABS.indexOf(activeTab);
              const offset = idx - activeIdx;
              
              return (
                <motion.video
                  key={tab}
                  ref={(el) => { if (el) videoRefs.current[tab] = el; }}
                  src={VIDEO_SOURCES[tab]}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onLoadedMetadata={(e) => handleVideoLoad(e, tab)}
                  initial={direction === 0 ? { opacity: 0, scale: 1.1, x: `${offset * 100}%` } : false}
                  animate={{
                    x: `${offset * 100}%`,
                    opacity: 1,
                    scale: (isLoading && direction === 0) ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 1.4, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              );
            })}
          </div>

          {/* Header */}
          <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-editorial tracking-tight text-white/95 cursor-pointer select-none"
              onClick={() => handleTabChange('Home')}
            >
              Lông Bông Studio
            </motion.div>

            <motion.div 
              className="flex items-center gap-3 md:gap-5"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="hidden md:flex items-center gap-3">
                {[
                  { icon: <Instagram className="w-3 h-3 stroke-[2.5]" />, label: "ig" },
                  { icon: <span className="font-bold text-[10px]">in</span>, label: "ln" },
                  { icon: <span className="font-bold text-[11px]">Bē</span>, label: "be" }
                ].map((item) => (
                  <motion.a 
                    key={item.label}
                    href="#" 
                    variants={fadeIn} 
                    className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all hover:scale-110"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
              <motion.button 
                variants={fadeIn}
                className="group px-5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-medium shadow-lg hover:bg-white hover:text-stone-900 transition-all active:scale-95 whitespace-nowrap overflow-hidden"
              >
                <AnimatedText text="Get in touch" />
              </motion.button>
            </motion.div>
          </nav>

          {/* Main Content Sections */}
          <div className="relative min-h-[calc(100vh-180px)] overflow-x-hidden md:scrollbar-hide">
            {TABS.map((tab, idx) => {
              const activeIdx = TABS.indexOf(activeTab);
              const offset = idx - activeIdx;
              
              return (
                <motion.div
                  key={tab}
                  initial={direction === 0 ? { opacity: 0, x: `${offset * 100}%` } : false}
                  animate={{
                    x: `${offset * 100}%`,
                    opacity: 1
                  }}
                  transition={{ 
                    duration: 1.4, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden md:scrollbar-hide"
                  style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}
                >
                  {renderTabContent(tab)}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Floating Navigation */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center justify-center p-20 -m-16 selection:bg-transparent">
              <AnimatePresence initial={false}>
                {isMenuOpen && (
                  <motion.div 
                    key="left-tabs"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex items-center"
                  >
                    {['Home', 'About'].map((tab, idx) => (
                      <motion.button
                        layout="position"
                        key={tab}
                        variants={tabVariantsLeft}
                        custom={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabChange(tab)}
                        className={`group px-5 py-2 shrink-0 rounded-full text-[10px] font-medium shadow-lg whitespace-nowrap bg-white transition-colors relative z-10 overflow-hidden ${
                          activeTab === tab 
                          ? 'text-stone-900' 
                          : 'text-stone-500'
                        }`}
                      >
                        <AnimatedText text={tab} />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button 
                layout="position"
                onClick={toggleMenu}
                className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center bg-white text-stone-800 shadow-xl z-20 mx-1 relative transition-transform active:scale-90"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4 stroke-[2.5]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence initial={false}>
                {isMenuOpen && (
                  <motion.div 
                    key="right-tabs"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex items-center"
                  >
                    {['Projects', 'Contact'].map((tab, idx) => (
                      <motion.button
                        layout="position"
                        key={tab}
                        variants={tabVariantsRight}
                        custom={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabChange(tab)}
                        className={`group px-5 py-2 shrink-0 rounded-full text-[10px] font-medium shadow-lg whitespace-nowrap bg-white transition-colors relative z-10 overflow-hidden ${
                          activeTab === tab 
                          ? 'text-stone-900' 
                          : 'text-stone-500'
                        }`}
                      >
                        <AnimatedText text={tab} />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Audio & Time Controls */}
          <div className="fixed bottom-10 right-10 z-20 flex items-center gap-3">
            <AnimatePresence>
              {activeTab === 'Projects' && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={toggleTimeMode}
                  className="px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all active:scale-95 text-[10px] font-medium whitespace-nowrap"
                >
                  {isNightMode ? "Good morning" : "Good night"}
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={() => setIsMuted(!isMuted)}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all active:scale-95 group"
            >
              <AnimatePresence mode="wait">
                {isMuted ? (
                  <motion.div
                    key="mute"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <VolumeX className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Volume2 className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
    </>
  );
}
