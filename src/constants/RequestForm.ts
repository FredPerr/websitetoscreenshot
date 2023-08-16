const ENDPOINT_REQUEST = {
    url: '',
    width: 1440,
    height: 1080,
    fullscreen: false,
}

type BackgroundType = 'linear' | 'radial' | 'solid'

type StylingType = {
    background: {
        type: 'linear' | 'radial' | 'solid'
        color1: string
        color2: string
    }
    window: {
        shadowBlur: number
        shadowColor: string
        borderRadius: number
        borderWidth: number
        borderColor: string
        margin: number
    }
}

const STYLING_DEFAULTS: StylingType = {
    background: {
        type: 'radial',
        color1: '#DEF8FF',
        color2: '#F9BDFF',
    },
    window: {
        shadowBlur: 10,
        shadowColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        margin: 40,
    },
}

const URL_REGEX = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(\/[^?]+)?$/

const FORM_ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is requried',
    URL_PATTERN_MISMATCH: 'URL must match the pattern: https://www.abc.xyz/foo/bar and not have query parameters',
    MIN_MAX_VIEWPORT: `The width and height of the viewport must be between 400 and 4000`,
}

export { ENDPOINT_REQUEST, STYLING_DEFAULTS, URL_REGEX, FORM_ERROR_MESSAGES }
export type { StylingType, BackgroundType }
