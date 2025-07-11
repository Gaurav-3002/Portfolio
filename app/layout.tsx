import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import ChatBubble from '@/components/ChatBubble'
import ProfileWidget from '@/components/ProfileWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gaurav Kumar - Aspiring Software Developer',
    template: '%s | Gaurav Kumar Portfolio'
  },
  description: 'Passionate software developer creating innovative solutions through cutting-edge technology. Experienced in Python, JavaScript, React, Next.js, and full-stack development.',
  keywords: [
    'software developer', 
    'aspiring software engineer',
    'web developer',
    'portfolio', 
    'react', 
    'next.js', 
    'three.js',
    'python',
    'full stack developer',
    'gaurav kumar',
    'KIIT University',
    'Bhubaneswar'
  ],
  authors: [{ name: 'Gaurav Kumar', url: 'https://github.com/gauravkumar' }],
  creator: 'Gaurav Kumar',
  metadataBase: new URL('https://gaurav-portfolio.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gaurav-portfolio.vercel.app',
    title: 'Gaurav Kumar - Aspiring Software Developer',
    description: 'Passionate software developer creating innovative solutions through cutting-edge technology',
    siteName: 'Gaurav Kumar Portfolio',
    images: [
      {
        url: '/Self.jpg',
        width: 1200,
        height: 630,
        alt: 'Gaurav Kumar - Software Developer Portfolio',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Kumar - Aspiring Software Developer',
    description: 'Passionate software developer creating innovative solutions through cutting-edge technology',
    creator: '@gauravkumar',
    images: ['/Self.jpg']
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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const socialLinks = [
    { icon: 'github', url: 'https://github.com/gauravkumar', label: 'GitHub' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/gauravkumar', label: 'LinkedIn' },
    { icon: 'twitter', url: 'https://twitter.com/gauravkumar', label: 'Twitter' },
  ]

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased text-slate-900 dark:text-slate-100">
        {children}
        <ProfileWidget 
          imageUrl="/Self.jpg"
          cvUrl="/resume.pdf"
          socials={socialLinks}
        />
        <ChatBubble />
      </body>
    </html>
  )
}