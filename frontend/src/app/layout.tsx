import type { Metadata } from 'next'
import { Inter, Crimson_Text } from 'next/font/google'
import './globals.css'
import AudioPlayer from '@/components/AudioPlayer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const crimsonText = Crimson_Text({ weight: '400', subsets: ['latin'], variable: '--font-crimson' })

export const metadata: Metadata = {
  title: 'Họp Lớp - Kỷ Niệm Chung',
  description: 'Website họp lớp để nhớ lại những kỷ niệm đẹp',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${crimsonText.variable}`}>
      <body className={inter.className}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}
