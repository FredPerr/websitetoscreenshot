const PRESETS = {
    iphone14: {
        name: 'Iphone 14',
        width: 390,
        height: 844,
    },
    iphone14proxmax: {
        name: 'Iphone 14 Pro Max',
        width: 430,
        height: 932,
    },
    ipadpro12_9: {
        name: 'Ipad Pro 12.9"',
        width: 1024,
        height: 1366,
    },
    macbookairpro16: {
        name: 'MacBook Air Pro 16',
        width: 1728,
        height: 1117,
    },
    macbookair: {
        name: 'MacBook Air',
        width: 1280,
        height: 832,
    },
    desktop: {
        name: 'Desktop',
        width: 1440,
        height: 1024,
    },
    slide: {
        name: 'Slide',
        width: 1920,
        height: 1080,
    },
    twitterpost: {
        name: 'Twitter Post',
        width: 1200,
        height: 675,
    },
    twitterheader: {
        name: 'Twitter Header',
        width: 1500,
        height: 500,
    },
    facebookpost: {
        name: 'Facebook Post',
        width: 1200,
        height: 630,
    },
    facebookcover: {
        name: 'Facebook Cover',
        width: 820,
        height: 312,
    },
    instagrampost: {
        name: 'Instagram Post',
        width: 1080,
        height: 1080,
    },
    instagramstory: {
        name: 'Instagram Story',
        width: 1080,
        height: 1920,
    },
    linkedincover: {
        name: 'LinkedIn Cover',
        width: 1534,
        height: 396,
    },
    dribbleshothd: {
        name: 'Dribble Shot HD',
        width: 800,
        height: 600,
    },
}

type PresetKey = keyof typeof PRESETS

export type { PresetKey }
export { PRESETS }
