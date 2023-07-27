import './globals.css'
import React from 'react'


export const metadata = {
    title: 'WebsiteToVisual',
    description: 'Convert website to a screenshot or a scrolling video (GIF) with beautiful contours in seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 vsc-initialized">{children}</body>
        </html>
    )
}
