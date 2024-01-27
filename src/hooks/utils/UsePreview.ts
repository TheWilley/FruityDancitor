import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks.ts';

/**
 * Custom hook designed for previewing a sequence of frames.
 * @param previewCanvas - The canvas element where the preview will be rendered.
 * @param originalCanvas - The source canvas containing the frames to be fetched.
 * @param previewFps - The playback frames per second (FPS) for the preview.
 */
export default function usePreview(
  previewCanvas: HTMLCanvasElement | null,
  originalCanvas: HTMLCanvasElement | null,
  previewFps: number
) {
  const selectedSequence = useAppSelector((state) => state.spriteSheet.selectedSequence);
  const { width, height } = useAppSelector((state) => state.viewport);
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
      const timer = setTimeout(
        () => {
          setKeepTimer(keepTimer + 1);
          nextFrame(context);
        },
        (1 / previewFps) * 1000
      );

      return () => clearTimeout(timer);
    }
  }, [keepTimer, previewCanvas]);

  return [currentFrame];
}
