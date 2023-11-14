import { useRef } from 'react';
import Card from '../../../../components/Card';
import { SpriteSheetFrame } from '../../../../global/types';
import useViewport from '../../../../hooks/useViewport';

function SpriteSheetCanvas(props: { numberOfSequences: number, height: number, width: number, spriteSheetFrames: SpriteSheetFrame[], setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>> }) {
    const viewportRef = useRef<HTMLCanvasElement>(null);
    const [width, height, className] = useViewport(viewportRef, props.numberOfSequences, props.height, props.width, props.spriteSheetFrames, props.setCanvas);

    return (
        <>
            <Card className="flex justify-center items-center h-full">
                <canvas ref={viewportRef} width={width} height={height} className={className} />
            </Card>
        </>
    );
}

export default SpriteSheetCanvas;