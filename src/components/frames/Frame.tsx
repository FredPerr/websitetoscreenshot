import { FRAME_CANVAS_ID, FRAME_ID } from "."

export interface FrameProps {
    width: number,
    height: number,
    decoration?: boolean // ui decoration (browser search bar, swipe up button on mobile, etc.)
    displayURL?: string
    frame: {
        borderWidth: number
        borderColor: string,
        borderRadius: number
    }
    padding: number
}

export default function Frame(props: FrameProps) {

    return (
        <div id={FRAME_ID}
            className="bg-gray-50"
            style={{
                height: props.height,
                width: props.width,
                padding: props.padding,
                background: 'linear-gradient(#e66465, #9198e5)'
            }}
        >
            <canvas id={FRAME_CANVAS_ID} height={props.height} width={props.width}
                style={{
                    height: props.height - props.frame.borderWidth * 2 - props.padding * 2,
                    width: props.width - props.frame.borderWidth * 2 - props.padding * 2,
                    borderRadius: props.frame.borderRadius - 1,
                    borderWidth: props.frame.borderWidth,
                    borderColor: props.frame.borderColor,
                }}
                className="w-full bg-white" />
        </div>
    )
}
