/**
 * GOOGLE APPS SCRIPT FOR GRADUATION INVITATION SHEET (HUỲNH THỊNH HƯNG)
 * 
 * TÍNH NĂNG NỔI BẬT:
 * 1. Tự động giữ nguyên số 0 ở đầu Số Điện Thoại khi lưu vào Google Sheets.
 * 2. Lưu vào 2 Sheet riêng biệt ("Xác Nhận Tham Dự" & "Lời Chúc").
 * 3. Tự động gửi Email Thiệp Mời cá nhân hóa (thay thế {{Name}} bằng tên người nhập).
 * 4. Đính kèm PDF thiệp từ Google Slides & Sơ đồ trường tdtu_map.png.
 * 
 * HƯỚNG DẪN CÀI ĐẶT & KÍCH HOẠT GỬI EMAIL:
 * 1. Mở Google Sheet mới (Đặt tên: "Lễ Tốt Nghiệp Huỳnh Thịnh Hưng - Danh Sách Khách Mời")
 * 2. Đặt tên 2 Trang tính (Sheet Tab):
 *    - Sheet 1: "Xác Nhận Tham Dự"
 *      Tiêu đề Row 1: [STT, Họ và tên, Số điện thoại / Zalo, Email, Xác nhận tham dự, Số người đi cùng, Thời gian gửi]
 *    - Sheet 2: "Lời Chúc"
 *      Tiêu đề Row 1: [STT, Họ và tên, Lời chúc mừng, Thời gian gửi]
 * 
 * 3. Mở Google Apps Script: Vào Tiện ích mở rộng (Extensions) -> Apps Script
 * 4. Xóa hết mã cũ và Dán toàn bộ mã dưới đây vào file Code.gs
 * 5. CẤP QUYỀN GỬI EMAIL (BẮT BUỘC):
 *    - Chọn hàm `testSendEmail` ở menu thả xuống phía trên cùng của Apps Script.
 *    - Nhấn nút "Chạy" (Run).
 *    - Nhấn "Xem lại quyền" (Review Permissions) -> Chọn Tài khoản Google -> Nhấn "Nâng cao" (Advanced) -> Nhấn "Đi tới... (không an toàn)" -> Nhấn "Cho phép" (Allow).
 * 6. Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải -> "Triển khai mới" (New deployment)
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)
 * 7. Nhấn "Triển khai" -> Sao chép URL Web App.
 * 8. Dán URL vào file `.env.local` hoặc `src/config/eventConfig.js` ở `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.
 */

// ----------------------------------------------------------------------------------
// BẢNG CẤU HÌNH CÁ NHÂN HÓA
// ----------------------------------------------------------------------------------
var CONFIG = {
  // ID file Google Slides thiết kế thiệp (URL: docs.google.com/presentation/d/SLIDE_ID/edit)
  SLIDE_TEMPLATE_ID: "1xQp0ivL4spRUG_0qBwQ-xpCi_7HFJJhUMwqcvNmrav4",
  
  // ID file ảnh sơ đồ tdtu_map.png trên Google Drive
  MAP_IMAGE_DRIVE_ID: "166S7aJU8T_7kjU0cdems1o5XC8TFaE_Y", 

  // Tiêu đề email gửi đến khách
  EMAIL_SUBJECT: "Thiệp Mời Lễ Tốt Nghiệp - Huỳnh Thịnh Hưng",
  
  // Thông tin ngày giờ & địa điểm trên thiệp
  GRADUATE_NAME: "Huỳnh Thịnh Hưng",
  EVENT_DATE: "Thứ Năm, Ngày 15/10/2026 (08:00 AM - 11:30 AM)",
  EVENT_VENUE: "Hall A - Trường Đại học Tôn Đức Thắng (Số 19 đường Nguyễn Hữu Thọ, Phường Tân Hưng, TP. Hồ Chí Minh)"
};

/**
 * HÀM TEST ĐỂ CHẠY CẤP QUYỀN GỬI EMAIL VÀ KIỂM TRA EMAIL TRONG HÒM THƯ
 * Bạn hãy chọn hàm `testSendEmail` trên thanh công cụ Apps Script và bấm "Run / Chạy"!
 */
function testSendEmail() {
  var myEmail = Session.getActiveUser().getEmail();
  Logger.log("▶ Đang thử gửi Email Test tới: " + myEmail);
  sendInvitationEmail(myEmail, "Huỳnh Thịnh Hưng (Test)");
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
    }
  }
  return sheet;
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();

    // Phân loại dữ liệu: Lời chúc (Wish) hoặc Xác nhận tham dự (RSVP)
    if (data.type === 'wish' || (!data.attendance && data.wish)) {
      // -------------------------------------------------------------
      // Ghi dữ liệu vào Sheet 2: "Lời Chúc"
      // -------------------------------------------------------------
      var wishSheet = getOrCreateSheet(ss, "Lời Chúc", ["STT", "Họ và tên", "Lời chúc mừng", "Thời gian gửi"]);
      var lastRow = wishSheet.getLastRow();
      var stt = lastRow > 0 ? lastRow : 1;
      
      var fullName = data.fullName || data.name || "Ẩn danh";
      var wish = data.wish || data.message || "";
      
      wishSheet.appendRow([
        stt,
        fullName,
        wish,
        timestamp
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Gửi lời chúc thành công!"
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      // -------------------------------------------------------------
      // Ghi dữ liệu vào Sheet 1: "Xác Nhận Tham Dự"
      // -------------------------------------------------------------
      var rsvpSheet = getOrCreateSheet(ss, "Xác Nhận Tham Dự", [
        "STT", "Họ và tên", "Số điện thoại / Zalo", "Email", "Xác nhận tham dự", "Số người đi cùng", "Thời gian gửi"
      ]);
      var lastRowRsvp = rsvpSheet.getLastRow();
      var sttRsvp = lastRowRsvp > 0 ? lastRowRsvp : 1;

      var fullNameRsvp = data.fullName || data.name || "Khách mời";
      var rawPhone = (data.phone || "").toString().trim();
      
      // XỬ LÝ GIỮ NGUYÊN SỐ 0 Ở ĐẦU SỐ ĐIỆN THOẠI TRÊN GOOGLE SHEETS
      var phoneFormatted = rawPhone ? (rawPhone.startsWith("'") ? rawPhone : "'" + rawPhone) : "";
      
      var email = (data.email || "").toString().trim();
      var attendance = data.attendance || "Sẽ tham dự";
      var guestCount = data.guestCount || 1;

      // Ghi hàng dữ liệu vào Google Sheet
      rsvpSheet.appendRow([
        sttRsvp,
        fullNameRsvp,
        phoneFormatted,
        email,
        attendance,
        guestCount,
        timestamp
      ]);

      // TỰ ĐỘNG GỬI EMAIL THIỆP MỜI VỚI TÊN {{Name}} & SƠ ĐỒ TRƯỜNG
      if (email && email.indexOf('@') > -1) {
        sendInvitationEmail(email, fullNameRsvp);
      }

      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Xác nhận tham dự thành công!"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var wishSheet = ss.getSheetByName("Lời Chúc") || ss.getActiveSheet();
    var rows = wishSheet.getDataRange().getValues();
    
    var wishes = [];
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var wishText = row[2] || row[6] || "";
      var nameText = row[1] || "Khách mời ẩn danh";
      var dateText = row[3] || row[7] || row[0];

      if (wishText) {
        wishes.push({
          id: row[0] || i,
          name: nameText,
          wish: wishText,
          date: dateText ? new Date(dateText).toLocaleDateString('vi-VN') : ""
        });
      }
    }
    
    wishes.reverse();
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      data: wishes
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      data: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * HÀM TỰ ĐỘNG GỬI EMAIL THIỆP MỜI CÁ NHÂN HÓA VÀ ĐÍNH KÈM SƠ ĐỒ TRƯỜNG TDTU
 */
function sendInvitationEmail(recipientEmail, guestName) {
  try {
    var displayName = guestName || "Bạn";
    var pdfAttachment = null;

    // 1. Thay {{Name}} trong Google Slides & xuất thành PDF thiệp
    if (CONFIG.SLIDE_TEMPLATE_ID) {
      try {
        var templateFile = DriveApp.getFileById(CONFIG.SLIDE_TEMPLATE_ID);
        var tempFile = templateFile.makeCopy("Thiệp Mời - " + displayName);
        var tempPresentation = SlidesApp.openById(tempFile.getId());
        
        // Thay thế {{Name}}, {{name}}, {{NAME}} thành tên người nhận
        tempPresentation.replaceAllText("{{Name}}", displayName);
        tempPresentation.replaceAllText("{{name}}", displayName);
        tempPresentation.replaceAllText("{{NAME}}", displayName);
        tempPresentation.saveAndClose();

        // Xuất file Google Slide đã thay tên thành PDF
        pdfAttachment = tempFile.getAs('application/pdf');
        pdfAttachment.setName("Thiep_Moi_Tot_Nghiep_" + displayName.replace(/\s+/g, '_') + ".pdf");
        
        // Xóa file tạm sau khi đã chuyển thành PDF
        DriveApp.getFileById(tempFile.getId()).setTrashed(true);
      } catch (slideErr) {
        Logger.log("⚠️ Lỗi tạo PDF từ Google Slides (sẽ tự chuyển sang gửi Email kèm Sơ đồ): " + slideErr.toString());
      }
    }

    // 2. Chuẩn bị file sơ đồ trường tdtu_map.png từ Google Drive
    var mapAttachment = null;
    if (CONFIG.MAP_IMAGE_DRIVE_ID) {
      try {
        mapAttachment = DriveApp.getFileById(CONFIG.MAP_IMAGE_DRIVE_ID).getAs('image/png');
        mapAttachment.setName("Sodo_Campus_TDTU_map.png");
      } catch (mapErr) {
        Logger.log("⚠️ Lỗi lấy file map từ Drive: " + mapErr.toString());
      }
    }

    // Danh sách file đính kèm
    var attachments = [];
    if (pdfAttachment) attachments.push(pdfAttachment);
    if (mapAttachment) attachments.push(mapAttachment);

    // 3. Nội dung Email dạng Văn bản thuần (Plain text)
    var emailText = 
      "Thân gửi " + displayName + ",\n\n" +
      "Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của " + CONFIG.GRADUATE_NAME + "!\n\n" +
      "- Thời gian: " + CONFIG.EVENT_DATE + "\n" +
      "- Địa điểm: " + CONFIG.EVENT_VENUE + "\n\n" +
      "Sự xuất hiện của " + displayName + " là niềm vinh hạnh rất lớn đối với Hưng!\n\n" +
      "(*) Thiệp mời chính thức (định dạng PDF) và Sơ đồ vị trí trường TDTU đã được đính kèm trong email này.\n\n" +
      "Trân trọng,\n" +
      CONFIG.GRADUATE_NAME;

    // 4. Tiến hành gửi Email (Sử dụng GmailApp với MailApp fallback)
    try {
      GmailApp.sendEmail(recipientEmail, CONFIG.EMAIL_SUBJECT + " - Thân mời " + displayName, emailText, {
        attachments: attachments,
        name: CONFIG.GRADUATE_NAME + " - Thiệp Mời"
      });
    } catch (gErr) {
      MailApp.sendEmail({
        to: recipientEmail,
        subject: CONFIG.EMAIL_SUBJECT + " - Thân mời " + displayName,
        body: emailText,
        attachments: attachments
      });
    }

    Logger.log("✅ Đã gửi email thiệp thành công cho: " + recipientEmail);
  } catch (emailErr) {
    Logger.log("❌ Lỗi gửi email: " + emailErr.toString());
  }
}
