import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingSequenceProps {
  onComplete: () => void;
}

export const LandingSequence: React.FC<LandingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'entry' | 'pitstop' | 'shatter'>('entry');
  const [countdown, setCountdown] = useState(2.0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Phase 1 -> 2: Glitch transition into Pit Stop mode
    const entryTimer = setTimeout(() => {
      setPhase('pitstop');
    }, 2000); // 2 second entry run

    return () => clearTimeout(entryTimer);
  }, []);

  useEffect(() => {
    if (phase === 'pitstop') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0.1) {
            clearInterval(interval);
            setPhase('shatter');
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'shatter') {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 1200); // Wait for shatter animation
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  // Framer Motion Variants for HUD text
  const glitchVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence>
      {phase !== 'shatter' && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-hidden bg-black"
          exit={{ 
            opacity: 0, 
            scale: 1.5, 
            filter: "brightness(2) contrast(1.5) blur(10px) hue-rotate(90deg)",
          }}
          transition={{ duration: 1.2, ease: "anticipate" }}
        >
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0">
            {/* Using a placeholder high-res video (e.g., a stock racing clip or abstract speed motion) */}
            <video 
              ref={videoRef}
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
              src="https://cdn.pixabay.com/video/2023/10/22/186050-876934526_large.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
            />
            {/* Glitch Overlay on Phase Change */}
            <AnimatePresence>
              {phase === 'pitstop' && countdown > 1.8 && (
                <motion.div 
                  className="absolute inset-0 bg-white mix-blend-overlay z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* HUD Overlay Layer - Backdrop Blur and Dark Tint */}
          <div className="absolute inset-0 z-10 bg-background-dark/30 backdrop-blur-[6px] pointer-events-none flex flex-col justify-between p-8">
            
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-20" 
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}>
            </div>
            
            {/* Chromatic Aberration Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,0,255,0.1),inset_0_0_150px_rgba(0,255,255,0.1)] z-10"></div>

            {/* Top HUD Row */}
            <div className="flex justify-between items-start z-30 relative w-full h-full">
              
              {/* Top Left: System Logs */}
              <div className="flex flex-col gap-1 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                {['SYS_INIT: OK', 'AERO_MAP: ACTIVE', 'KERS_SYNC: 100%', 'TEL_LINK: STABLE'].map((log, i) => (
                  <motion.div 
                    key={log}
                    custom={i}
                    variants={glitchVariant}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-2"
                  >
                    <span className="text-white drop-shadow-[2px_0_0_rgba(255,0,255,0.8),-2px_0_0_rgba(0,255,255,0.8)]">
                      {log.split(':')[0]}:
                    </span>
                    <span className="text-magenta-400 text-fuchsia-500 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
                      {log.split(':')[1]}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Top Right: Countdown Timer */}
              <div className="flex flex-col items-end">
                <span className="text-white/50 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1 drop-shadow-[1px_0_0_rgba(255,0,255,0.5),-1px_0_0_rgba(0,255,255,0.5)]">
                  Pit Sequence
                </span>
                <motion.div 
                  className="text-6xl sm:text-8xl md:text-9xl font-mono font-bold tabular-nums tracking-tighter"
                  animate={{
                    color: countdown === 0 ? "#22c55e" : "#f1f5f9",
                    scale: countdown === 0 ? [1, 1.1, 1] : 1,
                    textShadow: countdown === 0 
                      ? "0 0 20px rgba(34,197,94,0.8), 4px 0 0 rgba(255,0,255,0.8), -4px 0 0 rgba(0,255,255,0.8)" 
                      : "0 0 20px rgba(255,255,255,0.3), 3px 0 0 rgba(255,0,255,0.8), -3px 0 0 rgba(0,255,255,0.8)"
                  }}
                  transition={{ duration: 0.1 }} // Snappy color change
                >
                  {countdown.toFixed(1)}
                </motion.div>
              </div>

            </div>

            {/* Bottom HUD Row */}
            <div className="flex justify-center items-end z-30 relative w-full pb-8">
               {/* Center Bottom: Z-Mode Indicator */}
               <motion.div 
                 className="flex flex-col items-center gap-2"
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               >
                 <div className="relative flex items-center justify-center size-16 border-2 border-blue-500 rounded-full bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.6)] backdrop-blur-md">
                   {/* Inner Pulsing Ring */}
                   <motion.div 
                     className="absolute inset-0 border border-blue-400 rounded-full"
                     animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                   />
                   <span className="text-blue-400 font-bold font-mono text-xl tracking-tighter drop-shadow-[2px_0_0_rgba(255,0,255,0.8),-2px_0_0_rgba(0,255,255,0.8)]">
                     Z
                   </span>
                 </div>
                 <span className="text-blue-400 font-mono text-xs tracking-widest drop-shadow-[1px_0_0_rgba(255,0,255,0.8),-1px_0_0_rgba(0,255,255,0.8)]">
                   ACTIVE AERO
                 </span>
               </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
