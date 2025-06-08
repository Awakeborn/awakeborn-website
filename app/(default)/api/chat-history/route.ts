import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const historyDir = path.join(process.cwd(), 'public/chat-histories');

if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
}

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get('wallet');
  const filePath = path.join(historyDir, `${wallet}.json`);

  if (!fs.existsSync(filePath)) return NextResponse.json([]);

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { wallet, input, output } = await req.json();
  const filePath = path.join(historyDir, `${wallet}.json`);
  const today = new Date().toISOString().split('T')[0];

  let chatHistory = [];
  if (fs.existsSync(filePath)) {
    chatHistory = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  chatHistory.push({ date: today, input, output });
  fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2));

  return NextResponse.json({ success: true });
}
