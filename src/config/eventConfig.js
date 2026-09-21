/**
 * CENTRAL EVENT CONFIGURATION FOR HUỲNH THỊNH HƯNG GRADUATION INVITATION
 * Bạn có thể dễ dàng chỉnh sửa thông tin tại file này!
 */

export const eventConfig = {
  // Thông tin người tốt nghiệp
  graduate: {
    fullName: "Huỳnh Thịnh Hưng",
    shortName: "Thịnh Hưng",
    degree: "Cử nhân", // Bạn có thể chỉnh lại ngành nghề exact
    major: "Kỹ thuật phần mềm", // Ngành học
    university: "Trường Đại Học Tôn Đức Thắng", // Tên trường (bạn có thể cập nhật sau)
    avatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop", // Hình đại diện / avatar tốt nghiệp
    heroSubtitle: "Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của mình!",
  },

  // Thời gian & Địa điểm lễ tốt nghiệp
  event: {
    dateISO: "2026-10-15T08:00:00+07:00", // Ngày giờ diễn ra (Dùng cho đếm ngược Countdown)
    displayDate: "Thứ Năm, Ngày 15 Tháng 10 Năm 2026",
    displayTime: "08:00 AM - 11:30 AM",
    venueName: "Hall A - Trường Đại học Tôn Đức Thắng",
    address: "Số 19 đường Nguyễn Hữu Thọ, Phường Tân Hưng, Tp. Hồ Chí Minh",
    googleMapUrl: "https://maps.app.goo.gl/S1fV1hAHig7Q1sX78", // Link Google Maps
    dressCode: "Trang phục lịch sự, sang trọng (Smart Casual / Formal)",
  },

  // Google Apps Script URL (cho RSVP & Lời chúc)
  googleScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "",

  // Thông tin liên hệ
  contact: {
    phone: "0939 186 391",
    zaloUrl: "https://zalo.me",
    facebookUrl: "https://www.facebook.com/share/1HgAir3KA2/?mibextid=wwXIfr",
    email: "hung.huynhthinh@example.com",
  },

  // Thông tin nhận quà mừng tốt nghiệp / QR chuyển khoản (Nếu khách muốn gửi quà mừng xa)
  giftInfo: {
    bankName: "MB Bank / Vietcombank",
    accountNumber: "9999999999",
    accountName: "HUYNH THINH HUNG",
    qrCodeImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Ảnh QR Bank/MoMo
    momoPhone: "090XXXXXXX",
  },

  // Lời cảm ơn (Section Cảm ơn)
  gratitude: {
    title: "Lời Cảm Ơn Chân Thành",
    subtitle: "Chặng đường đại học khép lại, mở ra hành trình mới. Hưng xin dành trọn lòng biết ơn đến những người đồng hành tuyệt vời nhất.",
    cards: [
      {
        id: "family",
        role: "Gia Đình Thân Yêu",
        icon: "Heart",
        content: "Cảm ơn Ba Mẹ và gia đình đã luôn là chỗ dựa vững chắc nhất, hi sinh vô điều kiện và chắp cánh cho con hoàn thành chặng đường tri thức này.",
      },
      {
        id: "teachers",
        role: "Quý Thầy Cô Kính Yêu",
        icon: "GraduationCap",
        content: "Xin tri ân quý Thầy Cô đã tận tụy truyền dạy kiến thức, kinh nghiệm và nguồn cảm hứng vô giá trong suốt những năm tháng trên giảng đường.",
      },
      {
        id: "friends",
        role: "Bạn Bè & Đồng Đội",
        icon: "Users",
        content: "Cảm ơn những người bạn tuyệt vời đã sát cánh bên Hưng qua từng kỳ thi, từng đồ án, cùng chia sẻ niềm vui và kỉ niệm đẹp nhất thời thanh xuân.",
      },
    ]
  },

  // Danh sách lời chúc mặc định (Fallback khi chưa kết nối Google Sheet Script)
  sampleWishes: [
    {
      id: 1,
      name: "Minh Anh",
      attendance: "Sẽ tham dự",
      wish: "Chúc mừng Thịnh Hưng đã hoàn thành xuất sắc chặng đường tốt nghiệp! Chúc Hưng gặt hái thật nhiều thành công rực rỡ phía trước!",
      date: "19/09/2026"
    },
    {
      id: 2,
      name: "Gia Đình & Người Thân",
      attendance: "Sẽ tham dự",
      wish: "Tự hào về Hưng rất nhiều! Mong cháu luôn vững bước, tràn đầy nhiệt huyết và tỏa sáng trên con đường sự nghiệp.",
      date: "19/09/2026"
    },
    {
      id: 3,
      name: "Hoàng Nam (Nhóm Đồ Án)",
      attendance: "Sẽ tham dự",
      wish: "Chúc mừng tân kỹ sư/cử nhân Huỳnh Thịnh Hưng! Chúc người đồng đội luôn đỉnh cao và vươn xa hơn nữa nhé!",
      date: "18/09/2026"
    }
  ]
};
