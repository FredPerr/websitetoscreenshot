interface SwitchLabelProps {
    unchecked: string
    checked: string
}

export default function SwitchLabel({ unchecked, checked }: SwitchLabelProps) {
    return (
        <div className="text-gray-600 font-medium tracking-tighter">
            {unchecked} / {checked}
        </div>
    )
}
