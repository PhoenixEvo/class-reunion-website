'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import Gallery from '@/components/Gallery'
import QASection from '@/components/QASection'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'landing' | 'gallery' | 'qa'>('landing')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div className="min-h-screen bg-nostalgic-cream" />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-nostalgic-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentSection('landing')}
              className="font-serif text-xl text-nostalgic-brown hover:text-nostalgic-warm transition-colors"
            >
              Họp Lớp
            </button>
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentSection('landing')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentSection === 'landing'
                    ? 'text-nostalgic-warm'
                    : 'text-nostalgic-brown hover:text-nostalgic-warm'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setCurrentSection('gallery')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentSection === 'gallery'
                    ? 'text-nostalgic-warm'
                    : 'text-nostalgic-brown hover:text-nostalgic-warm'
                }`}
              >
                Hình ảnh
              </button>
              <button
                onClick={() => setCurrentSection('qa')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentSection === 'qa'
                    ? 'text-nostalgic-warm'
                    : 'text-nostalgic-brown hover:text-nostalgic-warm'
                }`}
              >
                Hỏi đáp
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {currentSection === 'landing' && <LandingPage onNavigate={setCurrentSection} />}
        {currentSection === 'gallery' && <Gallery />}
        {currentSection === 'qa' && <QASection />}
      </main>
    </motion.div>
  )
}
