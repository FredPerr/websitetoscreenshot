export async function resolveImageResponse(response: Response) {
    if (!response.ok) {
        console.warn('Could not use the image response: ' + response.statusText)
        return
    }

    try {
        const blob = await response.blob()
        return URL.createObjectURL(blob)
    } catch (e) {
        console.error(e)
        return
    }
}
