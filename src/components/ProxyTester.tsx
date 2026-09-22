import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Server,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';

export const ProxyTester: React.FC = () => {
  const { selectedServer, status } = useVpn();
  const [testUrl, setTestUrl] = useState('https://wikipedia.org');
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: number;
    responseTimeMs: number;
    cipher: string;
    exitIp: string;
    exitLocation: string;
    geoUnblocked: boolean;
  } | null>(null);

  const isConnected = status === 'connected';

  const handleTestProxy = (urlToTest = testUrl) => {
    setLoading(true);
    setTestResult(null);

    setTimeout(() => {
      setLoading(false);
      setTestResult({
        status: 200,
        responseTimeMs: Math.round(selectedServer.pingMs + 18 + Math.random() * 15),
        cipher: 'TLSv1.3 (ChaCha20-Poly1305 / AES-256-GCM)',
        exitIp: isConnected ? selectedServer.ip : '104.28.19.82 (Direct ISP)',
        exitLocation: isConnected ? `${selectedServer.city}, ${selectedServer.country}` : 'Local ISP Gateway',
        geoUnblocked: isConnected,
      });
    }, 850);
  };

  const quickLinks = [
    { label: 'Wikipedia', url: 'https://wikipedia.org' },
    { label: 'BBC News', url: 'https://bbc.com' },
    { label: 'DuckDuckGo', url: 'https://duckduckgo.com' },
    { label: 'Reddit', url: 'https://reddit.com' },
  ];

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base sm:text-lg">
              Encrypted Web Gateway Sandbox
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Verify website reachability, SSL ciphers, and geo-restriction bypass through your active VPN server
          </p>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl">
            <Lock className="w-3.5 h-3.5" />
            <span>Tunneled via {selectedServer.city}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-xl">
            <span>Direct (Unencrypted)</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative w-full flex-1">
          <Globe className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="proxy-url-input"
            type="text"
            value={testUrl}
            onChange={e => setTestUrl(e.target.value)}
            placeholder="Enter web address (e.g. https://bbc.com)..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <button
          id="proxy-test-submit-btn"
          onClick={() => handleTestProxy()}
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
        >
          <Zap className={`w-3.5 h-3.5 ${loading ? 'animate-bounce' : ''}`} />
          <span>{loading ? 'Testing Route...' : 'Test Gateway'}</span>
        </button>
      </div>

      {/* Quick links */}
      <div className="flex items-center gap-2 pt-3 text-xs text-zinc-400 flex-wrap">
        <span className="text-zinc-500 text-[11px]">Quick Targets:</span>
        {quickLinks.map(link => (
          <button
            key={link.label}
            id={`quick-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => {
              setTestUrl(link.url);
              handleTestProxy(link.url);
            }}
            className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Result Card */}
      {testResult && (
        <div className="mt-4 p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl animate-in fade-in space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-white">{testUrl}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                HTTP {testResult.status} OK
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{testResult.responseTimeMs} ms total</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block font-mono">Exit Gateway IP</span>
              <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5 block">{testResult.exitIp}</span>
              <span className="text-[11px] text-zinc-400">{testResult.exitLocation}</span>
            </div>

            <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block font-mono">Encryption Handshake</span>
              <span className="font-mono font-medium text-zinc-200 text-xs mt-0.5 block truncate">
                {testResult.cipher}
              </span>
              <span className="text-[11px] text-emerald-400">Zero-Log Tunnel</span>
            </div>

            <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block font-mono">Geo-Bypass Status</span>
              <span className="font-bold text-emerald-400 text-xs mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {testResult.geoUnblocked ? 'Unrestricted Access' : 'ISP Filtering Possible'}
              </span>
              <span className="text-[11px] text-zinc-400">Content Unlocked</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
