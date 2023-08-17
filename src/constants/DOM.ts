const STYLING_CANVAS_ID = 'styling-canvas'
const STYLING_CONTAINER_ID = 'styling-container'

type ProcessTabType = {
    name: string
    carousel_item_id: string
}

type ProcessTabsType = {
    screenshot: ProcessTabType
    styling: ProcessTabType
    checkout: ProcessTabType
}

const PROCESS_TABS: ProcessTabsType = {
    screenshot: {
        name: '1. Screenshot',
        carousel_item_id: 'screenshot-carousel-item',
    },
    styling: {
        name: '2. Styling',
        carousel_item_id: 'styling-carousel-item',
    },
    checkout: {
        name: '3. Checkout',
        carousel_item_id: 'checkout-carousel-item',
    },
}

export { STYLING_CANVAS_ID, STYLING_CONTAINER_ID, PROCESS_TABS }
