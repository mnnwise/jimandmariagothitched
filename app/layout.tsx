import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import localFont from 'next/font/local'
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

const dreamboat = localFont({
  src: '../public/fonts/dreamboat-font-1784653638-0/fontspring-demo-dreamboat-regular.otf',
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
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${dreamboat.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#5A86CB] text-[#3D5D91] antialiased">
        {children}
      </body>
    </html>
  )
}
