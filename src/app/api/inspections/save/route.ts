import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { categoryId, unitParam, data } = await request.json();

    if (!categoryId || !data) {
      return NextResponse.json({ error: 'Thiếu dữ liệu bắt buộc' }, { status: 400 });
    }

    // Lấy user bằng unitCode (ví dụ param là /dashboard/tuh -> unitCode = TUH)
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

    // Lấy hoặc tạo bản ghi Inspection
    let inspection = await prisma.inspection.findFirst({
      where: { userId: user.id, categoryId }
    });

    if (!inspection) {
      inspection = await prisma.inspection.create({
        data: { userId: user.id, categoryId, status: "DRAFT" }
      });
    }

    // Cập nhật từng dòng InspectionResult
    for (const group of data) {
      for (const item of group.items) {
         await prisma.inspectionResult.upsert({
           where: {
             inspectionId_checklistItemId: {
                inspectionId: inspection.id,
                checklistItemId: item.id
             }
           },
           update: {
              status: item.status ? item.status : null,
              note: item.note || null,
              reference: item.reference || null,
              evidencePdf: item.evidencePdfs || (item.evidencePdf ? { 0: item.evidencePdf } : null),
              evidenceImg: item.evidenceImgs || (item.evidenceImg ? { 0: item.evidenceImg } : null),
           },
           create: {
              inspectionId: inspection.id,
              checklistItemId: item.id,
              status: item.status ? item.status : null,
              note: item.note || null,
              reference: item.reference || null,
              evidencePdf: item.evidencePdfs || (item.evidencePdf ? { 0: item.evidencePdf } : null),
              evidenceImg: item.evidenceImgs || (item.evidenceImg ? { 0: item.evidenceImg } : null),
           }
         });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi lưu DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
