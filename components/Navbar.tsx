import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          <span className="rounded-md bg-rose-600 px-1.5 py-0.5 text-white">Live</span>{' '}
          <span className="text-slate-200">Event District</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            Browse all
          </Link>
          <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
            Discover • Watch • Chat
          </span>
        </div>
      </div>
    </header>
  );
}
