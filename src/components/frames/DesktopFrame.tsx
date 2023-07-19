import React from 'react';
import { FRAME_CANVAS_ID, FRAME_ID } from '.';

interface DesktopFrameProps {
    url?: string
}


export default function DesktopFrame({ url }: DesktopFrameProps) {
    return (
        <div id={FRAME_ID} className='rounded-xl border-gray-400 border-[4px] w-[960px] h-[540px] bg-gray-50'>
            <div className='w-full p-2 flex justify-center h-[38px] relative bg-gray-50 rounded-t-xl'>
                <div className="w-1/2 bg-gray-200 rounded h-full flex justify-center items-center">
                    {url && <span className='font-medium text-gray-500 text-sm'>
                        {url}
                    </span>}
                </div>
                <div className='absolute top-2 left-2 flex gap-2'>
                    <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                    <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                    <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                </div>
            </div>
            <canvas id={FRAME_CANVAS_ID} width={1920} height={1080} className='h-[494px] w-full rounded-b-md bg-white' />
        </div>
    )
}
