export type ProtocolType = 'wireguard' | 'openvpn-udp' | 'openvpn-tcp' | 'shadowsocks';

export type VpnMode = 'ultra-fast' | 'streaming' | 'privacy' | 'p2p';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export interface VpnServer {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  continent: 'Americas' | 'Europe' | 'Asia Pacific' | 'Middle East & Africa';
  flag: string;
  ip: string;
  port: number;
  protocol: ProtocolType;
  protocols: ProtocolType[];
  pingMs: number;
  loadPercent: number;
  speedMbps: number;
  isFree: boolean;
  isRecommended?: boolean;
  features: string[]; // e.g., ['P2P', 'Streaming', 'Anti-DDoS', 'No-Logs']
  // Coordinates for the interactive map (latitude, longitude normalized to SVG viewBox 0-1000, 0-500)
  mapCoords: { x: number; y: number };
  publicKey?: string;
  ovpnConfig?: string;
  wireguardConfig?: string;
}

export interface ConnectionMetrics {
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  totalDownloadedBytes: number;
  totalUploadedBytes: number;
  sessionSeconds: number;
  currentPingMs: number;
  packetLossPercent: number;
  encryptionCipher: string;
}

export interface SecuritySettings {
  killSwitch: boolean;
  dnsLeakShield: boolean;
  dnsProvider: 'cloudflare' | 'adguard' | 'quad9' | 'google';
  webRtcBlock: boolean;
  protocol: ProtocolType;
  splitTunneling: boolean;
  autoConnectOnInsecureWifi: boolean;
}

export interface DnsProviderInfo {
  id: 'cloudflare' | 'adguard' | 'quad9' | 'google';
  name: string;
  primaryIp: string;
  secondaryIp: string;
  description: string;
  badge: string;
}
