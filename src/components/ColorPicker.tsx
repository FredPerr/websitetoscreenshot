'use client'

import React, { useCallback, useRef } from "react"
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful'
import useClickOutside from "@/hooks/useClickOutside"

interface ColorPickerProps {
    color: string,
    setColor: React.Dispatch<React.SetStateAction<string>>
    alpha?: boolean
}

export default function ColorPicker(props: ColorPickerProps) {
    const popover = useRef<HTMLDivElement>(null)
    const [isOpen, toggle] = React.useState(false)

    const close = useCallback(() => toggle(false), [])

    useClickOutside(popover, close)

    return (
        <div className="relative">
            <div className="w-6 h-6 rounded-lg border border-gray-500 cursor-pointer" style={{ backgroundColor: props.color }} onClick={() => toggle(true)} />

            {isOpen &&
                <div className="absolute left-0 rounded-md shadow-black z-50" style={{ top: 'calc(100%) + 2px' }} ref={popover}>
                    {props.alpha ?
                        <HexAlphaColorPicker color={props.color} onChange={props.setColor} />
                        :
                        <HexColorPicker color={props.color} onChange={props.setColor} />
                    }
                    <HexColorInput color={props.color} onChange={props.setColor} alpha={props.alpha ? true : false} prefixed placeholder="Choose your color" />
                </div>
            }
        </div>
    )
}
