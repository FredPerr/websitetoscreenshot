import { FormDataType } from '@/app/form'

export async function requestScreenshotImageSource(data: FormDataType, stateDispatcher: React.Dispatch<React.SetStateAction<ImageBitmap | undefined>>) {
    const endpoint = process.env.NEXT_PUBLIC_SCREENSHOT_API_URL

    if (!endpoint) throw new Error('No NEXT_PUBLIC_SCREENSHOT_API_URL env variable specified')

    const params = `?url=${data.websiteUrl}&width=${data.viewportWidth}&height=${data.viewportHeight}&fullscreen=${false}`

    try {
        const screenshot_request = await fetch(endpoint + params, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                Accept: '*/*',
            },
        })
        if (!screenshot_request.ok) {
            console.error(screenshot_request.statusText)
            return
        }
        const str_response = await screenshot_request.text()
        const buffer = Buffer.from(str_response, 'base64')
        const blob = new Blob([buffer])
        stateDispatcher(await createImageBitmap(blob))
    } catch (e) {
        console.error(e)
    }
}
