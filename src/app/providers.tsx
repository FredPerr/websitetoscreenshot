'use client'

import { MenuContext } from '@/contexts/MenuContext'
import React from 'react'

export default function RootProvidersWrapper({ children }: { children: React.ReactNode }) {
    const [menuIdOpen, setMenuOpen] = React.useState<string | undefined>(undefined)
    return (
        <MenuContext.Provider
            value={{
                menuIdOpen: menuIdOpen,
                setMenuOpen: setMenuOpen,
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}
