import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://epoch-converter.vercel.app'),
  alternates: {
    canonical: 'https://epoch-converter.vercel.app',
  },
  title: 'Epoch Converter — Unix Timestamp to Date | Free Tool',
  description: 'Convert Unix timestamps to human-readable dates and vice versa. Free online epoch converter for developers.',
  keywords: ['epoch converter', 'unix timestamp', 'timestamp to date', 'date to timestamp', 'epoch time'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://epoch-converter.vercel.app',
    siteName: 'Epoch Converter',
    title: 'Epoch Converter — Unix Timestamp to Date',
    description: 'Convert Unix timestamps to human-readable dates.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoch Converter',
    description: 'Convert Unix timestamps to human-readable dates.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Epoch Converter',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Timestamp to date, Date to timestamp, Multiple formats, Current time',
            })
          }}
        />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>{children}</body>
    </html>
  )
}
