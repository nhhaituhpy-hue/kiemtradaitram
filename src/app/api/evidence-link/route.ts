import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

type EvidenceFile = string | {
  url?: unknown;
  key?: unknown;
};

const parseIndex = (value: string | null) => {
  if (value === null || value.trim() === '') return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};

const getEvidenceFile = (evidence: unknown, refIdx: number, fileIndex: number): EvidenceFile | null => {
  if (!evidence) return null;

  if (typeof evidence === 'string') {
    return refIdx === 0 && fileIndex === 0 ? evidence : null;
  }

  if (Array.isArray(evidence)) {
    return refIdx === 0 ? (evidence[fileIndex] as EvidenceFile | undefined) || null : null;
  }

  if (typeof evidence !== 'object') return null;

  const evidenceByReference = evidence as Record<string, unknown>;
  const referenceEvidence = evidenceByReference[String(refIdx)];

  if (Array.isArray(referenceEvidence)) {
    return (referenceEvidence[fileIndex] as EvidenceFile | undefined) || null;
  }

  return fileIndex === 0 ? (referenceEvidence as EvidenceFile | undefined) || null : null;
};

const getFileDestination = (file: EvidenceFile) => {
  if (typeof file === 'string') return file;
  if (!file || typeof file !== 'object') return null;

  if (typeof file.url === 'string' && file.url.trim()) {
    return file.url;
  }

  if (typeof file.key === 'string' && file.key.trim()) {
    return `/api/files/${encodeURIComponent(file.key)}`;
  }

  return null;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unitParam = searchParams.get('unitParam');
    const categoryId = searchParams.get('categoryId');
    const itemId = searchParams.get('itemId');
    const fileType = searchParams.get('fileType');
    const refIdx = parseIndex(searchParams.get('refIdx'));
    const fileIndex = parseIndex(searchParams.get('fileIndex'));

    if (!categoryId || !itemId || !fileType || refIdx === null || fileIndex === null) {
      return NextResponse.json({ error: 'Thiếu thông tin dòng bằng chứng' }, { status: 400 });
    }

    if (fileType !== 'pdf' && fileType !== 'img') {
      return NextResponse.json({ error: 'Loại tài liệu không hợp lệ' }, { status: 400 });
    }

    const unitCode = unitParam ? unitParam.toUpperCase() : 'TUH';
    const user = await prisma.user.findFirst({
      where: { unitCode },
    });

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy đơn vị nguồn' }, { status: 404 });
    }

    const inspection = await prisma.inspection.findFirst({
      where: { userId: user.id, categoryId },
      include: {
        results: {
          where: { checklistItemId: itemId },
          select: { evidencePdf: true, evidenceImg: true },
        },
      },
    });

    const result = inspection?.results[0];
    if (!result) {
      return NextResponse.json({ error: 'Không tìm thấy dòng bằng chứng nguồn' }, { status: 404 });
    }

    const evidence = fileType === 'pdf' ? result.evidencePdf : result.evidenceImg;
    const file = getEvidenceFile(evidence, refIdx, fileIndex);
    if (!file) {
      return NextResponse.json({ error: 'Dòng nguồn chưa có tài liệu' }, { status: 404 });
    }

    const destinationValue = getFileDestination(file);
    if (!destinationValue) {
      return NextResponse.json({ error: 'Tài liệu nguồn không hợp lệ' }, { status: 404 });
    }

    const destination = new URL(destinationValue, request.url);
    const requestOrigin = new URL(request.url).origin;
    const isAllowedPath = destination.pathname.startsWith('/api/files/') || destination.pathname === '/api/evidence-link';

    if (destination.origin !== requestOrigin || !isAllowedPath) {
      return NextResponse.json({ error: 'Link tài liệu nguồn không hợp lệ' }, { status: 400 });
    }

    const response = NextResponse.redirect(destination);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    console.error('Lỗi khi resolve link dòng bằng chứng:', error);
    return NextResponse.json({ error: 'Không thể tải tài liệu nguồn' }, { status: 500 });
  }
}
