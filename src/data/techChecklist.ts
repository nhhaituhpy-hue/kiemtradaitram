// AUTO-GENERATED from DOCX
export type TechChecklistItem = {
  id: string;
  orderIndex: string;
  title: string;
  statusOptions?: string;
  status: string | Record<number, string> | null;
  reference: string;
  note: string;
  evidencePdf?: string | null;
  evidenceImg?: string | null;
  // Plural forms used by multi-reference evidence upload
  evidencePdfs?: Record<number, { url: string; uploadedAt: string; key?: string }>;
  evidenceImgs?: Record<number, { url: string; uploadedAt: string; key?: string }>;
};

export type TechChecklistGroup = {
  id: string;
  order: number | string;
  title: string;
  items: TechChecklistItem[];
};

export const mockTechChecklist: TechChecklistGroup[] = [
  {
    "order": 1,
    "title": "Tài liệu, văn bản pháp lý chung",
    "items": [
      {
        "orderIndex": "1.1",
        "title": "ANNEX 10",
        "statusOptions": "có không",
        "reference": "- Volume I: Radio Navigation Aids 8th, 2023\n- Volume II: Communication Procedures including those with PANS status 7th, 2016\n- Volume III: Communication System  2nd, 2007\n- Volume IV: Surveillance and Collision Avoidance Systems 5th, 2014\n- Volume V: Aeronautical Radio Frequency Spectrum Utilization 3rd, 2013",
        "note": "Bản mềm",
        "id": "75f05850-cb0d-41f0-8547-a1d5523c19d9",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.2",
        "title": "Luật HKDD",
        "statusOptions": "có không",
        "reference": "- Luật 66/2006/QH11 Luật Hàng Không Dân Dụng Việt Nam.\n- Luật 61/2014/QH13 Luật sửa đổi, bổ sung một số điều của Luật 66/2006/QH11 Luật Hàng Không Dân Dụng Việt Nam.\n- Luật 130/2025/QH15 Luật Hàng Không Dân Dụng Việt Nam. (Hiệu lực từ 01/07/2026)",
        "note": "Bản mềm",
        "id": "15b154dd-e814-4680-9ab5-5a6679ae9a07",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.3",
        "title": "Thông tư số 19/2017/TT-BGTVT",
        "statusOptions": "có không",
        "reference": "- Văn bản hợp nhất 03/VBHN-BGTVT ngày 08/05/2020 hợp nhất Thông tư 19/2017, Thông tư 32/TT- BGTVT và Thông tư 28/2023/TT-BGTVT Quy định về quản lý và bảo đảm hoạt động bay\n- Thông tư số 19/2017/TT-BGTVT ngày 06/06/2017 của Bộ trưởng Bộ Giao thông vận tải quy định về lý và bảo đảm hoạt động bay.\n- Thông tư 09/2020/TT- BGTVT\nngày 23/04/2020 Sửa đổi bổ\nsung một số điều của Thông tư\n19.\n- Thông tư 32/TT- BGTVT ngày\n14/12/2021 Sửa đổi bố sung một\nsố điều của Thông tư 19.\n- Thông tư 28/2023/TT-BGTVT của Bộ Giao thông vận tải: Sửa đổi, bổ sung một số điều của các Thông tư trong lĩnh vực hàng không dân dụng.",
        "note": "Bản mềm",
        "id": "c5aeba21-4128-4321-ba25-9268bd25e7dc",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.4",
        "title": "Quy định Quản lý kỹ thuật của TCT",
        "statusOptions": "có không",
        "reference": "- Quyết định số 5199/QĐ-QLB\nngày 14/10/2022  Ban hành quy định quản lý kỹ thuật của TCT Quản lý bay Việt Nam",
        "note": "Bản mềm",
        "id": "6860d7ef-c870-4658-bd81-ed64a99d34ef",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.5",
        "title": "Quy chế Quản lý kỹ thuật của Công ty",
        "statusOptions": "có không",
        "reference": "QĐ 509 QĐ-CTCT (18/07/2025) Quy chế quản lý kỹ thuật của ATTECH",
        "note": "Bản mềm",
        "id": "2dad70e6-d751-48c4-afc7-447eafa82414",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.6",
        "title": "Quy định tổ chức cung cấp dịch vụ CNS",
        "statusOptions": "có không",
        "reference": "Quy định tổ chức CCDV CNS BH 8 HL 01/07/2025",
        "note": "Bản mềm",
        "id": "ecf0f58c-d577-472d-be56-fdb3f703a9f2",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.7",
        "title": "Quy định bảo dưỡng định kỳ đối với đài trạm CNS",
        "statusOptions": "có không",
        "reference": "Quy định bảo dưỡng định kỳ tại các đài trạm CNS ban hành lần 4, ngày 16/06/2025",
        "note": "Bản mềm",
        "id": "9fd1f5c6-6e76-4b25-809b-b7825cad39a9",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.8",
        "title": "Quy định duy trì nguồn điện dự phòng tại các đài trạm CNS",
        "statusOptions": "có không",
        "reference": "Quy định duy trì nguồn điện dự phòng tại các đài trạm CNS (BH 5, HL 16.06.25)",
        "note": "Bản mềm",
        "id": "96ba28c9-4df2-44e1-a8d8-a0c0ec1adb69",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.9",
        "title": "Quy định bảo trì công trình hàng không",
        "statusOptions": "có không",
        "reference": "QĐ 514 QĐ-KTQLB (18.07.25) Quy định QL và bảo trì các CTHK ATTECH",
        "note": "Bản mềm",
        "id": "999eecf7-d04f-4bcd-87be-558a481bfc48",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.10",
        "title": "Quy phạm áp dụng chống sét tiếp đất",
        "statusOptions": "có không",
        "reference": "- TCCS 03 : 2025/QLB (XB lần 1) Hệ thống chống sét tiếp đất tại các công trình bảo đảm hoạt động bay theo  QĐ 3482/QĐ-QLB ngày 30/5/2025",
        "note": "Bản mềm",
        "id": "b8b02653-f502-420d-a898-e51a8ed4957d",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.11",
        "title": "Quy định về hệ thống Camera giám sát của Công ty",
        "statusOptions": "có không",
        "reference": "- QĐ 510 QĐ-KTQLB (18/07/2025) Quy định QL và KT hệ thống Camera của ATTECH\n- Quy chế ANHK TCT theo QĐ 4170/QĐ-QLB, ngày 11/07/2024;\n- Quy định Quản lý, vận hành khai thác HT Camera giám sát của TCT kèm theo QĐ 313/QĐ-QLB, ngày 29/01/2016.\n- QĐ 6507/QĐ-QLB (23.09.25) QĐ Ban hành Quy trình giám sát Camera an ninh hàng không thời gian thực tại các khu vực hạn chế BH lần 1.",
        "note": "Bản mềm",
        "id": "7059a720-3926-4f46-9580-87fae7d3361a",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.12",
        "title": "Quy chế an toàn thông tin của Công ty",
        "statusOptions": "có không",
        "reference": "- QĐ 508 QĐ-CTCT (18/07/2025) Quy chế bảo đảm an toàn, an ninh thông tin cho HTTT ATTECH",
        "note": "Tài liệu SMS\nBản mềm",
        "id": "5c2c8475-d8ae-47f9-9e9d-11e717b0cd98",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "1.13",
        "title": "Các tài liệu văn bản pháp lý khác",
        "statusOptions": "có không",
        "reference": "",
        "note": "",
        "id": "1efcc95a-e2b0-45b8-9afe-e810061af40a",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      }
    ],
    "id": "a7238a05-66e5-4051-bff7-f68088229e15"
  },
  {
    "order": 2,
    "title": "Tài liệu, văn bản pháp lý tại đơn vị",
    "items": [
      {
        "orderIndex": "2.1",
        "title": "Giấy phép khai thác CS CCDV BĐHĐB",
        "statusOptions": "có không",
        "reference": "- GP khai thác cho CS CCDV ĐBHĐB số 1937/GP-CHK ngày 09/05/2022.",
        "note": "Bản mềm  chữ  ký ĐT",
        "id": "8bfd399e-9fc1-4d85-bc5d-9776eeca7f4c",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.2",
        "title": "Giấy phép khai thác hệ thống KT, thiết bị ĐHB",
        "statusOptions": "có không",
        "reference": "- GP khai thác khai thác hệ thống kỹ thuật, thiết bị bảo đảm hoạt động bay, số 5680/GP-CHK giá trị đến 02/12/2027.",
        "note": "Bản mềm  chữ  ký ĐT",
        "id": "63444007-36c2-4425-a247-7bdf43f2cd71",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.3",
        "title": "Giấy phép tần số và các thiết bị phát sóng VTĐ",
        "statusOptions": "có không",
        "reference": "- GP DVOR 334219/GP-GH4 giá trị đến ngày 11/07/2027\n- GP DME 334222/GP-GH3 giá trị đến ngày 11/07/2027",
        "note": "Bản mềm  chữ  ký ĐT",
        "id": "5c0528fb-3033-46b0-9786-493e84934644",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.4",
        "title": "Giấy chứng nhận hệ thống kỹ thuật, trang bị, thiết bị BĐHĐB được sản xuất hoặc cải tiến tại VN",
        "statusOptions": "có không",
        "reference": "Không có",
        "note": "",
        "id": "d289984a-6d47-4fad-9b8b-b0f281c85dce",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.5",
        "title": "Quyết định cấp mã số, địa chỉ kỹ thuật của thiết bị CNS",
        "statusOptions": "có không",
        "reference": "- GP khai thác khai thác hệ thống kỹ thuật, thiết bị bảo đảm hoạt động bay, số 5680/GP-CHK giá trị đến 02/12/2027.",
        "note": "Mã QR dán tại thiết bị\nBản mềm  chữ  ký ĐT",
        "id": "625b85ef-17b7-4d91-bb27-2e21a3d28448",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.6",
        "title": "Quyết định đưa thiết bị vào khai thác",
        "statusOptions": "có không",
        "reference": "- QĐ 510/QĐ-CTCT về việc Đưa hệ thống đài DVOR/DME mới vào khai thác  ngày 01/12/2021",
        "note": "Bản mềm",
        "id": "69db57e0-febd-4080-b587-374d39e60b9f",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.7",
        "title": "Quyết định chấm dứt khai thác thiết bị",
        "statusOptions": "có không",
        "reference": "- QĐ 509/QĐ-CTCT ngày 01/12/2021 về việc Chấm dứt khai thác đối với hệ thống kỹ thuật, thiết bị bảo đảm hoạt động bay",
        "note": "Bản mềm",
        "id": "87e0a441-7312-4926-8d96-16b1613b89c9",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.8",
        "title": "Tài liệu HDKT của cơ sở CCDV BĐHĐB",
        "statusOptions": "có không",
        "reference": "- Tài liệu ban hành kèm theo Quyết định 2417/QĐ-CHK: QĐ ngày 10/12/2025 Quyết định  ban hành Tài liệu hướng dẫn khai thác của cơ sở cung cấp dịch vụ thông tin, dẫn đường, giám sát HK của CHK (PB 01, HL 10/12/2025)",
        "note": "Bản mềm",
        "id": "470ea95c-640a-4cac-94cf-163336853dab",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.9",
        "title": "Các Văn bản hiệp đồng với các đơn vị liên quan",
        "statusOptions": "có không",
        "reference": "- Văn bản Hiệp đồng ký tháng 12/2025 VBHĐ Bảo đảm dịch vụ giữa Công ty QLB Miền Nam và Công ty TNHH Kỹ Thuật QLB. (PB2)\n- Văn bản thỏa thuận số 18/2013/VBTT về việc Sử dụng cơ sở vật chất giữa Công ty QLB Miền Nam và Công ty TNHH Kỹ Thuật QLB.\n- Văn bản hiệp đồng ký tháng 07/2025 bảo đảm dịch vụ CNS giữa Trung tâm Bảo đảm Kỹ thuật và Chi nhánh tại TP.HCM (PB3)\n- Văn bản hiệp đồng ký tháng 10/2015 giữa ATTECH và Cảng hàng không TSN về phối hợp bảo đảm ANHK\n- Văn bản hiệp đồng ký tháng 11/2025 bảo đảm dịch vụ giữa Trung tâm BĐKT và Đội bay kiểm tra hiệu chuẩn.\n- Văn bản hiệp đồng bảo đảm dịch vụ giữa trung tâm thông báo tin tức HK AIS và ATTECH ký 2024\n- Văn bản hiệp đồng bảo đảm dịch vụ giữa TTQLLKL và ATTECH PB01 ký tháng 05/2025",
        "note": "Bản mềm",
        "id": "28249f16-d44a-4250-92f3-6b615d5cd503",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "2.10",
        "title": "Các tài liệu văn bản pháp lý khác",
        "statusOptions": "có không",
        "reference": "",
        "note": "",
        "id": "03da13df-6b0f-43db-bf23-e96974fe4d19",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      }
    ],
    "id": "ec21644f-5fc9-49b2-9d14-235cb67057bd"
  },
  {
    "order": 3,
    "title": "Tài liệu khai thác, bảo dưỡng, sửa chữa kỹ thuật",
    "items": [
      {
        "orderIndex": "3.1",
        "title": "Tài liệu hướng dẫn khai thác, bảo dưỡng, sửa chữa hệ thống, thiết bị CNS (nhà sản xuất hoặc tự biên dịch, huấn luyện)",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "Tài liệu của hãng sản xuất:\n- Operations and Maintenance Manual Model 1150A Doppler VHF Omnirange (DVOR);\n- Operations and Maintenance Manual Model 1150/1150A Doppler Vor (DVOR) Antenna;\n- Operations and Maintenance Manual DME1119A-0102\n- Operations and Maintenance Manual Model 2240  Remote Control And Status Unit (RCSU) and Remote Status Unit (RSU)\nCác tài liệu ban hành theo HT QLCL:\n- HDCV Khai thác DVOR1150A BH 7, HL 01.07.2025\n- HDCV Khai thác DME1119A BH 8,HL 01.07.2025\n- HDCV Bảo dưỡng DVOR1150A BH 10, HL 15.06.2025\n- HDCV Bảo dưỡng DME 1119A BH 8, HL 15.06.2025\n- HDCV Thay thế hiệu chỉnh khối card DVOR1150A BH 5, HL 15.06.2025\n- HDCV Thay thế hiệu chỉnh khối card DME1119A BH 3, HL 15.06.2025\n- HDCV Kiểm tra sửa chữa DME 1119A BH 5 ,HL 15.06.2025\n- HDCV Hiệu chỉnh mặt đất DVOR 1150A BH 6 , HL 15.06.2025\n- HDCV Đóng gói khối card CNS BH 3, HL 01.07.2025\n- HDCV PA UPKN đối với thiết bị dẫn đường BH 5, HL 02.02.2026",
        "note": "Các tài liệu ban hành theo HT QLCL",
        "id": "4a2c244c-0692-4faa-9a9f-293bb3e9bf6d",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.2",
        "title": "Tài liệu HDKT hệ thống, bảo dưỡng, sửa chữa thiết bị điện nguồn (nhà sản xuất hoặc tự biên dịch, huấn luyện)",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "- HDCV Khai thác hệ thống điện tại đài DVORDME TSH BH 4, HL 21.07.2025\n- HDCV Bảo dưỡng thiết bị điện tại các đài trạm CNS BH 7 HL 21.07.2025\n- HDCV  XLL MPĐ Hyundai DHY6000SE,DHY6000LE  BH 4 HL 21.07.2025\n-  HDCV vận hành, bảo dưỡng MPĐ Hyundai DHY6000SE, DHY6000LE  BH 4 HL 21.07.2025\n- HDCV Khai thác vận hành hệ thống điện CSSX BH 6 HL 21.07.2025\n-  HDCV Bảo dưỡng máy phát điện BH 6 HL 21.07.2025\n- Quy định duy trì nguồn điện dự phòng tại các đài trạm CNS (BH 5, HL 16.06.25)",
        "note": "Các tài liệu ban hành theo HT QLCL",
        "id": "ba5b8c90-572e-4965-9184-1e95b3810082",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.3",
        "title": "Tài liệu hướng dẫn khai thác hệ thống, bảo dưỡng, sửa chữa thiết bị khác (nhà sản xuất hoặc tự biên dịch, huấn luyện)",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "- HDCV Bảo dưỡng điều hòa cục bộ BH 6 HL 21.07.2025\n- HDCV Bảo dưỡng thiết bị phụ trợ BH 6 HL 21.07.2025\n- HDCV Sử dụng thiết bị đo ắc quy BT-3554 BH 3, HL 21.07.2025\n- HDCV Đồng hộ vạn năng BH 2, HL 15.06.2025\n- HDCV sử dụng đồng hồ đo công suất BIRD 4314/43 BH 1 , HL 15.06.2025\n- HDCV sử dụng máy đếm tần BK Precision 1856D BH 2, HL 15.06.2025\n- HDCV Sử dụng máy hiện sóng TDS1002 BH 1, HL 15.06.2025\n- HDCV Sử dụng Ampe kìm BH 1, HL 15.06.2025\n- HDCV bảo dưỡng, vệ sinh công nghiệp kiểm tra thiết bị đo BH 2, HL 09.08.2022",
        "note": "Các tài liệu ban hành theo HT QLCL",
        "id": "d4967685-2a0d-436a-a6f9-82dad8106d52",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.4",
        "title": "Sơ đồ khối hệ thống thiết bị.",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "- Sơ đồ khối hệ thống thiết bị: DVOR1150, DME1119A",
        "note": "Dán tại Shelter",
        "id": "b19450a2-269b-4491-b9d6-3102cd23ce73",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.5",
        "title": "Sơ đồ khối cấp điện thiết bị.",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "- Sơ đồ khối hệ thống điện nguồn dán tại tủ điện nhà nguồn.\n- Hồ sơ thiết kế của Cty - Bản vẽ Shelter Composite, Tài liệu HDKT điện nguồn của Cty.\n- Sơ đồ tuyến nguồn VOR TSN",
        "note": "Bản gốc\nDán tại tủ phân phối điện",
        "id": "0844bee8-7872-4c1d-a30a-b5a11d92260d",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.6",
        "title": "Sơ đồ đấu nối, tín hiệu, bảng cáp.",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "Sơ đồ đấu nối, tín hiệu, bảng cáp dán tại nhà trực",
        "note": "- Bản mềm\n- Hồ sơ thiết kế của Cty\n- Tài liệu HDKT của Cty",
        "id": "341c2841-a621-45c8-a2b7-feed420b5939",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.7",
        "title": "Quy trình khai thác, bảo dưỡng, sửa chữa thiết bị CNS",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "Quy trình/ Hướng dẫn khai thác, bảo dưỡng, sửa chữa, VOR, DME",
        "note": "Tài liệu hướng dẫn khai thác, bảo dưỡng, sửa chữa hệ thống, thiết bị CNS",
        "id": "57e08189-6955-4fe7-acaa-b6128774b8bf",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.8",
        "title": "Quy trình khai thác, bảo dưỡng, sửa chữa Điện nguồn",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "Quy trình/ Hướng dẫn khai thác, bảo dưỡng, sửa chữa thiết bị điện nguồn",
        "note": "Tài liệu HDKT hệ thống, bảo dưỡng, sửa chữa thiết bị điện nguồn",
        "id": "fb49eccb-2571-4f92-8e45-ffc18745beff",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.9",
        "title": "Quy trình khai thác, bảo dưỡng, sửa chữa thiết bị khác",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "Quy trình/ Hướng dẫn khai thác, bảo dưỡng, sửa chữa thiết bị khác",
        "note": "Tài liệu hướng dẫn khai thác hệ thống, bảo dưỡng, sửa chữa thiết bị khác",
        "id": "373eb518-9ad7-4960-818b-a554d482db59",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.10",
        "title": "Quy trình ứng phó khẩn nguy đối với thiết bị CNS",
        "statusOptions": "có khôngđủ k.đủ",
        "reference": "- HDCV Quy trình ứng phó sự cố kỹ thuật BH 2, HL 01.07.2025\n- HDCV UPKN đối với thiết bị dẫn đường BH 5, HL 02.02.2026",
        "note": "",
        "id": "cb78b967-e1e7-49c5-bde8-19e6fdfa7d9a",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "3.11",
        "title": "Quy trình ứng phó khẩn nguy thiết bị Điện nguồn",
        "statusOptions": "có không đủ k.đủ",
        "reference": "- HDCV PA UPKN điện nguồn BH 6 HL 21.07.2025",
        "note": "",
        "id": "47ebaab6-87b2-417d-8150-34fe97ea922d",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      }
    ],
    "id": "ebd42cf4-b945-4fdd-affc-25f6686d7998"
  },
  {
    "order": 4,
    "title": "Công tác quản lý tài liệu, văn bản",
    "items": [
      {
        "orderIndex": "4.1",
        "title": "Thường xuyên cập nhật văn bản tài liệu, sơ đồ kỹ thuật",
        "statusOptions": "có không",
        "reference": "Hệ thống QLCL ISO 9001:2015",
        "note": "Theo Quy trình ISO 9001:2015 của Cty",
        "id": "6230bd4d-6a54-4da0-b247-0ade097e096c",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "4.2",
        "title": "Tổ chức văn bản tài liệu theo hồ sơ, danh mục để thuận tiện quản lý",
        "statusOptions": "có không",
        "reference": "Hệ thống QLCL ISO 9001:2015",
        "note": "Lưu trên 1 máy tính của đài",
        "id": "2d5cebbb-7925-45a5-a382-f1b818d063c0",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "4.3",
        "title": "Đảm bảo công tác lưu trữ tài liệu văn bản",
        "statusOptions": "có không",
        "reference": "Hệ thống QLCL ISO 9001:2015",
        "note": "Có cả bản giấy và điện tử (bản mềm)",
        "id": "af881912-1c45-41ca-b2c3-e577decd0236",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      },
      {
        "orderIndex": "4.4",
        "title": "Phổ biến các văn bản mới trong đơn vị",
        "statusOptions": "có không",
        "reference": "- Hệ thống QLCL ISO 9001:2015\n- Tài liệu Hướng dẫn phổ biến, tuyên truyền văn bản, BH lần 1, ngày 26/07/2017",
        "note": "Các văn bản mới triển khai qua email và trong các lần họp tại đài",
        "id": "6a2f2289-ab10-4043-8423-b06d62719297",
        "status": null,
        "evidencePdf": null,
        "evidenceImg": null
      }
    ],
    "id": "8987920c-7163-4164-99c0-92cf25e606b0"
  }
];
