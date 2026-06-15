import type { Metadata } from 'next'
import { Schibsted_Grotesk, Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const display = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Markuce — Global Payments for Everyone',
    template: '%s | Markuce',
  },
  description:
    'The global Merchant of Record for the 150+ countries locked out of Stripe, PayPal, and Paddle. Accept cards and crypto in one checkout. No LLC required.',
  keywords: ['payments', 'merchant of record', 'global payments', 'crypto payments', 'Stripe alternative', 'Pakistan payments'],
  openGraph: {
    type: 'website',
    url: 'https://markuce.com',
    title: 'Markuce — Global Payments for Everyone',
    description: 'Accept payments from anywhere Stripe won\'t let you.',
    siteName: 'Markuce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markuce — Global Payments for Everyone',
    description: 'Accept payments from anywhere Stripe won\'t let you.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" style={{ background: 'var(--bg)' }}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
