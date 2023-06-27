'use client'

import URLBar, { URLBarErrorType, URLBarStateType } from '@/components/urlbar'
import { FormContext } from '@/contexts/FormContext'
import React from 'react'

export default function Home() {
    const [url, setURL] = React.useState<string>('')
    const [urlBarState, setURLBarState] = React.useState<URLBarStateType>('idle')
    const [urlBarError, setURLBarError] = React.useState<URLBarErrorType | undefined>(undefined)
    return (
        <FormContext.Provider
            value={{
                url: url,
                setURL: setURL, 

                urlBarState: urlBarState,
                setURLBarState: setURLBarState, 

                urlBarError: urlBarError,
                setURLBarError: setURLBarError 
            }}
        >
            <main className="px-4 sm:px-8 md:px-20 lg:px-32 py-4 md:py-8 lg:py-20 flex flex-col items-center bg-blue-50">
                <URLBar />
            </main>
        </FormContext.Provider>
    )
}
