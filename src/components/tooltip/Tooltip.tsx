'use client'

import React from 'react'

interface TooltipProps {
    trigger: React.ReactNode
    children: React.ReactNode
}

export default function Tooltip({ children, trigger }: TooltipProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <div
            className="relative text-slate-500 cursor-default"
            onMouseEnter={() => {
                setOpen(true)
            }}
            onMouseLeave={() => {
                if (open) setOpen(false)
            }}
        >
            {trigger}
            <div className={`${open ? 'flex' : 'hidden'} absolute transition-all bg-white shadow-md z-10 rounded-md p-4 w-[300px] -left-[150px] top-6`}>{children}</div>
        </div>
    )
}
