'use client'

import { MenuContext } from '@/contexts/MenuContext'
import React, { PropsWithChildren } from 'react'

interface MenuProps {
    id: string
    text: string
}

export default function Menu(props: PropsWithChildren<MenuProps>) {
    const { menuIdOpen, setMenuOpen } = React.useContext(MenuContext)
    return (
        <div className="relative" {...props}>
            <button
                onClick={() => {
                    if (menuIdOpen === props.id) {
                        setMenuOpen(undefined)
                        return
                    }
                    setMenuOpen(props.id)
                    const menu = document.getElementById('menu-' + props.id)
                    if (menu) {
                        menu.focus()
                    }
                }}
                onBlur={() => setMenuOpen(undefined)}
                className="py-2 px-3 rounded-md bg-blue-100 flex items-center gap-1"
            >
                {props.text}{' '}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                </svg>
            </button>
            <div className={`absolute bottom-0 translate-y-full left-0 rounded-md bg-white shadow-md z-10 flex-col p-2 ${menuIdOpen === props.id ? 'flex' : 'hidden'} transition-transform`}>
                {props.children}
            </div>
        </div>
    )
}
