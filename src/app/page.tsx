'use client'

import Image from 'next/image'
import React from 'react'
import { toJpeg } from 'html-to-image'
import { resolveImageResponse } from '@/utils/ImageRequestResolver'


export default function Home() {
    const [image, setImage] = React.useState<undefined | string>(undefined)
    const [url, setURL] = React.useState<string | undefined>(undefined)

    const generateImageResult = async () => {

        const domEl = document.getElementById('image-root')
        if (!domEl)
            throw new Error('Could not find the image dom element')

        setURL(await toJpeg(domEl))
    }

    const generateScreenshot = async () => {

        const screenshotReq = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'https://www.fredericperron.ca',
                fullscreen: false,
                width: 1920,
                height: 1080,
            })
        });
        const imgURL = await resolveImageResponse(screenshotReq);
        setImage(imgURL);
        setTimeout(() => generateImageResult(), 1000) // see https://www.npmjs.com/package/html-to-image
    }



    return (
        <>
            <form>

                <input type="button" value="Generate screenshot" onClick={() => generateScreenshot()} />

            </form>
            <div id="image-root" className='p-10 bg-red-300'>
                {image &&
                    <Image src={image} alt="screenshot preview" width={1920} height={1080} />
                }
            </div>
            {url &&
                <a href={url}>Click to download result</a>
            }
        </>

    )
}
