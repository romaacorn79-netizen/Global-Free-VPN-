import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Globe, 
  Settings, 
  FileCode2, 
  Activity, 
  RefreshCw, 
  Zap, 
  Tv, 
  Lock, 
  Share2 
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { VpnMode } from '../types/vpn';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenConfigModal: () => void;
  onOpenLeakTest: () => void;
  onOpenLogs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenConfigModal,
  onOpenLeakTest,
  onOpenLogs,
}) => {
  const { 
    status, 
    selectedServer, 
    realIp, 
    activeMode, 
    setActiveMode, 
    refreshRealIp 
  } = useVpn();

  const isConnected = status === 'connected';

  const modes: { id: VpnMode; label: string; icon: React.ReactNode }[] = [
    { id: 'ultra-fast', label: 'Ultra Fast', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'streaming', label: 'Streaming', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'privacy', label: 'Ultra Privacy', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'p2p', label: 'P2P / Torrent', icon: <Share2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10">
              <Globe className="w-5 h-5 animate-pulse" />
              <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-950 ${
                isConnected ? 'bg-emerald-400 ring-2 ring-emerald-500/40' : 'bg-amber-400'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-sans">
                  Global Free <span className="text-emerald-400">VPN</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-full tracking-wide uppercase">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Worldwide Zero-Log Community Mesh • No Account Required
              </p>
            </div>
          </div>

          {/* Mode Switcher - Hidden on very small screens, visible on md+ */}
          <div className="hidden lg:flex items-center p-1 bg-zinc-900/90 rounded-xl border border-zinc-800">
            {modes.map(mode => {
              const active = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  id={`vpn-mode-btn-${mode.id}`}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Real IP & Protection Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex flex-col items-end text-right bg-zinc-900/70 border border-zinc-800/80 px-3 py-1.5 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                  {isConnected ? 'Virtual IP (Shielded)' : 'Real IP (Exposed)'}:
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-200">
                  {isConnected ? selectedServer.ip : realIp.ip}
                </span>
                {!isConnected && (
                  <button 
                    id="refresh-real-ip-btn"
                    onClick={refreshRealIp}
                    title="Refresh Detected IP"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5"
                  >
                    <RefreshCw className={`w-3 h-3 ${realIp.loading ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {isConnected ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Encrypted via {selectedServer.city}
                  </span>
                ) : (
                  <span className="text-amber-400/90 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Unencrypted Connection
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                id="header-config-btn"
                onClick={onOpenConfigModal}
                title="Download WireGuard & OpenVPN Config Files"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              >
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Configs (.ovpn)</span>
              </button>

              <button
                id="header-leak-test-btn"
                onClick={onOpenLeakTest}
                title="IP, WebRTC & DNS Leak Detector"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Leak Test</span>
              </button>

              <button
                id="header-settings-btn"
                onClick={onOpenSettings}
                title="Security & Protocols"
                className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
