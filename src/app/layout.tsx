import { MenuContext } from '@/contexts/MenuContext'
import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import RootProvidersWrapper from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'WebsiteToVisual',
    description: 'Convert website to a screenshot or a scrolling video (GIF) with beautiful contours in seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RootProvidersWrapper>{children}</RootProvidersWrapper>
            </body>
        </html>
    )
}
