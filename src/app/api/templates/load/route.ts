import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    if (!categoryId) {
      return NextResponse.json({ error: 'Thiếu categoryId' }, { status: 400 });
    }

    const groups = await prisma.checklistGroup.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' }, // Sắp xếp theo order, nhưng vì order đang là chuỗi nên có thể phải parse nếu cần. Ta tạm bỏ qua vì DB lấy ra có thể đã sắp xếp.
      include: {
        items: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!groups || groups.length === 0) {
      return NextResponse.json({ data: [] });
    }
    
    // Custom sort vì order là chuỗi "1", "1.1", v.v.
    const sortedGroups = groups.sort((a, b) => {
      const numA = parseFloat(a.order) || 0;
      const numB = parseFloat(b.order) || 0;
      return numA - numB;
    });

    const formattedGroups = sortedGroups.map(group => ({
      ...group,
      order: Number(group.order),
      items: group.items.sort((a, b) => {
         const numA = parseFloat(a.orderIndex) || 0;
         const numB = parseFloat(b.orderIndex) || 0;
         return numA - numB;
      }).map(item => ({
        ...item,
        // Match với mock structure
        reference: item.reference || "",
        statusOptions: item.statusOptions || "Có\nKhông",
        note: "",
        evidencePdf: null,
        evidenceImg: null,
        status: null
      }))
    }));

    return NextResponse.json({ data: formattedGroups });
  } catch (error: any) {
    console.error('Lỗi khi tải Template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
