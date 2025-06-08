'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // 🔁 On mount or wallet event
  useEffect(() => {
    const init = async () => {
      const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
      const connected = accounts && accounts.length > 0 ? accounts[0] : null;
      const stored = localStorage.getItem('awakeborn_user');

      if (connected && stored) {
        const { address, name } = JSON.parse(stored);
        if (address.toLowerCase() === connected.toLowerCase()) {
          setWalletAddress(connected);
          setUserName(name);
          window.dispatchEvent(new Event('awakeborn:walletUpdated'));
        }
      }
    };

    init();

    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        const newAddress = accounts[0];
        setWalletAddress(newAddress);

        const saved = localStorage.getItem('awakeborn_user');
        if (saved) {
          const { address, name } = JSON.parse(saved);
          if (address.toLowerCase() === newAddress.toLowerCase()) {
            setUserName(name);
            setShowNamePrompt(false);
            window.dispatchEvent(new Event('awakeborn:walletUpdated'));
          } else {
            setUserName('');
            setShowNamePrompt(true);
          }
        } else {
          setShowNamePrompt(true);
        }
      }
    });
  }, []);

  const connect = async () => {
    if (!window.ethereum) return alert('MetaMask not found');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    setWalletAddress(address);

    const saved = localStorage.getItem('awakeborn_user');
    if (saved) {
      const { address: storedAddr, name } = JSON.parse(saved);
      if (storedAddr.toLowerCase() === address.toLowerCase() && name) {
        setUserName(name);
        setShowNamePrompt(false);
        window.dispatchEvent(new Event('awakeborn:walletUpdated'));
        return;
      }
    }

    setShowNamePrompt(true);
  };

  const submitName = async () => {
    if (!userName || !walletAddress) return;
    localStorage.setItem('awakeborn_user', JSON.stringify({ address: walletAddress, name: userName }));
    await fetch('/api/register-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: walletAddress, name: userName }),
    });

    setShowNamePrompt(false);
    window.dispatchEvent(new Event('awakeborn:walletUpdated'));
  };

  const disconnect = () => {
    setWalletAddress('');
    setUserName('');
    setShowNamePrompt(false);
    window.dispatchEvent(new Event('awakeborn:logout'));
  };

  return (
    <div className="text-center">
      {!walletAddress ? (
        <button
          onClick={connect}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col items-end text-white text-sm">
          <div className="font-semibold">{userName || 'Connected'}</div>
          <div className="text-gray-400 text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div>
          <button
            onClick={disconnect}
            className="mt-1 text-xs text-red-400 hover:text-red-500"
          >
            Disconnect
          </button>
        </div>
      )}

      {showNamePrompt && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg max-w-md mx-auto">
          <p className="mb-2 text-white">Enter your name:</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
          />
          <button
            onClick={submitName}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
