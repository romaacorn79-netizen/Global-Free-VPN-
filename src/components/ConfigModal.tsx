import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode2, 
  ShieldCheck, 
  Terminal, 
  Smartphone, 
  Laptop, 
  HelpCircle 
} from 'lucide-react';
import { VpnServer } from '../types/vpn';

interface ConfigModalProps {
  server: VpnServer;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ server, onClose }) => {
  const [configType, setConfigType] = useState<'wireguard' | 'openvpn'>('wireguard');
  const [copied, setCopied] = useState(false);
  const [activeOsTab, setActiveOsTab] = useState<'windows' | 'mac' | 'android' | 'ios' | 'linux'>('windows');

  const configText = configType === 'wireguard' 
    ? (server.wireguardConfig || '') 
    : (server.ovpnConfig || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const extension = configType === 'wireguard' ? 'conf' : 'ovpn';
    const filename = `FreeVPN-${server.city.replace(/\s+/g, '')}-${server.countryCode}.${extension}`;
    const blob = new Blob([configText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{server.flag}</span>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  Free VPN Config: {server.city}, {server.country}
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Direct native profile export • Compatible with official OpenVPN & WireGuard apps
              </p>
            </div>
          </div>

          <button
            id="close-config-modal-btn"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 bg-zinc-900 border-b border-zinc-800/80 gap-3">
          <div className="flex items-center gap-2">
            <button
              id="tab-wireguard-config"
              onClick={() => setConfigType('wireguard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                configType === 'wireguard'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-800/60'
              }`}
            >
              WireGuard (.conf)
            </button>
            <button
              id="tab-openvpn-config"
              onClick={() => setConfigType('openvpn')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                configType === 'openvpn'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-800/60'
              }`}
            >
              OpenVPN (.ovpn)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-config-btn"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              id="download-config-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Monospace Config Code Viewer */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="relative">
            <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed max-h-56 select-all scrollbar-thin">
              {configText}
            </pre>
            <span className="absolute top-2.5 right-3 text-[10px] font-mono text-zinc-500 uppercase">
              {configType === 'wireguard' ? 'ChaCha20-Poly1305' : 'AES-256-GCM'}
            </span>
          </div>

          {/* Quick Setup Instructions across Platforms */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> How to connect on your device
              </h4>
              
              <div className="flex items-center gap-1 text-xs">
                {(['windows', 'mac', 'android', 'ios', 'linux'] as const).map(os => (
                  <button
                    key={os}
                    id={`setup-os-tab-${os}`}
                    onClick={() => setActiveOsTab(os)}
                    className={`px-2 py-0.5 rounded capitalize text-[11px] font-medium transition-colors ${
                      activeOsTab === os
                        ? 'bg-zinc-800 text-emerald-400 font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {os}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              {activeOsTab === 'windows' && (
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Download the official free <b className="text-zinc-200">WireGuard for Windows</b> or <b className="text-zinc-200">OpenVPN GUI</b>.</li>
                  <li>Click <b className="text-emerald-400">Download File</b> above to save the <code className="text-emerald-300 font-mono">.{configType === 'wireguard' ? 'conf' : 'ovpn'}</code> file.</li>
                  <li>In the app, select <b className="text-zinc-200">Import tunnel(s) from file</b> and choose the downloaded file.</li>
                  <li>Click <b className="text-zinc-200">Activate</b>. Your entire computer is now encrypted via {server.city}!</li>
                </ol>
              )}

              {activeOsTab === 'mac' && (
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Download <b className="text-zinc-200">WireGuard</b> from the Mac App Store (or Tunnelblick for OpenVPN).</li>
                  <li>Click <b className="text-emerald-400">Download File</b> above to get the configuration.</li>
                  <li>Import the profile into the WireGuard menu bar app and click <b className="text-zinc-200">Activate</b>.</li>
                </ol>
              )}

              {activeOsTab === 'android' && (
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Install <b className="text-zinc-200">WireGuard</b> or <b className="text-zinc-200">OpenVPN Connect</b> from Google Play Store (100% free, no ads).</li>
                  <li>Download the config file on your phone, open the VPN app, and tap the <b className="text-zinc-200">(+)</b> button to import.</li>
                  <li>Toggle connection to secure your mobile data & Wi-Fi.</li>
                </ol>
              )}

              {activeOsTab === 'ios' && (
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Install <b className="text-zinc-200">WireGuard</b> or <b className="text-zinc-200">OpenVPN Connect</b> from Apple App Store.</li>
                  <li>Download the config file in Safari, tap Share, and select WireGuard.</li>
                  <li>Grant iOS VPN profile permission and connect instantly.</li>
                </ol>
              )}

              {activeOsTab === 'linux' && (
                <div className="space-y-1 text-zinc-400 font-mono text-[11px] bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400"># Install wireguard and activate in 2 commands:</p>
                  <p className="text-emerald-400">sudo apt install wireguard resolvconf</p>
                  <p className="text-emerald-400">sudo wg-quick up ./FreeVPN-{server.city.replace(/\s+/g, '')}.conf</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Logs Community Server • Guaranteed Free Forever</span>
          </div>

          <button
            id="modal-done-btn"
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
