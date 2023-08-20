import './globals.css'
import React from 'react'


export const metadata = {
    title: 'WebsiteToScreenshot - Take a Screenshot with Beautiful Styling for Social Media Posting',
    description: 'Convert website to a screenshot (PNG, JPEG) with beautiful contours. Customize the background, margins, borders, ...',
   keywords: ['convert', 'website', 'screenshot', 'styled']
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="cmyk">
            <body className="bg-gray-50 vsc-initialized">{children}</body>
        </html>
    )
}
