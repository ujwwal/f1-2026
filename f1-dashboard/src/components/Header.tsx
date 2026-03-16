import React, { useState, useEffect } from 'react';
import { Flag } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].slice(0, 12) + " UTC");
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-background-dark/50 backdrop-blur-sm z-10 shrink-0">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100">Pit Wall Dashboard <span className="text-primary text-sm ml-2 font-mono">SILVERSTONE</span></h1>
        <p className="text-xs text-slate-400 font-mono mt-1">SYS_TIME: {time} | MODE: RACE</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE DATA
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-bold tracking-wide transition-colors flex items-center gap-2">
          <Flag size={16} />
          DEPLOY PIT WINDOW
        </button>
      </div>
    </header>
  );
};
