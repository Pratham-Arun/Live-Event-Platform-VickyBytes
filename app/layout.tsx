import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import IntroLoader from '@/components/IntroLoader';
import NotificationSystem from '@/components/NotificationSystem';

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
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <IntroLoader />
        <NotificationSystem />
        <div className="flex relative min-h-screen">
            <Sidebar />
            {/* The sidebar is fixed, so we use a wrapper with padding on large screens */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px] transition-[padding] duration-300">
                <Navbar />
                <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 flex-1">
                    {children}
                </main>
            </div>
        </div>
      </body>
    </html>
  );
}
