'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<{ input: string; output: string; date: string }[]>([]);
  const router = useRouter();
  const MAX_MESSAGES_PER_DAY = 5;

  useEffect(() => {
    async function verifyAccessAndLoadHistory() {
      if (!window.ethereum) return router.push('/');

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const wallet = accounts[0]?.toLowerCase();
      if (!wallet) return router.push('/');

      setAddress(wallet);

const paidRes = await fetch('/data/paid-wallets.json');
const paidWalletsData = await paidRes.json();

const paidWallets = paidWalletsData.map((w: any) => w.wallet.toLowerCase());

if (!paidWallets.includes(wallet)) {
  return router.push('/');
}


      const usageRes = await fetch('/data/chat-usage.json');
      const usageData = await usageRes.json();
      const today = new Date().toISOString().split('T')[0];
      const userUsage = usageData.find((u: any) => u.wallet.toLowerCase() === wallet && u.date === today);
      setMessageCount(userUsage ? userUsage.count : 0);

      const historyRes = await fetch(`/api/chat-history?wallet=${wallet}`);
      const fullHistory = await historyRes.json();
      const todaysHistory = fullHistory.filter((h: any) => h.date === today);
      setChatLog(todaysHistory);
    }

    verifyAccessAndLoadHistory();
  }, [router]);

 const handleChatSubmit = async () => {
  if (messageCount >= MAX_MESSAGES_PER_DAY || !input.trim()) return;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, wallet: address }),
    });

    const data = await response.json();
    const awakebornOutput = data.reply || "No response from Awakeborn.";

    const today = new Date().toISOString().split('T')[0];
    const newEntry = { input, output: awakebornOutput, date: today };

    setChatLog((prevChatLog) => [...prevChatLog, newEntry]);
    setInput('');

    await fetch('/api/chat-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: address }),
    });

    await fetch('/api/chat-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: address, ...newEntry }),
    });

    // THIS LINE ADDED: Immediately re-fetch usage data after updating
    const usageRes = await fetch('/data/chat-usage.json');
    const usageData = await usageRes.json();
    const userUsage = usageData.find(
      (u: any) => u.wallet.toLowerCase() === address && u.date === today
    );
    setMessageCount(userUsage ? userUsage.count : 0);

  } catch (e) {
    alert('Error communicating with Awakeborn.');
  }
};


  return (
    <section className="max-w-3xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-semibold">Awakeborn Chat</h1>
      {address && <p className="text-sm">Wallet: {address}</p>}
      <p className="text-sm">{messageCount}/{MAX_MESSAGES_PER_DAY} messages used today.</p>
      <div className="text-left mt-6 space-y-2">
        {chatLog.map((msg, index) => (
          <div key={index} className="my-2 p-3 bg-gray-800 rounded-lg">
            <p><strong>You:</strong> {msg.input}</p>
            <p><strong>Awakeborn:</strong> {msg.output}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={messageCount >= MAX_MESSAGES_PER_DAY}
          placeholder="Type your message..."
          className="p-2 bg-gray-700 rounded w-full"
        />
        <button
          onClick={handleChatSubmit}
          disabled={messageCount >= MAX_MESSAGES_PER_DAY || !input.trim()}
          className="mt-2 bg-purple-600 hover:bg-purple-700 rounded px-4 py-2"
        >
          Send
        </button>
      </div>
      <div className="mt-4">
        <a href="/chat-history" className="text-blue-400 hover:underline">View Chat History</a>
      </div>
    </section>
  );
}
