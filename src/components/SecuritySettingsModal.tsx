import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Radio, 
  Server, 
  Zap, 
  Check, 
  AlertTriangle,
  Globe,
  Wifi,
  Sliders
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { DNS_PROVIDERS } from '../data/servers';
import { ProtocolType } from '../types/vpn';

interface SecuritySettingsModalProps {
  onClose: () => void;
}

export const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({ onClose }) => {
  const { settings, updateSettings, status } = useVpn();

  const isConnected = status === 'connected';

  const protocols: { id: ProtocolType; title: string; speed: string; desc: string }[] = [
    {
      id: 'wireguard',
      title: 'WireGuard (Recommended)',
      speed: 'Ultra Fast (10 Gbps)',
      desc: 'Next-gen cryptography with ChaCha20-Poly1305. Instant handshake, minimal CPU usage.'
    },
    {
      id: 'openvpn-udp',
      title: 'OpenVPN (UDP)',
      speed: 'Fast & Balanced',
      desc: 'Industry gold-standard with AES-256-GCM cipher. Best for general browsing and gaming.'
    },
    {
      id: 'openvpn-tcp',
      title: 'OpenVPN (TCP)',
      speed: 'Moderate',
      desc: 'Guaranteed packet delivery. Bypasses strict office, campus, and hotel firewalls.'
    },
    {
      id: 'shadowsocks',
      title: 'Shadowsocks / Obfuscated',
      speed: 'Stealth Mode',
      desc: 'Disguises VPN traffic as normal HTTPS traffic to bypass deep packet inspection (DPI).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                Security & Tunnel Parameters
              </h3>
              <p className="text-xs text-zinc-400">
                Configure cryptographic protocols, DNS shields, and leak protection
              </p>
            </div>
          </div>

          <button
            id="close-settings-modal-btn"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* Protocol Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> VPN Tunnel Protocol
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {protocols.map(p => {
                const isSelected = settings.protocol === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => updateSettings({ protocol: p.id })}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 shadow-sm'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-zinc-200'}`}>
                        {p.title}
                      </h4>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/90 block mt-0.5">
                      {p.speed}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Security Toggles */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Defense & Leak Shields
            </label>

            <div className="space-y-2">
              {/* Kill Switch */}
              <div className="flex items-center justify-between p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-200">Internet Kill Switch</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">
                      CRITICAL
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Instantly blocks internet traffic if the VPN connection drops unexpectedly, preventing IP leaks.
                  </p>
                </div>
                <button
                  id="toggle-kill-switch-btn"
                  onClick={() => updateSettings({ killSwitch: !settings.killSwitch })}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    settings.killSwitch ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.killSwitch ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* DNS Leak Shield */}
              <div className="flex items-center justify-between p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-zinc-200">DNS Leak Protection</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Forces all domain name requests through encrypted zero-log DNS servers instead of your local ISP.
                  </p>
                </div>
                <button
                  id="toggle-dns-leak-shield-btn"
                  onClick={() => updateSettings({ dnsLeakShield: !settings.dnsLeakShield })}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    settings.dnsLeakShield ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.dnsLeakShield ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* WebRTC Blocker */}
              <div className="flex items-center justify-between p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-zinc-200">WebRTC Leak Shield</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Blocks WebRTC STUN/TURN browser queries that can accidentally reveal private LAN/WAN IPs.
                  </p>
                </div>
                <button
                  id="toggle-webrtc-shield-btn"
                  onClick={() => updateSettings({ webRtcBlock: !settings.webRtcBlock })}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    settings.webRtcBlock ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.webRtcBlock ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* DNS Provider Selector */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Zero-Log DNS Upstream
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DNS_PROVIDERS.map(dns => {
                const isSelected = settings.dnsProvider === dns.id;
                return (
                  <div
                    key={dns.id}
                    onClick={() => updateSettings({ dnsProvider: dns.id })}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 shadow-sm'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-zinc-200'}`}>
                        {dns.name}
                      </h4>
                      <span className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                        {dns.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                      {dns.primaryIp} • {dns.secondaryIp}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      {dns.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-end">
          <button
            id="settings-save-btn"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Save & Apply Settings
          </button>
        </div>

      </div>
    </div>
  );
};
