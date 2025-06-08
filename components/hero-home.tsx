'use client';

import { useEffect, useState } from 'react';
import CountdownTimer from './countdown-timer';
import { ethers } from 'ethers';

const AWK_TOKEN_ADDRESS = '0x380DF89D883776ba04f65569F1D1A6E218bFc2dF';
const RECEIVER_ADDRESS = '0xC2dAe8b4821A37485E44D2947fC84b15C88034BD';
const PAYMENT_AMOUNT = '10000';

export default function HeroHome() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState(5);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    fetch('/data/early-access.json')
      .then((res) => res.json())
      .then((data) => setUserCount(data.count));

    const sync = async () => {
      if (typeof window.ethereum === 'undefined') return;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const connected = accounts?.[0] || null;
      setAddress(connected);

      if (connected) {
        const res = await fetch('/data/paid-wallets.json');
        const walletEntries: { wallet: string; name: string }[] = await res.json();
        const paidWallets = walletEntries.map(entry => entry.wallet.toLowerCase());
        setHasPaid(paidWallets.includes(connected.toLowerCase()));
      }
    };

    sync();
    window.addEventListener('awakeborn:walletUpdated', sync);
    window.addEventListener('awakeborn:logout', sync);

    return () => {
      window.removeEventListener('awakeborn:walletUpdated', sync);
      window.removeEventListener('awakeborn:logout', sync);
    };
  }, []);

  const requestAccess = async () => {
    if (userCount && userCount >= 250) {
      alert('Early access limit reached.');
      return;
    }

    if (!window.ethereum) {
      alert('MetaMask required.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        AWK_TOKEN_ADDRESS,
        ['function transfer(address to, uint256 amount) public returns (bool)'],
        signer
      );

      const amount = ethers.utils.parseUnits(PAYMENT_AMOUNT, 18);
      const tx = await contract.transfer(RECEIVER_ADDRESS, amount);
      await tx.wait();

      const sender = await signer.getAddress();
      setHasPaid(true);

      await fetch('/api/increment-user-count', { method: 'POST' });

      const storedUser = JSON.parse(localStorage.getItem('awakeborn_user') || '{}');
      await fetch('/api/wallets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: sender.toLowerCase(), name: storedUser.name || "Anonymous" }),
      });

      setUserCount((prev) => (prev ? prev + 1 : 1));
      alert('✅ Early access granted permanently!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Check MetaMask.');
    }
  };

  if (!isMounted) return null;

  return (
    <section className="relative text-center py-20">
      <CountdownTimer />
      <p className="text-lg text-purple-400 font-semibold mt-4">
        {userCount !== null ? `${userCount} / 250 users joined` : 'Loading users...'}
      </p>

      <div className="flex justify-center gap-4 mt-8">
        {hasPaid ? (
          <a href="/chat" className="btn bg-green-600 hover:bg-green-700 text-white shadow-lg">
            Chat with Awakeborn ({messagesLeft}/5 today)
          </a>
        ) : (
          <button
            onClick={requestAccess}
            className="btn bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          >
            Request Early Access (10,000 AWK)
          </button>
        )}
        <a className="btn bg-gray-800 hover:bg-gray-700 text-white" href="/whitepaper.pdf" target="_blank">
          Read Whitepaper
        </a>
      </div>
    </section>
  );
}
