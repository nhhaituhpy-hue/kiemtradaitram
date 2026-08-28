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
      // Auto-tạo user nếu DB trống (chưa seed)
      user = await prisma.user.create({
        data: {
          username: `user_${unitCode.toLowerCase()}`,
          password: 'hashed_password_mock',
          unitCode: unitCode,
          unitName: `Trạm ${unitCode}`,
          role: 'USER'
        }
      });
    }

    // Đảm bảo category tồn tại để tránh lỗi Foreign Key
    await prisma.category.upsert({
      where: { id: categoryId },
      update: {},
      create: { id: categoryId, title: categoryId }
    });

    // Lấy hoặc tạo bản ghi Inspection
    let inspection = await prisma.inspection.findFirst({
      where: { userId: user.id, categoryId }
    });

    if (!inspection) {
      inspection = await prisma.inspection.create({
        data: { userId: user.id, categoryId, status: "DRAFT" }
      });
    }

    // Kiểm tra xem Admin đã khởi tạo biểu mẫu (Template) trong DB chưa
    if (data.length > 0 && data[0].items && data[0].items.length > 0) {
       const firstItemId = data[0].items[0].id;
       const itemExists = await prisma.checklistItem.findUnique({ where: { id: firstItemId } });
       if (!itemExists) {
          return NextResponse.json({ 
             error: "Biểu mẫu chưa được lưu trên hệ thống. Vui lòng nhờ Admin vào 'Quản trị hệ thống' để 'Lưu cấu hình' biểu mẫu này trước khi tiến hành điền báo cáo!" 
          }, { status: 400 });
       }
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
