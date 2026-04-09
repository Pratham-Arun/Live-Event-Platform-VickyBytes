'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { EventItem } from '@/data/events';

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20">
      <div className="relative h-48 w-full">
        <Image src={event.thumbnail} alt={event.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <span className="inline-block rounded-full bg-slate-800 px-2 py-1 text-xs text-cyan-200">
          {event.category}
        </span>
        <h2 className="line-clamp-2 text-lg font-semibold">{event.title}</h2>
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
            className="rounded-lg border border-cyan-500 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
          >
            👁 View
          </Link>
        </div>
      </div>
    </article>
  );
}
