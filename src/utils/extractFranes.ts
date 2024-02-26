import { GifReader } from 'omggif';
import { imageDataToDataURL } from './imageTools';

/**
 * Extracts frames from a gif file.
 * @param file A GIF file.
 */
export async function extractGifFrames(file: File) {
  const blob = new Blob([file]);
  const arrayBuffer = await blob.arrayBuffer();
  const intArray = new Uint8Array(arrayBuffer);
  const reader = new GifReader(intArray);
  const numFrames = reader.numFrames();
  const { width, height } = reader.frameInfo(0);
  const frames = [];
  const disposals = Array.from(
    { length: numFrames },
    (_, i) => reader.frameInfo(i).disposal
  );

  for (let k = 0; k < numFrames; k++) {
    const image = new ImageData(width, height);
    reader.decodeAndBlitFrameRGBA(k, image.data);
    frames.push(image);
  }

  return fixInterFrameCoalescing(frames, disposals);
}

/**
 * Fixes GIFS which uses coalescing.
 * @param gifFrames A series of frames containing ImageData and File.
 * @param disposals An array containing disposal values.
 */
async function fixInterFrameCoalescing(gifFrames: ImageData[], disposals: number[]) {
  const restoredFrames = [];

  for (let i = 0; i < gifFrames.length; i++) {
    const currentFrame = gifFrames[i];
    const restoredFrame = restoreFrame(currentFrame, gifFrames[i - 1], disposals[i]);
    restoredFrames.push(
      imageDataToDataURL(
        new ImageData(
          restoredFrame.restoredPixels,
          restoredFrame.width,
          restoredFrame.height
        )
      )
    );
  }

  return restoredFrames;
}

/**
 * Restores a broken frame.
 * @param currentFrame The current frame.
 * @param previousFrame The previous frame (used by currentFrame).
 * @param disposal The GIF disposal type.
 */
function restoreFrame(
  currentFrame: ImageData,
  previousFrame: ImageData,
  disposal: number
) {
  if (!previousFrame) {
    return {
      width: currentFrame.width,
      height: currentFrame.height,
      restoredPixels: currentFrame.data,
    };
  }

  const currentPixels = currentFrame.data;
  const previousPixels = previousFrame.data;
  const restoredPixels = [];

  for (let i = 0; i < currentFrame.data.length; i += 4) {
    if (currentPixels[i + 3] == 0 && disposal != 2) {
      currentPixels[i] = previousPixels[i];
      currentPixels[i + 1] = previousPixels[i + 1];
      currentPixels[i + 2] = previousPixels[i + 2];
      currentPixels[i + 3] = previousPixels[i + 3];
    }

    restoredPixels.push(
      currentPixels[i],
      currentPixels[i + 1],
      currentPixels[i + 2],
      currentPixels[i + 3]
    );
  }

  // Create the data
  const canvas = document.createElement('canvas');
  canvas.width = currentFrame.width;
  canvas.height = currentFrame.height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx!.createImageData(currentFrame.width, currentFrame.height);
  if (restoredPixels) imageData.data.set(restoredPixels);

  return {
    width: currentFrame.width,
    height: currentFrame.height,
    restoredPixels: imageData.data,
  };
}
