import { NextRequest, NextResponse } from 'next/server';
import { deleteFile } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    }

    await deleteFile(key);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error.message },
      { status: 500 }
    );
  }
}
