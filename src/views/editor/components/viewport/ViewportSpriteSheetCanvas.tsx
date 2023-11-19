import { useRef } from 'react';
import Card from '../../../../components/Card';
import { EditorData, EditorSettings } from '../../../../global/types';
import useViewport from '../../../../hooks/useViewport';

type Props = Pick<EditorSettings, 'width' | 'height' | 'numberOfSequences'> & Pick<EditorData, 'spriteSheetFrames' | 'viewport'>

function SpriteSheetCanvas(props: Props) {
    const viewportRef = useRef<HTMLCanvasElement>(null);
    const [width, height, className] = useViewport(viewportRef, props.numberOfSequences.value, props.height.value, props.width.value, props.spriteSheetFrames.value, props.viewport.setValue);

    return (
        <>
            <Card className="w-full h-full">
                <div className='overflow-auto m-auto'>
                    <canvas ref={viewportRef} width={width} height={height} className={className} />
                </div>
            </Card>
        </>
    );
}

export default SpriteSheetCanvas;