import { RefObject, useEffect } from 'react';
import { SpriteSheetFrame } from '../../global/types.ts';

/**
 * Draws an image on a given tile.
 */
function drawImageOnTile(
  ctx: CanvasRenderingContext2D,
  objectURL: string,
  y: number,
  x: number,
  height: number,
  width: number,
  scale: number,
  xoffset: number,
  yoffset: number
) {
  const image = new Image();
  image.src = objectURL;

  // Draw the image clipped to the cell
  ctx.drawImage(
    image,
    x * width * scale + xoffset,
    y * height * scale + yoffset,
    width * scale,
    height * scale
  );
}

/**
 * Custom hook to render sprite sheet.
 */
export default function useViewport(
  viewport: RefObject<HTMLCanvasElement>,
  numberOfSequences: number,
  height: number,
  width: number,
  spriteSheetFrames: SpriteSheetFrame[]
) {
  useEffect(() => {
    // Return if the canvas context is not found
    if (!viewport.current) return;

    // Get the context
    const context = viewport.current.getContext('2d');

    // Check if context exist
    if (context) {
      // Clear the canvas
      context.clearRect(0, 0, viewport.current.width, viewport.current.height);

      for (const [y, sequence] of spriteSheetFrames.entries()) {
        // Go through each spriteSheetFrame in the spriteSheetFrames array
        for (const [x, spriteSheetFrame] of sequence.sequence.entries()) {
          if (spriteSheetFrame?.objectURL) {
            // Draw image on the given tile, where x depends on spriteSheetFrame and y depends on group
            drawImageOnTile(
              context,
              spriteSheetFrame.objectURL,
              y,
              x,
              height,
              width,
              spriteSheetFrame.modifications.scale,
              spriteSheetFrame.modifications.xoffset,
              spriteSheetFrame.modifications.yoffset
            );
          }
        }
      }
    }
  }, [height, spriteSheetFrames, viewport, width]);

  const className = [
    'bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]',
  ].join(' ');

  return [width * 8, height * numberOfSequences, className] as const;
}
