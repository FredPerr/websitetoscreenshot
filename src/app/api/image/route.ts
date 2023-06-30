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
    if (request.headers.get('content-type') !== 'application/json') NextResponse.json('Invalid Content-Type, use JSON', { status: 400 })

    let data: z.infer<typeof endpoint_params> | undefined
    try {
        const json = await request.json()
        const parsed_json = endpoint_params.safeParse(json)
        if (parsed_json.success) data = parsed_json.data
        else throw Error('Invalid JSON data')
    } catch (e) {
        console.error(e)
        return JSON_UNPARSABLE
    }

    if (!data) return JSON_UNPARSABLE

    const { url, fullscreen, width, height } = data

    const url_test = await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
        .then((res) => {
            console.log(res)
            return res.ok
        })
        .catch((e) => {
            console.error(e)
            return false
        })

    if (!url_test) return NextResponse.json(`Unable to fetch URL {url}`, { status: 400 })

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
        page.goto(url)

        return NextResponse.json('OK', { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json('Internal Server Error', { status: 500 })
    } finally {
        await browser.close()
    }
}
