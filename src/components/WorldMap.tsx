import React, { useState } from 'react';
import { Globe, MapPin, Zap, Radio, Shield, Check } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { VpnServer } from '../types/vpn';
import { getPingColor } from '../utils/formatters';

export const WorldMap: React.FC = () => {
  const { servers, selectedServer, connectToServer, status } = useVpn();
  const [hoveredServer, setHoveredServer] = useState<VpnServer | null>(null);
  const [activeContinent, setActiveContinent] = useState<string>('All');

  const isConnected = status === 'connected';

  const continents = ['All', 'Americas', 'Europe', 'Asia Pacific', 'Middle East & Africa'];

  const filteredServers = activeContinent === 'All' 
    ? servers 
    : servers.filter(s => s.continent === activeContinent);

  // Approximate user origin coordinate on map (e.g. client origin)
  const clientOrigin = { x: 260, y: 175 };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col">
      
      {/* Map Header & Filter Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80 z-10">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h3 className="font-bold text-white text-base sm:text-lg font-sans">
              Worldwide VPN Node Topology
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Click any server location node to route your encrypted tunnel globally
          </p>
        </div>

        {/* Continent Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {continents.map(continent => (
            <button
              key={continent}
              id={`continent-btn-${continent.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveContinent(continent)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeContinent === continent
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              {continent}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[420px] bg-zinc-950 flex items-center justify-center mt-2 rounded-xl overflow-hidden select-none">
        
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-full object-contain filter drop-shadow-md"
        >
          <defs>
            {/* Gradient for connection arc */}
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* World Continents Stylized Landmass Paths */}
          {/* North America */}
          <path
            d="M 120,60 L 220,50 L 310,65 L 340,110 L 320,160 L 290,180 L 240,210 L 200,240 L 160,200 L 110,140 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />
          {/* Central & South America */}
          <path
            d="M 240,225 L 300,250 L 380,310 L 400,370 L 350,450 L 320,440 L 290,340 L 260,270 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />
          {/* Europe */}
          <path
            d="M 460,70 L 520,60 L 570,85 L 560,140 L 530,175 L 470,185 L 440,140 L 460,95 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />
          {/* Africa */}
          <path
            d="M 470,195 L 570,195 L 610,270 L 580,370 L 550,430 L 490,370 L 450,260 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />
          {/* Asia / Eurasia */}
          <path
            d="M 570,75 L 750,60 L 890,90 L 860,170 L 820,230 L 740,270 L 670,260 L 620,180 L 570,140 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />
          {/* Australia & Oceania */}
          <path
            d="M 780,340 L 880,330 L 910,380 L 870,440 L 800,420 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="0.8"
            className="transition-colors hover:fill-zinc-800"
          />

          {/* Active Connection Tunnel Arc */}
          {isConnected && (
            <g>
              {/* Dynamic curved connecting line */}
              <path
                d={`M ${clientOrigin.x},${clientOrigin.y} Q ${(clientOrigin.x + selectedServer.mapCoords.x) / 2},${Math.min(clientOrigin.y, selectedServer.mapCoords.y) - 60} ${selectedServer.mapCoords.x},${selectedServer.mapCoords.y}`}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-[dash_1.5s_linear_infinite]"
              />
              {/* Origin Client Pin */}
              <circle
                cx={clientOrigin.x}
                cy={clientOrigin.y}
                r="4"
                fill="#06b6d4"
                stroke="#ecfeff"
                strokeWidth="1.5"
              />
              <circle
                cx={clientOrigin.x}
                cy={clientOrigin.y}
                r="10"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1"
                opacity="0.4"
                className="animate-ping"
              />
            </g>
          )}

          {/* Server Location Nodes */}
          {filteredServers.map(server => {
            const isSelected = selectedServer.id === server.id;
            const pingColor = getPingColor(server.pingMs);

            return (
              <g
                key={server.id}
                className="cursor-pointer group"
                onClick={() => connectToServer(server)}
                onMouseEnter={() => setHoveredServer(server)}
                onMouseLeave={() => setHoveredServer(null)}
              >
                {/* Outer pulse when selected or hovered */}
                {(isSelected || hoveredServer?.id === server.id) && (
                  <circle
                    cx={server.mapCoords.x}
                    cy={server.mapCoords.y}
                    r="14"
                    fill="none"
                    stroke={isSelected ? '#10b981' : '#38bdf8'}
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Outer ring */}
                <circle
                  cx={server.mapCoords.x}
                  cy={server.mapCoords.y}
                  r={isSelected ? '7' : '5'}
                  fill={isSelected ? '#10b981' : '#18181b'}
                  stroke={isSelected ? '#34d399' : '#71717a'}
                  strokeWidth={isSelected ? '2' : '1.2'}
                  filter={isSelected ? 'url(#glow)' : undefined}
                  className="transition-all duration-300 group-hover:scale-125"
                />

                {/* Inner center dot */}
                <circle
                  cx={server.mapCoords.x}
                  cy={server.mapCoords.y}
                  r={isSelected ? '3' : '2'}
                  fill={isSelected ? '#ffffff' : '#10b981'}
                />

                {/* Node Label (City) */}
                <text
                  x={server.mapCoords.x}
                  y={server.mapCoords.y - 10}
                  textAnchor="middle"
                  fill={isSelected ? '#34d399' : '#a1a1aa'}
                  fontSize="9"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight={isSelected ? '700' : '500'}
                  className="pointer-events-none drop-shadow select-none transition-colors group-hover:fill-white"
                >
                  {server.city}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected Server Floating Card Tooltip */}
        {(hoveredServer || isConnected) && (
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 rounded-xl p-3 shadow-2xl max-w-xs pointer-events-auto">
            {(() => {
              const activeNode = hoveredServer || selectedServer;
              const pingInfo = getPingColor(activeNode.pingMs);
              const isCurrent = selectedServer.id === activeNode.id;

              return (
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{activeNode.flag}</span>
                      <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm leading-tight">
                          {activeNode.city}, {activeNode.countryCode}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {activeNode.ip}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded font-semibold border ${pingInfo.bg} ${pingInfo.text} ${pingInfo.border}`}>
                      {activeNode.pingMs} ms
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1.5 border-t border-zinc-800">
                    <span>Load: <b className="text-zinc-200 font-mono">{activeNode.loadPercent}%</b></span>
                    <button
                      id={`tooltip-connect-btn-${activeNode.id}`}
                      onClick={() => connectToServer(activeNode)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        isCurrent && isConnected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-sm'
                      }`}
                    >
                      {isCurrent && isConnected ? (
                        <>
                          <Check className="w-3 h-3" /> Active Tunnel
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3" /> Connect Node
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
};
