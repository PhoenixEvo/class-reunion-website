'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  _id: string
  url: string
  publicId: string
  caption?: string
  createdAt: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/gallery`)
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/gallery/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newImage = await response.json()
        setImages(prev => [newImage, ...prev])
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-nostalgic-brown mb-4">
            Thư viện hình ảnh
          </h1>
          <p className="text-nostalgic-sage text-lg">
            Những khoảnh khắc đáng nhớ của chúng ta
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <label className="nostalgic-button inline-flex items-center gap-2 cursor-pointer">
            <Upload size={20} />
            {isUploading ? 'Đang tải lên...' : 'Chia sẻ hình ảnh'}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          <p className="text-sm text-nostalgic-brown/60 mt-2">
            Hình ảnh sẽ được chia sẻ ẩn danh
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nostalgic-warm"></div>
          </div>
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ImageIcon className="w-16 h-16 text-nostalgic-sage/30 mx-auto mb-4" />
            <p className="text-nostalgic-brown/60 text-lg">
              Chưa có hình ảnh nào. Hãy là người đầu tiên chia sẻ!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nostalgic-card cursor-pointer overflow-hidden group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.caption || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                {image.caption && (
                  <div className="p-4">
                    <p className="text-sm text-nostalgic-brown">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-nostalgic-warm transition-colors"
                >
                  <X size={32} />
                </button>
                <div className="relative">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.caption || 'Gallery image'}
                    width={800}
                    height={600}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  {selectedImage.caption && (
                    <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-nostalgic-brown">{selectedImage.caption}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
