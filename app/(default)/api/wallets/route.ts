import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/data/paid-wallets.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { wallet, name } = await req.json();

  let wallets = [];
  if (fs.existsSync(filePath)) {
    wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  if (!wallets.some((entry: any) => entry.wallet.toLowerCase() === wallet.toLowerCase())) {
    wallets.push({ wallet: wallet.toLowerCase(), name });
    fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2));
    return NextResponse.json({ success: true, message: 'Wallet added successfully.' });
  }

  return NextResponse.json({ success: false, message: 'Wallet already exists.' });
}
