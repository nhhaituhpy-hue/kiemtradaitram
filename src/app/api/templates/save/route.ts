import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { categoryId, groups } = await request.json();

    if (!categoryId || !groups) {
      return NextResponse.json({ error: 'Thiếu categoryId hoặc dữ liệu groups' }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      // 0. Đảm bảo Category tồn tại để tránh lỗi Foreign Key Constraint
      await tx.category.upsert({
        where: { id: categoryId },
        update: {},
        create: {
          id: categoryId,
          title: categoryId, // Dùng ID làm title tạm thời
        }
      });

      // Keep the existing item ids so a template save can also repair stale
      // reference copies already stored in inspections.
      const existingItems = await tx.checklistItem.findMany({
        where: { group: { categoryId } },
        select: { id: true },
      });
      const existingItemIds = new Set(existingItems.map((item) => item.id));

      const payloadGroupIds = groups.map((g: any) => g.id);

      // 1. Xóa các Group không còn trong danh sách mới
      await tx.checklistGroup.deleteMany({
        where: {
          categoryId,
          id: { notIn: payloadGroupIds }
        }
      });

      // 2. Lặp qua các group để Update hoặc Create
      for (const group of groups) {
        await tx.checklistGroup.upsert({
          where: { id: group.id },
          update: {
            order: group.order.toString(),
            title: group.title,
          },
          create: {
            id: group.id,
            categoryId,
            order: group.order.toString(),
            title: group.title,
          }
        });

        // Xóa các Item không còn trong danh sách của group này
        const payloadItemIds = group.items.map((i: any) => i.id);
        await tx.checklistItem.deleteMany({
          where: {
            groupId: group.id,
            id: { notIn: payloadItemIds }
          }
        });

        // Upsert từng Item
        for (const item of group.items) {
          const nextReference = item.reference || null;

          await tx.checklistItem.upsert({
            where: { id: item.id },
            update: {
              orderIndex: item.orderIndex.toString(),
              title: item.title,
              statusOptions: item.statusOptions || null,
              // @ts-ignore
              reference: nextReference,
            },
            create: {
              id: item.id,
              groupId: group.id,
              orderIndex: item.orderIndex.toString(),
              title: item.title,
              statusOptions: item.statusOptions || null,
              // @ts-ignore
              reference: nextReference,
            }
          });

          // The template is the source of truth for reference rows. Sync all
          // existing inspection copies so old rows cannot reappear on reload.
          if (existingItemIds.has(item.id)) {
            await tx.inspectionResult.updateMany({
              where: { checklistItemId: item.id },
              data: { reference: nextReference },
            });
          }
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi lưu Template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
