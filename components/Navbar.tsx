import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-lg shadow-cyan-500/20 transition-all group-hover:shadow-cyan-500/40">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-100">
            DISTRICT<span className="text-slate-500 font-medium ml-1">LIVE</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
