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
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'pending' | 'uploading' | 'success' | 'error'}>({})
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
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    // Initialize progress and status for all files
    const initialProgress: {[key: string]: number} = {}
    const initialStatus: {[key: string]: 'pending' | 'uploading' | 'success' | 'error'} = {}

    Array.from(files).forEach(file => {
      initialProgress[file.name] = 0
      initialStatus[file.name] = 'pending'
    })

    setUploadProgress(initialProgress)
    setUploadStatus(initialStatus)

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/gallery/upload`
    const uploadPromises = Array.from(files).map(async (file) => {
      // Update status to uploading
      setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }))

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const newImage = await response.json()
          setImages(prev => [newImage, ...prev])
          setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }))
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
          return { success: true, file: file.name }
        } else {
          const errorText = await response.text()
          setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
          return { success: false, file: file.name, error: `${response.status} - ${errorText}` }
        }
      } catch (error) {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }))
        return {
          success: false,
          file: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises)

    // Show summary
    const successCount = results.filter(r => r.success).length
    const errorCount = results.filter(r => !r.success).length

    if (errorCount === 0) {
      alert(`✅ Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}!`)
    } else if (successCount === 0) {
      alert(`❌ Failed to upload all images. Check console for details.`)
    } else {
      alert(`⚠️ Uploaded ${successCount} image${successCount > 1 ? 's' : ''}, ${errorCount} failed. Check console for details.`)
    }

    // Log errors to console
    const errors = results.filter(r => !r.success)
    if (errors.length > 0) {
      console.error('Upload errors:', errors)
    }

    setIsUploading(false)

    // Clear progress after 3 seconds
    setTimeout(() => {
      setUploadProgress({})
      setUploadStatus({})
    }, 3000)
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
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          <p className="text-sm text-nostalgic-brown/60 mt-2">
            Hình ảnh sẽ được chia sẻ ẩn danh • Chọn nhiều ảnh cùng lúc được
          </p>

          {/* Upload Progress */}
          {Object.keys(uploadStatus).length > 0 && (
            <div className="mt-4 max-w-md mx-auto">
              <div className="space-y-2">
                {Object.entries(uploadStatus).map(([fileName, status]) => (
                  <div key={fileName} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                      status === 'success' ? 'bg-green-500 text-white' :
                      status === 'error' ? 'bg-red-500 text-white' :
                      status === 'uploading' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {status === 'success' ? '✓' :
                       status === 'error' ? '✗' :
                       status === 'uploading' ? '↻' : '○'}
                    </div>
                    <span className="flex-1 truncate text-left">
                      {fileName.length > 30 ? fileName.substring(0, 30) + '...' : fileName}
                    </span>
                    <span className={`text-xs ${
                      status === 'success' ? 'text-green-600' :
                      status === 'error' ? 'text-red-600' :
                      status === 'uploading' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {status === 'success' ? 'Hoàn thành' :
                       status === 'error' ? 'Lỗi' :
                       status === 'uploading' ? 'Đang tải...' :
                       'Chờ'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
