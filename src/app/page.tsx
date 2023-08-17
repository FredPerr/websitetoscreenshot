'use client'

import React from 'react'
import ScreenshotForm from './ScreenshotForm'
import { PROCESS_TABS } from '@/constants/DOM'
import StylingContainer from './StylingContainer'
import CheckoutForm from './CheckoutForm'

export default function Home() {

    const [screenshotBitmap, setScreenshotBitmap] = React.useState<ImageBitmap | undefined>()

    return (
        <div className='flex flex-col mx-4 md:mx-12 lg:mx-20 items-center'>
            <h1 className='font-bold text-3xl md:text-5xl lg:text-6xl text-primary text-center my-5'>WebsiteToScreenshot.com</h1>
            <div className='w-full m-10 h-fit gap-y-10 flex flex-col items-center'>
                <div id={PROCESS_TABS.screenshot.carousel_item_id} className='w-full border-b'>
                    <ScreenshotForm screenshotBitmap={screenshotBitmap} setScreenshotBitmap={setScreenshotBitmap} />
                </div>
                <div id={PROCESS_TABS.styling.carousel_item_id} className='w-full border-b'>
                    <StylingContainer screenshotBitmap={screenshotBitmap} />
                </div>
                <div id={PROCESS_TABS.checkout.carousel_item_id} className='w-full border-b'>
                    <CheckoutForm screenshotBitmap={screenshotBitmap} />
                </div>
            </div>
        </div>
    )
}
