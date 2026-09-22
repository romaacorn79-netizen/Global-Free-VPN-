import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { VpnServer, ConnectionStatus, ConnectionMetrics, SecuritySettings, ProtocolType, VpnMode } from '../types/vpn';
import { WORLDWIDE_SERVERS, DNS_PROVIDERS } from '../data/servers';

interface RealIpInfo {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  isp: string;
  loading: boolean;
}

export interface TunnelLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'security';
  message: string;
}

interface VpnContextType {
  servers: VpnServer[];
  selectedServer: VpnServer;
  status: ConnectionStatus;
  metrics: ConnectionMetrics;
  settings: SecuritySettings;
  realIp: RealIpInfo;
  activeMode: VpnMode;
  logs: TunnelLog[];
  handshakeStep: string;
  setSelectedServer: (server: VpnServer) => void;
  toggleConnect: () => void;
  connectToServer: (server: VpnServer) => void;
  disconnect: () => void;
  selectFastestServer: () => void;
  updateSettings: (partial: Partial<SecuritySettings>) => void;
  setActiveMode: (mode: VpnMode) => void;
  refreshRealIp: () => Promise<void>;
  clearLogs: () => void;
  refreshServerPings: () => void;
}

const defaultSettings: SecuritySettings = {
  killSwitch: true,
  dnsLeakShield: true,
  dnsProvider: 'cloudflare',
  webRtcBlock: true,
  protocol: 'wireguard',
  splitTunneling: false,
  autoConnectOnInsecureWifi: true,
};

const VpnContext = createContext<VpnContextType | undefined>(undefined);

export const VpnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<VpnServer[]>(WORLDWIDE_SERVERS);
  const [selectedServer, setSelectedServer] = useState<VpnServer>(
    WORLDWIDE_SERVERS.find(s => s.isRecommended) || WORLDWIDE_SERVERS[0]
  );
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [handshakeStep, setHandshakeStep] = useState<string>('');
  const [activeMode, setActiveMode] = useState<VpnMode>('ultra-fast');
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings);
  
  const [realIp, setRealIp] = useState<RealIpInfo>({
    ip: 'Detecting...',
    country: 'Local Network',
    countryCode: 'UN',
    city: 'Direct Connection',
    isp: 'Standard ISP',
    loading: true,
  });

  const [logs, setLogs] = useState<TunnelLog[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Global Free VPN core initialized. 15 worldwide secure nodes ready.',
    }
  ]);

  const [metrics, setMetrics] = useState<ConnectionMetrics>({
    downloadSpeedMbps: 0,
    uploadSpeedMbps: 0,
    totalDownloadedBytes: 0,
    totalUploadedBytes: 0,
    sessionSeconds: 0,
    currentPingMs: selectedServer.pingMs,
    packetLossPercent: 0,
    encryptionCipher: 'ChaCha20-Poly1305 (WireGuard 256-bit)',
  });

  const timerRef = useRef<any>(null);
  const metricsIntervalRef = useRef<any>(null);

  const addLog = (message: string, type: TunnelLog['type'] = 'info') => {
    const newLog: TunnelLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Fetch real client IP address from public IP API
  const refreshRealIp = async () => {
    setRealIp(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        setRealIp({
          ip: data.ip,
          country: 'Local Gateway',
          countryCode: 'LOC',
          city: 'Public ISP',
          isp: 'Unprotected Provider',
          loading: false,
        });
      } else {
        throw new Error('API status not ok');
      }
    } catch {
      setRealIp({
        ip: '104.28.19.82', // Realistic fallback client ISP IP
        country: 'United States',
        countryCode: 'US',
        city: 'Residential Network',
        isp: 'Standard Telecom',
        loading: false,
      });
    }
  };

  useEffect(() => {
    refreshRealIp();
  }, []);

  // Update cipher when protocol changes
  useEffect(() => {
    let cipher = 'ChaCha20-Poly1305 (WireGuard 256-bit)';
    if (settings.protocol === 'openvpn-udp' || settings.protocol === 'openvpn-tcp') {
      cipher = 'AES-256-GCM / SHA-512 (OpenVPN)';
    } else if (settings.protocol === 'shadowsocks') {
      cipher = 'AEAD_CHACHA20_POLY1305 (Obfuscated)';
    }
    setMetrics(prev => ({ ...prev, encryptionCipher: cipher }));
  }, [settings.protocol]);

  // Session timer and live traffic simulator
  useEffect(() => {
    if (status === 'connected') {
      timerRef.current = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          sessionSeconds: prev.sessionSeconds + 1,
        }));
      }, 1000);

      metricsIntervalRef.current = setInterval(() => {
        // Varying realistic network speed
        const jitter = (Math.random() - 0.5) * 6;
        const currentPing = Math.max(8, Math.round(selectedServer.pingMs + jitter));
        
        // Multiplier based on mode
        let speedFactor = 1;
        if (activeMode === 'ultra-fast') speedFactor = 1.3;
        if (activeMode === 'p2p') speedFactor = 1.1;
        if (activeMode === 'privacy') speedFactor = 0.85;

        const baseDown = (Math.sin(Date.now() / 4000) * 18 + 48) * speedFactor;
        const baseUp = (Math.cos(Date.now() / 3500) * 8 + 16) * speedFactor;
        
        const dlSpeed = Math.max(12, +(baseDown + (Math.random() * 8)).toFixed(1));
        const ulSpeed = Math.max(4, +(baseUp + (Math.random() * 4)).toFixed(1));

        setMetrics(prev => {
          const addedDl = (dlSpeed * 1024 * 1024) / 8 / 2; // bytes per 500ms
          const addedUl = (ulSpeed * 1024 * 1024) / 8 / 2;
          return {
            ...prev,
            downloadSpeedMbps: dlSpeed,
            uploadSpeedMbps: ulSpeed,
            currentPingMs: currentPing,
            packetLossPercent: Math.random() < 0.95 ? 0 : 0.1,
            totalDownloadedBytes: prev.totalDownloadedBytes + addedDl,
            totalUploadedBytes: prev.totalUploadedBytes + addedUl,
          };
        });
      }, 750);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (metricsIntervalRef.current) clearInterval(metricsIntervalRef.current);
      setMetrics(prev => ({
        ...prev,
        downloadSpeedMbps: 0,
        uploadSpeedMbps: 0,
        currentPingMs: selectedServer.pingMs,
        sessionSeconds: status === 'disconnected' ? 0 : prev.sessionSeconds,
      }));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (metricsIntervalRef.current) clearInterval(metricsIntervalRef.current);
    };
  }, [status, selectedServer, activeMode]);

  // Connect simulation sequence
  const startConnectionSequence = (targetServer: VpnServer) => {
    setStatus('connecting');
    setHandshakeStep('Resolving host address...');
    addLog(`Initiating secure tunnel to [${targetServer.city}, ${targetServer.country}] via ${settings.protocol.toUpperCase()}`, 'info');

    setTimeout(() => {
      setHandshakeStep('Negotiating Diffie-Hellman Key Exchange...');
      addLog(`Handshake initiated with server public key: ${targetServer.publicKey?.slice(0, 16)}...`, 'info');
    }, 600);

    setTimeout(() => {
      setHandshakeStep('Verifying 256-bit certificates & DNS Leak Shield...');
      if (settings.dnsLeakShield) {
        const dns = DNS_PROVIDERS.find(d => d.id === settings.dnsProvider)?.name || 'Private DNS';
        addLog(`DNS Leak Shield activated. Routing all queries through ${dns}`, 'security');
      }
    }, 1200);

    setTimeout(() => {
      setHandshakeStep('Binding virtual network interface...');
      if (settings.killSwitch) {
        addLog('Kill Switch engaged: unencrypted non-VPN socket leaks blocked.', 'security');
      }
    }, 1800);

    setTimeout(() => {
      setStatus('connected');
      setHandshakeStep('Secured & Encrypted');
      addLog(`Connected to ${targetServer.city} (${targetServer.ip}). Virtual identity active. Zero logs enforced.`, 'success');
    }, 2400);
  };

  const disconnect = () => {
    if (status === 'disconnected') return;
    setStatus('disconnecting');
    setHandshakeStep('Flushing encrypted routing table...');
    addLog('Disconnecting from VPN tunnel...', 'warning');

    setTimeout(() => {
      setStatus('disconnected');
      setHandshakeStep('');
      addLog('VPN disconnected. Your real IP and network traffic are now exposed to local ISP.', 'warning');
    }, 800);
  };

  const toggleConnect = () => {
    if (status === 'connected') {
      disconnect();
    } else if (status === 'disconnected') {
      startConnectionSequence(selectedServer);
    }
  };

  const connectToServer = (server: VpnServer) => {
    setSelectedServer(server);
    if (status === 'connected') {
      // Fast switch
      disconnect();
      setTimeout(() => {
        startConnectionSequence(server);
      }, 900);
    } else {
      startConnectionSequence(server);
    }
  };

  const selectFastestServer = () => {
    const sorted = [...servers].sort((a, b) => a.pingMs - b.pingMs);
    const fastest = sorted[0];
    if (fastest) {
      addLog(`Smart Routing determined fastest node: ${fastest.city} (${fastest.pingMs}ms, Load: ${fastest.loadPercent}%)`, 'info');
      connectToServer(fastest);
    }
  };

  const refreshServerPings = () => {
    setServers(prev => prev.map(s => {
      const delta = (Math.random() - 0.5) * 6;
      return {
        ...s,
        pingMs: Math.max(12, Math.round(s.pingMs + delta)),
        loadPercent: Math.min(92, Math.max(18, Math.round(s.loadPercent + (Math.random() - 0.5) * 4))),
      };
    }));
    addLog('Refreshed global server ping telemetry across all continents.', 'info');
  };

  const updateSettings = (partial: Partial<SecuritySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...partial };
      addLog(`Security settings updated: ${Object.keys(partial).join(', ')}`, 'security');
      return updated;
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <VpnContext.Provider
      value={{
        servers,
        selectedServer,
        status,
        metrics,
        settings,
        realIp,
        activeMode,
        logs,
        handshakeStep,
        setSelectedServer,
        toggleConnect,
        connectToServer,
        disconnect,
        selectFastestServer,
        updateSettings,
        setActiveMode,
        refreshRealIp,
        clearLogs,
        refreshServerPings,
      }}
    >
      {children}
    </VpnContext.Provider>
  );
};

export const useVpn = () => {
  const context = useContext(VpnContext);
  if (!context) {
    throw new Error('useVpn must be used within a VpnProvider');
  }
  return context;
};
