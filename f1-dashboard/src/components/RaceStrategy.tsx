import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceDot } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { mockData } from '../data/mockData';

export const RaceStrategy: React.FC = () => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="text-primary" size={18} />
            Pace vs. Tyre Age
          </h2>
          <p className="text-xs text-slate-400 mt-1">C3(S) / C2(M) / C1(H) Model</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1"><span className="w-3 h-1 bg-red-500 rounded-full"></span><span className="text-[10px] text-slate-400 font-mono">SOFT</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-1 bg-yellow-500 rounded-full"></span><span className="text-[10px] text-slate-400 font-mono">MED</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-1 bg-white rounded-full"></span><span className="text-[10px] text-slate-400 font-mono">HARD</span></div>
        </div>
      </div>

      {/* Recharts Area */}
      <div className="h-48 relative w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData.tyrePace} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#334155" vertical={false} />
            <XAxis dataKey="lap" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.toFixed(1)} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '12px' }}
              itemStyle={{ fontFamily: 'monospace' }}
            />
            
            {/* Pit Window Highlight */}
            <ReferenceArea x1="L15" x2="L30" strokeOpacity={0.3} fill="#af25f4" fillOpacity={0.15} />

            {/* Current Position Marker */}
            <ReferenceDot x="L15" y={90} r={5} fill="#eab308" stroke="none" className="animate-pulse drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />

            <Line type="monotone" dataKey="soft" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={2000} />
            <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={2000} />
            <Line type="monotone" dataKey="hard" stroke="#ffffff" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={2000} />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Pit window label overlay */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 pt-2 pointer-events-none">
          <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase bg-background-dark/80 px-2 rounded">Pit Window</span>
        </div>
      </div>

      {/* Tyre Life Gauge */}
      <div className="mt-2 flex items-center justify-between bg-primary/5 rounded-lg p-3 border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="relative size-12 flex items-center justify-center">
            <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" strokeWidth="3"
              />
              <motion.path
                className="drop-shadow-[0_0_3px_rgba(249,115,22,0.8)]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" 
                stroke={mockData.tyreLife > 50 ? "#22c55e" : "#f97316"} 
                strokeWidth="3"
                strokeDasharray={`${mockData.tyreLife}, 100`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: mockData.tyreLife / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] font-mono font-bold text-orange-400">
              {mockData.tyreLife}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">CURRENT SET: <span className="text-yellow-500 font-bold">MEDIUM (C2)</span></div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">EST. DROP-OFF IN: 6 LAPS</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 font-mono">STINT LAPS</div>
          <div className="text-lg text-slate-200 font-mono font-bold">{mockData.stintLaps}</div>
        </div>
      </div>
    </div>
  );
};
