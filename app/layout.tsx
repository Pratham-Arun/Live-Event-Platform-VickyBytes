import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Live Event Streaming Platform',
  description: 'Browse events and watch live streams with chat interaction.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-7xl px-4 py-6 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
