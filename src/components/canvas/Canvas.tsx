import React from 'react';

interface CanvasProps {
    draw: (ctx:CanvasRenderingContext2D) => void
    width: number
    height: number
}

export default function Canvas({ draw, width, height }: CanvasProps) {
    const ref = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        if (!ref.current)
            throw new Error("Could not get the canvas DOM from reference")

        const ctx = ref.current.getContext('2d')
        if (!ctx)
            throw new Error("Could not get the context of the canvas element")

        draw(ctx)
    }, [draw, width, height])

    return (<canvas ref={ref} width={width} height={height} className="w-full h-full" />)
}
