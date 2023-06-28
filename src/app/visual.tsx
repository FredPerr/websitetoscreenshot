'use client'
import { FormContext } from '@/contexts/FormContext'
import React, { useRef, useEffect } from 'react'

interface VisualProps {
    image: ImageBitmap
    width: number
    height: number
}

const draw = (ctx: CanvasRenderingContext2D, frameCount: number, img: ImageBitmap) => {
    ctx.drawImage(img, 0, 0)
}

export default function Visual({ width, height, image }: VisualProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { url } = React.useContext(FormContext)

    const handleDownload = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) throw new Error('Could not find canvas element to download.')

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
            draw(ctx, frameCount, image)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [image])
    return (
        <>
            <canvas ref={canvasRef} width={width} height={height} />
            <div className="m-2 flex justify-center w-full">
                <button className="btn btn-secondary" onClick={() => handleDownload(canvasRef.current)}>
                    Download (JPEG)
                </button>
            </div>
        </>
    )
}
