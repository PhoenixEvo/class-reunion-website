# 🎓 Class Reunion Website

Website họp lớp kỷ niệm với giao diện hoài niệm, thư viện hình ảnh và phần hỏi đáp ẩn danh.

## ✨ Tính năng

- **Trang chủ hoài niệm**: Hiệu ứng tên lớp bạn di chuyển nhẹ nhàng
- **Thư viện hình ảnh**: Chia sẻ và xem hình ảnh kỷ niệm ẩn danh
- **Hỏi đáp ẩn danh**: Đặt câu hỏi và trả lời mà không cần lộ danh tính
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- **Animations mượt**: Sử dụng Framer Motion cho trải nghiệm người dùng tốt

## 🛠️ Stack Công nghệ

### Frontend
- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js + Express** - REST API
- **MongoDB Atlas** - Database
- **Cloudinary** - Image storage
- **Express Rate Limit** - API rate limiting
- **Helmet** - Security headers

### Hosting
- **Render.com** - Cloud hosting (Free tier)

## 🚀 Cài đặt và Chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd class-reunion-website
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Copy và chỉnh sửa file environment variables:
```bash
cp .env-local.txt .env
```

Mở file `.env` và điền thông tin thực tế:
- **MONGODB_URI**: Connection string từ MongoDB Atlas
- **CLOUDINARY_***: Credentials từ Cloudinary dashboard

Chạy backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
cp .env-frontend.txt .env.local
npm run dev
```

### 4. Setup Environment Variables

#### Backend (.env)
Tạo file `.env` trong thư mục `backend` với nội dung:

```env
# Environment
NODE_ENV=development

# Server
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas - Thay bằng connection string thực tế từ MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/class-reunion

# Cloudinary - Thay bằng credentials thực tế từ Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Frontend (.env.local)
Tạo file `.env.local` trong thư mục `frontend` với nội dung:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Truy cập
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎵 Nhạc nền

Website có tích hợp nhạc nền hoài niệm với controls thông minh:

- **Auto-play**: Tự động phát (có thể bị browser chặn)
- **Smart prompt**: Hiện popup yêu cầu bật nhạc nếu bị chặn
- **Controls**: Play/Pause, Volume slider, Mute
- **Auto-hide**: Ẩn controls sau 3s không tương tác
- **Position**: Floating ở góc dưới phải
- **Loop**: Tự động lặp

### Auto-play behavior:

1. **Lần đầu**: Browser có thể chặn auto-play (theo chính sách bảo mật)
2. **Sau tương tác**: User click/scroll/touch → nhạc tự phát
3. **Lần sau**: Nhớ lựa chọn, tự động phát nếu đã bật
4. **Popup**: Chỉ hiện nếu bị chặn, không làm phiền

**📱 Mobile**: Cần user interaction đầu tiên để phát nhạc

### Thay đổi nhạc nền:

1. Upload file MP3 vào `frontend/public/nhac-nen.mp3`
2. Hoặc thay URL trong `frontend/src/components/AudioPlayer.tsx`:

```javascript
<source src="/nhac-nen.mp3" type="audio/mp3" />
<source src="https://example.com/song.mp3" type="audio/mp3" />
```

## 📁 Cấu trúc Project

```
class-reunion-website/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── styles/          # Global styles
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Express.js backend
│   ├── config/              # Database & Cloudinary config
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middlewares
│   └── index.js             # Server entry point
└── details.md               # Project requirements
```

## 🔧 API Endpoints

### Gallery
- `GET /api/gallery` - Lấy tất cả hình ảnh
- `POST /api/gallery/upload` - Upload hình ảnh mới

### Q&A
- `GET /api/questions` - Lấy tất cả câu hỏi
- `POST /api/questions` - Tạo câu hỏi mới
- `POST /api/questions/:id/answers` - Thêm câu trả lời

## 🎨 Thiết kế UI/UX

- **Màu sắc**: Tông màu ấm áp, hoài niệm (cream, sage, warm brown)
- **Typography**: Crimson Text cho headings, Inter cho body text
- **Animations**: Floating names với adaptive grid system, smooth transitions
- **Audio**: Nhạc nền hoài niệm với floating controls
- **Gallery**: Upload nhiều ảnh cùng lúc với progress tracking
- **Responsive**: Adaptive grid (4x8 mobile, 6x6 tablet, 8x6 desktop)

## 🚀 Triển khai

### Render.com Setup

1. **Backend**:
   - Tạo Web Service
   - Connect GitHub repo
   - **Root Directory**: `backend`
   - Set environment variables
   - Build command: `npm install`
   - Start command: `npm start`

2. **Frontend**:
   - Tạo Static Site
   - Build settings: `npm run build`
   - Publish directory: `out`

## 📝 License

This project is created for educational and nostalgic purposes.

## 🤝 Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

---

*"Website này không chỉ để xem, mà để nhớ rằng chúng ta đã từng là một lớp."*
