import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '../data/mockData';

export const Regulations: React.FC = () => {
  // Toggle between modes for demonstration
  const [aeroMode, setAeroMode] = useState(mockData.aeroState);

  useEffect(() => {
    const interval = setInterval(() => {
      setAeroMode(prev => prev === "Z-MODE" ? "X-MODE" : "Z-MODE");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const wingColor = aeroMode === "Z-MODE" ? "#3b82f6" : "#f97316";
  const wingGlow = aeroMode === "Z-MODE" ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]";

  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      {/* Power Unit Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col relative group overflow-hidden">
        <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-4 flex justify-between items-center">
          PU Output
          <Gauge className="text-primary" size={16} />
        </h3>
        <div className="flex-1 flex items-end justify-center gap-6 pb-2">
          {/* ICE Bar */}
          <div className="w-10 h-full flex flex-col justify-end relative">
            <div className="text-[10px] text-slate-400 font-mono text-center mb-1 absolute -top-5 left-1/2 -translate-x-1/2">ICE</div>
            <div className="w-full bg-slate-800 rounded-sm h-[120px] relative overflow-hidden border border-slate-700">
              <motion.div 
                className="absolute bottom-0 w-full bg-blue-500/80"
                initial={{ height: 0 }}
                animate={{ height: `${mockData.icePower}%` }}
                transition={{ duration: 1, type: "spring" }}
              />
            </div>
            <div className="text-[10px] font-mono text-center mt-1 text-blue-400">{mockData.icePower}%</div>
          </div>
          
          {/* MGU-K (Electric) Bar */}
          <div className="w-10 h-full flex flex-col justify-end relative">
            <div className="text-[10px] text-slate-400 font-mono text-center mb-1 absolute -top-5 left-1/2 -translate-x-1/2">ELEC</div>
            <div className="w-full bg-slate-800 rounded-sm h-[120px] relative overflow-hidden border border-slate-700">
              <motion.div 
                className="absolute bottom-0 w-full bg-primary shadow-[0_0_15px_rgba(175,37,244,0.8)]"
                initial={{ height: 0 }}
                animate={{ height: `${mockData.elecPower}%`, opacity: [1, 0.7, 1] }}
                transition={{ 
                  height: { duration: 1, type: "spring" },
                  opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
              >
                {/* Stripes effect */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:10px_10px]"></div>
              </motion.div>
            </div>
            <div className="text-[10px] font-mono text-center mt-1 text-primary font-bold">{mockData.elecPower}%</div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-center text-slate-500 font-mono border-t border-primary/10 pt-2">
          MODE: OVERTAKE
        </div>
      </div>

      {/* Active Aero Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-between relative">
        <div className="w-full flex justify-between items-start mb-2">
          <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Active Aero
          </h3>
          <AnimatePresence mode="wait">
            <motion.span 
              key={aeroMode}
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`px-2 py-0.5 rounded text-[9px] font-mono border font-bold ${aeroMode === 'Z-MODE' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`}
            >
              {aeroMode}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* F1 Car Silhouette SVG */}
        <div className="flex-1 w-full relative flex items-center justify-center">
          <svg className="w-24 h-auto opacity-80" viewBox="0 0 100 200">
            {/* Main Body */}
            <path d="M 40 30 C 40 20, 60 20, 60 30 L 65 80 C 70 100, 70 140, 65 160 L 60 180 C 60 190, 40 190, 40 180 L 35 160 C 30 140, 30 100, 35 80 Z" fill="#334155" />
            
            {/* Front Wing */}
            <motion.path 
              className={wingGlow}
              d="M 20 25 C 20 20, 80 20, 80 25 L 85 35 L 15 35 Z" 
              animate={{ fill: wingColor }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Rear Wing */}
            <motion.path 
              className={wingGlow}
              d="M 25 175 C 25 170, 75 170, 75 175 L 80 185 L 20 185 Z" 
              animate={{ fill: wingColor }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Wheels */}
            <rect fill="#1e293b" height="25" rx="2" width="10" x="15" y="45" />
            <rect fill="#1e293b" height="25" rx="2" width="10" x="75" y="45" />
            <rect fill="#1e293b" height="28" rx="2" width="12" x="18" y="135" />
            <rect fill="#1e293b" height="28" rx="2" width="12" x="70" y="135" />
            
            {/* Cockpit */}
            <path d="M 45 80 C 45 70, 55 70, 55 80 L 58 110 C 58 120, 42 120, 42 110 Z" fill="#0f172a" />
          </svg>
        </div>
        
        <div className="w-full text-center mt-2">
          <motion.div 
            key={aeroMode}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] text-slate-400 font-mono"
          >
            STATUS: {aeroMode === "Z-MODE" ? "HIGH DOWNFORCE" : "LOW DRAG"}
          </motion.div>
          <div className="text-[9px] text-slate-500 font-mono mt-0.5">
            {aeroMode === "Z-MODE" ? "CORNERS: T1, T2, T3" : "STRAIGHTS: KEMMEL"}
          </div>
        </div>
      </div>
    </div>
  );
};
