export type Theme = {
    margin: number
    border: {
        radius: number
    }
    shadow: {
        color: string
        blur: number
    }
    bgColor: string
}

export const ThemeLight: Theme = {
    margin: 60,
    border: {
        radius: 30,
    },
    shadow: {
        color: 'rgba(0,0,0,0.5)',
        blur: 10,
    },
    bgColor: '#a8b5c0',
}
