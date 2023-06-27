'use client'

import { motion } from 'framer-motion'
import { SetStateAction } from 'react'

interface SwitchProps {
    checked: boolean
    setChecked: (checked: boolean) => void | SetStateAction<boolean>
}

export default function Switch({ checked, setChecked }: SwitchProps) {
    return (
        <button onClick={() => setChecked(!checked)} className="relative outline-none w-14 h-5 bg-blue-200 rounded-full">
            <motion.div className="absolute bg-blue-600 rounded-full h-3 w-6 top-1 left-1" 
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
            }}
            variants={{
                checked: {
                    x: 24,
                    backgroundColor: "rgb(37 99 235, 0.9)"
                },
                unchecked: {
                    x: 1,
                    backgroundColor: "#F3F4F6"
                }
            }}
            animate={checked ? 'checked' : 'unchecked'}
            >

            </motion.div>
            {checked}
        </button>
    )
}
