'use client';

import { useMemo } from 'react';
import { Eye } from 'lucide-react';
import { useLiveViewers } from '@/hooks/useLiveViewers';

type LiveViewerCountProps = {
  eventId: string;
  initialViewers: number;
};

export default function LiveViewerCount({ eventId, initialViewers }: LiveViewerCountProps) {
  const liveViewers = useLiveViewers(eventId, initialViewers);

  const formattedViewers = useMemo(() => {
    if (!liveViewers) return '';
    return liveViewers > 999 ? (liveViewers / 1000).toFixed(1) + 'k' : liveViewers.toString();
  }, [liveViewers]);

  if (!liveViewers) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-auto">
        <Eye className="w-4 h-4 text-slate-500" />
        <span suppressHydrationWarning>{formattedViewers} viewing</span>
    </div>
  );
}
