import { test, expect } from '@playwright/test'
import { text } from 'stream/consumers'

test('Image API Endpoint', async ({ request }) => {
    const textRequest = await request.post('/api/image', {
        headers: {
            'content-type': 'text/plain',
        },
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

    const okRequest = await request.post('/api/image', {
        data: {
            url: 'https://google.com',
            fullscreen: false,
            width: 1920,
            height: 1080,
        },
    })

    expect(okRequest.status() === 200)
})
