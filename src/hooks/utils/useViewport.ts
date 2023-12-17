import { RefObject, useEffect } from 'react';
import { SpriteSheetSequences } from '../../global/types.ts';

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

  // Wait for image to load before continuing as image otherwise won't be rendered until next rerender
  image.onload = () => {
    // Draw the image clipped to the cell
    ctx.drawImage(
      image,
      x * width * scale + xoffset,
      y * height * scale + yoffset,
      width * scale,
      height * scale
    );
  };

  image.src = objectURL;
}

/**
 * Custom hook to render sprite sheet.
 */
export default function useViewport(
  viewport: RefObject<HTMLCanvasElement>,
  numberOfSequences: number,
  height: number,
  width: number,
  spriteSheetSequences: SpriteSheetSequences[]
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

      for (const [y, sequence] of spriteSheetSequences.entries()) {
        // Go through each spriteSheetFrame in the spriteSheetSequences array
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
  }, [height, spriteSheetSequences, viewport, width]);

  return [width * 8, height * numberOfSequences] as const;
}
