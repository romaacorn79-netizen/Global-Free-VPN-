export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function getPingColor(pingMs: number): { text: string; bg: string; border: string } {
  if (pingMs < 30) {
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' };
  }
  if (pingMs < 60) {
    return { text: 'text-teal-400', bg: 'bg-teal-500/15', border: 'border-teal-500/30' };
  }
  if (pingMs < 100) {
    return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' };
  }
  return { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/30' };
}

export function getLoadColor(loadPercent: number): { text: string; bar: string } {
  if (loadPercent < 45) {
    return { text: 'text-emerald-400', bar: 'bg-emerald-500' };
  }
  if (loadPercent < 75) {
    return { text: 'text-amber-400', bar: 'bg-amber-500' };
  }
  return { text: 'text-rose-400', bar: 'bg-rose-500' };
}
