'use client'

import React from 'react'
import DesktopFrame from '@/components/frames/DesktopFrame'
import { FRAME_CANVAS_ID, FRAME_ID } from '@/components/frames'
import { drawImage } from '@/utils/CanvasPainter'
import { toPng } from 'html-to-image'


export default function Home() {

    const [bitmap, setBitmap] = React.useState<undefined | ImageBitmap>(undefined)
    const [resultURL, setResultURL] = React.useState<string | undefined>(undefined)

    const generateScreenshot = async () => {

        const screenshotReq = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'https://webkick.ca',
                fullscreen: false,
                width: 1920,
                height: 1080,
            })
        });
        if (!screenshotReq.ok)
            return

        const blob = await screenshotReq.blob()
        setBitmap(await createImageBitmap(blob))
    }

    const generateVisualImage = async () => {

        const frame = document.getElementById(FRAME_ID)
        if (!frame) {
            console.error("Could not get the frame to generate the final visual result")
            return
        }

        const image = await toPng(frame)
        setResultURL(image)
    }

    React.useEffect(() => {
        if (!bitmap)
            return

        const canvas = document.getElementById(FRAME_CANVAS_ID) as HTMLCanvasElement | null
        if (!canvas) {
            console.error("Could not get teh frame canvas ID to paint on")
            return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            console.error("Could not get 2D context of the frame canvas")
            return
        }

        drawImage(bitmap, ctx)

    }, [bitmap])

    return (
        <div>
            <input type="button" value="Generate frame" onClick={() => generateScreenshot()} className='cursor-pointer btn btn-neutral' />
            <div>
                <DesktopFrame url="https://google.com" />
            </div>
            <button className="btn btn-primary" onClick={() => generateVisualImage()}>Generate visual image</button>
            {
                resultURL && <a href={resultURL} target='_blank' rel="noreferrer">View result</a>
            }
        </div>
    )
}
