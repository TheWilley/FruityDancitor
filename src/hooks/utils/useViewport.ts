import { RefObject, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks.ts';

/**
 * Draws an image on a given tile.
 * @param context The canvas context on which the image will drawn.
 * @param objectURL The objectURL leading the image to be drawn.
 * @param y The y position within the grid.
 * @param x The x position within the grid.
 * @param height The height of a cell.
 * @param width The width of a cell.
 * @param scale The scale multipler of the image.
 * @param xoffset The xoffset of the image.
 * @param yoffset The yoffset of the image.
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
  return new Promise((resolve) => {
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
      resolve(true);
    };

    image.src = objectURL;
  });
}

/**
 * Custom hook to render sprite sheet.
 * @param grid A canvas element.
 * @param overlay A div element with a background.
 * @param viewport A canvas element.
 */
export default function useViewport(
  grid: RefObject<HTMLCanvasElement>,
  overlay: RefObject<HTMLDivElement>,
  viewport: RefObject<HTMLCanvasElement>
) {
  const { width, height } = useAppSelector((state) => state.viewport);
  const numberOfSequences = useAppSelector(
    (state) => state.spriteSheet.numberOfSequences
  );
  const numberOfFrames = useAppSelector((state) => state.spriteSheet.numberOfFrames);
  const spriteSheetSequences = useAppSelector(
    (state) => state.spriteSheet.spriteSheetSequences
  );
  const [permanentlyShowGrid, setPermanentlyShowGrid] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const toggleOverlay = async () => {
    // Return if the canvas context is not found
    if (!overlay.current) return;
    const overlayElement = overlay.current;

    overlayElement.style.opacity = '1';
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeOutId = setTimeout(() => {
      overlayElement.style.opacity = '0';
      setTimeoutId(null);
    }, 300);
    setTimeoutId(newTimeOutId);
  };

  /**
   * Toggles permanent show of grid (when not hovering).
   */
  const togglePermanentlyShowGrid = () => {
    setPermanentlyShowGrid(!permanentlyShowGrid);
  };

  /**
   * Toggles show of grid.
   * @param state Wether to show the grid or not.
   */
  const toggleShowGrid = (state: boolean) => {
    // Return if the canvas context is not found
    if (!grid.current) return;
    const gridCanvas = grid.current;

    if (state) {
      gridCanvas.style.opacity = '1';
    } else {
      if (!permanentlyShowGrid) {
        gridCanvas.style.opacity = '0';
      }
    }
    setShowGrid(state);
  };

  /**
   * Redraws the viewport
   */
  const redrawViewport = () => {
    // Return if the canvas context is not found
    if (!viewport.current) return;
    const viewportCanvas = viewport.current;
    const viewportContext = viewportCanvas.getContext('2d');

    const memory = document.createElement('canvas');
    memory.width = viewportCanvas.width;
    memory.height = viewportCanvas.height;
    const memoryContext = memory.getContext('2d');

    const drawFrames = async () => {
      // Check if context exist
      if (memoryContext) {
        // Clear the canvas
        memoryContext.clearRect(0, 0, viewportCanvas.width, viewportCanvas.height);

        for (const [y, sequence] of spriteSheetSequences.entries()) {
          // Go through each spriteSheetFrame in the spriteSheetSequences array
          for (const [x, spriteSheetFrame] of sequence.sequence.entries()) {
            if (spriteSheetFrame?.objectURL) {
              // Draw image on the given tile, where x depends on spriteSheetFrame and y depends on group
              await drawImageOnTile(
                memoryContext,
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

    drawFrames().then(() => {
      const imgData = memoryContext?.getImageData(0, 0, memory.width, memory.height);
      imgData && viewportContext?.putImageData(imgData, 0, 0);
    });
  };

  /**
   * Draws the grid.
   */
  const drawGrid = () => {
    if (!grid.current) return;
    const gridCanvas = grid.current;
    const gridContext = gridCanvas.getContext('2d');

    // see https://stackoverflow.com/a/11736122/10223638
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

  useEffect(() => {
    redrawViewport();
  }, [JSON.stringify(spriteSheetSequences.map((item) => item.sequence))]);

  useEffect(() => {
    toggleOverlay();
    redrawViewport();
  }, [
    width,
    height,
    JSON.stringify(spriteSheetSequences.map((item) => item.sequence.length)).length,
    numberOfFrames,
  ]);

  useEffect(() => {
    drawGrid();
  }, [
    grid,
    height,
    width,
    JSON.stringify(spriteSheetSequences),
    numberOfFrames,
    permanentlyShowGrid,
  ]);

  return {
    width: width * numberOfFrames,
    height: height * numberOfSequences,
    togglePermanentlyShowGrid,
    permanentlyShowGrid,
    toggleShowGrid,
    showGrid,
  };
}
