'use client';

import { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  author: string;
  text: string;
};

const initialMessages: Message[] = [
  { id: 1, author: 'Host', text: 'Welcome everyone to the live stream!' },
  { id: 2, author: 'Ava', text: 'Excited to be here 🔥' },
  { id: 3, author: 'Noah', text: 'Audio and video look great.' }
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        author: 'You',
        text
      }
    ]);
    setDraft('');
  };

  return (
    <section className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-4 py-3 text-sm font-medium">💬 Live Chat</div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.map((message) => (
          <div key={message.id} className="rounded-lg bg-slate-800 px-3 py-2 text-sm">
            <span className="font-semibold text-cyan-300">{message.author}: </span>
            <span className="text-slate-100">{message.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 border-t border-slate-800 p-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Send a message..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-500 transition focus:ring-2"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Send
        </button>
      </div>
    </section>
  );
}
