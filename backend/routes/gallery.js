const express = require('express')
const router = express.Router()
const { getGalleryImages, uploadImage } = require('../controllers/galleryController')
const { upload } = require('../middlewares/upload')
const { validateImageUpload } = require('../middlewares/validation')

// GET /api/gallery - Get all gallery images
router.get('/', getGalleryImages)

// POST /api/gallery/upload - Upload new image
router.post(
  '/upload',
  upload.single('image'),
  validateImageUpload,
  uploadImage
)

module.exports = router
