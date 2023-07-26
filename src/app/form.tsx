'use client'

import React from "react"

type BackgroundType = 'gradient-linear' | 'solid' | 'gradient-radial'

const FORM_DEFAULTS = {
    WEBSITE_URL: 'https://google.com',
    VIEWPORT_WIDTH: 1080,
    VIEWPORT_HEIGHT: 720,
    WINDOW_BORDER_RADIUS: 5,
    WINDOW_BORDER_WIDTH: 1,
    WINDOW_BORDER_COLOR: 'black',
    WINDOW_MARGIN: 40,
    BACKGROUND_COLOR_1: '#DEF8FF',
    BACKGROUND_COLOR_2: '#F9BDFF',
    BACKGROUND_TYPE: 'gradient-linear' as BackgroundType,
    WINDOW_SHADOW: 10
}


export interface FormDataType {
    websiteUrl: string
    viewportWidth: number,
    viewportHeight: number,
    windowBorderRadius: number,
    windowBorderWidth: number,
    windowBorderColor: string,
    windowMargin: number,
    backgroundColor1: string,
    backgroundColor2: string,
    backgroundType: BackgroundType,
    windowShadow: number
}

interface FormProps {
    onSubmit: (data: FormDataType
    ) => void
}

export default function Form(props: FormProps) {

    const [websiteUrl, setWebsiteUrl] = React.useState(FORM_DEFAULTS.WEBSITE_URL)
    const [viewportWidth, setViewportWidth] = React.useState(FORM_DEFAULTS.VIEWPORT_WIDTH)
    const [viewportHeight, setViewportHeight] = React.useState(FORM_DEFAULTS.VIEWPORT_HEIGHT)
    const [windowBorderRadius, setWindowBorderRadius] = React.useState(FORM_DEFAULTS.WINDOW_BORDER_RADIUS)
    const [windowBorderWidth, setWindowBorderWidth] = React.useState(FORM_DEFAULTS.WINDOW_BORDER_WIDTH)
    const [windowBorderColor, setWindowBorderColor] = React.useState(FORM_DEFAULTS.WINDOW_BORDER_COLOR)
    const [windowMargin, setWindowMargin] = React.useState(FORM_DEFAULTS.WINDOW_MARGIN)

    const [backgroundColor1, setBackgroundColor1] = React.useState(FORM_DEFAULTS.BACKGROUND_COLOR_1)
    const [backgroundColor2, setBackgroundColor2] = React.useState(FORM_DEFAULTS.BACKGROUND_COLOR_2)
    const [backgroundType, setBackgroundType] = React.useState<'gradient-linear' | 'solid' | 'gradient-radial'>(FORM_DEFAULTS.BACKGROUND_TYPE)

    const [windowShadow, setWindowShadow] = React.useState(FORM_DEFAULTS.WINDOW_SHADOW)


    return (
        <>
            <form id="frame-form" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
                <div>
                    <label htmlFor="url" className="label label-text">Website URL</label>
                    <input className="input input-bordered" name="url" type="url" placeholder="Enter the URL of the website to screenshot" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.currentTarget.value)} />
                </div>

                <br />

                <div>
                    <label htmlFor="viewport-width" className="label label-text" >Screenshot Viewport Width</label>
                    <input className="input input-bordered" name="viewport-width" type="number" value={viewportWidth} placeholder='Width of the final image file and website viewport width used' onChange={(e) => setViewportWidth(Number(e.currentTarget.value))} />
                </div>
                <br />

                <div>
                    <label htmlFor="viewport-height" className="label label-text" >Screenshot Viewport Height</label>
                    <input className="input input-bordered" name="viewport-height" type="number" value={viewportHeight} placeholder='Height of the final image file and website viewport height used' onChange={(e) => setViewportHeight(Number(e.currentTarget.value))} />

                </div>
                <br />

                <div>
                    <label htmlFor="window-border-radius" className="label label-text" >Window Border Radius</label>
                    <input className="input input-bordered" name="window-border-radius" type="number" value={windowBorderRadius} onChange={(e) => setWindowBorderRadius(Number(e.currentTarget.value))} />
                </div>

                <br />

                <div>
                    <label className="label label-text" htmlFor="window-border-width">Window Border Width</label>
                    <input className="input input-bordered" name="window-border-width" type="number" value={windowBorderWidth} onChange={(e) => setWindowBorderWidth(Number(e.currentTarget.value))} />

                </div>
                <br />

                <div>
                    <label className="label label-text" htmlFor="window-border-color">Window Border Color</label>
                    <input className="input input-bordered" name="window-border-color" type="color" value={windowBorderColor} onChange={(e) => setWindowBorderColor(e.currentTarget.value)} />

                </div>
                <br />

                <div>
                    <label className="label label-text" htmlFor="window-margin">Window Margin</label>
                    <input className="input input-bordered" name="contour-width" type="number" value={windowMargin} onChange={(e) => setWindowMargin(Number(e.currentTarget.value))} />

                </div>
                <br />


                <div>
                    <label className="label label-text" htmlFor="window-shadow">Window Shadow</label>
                    <input className="input input-bordered" name="window-shadow" type="number" value={windowShadow} onChange={(e) => setWindowShadow(Number(e.currentTarget.value))} />

                </div>
                <br />

                <div>
                    <label htmlFor="background-type" className="label label-text" >Background Type</label>
                    <select className="select select-bordered" name="background-type" value={backgroundType} onChange={(e) => setBackgroundType(e.currentTarget.value as BackgroundType)}>
                        <option value="solid">Solid</option>
                        <option value="gradient-radial">Radial Gradient</option>
                        <option value="gradient-linear">Linear Gradient</option>
                    </select>
                </div>

                <br />

                <div>
                    <label htmlFor="background-color-1" className="label label-text" >Background Color 1</label>
                    <input className="input input-bordered" name="background-color-1" type="color" value={backgroundColor1} onChange={(e) => setBackgroundColor1(e.currentTarget.value)} />

                </div>
                <br />

                <div>
                    <label htmlFor="background-color-2" className="label label-text" >Background Color 2</label>
                    <input className="input input-bordered" name="background-color-2" type="color" value={backgroundColor2} onChange={(e) => setBackgroundColor2(e.currentTarget.value)} />

                </div>
                <br />

            </form>
            <button type="button" onClick={() => props.onSubmit({
                websiteUrl,
                viewportHeight,
                viewportWidth,
                windowBorderRadius,
                windowBorderWidth,
                windowBorderColor,
                windowMargin,
                backgroundColor1,
                backgroundColor2,
                backgroundType,
                windowShadow
            })} className="btn btn-primary my-8">Generate Screenshot</button>
        </>
    )

}
