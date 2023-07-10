import { test, expect } from '@playwright/test'

test('Image API Endpoint', async ({ request }) => {
    const textRequest = await request.post('/api/image', {
        headers: {
            'content-type': 'text/plain',
        },
        timeout: 5000,
    })

    expect(textRequest.status() === 400)
    expect(textRequest.statusText() === 'Invalid Content-Type, use JSON')

    const badJSONRequest = await request.post('/api/image', {
        headers: {
            'content-type': 'application/json',
        },
        data: `{\'test\":{invalidbodyhere},}""'test': {invalid body here`,
    })
    expect(badJSONRequest.status() === 400)
    expect(badJSONRequest.statusText() === 'Unable to parse JSON body in request')

    try {
        // returns blob screenshot
        const okRequest = await request.post('/api/image', {
            data: {
                url: 'https://google.com',
                fullscreen: false,
                width: 1920,
                height: 1080,
            },
        })
        expect(okRequest.status() === 200)
        expect(okRequest.headers()['content-type'] === 'application/octet-stream')
    } catch (e) {
        console.log(e)
    }
})
