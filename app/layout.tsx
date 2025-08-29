import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgTech Carbon Credit Tracker - Agricultural Sustainability Platform',
  description: 'Comprehensive agricultural sustainability platform for farmers to track, optimize, and monetize their carbon footprint. Professional enterprise application for carbon credit management.',
  keywords: 'agriculture, carbon credits, sustainability, farming, carbon footprint, regenerative agriculture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}
