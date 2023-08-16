'use client'

import { STYLING_CONTAINER_ID } from "@/constants/DOM"
import { toJpeg, toPng } from "html-to-image"
import React from "react"

type SupportedFileType = 'jpeg' | 'png'

interface CheckoutFormProps {
    url?: string
}

export default function CheckoutForm(props: CheckoutFormProps) {

    const [fileType, setFileType] = React.useState<SupportedFileType>('jpeg')
    const [isDownloading, setDownloading] = React.useState<boolean>(false)

    const handleDownload = async () => {
        setDownloading(true)
        const styling_container_el = document.getElementById(STYLING_CONTAINER_ID)

        if (!styling_container_el)
            throw new Error("Could not find styling container of step #2, you might want to try again.")


        const final_screenshot = fileType === 'jpeg' ? await toJpeg(styling_container_el) : await toPng(styling_container_el)
        const download_anchor = document.createElement('a')
        download_anchor.href = final_screenshot
        download_anchor.download = (props.url ? new URL(props.url).hostname : 'websitetoscreenshot') + `.${fileType}`
        download_anchor.click()
        setDownloading(false)
    }

    return (
        <div className="flex flex-col w-full item-center">
            <p className="text-green-600 text-center text-xl"><strong>WebsiteToScreenshot.com is free!</strong></p>
            <p className="text-center text-gray-700 text-lg">Would you be willing to share it with your network?</p>
            <form className="flex flex-col m-10 gap-6 items-center">
                <div>
                    <label className="label">File Type</label>
                    <div className="join">
                        <input checked={fileType === 'jpeg'} onChange={() => setFileType('jpeg')} className="join-item btn btn-sm" type="radio" name="fileType" aria-label="Jpeg" />
                        <input checked={fileType === 'png'} onChange={() => setFileType('png')} className="join-item btn btn-sm" type="radio" name="fileType" aria-label="Png" />
                    </div>
                </div>
                <button className="btn btn-primary my-4" onClick={handleDownload}>{isDownloading && <span className="loading loading-spinner text-primary"></span>}Download</button>
            </form>
        </div >
    )
}
