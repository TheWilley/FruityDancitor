import { useRef } from 'react';
import CardL1 from '../../../../components/CardL1';
import { IFrame } from '../../../../global/types';
import useViewport from '../../../../hooks/useViewport';

function SpriteSheetCanvas(props: { rows: number, height: number, width: number, frames: IFrame[], setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>> }) {
    const viewportRef = useRef<HTMLCanvasElement>(null);
    const [width, height, className] = useViewport(viewportRef, props.rows, props.height, props.width, props.frames, props.setCanvas);

    return (
        <>
            <CardL1 className="flex justify-center items-center h-full">
                <canvas ref={viewportRef} width={width} height={height} className={className} />
            </CardL1>
        </>
    );
}

export default SpriteSheetCanvas;