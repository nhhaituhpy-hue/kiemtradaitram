import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Order indexes are labels such as "1.2" and "1.10", not decimal numbers.
// Numeric collation keeps each numeric part in natural order while still
// handling non-numeric labels used by some checklist templates.
const orderCollator = new Intl.Collator('vi', {
  numeric: true,
  sensitivity: 'base',
});

const compareOrderValues = (left: string | number, right: string | number) =>
  orderCollator.compare(String(left ?? '').trim(), String(right ?? '').trim());

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    if (!categoryId) {
      return NextResponse.json({ error: 'Thiếu categoryId' }, { status: 400 });
    }

    const groups = await prisma.checklistGroup.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' }, // Initial DB order; normalized below for natural sorting.
      include: {
        items: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!groups || groups.length === 0) {
      return NextResponse.json({ data: [] });
    }
    
    // Normalize string-based order values after the database query.
    const sortedGroups = groups.sort((a, b) => {
      return compareOrderValues(a.order, b.order);
    });

    const formattedGroups = sortedGroups.map(group => ({
      ...group,
      order: Number(group.order),
      items: group.items.sort((a, b) => {
         return compareOrderValues(a.orderIndex, b.orderIndex);
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
