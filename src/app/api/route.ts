import { z } from 'zod'
import puppeteer from 'puppeteer'

const DataSchema = z.object({
    url: z.string().url(),
    fullscreen: z.boolean(),
    width: z.number().int().min(0).max(10000),
    height: z.number().int().min(0).max(10000),
    mobile: z.boolean().optional(),
})

export async function POST(request: Request) {
    const body = await request
        .json()
        .then((data) => data)
        .catch(() => new Response('Invalid JSON', { status: 400 }))

    if (body instanceof Response) return body

    const parsed = DataSchema.safeParse(body)

    if (!parsed.success) return new Response(parsed.error.toString(), { status: 400 })
    console.log('test')

    const { url, fullscreen, width, height, mobile } = parsed.data

    try {
        console.info('Starting to fetch ', url)
        const browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: {
                width,
                height,
                // deviceScaleFactor: 1,
                // isMobile: mobile
            },
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })

        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })
        const buff = await page.screenshot({
            fullPage: fullscreen,
            type: 'jpeg',
            quality: 100,
        })

        await browser.close()

        return new Response(buff, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            status: 200,
        })
    } catch (e) {
        console.warn('Fetched failed', e)
        return new Response('Error launching browser', { status: 500 })
    }
}
