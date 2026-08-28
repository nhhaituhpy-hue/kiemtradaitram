import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const unitParam = searchParams.get('unitParam');

    if (!categoryId) {
      return NextResponse.json({ error: 'Thiếu categoryId' }, { status: 400 });
    }

    const unitCode = unitParam ? unitParam.toUpperCase() : 'TUH';
    let user = await prisma.user.findFirst({
      where: { unitCode }
    });

    if (!user) {
      user = await prisma.user.findFirst();
    }
    
    if (!user) {
       return NextResponse.json({ error: 'Không tìm thấy user nào trong hệ thống' }, { status: 404 });
    }

    const inspection = await prisma.inspection.findFirst({
      where: { userId: user.id, categoryId },
      include: {
        results: true
      }
    });

    if (!inspection) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data: inspection.results });
  } catch (error: any) {
    console.error('Lỗi khi tải DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
