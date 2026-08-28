import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { categoryId, groups } = await request.json();

    if (!categoryId || !groups) {
      return NextResponse.json({ error: 'Thiếu categoryId hoặc dữ liệu groups' }, { status: 400 });
    }

    // 1. Xóa toàn bộ groups cũ (Cascade sẽ xóa luôn items)
    await prisma.checklistGroup.deleteMany({
      where: { categoryId }
    });

    // 2. Tạo lại toàn bộ groups và items
    for (const group of groups) {
      const createdGroup = await prisma.checklistGroup.create({
        data: {
          id: group.id,
          categoryId,
          order: group.order.toString(),
          title: group.title,
        }
      });

      for (const item of group.items) {
        await prisma.checklistItem.create({
          data: {
            id: item.id,
            groupId: createdGroup.id,
            orderIndex: item.orderIndex.toString(),
            title: item.title,
            statusOptions: item.statusOptions || null,
            reference: item.reference || null,
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi lưu Template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
