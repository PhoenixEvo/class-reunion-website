const multer = require('multer')
const cloudinary = require('../config/cloudinary')

// Simple multer storage for now - will upload to cloudinary manually
const storage = multer.memoryStorage()

// Cloudinary upload function
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: 'class-reunion-gallery',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
      ...options
    }, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
    uploadStream.end(buffer)
  })
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  },
})

module.exports = { upload, uploadToCloudinary }
