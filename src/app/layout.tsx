import './globals.css'
import React from 'react'


export const metadata = {
    title: 'Website To Screenshot',
    description: 'Convert website to a screenshot with beautiful contours in seconds for marketing and presentation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 vsc-initialized">{children}</body>
        </html>
    )
}
