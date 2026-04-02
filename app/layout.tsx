import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import { Analytics } from '@vercel/analytics/react'
import styles from '../app/styless/Navbar.module.css'
import Footer from './footer/page'
import { defaultMetadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEL Laundry',
  description: 'Professional Laundry Services in Nairobi',
  // Add more metadata for better SEO
  keywords: 'laundry, dry cleaning, Nairobi, MEL Laundry, wash and fold',
  authors: [{ name: 'MEL Laundry Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MEL Laundry',
    description: 'Professional Laundry Services in Nairobi',
    type: 'website',
    locale: 'en_KE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2ecc71" />
        <link rel="icon" href="/favicon.ico" />
      </head>
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