import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import { Analytics } from '@vercel/analytics/react'
import styles from '../app/styless/Navbar.module.css'
import Footer from './footer/page'
import FooterStyles from "../app/styless/Footer.module.css"
import { defaultMetadata } from './metadata'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEL Laundry - Premier Laundry Services in Nairobi, Kenya',
  description: 'Discover MEL Laundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya. Experience convenience and quality with us.',
  keywords: 'laundry services Nairobi, self-service laundry Kenya, affordable laundry Nairobi, MEL Laundry, Nairobi laundry services, professional laundry, drying services',
  robots: 'index, follow',
  openGraph: {
    title: 'MEL Laundry - Hassle-Free Professional Laundry Services in Nairobi, Kenya',
    description: 'Discover MEL Laundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya.',
    url: 'https://www.mellaundry.co.ke',
    type: 'website',
    images: [
      {
        url: 'https://www.mellaundry.co.ke/images/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEL Laundry - Hassle-Free Laundry Services in Nairobi, Kenya',
    description: 'Discover MEL Laundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya.',
    images: ['https://www.mellaundry.co.ke/images/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: 'https://www.mellaundry.co.ke',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
    shortcut: ['/favicon.ico'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="manifest" href="/manifest.json" />
      <body className={`${inter.className} no-scroll-padding`} suppressHydrationWarning>
        <div className="app-container">
          <NavBar />
          <main className={`main-content ${styles.main}`}>
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  )
}