import { FormContext } from '@/contexts/FormContext'
import { motion } from 'framer-motion'
import React from 'react'

const URLBarStatusIconVariants = {
    idle: {
        d: 'M24.2772 13.2679C25.6105 14.0377 25.6105 15.9623 24.2772 16.7321L11.8615 23.9003C10.5281 24.6701 8.86146 23.7078 8.86146 22.1682L8.86147 7.8318C8.86147 6.2922 10.5281 5.32994 11.8615 6.09974L24.2772 13.2679Z)',
        fill: '#a0debb',
    },
    loading: {
        d: 'M6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5H21.5C22.6046 6.5 23.5 7.39543 23.5 8.5V21.5C23.5 22.6046 22.6046 23.5 21.5 23.5H8.5C7.39543 23.5 6.5 22.6046 6.5 21.5V8.5Z',
        fill: '#a0d7de',
    },
    success: {
        d: 'M23.5 15C23.5 19.6944 19.6944 23.5 15 23.5C10.3056 23.5 6.5 19.6944 6.5 15C6.5 10.3056 10.3056 6.5 15 6.5C19.6944 6.5 23.5 10.3056 23.5 15Z',
        fill: '#a0debb',
    },
    error: {
        d: 'M13.2679 6.78956C14.0377 5.45623 15.9623 5.45623 16.7321 6.78956L23.9003 19.2052C24.6701 20.5386 23.7078 22.2053 22.1682 22.2053L7.8318 22.2053C6.2922 22.2053 5.32994 20.5386 6.09974 19.2053L13.2679 6.78956Z',
        fill: '#dea2a0',
    },
}

export default function URLBarStatusIcon() {
    const { urlBarState } = React.useContext(FormContext)

    return (
        <svg viewBox="0 0 30 30" className="w-10 h-10">
            <motion.path
                d={URLBarStatusIconVariants.idle.d}
                variants={URLBarStatusIconVariants}
                animate={urlBarState}
            />
        </svg>
    )
}
