import { useEffect, useState } from 'react';

/**
 * Custom hook for previewing a sequence of frames.
 */
export default function usePreview(
  previewCanvas: HTMLCanvasElement | null,
  originalCanvas: HTMLCanvasElement | null,
  selectedSequence: number,
  width: number,
  height: number
) {
  const [keepTimer, setKeepTimer] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [sx, setSx] = useState(0);

  // Rendering a frame
  const nextFrame = (context: CanvasRenderingContext2D) => {
    // Create params
    const drawParams = {
      sourceX: sx,
      sourceY: height * (selectedSequence + 1) - height,
      sourceWidth: width,
      sourceHeight: height,
      destX: 0,
      destY: 0,
      destWidth: 100,
      destHeight: 100,
    };

    // If context exists, clear and show relevant frame
    if (context) {
      context.clearRect(0, 0, 100, 100);
      context.drawImage(
        originalCanvas!,
        drawParams.sourceX,
        drawParams.sourceY,
        drawParams.sourceWidth,
        drawParams.sourceHeight,
        drawParams.destX,
        drawParams.destY,
        drawParams.destWidth,
        drawParams.destHeight
      );
    }

    setSx(sx + width > width * 7 ? 0 : sx + width);
    setCurrentFrame(Math.floor(sx / width + 1));
  };

  useEffect(() => {
    // Check if both canvases exist before continuing
    if (originalCanvas && previewCanvas) {
      // Get context
      const context = previewCanvas.getContext('2d');

      // If context does not exist, return
      if (!context) return;

      // So that images does not appear blury
      context.imageSmoothingEnabled = false;

      // Create a timer which keeps timer going and updates spriteSheetSequences
      const timer = setTimeout(() => {
        setKeepTimer(keepTimer + 1);
        nextFrame(context);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [keepTimer, previewCanvas]);

  return [currentFrame];
}
