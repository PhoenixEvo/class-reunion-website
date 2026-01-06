'use client'

import { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showEnablePrompt, setShowEnablePrompt] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-hide controls after 3s of inactivity
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const resetControlsTimeout = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Smart auto-play with better user interaction detection
    const tryAutoPlay = async () => {
      try {
        // Modern browsers require user gesture for autoplay
        // We'll try autoplay and handle the rejection gracefully
        await audio.play()
        setIsPlaying(true)
        setShowEnablePrompt(false)
        localStorage.setItem('musicEnabled', 'true')
        console.log('🎵 Music auto-played successfully')
      } catch (error) {
        console.log('Auto-play blocked by browser policy')
        // Show enable prompt, but don't be annoying
        const musicEnabled = localStorage.getItem('musicEnabled') === 'true'
        if (!musicEnabled) {
          setTimeout(() => setShowEnablePrompt(true), 3000) // Show after 3s
        }
      }
    }

    // Detect user interaction for auto-play
    const handleUserInteraction = () => {
      localStorage.setItem('musicEnabled', 'true')
      setShowEnablePrompt(false)
      // Try auto-play after user interaction
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        tryAutoPlay()
      }
    }

    // Listen to various user interactions
    const events = ['click', 'keydown', 'touchstart', 'scroll']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true })
    })

    audio.addEventListener('loadeddata', () => {
      setIsLoaded(true)
      console.log('🎵 Music file loaded')

      // Check if user has already interacted
      const musicEnabled = localStorage.getItem('musicEnabled') === 'true'
      if (musicEnabled) {
        console.log('🎵 User previously enabled music, trying auto-play...')
        tryAutoPlay()
      } else {
        console.log('🎵 Waiting for user interaction...')
      }
    })

    audio.addEventListener('ended', () => {
      audio.currentTime = 0 // Loop
      if (isPlaying) audio.play()
    })

    // Initial auto-play attempt
    tryAutoPlay()

    return () => {
      const events = ['click', 'keydown', 'touchstart', 'scroll']
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
      audio.removeEventListener('loadeddata', () => {})
      audio.removeEventListener('ended', () => {})
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    resetControlsTimeout()

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('Playback failed:', error)
    }
  }

  const toggleMute = () => {
    resetControlsTimeout()
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(false)
    resetControlsTimeout()
  }

  // Sync volume with audio element
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
      >
        {/* Nhạc nền local (ưu tiên) */}
        <source src="/nhac-nen.mp3" type="audio/mp3" />
        <source src="/nhac-nen.wav" type="audio/wav" />
        <source src="/nhac-nen.ogg" type="audio/ogg" />
        {/* Fallback: Nhạc online mẫu */}
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        {/* Fallback message */}
        Trình duyệt không hỗ trợ phát nhạc.
      </audio>

      {/* Enable Music Prompt */}
      {showEnablePrompt && (
        <div className="fixed bottom-24 right-6 z-50 max-w-xs animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-nostalgic-sage/30 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Music size={20} className="text-nostalgic-brown" />
              <span className="text-sm font-medium text-nostalgic-brown">
                🎵 Bật nhạc nền?
              </span>
            </div>
            <p className="text-xs text-nostalgic-sage mb-3">
              Nhạc nền hoài niệm sẽ làm website thêm ấm áp. Bạn có muốn bật không?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  localStorage.setItem('musicEnabled', 'true')
                  togglePlay()
                  setShowEnablePrompt(false)
                }}
                className="flex-1 bg-nostalgic-warm text-white text-xs py-2 px-3 rounded-md hover:bg-nostalgic-warm/90 transition-colors"
              >
                🎵 Có, bật nhạc
              </button>
              <button
                onClick={() => setShowEnablePrompt(false)}
                className="text-xs py-2 px-3 text-nostalgic-sage hover:text-nostalgic-brown transition-colors"
              >
                Không, cảm ơn
              </button>
            </div>
            <p className="text-xs text-nostalgic-sage/70 mt-2">
              Bạn có thể bật/tắt nhạc bất cứ lúc nào
            </p>
          </div>
        </div>
      )}

      {/* Audio Player UI */}
      <div
        className="fixed bottom-6 right-6 z-50 transition-all duration-300"
        onMouseEnter={resetControlsTimeout}
        onMouseLeave={() => setTimeout(() => setShowControls(false), 1000)}
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-nostalgic-sage/20 transition-all duration-300 ${
          showControls ? 'p-3 opacity-100 scale-100' : 'p-2 opacity-60 scale-90'
        }`}>
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-nostalgic-warm text-white flex items-center justify-center hover:bg-nostalgic-warm/90 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Volume Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-nostalgic-brown hover:text-nostalgic-warm transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-nostalgic-sage/30 rounded-lg appearance-none cursor-pointer slider"
                title="Volume"
              />
            </div>

            {/* Music Icon */}
            <div className="flex items-center gap-1 text-nostalgic-brown">
              <Music size={16} />
              <span className="text-xs font-medium">Nhạc nền</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: rgb(212, 167, 116);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: rgb(212, 167, 116);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}

