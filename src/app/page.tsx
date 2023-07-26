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
        <div>
            <Form onSubmit={(data) => {
                setRequestParams(data)
                requestScreenshotImageSource(data, setImageBitmap)
            }} />
            <Visualizer requestParams={requestParams} imageBitmap={imageBitmap} />
            <Extractor url={requestParams?.websiteUrl || 'undefined'} isVisualGenerated={requestParams !== undefined && imageBitmap !== undefined}/>
        </div>
    )
}
