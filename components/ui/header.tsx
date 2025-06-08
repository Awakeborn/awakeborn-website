'use client';
import Link from 'next/link';
import Image from 'next/image';
import WalletConnect from '@/components/wallet-connect';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Awakeborn" width={160} height={50} />
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/"><span className="hover:text-purple-500">Home</span></Link>
          <Link href="/about"><span className="hover:text-purple-500">About Us</span></Link>
          <Link href="/contact"><span className="hover:text-purple-500">Contact Us</span></Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://dapp.quickswap.exchange/swap/v3/ETH/0x380DF89D883776ba04f65569F1D1A6E218bFc2dF"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow"
          >
            Buy AWK Token
          </a>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
