'use client'

import { PRESETS, PresetKey } from "@/constants/Frame"
import { FORM_ERROR_MESSAGES, URL_REGEX } from "@/constants/RequestForm"
import { requestScreenshot } from "@/utils/ScreenshotRequestAPI"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

const Schema = z.object({
    url: z.string().url(),
    width: z.number().min(400).max(4000),
    height: z.number().min(400).max(4000)
})

type SchemaType = z.infer<typeof Schema>

interface ScreenshotFormProps {
    screenshotBitmap: ImageBitmap | undefined,
    setScreenshotBitmap: React.Dispatch<React.SetStateAction<ImageBitmap | undefined>>
}


export default function ScreenshotForm(props: ScreenshotFormProps) {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [viewportPreset, setViewportPreset] = React.useState<PresetKey>('desktop')
    const [width, setWidth] = React.useState<number>(PRESETS.desktop.width)
    const [height, setHeight] = React.useState<number>(PRESETS.desktop.height)

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<SchemaType>({
        defaultValues: {
            url: '',
            width: 1440,
            height: 1080
        }
    })

    const onSubmit: SubmitHandler<SchemaType> = async (data) => {

        const validation = Schema.safeParse(data)
        if (!validation.success)
            return

        const { url, width, height } = validation.data

        console.info('Sending the screenshot request... This may take up to 20 seconds')
        setError(undefined)
        setLoading(true)
        try {
            const image_bitmap = await requestScreenshot(url, width, height)
            props.setScreenshotBitmap(image_bitmap)
        } catch (e) {
            console.error("Could not get the screenshot of the provided url: " + e)
            setError("Could not screenshot the given URL: " + e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="grid px-6 grid-cols-1 md:grid-cols-3 w-full gap-x-8 gap-y-3 h-fit" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:col-span-3">
                <label className="label label-text">URL of the web page to screenshot</label>
                <input className="input input-bordered input-primary w-full input-md"
                    placeholder="https://example.com" type="url" autoComplete="off" about="URL of the web page to screenshot, must only be a simple url of the following pattern: http(s)://www.abc.xyz/something/"
                    aria-invalid={errors.url ? "true" : "false"}
                    {...register("url", {
                        required: true,
                        pattern: URL_REGEX
                    })} />
                <label className="label w-fit">
                    <span className="label-text-alt text-error">{errors.url?.type === 'required' && FORM_ERROR_MESSAGES.REQUIRED_FIELD}</span>
                    <span className="label-text-alt text-error">{errors.url?.type === 'pattern' && FORM_ERROR_MESSAGES.URL_PATTERN_MISMATCH}</span>
                </label>
            </div>

            <div>
                <label className="label label-text">Screenshot Dimension Preset</label>
                <select value={viewportPreset} onChange={(e) => { }} className="select select-bordered select-primary">
                    {Object.keys(PRESETS).map((preset_key) => {
                        const preset_key_cast = preset_key as PresetKey
                        const preset = PRESETS[preset_key_cast];
                        return <option onClick={() => {
                            setValue('width', preset.width)
                            setValue('height', preset.height)
                            setWidth(preset.width)
                            setHeight(preset.height)
                            setViewportPreset(preset_key_cast)
                        }} className="" value={preset_key} disabled={viewportPreset === preset_key_cast} key={preset_key}>{preset.name} ({preset.width}x{preset.height})</option>
                    })}
                </select>

            </div>

            <div>
                <label className="label label-text">Website screenshot viewport width (px)</label>
                <input className="input input-bordered input-primary w-20 text-center input-sm" type="text" pattern="\d{0,4}" {...register("width", { required: true, min: 400, max: 4000 })} placeholder="1440" value={width} onChange={(e) => { setWidth(Number(e.currentTarget.value)); }} /> px
                <label className="label w-fit">
                    <span className="label-text-alt text-error">{errors.width?.type === 'required' && FORM_ERROR_MESSAGES.REQUIRED_FIELD}</span>
                    <span className="label-text-alt text-error">{errors.width?.type === 'min' || errors.width?.type === 'max' && FORM_ERROR_MESSAGES.MIN_MAX_VIEWPORT}</span>
                </label>
            </div>

            <div>
                <label className="label label-text">Website screenshot viewport height (px)</label>
                <input className="input input-bordered input-primary w-20 text-center input-sm" type="text" pattern="\d{0,5}" {...register("height", { required: true, min: 400, max: 4000 })} placeholder="1080" value={height} onChange={(e) => { setHeight(Number(e.currentTarget.value)); }} /> px
                <label className="label w-fit">
                    <span className="label-text-alt text-error">{errors.height?.type === 'required' && FORM_ERROR_MESSAGES.REQUIRED_FIELD}</span>
                    <span className="label-text-alt text-error">{errors.height?.type === 'min' || errors.width?.type === 'max' && FORM_ERROR_MESSAGES.MIN_MAX_VIEWPORT}</span>
                </label>
            </div>

            <div className="md:col-span-3 w-full flex justify-center items-center flex-col">
                <button className="btn btn-primary btn-md" disabled={loading} type="submit">{loading && <span className="loading loading-spinner text-white"></span>}Take a screenshot</button>
                <label className="label w-fit">
                    {loading &&
                        <span className="label label-text-alt text-primary">This may take up to 20 seconds...</span>
                    }
                    <span className="label label-text-alt text-error">{error}</span>
                </label>
            </div>
        </form>
    )
}

