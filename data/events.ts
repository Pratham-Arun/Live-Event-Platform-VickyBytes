export type EventCategory = 'Trending' | 'Music' | 'Tech' | 'Movies' | 'Stand Up';

export type Host = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
};

export type EventItem = {
  id: string;
  title: string;
  dateTime: string;
  category: EventCategory;
  thumbnail: string;
  description: string;
  streamUrl: string;
  isLive?: boolean;
  viewers?: number;
  host: Host;
};

const hosts: Record<string, Host> = {
  tech_guru: {
    id: 'tech_guru',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    bio: 'Tech visionary and AI researcher dedicated to exploring the intersection of ethics and automation.'
  },
  indie_soul: {
    id: 'indie_soul',
    name: 'Marcus Bell',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: 'Multi-instrumentalist and producer bringing raw indie vibes to the digital stage.'
  },
  comedy_king: {
    id: 'comedy_king',
    name: 'Dave Rivers',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    bio: 'Stand-up veteran with a knack for observational humor and crowd-pleasing roasts.'
  },
  film_buff: {
    id: 'film_buff',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    bio: 'Award-winning director and cinematic historian specializing in the golden age of movies.'
  },
  trend_setter: {
    id: 'trend_setter',
    name: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    bio: 'Digital culture enthusiast analyzing the forces that shape our viral world.'
  }
};

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Future of AI Summit',
    dateTime: '2026-04-20T18:00:00Z',
    category: 'Tech',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore the latest breakthroughs in AI, automation, and ethical technology with industry leaders.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    isLive: true,
    viewers: 12450,
    host: hosts.tech_guru
  },
  {
    id: '2',
    title: 'Indie Beats Live',
    dateTime: '2026-04-14T20:00:00Z',
    category: 'Music',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    description: 'A curated live performance featuring top indie artists and exclusive acoustic sessions.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    host: hosts.indie_soul
  },
  {
    id: '3',
    title: 'Creator Economy Now',
    dateTime: '2026-04-22T16:30:00Z',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    description: 'Learn how creators are building businesses through communities, products, and content.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    isLive: true,
    viewers: 8900,
    host: hosts.trend_setter
  },
  {
    id: '4',
    title: 'Exclusive Movie Trailer Premiere',
    dateTime: '2026-04-16T19:00:00Z',
    category: 'Movies',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    description: 'Be the first to watch the highly anticipated trailer for the biggest blockbuster of the year.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    isLive: false,
    host: hosts.film_buff
  },
  {
    id: '5',
    title: 'Global DJ Session',
    dateTime: '2026-04-25T21:00:00Z',
    category: 'Music',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
    description: 'Dance to an energetic international DJ line-up with seamless genre transitions.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    isLive: true,
    viewers: 32050,
    host: hosts.indie_soul
  },
  {
    id: '6',
    title: 'Comedy Club Night Extraordinaire',
    dateTime: '2026-04-19T15:00:00Z',
    category: 'Stand Up',
    thumbnail: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    description: 'Get ready for non-stop laughs with a fantastic lineup of touring stand-up comedians.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    host: hosts.comedy_king
  },
  {
    id: '7',
    title: 'Viral Trends Breakdown',
    dateTime: '2026-04-13T17:00:00Z',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    description: 'A panel discussion analyzing the social and cultural impact of this month’s viral trends.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    host: hosts.trend_setter
  },
  {
    id: '8',
    title: 'Synthwave Nights',
    dateTime: '2026-04-28T20:30:00Z',
    category: 'Music',
    thumbnail: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80',
    description: 'A nostalgic synthwave livestream featuring neon visuals and retro-inspired live sets.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    host: hosts.indie_soul
  },
  {
    id: '9',
    title: 'Classic Cinema Masterclass',
    dateTime: '2026-04-21T14:00:00Z',
    category: 'Movies',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    description: 'Join award-winning directors as they dissect the greatest scenes in classic cinema.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    isLive: true,
    viewers: 4500,
    host: hosts.film_buff
  },
  {
    id: '10',
    title: 'Cloud Native Live',
    dateTime: '2026-04-26T18:30:00Z',
    category: 'Tech',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep-dive sessions on container orchestration, observability, and platform engineering.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    host: hosts.tech_guru
  },
  {
    id: '11',
    title: 'Late Night Roasts',
    dateTime: '2026-04-17T23:00:00Z',
    category: 'Stand Up',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    description: 'An aggressive, no-holds-barred comedy roast session featuring brutal takedowns.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    isLive: true,
    viewers: 21500,
    host: hosts.comedy_king
  },
  {
    id: '12',
    title: 'Tech Career AMA',
    dateTime: '2026-04-23T17:30:00Z',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    description: 'Get advice from hiring managers and engineers on breaking into and growing in tech.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    host: hosts.trend_setter
  },
  {
    id: '13',
    title: 'Indie Film Festival Pre-Show',
    dateTime: '2026-04-24T18:00:00Z',
    category: 'Movies',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80',
    description: 'Live interviews with upcoming indie filmmakers before the main festival screening.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    host: hosts.film_buff
  },
  {
    id: '14',
    title: 'Open Source Launch Day',
    dateTime: '2026-04-21T14:00:00Z',
    category: 'Tech',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description: 'Watch maintainers unveil new open-source tools and roadmap announcements in real time.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    isLive: true,
    viewers: 9400,
    host: hosts.tech_guru
  },
  {
    id: '15',
    title: 'Improv Comedy Battle',
    dateTime: '2026-04-29T20:00:00Z',
    category: 'Stand Up',
    thumbnail: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    description: 'Two teams of improvisers battle it out using prompts submitted live by the audience.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    host: hosts.comedy_king
  }
];

