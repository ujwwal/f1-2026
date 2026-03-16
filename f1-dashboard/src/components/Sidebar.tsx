import React from 'react';
import { Activity, Route, Wind, Zap, Settings, User } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-16 flex-shrink-0 flex flex-col items-center py-4 bg-primary/10 border-r border-primary/20 gap-8 h-full z-20">
      <div className="size-8 text-primary">
        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
        </svg>
      </div>
      <nav className="flex flex-col gap-6">
        <a aria-label="Live Telemetry" className="p-2 rounded-lg bg-primary/20 text-primary relative group" href="#">
          <Activity size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Live Telemetry</div>
        </a>
        <a aria-label="Race Strategy" className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors relative group" href="#">
          <Route size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Race Strategy</div>
        </a>
        <a aria-label="Aero Dynamics" className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors relative group" href="#">
          <Wind size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Aero Dynamics</div>
        </a>
        <a aria-label="Energy Systems" className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors relative group" href="#">
          <Zap size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Energy Systems</div>
        </a>
        <a aria-label="Settings" className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors relative group" href="#">
          <Settings size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Settings</div>
        </a>
      </nav>
      <div className="mt-auto">
        <button className="size-10 rounded-full bg-primary/30 flex items-center justify-center overflow-hidden border border-primary/50 relative group">
          <User className="text-primary" size={20} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity">Profile</div>
        </button>
      </div>
    </div>
  );
};
