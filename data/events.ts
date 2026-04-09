export type EventCategory = 'Trending' | 'Music' | 'Tech' | 'Movies' | 'Stand Up';

export type EventItem = {
  id: string;
  title: string;
  dateTime: string;
  category: EventCategory;
  thumbnail: string;
  description: string;
  streamUrl: string;
  isLive?: boolean;
};

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Future of AI Summit',
    dateTime: '2026-04-20T18:00:00Z',
    category: 'Tech',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description:
      'Explore the latest breakthroughs in AI, automation, and ethical technology with industry leaders.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
  },
  {
    id: '2',
    title: 'Indie Beats Live',
    dateTime: '2026-04-14T20:00:00Z',
    category: 'Music',
    thumbnail:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    description:
      'A curated live performance featuring top indie artists and exclusive acoustic sessions.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    isLive: true
  },
  {
    id: '3',
    title: 'Creator Economy Now',
    dateTime: '2026-04-22T16:30:00Z',
    category: 'Trending',
    thumbnail:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    description:
      'Learn how creators are building businesses through communities, products, and content.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg'
  },
  {
    id: '4',
    title: 'Startup Pitch Arena',
    dateTime: '2026-04-16T19:00:00Z',
    category: 'Tech',
    thumbnail:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    description:
      'Early-stage startups pitch bold ideas to a panel of investors and mentors live on stream.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
  },
  {
    id: '5',
    title: 'Global DJ Session',
    dateTime: '2026-04-25T21:00:00Z',
    category: 'Music',
    thumbnail:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
    description:
      'Dance to an energetic international DJ line-up with seamless genre transitions.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'
  },
  {
    id: '6',
    title: 'Midnight Horror Marathon',
    dateTime: '2026-04-19T23:30:00Z',
    category: 'Movies',
    thumbnail:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    description: 'A spine-chilling marathon with audience voting for the next jump-scare classic.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg'
  },
  {
    id: '7',
    title: 'Viral Trends Breakdown',
    dateTime: '2026-04-13T17:00:00Z',
    category: 'Trending',
    thumbnail:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    description:
      'A panel discussion analyzing the social and cultural impact of this month’s viral trends.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    isLive: true
  },
  {
    id: '8',
    title: 'Synthwave Nights',
    dateTime: '2026-04-28T20:30:00Z',
    category: 'Music',
    thumbnail:
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80',
    description:
      'A nostalgic synthwave livestream featuring neon visuals and retro-inspired live sets.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'
  },
  {
    id: '9',
    title: 'Open Source Launch Day',
    dateTime: '2026-04-21T14:00:00Z',
    category: 'Trending',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description:
      'Watch maintainers unveil new open-source tools and roadmap announcements in real time.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg'
  },
  {
    id: '10',
    title: 'Cloud Native Live',
    dateTime: '2026-04-26T18:30:00Z',
    category: 'Tech',
    thumbnail:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description:
      'Deep-dive sessions on container orchestration, observability, and platform engineering.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
  },
  {
    id: '11',
    title: 'Lo-Fi Studio Session',
    dateTime: '2026-04-17T23:00:00Z',
    category: 'Music',
    thumbnail:
      'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=1200&q=80',
    description:
      'Relax with live lo-fi production sessions, ambient visuals, and audience requests.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'
  },
  {
    id: '12',
    title: 'Tech Career AMA',
    dateTime: '2026-04-23T17:30:00Z',
    category: 'Trending',
    thumbnail:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    description:
      'Get advice from hiring managers and engineers on breaking into and growing in tech.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg'
  },
  {
    id: '13',
    title: 'Stand-Up Saturday Night',
    dateTime: '2026-04-24T20:00:00Z',
    category: 'Stand Up',
    thumbnail:
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80',
    description:
      'A punchline-packed lineup of comics with crowd work and improv challenges.',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
  },
  {
    id: '14',
    title: 'Director’s Cut Live Review',
    dateTime: '2026-04-27T18:45:00Z',
    category: 'Movies',
    thumbnail:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    description: 'Film critics break down iconic scenes, camera language, and storytelling moments.',
    streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg'
  },
  {
    id: '15',
    title: 'Comedy Roast Arena',
    dateTime: '2026-04-30T21:00:00Z',
    category: 'Stand Up',
    thumbnail:
      'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=1200&q=80',
    description: 'Fast-paced roast battles judged by audience reactions and live poll energy.',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'
  }
];


export const totalEvents = events.length;

export const eventCategories: EventCategory[] = ['Trending', 'Music', 'Tech', 'Movies', 'Stand Up'];
