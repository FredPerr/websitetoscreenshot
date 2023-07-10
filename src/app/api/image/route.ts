import { z } from 'zod'
import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

const endpoint_params = z.object({
    url: z.string().url(),
    fullscreen: z.boolean(),
    width: z.number().int().min(0).max(10000),
    height: z.number().int().min(0).max(10000),
})

const JSON_UNPARSABLE = NextResponse.json('Unable to parse JSON body in request', { status: 400 })

// Screenshot part of or the entire page of a website using given width and height.
export async function POST(request: Request) {
    if (request.headers.get('content-type') !== 'application/json') return NextResponse.json('Invalid Content-Type, use JSON', { status: 400 })

    let data: z.infer<typeof endpoint_params> | undefined
    try {
        const json = await request.json()
        const parsed_json = endpoint_params.safeParse(json)
        if (parsed_json.success) data = parsed_json.data
        else return JSON_UNPARSABLE
    } catch (e) {
        return JSON_UNPARSABLE
    }

    if (!data) return JSON_UNPARSABLE

    const { url, fullscreen, width, height } = data

    // TODO: ping the url here

    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {
            width,
            height,
        },
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
        ignoreHTTPSErrors: true,
        timeout: 10000,
    })

    try {
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })
        const screenshot = await page.screenshot({ type: 'jpeg', quality: 100, fullPage: fullscreen })
        await browser.close()
        return new Response(screenshot, {
            status: 200,
            headers: {
                'content-type': 'application/octet-stream',
            },
        })
    } catch (e) {
        return NextResponse.json('Could not screenshot the website', { status: 500 })
    } finally {
        if (browser.isConnected()) await browser.close()
    }
}
