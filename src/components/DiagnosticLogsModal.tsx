import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  Shield, 
  AlertCircle, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import { useVpn } from '../context/VpnContext';

interface DiagnosticLogsModalProps {
  onClose: () => void;
}

export const DiagnosticLogsModal: React.FC<DiagnosticLogsModalProps> = ({ onClose }) => {
  const { logs, clearLogs } = useVpn();
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<'all' | 'security' | 'warning'>('all');

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const handleCopyLogs = async () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.type.toUpperCase()}] ${l.message}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center font-mono">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                Cryptographic Tunnel Logs
              </h3>
              <p className="text-xs text-zinc-400">
                Live protocol events, key exchange state, and routing changes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-logs-btn"
              onClick={handleCopyLogs}
              title="Copy log trace"
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              id="clear-logs-btn"
              onClick={clearLogs}
              title="Clear event logs"
              className="p-2 text-zinc-400 hover:text-rose-400 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              id="close-logs-modal-btn"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950/70 border-b border-zinc-800 text-xs">
          <span className="text-zinc-500 font-mono text-[11px] uppercase">Filter:</span>
          {(['all', 'security', 'warning'] as const).map(f => (
            <button
              key={f}
              id={`filter-logs-${f}`}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                filter === f 
                  ? 'bg-zinc-800 text-emerald-400 font-bold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-zinc-500">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Logs terminal */}
        <div className="p-4 overflow-y-auto flex-1 bg-zinc-950 font-mono text-xs space-y-1.5 min-h-[260px] max-h-[460px]">
          {filteredLogs.length === 0 ? (
            <div className="text-zinc-600 text-center py-8">No log entries recorded.</div>
          ) : (
            filteredLogs.map(log => {
              let icon = <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />;
              let textColor = 'text-zinc-300';
              if (log.type === 'security') {
                icon = <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />;
                textColor = 'text-emerald-300';
              } else if (log.type === 'warning') {
                icon = <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />;
                textColor = 'text-amber-300';
              } else if (log.type === 'success') {
                icon = <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />;
                textColor = 'text-teal-300';
              }

              return (
                <div key={log.id} className="flex items-start gap-2 py-1 border-b border-zinc-900/60 leading-relaxed">
                  <span className="text-zinc-500 shrink-0 select-none">[{log.timestamp}]</span>
                  {icon}
                  <span className={`${textColor} break-all`}>{log.message}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono text-[11px] text-zinc-500">WireGuard & OpenVPN daemon console</span>
          <button
            id="logs-done-btn"
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
