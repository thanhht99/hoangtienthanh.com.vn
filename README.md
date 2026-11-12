# QTD 267 — Trang Web Cá Nhân (Bài Viết & Bộ Công Cụ)

Dự án web cá nhân **QTD 267** được xây dựng bằng **React + Vite + Tailwind CSS**, lấy cảm hứng màu sắc trực tiếp từ logo thương hiệu **QTD 267** (Blue-to-Teal Gradient).

## Tính năng chính trên trang Home

1. **Danh sách các Công cụ (Tools Hub):**
   - **6 Mini-Tools chạy trực tiếp trên web:**
     - `JSON Formatter & Validator`: Làm đẹp, nén và kiểm tra lỗi JSON.
     - `Base64 & URL Encoder/Decoder`: Mã hóa/giải mã hỗ trợ tiếng Việt UTF-8.
     - `Đếm Từ & Chuyển Đổi Văn Bản`: Thống kê từ, ký tự, dòng và tạo Slug tiếng Việt.
     - `Tạo Mật Khẩu Mạnh & UUID v4`: Sinh mật khẩu ngẫu nhiên và danh sách UUID.
     - `Tạo Mã QR Nhanh`: Tạo ảnh QR Code tức thì từ URL hoặc văn bản.
     - `Chuyển Đổi Unix Timestamp`: Đổi Epoch Timestamp sang giờ Việt Nam & ISO.
   - **Bookmark Tools bên ngoài:** Mở nhanh các công cụ hữu ích (Regex101, Excalidraw, Squoosh, IT-Tools...).
   - **Ghim công cụ yêu thích (⭐):** Lưu trạng thái ghim vào `localStorage`.

2. **Danh sách các Bài viết (Blog & Knowledge Notes):**
   - Lọc theo chuyên mục (`Góc cá nhân`, `Thủ thuật & Tools`, `Lập trình`, `Hệ thống`).
   - Chuyển đổi chế độ xem **Lưới (Grid)** hoặc **Danh sách gọn (List)**.
   - Đọc toàn bộ nội dung bài viết ngay trên giao diện hộp thoại (Modal) có định dạng code snippet và bài viết liên quan.

3. **Tiện ích trải nghiệm:**
   - Thanh tìm kiếm tức thì (`Ctrl + K`) lọc đồng thời cả Bài viết và Công cụ.
   - Chuyển đổi giao diện **Dark Mode / Light Mode**.

## Cách thêm Bài viết hoặc Công cụ mới

Mở file [`src/data/siteData.js`](./src/data/siteData.js) và thêm phần tử vào mảng `TOOLS_DATA` hoặc `POSTS_DATA`.

## Chạy dự án

```bash
npm install
npm run dev
```
