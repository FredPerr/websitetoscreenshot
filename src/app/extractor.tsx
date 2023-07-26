import React from "react"
import { toPng } from "html-to-image"

export default function Extractor({ isVisualGenerated, url }: { isVisualGenerated?: boolean, url: string }) {


    const handleDownload = async () => {

        const visualEl = document.getElementById('visual')

        if (!visualEl)
            throw new Error("There is no available visual to extract/download")

        const visualData = await toPng(visualEl)

        const download = document.createElement('a')
        download.href = visualData
        download.download = new URL(url).hostname + '.png'
        download.click()
    }

    if (!isVisualGenerated)
        return <></>

    return (
        <div>
            <button onClick={() =>
                handleDownload()
            } className="btn btn-secondary my-8">Download result (png)</button>
        </div>
    )
} 
