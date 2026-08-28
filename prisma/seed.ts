import { PrismaClient } from '@prisma/client';
import { defaultCategories } from '../src/data/categories';
import { mockTechChecklist } from '../src/data/techChecklist';
import { mockSmsChecklist } from '../src/data/smsChecklist';
import { mockPcccChecklist } from '../src/data/pcccChecklist';
import { mockPcttChecklist } from '../src/data/pcttChecklist';
import { mockAtttChecklist } from '../src/data/atttChecklist';
import { mockBtctChecklist } from '../src/data/btctChecklist';
import { mockAtvsldChecklist } from '../src/data/atvsldChecklist';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Seed Categories
  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        title: cat.title,
        shortTitle: cat.shortTitle,
        subtitle: cat.subtitle,
        iconName: cat.iconName,
        color: cat.color,
        hoverColor: cat.hoverColor,
        gradient: cat.gradient,
        bgImage: cat.bgImage
      },
      create: {
        id: cat.id,
        title: cat.title,
        shortTitle: cat.shortTitle,
        subtitle: cat.subtitle,
        iconName: cat.iconName,
        color: cat.color,
        hoverColor: cat.hoverColor,
        gradient: cat.gradient,
        bgImage: cat.bgImage
      }
    });
  }
  console.log('Categories seeded.');

  // 2. Map checklist arrays to category IDs
  const checklists: Record<string, any[]> = {
    'quan-ly-ky-thuat': mockTechChecklist,
    'quan-ly-an-toan-sms': mockSmsChecklist,
    'phong-chay-chua-chay': mockPcccChecklist,
    'phong-chong-thien-tai': mockPcttChecklist,
    'an-toan-thong-tin': mockAtttChecklist,
    'bao-tri-cong-trinh': mockBtctChecklist,
    'an-toan-lao-dong': mockAtvsldChecklist,
  };

  // 3. Seed Checklist Groups and Items
  for (const [categoryId, groups] of Object.entries(checklists)) {
    // Clear old items for this category to ensure clean seeding
    const oldGroups = await prisma.checklistGroup.findMany({ where: { categoryId } });
    for (const group of oldGroups) {
      await prisma.checklistItem.deleteMany({ where: { groupId: group.id } });
    }
    await prisma.checklistGroup.deleteMany({ where: { categoryId } });

    for (const group of groups) {
      const createdGroup = await prisma.checklistGroup.create({
        data: {
          categoryId,
          order: group.order.toString(),
          title: group.title,
        }
      });

      for (const item of group.items) {
        await prisma.checklistItem.create({
          data: {
            groupId: createdGroup.id,
            orderIndex: item.orderIndex.toString(),
            title: item.title,
            statusOptions: item.statusOptions || null,
          }
        });
      }
    }
    console.log(`Seeded items for category: ${categoryId}`);
  }

  // 4. Seed Default Users
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'password123', // IN REAL LIFE: bcrypt hash
      unitCode: 'ADMIN',
      unitName: 'Hệ thống Quản trị',
      role: 'ADMIN'
    }
  });
  
  await prisma.user.upsert({
    where: { username: 'tuh' },
    update: {},
    create: {
      username: 'tuh',
      password: 'password123', // IN REAL LIFE: bcrypt hash
      unitCode: 'TUH',
      unitName: 'Đài DVOR/DME Tuy Hòa',
      role: 'USER'
    }
  });

  console.log('Users seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
