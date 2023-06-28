export interface SketchParams {
    ctx: CanvasRenderingContext2D
    img: ImageBitmap
    frameCount?: number
    frameBorderWidth?: number
    theme?: any
}

export function drawBackground(ctx: CanvasRenderingContext2D, bgColor: string) {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export function drawRoundedImageBorders(ctx: CanvasRenderingContext2D, radius: number) {}

export function drawImage(ctx: CanvasRenderingContext2D, img: ImageBitmap, frameBorderWidth: number) {
    const { width, height } = ctx.canvas
    ctx.drawImage(img, frameBorderWidth, frameBorderWidth, width - frameBorderWidth * 2, height - frameBorderWidth * 2)
}
