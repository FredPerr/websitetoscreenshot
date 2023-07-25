'use client'

import React from "react"

const FORM_DEFAULTS = {
    WEBSITE_URL: 'https://fredericperron.ca/en',
    VIEWPORT_WIDTH: 720,
    VIEWPORT_HEIGHT: 480,
    WINDOW_BORDER_RADIUS: 5,
    WINDOW_BORDER_WIDTH: 1,
    WINDOW_BORDER_COLOR: 'black',
    WINDOW_MARGIN: 40,
    BACKGROUND_COLOR_1: '#DEF8FF',
    BACKGROUND_COLOR_2: '#F9BDFF',
    BACKGROUND_TYPE: 'gradient-linear'
}

interface FormProps {
    onSubmit: (data: {
        websiteUrl: string
        viewportWidth: number,
        viewportHeight: number,
        windowBorderRadius: number,
        windowBorderWidth: number,
        windowBorderColor: string,
        backgroundColor1: string,
        backgroundColor2: string,
        backgroundType: string
    }) => void
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
    const [backgroundType, setBackgroundType] = React.useState(FORM_DEFAULTS.BACKGROUND_TYPE)


    return (
        <form id="frame-form">
            <label htmlFor="url">Website URL</label>
            <input name="url" type="url" placeholder="Enter the URL of the website to screenshot" value={websiteUrl} defaultValue={FORM_DEFAULTS.WEBSITE_URL} onChange={(e) => setWebsiteUrl(e.currentTarget.value)} />

            <br />

            <label htmlFor="viewport-width">Screenshot Viewport Width</label>
            <input name="viewport-width" type="number" value={viewportWidth} placeholder='Width of the final image file and website viewport width used' defaultValue={FORM_DEFAULTS.VIEWPORT_WIDTH} onChange={(e) => setViewportWidth(Number(e.currentTarget.value))} />

            <br />

            <label htmlFor="viewport-height">Screenshot Viewport Height</label>
            <input name="viewport-height" type="number" value={viewportHeight} placeholder='Height of the final image file and website viewport height used' defaultValue={FORM_DEFAULTS.VIEWPORT_HEIGHT} onChange={(e) => setViewportHeight(Number(e.currentTarget.value))} />

            <br />

            <label htmlFor="window-border-radius">Window Border Radius</label>
            <input name="window-border-radius" type="number" value={windowBorderRadius} defaultValue={FORM_DEFAULTS.WINDOW_BORDER_RADIUS} onChange={(e) => setWindowBorderRadius(Number(e.currentTarget.value))} />

            <br />

            <label htmlFor="window-border-width">Window Border Width</label>
            <input name="window-border-width" type="number" value={windowBorderWidth} defaultValue={FORM_DEFAULTS.WINDOW_BORDER_WIDTH} onChange={(e) => setWindowBorderWidth(Number(e.currentTarget.value))} />

            <br />

            <label htmlFor="window-border-color">Window Border Color</label>
            <input name="window-border-color" type="color" defaultValue={FORM_DEFAULTS.WINDOW_BORDER_COLOR} value={windowBorderColor} onChange={(e) => setWindowBorderColor(e.currentTarget.value)} />

            <br />

            <label htmlFor="window-margin">Window Margin</label>
            <input name="contour-width" type="number" defaultValue={FORM_DEFAULTS.WINDOW_MARGIN} value={windowMargin} onChange={(e) => setWindowMargin(Number(e.currentTarget.value))} />

            <br />

            <label>Background Type</label>
            <select defaultValue={FORM_DEFAULTS.BACKGROUND_TYPE} name="background-type" value={backgroundType} onChange={(e) => setBackgroundType(e.currentTarget.value)}>
                <option value="solid">Solid</option>
                <option value="gradient-radial">Radial Gradient</option>
                <option value="gradient-linear">Linear Gradient</option>
            </select>

            <br />

            <label htmlFor="background-color-1">Background Color 1</label>
            <input name="background-color-1" type="color" defaultValue={FORM_DEFAULTS.BACKGROUND_COLOR_1} value={backgroundColor1} onChange={(e) => setBackgroundColor1(e.currentTarget.value)} />

            <br />

            <label htmlFor="background-color-2">Background Color 2</label>
            <input name="background-color-2" type="color" defaultValue={FORM_DEFAULTS.BACKGROUND_COLOR_2} value={backgroundColor2} onChange={(e) => setBackgroundColor2(e.currentTarget.value)} />

            <br />

            <button type="button" onClick={() => props.onSubmit({
                websiteUrl,
                viewportHeight,
                viewportWidth,
                windowBorderRadius,
                windowBorderWidth,
                windowBorderColor,
                backgroundColor1,
                backgroundColor2,
                backgroundType
            })}>Generate Screenshot</button>
        </form>
    )
}
