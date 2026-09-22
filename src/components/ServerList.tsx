import React, { useState } from 'react';
import { 
  Search, 
  Server, 
  ArrowUpDown, 
  RefreshCw, 
  FileCode2, 
  Check, 
  Zap, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { VpnServer } from '../types/vpn';
import { getPingColor, getLoadColor } from '../utils/formatters';

interface ServerListProps {
  onOpenConfigForServer: (server: VpnServer) => void;
}

type SortOption = 'ping' | 'load' | 'speed' | 'name';

export const ServerList: React.FC<ServerListProps> = ({ onOpenConfigForServer }) => {
  const { 
    servers, 
    selectedServer, 
    status, 
    connectToServer, 
    disconnect, 
    refreshServerPings 
  } = useVpn();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('ping');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isConnected = status === 'connected';

  const continents = ['All', 'Americas', 'Europe', 'Asia Pacific', 'Middle East & Africa'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshServerPings();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredServers = servers
    .filter(server => {
      const matchContinent = selectedContinent === 'All' || server.continent === selectedContinent;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !query ||
        server.country.toLowerCase().includes(query) ||
        server.city.toLowerCase().includes(query) ||
        server.ip.includes(query) ||
        server.features.some(f => f.toLowerCase().includes(query));
      return matchContinent && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'ping') return a.pingMs - b.pingMs;
      if (sortBy === 'load') return a.loadPercent - b.loadPercent;
      if (sortBy === 'speed') return b.speedMbps - a.speedMbps;
      return a.country.localeCompare(b.country);
    });

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base sm:text-lg">
              Worldwide Free Server Network
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-md">
              {filteredServers.length} Available
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Unlimited bandwidth, zero connection caps, genuine OpenVPN & WireGuard exports
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="server-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search country, city, P2P..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              id="server-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 appearance-none pr-8 cursor-pointer"
            >
              <option value="ping">Lowest Ping</option>
              <option value="load">Lowest Load</option>
              <option value="speed">Highest Speed</option>
              <option value="name">Alphabetical</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Refresh Ping telemetry */}
          <button
            id="refresh-server-pings-btn"
            onClick={handleRefresh}
            title="Scan server latencies"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Continent Tab Filter Chips */}
      <div className="flex items-center gap-1.5 py-4 overflow-x-auto scrollbar-none border-b border-zinc-900">
        {continents.map(continent => (
          <button
            key={continent}
            id={`filter-continent-${continent.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedContinent(continent)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedContinent === continent
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            {continent}
          </button>
        ))}
      </div>

      {/* Server Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4">
        {filteredServers.map(server => {
          const isSelected = selectedServer.id === server.id;
          const isCurrentActive = isSelected && isConnected;
          const ping = getPingColor(server.pingMs);
          const load = getLoadColor(server.loadPercent);

          return (
            <div
              key={server.id}
              className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between gap-3 ${
                isCurrentActive
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                  : isSelected
                    ? 'bg-zinc-900/90 border-zinc-700'
                    : 'bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700/80'
              }`}
            >
              {/* Header: Flag, City, Ping */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl select-none">{server.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-white">{server.city}</h4>
                      {server.isRecommended && (
                        <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                          BEST
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 block">
                      {server.country} • {server.continent}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`px-2 py-0.5 text-xs font-mono font-medium rounded-lg border ${ping.bg} ${ping.text} ${ping.border}`}>
                    {server.pingMs} ms
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{server.ip}</span>
                </div>
              </div>

              {/* Server Load Bar & Features */}
              <div className="space-y-2 pt-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Capacity Load</span>
                    <span className={`font-mono font-medium ${load.text}`}>{server.loadPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${load.bar}`}
                      style={{ width: `${server.loadPercent}%` }}
                    />
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1">
                  {server.features.slice(0, 3).map((feat, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[10px] font-medium bg-zinc-800 text-zinc-300 rounded border border-zinc-700/60"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Connect & Get Config */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  id={`server-connect-btn-${server.id}`}
                  onClick={() => {
                    if (isCurrentActive) {
                      disconnect();
                    } else {
                      connectToServer(server);
                    }
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isCurrentActive
                      ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-sm'
                  }`}
                >
                  {isCurrentActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Disconnect
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" /> Connect
                    </>
                  )}
                </button>

                <button
                  id={`server-config-btn-${server.id}`}
                  onClick={() => onOpenConfigForServer(server)}
                  title="Export OpenVPN (.ovpn) & WireGuard (.conf) configuration"
                  className="py-2 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-medium border border-zinc-700 flex items-center gap-1 transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Config</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
