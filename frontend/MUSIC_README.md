# 🎵 Hướng dẫn thêm nhạc nền

## Cách thêm nhạc nền:

### 1. Chuẩn bị file nhạc:
- **Format**: MP3, WAV, OGG
- **Kích thước**: < 10MB (tốt nhất < 5MB)
- **Chất lượng**: 128kbps bitrate
- **Thời lượng**: 2-5 phút (sẽ loop)

### 2. Upload file:
- Tạo thư mục `frontend/public/` (nếu chưa có)
- Upload file nhạc vào `frontend/public/nhac-nen.mp3`

### 3. Cập nhật code:
Mở `frontend/src/components/AudioPlayer.tsx`:

```javascript
// Thay đổi source:
<source src="/nhac-nen.mp3" type="audio/mp3" />
```

### 4. Nguồn nhạc gợi ý:

#### Nhạc Việt Nam hoài niệm:
- "Con Đường Mưa" - Trịnh Công Sơn
- "Nhà" - Uyên Linh
- "Giấc Mơ" - Trịnh Công Sơn
- Nhạc không lời Việt Nam

#### Nhạc không lời:
- Piano nhẹ nhàng
- Guitar acoustic
- Ambient sounds

#### Online sources:
- YouTube Audio Library (free)
- Bensound.com (free for personal use)
- SoundCloud (creative commons)

### 5. Deploy:
- Upload file nhạc lên GitHub
- Redeploy trên Render.com

## ⚠️ Lưu ý:

- **Copyright**: Chỉ dùng nhạc có bản quyền hoặc creative commons
- **File size**: Ảnh hưởng tốc độ load (dưới 5MB)
- **Auto-play**: Có thể bị browser block, website sẽ hiện popup yêu cầu
- **Mobile**: Một số browser hạn chế audio, cần user interaction
- **Format**: MP3, WAV, OGG được hỗ trợ

## 🎛️ Tính năng Audio Player:

- **Play/Pause**: Click icon nhạc
- **Volume**: Slider điều chỉnh âm lượng
- **Mute**: Click icon loa
- **Auto-hide**: Ẩn controls sau 3s
- **Hover**: Hiện controls khi di chuột
- **Loop**: Tự động lặp
- **Smart auto-play**: Nhớ lựa chọn của user

## 🧪 Test nhạc nền:

1. **Local development**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Check console**: Xem logs auto-play
3. **Click "Bật nhạc"** nếu popup xuất hiện
4. **Test controls**: Play/pause, volume, mute
5. **Test responsive**: Resize browser

## 🚀 Deploy với nhạc:

1. Upload file nhạc lên GitHub
2. Push code changes
3. Render.com sẽ auto-deploy
4. Test trên production URL
