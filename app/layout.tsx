import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Praise } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
})

const praise = Praise({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: 'Jim & Maria',
  description: 'Celebrating the marriage of Jim and Maria — April 25th, 2026, Las Vegas, Nevada.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${praise.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#5A86CB] text-[#3D5D91] antialiased">
        {children}
      </body>
    </html>
  )
}
