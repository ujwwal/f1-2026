import React from 'react';
import { motion } from 'framer-motion';
import { Map, Timer } from 'lucide-react';
import { mockData } from '../data/mockData';

export const LiveTelemetry: React.FC = () => {
  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Track Map Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col h-[300px] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-2 relative z-10">
          <div>
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Map className="text-primary" size={18} />
              Track Status
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">CAR 04 POS: P1</div>
            <div className="text-primary font-mono font-bold text-lg">LAP {mockData.stintLaps}/52</div>
          </div>
        </div>

        {/* SVG Track Map Placeholder & Framer Motion Dot */}
        <div className="flex-1 relative w-full flex items-center justify-center p-4">
          <svg className="w-full h-full opacity-60 drop-shadow-[0_0_8px_rgba(175,37,244,0.3)]" viewBox="0 0 800 400">
            {/* Track Line */}
            <path
              d="M 100 200 C 150 100, 250 50, 400 100 C 550 150, 650 50, 700 150 C 750 250, 600 350, 450 300 C 300 250, 200 350, 150 300 C 100 250, 50 300, 100 200"
              fill="none" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
            />
            {/* Racing Line */}
            <path
              className="opacity-40"
              d="M 100 200 C 150 100, 250 50, 400 100 C 550 150, 650 50, 700 150 C 750 250, 600 350, 450 300 C 300 250, 200 350, 150 300 C 100 250, 50 300, 100 200"
              fill="none" stroke="#af25f4" strokeDasharray="10 5" strokeWidth="2"
            />
            
            {/* Car Position Dot Animated along nodes */}
            <motion.circle
              className="drop-shadow-[0_0_10px_rgba(239,68,68,1)]"
              r="6"
              fill="#ef4444"
              animate={{
                cx: [100, 400, 700, 450, 150, 100],
                cy: [200, 100, 150, 300, 300, 200]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.text
              fill="#ef4444" fontFamily="monospace" fontSize="12" fontWeight="bold" textAnchor="middle"
              height={10}
              animate={{
                x: [100, 400, 700, 450, 150, 100],
                y: [185, 85, 135, 285, 285, 185]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              04
            </motion.text>

            {/* Sector Markers */}
            <line stroke="#af25f4" strokeWidth="2" x1="250" x2="250" y1="40" y2="70" />
            <text fill="#af25f4" fontFamily="monospace" fontSize="10" textAnchor="middle" x="250" y="30">S1</text>
            <line stroke="#af25f4" strokeWidth="2" x1="650" x2="680" y1="200" y2="200" />
            <text fill="#af25f4" fontFamily="monospace" fontSize="10" textAnchor="start" x="695" y="204">S2</text>
            <line stroke="#af25f4" strokeWidth="2" x1="200" x2="200" y1="360" y2="330" />
            <text fill="#af25f4" fontFamily="monospace" fontSize="10" textAnchor="middle" x="200" y="375">S3</text>
          </svg>
        </div>
      </div>

      {/* Sector Times Table */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden flex flex-col">
        <div className="p-3 bg-primary/10 border-b border-primary/20 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Timer className="text-primary" size={18} />
            Live Sector Times
          </h3>
          <span className="text-xs text-slate-400 font-mono">CAR 04</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm whitespace-nowrap">
            <thead className="bg-primary/5 text-slate-400 text-xs">
              <tr>
                <th className="px-4 py-2 font-normal">SECTOR</th>
                <th className="px-4 py-2 font-normal">TIME</th>
                <th className="px-4 py-2 font-normal">DELTA</th>
                <th className="px-4 py-2 font-normal">SPEED TRAP</th>
                <th className="px-4 py-2 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {mockData.sectors.map((sector) => {
                const colorMap = {
                  "PURPLE": "text-purple-400",
                  "GREEN": "text-green-400",
                  "YELLOW": "text-yellow-400"
                };
                const bgMap = {
                  "PURPLE": "bg-purple-500/20 text-purple-400 border-purple-500/30",
                  "GREEN": "bg-green-500/20 text-green-400 border-green-500/30",
                  "YELLOW": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                };
                const textColor = colorMap[sector.status as keyof typeof colorMap];
                const badgeClass = bgMap[sector.status as keyof typeof bgMap];

                return (
                  <motion.tr 
                    key={sector.id} 
                    className="hover:bg-primary/5 transition-colors"
                    initial={{ opacity: 0.5, backgroundColor: "rgba(175, 37, 244, 0)" }}
                    animate={{ opacity: 1, backgroundColor: ["rgba(175, 37, 244, 0.2)", "rgba(175, 37, 244, 0)"] }}
                    transition={{ duration: 1, delay: sector.id * 0.2 }}
                  >
                    <td className="px-4 py-3 text-slate-300">{sector.name}</td>
                    <td className={`px-4 py-3 font-bold ${textColor}`}>{sector.time}</td>
                    <td className={`px-4 py-3 ${textColor}`}>{sector.delta}</td>
                    <td className="px-4 py-3 text-slate-400">{sector.speedTrap}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs border ${badgeClass}`}>
                        {sector.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
