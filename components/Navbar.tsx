import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-cyan-300">
          LiveStream Hub
        </Link>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
          Discover Events
        </span>
      </div>
    </header>
  );
}
