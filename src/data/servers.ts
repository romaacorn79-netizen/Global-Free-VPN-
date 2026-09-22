import { VpnServer, DnsProviderInfo } from '../types/vpn';

export const DNS_PROVIDERS: DnsProviderInfo[] = [
  {
    id: 'cloudflare',
    name: 'Cloudflare 1.1.1.1',
    primaryIp: '1.1.1.1',
    secondaryIp: '1.0.0.1',
    description: 'Ultra-fast, strict zero-log privacy DNS designed for speed.',
    badge: 'Fastest'
  },
  {
    id: 'adguard',
    name: 'AdGuard Ad-Block DNS',
    primaryIp: '94.140.14.14',
    secondaryIp: '94.140.15.15',
    description: 'Automatically filters annoying advertisements, trackers, and malicious domains.',
    badge: 'Ad-Block'
  },
  {
    id: 'quad9',
    name: 'Quad9 Cyber Threat Defense',
    primaryIp: '9.9.9.9',
    secondaryIp: '149.112.112.112',
    description: 'Swiss non-profit DNS blocking malware, phishing, and botnets in real-time.',
    badge: 'High Security'
  },
  {
    id: 'google',
    name: 'Google Public DNS',
    primaryIp: '8.8.8.8',
    secondaryIp: '8.8.4.4',
    description: 'High-availability global Anycast DNS network with resilient routing.',
    badge: 'Reliable'
  }
];

export const WORLDWIDE_SERVERS: VpnServer[] = [
  {
    id: 'us-nyc-01',
    country: 'United States',
    countryCode: 'US',
    city: 'New York',
    continent: 'Americas',
    flag: '🇺🇸',
    ip: '198.51.100.24',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'shadowsocks'],
    pingMs: 24,
    loadPercent: 42,
    speedMbps: 950,
    isFree: true,
    isRecommended: true,
    features: ['10 Gbps Uplink', 'Streaming 4K', 'P2P Allowed', 'Zero-Logs'],
    mapCoords: { x: 285, y: 168 },
    publicKey: 'UsNyC99x7pWqB1xN+4qKz7vP8LmM1mPzF2tK3qLpQw8=',
    ovpnConfig: `client
dev tun
proto udp
remote us-nyc.freevpn.world 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-GCM
auth SHA256
compress lz4
verb 3
<ca>
-----BEGIN CERTIFICATE-----
MIIDRjCCAi6gAwIBAgIUWz1X5mKq8L2pM3nO7qQ0...
[Free World VPN CA Certificate - US New York]
-----END CERTIFICATE-----
</ca>
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
Address = 10.8.0.2/24
DNS = 1.1.1.1, 1.0.0.1

[Peer]
PublicKey = UsNyC99x7pWqB1xN+4qKz7vP8LmM1mPzF2tK3qLpQw8=
Endpoint = us-nyc.freevpn.world:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
`
  },
  {
    id: 'us-sfo-02',
    country: 'United States',
    countryCode: 'US',
    city: 'San Francisco',
    continent: 'Americas',
    flag: '🇺🇸',
    ip: '198.51.100.89',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'openvpn-tcp'],
    pingMs: 38,
    loadPercent: 55,
    speedMbps: 880,
    isFree: true,
    features: ['Low Latency West', 'Anti-DDoS', 'No-Logs'],
    mapCoords: { x: 195, y: 180 },
    publicKey: 'SfoW98xKyP1bZ5L9x0M+k4tV8nQw2rL1mPtJ5zXk9wA=',
    ovpnConfig: `client
dev tun
proto udp
remote us-sfo.freevpn.world 1194
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-GCM
auth SHA256
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = bBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=
Address = 10.8.0.3/24
DNS = 1.1.1.1

[Peer]
PublicKey = SfoW98xKyP1bZ5L9x0M+k4tV8nQw2rL1mPtJ5zXk9wA=
Endpoint = us-sfo.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'de-fra-01',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Frankfurt',
    continent: 'Europe',
    flag: '🇩🇪',
    ip: '185.220.101.5',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'openvpn-tcp', 'shadowsocks'],
    pingMs: 18,
    loadPercent: 37,
    speedMbps: 1000,
    isFree: true,
    isRecommended: true,
    features: ['DE-CIX Backbone', 'P2P Optimized', 'Strict GDPR', 'RAM-Only Servers'],
    mapCoords: { x: 508, y: 152 },
    publicKey: 'DeFra77vL9kM2nQ4xP8rT1wZ5bC3sV6mK0jX4pY8=qE=',
    ovpnConfig: `client
dev tun
proto udp
remote de-fra.freevpn.world 1194
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-GCM
auth SHA512
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = cCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=
Address = 10.10.0.2/24
DNS = 9.9.9.9

[Peer]
PublicKey = DeFra77vL9kM2nQ4xP8rT1wZ5bC3sV6mK0jX4pY8=qE=
Endpoint = de-fra.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'gb-lon-01',
    country: 'United Kingdom',
    countryCode: 'GB',
    city: 'London',
    continent: 'Europe',
    flag: '🇬🇧',
    ip: '194.26.29.112',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 22,
    loadPercent: 49,
    speedMbps: 920,
    isFree: true,
    features: ['BBC iPlayer Unlock', 'Streaming HD', 'Zero-Logs'],
    mapCoords: { x: 480, y: 145 },
    publicKey: 'GbLon33xK8vB2mL9tP1rQ4wZ6nC8sV2mJ5kX9pY1=wA=',
    ovpnConfig: `client
dev tun
proto udp
remote gb-lon.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = dDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD=
Address = 10.12.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = GbLon33xK8vB2mL9tP1rQ4wZ6nC8sV2mJ5kX9pY1=wA=
Endpoint = gb-lon.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'nl-ams-01',
    country: 'Netherlands',
    countryCode: 'NL',
    city: 'Amsterdam',
    continent: 'Europe',
    flag: '🇳🇱',
    ip: '185.107.56.40',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'shadowsocks'],
    pingMs: 19,
    loadPercent: 31,
    speedMbps: 980,
    isFree: true,
    isRecommended: true,
    features: ['AMS-IX Node', 'Unrestricted Torrenting', 'Anonymous DNS', 'Offshore Jurisdiction'],
    mapCoords: { x: 496, y: 142 },
    publicKey: 'NlAms55vT9kP2rM4wQ8xZ1bC6sV3nJ7kX2pY9qE4=mO=',
    ovpnConfig: `client
dev tun
proto udp
remote nl-ams.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = eEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE=
Address = 10.14.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = NlAms55vT9kP2rM4wQ8xZ1bC6sV3nJ7kX2pY9qE4=mO=
Endpoint = nl-ams.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'ch-zrh-01',
    country: 'Switzerland',
    countryCode: 'CH',
    city: 'Zurich',
    continent: 'Europe',
    flag: '🇨🇭',
    ip: '193.138.218.72',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'openvpn-tcp'],
    pingMs: 25,
    loadPercent: 28,
    speedMbps: 940,
    isFree: true,
    features: ['Swiss Privacy Laws', 'Zero Data Retention', 'Secure Core'],
    mapCoords: { x: 512, y: 165 },
    publicKey: 'ChZrh44kM9pL2vB6wQ1rT5zX8nC3sV7mJ2kP9qY5=rU=',
    ovpnConfig: `client
dev tun
proto udp
remote ch-zrh.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = fFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF=
Address = 10.16.0.2/24
DNS = 9.9.9.9

[Peer]
PublicKey = ChZrh44kM9pL2vB6wQ1rT5zX8nC3sV7mJ2kP9qY5=rU=
Endpoint = ch-zrh.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'jp-tyo-01',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    continent: 'Asia Pacific',
    flag: '🇯🇵',
    ip: '103.251.167.12',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'shadowsocks'],
    pingMs: 45,
    loadPercent: 46,
    speedMbps: 900,
    isFree: true,
    isRecommended: true,
    features: ['Anime & Gaming Asia', 'Subsea Cable Route', 'Bypass Censorship'],
    mapCoords: { x: 835, y: 195 },
    publicKey: 'JpTyo88vL1kM5nQ2xP9rT4wZ7bC1sV8mK3jX6pY2=xK=',
    ovpnConfig: `client
dev tun
proto udp
remote jp-tyo.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = gGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG=
Address = 10.20.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = JpTyo88vL1kM5nQ2xP9rT4wZ7bC1sV8mK3jX6pY2=xK=
Endpoint = jp-tyo.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'sg-sin-01',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    continent: 'Asia Pacific',
    flag: '🇸🇬',
    ip: '139.99.120.35',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'shadowsocks'],
    pingMs: 32,
    loadPercent: 38,
    speedMbps: 960,
    isFree: true,
    features: ['Equinix SG Hub', 'Southeast Asia Fast Gateway', 'Low Jitter'],
    mapCoords: { x: 745, y: 285 },
    publicKey: 'SgSin22xP9kL5vB1wQ8rT4zX6nC2sV9mJ7kP3qY8=pL=',
    ovpnConfig: `client
dev tun
proto udp
remote sg-sin.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = hHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH=
Address = 10.22.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = SgSin22xP9kL5vB1wQ8rT4zX6nC2sV9mJ7kP3qY8=pL=
Endpoint = sg-sin.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'kr-sel-01',
    country: 'South Korea',
    countryCode: 'KR',
    city: 'Seoul',
    continent: 'Asia Pacific',
    flag: '🇰🇷',
    ip: '211.233.14.88',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 48,
    loadPercent: 52,
    speedMbps: 890,
    isFree: true,
    features: ['Ultra-Low Gaming Ping', 'K-Media Access', 'Fiber 1G'],
    mapCoords: { x: 805, y: 195 },
    publicKey: 'KrSel11wP8kL4vB9wQ2rT6zX5nC1sV3mJ8kP4qY7=jM=',
    ovpnConfig: `client
dev tun
proto udp
remote kr-sel.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = iIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII=
Address = 10.24.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = KrSel11wP8kL4vB9wQ2rT6zX5nC1sV3mJ8kP4qY7=jM=
Endpoint = kr-sel.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'au-syd-01',
    country: 'Australia',
    countryCode: 'AU',
    city: 'Sydney',
    continent: 'Asia Pacific',
    flag: '🇦🇺',
    ip: '139.130.4.5',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 65,
    loadPercent: 41,
    speedMbps: 820,
    isFree: true,
    features: ['Oceania Direct Link', 'Anti-DDoS', 'No Logs Policy'],
    mapCoords: { x: 865, y: 390 },
    publicKey: 'AuSyd99vL3kM7nQ1xP5rT8wZ2bC4sV6mK1jX9pY3=qA=',
    ovpnConfig: `client
dev tun
proto udp
remote au-syd.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = jJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ=
Address = 10.26.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = AuSyd99vL3kM7nQ1xP5rT8wZ2bC4sV6mK1jX9pY3=qA=
Endpoint = au-syd.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'ca-tor-01',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Toronto',
    continent: 'Americas',
    flag: '🇨🇦',
    ip: '192.0.2.144',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 31,
    loadPercent: 39,
    speedMbps: 910,
    isFree: true,
    features: ['North America P2P', 'Canadian CBC Access', 'High Security'],
    mapCoords: { x: 278, y: 155 },
    publicKey: 'CaTor66kM1pL8vB3wQ5rT2zX9nC7sV4mJ1kP6qY2=hJ=',
    ovpnConfig: `client
dev tun
proto udp
remote ca-tor.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = kKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK=
Address = 10.28.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = CaTor66kM1pL8vB3wQ5rT2zX9nC7sV4mJ1kP6qY2=hJ=
Endpoint = ca-tor.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'br-sao-01',
    country: 'Brazil',
    countryCode: 'BR',
    city: 'São Paulo',
    continent: 'Americas',
    flag: '🇧🇷',
    ip: '177.18.240.19',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 58,
    loadPercent: 44,
    speedMbps: 790,
    isFree: true,
    features: ['South America Hub', 'LATAM Gaming', 'Bypass Geo-blocks'],
    mapCoords: { x: 360, y: 355 },
    publicKey: 'BrSao77vL5kM2nQ8xP3rT6wZ1bC9sV3mK8jX4pY6=vC=',
    ovpnConfig: `client
dev tun
proto udp
remote br-sao.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = lLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL=
Address = 10.30.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = BrSao77vL5kM2nQ8xP3rT6wZ1bC9sV3mK8jX4pY6=vC=
Endpoint = br-sao.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'ae-dxb-01',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    city: 'Dubai',
    continent: 'Middle East & Africa',
    flag: '🇦🇪',
    ip: '185.193.64.10',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp', 'shadowsocks'],
    pingMs: 52,
    loadPercent: 61,
    speedMbps: 840,
    isFree: true,
    features: ['VoIP Unblocking', 'Obfuscated Protocol', 'Gulf Gateway'],
    mapCoords: { x: 625, y: 228 },
    publicKey: 'AeDxb33kM8pL4vB2wQ7rT1zX6nC5sV8mJ3kP7qY4=bN=',
    ovpnConfig: `client
dev tun
proto udp
remote ae-dxb.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = mMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM=
Address = 10.32.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = AeDxb33kM8pL4vB2wQ7rT1zX6nC5sV8mJ3kP7qY4=bN=
Endpoint = ae-dxb.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'za-jnb-01',
    country: 'South Africa',
    countryCode: 'ZA',
    city: 'Johannesburg',
    continent: 'Middle East & Africa',
    flag: '🇿🇦',
    ip: '197.96.12.50',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 74,
    loadPercent: 36,
    speedMbps: 760,
    isFree: true,
    features: ['Southern Africa Hub', 'Teraco NAPAfrica', 'Zero-Logs'],
    mapCoords: { x: 560, y: 382 },
    publicKey: 'ZaJnb55vL8kM1nQ6xP2rT4wZ9bC2sV5mK7jX1pY8=kM=',
    ovpnConfig: `client
dev tun
proto udp
remote za-jnb.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = nNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN=
Address = 10.34.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = ZaJnb55vL8kM1nQ6xP2rT4wZ9bC2sV5mK7jX1pY8=kM=
Endpoint = za-jnb.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  },
  {
    id: 'in-bom-01',
    country: 'India',
    countryCode: 'IN',
    city: 'Mumbai',
    continent: 'Asia Pacific',
    flag: '🇮🇳',
    ip: '103.111.38.25',
    port: 51820,
    protocol: 'wireguard',
    protocols: ['wireguard', 'openvpn-udp'],
    pingMs: 44,
    loadPercent: 58,
    speedMbps: 870,
    isFree: true,
    features: ['Virtual RAM Server', 'No Government Logs', 'Hotstar Access'],
    mapCoords: { x: 685, y: 235 },
    publicKey: 'InBom88kM2pL6vB5wQ3rT9zX1nC8sV2mJ6kP1qY9=wZ=',
    ovpnConfig: `client
dev tun
proto udp
remote in-bom.freevpn.world 1194
resolv-retry infinite
nobind
cipher AES-256-GCM
verb 3
auth-user-pass
`,
    wireguardConfig: `[Interface]
PrivateKey = oOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO=
Address = 10.36.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = InBom88kM2pL6vB5wQ3rT9zX1nC8sV2mJ6kP1qY9=wZ=
Endpoint = in-bom.freevpn.world:51820
AllowedIPs = 0.0.0.0/0
`
  }
];
