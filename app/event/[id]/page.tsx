import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChatBox from '@/components/ChatBox';
import VideoPlayer from '@/components/VideoPlayer';
import { categoryTheme } from '@/data/categoryTheme';
import { events } from '@/data/events';

type EventPageProps = {
  params: {
    id: string;
  };
};

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  const theme = categoryTheme[event.category];

  return (
    <div className="space-y-5">
      <Link href="/" className="inline-flex text-sm text-cyan-300 hover:text-cyan-200">
        ← Back to all events
      </Link>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <VideoPlayer url={event.streamUrl} title={event.title} />
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-xs ${theme.badge}`}>{event.category}</span>
              {event.isLive ? (
                <span className="rounded-full bg-red-600/90 px-2 py-1 text-xs font-semibold text-white">
                  LIVE NOW
                </span>
              ) : null}
            </div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Schedule</h2>
            <p className="text-sm text-slate-300">
              {new Date(event.dateTime).toLocaleString(undefined, {
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
            <p className="leading-relaxed text-slate-300">{event.description}</p>
          </section>
        </div>

        <ChatBox />
      </div>
    </div>
  );
}
