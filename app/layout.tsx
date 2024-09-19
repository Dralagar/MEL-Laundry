import type { Metadata } from 'next'
import NavBar from './components/NavBar'
import Footer from '../app/footer/page'
import './globals.css'

export const metadata: Metadata = {
  title: 'MEL Laundry - Hassle-Free Self-Service Laundry in Nairobi',
  description: 'Enjoy fast, efficient, and affordable self-service laundry at MEL\'s convenient locations across Nairobi.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}