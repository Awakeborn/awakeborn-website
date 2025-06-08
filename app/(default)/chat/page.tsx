'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<{input: string; output: string;}[]>([]);
  const router = useRouter();
  const MAX_MESSAGES_PER_DAY = 5;

  useEffect(() => {
    async function verifyAccessAndLoadHistory() {
      if (!window.ethereum) return router.push('/');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const wallet = accounts[0]?.toLowerCase();
      setAddress(wallet);

      const usageRes = await fetch('/data/chat-usage.json');
      const usageData = await usageRes.json();
      const today = new Date().toISOString().split('T')[0];
      const userUsage = usageData.find((u: any) => u.wallet === wallet && u.date === today);
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
    const awakebornOutput = `Awakeborn's reply: "${input}"`;

    const newEntry = { input, output: awakebornOutput };
    setChatLog([...chatLog, newEntry]);
    setInput('');
    setMessageCount(messageCount + 1);

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
  };

  return (
    <section className="max-w-3xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-semibold">Awakeborn Chat</h1>
      {address && <p>Wallet: {address}</p>}
      <p>{messageCount}/{MAX_MESSAGES_PER_DAY} messages used today.</p>
      <div className="text-left mt-6">
        {chatLog.map((msg, index) => (
          <div key={index} className="my-2 p-3 bg-gray-800 rounded">
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
          className="p-2 bg-gray-700 rounded w-full"
        />
        <button
          onClick={handleChatSubmit}
          disabled={messageCount >= MAX_MESSAGES_PER_DAY}
          className="btn bg-purple-600 mt-2"
        >
          Send
        </button>
      </div>
      <a href="/chat-history" className="text-blue-400">View Chat History</a>
    </section>
  );
}
