# Dự Án Thiệp Mời Lễ Tốt Nghiệp - Huỳnh Thịnh Hưng (`graduation-hung`)

Dự án thiệp mời tốt nghiệp cao cấp, hiện đại dành riêng cho **Huỳnh Thịnh Hưng** với giao diện sang trọng (Glassmorphic Dark Gold Theme), nhạc nền, đếm ngược thời gian, xác nhận tham dự (RSVP), sổ lưu bút và hỗ trợ tích hợp backend Google Sheets qua Google Apps Script.

---

## 🌟 Cấu Trúc Các Section Trải Nghiệm

1. **Landing Hero Section**:
   - Thiệp mời chính thức với tên **Huỳnh Thịnh Hưng**.
   - Bộ đếm ngược (Countdown) thời gian đến ngày lễ tốt nghiệp.
   - Nhạc nền du dương với nút bật/tắt (Play/Pause) góc phải màn hình.
   - Nút hành động nhanh: **Xác Nhận Tham Dự** & **Xem Chi Tiết Lễ Tốt Nghiệp**.

2. **Lời Cảm Ơn (Gratitude Section)**:
   - Thể hiện lòng biết ơn chân thành đến Ba Mẹ, Gia đình, Quý Thầy Cô và Bạn bè sát cánh trong suốt hành trình Đại học.

3. **Thông Tin Lễ Tốt Nghiệp & RSVP Confirmation**:
   - Ngày giờ, địa điểm tổ chức, gợi ý trang phục (Dress code).
   - Nút "Thêm vào Google Calendar" & "Mở Bản Đồ Google Maps".
   - Khung **Xác nhận tham dự (RSVP Form)** bật Modal bao gồm các trường: Họ & tên, Số điện thoại/Zalo, Email, Trạng thái tham dự, Số người đi cùng.

4. **Sổ Lưu Bút & Lời Chúc (Wishes Wall)**:
   - Hiển thị danh sách các lời chúc từ người thân và bạn bè.
   - Nút **"Gửi Lời Chúc Mới"** bật Modal riêng biệt chuyên dành để gửi lời chúc đến Thịnh Hưng. Tự động đồng bộ với Sheet *"Lời Chúc"*.

5. **Thông Tin Liên Hệ & Món Quà Yêu Thương (Contact & Gift Box)**:
   - Số điện thoại, Zalo, Email cá nhân.
   - Pop-up Modal nhận quà mừng tốt nghiệp qua mã QR Chuyển khoản Ngân hàng / Ví MoMo kèm nút sao chép nhanh số tài khoản.

---

## 🛠️ Hướng Dẫn Chỉnh Sửa Thông Tin Cá Nhân

Tất cả thông tin về ngày giờ, địa điểm, hình ảnh, liên hệ và QR ngân hàng được gom gọn tại 1 nơi duy nhất:
👉 **[`src/config/eventConfig.js`](file:///Users/duongkhuong/graduation-hung/src/config/eventConfig.js)**

---

## 📊 Hướng Dẫn Tích Hợp Google Sheet & Tự Động Gửi Email Thiệp Mời

File mã nguồn Google Apps Script nâng cao đã chuẩn bị sẵn tại:
👉 **[`google-script-template.gs`](file:///Users/duongkhuong/graduation-hung/google-script-template.gs)**

### 🌟 Tính Năng Đặc Biệt Trong Google Apps Script:
1. **Giữ nguyên số `0` ở đầu Số Điện Thoại**: Mã tự động định dạng `"'0945629869"` để Google Sheet giữ nguyên số `0` thay vì biến thành dạng số.
2. **Tự động gửi Email Thiệp Mời cá nhân hóa**: Khi khách nhập Email, hệ thống sẽ tự động gửi email với lời mời trân trọng, tự động thay `{{Name}}` thành tên của người nhập.
3. **Xuất PDF thiệp từ Google Slides & Gửi đính kèm**: Sử dụng slide mẫu `1xQp0ivL4spRUG_0qBwQ-xpCi_7HFJJhUMwqcvNmrav4` thay tên người nhận và gửi kèm file sơ đồ trường `tdtu_map.png`.

---

## 🚀 Chạy Dự Án Lên Local

```bash
# Chạy ở chế độ phát triển
npm run dev

# Mở trình duyệt tại: http://localhost:3000
```
