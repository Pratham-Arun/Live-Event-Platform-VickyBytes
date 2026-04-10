import { NextResponse } from 'next/server';
import Pusher from 'pusher';

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
    const data = await req.text();
    const params = new URLSearchParams(data);
    const socketId = params.get('socket_id');
    const channel = params.get('channel_name');

    if (!socketId || !channel) {
      return new Response('Missing socket_id or channel_name', { status: 400 });
    }

    const pusher = getPusherInstance();
    
    // For demo purposes, we will mock a user ID randomly.
    // In a real app, you'd get this from NextAuth or Stitch Auth session
    const userId = `user-${Math.random().toString(36).substring(2, 9)}`;
    const presenceData = {
      user_id: userId,
      user_info: {
        name: `Guest_${userId.substring(0, 4)}`,
      }
    };

    if (pusher) {
        const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
        return NextResponse.json(authResponse);
    }
    
    return NextResponse.json({ success: true, dummy: true });
  } catch (error) {
    console.error("Pusher Auth Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
