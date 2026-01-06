import type { Metadata } from 'next'
import { Inter, Georgia } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const georgia = Georgia({ weight: '400', subsets: ['latin'], variable: '--font-georgia' })

export const metadata: Metadata = {
  title: 'Họp Lớp - Kỷ Niệm Chung',
  description: 'Website họp lớp để nhớ lại những kỷ niệm đẹp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${georgia.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
