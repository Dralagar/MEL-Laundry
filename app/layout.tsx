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
  title: 'MEL Laundry',
  description: 'Professional Laundry Services in Nairobi',
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