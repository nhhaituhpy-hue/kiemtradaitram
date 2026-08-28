import { TechChecklistGroup } from "./techChecklist";

export const mockAtvsldChecklist: TechChecklistGroup[] = [
  {
    id: "atvsld-group-1",
    order: 1,
    title: "Giấy phép sử dụng, chứng nhận kỹ thuật, phiếu kiểm định",
    items: [
      {
        id: "atvsld-item-1-1",
        orderIndex: "1.1",
        title: "Giấy phép sử dụng các thiết bị có yêu cầu về an toàn",
        status: null,
        reference: "Giấy phép sử dụng các thiết bị có yêu cầu về an toàn",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-1-2",
        orderIndex: "1.2",
        title: "Giấy phép khai thác hệ thống xử lý chất thải",
        status: null,
        reference: "Giấy phép khai thác hệ thống xử lý chất thải",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-1-3",
        orderIndex: "1.3",
        title: "Giấy kiểm định các thiết bị có yêu cầu về an toàn",
        status: null,
        reference: "Giấy kiểm định các thiết bị có yêu cầu về an toàn",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-1-4",
        orderIndex: "1.4",
        title: "Chứng chỉ huấn luyện ATVSLĐ",
        status: null,
        reference: "Chứng chỉ huấn luyện ATVSLĐ",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "atvsld-group-2",
    order: 2,
    title: "Hồ sơ dự án xây dựng công trình",
    items: [
      {
        id: "atvsld-item-2-1",
        orderIndex: "2.1",
        title: "Biên bản giao nhận phương tiện, thiết bị ATVSLĐ cho đơn vị cơ sở",
        status: null,
        reference: "Biên bản giao nhận phương tiện, thiết bị ATVSLĐ cho đơn vị cơ sở",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-2-2",
        orderIndex: "2.2",
        title: "Biên bản nghiệm thu phương tiện, thiết bị ATVSLĐ đưa vào sử dụng",
        status: null,
        reference: "Biên bản nghiệm thu phương tiện, thiết bị ATVSLĐ đưa vào sử dụng",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-2-3",
        orderIndex: "2.3",
        title: "Hồ sơ hoàn công: Bản vẽ thiết kế hoàn công, sơ đồ đấu nối, sơ đồ cung cấp điện, kết quả tham số nghiệm thu đưa vào khai thác các hệ thống, phương tiện, thiết bị ATVSLĐ",
        status: null,
        reference: "Hồ sơ hoàn công: Bản vẽ thiết kế hoàn công, sơ đồ đấu nối, sơ đồ cung cấp điện, kết quả tham số nghiệm thu đưa vào khai thác các hệ thống, phương tiện, thiết bị ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-2-4",
        orderIndex: "2.4",
        title: "Quyết định đưa hệ thống thiết bị phương tiện ATVSLĐ vào khai thác",
        status: null,
        reference: "Quyết định đưa hệ thống thiết bị phương tiện ATVSLĐ vào khai thác",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "atvsld-group-3",
    order: 3,
    title: "Văn bản pháp lý",
    items: [
      {
        id: "atvsld-item-3-1",
        orderIndex: "3.1",
        title: "Bộ luật Lao động",
        status: null,
        reference: "Bộ luật Lao động",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-3-2",
        orderIndex: "3.2",
        title: "Nghị định về ATVSLĐ",
        status: null,
        reference: "Nghị định về ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-3-3",
        orderIndex: "3.3",
        title: "Thông tư về ATVSLĐ",
        status: null,
        reference: "Thông tư về ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-3-4",
        orderIndex: "3.4",
        title: "Quy định của Công ty về ATVSLĐ",
        status: null,
        reference: "Quy định của Công ty về ATVSLĐ",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-3-5",
        orderIndex: "3.5",
        title: "Luật ATVSLĐ",
        status: null,
        reference: "Luật ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "atvsld-group-4",
    order: 4,
    title: "Tài liệu kỹ thuật",
    items: [
      {
        id: "atvsld-item-4-1",
        orderIndex: "4.1",
        title: "Thiết kế, sơ đồ đấu nối hệ thống thiết bị ATVSLĐ",
        status: null,
        reference: "Thiết kế, sơ đồ đấu nối hệ thống thiết bị ATVSLĐ",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-4-2",
        orderIndex: "4.2",
        title: "Nguyên lý hoạt động hệ thống thiết bị ATVSLĐ",
        status: null,
        reference: "Nguyên lý hoạt động hệ thống thiết bị ATVSLĐ",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-4-3",
        orderIndex: "4.3",
        title: "Hướng dẫn khai thác, bảo dưỡng, sửa chữa hệ thống thiết bị ATVSLĐ",
        status: null,
        reference: "Hướng dẫn khai thác, bảo dưỡng, sửa chữa hệ thống thiết bị ATVSLĐ",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-4-4",
        orderIndex: "4.4",
        title: "Tài liệu huấn luyện kỹ năng khai thác bảo dưỡng, sửa chữa hệ thống thiết bị ATVSLĐ",
        status: null,
        reference: "Tài liệu huấn luyện kỹ năng khai thác bảo dưỡng, sửa chữa hệ thống thiết bị ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-4-5",
        orderIndex: "4.5",
        title: "Lý lịch thiết bị hệ thống thiết bị ATVSLĐ",
        status: null,
        reference: "Lý lịch thiết bị hệ thống thiết bị ATVSLĐ",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "atvsld-group-5",
    order: 5,
    title: "Hồ sơ, tài liệu huấn luyện ATVSLĐ",
    items: [
      {
        id: "atvsld-item-5-1",
        orderIndex: "5.1",
        title: "Danh sách nhân viên, kết quả kiểm tra huấn luyện về ATVSLĐ",
        status: null,
        reference: "Danh sách nhân viên, kết quả kiểm tra huấn luyện về ATVSLĐ",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "atvsld-group-6",
    order: 6,
    title: "Biên bản về ATVSLĐ",
    items: [
      {
        id: "atvsld-item-6-1",
        orderIndex: "6.1",
        title: "Biên bản kiểm tra ATVSLĐ định kỳ",
        status: null,
        reference: "Biên bản kiểm tra ATVSLĐ định kỳ",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-6-2",
        orderIndex: "6.2",
        title: "Biên bản kiểm tra ATVSLĐ đột xuất",
        status: null,
        reference: "Biên bản kiểm tra ATVSLĐ đột xuất",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-6-3",
        orderIndex: "6.3",
        title: "Biên bản, kết luận điều tra tai nạn lao động",
        status: null,
        reference: "Biên bản, kết luận điều tra tai nạn lao động",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  },
  {
    id: "atvsld-group-7",
    order: 7,
    title: "Hồ sơ quản lý sức khỏe người lao động",
    items: [
      {
        id: "atvsld-item-7-1",
        orderIndex: "7.1",
        title: "Kết quả khám sức khỏe định kỳ hằng năm",
        status: null,
        reference: "Kết quả khám sức khỏe định kỳ hằng năm",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-7-2",
        orderIndex: "7.2",
        title: "Hồ sơ quản lý các bệnh nghề nghiệp",
        status: null,
        reference: "Hồ sơ quản lý các bệnh nghề nghiệp",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-7-3",
        orderIndex: "7.3",
        title: "Báo cáo tình hình cấp phát và sử dụng thuốc chữa bệnh thông thường",
        status: null,
        reference: "Báo cáo tình hình cấp phát và sử dụng thuốc chữa bệnh thông thường",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "atvsld-group-8",
    order: 8,
    title: "Báo cáo công tác ATVSLĐ",
    items: [
      {
        id: "atvsld-item-8-1",
        orderIndex: "8.1",
        title: "Báo cáo công tác ATVSLĐ của tập thể trực thuộc bộ phận, đơn vị",
        status: null,
        reference: "Báo cáo công tác ATVSLĐ của tập thể trực thuộc bộ phận, đơn vị",
        note: "Tài liệu bản photo từ bản chính",
      },
      {
        id: "atvsld-item-8-2",
        orderIndex: "8.2",
        title: "Báo cáo công tác ATVSLĐ của bộ phận, đơn vị",
        status: null,
        reference: "Báo cáo công tác ATVSLĐ của bộ phận, đơn vị",
        note: "Tài liệu không bắt buộc phải có",
      },
      {
        id: "atvsld-item-8-3",
        orderIndex: "8.3",
        title: "Báo cáo công tác ATVSLĐ của Công ty",
        status: null,
        reference: "Báo cáo công tác ATVSLĐ của Công ty",
        note: "Tài liệu không bắt buộc phải có",
      }
    ]
  },
  {
    id: "atvsld-group-9",
    order: 9,
    title: "Sổ ghi kết quả kiểm tra, đánh giá và kiến nghị về ATVSLĐ",
    items: [
      {
        id: "atvsld-item-9-1",
        orderIndex: "9.1",
        title: "Sổ ghi kết quả kiểm tra, đánh giá và kiến nghị về ATVSLĐ",
        status: null,
        reference: "Sổ ghi kết quả kiểm tra, đánh giá và kiến nghị về ATVSLĐ",
        note: "Tài liệu bản chính",
      }
    ]
  },
  {
    id: "atvsld-group-10",
    order: 10,
    title: "Các công văn liên quan đến công tác thực hiện ATVSLĐ",
    items: [
      {
        id: "atvsld-item-10-1",
        orderIndex: "10.1",
        title: "Các công văn liên quan đến công tác thực hiện ATVSLĐ",
        status: null,
        reference: "Các công văn liên quan đến công tác thực hiện ATVSLĐ",
        note: "Tài liệu bản photo từ bản chính",
      }
    ]
  }
];
