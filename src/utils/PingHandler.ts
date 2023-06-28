import { FormContextType } from '@/contexts/FormContext'

function validateURL(url: string) {
    try {
        const url_object = new URL(url)
        if (!url_object.protocol.startsWith('http')) return false
        return true
    } catch (e) {
        return false
    }
}

export const handleURLPing = async ({ setURL, setURLBarError, setURLBarState, url, urlBarError, urlBarState }: FormContextType) => {
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

    await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
        .then((response) => {
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
}
