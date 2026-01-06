# 🎓 CLASS REUNION WEBSITE – DEVELOPMENT PLAN

## 1. Mục tiêu dự án

Xây dựng một website họp lớp mang tính **hoài niệm – cảm xúc – tương tác nhẹ**, cho phép các thành viên trong lớp:
- Nhớ lại kỷ niệm chung
- Xem và chia sẻ hình ảnh
- Đặt câu hỏi và trả lời một cách ẩn danh

Website không tập trung vào tính thương mại hay hiệu năng cao, mà ưu tiên:
- Trải nghiệm mượt
- Giao diện đẹp, nhẹ
- Dễ triển khai và bảo trì

---

## 2. Phạm vi & Đối tượng sử dụng

- Đối tượng: Bạn học cùng lớp (~30–50 người)
- Không yêu cầu đăng ký / đăng nhập
- Truy cập bằng link chung
- Dữ liệu mang tính kỷ niệm, không nhạy cảm

---

## 3. Stack công nghệ đề xuất

### 3.1 Frontend
- **Next.js (React)**
- **Tailwind CSS**
- **Framer Motion**
- **CSS keyframes**
- Optional: Canvas API (hiệu ứng chữ nâng cao)

### 3.2 Backend
- **Node.js + Express**
- RESTful API
- Rate limiting đơn giản

### 3.3 Database & Storage
- **MongoDB Atlas** – lưu metadata
- **Cloudinary** – lưu trữ hình ảnh

### 3.4 Hosting
- **Render.com**
  - 1 Web Service (Backend)
  - 1 Static Site hoặc Web Service (Frontend)

---

## 4. Kiến trúc tổng thể

Client (Browser)
↓
Next.js Frontend
↓ API calls
Express Backend (Render)
↓
MongoDB Atlas (Q&A, Gallery metadata)
↓
Cloudinary (Images)

markdown
Copy code

---

## 5. Các trang & chức năng chi tiết

## 5.1 Trang chính – Landing Page (Hoài niệm)

### Nội dung
- Tiêu đề: Họp lớp [Tên lớp] – [Niên khóa]
- Đoạn mô tả ngắn mang tính cảm xúc
- Call-to-action: “Xem kỷ niệm”, “Xem hình ảnh”, “Hỏi điều bạn từng thắc mắc”

### Hiệu ứng mượt đề xuất
- Background là **tên các bạn trong lớp di chuyển chậm**
- Chữ:
  - Opacity thấp
  - Chuyển động floating / drifting
- Trang load có **fade-in + slide-up**

### Kỹ thuật
- Framer Motion cho transition
- CSS animation cho background text
- Không dùng animation giật mạnh hoặc tốc độ cao

---

## 5.2 Gallery – Thư viện hình ảnh

### Chức năng
- Hiển thị ảnh dạng grid
- Click xem ảnh full
- Upload ảnh mới (ẩn danh)
- Caption tùy chọn

### Hiệu ứng mượt
- Grid xuất hiện theo stagger animation
- Hover ảnh có:
  - Zoom nhẹ
  - Shadow mềm
- Modal ảnh:
  - Fade-in background
  - Scale-in ảnh

### Backend API
GET /api/gallery
POST /api/gallery/upload

less
Copy code

### Lưu trữ
- Cloudinary: ảnh
- MongoDB: URL, caption, timestamp

---

## 5.3 Anonymous Q&A – Hỏi đáp ẩn danh

### Chức năng
- Đặt câu hỏi không cần tên
- Trả lời câu hỏi
- Hiển thị theo thứ tự thời gian

### Hiệu ứng mượt
- Card câu hỏi xuất hiện nhẹ nhàng
- Khi mở câu trả lời:
  - Accordion animation
  - Ease-in-out

### Backend API
GET /api/questions
POST /api/questions
POST /api/questions/:id/answers

yaml
Copy code

### Chống spam tối thiểu
- Giới hạn số request theo IP
- Thêm captcha nhẹ (optional)

---

## 6. Thiết kế UI/UX (Concept)

### Màu sắc
- Nền sáng hoặc hơi ngả vàng (retro)
- Accent: xanh nhạt / nâu / xám ấm
- Tránh màu gắt

### Font
- Heading: Serif nhẹ hoặc handwritten style
- Body: Sans-serif dễ đọc

### Cảm giác tổng thể
- Chậm rãi
- Nhẹ nhàng
- Gợi nhớ ký ức

---

## 7. Cấu trúc thư mục đề xuất

/frontend
/components
/pages
/styles
/animations
/utils

/backend
/routes
/controllers
/models
/middlewares
index.js

yaml
Copy code

---

## 8. Lộ trình triển khai

### Giai đoạn 1 – MVP (1–2 ngày)
- Setup frontend + backend
- Landing page cơ bản
- Gallery (view-only)
- Q&A (post + view)

### Giai đoạn 2 – Hoàn thiện (2–3 ngày)
- Upload ảnh
- Animation mượt
- Responsive mobile

### Giai đoạn 3 – Cảm xúc & polish
- Animation tinh chỉnh
- Typography
- Nội dung hoài niệm
- Footer cảm ơn

---

## 9. Những lưu ý quan trọng

- Render free tier có sleep → chấp nhận
- Không lưu file trên server
- Không yêu cầu thông tin cá nhân
- Thông báo rõ mục đích kỷ niệm

---

## 10. Hướng phát triển thêm (optional)

- Nhạc nền bật/tắt
- Timeline kỷ niệm
- Đếm ngược ngày họp lớp
- Export gallery thành album

---

## 11. Thông điệp kết

> “Website này không chỉ để xem,
> mà để nhớ rằng chúng ta đã từng là một lớp.”

---