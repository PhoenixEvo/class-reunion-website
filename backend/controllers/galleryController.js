const Gallery = require('../models/Gallery')
const { validationResult } = require('express-validator')

// Get all gallery images
const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 })
    res.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    res.status(500).json({ error: 'Failed to fetch gallery images' })
  }
}

// Upload new image
const uploadImage = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    const { url, public_id } = req.file
    const { caption } = req.body

    const newImage = new Gallery({
      url,
      publicId: public_id,
      caption: caption?.trim() || undefined,
    })

    const savedImage = await newImage.save()
    res.status(201).json(savedImage)
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
}

module.exports = {
  getGalleryImages,
  uploadImage,
}
