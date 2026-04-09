'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { categoryTheme } from '@/data/categoryTheme';
import type { EventItem } from '@/data/events';

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);
  const theme = categoryTheme[event.category];

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 ${theme.glow}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        {event.isLive ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2 py-1 text-xs font-semibold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
          </span>
        ) : null}
      </div>
      <div className="relative space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-block rounded-full px-2 py-1 text-xs ${theme.badge}`}>{event.category}</span>
          <span className="text-xs text-slate-400">ID #{event.id}</span>
        </div>

        <h2 className="line-clamp-2 text-lg font-semibold leading-snug">{event.title}</h2>
        <p className="text-sm text-slate-300">
          {new Date(event.dateTime).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setLiked((current) => !current)}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm transition hover:border-pink-400"
          >
            {liked ? '💖 Liked' : '❤️ Like'}
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm transition hover:border-cyan-400"
          >
            🔗 Share
          </button>
          <Link
            href={`/event/${event.id}`}
            className={`rounded-lg bg-gradient-to-r ${theme.chip} px-3 py-1.5 text-sm font-medium text-white transition hover:brightness-110`}
          >
            👁 View
          </Link>
        </div>
      </div>
    </article>
  );
}
