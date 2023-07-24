'use client'

import React from 'react'
import { FRAME_CANVAS_ID, FRAME_ID } from '@/components/frames'
import { drawImage } from '@/utils/CanvasPainter'
import { toPng } from 'html-to-image'
import Frame from "@/components/frames/Frame"


export default function Home() {

    const [width, setWidth] = React.useState<number>(1920)
    const [height, setHeight] = React.useState<number>(1080)
    const [url, setURL] = React.useState<string>('https://webkick.ca')
    const [bitmap, setBitmap] = React.useState<undefined | ImageBitmap>(undefined)
    const [resultURL, setResultURL] = React.useState<string | undefined>(undefined)

    const generateScreenshot = async () => {

        const screenshotReq = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                fullscreen: false,
                width: width,
                height: height,
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
            console.error("Could not get the frame canvas ID to paint on")
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
            <label className="label" htmlFor="url">URL</label>
            <input className="input input-bordered input-primary" type="url" onChange={(e) => setURL(e.currentTarget.value)} />
            <label className="label" htmlFor="width">Width</label>
            <input className="input input-bordered input-primary" name="width" onChange={(e) => {
                try {
                    const px = Number(e.currentTarget.value);
                    setWidth(px)
                } catch {
                    return
                }
            }} />

            <label className="label" htmlFor="height">Height</label>
            <input className="input input-bordered input-primary" name="height" onChange={(e) => {
                try {
                    const px = Number(e.currentTarget.value);
                    setHeight(px)
                } catch {
                    return
                }
            }
            } />
            <input type="button" value="Generate frame" onClick={() => generateScreenshot()} className='cursor-pointer btn btn-primary' />
            <div>
                {/* <DesktopFrame url="https://google.com" />  */}
                <Frame displayURL={url} frame={{ borderWidth: 2, borderColor: 'gray', borderRadius: 6 }} width={width} height={height} padding={40} />
            </div>
            <button className="btn btn-primary" onClick={() => generateVisualImage()}>Generate visual image</button>
            {
                resultURL && <a href={resultURL} target='_blank' rel="noreferrer">View result</a>
            }
        </div>
    )
}
