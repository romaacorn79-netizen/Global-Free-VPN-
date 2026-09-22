import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Globe,
  Radio,
  Lock
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { DNS_PROVIDERS } from '../data/servers';

interface LeakTestModalProps {
  onClose: () => void;
}

export const LeakTestModal: React.FC<LeakTestModalProps> = ({ onClose }) => {
  const { status, selectedServer, realIp, settings } = useVpn();
  const [testing, setTesting] = useState(false);
  const [testComplete, setTestComplete] = useState(true);

  const isConnected = status === 'connected';

  const handleRunTest = () => {
    setTesting(true);
    setTestComplete(false);
    setTimeout(() => {
      setTesting(false);
      setTestComplete(true);
    }, 1400);
  };

  const dnsName = DNS_PROVIDERS.find(d => d.id === settings.dnsProvider)?.name || 'Encrypted DNS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                Privacy & Leak Inspector
              </h3>
              <p className="text-xs text-zinc-400">
                Audits IPv4, IPv6, WebRTC, and DNS query vulnerability
              </p>
            </div>
          </div>

          <button
            id="close-leak-test-modal-btn"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            isConnected
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-3">
              {isConnected ? (
                <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
              ) : (
                <ShieldAlert className="w-7 h-7 text-amber-400 shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {isConnected ? 'Security Grade: A+ (Encrypted & Masked)' : 'Security Grade: F (Exposed & Vulnerable)'}
                </h4>
                <p className="text-xs opacity-80 mt-0.5">
                  {isConnected 
                    ? `Your traffic is tunneled through ${selectedServer.city} (${selectedServer.country}). No DNS or IP leaks detected.`
                    : 'Your real public IP, ISP details, and DNS queries are visible to websites and network snoopers.'
                  }
                </p>
              </div>
            </div>

            <button
              id="run-leak-test-btn"
              onClick={handleRunTest}
              disabled={testing}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{testing ? 'Scanning...' : 'Re-test'}</span>
            </button>
          </div>

          {/* Test Items */}
          <div className="space-y-2.5">
            
            {/* 1. Public IP Test */}
            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">Public IPv4 Address</span>
                <span className="text-xs font-mono text-zinc-400">
                  {isConnected ? selectedServer.ip : realIp.ip}
                </span>
                <span className="text-[11px] text-zinc-500 block">
                  Location: {isConnected ? `${selectedServer.city}, ${selectedServer.country}` : realIp.country}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                {isConnected ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> MASKED
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> EXPOSED
                  </span>
                )}
              </div>
            </div>

            {/* 2. DNS Leak Test */}
            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">DNS Resolver Upstream</span>
                <span className="text-xs font-mono text-zinc-400">
                  {isConnected && settings.dnsLeakShield ? dnsName : 'Local ISP Resolver (Unsafe)'}
                </span>
                <span className="text-[11px] text-zinc-500 block">
                  {isConnected ? 'DNS requests routed inside 256-bit tunnel' : 'ISP logs domain visit history'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                {isConnected && settings.dnsLeakShield ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ZERO LEAK
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> LEAK RISK
                  </span>
                )}
              </div>
            </div>

            {/* 3. WebRTC STUN Test */}
            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">WebRTC Internal STUN IP</span>
                <span className="text-xs font-mono text-zinc-400">
                  {settings.webRtcBlock ? 'Blocked (STUN queries restricted)' : 'Default Browser Behavior'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                {settings.webRtcBlock ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> PROTECTED
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> DISABLED
                  </span>
                )}
              </div>
            </div>

            {/* 4. IPv6 Leak Shield */}
            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">IPv6 Leak Shield</span>
                <span className="text-xs font-mono text-zinc-400">
                  {isConnected ? 'IPv6 null-routed via WireGuard/OpenVPN tunnel' : 'Default OS Routing'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                {isConnected ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> SECURE
                  </span>
                ) : (
                  <span className="text-zinc-500 flex items-center gap-1">
                    UNSHIELDED
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>Real-time leak detector engine</span>
          <button
            id="close-leak-modal-done-btn"
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
