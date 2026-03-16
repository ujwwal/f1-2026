import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LiveTelemetry } from './components/LiveTelemetry';
import { RaceStrategy } from './components/RaceStrategy';
import { Regulations } from './components/Regulations';
import { LandingSequence } from './components/LandingSequence';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showLanding && (
          <LandingSequence 
            key="landing" 
            onComplete={() => setShowLanding(false)} 
          />
        )}
      </AnimatePresence>

      {!showLanding && (
        <motion.div 
          className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Sidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full auto-rows-min">
                {/* Left Column */}
                <LiveTelemetry />
                {/* Right Column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <RaceStrategy />
                  <Regulations />
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
