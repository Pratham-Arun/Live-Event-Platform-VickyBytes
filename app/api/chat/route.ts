import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher only if env vars are present to avoid crash on startup without keys
const getPusherInstance = () => {
  if (!process.env.PUSHER_APP_ID || !process.env.NEXT_PUBLIC_PUSHER_KEY) {
    return null;
  }
  return new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
    useTLS: true,
  });
};

export async function POST(req: Request) {
  try {
    const { message, channelId } = await req.json();
    
    const pusher = getPusherInstance();
    
    if (pusher) {
       await pusher.trigger(channelId, 'new-message', message);
    }
    
    // We return success even if Pusher isn't configured so the fallback UI still works
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Pusher Chat Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
