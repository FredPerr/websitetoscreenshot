export function drawImage(img: CanvasImageSource, ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    ctx.drawImage(img, 0, 0, width, height)
}
