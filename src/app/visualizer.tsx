import React from 'react'
import { FormDataType } from "../app/form"

interface VisualizerProps {
    requestParams?: FormDataType,
    imageBitmap?: ImageBitmap
}

export default function Visualizer({ requestParams, imageBitmap }: VisualizerProps) {

    React.useEffect(() => {
        const canvas = document.getElementById("window-frame") as HTMLCanvasElement | null

        if (!requestParams || !imageBitmap)
            return

        if (!canvas)
            throw new Error("Could not get the canvas DOM from element")

        const ctx = canvas.getContext('2d')
        if (!ctx)
            throw new Error("Could not get the context of the canvas element")


        ctx.drawImage(imageBitmap, 0, 0, requestParams.viewportWidth, requestParams.viewportHeight)

    }, [requestParams, imageBitmap])

    if (!requestParams || !imageBitmap)
        return <p>Make the screenshot request first to visualize the result</p>

    return (<div className='overflow-x-scroll w-fit max-w-[100%] border border-black p-10'>
        <div id="visual" className="flex overflow-x-scroll justify-center align-center w-fit" style={{

            background: requestParams.backgroundType === 'solid' ? requestParams.backgroundColor1 :
                `${requestParams.backgroundType === 'gradient-linear' ? 'linear-gradient' : 'radial-gradient'}(${requestParams.backgroundColor1}, ${requestParams.backgroundColor2})`,
            padding: requestParams.windowMargin
        }}>
            <canvas id="window-frame" width={requestParams.viewportWidth} height={requestParams.viewportHeight} style={{
                width: requestParams.viewportWidth - 2 * requestParams.windowMargin - 2 * requestParams.windowBorderWidth,
                height: requestParams.viewportHeight - 2 * requestParams.windowMargin - 2 * requestParams.windowBorderWidth,
                border: '1px solid black',
                borderRadius: requestParams.windowBorderRadius,
                borderColor: requestParams.windowBorderColor,
                borderWidth: requestParams.windowBorderWidth,
                boxShadow: `0px 0px ${requestParams.windowShadow}px #000000`
            }} />
        </div></div>)
}
