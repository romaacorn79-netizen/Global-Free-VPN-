import React, { useState } from 'react';
import { VpnProvider, useVpn } from './context/VpnContext';
import { Header } from './components/Header';
import { ConnectConsole } from './components/ConnectConsole';
import { WorldMap } from './components/WorldMap';
import { ServerList } from './components/ServerList';
import { ConfigModal } from './components/ConfigModal';
import { SecuritySettingsModal } from './components/SecuritySettingsModal';
import { LeakTestModal } from './components/LeakTestModal';
import { DiagnosticLogsModal } from './components/DiagnosticLogsModal';
import { ProxyTester } from './components/ProxyTester';
import { VpnServer } from './types/vpn';
import { 
  ShieldCheck, 
  Globe2, 
  Zap, 
  FileCode2, 
  Activity, 
  Terminal, 
  Sliders, 
  Lock,
  Heart
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { selectedServer } = useVpn();

  // Modals state
  const [configModalServer, setConfigModalServer] = useState<VpnServer | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLeakTestModal, setShowLeakTestModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  // Active view tab (Map View vs Server Directory vs Gateway Tester)
  const [activeTab, setActiveTab] = useState<'servers' | 'map' | 'proxy'>('servers');

  const scrollToServers = () => {
    setActiveTab('servers');
    const el = document.getElementById('server-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950 antialiased">
      
      {/* Top Navigation */}
      <Header
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenConfigModal={() => setConfigModalServer(selectedServer)}
        onOpenLeakTest={() => setShowLeakTestModal(true)}
        onOpenLogs={() => setShowLogsModal(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Central Tactile Hero Console */}
        <section id="connect-console-section">
          <ConnectConsole onSelectServerClick={scrollToServers} />
        </section>

        {/* Navigation Tabs for Views */}
        <section id="server-section" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-zinc-900">
            <div className="flex items-center p-1 bg-zinc-900/90 rounded-2xl border border-zinc-800">
              <button
                id="view-tab-servers"
                onClick={() => setActiveTab('servers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'servers'
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Worldwide Servers</span>
              </button>

              <button
                id="view-tab-map"
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'map'
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Global Map</span>
              </button>

              <button
                id="view-tab-proxy"
                onClick={() => setActiveTab('proxy')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'proxy'
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Web Gateway Sandbox</span>
              </button>
            </div>

            {/* Quick Helper Links */}
            <div className="flex items-center gap-2 text-xs">
              <button
                id="footer-quick-logs-btn"
                onClick={() => setShowLogsModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tunnel Daemon Logs</span>
              </button>
              
              <button
                id="footer-quick-leak-btn"
                onClick={() => setShowLeakTestModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy Audit</span>
              </button>
            </div>
          </div>

          {/* Active View Content */}
          {activeTab === 'servers' && (
            <div className="animate-in fade-in duration-200">
              <ServerList onOpenConfigForServer={server => setConfigModalServer(server)} />
            </div>
          )}

          {activeTab === 'map' && (
            <div className="animate-in fade-in duration-200">
              <WorldMap />
            </div>
          )}

          {activeTab === 'proxy' && (
            <div className="animate-in fade-in duration-200">
              <ProxyTester />
            </div>
          )}
        </section>

        {/* Global Security Value Props */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <Lock className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Military Grade 256-bit</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Powered by ChaCha20-Poly1305 and AES-256-GCM ciphers, safeguarding your traffic against ISP and government surveillance.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Strict Zero-Logs</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All servers operate in volatile RAM disks with reboot-to-wipe configuration. No browsing history, IPs, or connection timestamps are stored.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-cyan-400">
              <Zap className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">10 Gbps Free Bandwidth</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No bandwidth caps, no speed throttling, and no credit card or account registration required. Built for the open internet.
            </p>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <FileCode2 className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Open Standards</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Download native WireGuard (.conf) and OpenVPN (.ovpn) config profiles to run on Windows, Mac, Android, iOS, and Linux.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Global Free VPN • Worldwide Community Mesh Network</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>WireGuard® Registered</span>
            <span>•</span>
            <span>OpenVPN Certified</span>
            <span>•</span>
            <span>100% Free Forever</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {configModalServer && (
        <ConfigModal
          server={configModalServer}
          onClose={() => setConfigModalServer(null)}
        />
      )}

      {showSettingsModal && (
        <SecuritySettingsModal
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showLeakTestModal && (
        <LeakTestModal
          onClose={() => setShowLeakTestModal(false)}
        />
      )}

      {showLogsModal && (
        <DiagnosticLogsModal
          onClose={() => setShowLogsModal(false)}
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <VpnProvider>
      <MainAppContent />
    </VpnProvider>
  );
}
