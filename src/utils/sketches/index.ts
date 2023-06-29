import { Theme } from '@/contstants/Theme'

export interface SketchParams {
    ctx: CanvasRenderingContext2D
    img: ImageBitmap
    frameCount?: number
    margin: number
    theme: Theme
}

export function drawBackground(ctx: CanvasRenderingContext2D, bgColor: string) {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export function drawRoundedImageWithShadow(ctx: CanvasRenderingContext2D, image: ImageBitmap, theme: Theme) {
    const {
        margin,
        border: { radius },
        shadow,
    } = theme
    ctx.beginPath()
    ctx.moveTo(margin + radius, margin)
    ctx.lineTo(ctx.canvas.width - margin - radius, margin)
    ctx.quadraticCurveTo(ctx.canvas.width - margin, margin, ctx.canvas.width - margin, margin + radius)

    ctx.lineTo(ctx.canvas.width - margin, ctx.canvas.height - margin - radius)
    ctx.quadraticCurveTo(ctx.canvas.width - margin, ctx.canvas.height - margin, ctx.canvas.width - margin - radius, ctx.canvas.height - margin)
    ctx.lineTo(margin + radius, ctx.canvas.height - margin)
    ctx.quadraticCurveTo(margin, ctx.canvas.height - margin, margin, ctx.canvas.height - margin - radius)
    ctx.lineTo(margin, margin + radius)
    ctx.quadraticCurveTo(margin, margin, margin + radius, margin)
    // ctx.lineWidth = 0
    // ctx.shadowBlur = shadow.blur
    // ctx.shadowColor = shadow.color
    ctx.closePath()

    for (let i = 0; i < 10; i++) {
        ctx.shadowBlur += 1
        ctx.stroke()
    }
    ctx.clip()
    drawImage(ctx, image, margin)

    // ctx.shadowColor = 'rgba(0,0,0,0)';
    // ctx.lineWidth = 2
    ctx.restore()
}

export function drawImage(ctx: CanvasRenderingContext2D, img: ImageBitmap, margin: number) {
    const { width, height } = ctx.canvas
    ctx.drawImage(img, margin, margin, width - margin * 2, height - margin * 2)
}
