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
}

export default function Frame(props: FrameProps) {

    return (
        <div id={FRAME_ID}
            className="bg-gray-50"
            style={{
                borderRadius: props.frame.borderRadius,
                borderWidth: props.frame.borderWidth,
                borderColor: props.frame.borderColor,
                height: props.height,
                width: props.width,
            }}
        >
            <canvas id={FRAME_CANVAS_ID} height={props.height} width={props.width}
                style={{
                    height: props.height - props.frame.borderWidth * 2,
                    borderRadius: props.frame.borderRadius - 1,
                }}
                className="w-full bg-white" />
        </div>
    )
}
