import type { Metadata } from 'next'
import { defaultMetadata } from '../metadata'

export const metadata: Metadata = {
  title: 'About MEL Laundry | Professional Laundry Services in Nairobi',
  description: 'MEL Laundry offers professional machine washing and laundry services in Nairobi, including Donholm. Learn about our mission, values, and locations. Eco-friendly, 24/7, premium quality.',
  keywords: defaultMetadata.keywords + ', about MEL Laundry, our mission, our values, Nairobi laundry locations',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'About MEL Laundry | Professional Laundry Services in Nairobi',
    description: 'MEL Laundry offers professional machine washing and laundry services in Nairobi. Our mission, values, and locations.',
    url: 'https://www.mellaundry.co.ke/about',
    images: [{ url: '/images/Inside.jpg', width: 1200, height: 630, alt: 'MEL Laundry interior' }],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
