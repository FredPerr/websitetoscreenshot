'use client'

import { FormContext } from '@/contexts/FormContext'
import React from 'react'
import { handleURLPing } from '@/utils/PingHandler'
import URLBarStatusIcon from './URLBarStatusIcon'
import { URLBarErrors } from '.'

export default function URLBar() {
    const { setURL, url, setURLBarError, setURLBarState, urlBarState, urlBarError } = React.useContext(FormContext)

    const handlePing = () => {
        handleURLPing({ setURL, setURLBarError, setURLBarState, url, urlBarError, urlBarState })
    }

    return (
        <div className="flex w-full relative">
            <button disabled={urlBarState !== 'idle'} className="w-12 h-12 bg-slate-500 text-white rounded-tl-md rounded-bl-md flex justify-center items-center outline-none">
                <URLBarStatusIcon />
            </button>
            <input
                value={url}
                onChange={(e) => {
                    setURL(e.currentTarget.value)
                    setURLBarState('idle')
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePing()
                }}
                name="url"
                onBlur={() => handlePing()}
                className="outline-none h-12 w-full rounded-tr-md rounded-br-md p-3 bg-blue-50"
                type="url"
                placeholder="Enter the website's full URL"
                autoComplete="off"
                autoCapitalize="false"
            />
            {urlBarState === 'error' && urlBarError && (
                <label htmlFor="url" data-testid="urlbar-error-label" className="absolute left-12 -bottom-6 text-red-500 text-sm">
                    &#9888; {URLBarErrors[urlBarError]}
                </label>
            )}
        </div>
    )
}
