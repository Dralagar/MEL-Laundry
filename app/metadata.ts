export const defaultMetadata = {
  title: 'MEL Laundry - Professional Self-Service Laundry in Nairobi',
  description: 'MEL Laundry offers 24/7 self-service laundry facilities in Nairobi for 2025. Professional washing, drying, and laundry services at competitive rates. Multiple locations including Donholm Phase 8.',
  keywords: 'quick wash Nairobi, 15-minute laundry, self-service washing machines, laundromat Donholm, 24/7 laundry service, affordable dry cleaning Nairobi, commercial laundry services, duvet cleaning Nairobi, blanket washing service, professional ironing service, eco-friendly laundry Nairobi, high-efficiency washing machines, mixed clothes washing, bulk laundry service, express laundry Donholm Phase 8, premium laundry care, industrial washing machines, same-day laundry service, affordable laundry prices Nairobi, MEL Laundry locations',
  authors: [{ name: 'MEL Laundry' }],
  metadataBase: new URL('https://mellaundry.co.ke'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MEL Laundry - Professional Self-Service Laundry in Nairobi',
    description: '15-minute quick wash & professional drying services in Nairobi. Self-service and full-service laundry solutions with state-of-the-art machines. Multiple locations including new branch in Donholm Phase 8. Affordable rates starting from KSh 99/kg.',
    url: 'https://mellaundry.co.ke',
    siteName: 'MEL Laundry',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MEL Laundry Facilities',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
} 