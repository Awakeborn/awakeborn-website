import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'public/data/early-access.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    data.count += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, newCount: data.count });
  } catch (error) {
    console.error('Error updating user count:', error);
    return NextResponse.json({ success: false, error: 'Failed to update count' }, { status: 500 });
  }
}
