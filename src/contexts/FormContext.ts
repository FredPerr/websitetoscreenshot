import { URLBarErrorType, URLBarStateType } from '@/components/urlbar'
import { createContext } from 'react'

export interface FormContextType {
    // URLBar

    url: string
    setURL: (url: string) => void

    urlBarState: URLBarStateType
    setURLBarState: (url: URLBarStateType) => void

    urlBarError: URLBarErrorType | undefined
    setURLBarError: (error: URLBarErrorType | undefined) => void
}

export const FormContext = createContext<FormContextType>({
    url: '',
    setURL: () => {},

    urlBarState: 'idle',
    setURLBarState: () => {},

    urlBarError: undefined,
    setURLBarError: () => {},
})
