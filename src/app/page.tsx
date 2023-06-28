'use client'

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
    const [fullscreen, setFullscreen] = React.useState(false)

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
                <div className="flex w-full my-5 justify-between">
                    <label className="label cursor-pointer gap-3 flex">
                        <div>Scrolling animation:</div>
                        <input type="checkbox" className="toggle toggle-info" checked={scrollingFormat} onChange={() => setScrollingFormat(!scrollingFormat)} />
                        <span className="label-text gap-2 flex items-center">
                            <div className="tooltip" data-tip="Scrolling (ON), creates a GIF of the web page scrolling. Static (OFF), creates a JPEG of the web page.">
                                <button className="btn btn-circle btn-xs btn-ghost text-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </span>
                    </label>
                    <label className="label cursor-pointer gap-3 flex">
                        <div>Full-screen screenshot:</div>
                        <input type="checkbox" disabled={scrollingFormat} className="toggle toggle-info" checked={fullscreen || scrollingFormat} onChange={() => setFullscreen(!fullscreen)} />
                        <span className="label-text gap-2 flex items-center">
                            <div className="tooltip" data-tip="Full-screen: Screenshot the complete web page / height (ON), or screenshot only the frame's height (OFF)">
                                <button className="btn btn-circle btn-xs btn-ghost text-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </span>
                    </label>
                    <div className="flex gap-3 items-center">
                        <label className="label-text">Frame:</label>
                        <div className="dropdown">
                            <label tabIndex={0} className="m-1 btn bg-blue-50">
                                {frame.name}{' '}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                {Object.keys(FRAMES).map((frame_key: string) => {
                                    const frame = FRAMES[frame_key]
                                    if (!frame) throw new Error("Frame doesn't exist")
                                    return (
                                        <li
                                            key={frame_key}
                                            onClick={(e) => {
                                                console.log(frame)
                                                setFrame(frame)
                                            }}
                                        >
                                            <div className="flex justify-between whitespace-nowrap">
                                                {frame.name}{' '}
                                                <i className="text-gray-500 text-sm">
                                                    {frame.width}x{frame.height}
                                                </i>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <label className="label-text">Theme:</label>
                        <details className="dropdown">
                            <summary className="m-1 btn bg-blue-50">
                                Light (Default)
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                </svg>
                            </summary>
                            <div className="dropdown-content z-[1] card card-compact p-2 shadow">
                                <div className="card-body">
                                    <h4 className="card-title text-sm whitespace-nowrap">Theme Customization</h4>
                                    {/* Add here */}
                                    {/* Add close button */}
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            </main>
        </FormContext.Provider>
    )
}
