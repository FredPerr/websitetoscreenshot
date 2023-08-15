export async function requestScreenshot(url: string, width: number, height: number) {
    const endpoint = process.env.NEXT_PUBLIC_SCREENSHOT_API_URL
    if (!endpoint) throw new Error('No NEXT_PUBLIC_SCREENSHOT_API_URL env variable specified')

    const request_url = endpoint + (endpoint.endsWith('/') ? '' : '/') + `?url=${url}&width=${width}&height=${height}&fullscreen=${false}`

    const request = await fetch(request_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            Accept: '*/*',
        },
    })

    if (!request.ok) {
        console.error(request.statusText)
        throw new Error('An error occured while sending the Screenshot API request: ' + request.statusText)
    }

    const base64_string = await request.text()
    const buffer = Buffer.from(base64_string, 'base64')
    const blob = new Blob([buffer])
    return await createImageBitmap(blob)
}
