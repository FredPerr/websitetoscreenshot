'use client'

import { FormContext } from '@/contexts/FormContext'
import React from 'react'
import { URLBarErrors } from '.'
import URLBarStatusIcon from './URLBarStatusIcon'

function validateURL(url: string) {
    try {
        const url_object = new URL(url)
        if (!url_object.protocol.startsWith('http')) return false
        return true
    } catch (e) {
        return false
    }
}

export default function URLBar() {
    const { setURL, url, setURLBarError, setURLBarState, urlBarState, urlBarError } = React.useContext(FormContext)
    const [lastPingTriggeredTimestamp, setLastPingTriggeredTimestamp] = React.useState<number>(Date.now())

    const handleURLPing = async () => {
        if (urlBarState === 'loading' || urlBarState === 'success') return

        setURLBarState('loading')

        if (url === '') {
            setURLBarState('error')
            setURLBarError('emptyURL')
            return
        }

        if (!validateURL(url)) {
            setURLBarState('error')
            setURLBarError('invalidURL')
            return
        }

        setLastPingTriggeredTimestamp(Date.now())

        await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
            .then((response) => {
                console.log(response)
                if (response.status === 0) {
                    setURLBarState('success')
                    setURLBarError(undefined)
                } else {
                    setURLBarState('error')
                    setURLBarError('invalidResponse')
                }
            })
            .catch(() => {
                console.warn(`Could not fetch ${url}`)
                setURLBarState('error')
                setURLBarError('invalidResponse')
            })
            .finally(() => {
                const now = Date.now()
                console.info('Ping took', Math.round((now - lastPingTriggeredTimestamp) / 1000), 'ms')
            })
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
                    if (e.key === 'Enter') handleURLPing()
                }}
                name="url"
                onBlur={handleURLPing}
                className="outline-none h-12 w-full rounded-tr-md rounded-br-md p-3"
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
