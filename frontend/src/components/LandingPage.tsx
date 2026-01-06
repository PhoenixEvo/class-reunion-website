'use client'

import { motion } from 'framer-motion'
import { Heart, Camera, MessageCircle } from 'lucide-react'

interface LandingPageProps {
  onNavigate: (section: 'landing' | 'gallery' | 'qa') => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const classNames = [
    'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E',
    'Đỗ Thị F', 'Bùi Văn G', 'Vũ Thị H', 'Đinh Văn I', 'Ngô Thị K',
    'Đặng Văn L', 'Lý Thị M', 'Trịnh Văn N', 'Phan Thị O', 'Võ Văn P'
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Names Background */}
      {classNames.map((name, index) => (
        <motion.div
          key={name}
          className="floating-text"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {name}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center z-10 px-4 max-w-4xl"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-serif text-nostalgic-brown mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Họp Lớp
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-nostalgic-sage mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Kỷ niệm chung của chúng ta
        </motion.p>

        <motion.p
          className="text-lg text-nostalgic-brown/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Website này không chỉ để xem, mà để nhớ rằng chúng ta đã từng là một lớp.
          Hãy cùng nhau ôn lại những kỷ niệm đẹp và chia sẻ những câu hỏi thầm kín.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.button
            onClick={() => onNavigate('gallery')}
            className="nostalgic-button flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera size={20} />
            Xem hình ảnh kỷ niệm
          </motion.button>

          <motion.button
            onClick={() => onNavigate('qa')}
            className="nostalgic-button flex items-center gap-2 bg-nostalgic-sage hover:bg-nostalgic-sage/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            Hỏi điều bạn từng thắc mắc
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <Heart className="text-nostalgic-warm/30 w-8 h-8 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-nostalgic-brown/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-nostalgic-brown/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
