import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingSequenceProps {
  onComplete: () => void;
}

/* ─── SVG: Side-profile F1 car ─── */
const F1Car: React.FC<{ className?: string; braking?: boolean; glow?: string }> = ({ className = '', braking = false, glow = '#af25f4' }) => (
  <svg className={className} viewBox="0 0 520 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Underbody shadow */}
    <ellipse cx="260" cy="150" rx="220" ry="8" fill="rgba(0,0,0,0.5)" />

    {/* Main floor / diffuser */}
    <path d="M60 120 L80 130 L440 130 L460 120 L480 125 L40 125 Z" fill="#1e293b" />

    {/* Body shell */}
    <path d="M130 115 C130 95, 140 60, 180 50 L260 40 C290 38, 320 38, 350 42 L400 55 C420 62, 440 80, 445 100 L450 118 L130 118 Z"
      fill="#1e293b" stroke="#334155" strokeWidth="0.5" />

    {/* Cockpit halo + opening */}
    <path d="M230 50 L225 80 L240 95 L280 95 L295 80 L290 50 C275 44, 245 44, 230 50Z" fill="#0f172a" />
    <path d="M250 48 C258 46, 268 46, 276 48 L278 52 L248 52 Z" fill="#334155" stroke={glow} strokeWidth="0.5" opacity="0.8" />

    {/* Air intake / engine cover */}
    <path d="M300 42 L310 35 L320 35 L340 42" fill="none" stroke={glow} strokeWidth="1.5" opacity="0.6" />

    {/* Rear wing - main element */}
    <rect x="405" y="22" width="55" height="6" rx="1" fill="#334155" stroke={glow} strokeWidth="0.8" />
    <rect x="410" y="14" width="45" height="5" rx="1" fill="#1e293b" stroke={glow} strokeWidth="0.5" opacity="0.6" />
    {/* Rear wing endplates */}
    <rect x="403" y="12" width="3" height="22" rx="1" fill="#334155" />
    <rect x="458" y="12" width="3" height="22" rx="1" fill="#334155" />
    {/* Rear wing pillar */}
    <line x1="430" y1="28" x2="420" y2="55" stroke="#334155" strokeWidth="2" />

    {/* Front wing */}
    <path d="M55 115 L70 108 L130 108 L135 115 Z" fill="#334155" stroke={glow} strokeWidth="0.8" />
    <path d="M40 120 L55 112 L130 112 L130 117 L40 117 Z" fill="#1e293b" stroke={glow} strokeWidth="0.5" opacity="0.5" />
    {/* Front wing endplate */}
    <rect x="38" y="108" width="3" height="16" rx="1" fill="#334155" />

    {/* Side pod inlets */}
    <path d="M175 65 C175 60, 185 55, 195 62 L200 75 L180 80 Z" fill="#0f172a" stroke={glow} strokeWidth="0.5" opacity="0.4" />
    <path d="M165 70 C165 66, 175 60, 185 66 L190 78 L170 82 Z" fill="none" stroke={glow} strokeWidth="0.8" opacity="0.7" />

    {/* Accent line along body */}
    <path d="M130 105 L200 75 L350 60 L445 90" fill="none" stroke={glow} strokeWidth="1.5" opacity="0.8" />
    <path d="M130 108 L200 80 L350 65 L445 95" fill="none" stroke={glow} strokeWidth="0.5" opacity="0.3" />

    {/* Rear tire */}
    <g>
      <circle cx="400" cy="120" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <circle cx="400" cy="120" r="17" fill="#1a1a2e" />
      <circle cx="400" cy="120" r="8" fill="#334155" />
      {/* Tire tread marks */}
      <circle cx="400" cy="120" r="19" fill="none" stroke="#252540" strokeWidth="2" strokeDasharray="4 3" />
    </g>

    {/* Front tire */}
    <g>
      <circle cx="140" cy="120" r="18" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <circle cx="140" cy="120" r="14" fill="#1a1a2e" />
      <circle cx="140" cy="120" r="6" fill="#334155" />
      <circle cx="140" cy="120" r="16" fill="none" stroke="#252540" strokeWidth="2" strokeDasharray="3 3" />
    </g>

    {/* Brake glow */}
    {braking && (
      <>
        <circle cx="140" cy="120" r="10" fill="url(#brakeGlowGrad)" opacity="0.9" />
        <circle cx="400" cy="120" r="12" fill="url(#brakeGlowGrad)" opacity="0.7" />
      </>
    )}

    {/* Number plate */}
    <text x="310" y="90" fontFamily="monospace" fontSize="18" fontWeight="bold" fill={glow} opacity="0.9">04</text>

    {/* Exhaust / rear light */}
    <rect x="458" y="95" width="8" height="4" rx="1" fill="#ef4444" opacity={braking ? '1' : '0.4'} />
    {braking && <rect x="458" y="95" width="12" height="4" rx="1" fill="#ef4444" opacity="0.3" filter="blur(4px)" />}

    <defs>
      <radialGradient id="brakeGlowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

/* ─── Pit Crew figure silhouette ─── */
const PitCrew: React.FC<{ x: number; flip?: boolean; delay?: number; tool?: 'gun' | 'tire' | 'jack' }> = ({ x, flip = false, delay = 0, tool = 'gun' }) => (
  <motion.g
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    transform={`translate(${x}, 0) ${flip ? 'scale(-1,1)' : ''}`}
    style={{ transformOrigin: `${x}px 0px` }}
  >
    {/* Head */}
    <circle cx="0" cy="52" r="8" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
    {/* Helmet visor */}
    <rect x="-5" y="49" width="10" height="4" rx="2" fill="#af25f4" opacity="0.6" />
    {/* Body */}
    <path d="M-8 60 L-12 100 L12 100 L8 60 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
    {/* Team accent stripe */}
    <rect x="-3" y="62" width="6" height="38" rx="1" fill="#af25f4" opacity="0.15" />
    {/* Legs spread in action stance */}
    <path d="M-10 100 L-16 128 L-10 128" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
    <path d="M10 100 L16 128 L10 128" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
    {/* Arms */}
    {tool === 'gun' && (
      <>
        <path d="M-8 68 L-22 80 L-28 78" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <path d="M8 68 L22 80 L28 78" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        {/* Wheel gun */}
        <rect x="-32" y="74" width="10" height="6" rx="1" fill="#475569" />
        <circle cx="-36" cy="77" r="2" fill="#af25f4" opacity="0.8" />
      </>
    )}
    {tool === 'tire' && (
      <>
        <path d="M-8 68 L-18 85 L-14 90" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <path d="M8 68 L18 85 L14 90" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        {/* Carrying tire */}
        <circle cx="0" cy="92" r="12" fill="none" stroke="#334155" strokeWidth="4" />
        <circle cx="0" cy="92" r="6" fill="#1e293b" />
      </>
    )}
    {tool === 'jack' && (
      <>
        <path d="M-8 68 L-20 95 L-24 95" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <path d="M8 68 L4 90" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        {/* Jack */}
        <rect x="-30" y="90" width="16" height="6" rx="1" fill="#475569" />
        <rect x="-26" y="86" width="3" height="10" rx="1" fill="#64748b" />
      </>
    )}
  </motion.g>
);

/* ─── Speed line component ─── */
const SpeedLines: React.FC<{ count?: number; opacity?: number }> = ({ count = 30, opacity = 1 }) => {
  const lines = Array.from({ length: count }, (_, i) => ({
    y: Math.random() * 100,
    width: 40 + Math.random() * 200,
    delay: Math.random() * 0.5,
    opacity: 0.1 + Math.random() * 0.4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ top: `${line.y}%`, width: line.width, right: -line.width }}
          animate={{ x: [0, -(window.innerWidth + line.width * 2)] }}
          transition={{
            duration: 0.3 + Math.random() * 0.4,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export const LandingSequence: React.FC<LandingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'racing' | 'braking' | 'pitstop' | 'launch'>('racing');
  const [countdown, setCountdown] = useState(2.0);
  const [hudLogs, setHudLogs] = useState<string[]>([]);

  // Phase timings
  useEffect(() => {
    // Phase 1 → 2: Car braking
    const t1 = setTimeout(() => setPhase('braking'), 2500);
    // Phase 2 → 3: Pit stop
    const t2 = setTimeout(() => setPhase('pitstop'), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Pit stop countdown
  useEffect(() => {
    if (phase === 'pitstop') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0.1) {
            clearInterval(interval);
            setPhase('launch');
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // HUD log messages during pit stop
  useEffect(() => {
    if (phase === 'pitstop') {
      const logs = ['SYS_INIT: OK', 'TYRES: DEPLOYING', 'AERO_MAP: CALIBRATING', 'KERS_SYNC: 100%', 'TEL_LINK: ACTIVE'];
      logs.forEach((log, i) => {
        setTimeout(() => setHudLogs(prev => [...prev, log]), i * 400);
      });
    }
  }, [phase]);

  // Launch → complete
  useEffect(() => {
    if (phase === 'launch') {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const isRacing = phase === 'racing';
  const isBraking = phase === 'braking';
  const isPitStop = phase === 'pitstop';

  return (
    <AnimatePresence>
      {phase !== 'launch' && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-[#0a0a1a]"
          exit={{
            opacity: 0,
            scale: 1.3,
            filter: "brightness(3) blur(20px)",
          }}
          transition={{ duration: 1.2, ease: "anticipate" }}
        >
          {/* ── Scanlines ── */}
          <div
            className="absolute inset-0 pointer-events-none z-40 opacity-[0.06]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)' }}
          />

          {/* ── Speed Lines (phases 1 & 2) ── */}
          <AnimatePresence>
            {(isRacing || isBraking) && (
              <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <SpeedLines count={isRacing ? 40 : 10} opacity={isRacing ? 1 : 0.3} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Road / Pit Lane surface ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[35%] z-10">
            {/* Asphalt */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111125] to-[#0d0d1f]" />

            {/* Road lines scrolling */}
            <motion.div
              className="absolute bottom-[42%] left-0 right-0 h-[2px]"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #af25f4 0px, #af25f4 30px, transparent 30px, transparent 70px)',
                backgroundSize: '70px 2px',
              }}
              animate={isRacing || isBraking ? {
                backgroundPositionX: ['0px', '-700px'],
              } : {}}
              transition={isRacing ? {
                duration: 0.5,
                repeat: Infinity,
                ease: "linear",
              } : {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Pit box markings (appear during braking/pitstop) */}
            <AnimatePresence>
              {(isBraking || isPitStop) && (
                <motion.div
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[350px] h-[100px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Pit box outline */}
                  <div className="absolute inset-0 border-2 border-dashed border-yellow-500/30 rounded" />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500/60 text-[10px] font-mono tracking-[0.3em] uppercase">
                    Pit Box 04
                  </div>
                  {/* P marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500/20 text-6xl font-bold font-mono">
                    P
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ground glow under car during pit stop */}
            {isPitStop && (
              <motion.div
                className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[400px] h-[20px] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(175,37,244,0.3) 0%, transparent 70%)' }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </div>

          {/* ── F1 Car ── */}
          <motion.div
            className="absolute z-20"
            style={{ bottom: '22%', width: '420px' }}
            initial={{ x: '110vw' }}
            animate={
              isRacing
                ? { x: '60vw' }
                : isBraking
                  ? { x: 'calc(50vw - 210px)' }
                  : { x: 'calc(50vw - 210px)' }
            }
            transition={
              isRacing
                ? { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }
                : isBraking
                  ? { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.1 }
            }
          >
            {/* Motion blur effect during racing */}
            {isRacing && (
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{ filter: 'blur(8px)' }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              >
                <F1Car glow="#af25f4" />
              </motion.div>
            )}
            
            {/* Wheel spin animation wrapper */}
            <div className="relative">
              <F1Car braking={isBraking || isPitStop} glow="#af25f4" />
              
              {/* Tire smoke during braking */}
              {isBraking && (
                <>
                  <motion.div
                    className="absolute bottom-[18%] left-[22%] w-20 h-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0], y: [0, -20], x: [0, 30], scale: [0.5, 2] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ background: 'radial-gradient(ellipse, rgba(200,200,200,0.3) 0%, transparent 70%)' }}
                  />
                  <motion.div
                    className="absolute bottom-[18%] left-[72%] w-24 h-14"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: [0, -25], x: [0, 40], scale: [0.5, 2.5] }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    style={{ background: 'radial-gradient(ellipse, rgba(200,200,200,0.25) 0%, transparent 70%)' }}
                  />
                </>
              )}
            </div>
          </motion.div>

          {/* ── Pit Crew (Phase 3) ── */}
          <AnimatePresence>
            {isPitStop && (
              <motion.svg
                className="absolute z-30 pointer-events-none"
                style={{ bottom: '18%', left: 'calc(50% - 240px)', width: '480px', height: '140px' }}
                viewBox="-240 40 480 100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Front tire crew */}
                <PitCrew x={-150} delay={0.1} tool="gun" />
                <PitCrew x={-180} delay={0.3} tool="tire" />
                {/* Rear tire crew */}
                <PitCrew x={110} flip delay={0.15} tool="gun" />
                <PitCrew x={140} flip delay={0.35} tool="tire" />
                {/* Jack man at front */}
                <PitCrew x={-200} delay={0.05} tool="jack" />
                {/* Lollipop man */}
                <motion.g
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <circle cx="-130" cy="42" r="7" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                  <rect x="-133" y="30" width="6" height="14" rx="1" fill="#475569" />
                  {/* Lollipop sign */}
                  <circle cx="-130" cy="24" r="10" fill="none" stroke={countdown > 0.3 ? "#ef4444" : "#22c55e"} strokeWidth="2" />
                  <text x="-130" y="27" textAnchor="middle" fontSize="8" fontWeight="bold" fill={countdown > 0.3 ? "#ef4444" : "#22c55e"}>
                    {countdown > 0.3 ? "STOP" : "GO"}
                  </text>
                </motion.g>
              </motion.svg>
            )}
          </AnimatePresence>

          {/* ── HUD Overlay ── */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
            {/* Chromatic vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(175,37,244,0.08),inset_0_0_120px_rgba(0,255,255,0.05)]" />

            {/* Top row */}
            <div className="flex justify-between items-start relative z-40">

              {/* Phase label top-left */}
              <div className="flex flex-col gap-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/70"
                  >
                    {isRacing && '▸ APPROACHING PIT LANE'}
                    {isBraking && '▸ ENTERING PIT BOX'}
                    {isPitStop && '▸ PIT STOP IN PROGRESS'}
                  </motion.div>
                </AnimatePresence>

                {/* HUD logs during pit stop */}
                {isPitStop && (
                  <div className="mt-3 flex flex-col gap-0.5 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                    {hudLogs.map((log, i) => (
                      <motion.div
                        key={log}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-white drop-shadow-[2px_0_0_rgba(255,0,255,0.6),-2px_0_0_rgba(0,255,255,0.6)]">
                          {log.split(':')[0]}:
                        </span>
                        <span className="text-fuchsia-500 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
                          {log.split(':')[1]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Countdown timer (top-right) */}
              <div className="flex flex-col items-end">
                <span className="text-white/40 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-1 drop-shadow-[1px_0_0_rgba(255,0,255,0.4),-1px_0_0_rgba(0,255,255,0.4)]">
                  {isPitStop ? 'Pit Sequence' : 'Approaching'}
                </span>
                <AnimatePresence mode="wait">
                  {isPitStop ? (
                    <motion.div
                      key="countdown"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-6xl sm:text-8xl md:text-9xl font-mono font-bold tabular-nums tracking-tighter"
                      style={{
                        color: countdown === 0 ? '#22c55e' : '#f1f5f9',
                        textShadow: countdown === 0
                          ? '0 0 30px rgba(34,197,94,0.9), 4px 0 0 rgba(255,0,255,0.6), -4px 0 0 rgba(0,255,255,0.6)'
                          : '0 0 20px rgba(255,255,255,0.3), 3px 0 0 rgba(255,0,255,0.6), -3px 0 0 rgba(0,255,255,0.6)',
                      }}
                    >
                      {countdown.toFixed(1)}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="speed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-4xl sm:text-6xl font-bold tabular-nums text-white/80"
                      style={{
                        textShadow: '0 0 15px rgba(175,37,244,0.5), 3px 0 0 rgba(255,0,255,0.4), -3px 0 0 rgba(0,255,255,0.4)',
                      }}
                    >
                      <motion.span
                        animate={isRacing ? { opacity: [1, 0.7, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                      >
                        {isRacing ? '312' : isBraking ? '80' : '0'} <span className="text-lg sm:text-2xl text-white/50">km/h</span>
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-end relative z-40">
              {/* Team badge */}
              <div className="flex items-center gap-3">
                <div className="size-10 sm:size-12 rounded border border-primary/40 bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-primary font-mono font-bold text-lg sm:text-xl">04</span>
                </div>
                <div>
                  <div className="text-white/80 font-mono text-xs sm:text-sm tracking-wider font-semibold">CAR 04</div>
                  <div className="text-white/40 font-mono text-[10px] tracking-widest">SILVERSTONE GP</div>
                </div>
              </div>

              {/* Aero mode indicator */}
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <div className="relative flex items-center justify-center size-12 sm:size-14 border-2 border-blue-500 rounded-full bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.5)] backdrop-blur-md">
                  <motion.div
                    className="absolute inset-0 border border-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  />
                  <span className="text-blue-400 font-bold font-mono text-lg drop-shadow-[2px_0_0_rgba(255,0,255,0.6),-2px_0_0_rgba(0,255,255,0.6)]">Z</span>
                </div>
                <span className="text-blue-400 font-mono text-[10px] tracking-[0.3em] drop-shadow-[1px_0_0_rgba(255,0,255,0.6),-1px_0_0_rgba(0,255,255,0.6)]">
                  ACTIVE AERO
                </span>
              </motion.div>
            </div>
          </div>

          {/* ── GO flash on countdown complete ── */}
          <AnimatePresence>
            {isPitStop && countdown === 0 && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-8xl sm:text-[12rem] font-mono font-black text-green-500 drop-shadow-[0_0_60px_rgba(34,197,94,0.8)]">
                  GO
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── White flash on phase transitions ── */}
          <AnimatePresence>
            {isBraking && (
              <motion.div
                className="absolute inset-0 bg-white z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
