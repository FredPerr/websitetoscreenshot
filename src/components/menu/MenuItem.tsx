import { MenuContext } from '@/contexts/MenuContext'
import React from 'react'

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function MenuItem(props: MenuItemProps) {
    return <div {...props} className=""/>
}
