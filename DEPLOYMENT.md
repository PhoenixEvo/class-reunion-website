# 🚀 Hướng dẫn Triển khai lên Render.com

## Tổng quan

Website sẽ được triển khai dưới dạng:
- **Backend**: Web Service (Node.js)
- **Frontend**: Static Site (Next.js)

## Chuẩn bị

### 1. Tài khoản và Setup

1. Đăng ký tài khoản tại [Render.com](https://render.com)
2. Kết nối GitHub repository
3. Chuẩn bị các environment variables

### 2. MongoDB Atlas Setup

1. Tạo tài khoản [MongoDB Atlas](https://cloud.mongodb.com)
2. Tạo cluster mới (free tier)
3. Tạo database user
4. Whitelist IP: `0.0.0.0/0` (cho phép tất cả)
5. Lấy connection string

### 3. Cloudinary Setup

1. Tạo tài khoản [Cloudinary](https://cloudinary.com)
2. Lấy Cloud Name, API Key, API Secret từ Dashboard

## Triển khai Backend

### 1. Tạo Web Service

1. Trong Render Dashboard, click **"New"** → **"Web Service"**
2. Connect GitHub repository
3. Cấu hình:

```
Name: class-reunion-backend
Environment: Node
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 2. Environment Variables

Thêm các biến môi trường:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/class-reunion
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Deploy

- Click **"Create Web Service"**
- Render sẽ tự động build và deploy
- URL backend sẽ có dạng: `https://class-reunion-backend.onrender.com`

## Triển khai Frontend

### 1. Tạo Static Site

1. Trong Render Dashboard, click **"New"** → **"Static Site"**
2. Connect cùng GitHub repository
3. Cấu hình:

```
Name: class-reunion-frontend
Build Command: npm run build
Publish Directory: out
```

**Quan trọng**: Frontend được cấu hình để export static files, nên sẽ tạo thư mục `out` thay vì `.next`.

### 2. Environment Variables

```
NEXT_PUBLIC_API_URL=https://class-reunion-backend.onrender.com
```

### 3. Cập nhật Frontend Code

Trong `frontend/src/app/page.tsx`, cập nhật API base URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
```

Và sử dụng `API_BASE_URL` trong các API calls thay vì localhost.

### 4. Deploy

- Click **"Create Static Site"**
- Render sẽ build Next.js và publish static files
- URL frontend sẽ có dạng: `https://class-reunion-frontend.onrender.com`

## Cập nhật CORS

Trong backend `.env`, cập nhật:

```
FRONTEND_URL=https://class-reunion-frontend.onrender.com
```

Redeploy backend để áp dụng thay đổi CORS.

## Kiểm tra Triển khai

1. Truy cập frontend URL
2. Test các tính năng:
   - Landing page load
   - Gallery: upload và view images
   - Q&A: post questions và answers

## Lưu ý Quan trọng

### Render Free Tier
- Web Services sleep sau 15 phút không hoạt động
- Static Sites không sleep
- Có giới hạn bandwidth và compute time

### Performance
- Images được tối ưu tự động bởi Next.js Image component
- Cloudinary xử lý resize và optimize images
- MongoDB Atlas free tier đủ cho ~30-50 users

### Bảo mật
- Không lưu thông tin cá nhân
- Rate limiting đã được setup
- CORS được cấu hình đúng

## Troubleshooting

### Backend không start
- Kiểm tra environment variables
- Check MongoDB connection string
- Verify Cloudinary credentials

### Frontend build fail
- Đảm bảo NEXT_PUBLIC_API_URL được set
- Check build logs trong Render

### API calls fail
- Verify CORS settings
- Check backend URL trong frontend
- Test API endpoints directly

### Build failed - Could not read package.json
- **Nguyên nhân**: Root Directory không được set đúng
- **Giải pháp**: Đảm bảo `Root Directory: backend` trong Web Service settings
- **Kiểm tra**: Build log sẽ hiển thị đường dẫn tìm package.json

### Backend deploy thành công nhưng API không hoạt động
- Kiểm tra environment variables đã được set chưa
- Verify MongoDB connection string format
- Check Cloudinary credentials
- Test API trực tiếp: `GET https://your-backend-url.onrender.com/api/health`

## Chi phí

- **Render Free Tier**: ~$0/tháng
- **MongoDB Atlas Free**: ~$0/tháng (512MB)
- **Cloudinary Free**: ~$0/tháng (25GB storage, 25GB monthly bandwidth)

Tổng chi phí: **$0/tháng** cho MVP!
