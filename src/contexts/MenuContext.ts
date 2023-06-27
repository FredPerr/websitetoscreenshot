import { createContext } from 'react'

export interface MenuContextType {
    menuIdOpen?: string
    setMenuOpen: (menuId: string | undefined) => void
}

export const MenuContext = createContext<MenuContextType>({
    menuIdOpen: undefined,
    setMenuOpen: (menuId: string | undefined) => {},
})
