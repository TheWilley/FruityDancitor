import { RefObject, useEffect } from 'react';
import { SpriteSheetFrame } from '../global/types';

/**
 * Draws an image on a given tile
 */
function drawImageOnTile(ctx: CanvasRenderingContext2D, base64: string, y: number, x: number, height: number, width: number, scale:number, xoffset: number, yoffset:number) {
    const image = new Image();
    image.src = base64;

    // Draw a rectangle at positon
    ctx.drawImage(image, x * width * scale + xoffset, y * height * scale + yoffset, width * scale, height * scale);
    ctx.fill();
}

export default function useViewport(canvasRef: RefObject<HTMLCanvasElement>, numberOfSequences: number, height: number, width: number, frames: SpriteSheetFrame[], setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>) {
    useEffect(() => {
        // Get canvas ref
        const canvas = canvasRef;

        // Check if canvas exists
        if (canvas.current) {
            // The canvas is not null
            setCanvas(canvas.current);

            // Get the context
            const context = canvas.current.getContext('2d');

            // Check if context exist
            if (context) {
                // Clear the canvas
                context.clearRect(0, 0, canvas.current.width, canvas.current.height);

                for (const [y, sequence] of frames.entries()) {
                    // Go trough each frame in the frames array
                    for (const [x, frame] of sequence.sequence.entries()) {
                        // Draw image on the given tile, where x depends on frame and y depends on group
                        drawImageOnTile(context, frame.base64, y, x, height, width, frame.modifications.scale, frame.modifications.xoffset, frame.modifications.yoffset);
                    }
                }
            }
        }
    });

    const className = [
        'bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]'
    ].join(' ');

    return [width * 8, height * numberOfSequences, className] as const;
}