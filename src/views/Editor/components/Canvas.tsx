import { useEffect, useRef } from 'react';
import CardL1 from '../../../components/CardL1';
import { drawImageOnTile } from '../../../utils/canvas';

function Canvas(props: { rows: number, height: number, width: number, frames: string[][] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Get canvas ref
        const canvas = canvasRef.current;

        // Check if canvas exists
        if (canvas) {
            // Get the context
            const context = canvas.getContext('2d');
            
            // Check if context exist
            if (context) {
                // Clear the canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                for (const [y, row] of props.frames.entries()) {
                    // Go trough each frame in the frames array
                    for (const [x, frame] of row.entries()) {
                        // Draw image on the given tile, where x depends on frame and y depends on group
                        drawImageOnTile(context, frame, y, x, props.height, props.width);
                    }
                }
            }
        }
    }, [props]);

    return (
        <CardL1 className="flex justify-center items-center h-full">
            <canvas ref={canvasRef} width={props.width * 8} height={props.height * props.rows} className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
        </CardL1>
    );
}

export default Canvas;