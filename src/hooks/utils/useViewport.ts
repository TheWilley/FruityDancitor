import { RefObject, useEffect, useState } from 'react';
import { SpriteSheetSequences } from '../../global/types.ts';

/**
 * Draws an image on a given tile.
 */
function drawImageOnTile(
  context: CanvasRenderingContext2D,
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
    // Create a temporary canvas and draw the image, then copy it over.
    // Since this temporary canvas is the exact width and height of a cell, an image will
    // never be able to go beyond its cell since any offset or size changes would draw the image outside
    // its boundaries. Thus, when copying over, anything outside won't be visible.
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCanvasContext = tempCanvas.getContext('2d');
    tempCanvasContext?.drawImage(
      image,
      xoffset * scale,
      yoffset * scale,
      width * scale,
      height * scale
    );

    // Draw the image clipped to the cell
    context.drawImage(tempCanvas, x * width, y * height, width, height);
  };

  image.src = objectURL;
}

/**
 * Custom hook to render sprite sheet.
 */
export default function useViewport(
  grid: RefObject<HTMLCanvasElement>,
  viewport: RefObject<HTMLCanvasElement>,
  numberOfSequences: number,
  height: number,
  width: number,
  spriteSheetSequences: SpriteSheetSequences[]
) {
  const [dontHideGrid, setDontHideGrid] = useState(false);

  const toggleDontHideGrid = () => {
    setDontHideGrid(!dontHideGrid);
  };

  useEffect(() => {
    // Return if the canvas context is not found
    if (!viewport.current) return;
    const viewportCanvas = viewport.current;

    // Get the context
    const viewportContext = viewportCanvas.getContext('2d');

    const drawFrames = () => {
      // Check if context exist
      if (viewportContext) {
        // Clear the canvas
        viewportContext.clearRect(0, 0, viewportCanvas.width, viewportCanvas.height);

        for (const [y, sequence] of spriteSheetSequences.entries()) {
          // Go through each spriteSheetFrame in the spriteSheetSequences array
          for (const [x, spriteSheetFrame] of sequence.sequence.entries()) {
            if (spriteSheetFrame?.objectURL) {
              // Draw image on the given tile, where x depends on spriteSheetFrame and y depends on group
              drawImageOnTile(
                viewportContext,
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
    };

    drawFrames();
  }, [height, spriteSheetSequences, viewport, width]);

  useEffect(() => {
    if (!grid.current) return;
    const gridCanvas = grid.current;
    const gridContext = gridCanvas.getContext('2d');

    // see https://stackoverflow.com/a/11736122/10223638
    const drawGrid = () => {
      if (gridContext) {
        // Clear grid
        gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridContext.beginPath();

        // Box width
        const bw = gridCanvas.width;
        // Box height
        const bh = gridCanvas.height;
        // Padding
        const p = 0;

        for (let x = 0; x <= bw; x += width) {
          gridContext.moveTo(0.5 + x + p, p);
          gridContext.lineTo(0.5 + x + p, bh + p);
        }

        for (let x = 0; x <= bh; x += height) {
          gridContext.moveTo(p, 0.5 + x + p);
          gridContext.lineTo(bw + p, 0.5 + x + p);
        }
        gridContext.strokeStyle = 'black';
        gridContext.lineWidth = 2;
        gridContext.stroke();
      }
    };

    const showGrid = () => {
      gridCanvas.style.opacity = '1';
    };

    const hideGrid = () => {
      if (!dontHideGrid) {
        gridCanvas.style.opacity = '0';
      }
    };

    // Draw grid
    drawGrid();

    // Add event listeners
    gridCanvas.addEventListener('mouseover', showGrid);
    gridCanvas.addEventListener('mouseleave', hideGrid);

    return () => {
      gridCanvas.removeEventListener('mouseover', showGrid);
      gridCanvas.removeEventListener('mouseleave', hideGrid);
    };
  }, [grid, height, width, spriteSheetSequences, dontHideGrid]);

  return {
    width: width * 8,
    height: height * numberOfSequences,
    toggleDontHideGrid,
    dontHideGrid,
  };
}
