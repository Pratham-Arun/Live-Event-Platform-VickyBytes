import type { EventCategory } from './events';

export type CategoryTheme = {
  badge: string;
  chip: string;
  glow: string;
  accent: string;
};

export const categoryTheme: Record<EventCategory, CategoryTheme> = {
  Tech: {
    badge: 'bg-cyan-500/15 text-cyan-200 border border-cyan-400/40',
    chip: 'from-cyan-500 to-blue-500',
    glow: 'group-hover:shadow-cyan-500/30',
    accent: 'text-cyan-300'
  },
  Music: {
    badge: 'bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-400/40',
    chip: 'from-fuchsia-500 to-pink-500',
    glow: 'group-hover:shadow-fuchsia-500/30',
    accent: 'text-fuchsia-300'
  },
  Movies: {
    badge: 'bg-violet-500/15 text-violet-200 border border-violet-400/40',
    chip: 'from-violet-500 to-indigo-500',
    glow: 'group-hover:shadow-violet-500/30',
    accent: 'text-violet-300'
  },
  Trending: {
    badge: 'bg-rose-500/15 text-rose-200 border border-rose-400/40',
    chip: 'from-rose-500 to-red-500',
    glow: 'group-hover:shadow-rose-500/30',
    accent: 'text-rose-300'
  },
  'Stand Up': {
    badge: 'bg-amber-500/15 text-amber-200 border border-amber-400/40',
    chip: 'from-amber-500 to-orange-500',
    glow: 'group-hover:shadow-amber-500/30',
    accent: 'text-amber-300'
  }
};

export const categoryOrder: EventCategory[] = ['Trending', 'Music', 'Tech', 'Movies', 'Stand Up'];
