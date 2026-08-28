import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/s3';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const categoryId = formData.get('categoryId') as string | null;
    const itemId = formData.get('itemId') as string | null;
    const fileType = formData.get('fileType') as string | null; // "pdf" or "img"

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Build a meaningful storage key
    const ext = file.name.split('.').pop() || 'bin';
    const uuid = randomUUID().slice(0, 8);
    const folder = categoryId || 'unknown';
    const key = `evidence/${folder}/${itemId || 'item'}/${fileType || 'file'}_${uuid}.${ext}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to MinIO
    await uploadFile(buffer, key, file.type);

    return NextResponse.json({
      success: true,
      key,
      url: `/api/files/${encodeURIComponent(key)}`,
      fileName: file.name,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
