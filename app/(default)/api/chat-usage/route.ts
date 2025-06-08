import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { wallet } = await req.json();
  const filePath = path.join(process.cwd(), 'public', 'data', 'chat-usage.json');
  const today = new Date().toISOString().split('T')[0];

  let usageData: any[] = [];
  if (fs.existsSync(filePath)) {
    usageData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  const userIndex = usageData.findIndex(u => u.wallet === wallet && u.date === today);

  if (userIndex !== -1) {
    usageData[userIndex].count++;
  } else {
    usageData.push({ wallet, date: today, count: 1 });
  }

  fs.writeFileSync(filePath, JSON.stringify(usageData, null, 2));
  return NextResponse.json({ success: true });
}
