export interface Frame {
    width: number
    height: number
    category: 'social' | 'device'
    name: string
    mobile?: boolean
}

export const FRAMES: { [key: string]: Frame } = {
    Desktop: {
        width: 1280,
        height: 720,
        category: 'device',
        name: 'Desktop',
    },
    iPhone14: {
        width: 390,
        height: 844,
        category: 'device',
        name: 'iPhone 14',
        mobile: true,
    },
    IPadPro11: {
        width: 834,
        height: 1194,
        category: 'device',
        name: 'iPad Pro 11"',
        mobile: true,
    },
    Monitor: {
        width: 1920,
        height: 1080,
        category: 'device',
        name: 'Monitor',
    },
    TwitterPost: {
        width: 1200,
        height: 675,
        category: 'social',
        name: 'Twitter Post',
    },
    TwitterHeader: {
        width: 1500,
        height: 500,
        category: 'social',
        name: 'Twitter Header',
    },
    InstagramPost: {
        width: 1080,
        height: 1080,
        category: 'social',
        name: 'Instagram Post',
        mobile: true,
    },
    InstagramStory: {
        width: 1080,
        height: 1920,
        category: 'social',
        name: 'Instagram Story',
        mobile: true,
    },
    DribbbleShot: {
        width: 800,
        height: 600,
        category: 'social',
        name: 'Dribbble Shot',
        mobile: true,
    },
}
