# Class Reunion Backend

Backend API for the class reunion website built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with the following content and fill in your actual credentials:
```
# Environment
NODE_ENV=development

# Server
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas - Get from MongoDB Atlas dashboard
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/class-reunion

# Cloudinary - Get from Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery/upload` - Upload new image (multipart/form-data)

### Questions & Answers
- `GET /api/questions` - Get all questions with answers
- `POST /api/questions` - Create new question
- `POST /api/questions/:id/answers` - Add answer to question

### Health Check
- `GET /api/health` - Server health check
