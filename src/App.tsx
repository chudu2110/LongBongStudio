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
import { useState, useMemo, useRef } from 'react';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import LoadingScreen from './pages/LoadingScreen';

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="relative flex overflow-hidden">
      {/* Top layer */}
      <div className="flex">
        {text.split('').map((char, i) => (
          <span
            key={`top-${i}`}
            className="inline-block group-hover:-translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      {/* Bottom layer */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {text.split('').map((char, i) => (
          <span
            key={`bottom-${i}`}
            className="inline-block translate-y-[120%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Home onNavigate={setActiveTab} />;
      case 'About':
        return <About onNavigate={setActiveTab} />;
      case 'Projects':
        return <Projects onNavigate={setActiveTab} />;
      case 'Contact':
        return <Contact onNavigate={setActiveTab} />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  // Dynamic background based on active tab
  const bgImage = useMemo(() => {
    switch (activeTab) {
      case 'Home':
        return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop";
      case 'About':
        return "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2560&auto=format&fit=crop";
      case 'Projects':
        return "https://images.unsplash.com/photo-1518005020250-6e5949ad09be?q=80&w=2560&auto=format&fit=crop";
      case 'Contact':
        return "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2560&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop";
    }
  }, [activeTab]);

  // Animation variants
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
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100]"
        >
          <LoadingScreen onWelcome={() => setIsLoading(false)} />
        </motion.div>
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative min-h-screen w-full bg-stone-900 overflow-hidden font-sans text-white"
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img 
                key={bgImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                src={bgImage} 
                alt="Background" 
                className="h-full w-full object-cover brightness-[0.7] saturate-[0.8]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/60" />
          </div>

          {/* Header */}
          <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-editorial tracking-tight text-white/95 cursor-pointer select-none"
              onClick={() => setActiveTab('Home')}
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
          <div className="relative min-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden md:scrollbar-hide">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
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
                        onClick={() => setActiveTab(tab)}
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
                        onClick={() => setActiveTab(tab)}
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

          {/* Audio Toggle */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => setIsMuted(!isMuted)}
            className="fixed bottom-10 right-10 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all active:scale-95 group"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
