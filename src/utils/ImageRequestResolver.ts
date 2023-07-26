import { FormDataType } from '@/app/form'

export async function requestScreenshotImageSource(data: FormDataType, stateDispatcher: React.Dispatch<React.SetStateAction<ImageBitmap | undefined>>) {
    try {
        const screenshot_request = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: data.websiteUrl,
                fullscreen: false, // Implement later on.
                width: data.viewportWidth,
                height: data.viewportHeight,
            }),
        })

        if (!screenshot_request.ok) {
            console.error(screenshot_request.statusText)
            return
        }

        const blob = await screenshot_request.blob()
        stateDispatcher(await createImageBitmap(blob))
    } catch (e) {
        console.error(e)
    }
}
