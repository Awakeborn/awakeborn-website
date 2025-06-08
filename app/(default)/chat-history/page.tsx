"use client";

import React, { useEffect, useState, JSX } from 'react';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  date: string;
  input: string;
  output: string;
}

export default function ChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadHistory() {
      if (!window.ethereum) return router.push('/');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const wallet = accounts[0]?.toLowerCase();

      const res = await fetch(`/api/chat-history?wallet=${wallet}`);
      const data: ChatMessage[] = await res.json();
      setChatHistory(data);
    }
    loadHistory();
  }, [router]);

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold">Full Chat History</h1>
      {chatHistory.length === 0 ? (
        <p>No chat history.</p>
      ) : (
        chatHistory.reduce((acc: JSX.Element[], msg, index) => {
          const isNewDate = index === 0 || chatHistory[index - 1].date !== msg.date;
          if (isNewDate) {
            acc.push(<h2 key={msg.date}>{msg.date}</h2>);
          }
          acc.push(
            <div key={index} className="bg-gray-800 p-3 my-2 rounded">
              <p><strong>You:</strong> {msg.input}</p>
              <p><strong>Awakeborn:</strong> {msg.output}</p>
            </div>
          );
          return acc;
        }, [])
      )}
      <button onClick={() => router.push('/chat')} className="btn bg-purple-600 mt-4">Back to Chat</button>
    </section>
  );
}
