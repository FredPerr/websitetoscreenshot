'use client'

import InfoIcon from '@/components/icons/InfoIcon'
import { Menu, MenuItem } from '@/components/menu'
import Switch from '@/components/switch/Switch'
import SwitchLabel from '@/components/switch/SwitchLabel'
import Tooltip from '@/components/tooltip/Tooltip'
import URLBar, { URLBarErrorType, URLBarStateType } from '@/components/urlbar'
import { FormContext } from '@/contexts/FormContext'
import { FRAMES, FrameType } from '@/contstants/Frames'
import React from 'react'

export default function Home() {
    const [url, setURL] = React.useState<string>('')
    const [urlBarState, setURLBarState] = React.useState<URLBarStateType>('idle')
    const [urlBarError, setURLBarError] = React.useState<URLBarErrorType | undefined>(undefined)
    const [scrollingFormat, setScrollingFormat] = React.useState(true)
    const [frame, setFrame] = React.useState<FrameType>(
        FRAMES.Desktop || {
            name: 'Desktop',
            width: 1920,
            height: 1080,
            category: 'device',
        }
    )
    return (
        <FormContext.Provider
            value={{
                url: url,
                setURL: setURL,

                urlBarState: urlBarState,
                setURLBarState: setURLBarState,

                urlBarError: urlBarError,
                setURLBarError: setURLBarError,
            }}
        >
            <main className="px-4 sm:px-8 md:px-20 lg:px-32 py-4 md:py-8 lg:py-20 flex flex-col items-center">
                <URLBar />
                <div className="flex justify-between my-5">
                    <div className="flex items-center gap-2">
                        <SwitchLabel unchecked="Static" checked="Scrolling" />
                        <Tooltip trigger={<InfoIcon />}>
                            <ul>
                                <li>
                                    <strong>Static (JPEG):</strong> A screenshot of the website
                                </li>
                                <li>
                                    <strong>Scrolling (GIF):</strong> A scrolling GIF of the website page
                                </li>
                            </ul>
                        </Tooltip>
                        <Switch checked={scrollingFormat} setChecked={setScrollingFormat} />
                    </div>
                    <Menu id="frame" text={frame.name}>
                        {Object.keys(FRAMES).map((frame_key: string) => {
                            const frame = FRAMES[frame_key]
                            if (!frame) throw new Error("Frame doesn't exist")
                            return (
                                <button
                                    key={frame_key}
                                    className="p-2 rounded-md flex text-gray-700 cursor-pointer whitespace-nowrap justify-between items-center gap-2 hover:bg-blue-100"
                                    onClick={(e) => {
                                        console.log(frame)
                                        setFrame(frame)
                                    }}
                                >
                                    {frame.name}{' '}
                                    <i className="text-gray-500 text-sm">
                                        {frame.width}x{frame.height}
                                    </i>
                                </button>
                            )
                        })}
                    </Menu>
                </div>
            </main>
        </FormContext.Provider>
    )
}
