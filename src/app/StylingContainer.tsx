'use client'
import ColorPicker from '@/components/ColorPicker'
import { PROCESS_TABS, STYLING_CANVAS_ID, STYLING_CONTAINER_ID } from '@/constants/DOM'
import { STYLING_DEFAULTS } from '@/constants/RequestForm'
import { compose } from '@/utils/CssBackgroundComposer'
import React from 'react'
import { z } from 'zod'

interface StylingContainerProps {
    screenshotBitmap: ImageBitmap | undefined
}

const Schema = z.object({
    bgType: z.enum(['solid', 'linear', 'radial']),
    bgColor1: z.string(),
    bgColor2: z.string(),
    shadowBlur: z.number().positive().max(300),
    shadowColor: z.string(),
    borderRadius: z.number().positive(),
    borderWidth: z.number().positive(),
    borderColor: z.string(),
    margin: z.number().positive()
})

type SchemaType = z.infer<typeof Schema>

export default function StylingContainer({ screenshotBitmap }: StylingContainerProps) {

    const [bgType, setBgType] = React.useState(STYLING_DEFAULTS.background.type)
    const [color1, setColor1] = React.useState(STYLING_DEFAULTS.background.color1)
    const [color2, setColor2] = React.useState(STYLING_DEFAULTS.background.color2)
    const [shadowColor, setShadowColor] = React.useState(STYLING_DEFAULTS.window.shadowColor)
    const [borderColor, setBorderColor] = React.useState(STYLING_DEFAULTS.window.borderColor)
    const [borderRadius, setBorderRadius] = React.useState(STYLING_DEFAULTS.window.borderRadius)
    const [borderWidth, setBorderWidth] = React.useState(STYLING_DEFAULTS.window.borderWidth)
    const [margin, setMargin] = React.useState(STYLING_DEFAULTS.window.margin)
    const [shadowBlur, setShadowBlur] = React.useState(STYLING_DEFAULTS.window.shadowBlur)

    React.useEffect(() => {

        if (!screenshotBitmap)
            return

        const canvas = document.getElementById(STYLING_CANVAS_ID) as HTMLCanvasElement | null

        if (!canvas)
            throw new Error("Could not load the canvas for screenshot preview")

        const ctx = canvas.getContext('2d')
        if (!ctx)
            throw new Error("Could not load the context of the screenshot preview canvas")

        ctx.drawImage(screenshotBitmap, 0, 0, screenshotBitmap.width, screenshotBitmap.height)
    }, [screenshotBitmap])


    return (
        <div className='w-full flex flex-col items-center'>
            <form className='grid px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-x-8 gap-y-3 justify-center items-center'>
                <div>
                    <label className='label'>Background Type</label>
                    <div className='join'>
                        <input className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Solid' checked={bgType === 'solid'} onChange={() => setBgType('solid')} />
                        <input className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Linear' checked={bgType === 'linear'} onChange={() => setBgType('linear')} />
                        <input className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Radial' checked={bgType === 'radial'} onChange={() => setBgType('radial')} />
                    </div>
                </div>
                <div>
                    <label className='label'>Background Color 1</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={color1} setColor={setColor1} />
                        <input type='text' className='join-item input input-bordered' value={color1} onChange={(e) => setColor1(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Background Color 2</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={color2} setColor={setColor2} />
                        <input type='text' className='join-item input input-bordered' value={color2} onChange={(e) => setColor2(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Shadow Color</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={shadowColor} setColor={setShadowColor} alpha />
                        <input type='text' className='join-item input input-bordered' value={shadowColor} onChange={(e) => setShadowColor(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Shadow Blur</label>
                    <div className='flex items-center gap-2'>
                        <input type='number' min={0} value={shadowBlur} onChange={(e) => { try { setBorderRadius(Number(e.currentTarget.value)) } catch { } }} className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Radius</label>
                    <div className='flex items-center gap-2'>
                        <input type='number' min={0} value={borderRadius} onChange={(e) => { try { setBorderRadius(Number(e.currentTarget.value)) } catch { } }} className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Width</label>
                    <div className='flex items-center gap-2'>
                        <input type='number' min={0} max={Math.min(screenshotBitmap?.width || 1000, screenshotBitmap?.height || 1000) / 2} value={borderWidth} onChange={(e) => { try { setBorderWidth(Number(e.currentTarget.value)) } catch { } }} className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Color</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={borderColor} setColor={setBorderColor} />
                        <input value={borderColor} onChange={(e) => setBorderColor(e.currentTarget.value)} type='text' className='join-item input input-bordered' />
                    </div>
                </div>

                <div>
                    <label className='label'>Window Margin</label>
                    <div className='flex items-center gap-2'>
                        <input type='number' min={0} max={Math.min(screenshotBitmap?.width || 1000, screenshotBitmap?.height || 1000) / 2} value={margin} onChange={(e) => { try { setMargin(Number(e.currentTarget.value)) } catch { } }} className='join-item input input-bordered' />
                    </div>
                </div>

            </form>
            {screenshotBitmap &&
                <div className='indicator max-w-full w-full snap-center overflow-scroll my-10'>
                    <span className='indicator-item cursor-default badge badge-primary'>{screenshotBitmap.width}x{screenshotBitmap.height}</span>
                    <div id={STYLING_CONTAINER_ID} className='border border-gray-300 p-10 flex justify-center items-center' style={{
                        background: compose(bgType, color1, color2),
                        width: screenshotBitmap.width,
                        height: screenshotBitmap.height
                    }}>
                        <canvas id={STYLING_CANVAS_ID} width={screenshotBitmap.width} height={screenshotBitmap.height}
                            style={{
                                width: screenshotBitmap.width - 2 * (margin + borderWidth),
                                height: screenshotBitmap.height - 2 * (margin + borderWidth),
                                borderRadius: borderRadius,
                                borderWidth: borderWidth,
                                borderColor: borderColor,
                                boxShadow: `0 0 ${shadowBlur}px ${shadowColor}`
                            }} />
                    </div>
                </div>
            }
            <a className='btn btn-accent' href={`#${PROCESS_TABS.checkout.carousel_item_id}`}>Proceed to checkout</a>
        </div>
    )
}
