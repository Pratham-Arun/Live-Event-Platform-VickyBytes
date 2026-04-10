'use client';

import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export function useLiveViewers(eventId: string, initialViewers: number = 0) {
    const [viewers, setViewers] = useState(initialViewers);

    useEffect(() => {
        // Simple mock fluctuation to make the platform feel alive
        const fluctuate = () => {
            setViewers((current) => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(0, current + change);
            });
        };

        const interval = setInterval(fluctuate, 3000);

        // Attempt Pusher if configured
        if (process.env.NEXT_PUBLIC_PUSHER_KEY) {
            try {
                const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
                    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
                    authEndpoint: '/api/pusher/auth',
                });
                
                const channel = pusher.subscribe(`presence-event-${eventId}`);
                
                channel.bind('pusher:subscription_succeeded', (members: any) => {
                    setViewers(members.count + initialViewers);
                });
                channel.bind('pusher:member_added', () => {
                    setViewers(v => v + 1);
                });
                channel.bind('pusher:member_removed', () => {
                    setViewers(v => Math.max(0, v - 1));
                });

                return () => {
                   clearInterval(interval);
                   pusher.unsubscribe(`presence-event-${eventId}`);
                   pusher.disconnect();
                };
            } catch (e) {
                console.error("Pusher integration failed", e);
            }
        }

        return () => clearInterval(interval);
    }, [eventId, initialViewers]);

    return viewers;
}
