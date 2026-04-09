import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
      <h2 className="text-2xl font-bold">Event not found</h2>
      <p className="text-slate-300">The event you are looking for does not exist.</p>
      <Link href="/" className="inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-slate-950">
        Return Home
      </Link>
    </div>
  );
}
