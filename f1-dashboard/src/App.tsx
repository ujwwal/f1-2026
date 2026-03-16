import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LiveTelemetry } from './components/LiveTelemetry';
import { RaceStrategy } from './components/RaceStrategy';
import { Regulations } from './components/Regulations';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
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
    </div>
  );
}

export default App;
