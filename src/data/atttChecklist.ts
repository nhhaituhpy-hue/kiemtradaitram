import { TechChecklistGroup } from "./techChecklist";

export const mockAtttChecklist: TechChecklistGroup[] = [
  {
    id: "attt-group-1",
    order: 1,
    title: "Quản lý tài sản CNTT",
    items: []
  },
  {
    id: "attt-group-1-1",
    order: "1.1",
    title: "Quản lý, sử dụng tài sản CNTT",
    items: [
      {
        id: "attt-item-1-1-1",
        orderIndex: "-",
        title: "Công tác quản lý, sử dụng tài sản CNTT",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-1-1-2",
        orderIndex: "-",
        title: "Công tác theo dõi, giám sát việc tuân thủ quy định trách nhiệm của cá nhân, bộ phận đối với việc quản lý, sử dụng tài sản.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-1-2",
    order: "1.2",
    title: "Phân loại tài sản thông tin",
    items: [
      {
        id: "attt-item-1-2-1",
        orderIndex: "-",
        title: "Công tác đánh giá, phân loại và quản lý tài sản thông tin.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-2",
    order: 2,
    title: "Quản lý nguồn nhân lực",
    items: []
  },
  {
    id: "attt-group-2-1",
    order: "2.1",
    title: "Nhân lực nội bộ",
    items: [
      {
        id: "attt-item-2-1-1",
        orderIndex: "-",
        title: "Công tác tuyển dụng nhân sự cho các vị trí trọng yếu của hệ thống CNTT",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-1-2",
        orderIndex: "-",
        title: "Công tác thực hiện việc quy định vai trò, trách nhiệm của nhân viên đối với việc đảm bảo an toàn CNTT",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-1-3",
        orderIndex: "-",
        title: "Công tác quản lý đối với nhân viên nghỉ việc hoặc thay đổi công việc.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-1-4",
        orderIndex: "-",
        title: "Công tác ký cam kết bảo mật ATANTT đối với nhân viên làm việc tại đơn vị.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-1-5",
        orderIndex: "-",
        title: "Bàn giao tài sản và thu hồi, thay đổi quyền truy cập hệ thống CNTT đối với nhân viên chấm dứt hoặc thay đổi công việc.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-2-2",
    order: "2.2",
    title: "Nhân lực bên thứ ba (Nếu có)",
    items: [
      {
        id: "attt-item-2-2-1",
        orderIndex: "-",
        title: "Công tác quản lý nhân sự của bên thứ ba khi tham gia vào hoạt động liên quan đến hệ thống CNTT của đơn vị.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-2-2",
        orderIndex: "-",
        title: "Công tác ký cam kết không tiết lộ thông tin của bên thứ ba.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-2-2-3",
        orderIndex: "-",
        title: "Bàn giao tài sản, quyền truy cập hệ thống, khóa, mật khẩu (nếu có) cho bên thứ ba trước khi bắt đầu và sau khi kết thúc công việc.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-3",
    order: 3,
    title: "Quy định về vật lý và môi trường",
    items: []
  },
  {
    id: "attt-group-3-1",
    order: "3.1",
    title: "An toàn vật lý và môi trường",
    items: [
      {
        id: "attt-item-3-1-1",
        orderIndex: "-",
        title: "Công tác quản lý phòng máy chủ có yêu cầu cao về an toàn, bảo mật",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-3-2",
    order: "3.2",
    title: "An toàn, bảo mật tài sản CNTT",
    items: [
      {
        id: "attt-item-3-2-1",
        orderIndex: "-",
        title: "Công tác quản lý an toàn về nguồn điện cho hệ thống thông tin",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-3-2-2",
        orderIndex: "-",
        title: "Công tác đảm bảo an toàn hệ thống cáp điện và cáp truyền dẫn.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-3-2-3",
        orderIndex: "-",
        title: "Công tác quản lý thiết bị lưu trữ dữ liệu tại đơn vị",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-4",
    order: 4,
    title: "Quy định về truyền thông và vận hành",
    items: []
  },
  {
    id: "attt-group-4-1",
    order: "4.1",
    title: "Quy trình vận hành",
    items: [
      {
        id: "attt-item-4-1-1",
        orderIndex: "-",
        title: "Công tác ban hành và triển khai các quy trình vận hành các hệ thống thông tin",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-1-2",
        orderIndex: "-",
        title: "Công tác quản lý sự thay đổi của hệ thống thông tin.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-1-3",
        orderIndex: "-",
        title: "Công tác quản lý môi trường thử nghiệm trong việc thay đổi và phát triển hệ thống thông tin.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-1-4",
        orderIndex: "-",
        title: "Công tác quản lý và sử dụng Internet.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-4-2",
    order: "4.2",
    title: "Sao lưu dự phòng",
    items: [
      {
        id: "attt-item-4-2-1",
        orderIndex: "-",
        title: "Công tác sao lưu dự phòng tại đơn vị (các giải pháp lưu trữ dữ liệu đang triển khai...)",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-2-2",
        orderIndex: "-",
        title: "Công tác kiểm tra việc phục hồi dữ liệu đã được sao lưu.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-4-3",
    order: "4.3",
    title: "Quản lý về an toàn, bảo mật mạng",
    items: [
      {
        id: "attt-item-4-3-1",
        orderIndex: "-",
        title: "Tuân thủ thiết kế trong việc phân chia vùng mạng, đảm bảo an toàn an ninh cho các vùng mạng (sử dụng các giải pháp/thiết bị tường lửa, IPS/IDS...)",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-3-2",
        orderIndex: "-",
        title: "Công tác đánh giá an ninh mạng (dò quét điểm yếu kỹ thuật, các truy cập bất hợp pháp...)",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-4-3-3",
        orderIndex: "-",
        title: "Công tác quản lý về an toàn bảo mật đối với các dịch vụ mạng cung cấp bởi bên thứ ba.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-5",
    order: 5,
    title: "Trao đổi thông tin",
    items: []
  },
  {
    id: "attt-group-5-1",
    order: "5.1",
    title: "Quản lý trao đổi thông tin và vật mang tin",
    items: [
      {
        id: "attt-item-5-1-1",
        orderIndex: "-",
        title: "Công tác quản lý trao đổi thông tin và phần mềm qua mạng truyền thông trong đơn vị và với các đơn vị khác.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-5-1-2",
        orderIndex: "-",
        title: "Các biện pháp bảo vệ phương tiện mang tin khi vận chuyển.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-5-2",
    order: "5.2",
    title: "Giám sát và ghi nhật ký hoạt động của hệ thống thông tin",
    items: [
      {
        id: "attt-item-5-2-1",
        orderIndex: "-",
        title: "Công tác quản lý nhật ký hoạt động của hệ thống thông tin và người sử dụng, lỗi phát sinh và các sự cố mất ATANTT tại bộ phận/đơn vị (giải pháp quản lý nhật ký tập trung hay phân tán, giải pháp bảo vệ chức năng ghi nhật ký và thông tin nhật ký)",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-5-2-2",
        orderIndex: "-",
        title: "Công tác theo dõi, giám sát và lập báo cáo định kỳ về nhật ký.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-5-3",
    order: "5.3",
    title: "Phòng chống virus và phần mềm độc hại",
    items: [
      {
        id: "attt-item-5-3-1",
        orderIndex: "-",
        title: "Tổng số máy tính được trang bị phần mềm diệt virus",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-5-3-2",
        orderIndex: "-",
        title: "Tổng số máy tính chưa được trang bị phần mềm diệt virus",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-5-3-3",
        orderIndex: "-",
        title: "Tên phần mềm diệt virus sử dụng",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-5-3-4",
        orderIndex: "-",
        title: "Giải pháp, chính sách phòng chống virus và phần mềm độc hại cho các ứng dụng.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-6",
    order: 6,
    title: "Quản lý truy cập",
    items: []
  },
  {
    id: "attt-group-6-1",
    order: "6.1",
    title: "Yêu cầu nghiệp vụ đối với kiểm soát truy cập",
    items: [
      {
        id: "attt-item-6-1-1",
        orderIndex: "-",
        title: "Công tác quản lý truy cập đối với người sử dụng, nhóm người sử dụng tại đơn vị.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-6-1-2",
        orderIndex: "-",
        title: "Công tác quản lý mật khẩu, đối với mật khẩu người dùng bình thường trong hệ thống, mật khẩu tài khoản quản trị.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-6-2",
    order: "6.2",
    title: "Quản lý truy cập mạng",
    items: [
      {
        id: "attt-item-6-2-1",
        orderIndex: "-",
        title: "Giải pháp quản lý xác thực, cấp phép kết nối nội bộ",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-6-2-2",
        orderIndex: "-",
        title: "Giải pháp quản lý kết nối từ bên ngoài vào mạng nội bộ",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-6-3",
    order: "6.3",
    title: "Quản lý truy cập hệ điều hành",
    items: [
      {
        id: "attt-item-6-3-1",
        orderIndex: "-",
        title: "Giải pháp quản lý truy cập máy chủ",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-6-3-2",
        orderIndex: "-",
        title: "Giải pháp quản lý truy cập máy trạm",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-6-3-3",
        orderIndex: "-",
        title: "Giải pháp quản lý truy cập cơ sở dữ liệu",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-6-4",
    order: "6.4",
    title: "Kiểm soát truy cập thông tin và ứng dụng",
    items: [
      {
        id: "attt-item-6-4-1",
        orderIndex: "-",
        title: "Công tác kiểm soát truy cập thông tin và ứng dụng (các quy định, các biện pháp kỹ thuật được sử dụng...)",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-6-4-2",
        orderIndex: "-",
        title: "Ứng dụng chữ ký số",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7",
    order: 7,
    title: "Tiếp nhận, phát triển, duy trì hệ thống thông tin",
    items: []
  },
  {
    id: "attt-group-7-1",
    order: "7.1",
    title: "Yêu cầu về an toàn, bảo mật cho các hệ thống thông tin.",
    items: [
      {
        id: "attt-item-7-1-1",
        orderIndex: "-",
        title: "Công tác xây dựng các yêu cầu về an toàn, bảo mật khi xây dựng hệ thống thông tin mới hoặc cải tiến hệ thống thông tin hiện tại.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7-2",
    order: "7.2",
    title: "Đảm bảo an toàn, bảo mật các ứng dụng",
    items: [
      {
        id: "attt-item-7-2-1",
        orderIndex: "-",
        title: "Công tác kiểm tra, giám sát tính hợp lệ và toàn vẹn của dữ liệu",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7-3",
    order: "7.3",
    title: "Mã hoá dữ liệu",
    items: [
      {
        id: "attt-item-7-3-1",
        orderIndex: "-",
        title: "Công tác thực hiện mã hóa dữ liệu (các loại dữ liệu được mã hóa, thuật toán sử dụng...)",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7-4",
    order: "7.4",
    title: "An toàn, bảo mật các tệp tin hệ thống",
    items: [
      {
        id: "attt-item-7-4-1",
        orderIndex: "-",
        title: "Công tác quản lý, cài đặt, cập nhật các phần mềm trên hệ thống hiện tại.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-7-4-2",
        orderIndex: "-",
        title: "Công tác quản lý dữ liệu kiểm thử",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-7-4-3",
        orderIndex: "-",
        title: "Công tác quản lý chương trình nguồn.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7-5",
    order: "7.5",
    title: "An toàn, bảo mật trong quy trình hỗ trợ và phát triển",
    items: [
      {
        id: "attt-item-7-5-1",
        orderIndex: "-",
        title: "Công tác quản lý và kiểm soát sự thay đổi hệ thống thông tin.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-7-5-2",
        orderIndex: "-",
        title: "Công tác quản lý thuê mua các phần mềm bên ngoài.",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-7-6",
    order: "7.6",
    title: "Quản lý rủi ro, điểm yếu về mặt kỹ thuật",
    items: [
      {
        id: "attt-item-7-6-1",
        orderIndex: "-",
        title: "Công tác đánh giá, quản lý và kiểm soát các điểm yếu kỹ thuật của các hệ thống thông tin.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-7-6-2",
        orderIndex: "-",
        title: "Công tác xây dựng và triển khai các giải pháp khắc phục điểm yếu và hạn chế rủi ro liên quan.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-7-6-3",
        orderIndex: "-",
        title: "Tổ chức đánh giá ATANTT định kỳ cho hệ thống CNTT",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-8",
    order: 8,
    title: "Quản lý sự cố",
    items: []
  },
  {
    id: "attt-group-8-1",
    order: "8.1",
    title: "Báo cáo sự cố",
    items: [
      {
        id: "attt-item-8-1-1",
        orderIndex: "-",
        title: "Công tác báo cáo sự cố tại đơn vị (phân công trách nhiệm, quy trình báo cáo ...)",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-8-2",
    order: "8.2",
    title: "Kiểm soát và khắc phục sự cố",
    items: [
      {
        id: "attt-item-8-2-1",
        orderIndex: "-",
        title: "Công tác thống kê, tổng hợp đánh giá phân loại, xác định nguyên nhân để phòng ngừa tái diễn sự cố",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-9",
    order: 9,
    title: "Đảm bảo hoạt động liên tục của các hệ thống CNTT",
    items: []
  },
  {
    id: "attt-group-9-1",
    order: "9.1",
    title: "Đảm bảo hoạt động liên tục",
    items: [
      {
        id: "attt-item-9-1-1",
        orderIndex: "-",
        title: "Công tác đảm bảo hoạt động liên tục của các hệ thống thông tin (công tác đánh giá, xây dựng, triển khai kế hoạch đảm bảo hoạt động liên tục; công tác kiểm tra cập nhật kế hoạch đảm bảo hoạt động liên tục ...)",
        status: null,
        reference: "",
        note: "",
      }
    ]
  },
  {
    id: "attt-group-10",
    order: 10,
    title: "Công tác kiểm tra nội bộ và báo cáo",
    items: [
      {
        id: "attt-item-10-1-1",
        orderIndex: "-",
        title: "Hồ sơ thực hiện công tác báo cáo và kiểm tra nội bộ tại đơn vị vận hành.",
        status: null,
        reference: "",
        note: "",
      },
      {
        id: "attt-item-10-1-2",
        orderIndex: "-",
        title: "Công tác báo cáo tại đơn vị vận hành",
        status: null,
        reference: "",
        note: "",
      }
    ]
  }
];
