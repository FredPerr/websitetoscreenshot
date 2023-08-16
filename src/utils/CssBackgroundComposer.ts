import { BackgroundType } from '@/constants/RequestForm'

export function compose(bgType: BackgroundType, color1: string, color2: string) {
    if (bgType === 'linear') return `linear-gradient(${color1}, ${color2})`

    if (bgType === 'radial') return `radial-gradient(${color1}, ${color2})`

    return color1
}
