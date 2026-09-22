import React, { useState, useEffect } from 'react';
import { 
  Power, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Wifi, 
  ArrowDown, 
  ArrowUp, 
  Clock, 
  Database, 
  Lock, 
  Server,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { formatBytes, formatDuration, getPingColor, getLoadColor } from '../utils/formatters';

interface ConnectConsoleProps {
  onSelectServerClick: () => void;
}

export const ConnectConsole: React.FC<ConnectConsoleProps> = ({ onSelectServerClick }) => {
  const { 
    status, 
    selectedServer, 
    metrics, 
    settings, 
    handshakeStep, 
    toggleConnect, 
    selectFastestServer 
  } = useVpn();

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';
  const isDisconnecting = status === 'disconnecting';

  const pingColors = getPingColor(metrics.currentPingMs);
  const loadColors = getLoadColor(selectedServer.loadPercent);

  // Sparkline history for live traffic speed
  const [speedHistory, setSpeedHistory] = useState<number[]>([20, 25, 30, 22, 28, 35, 40, 38, 45, 52]);

  useEffect(() => {
    if (isConnected) {
      setSpeedHistory(prev => [...prev.slice(1), Math.round(metrics.downloadSpeedMbps)]);
    } else {
      setSpeedHistory([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }, [metrics.downloadSpeedMbps, isConnected]);

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isConnected 
            ? 'bg-emerald-500/10' 
            : isConnecting 
              ? 'bg-cyan-500/15 animate-pulse' 
              : 'bg-zinc-800/20'
        }`} 
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column: Selected Server card & quick switch */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" /> Target Gateway
            </span>
            <button
              id="change-server-link-btn"
              onClick={onSelectServerClick}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
            >
              <span>Change Server</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div 
            onClick={onSelectServerClick}
            className="group cursor-pointer bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl shadow-sm select-none">{selectedServer.flag}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {selectedServer.city}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {selectedServer.country} • {selectedServer.continent}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg border ${pingColors.bg} ${pingColors.text} ${pingColors.border}`}>
                {metrics.currentPingMs} ms
              </span>
            </div>

            {/* Server Load & Protocol info */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <span>Server Load</span>
                  <span className={`font-mono font-medium ${loadColors.text}`}>{selectedServer.loadPercent}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${loadColors.bar}`} 
                    style={{ width: `${selectedServer.loadPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-zinc-400 block mb-1">Protocol</span>
                <span className="font-mono text-zinc-300 font-medium uppercase bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
                  {settings.protocol}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Smart Route button */}
          <button
            id="smart-fastest-btn"
            onClick={selectFastestServer}
            className="w-full py-2.5 px-4 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auto-Connect Fastest Node</span>
          </button>
        </div>

        {/* Center column: Main Tactile Connect Dial */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center">
            
            {/* Outer animated ripple rings when connecting or connected */}
            {isConnected && (
              <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-emerald-500/20 animate-ping opacity-40 pointer-events-none" />
            )}
            {isConnecting && (
              <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-cyan-500/30 animate-spin border-t-transparent pointer-events-none" />
            )}

            {/* Glowing backdrop circle */}
            <div className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full p-3 transition-all duration-500 flex items-center justify-center ${
              isConnected 
                ? 'bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]'
                : isConnecting 
                  ? 'bg-cyan-500/10 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)]'
                  : isDisconnecting
                    ? 'bg-amber-500/10 border border-amber-500/30'
                    : 'bg-zinc-900/90 border border-zinc-800 shadow-inner'
            }`}>
              
              {/* Primary Connect Button */}
              <button
                id="main-vpn-toggle-btn"
                onClick={toggleConnect}
                disabled={isConnecting || isDisconnecting}
                aria-label={isConnected ? 'Disconnect VPN' : 'Connect VPN'}
                className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 focus:outline-none cursor-pointer ${
                  isConnected
                    ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/30'
                    : isConnecting
                      ? 'bg-gradient-to-b from-cyan-600 to-cyan-700 text-white cursor-wait animate-pulse'
                      : 'bg-gradient-to-b from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-lg'
                }`}
              >
                <Power className={`w-10 h-10 sm:w-12 sm:h-12 mb-1.5 transition-transform ${
                  isConnected ? 'scale-105' : 'text-zinc-400'
                }`} />
                <span className={`text-sm sm:text-base font-extrabold tracking-wider uppercase font-sans ${
                  isConnected ? 'text-zinc-950' : 'text-white'
                }`}>
                  {isConnected ? 'DISCONNECT' : isConnecting ? 'SECURING...' : 'CONNECT'}
                </span>
                <span className={`text-[10px] font-mono tracking-widest uppercase ${
                  isConnected ? 'text-zinc-900/80' : 'text-zinc-400'
                }`}>
                  {isConnected ? 'PROTECTED' : isConnecting ? 'HANDSHAKE' : 'TAP TO SECURE'}
                </span>
              </button>

            </div>
          </div>

          {/* Connection status message / Handshake ticker */}
          <div className="mt-4 text-center">
            {isConnecting || isDisconnecting ? (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono animate-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{handshakeStep}</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Tunnel Active • 100% Free Zero-Log</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Traffic Unshielded • Select Server & Connect</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Live Telemetry HUD */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Real-Time Telemetry
            </span>
            {isConnected && (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                LIVE 256-BIT
              </span>
            )}
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3.5">
            
            {/* Speed sparkline and numbers */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400" /> Download
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {isConnected ? metrics.downloadSpeedMbps.toFixed(1) : '0.0'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Mbps</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> Upload
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {isConnected ? metrics.uploadSpeedMbps.toFixed(1) : '0.0'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Mbps</span>
                </div>
              </div>
            </div>

            {/* Sparkline mini visualizer */}
            <div className="w-full h-8 flex items-end gap-1 px-1">
              {speedHistory.map((val, idx) => {
                const heightPercent = Math.max(12, Math.min(100, (val / 80) * 100));
                return (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all duration-300 ${
                      isConnected ? 'bg-gradient-to-t from-emerald-500/40 to-emerald-400' : 'bg-zinc-800'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                    title={`${val} Mbps`}
                  />
                );
              })}
            </div>

            {/* Session Stats list */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-800/60">
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">Duration</span>
                  <span className="font-mono font-medium">{formatDuration(metrics.sessionSeconds)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-300">
                <Database className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">Transferred</span>
                  <span className="font-mono font-medium">{formatBytes(metrics.totalDownloadedBytes + metrics.totalUploadedBytes)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-300 col-span-2 mt-1 pt-1.5 border-t border-zinc-800/40">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-zinc-400 font-mono truncate">
                  {metrics.encryptionCipher}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
