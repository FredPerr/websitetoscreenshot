'use client'
import { FormContext } from '@/contexts/FormContext'
import { FrameType } from '@/contstants/Frames'
import { ThemeType } from '@/contstants/Theme'
import { drawBackground, drawImage } from '@/utils/sketches'
import React, { useRef, useEffect } from 'react'

interface VisualProps {
    image: ImageBitmap
    width: number
    height: number
    frame: FrameType
    theme: ThemeType
}

export default function Visual({ width, height, image, frame, theme }: VisualProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { url } = React.useContext(FormContext)
    const [downloaded, setDownloaded] = React.useState(false)

    const handleDownload = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) throw new Error('Could not find canvas element to download.')
        if (downloaded) throw new Error('Already downloaded.')

        setDownloaded(true)
        const imageUrl = canvas.toDataURL('image/jpeg')
        const link = document.createElement('a')
        link.download = new URL(url).hostname.replace('.', '_') + '.jpg'
        link.href = imageUrl
        link.click()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) throw new Error('Could not find canvas element')
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Could not get canvas context')

        let frameCount = 0
        let animationFrameId: number

        const render = () => {
            frameCount++
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            drawBackground(ctx, theme.bgColor)
            drawImage(ctx, image, theme.borderWidth)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [image, frame, theme])
    return (
        <div>
            <div className="overflow-auto">
                <canvas className="w-full" ref={canvasRef} width={width} height={height} />
            </div>
            <div className="m-2 flex justify-center w-full">
                <button className="btn btn-secondary" disabled={downloaded} onClick={() => handleDownload(canvasRef.current)}>
                    Download (JPEG)
                </button>
            </div>
        </div>
    )
}
