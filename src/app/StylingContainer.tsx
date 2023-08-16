'use client'
import ColorPicker from '@/components/ColorPicker'
import { STYLING_CANVAS_ID } from '@/constants/DOM'
import { STYLING_DEFAULTS } from '@/constants/RequestForm'
import React from 'react'
import { useForm } from 'react-hook-form'
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

    const [color1, setColor1] = React.useState(STYLING_DEFAULTS.background.color1)
    const [color2, setColor2] = React.useState(STYLING_DEFAULTS.background.color2)
    const [shadowColor, setShadowColor] = React.useState(STYLING_DEFAULTS.window.shadowColor)
    const [borderColor, setBorderColor] = React.useState(STYLING_DEFAULTS.window.borderColor)

    const { register, watch, formState: { errors }, getValues } = useForm<SchemaType>({
        defaultValues: {
            bgType: 'radial',
            bgColor1: '#9bbffa',
            bgColor2: '#72a6fc',
            shadowBlur: 10,
            shadowColor: 'rgba(180, 180, 180, 0.5)',
            borderWidth: 1,
            borderRadius: 5,
            margin: 40
        }
    })


    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type))
        return () => subscription.unsubscribe()
    }, [watch])

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
    }, [screenshotBitmap, watch])


    return (
        <div className='w-full flex flex-col items-center'>
            <form className='grid px-6 grid-cols-1 md:grid-cols-2 w-full gap-x-8 gap-y-3 justify-center items-center'>
                <div>
                    <label className='label'>Background Type</label>
                    <div className='join'>
                        <input {...register('bgType', { required: true })} className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Solid' />
                        <input {...register('bgType', { required: true })} className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Linear' />
                        <input {...register('bgType', { required: true })} className='join-item btn btn-sm' type='radio' name='backgroundType' aria-label='Radial' defaultChecked />
                    </div>
                </div>
                <div>
                    <label className='label'>Background Color 1</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={color1} setColor={setColor1} />
                        <input {...register("bgColor1", { required: true })} type='text' className='join-item input input-bordered' value={color1} onChange={(e) => setColor1(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Background Color 2</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={color2} setColor={setColor2}  />
                        <input {...register("bgColor2", { required: true })} type='text' className='join-item input input-bordered' value={color2} onChange={(e) => setColor2(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Shadow Color</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={shadowColor} setColor={setShadowColor} alpha />
                        <input {...register("shadowColor", { required: true })} type='text' className='join-item input input-bordered' value={shadowColor} onChange={(e) => setShadowColor(e.currentTarget.value)} />
                    </div>
                </div>
                <div>
                    <label className='label'>Shadow Blur</label>
                    <div className='flex items-center gap-2'>
                        <input {...register("shadowBlur", { required: true })} type='number' className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Radius</label>
                    <div className='flex items-center gap-2'>
                        <input {...register("borderRadius", { required: true })} type='number' className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Width</label>
                    <div className='flex items-center gap-2'>
                        <input {...register("borderWidth", { required: true })} type='number' className='join-item input input-bordered' />
                    </div>
                </div>
                <div>
                    <label className='label'>Border Color</label>
                    <div className='flex items-center gap-2'>
                        <ColorPicker color={borderColor} setColor={setBorderColor} />
                        <input {...register("borderColor", { required: true })} value={borderColor} onChange={(e) => setBorderColor(e.currentTarget.value)} type='text' className='join-item input input-bordered' />
                    </div>
                </div>

                <div>
                    <label className='label'>Window Margin</label>
                    <div className='flex items-center gap-2'>
                        <input {...register("margin", { required: true })} type='number' className='join-item input input-bordered' />
                    </div>
                </div>

            </form>
            <div className='overflow-x-scroll w-fit max-w-[100%] border border-black p-10'>
                {screenshotBitmap &&
                    <canvas id={STYLING_CANVAS_ID} width={screenshotBitmap.width} height={screenshotBitmap.height}
                        style={{
                            width: screenshotBitmap.width - 2 // here  
                        }} />
                }
            </div>
        </div>
    )
}
