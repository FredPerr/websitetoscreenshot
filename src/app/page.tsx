'use client'

import React from 'react'
import Form, { FormDataType } from './form'
import { requestScreenshotImageSource as requestScreenshotImageSource } from '@/utils/ImageRequestResolver'
import Visualizer from './visualizer'
import Extractor from './extractor'


export default function Home() {

    const [requestParams, setRequestParams] = React.useState<FormDataType | undefined>()
    const [imageBitmap, setImageBitmap] = React.useState<ImageBitmap | undefined>()

    return (
        <div className='overflow-hidden w-full flex flex-col items-center pt-4 md:pt-8 lg:pt-16'>
        <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold">Website Screenshot Generator</h3>
            <Form onSubmit={(data) => {
                setRequestParams(data)
                requestScreenshotImageSource(data, setImageBitmap)
            }} />
            <Visualizer requestParams={requestParams} imageBitmap={imageBitmap} />
            <Extractor url={requestParams?.websiteUrl || 'undefined'} isVisualGenerated={requestParams !== undefined && imageBitmap !== undefined}/>
        </div>
    )
}
