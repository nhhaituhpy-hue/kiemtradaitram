import { TechChecklistGroup } from "./techChecklist";

export const mockPcccChecklist: TechChecklistGroup[] = [
  {
    id: "pccc-group-1",
    order: 1,
    title: "Quy định, các văn bản chỉ đạo, hướng dẫn về PCCC&CNCH",
    items: [
      {
        id: "pccc-item-1-1",
        orderIndex: "1.1",
        title: "Quy định PCCC&CNCH của Công ty",
        status: null,
        reference: "Quy định PCCC&CNCH của Công ty",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "pccc-item-1-2",
        orderIndex: "1.2",
        title: "Các văn bản chỉ đạo, hướng dẫn về PCCC&CNCH",
        status: null,
        reference: "Các văn bản chỉ đạo, hướng dẫn về PCCC&CNCH",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-2",
    order: 2,
    title: "Phiếu thông tin của cơ sở",
    items: [
      {
        id: "pccc-item-2-1",
        orderIndex: "2.1",
        title: "Phiếu thông tin của cơ sở (BM-01 Phụ lục I)",
        status: null,
        reference: "Phiếu thông tin của cơ sở (BM-01 Phụ lục I)",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-3",
    order: 3,
    title: "Nội quy PCCC&CNCH",
    items: [
      {
        id: "pccc-item-3-1",
        orderIndex: "3.1",
        title: "Nội quy PCCC&CNCH của Công ty",
        status: null,
        reference: "Nội quy PCCC&CNCH của Công ty",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-4",
    order: 4,
    title: "Giấy chứng nhận thẩm duyệt thiết kế hoặc văn bản thẩm duyệt thiết kế về PCCC hoặc văn bản thẩm định thiết kế về PCCC, văn bản chấp thuận kết quả nghiệm thu về PCCC của cơ quan quản lý chuyên ngành đối với công trình thuộc diện phải thẩm duyệt thiết kế, thẩm định thiết kế về PCCC",
    items: [
      {
        id: "pccc-item-4-1",
        orderIndex: "4.1",
        title: "Giấy chứng nhận thẩm duyệt thiết kế hoặc văn bản thẩm duyệt thiết kế về PCCC hoặc văn bản thẩm định thiết kế về PCCC",
        status: null,
        reference: "Giấy chứng nhận thẩm duyệt thiết kế hoặc văn bản thẩm duyệt thiết kế về PCCC hoặc văn bản thẩm định thiết kế về PCCC",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "pccc-item-4-2",
        orderIndex: "4.2",
        title: "Văn bản chấp thuận kết quả nghiệm thu về PCCC của cơ quan quản lý chuyên ngành đối với công trình thuộc diện phải thẩm định thiết kế, thẩm định thiết kế về PCCC",
        status: null,
        reference: "Văn bản chấp thuận kết quả nghiệm thu về PCCC của cơ quan quản lý chuyên ngành đối với công trình thuộc diện phải thẩm định thiết kế, thẩm định thiết kế về PCCC",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "pccc-group-5",
    order: 5,
    title: "Quyết định thành lập Đội/Tổ PCCC&CNCH cơ sở hoặc văn bản phân công người thực hiện nhiệm vụ phòng cháy, chữa cháy, cứu nạn, cứu hộ tại cơ sở; thông báo kết quả huấn luyện nghiệp vụ PCCC&CNCH",
    items: [
      {
        id: "pccc-item-5-1",
        orderIndex: "5.1",
        title: "Quyết định thành lập Đội/Tổ PCCC&CNCH cơ sở",
        status: null,
        reference: "Quyết định thành lập Đội/Tổ PCCC&CNCH cơ sở",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "pccc-item-5-2",
        orderIndex: "5.2",
        title: "Phân công thực hiện nhiệm vụ của Đội/Tổ PCCC&CNCH (BM-02 Phụ lục I)",
        status: null,
        reference: "Phân công thực hiện nhiệm vụ của Đội/Tổ PCCC&CNCH (BM-02 Phụ lục I)",
        note: "Tài liệu bản chính",
      },
      {
        id: "pccc-item-5-3",
        orderIndex: "5.3",
        title: "Sơ đồ tổ chức PCCC&CNCH cơ sở",
        status: null,
        reference: "Sơ đồ tổ chức PCCC&CNCH cơ sở",
        note: "Tài liệu bản chính",
      },
      {
        id: "pccc-item-5-4",
        orderIndex: "5.4",
        title: "Quy chế hoạt động của Đội/Tổ PCCC&CNCH cơ sở",
        status: null,
        reference: "Quy chế hoạt động của Đội/Tổ PCCC&CNCH cơ sở",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "pccc-item-5-5",
        orderIndex: "5.5",
        title: "Văn bản phân công người thực hiện nhiệm vụ phòng cháy, chữa cháy, cứu nạn, cứu hộ tại cơ sở (nếu có)",
        status: null,
        reference: "Văn bản phân công người thực hiện nhiệm vụ phòng cháy, chữa cháy, cứu nạn, cứu hộ tại cơ sở (nếu có)",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "pccc-item-5-6",
        orderIndex: "5.6",
        title: "Thông báo kết quả huấn luyện nghiệp vụ PCCC&CNCH",
        status: null,
        reference: "Thông báo kết quả huấn luyện nghiệp vụ PCCC&CNCH",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-6",
    order: 6,
    title: "Hồ sơ theo dõi công tác tuyên truyền, phổ biến, giáo dục kiến thức, pháp luật về PCCC&CNCH; huấn luyện, bồi dưỡng nghiệp vụ PCCC&CNCH",
    items: [
      {
        id: "pccc-item-6-1",
        orderIndex: "6.1",
        title: "Sổ theo dõi công tác tuyên truyền, bồi dưỡng, huấn luyện nghiệp vụ PCCC&CNCH (BM-01 Phụ lục II) kèm theo thông báo kết quả huấn luyện PCCC&CNCH",
        status: null,
        reference: "Sổ theo dõi công tác tuyên truyền, bồi dưỡng, huấn luyện nghiệp vụ PCCC&CNCH (BM-01 Phụ lục II) kèm theo thông báo kết quả huấn luyện PCCC&CNCH",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-7",
    order: 7,
    title: "Phương án chữa cháy, CNCH của cơ sở",
    items: [
      {
        id: "pccc-item-7-1",
        orderIndex: "7.1",
        title: "Phương án chữa cháy, CNCH cơ sở đã được phê duyệt",
        status: null,
        reference: "Phương án chữa cháy, CNCH cơ sở đã được phê duyệt",
        note: "Tài liệu bản chính",
      },
      {
        id: "pccc-item-7-2",
        orderIndex: "7.2",
        title: "Hồ sơ tổ chức thực tập phương án chữa cháy, CNCH cơ sở (Mẫu hồ sơ lưu theo Quy trình thực tập phương án chữa cháy, CNCH của TCT QLB VN)",
        status: null,
        reference: "Hồ sơ tổ chức thực tập phương án chữa cháy, CNCH cơ sở (Mẫu hồ sơ lưu theo Quy trình thực tập phương án chữa cháy, CNCH của TCT QLB VN)",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-8",
    order: 8,
    title: "Biên bản tự kiểm tra về PCCC của cơ sở",
    items: [
      {
        id: "pccc-item-8-1",
        orderIndex: "8.1",
        title: "Biên bản tự kiểm tra về PCCC của cơ sở (BM-02, 03 Phụ lục VI)",
        status: null,
        reference: "Biên bản tự kiểm tra về PCCC của cơ sở (BM-02, 03 Phụ lục VI)",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-9",
    order: 9,
    title: "Báo cáo kết quả thực hiện công tác PCCC&CNCH của cơ sở",
    items: [
      {
        id: "pccc-item-9-1",
        orderIndex: "9.1",
        title: "Báo cáo kết quả thực hiện công tác PCCC&CNCH của cơ sở (BM-06 Phụ lục VI)",
        status: null,
        reference: "Báo cáo kết quả thực hiện công tác PCCC&CNCH của cơ sở (BM-06 Phụ lục VI)",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-10",
    order: 10,
    title: "Giấy Chứng nhận bảo hiểm cháy, nổ bắt buộc đối với cơ sở phải mua bảo hiểm cháy, nổ bắt buộc",
    items: [
      {
        id: "pccc-item-10-1",
        orderIndex: "10.1",
        title: "Giấy Chứng nhận bảo hiểm cháy, nổ kèm theo Hợp đồng bảo hiểm tài sản của Công ty",
        status: null,
        reference: "Giấy Chứng nhận bảo hiểm cháy, nổ kèm theo Hợp đồng bảo hiểm tài sản của Công ty",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "pccc-group-11",
    order: 11,
    title: "Bản vẽ hoàn công hệ thống, hạng mục liên quan đến PCCC đối với công trình thuộc diện phải thẩm định thiết kế về PCCC",
    items: [
      {
        id: "pccc-item-11-1",
        orderIndex: "11.1",
        title: "Bản vẽ hoàn công hệ thống, hạng mục liên quan đến PCCC đối với công trình thuộc diện phải thẩm định thiết kế về PCCC",
        status: null,
        reference: "Bản vẽ hoàn công hệ thống, hạng mục liên quan đến PCCC đối với công trình thuộc diện phải thẩm định thiết kế về PCCC",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "pccc-group-12",
    order: 12,
    title: "Thông báo kết quả xác minh, giải quyết vụ cháy của cơ quan Công an (nếu có)",
    items: [
      {
        id: "pccc-item-12-1",
        orderIndex: "12.1",
        title: "Thông báo kết quả xác minh, giải quyết vụ cháy của cơ quan Công an (nếu có)",
        status: null,
        reference: "Thông báo kết quả xác minh, giải quyết vụ cháy của cơ quan Công an (nếu có)",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-13",
    order: 13,
    title: "Biên bản kiểm tra về PCCC của cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở",
    items: [
      {
        id: "pccc-item-13-1",
        orderIndex: "13.1",
        title: "Biên bản kiểm tra về PCCC của cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở",
        status: null,
        reference: "Biên bản kiểm tra về PCCC của cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-14",
    order: 14,
    title: "Biên bản vi phạm hành chính, quyết định xử phạt vi phạm hành chính về PCCC&CNCH, quyết định tạm đình chỉ, đình chỉ hoạt động, phục hồi hoạt động của người có thẩm quyền, văn bản kiến nghị về PCCC của Ủy ban nhân dân cấp xã hoặc cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở (nếu có)",
    items: [
      {
        id: "pccc-item-14-1",
        orderIndex: "14.1",
        title: "Biên bản vi phạm hành chính, quyết định xử phạt vi phạm hành chính về PCCC&CNCH, quyết định tạm đình chỉ, đình chỉ hoạt động, phục hồi hoạt động của người có thẩm quyền, văn bản kiến nghị về PCCC của Ủy ban nhân dân cấp xã hoặc cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở (nếu có)",
        status: null,
        reference: "Biên bản vi phạm hành chính, quyết định xử phạt vi phạm hành chính về PCCC&CNCH, quyết định tạm đình chỉ, đình chỉ hoạt động, phục hồi hoạt động của người có thẩm quyền, văn bản kiến nghị về PCCC của Ủy ban nhân dân cấp xã hoặc cơ quan Công an, cơ quan chuyên môn về xây dựng trực tiếp quản lý cơ sở (nếu có)",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-15",
    order: 15,
    title: "Tài liệu ghi nhận kết quả kiểm tra, bảo trì, đo điện trở tiếp đất, chống sét định kỳ theo quy định",
    items: [
      {
        id: "pccc-item-15-1",
        orderIndex: "15.1",
        title: "Biên bản kết quả kiểm tra, bảo trì, đo điện trở tiếp đất, chống sét",
        status: null,
        reference: "Biên bản kết quả kiểm tra, bảo trì, đo điện trở tiếp đất, chống sét",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-16",
    order: 16,
    title: "Hồ sơ quản lý, bảo quản, bảo dưỡng phương tiện PCCC&CNCH",
    items: [
      {
        id: "pccc-item-16-1",
        orderIndex: "16.1",
        title: "Sổ theo dõi phương tiện PCCC&CNCH (BM-01 Phụ lục V)",
        status: null,
        reference: "Sổ theo dõi phương tiện PCCC&CNCH (BM-01 Phụ lục V)",
        note: "Tài liệu bản chính",
      },
      {
        id: "pccc-item-16-2",
        orderIndex: "16.2",
        title: "Hồ sơ kiểm định, bảo dưỡng phương tiện PCCC&CNCH",
        status: null,
        reference: "Hồ sơ kiểm định, bảo dưỡng phương tiện PCCC&CNCH",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "pccc-group-17",
    order: 17,
    title: "Văn bản quy phạm pháp luật về PCCC&CNCH",
    items: [
      {
        id: "pccc-item-17-1",
        orderIndex: "17.1",
        title: "Luật PCCC",
        status: null,
        reference: "Luật PCCC",
        note: "Tài liệu văn bản điện tử",
      },
      {
        id: "pccc-item-17-2",
        orderIndex: "17.2",
        title: "Nghị định về PCCC&CNCH",
        status: null,
        reference: "Nghị định về PCCC&CNCH",
        note: "Tài liệu văn bản điện tử",
      },
      {
        id: "pccc-item-17-3",
        orderIndex: "17.3",
        title: "Thông tư về PCCC&CNCH",
        status: null,
        reference: "Thông tư về PCCC&CNCH",
        note: "Tài liệu văn bản điện tử",
      }
    ]
  },
  {
    id: "pccc-group-18",
    order: 18,
    title: "Các Công văn liên quan đến công tác thực hiện PCCC&CNCH",
    items: [
      {
        id: "pccc-item-18-1",
        orderIndex: "18.1",
        title: "Các Công văn liên quan đến công tác thực hiện PCCC&CNCH",
        status: null,
        reference: "Các Công văn liên quan đến công tác thực hiện PCCC&CNCH",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "pccc-group-19",
    order: 19,
    title: "Danh mục phương tiện PCCC&CNCH trang bị cho các đài/trạm (Phụ lục VII)",
    items: [
      {
        id: "pccc-item-19-1",
        orderIndex: "19.1",
        title: "Đèn (độ sáng tối thiểu 200 lm, chịu nước tối thiểu IPX5)",
        status: null,
        reference: "Số lượng quy định: 01 Chiếc",
        note: "Niên hạn: Hỏng thay thế",
      },
      {
        id: "pccc-item-19-2",
        orderIndex: "19.2",
        title: "Rìu (chất liệu đầu rìu bằng thép cacbon cao)",
        status: null,
        reference: "Số lượng quy định: 01 Chiếc",
        note: "Niên hạn: Hỏng thay thế",
      },
      {
        id: "pccc-item-19-3",
        orderIndex: "19.3",
        title: "Xà beng (một đầu nhọn, một đầu dẹt; dài tối thiểu 100 cm)",
        status: null,
        reference: "Số lượng quy định: 01 Chiếc",
        note: "Niên hạn: Hỏng thay thế",
      },
      {
        id: "pccc-item-19-4",
        orderIndex: "19.4",
        title: "Búa (chất liệu đầu búa bằng thép cacbon cao, nặng tối thiểu 5 kg)",
        status: null,
        reference: "Số lượng quy định: 01 Chiếc",
        note: "Niên hạn: Hỏng thay thế",
      },
      {
        id: "pccc-item-19-5",
        orderIndex: "19.5",
        title: "Kìm cộng lực (có tải cắt tối thiểu 60 kg)",
        status: null,
        reference: "Số lượng quy định: 01 Chiếc",
        note: "Niên hạn: Hỏng thay thế",
      },
      {
        id: "pccc-item-19-6",
        orderIndex: "19.6",
        title: "Mặt nạ lọc độc hoặc mặt nạ phòng độc cách ly",
        status: null,
        reference: "Số lượng quy định: 03 Bộ",
        note: "Niên hạn: Hỏng thay thế",
      }
    ]
  }
];
