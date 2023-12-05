import { GifReader } from 'omggif';
import { SpriteSheetFrame } from '../global/types.ts';

/**
 * EXPORTED
 * Converts base64 to a blob
 * @see https://stackoverflow.com/a/36183085
 */
export async function b64toBlob(base64: string) {
  const res = await fetch(base64);
  return await res.blob();
}

/**
 * EXPORTED
 * Converts a series of frames to base64
 */
export async function convertFramesToBase64(spriteSheetFrames: SpriteSheetFrame[]) {
  const updatedFrames: SpriteSheetFrame[] = [];

  for (const frame of spriteSheetFrames) {
    const updatedSequence = await Promise.all(
      frame.sequence.map(async (sequenceItem) => {
        const base64 = await getBase64FromUrl(sequenceItem.objectURL);
        return {
          objectURL: base64 as string, // Ensure the type is string
          modifications: sequenceItem.modifications,
        };
      })
    );

    const updatedFrame: SpriteSheetFrame = {
      sequence: updatedSequence,
      name: frame.name,
    };

    updatedFrames.push(updatedFrame);
  }

  return updatedFrames;
}

/**
 * EXPORTED
 * Converts a series of frames to baseURL
 */
export async function convertFramesToObjectURLs(
  spriteSheetFrames: SpriteSheetFrame[]
): Promise<SpriteSheetFrame[]> {
  const updatedFrames: SpriteSheetFrame[] = [];

  for (const frame of spriteSheetFrames) {
    const updatedSequence = await Promise.all(
      frame.sequence.map(async (sequenceItem) => {
        const blob = await b64toBlob(sequenceItem.objectURL);
        const objectURL = URL.createObjectURL(blob);
        return {
          objectURL,
          modifications: sequenceItem.modifications,
        };
      })
    );

    const updatedFrame: SpriteSheetFrame = {
      sequence: updatedSequence,
      name: frame.name,
    };

    updatedFrames.push(updatedFrame);
  }

  return updatedFrames;
}

/**
 * EXPORTED
 * Extract base64 from an image.
 */
export function getBase64(file: File, compressionRatio: number) {
  return new Promise<string | string[]>((resolve, reject) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      imageCompressor(file, compressionRatio, (result) => {
        resolve(result);
      });
    } else if (file.type === 'image/gif') {
      extractGifFrames(file).then((results) => resolve(results));
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
}

/**
 * Convert a objectURL to base64
 * @see https://stackoverflow.com/a/71869551
 */
async function getBase64FromUrl(url: string) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

/**
 * Compresses a image file.
 */
function imageCompressor(
  file: File,
  compressionRatio: number,
  callback: (result: string) => void
) {
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (event.target?.result) {
      const image = new Image();
      image.src = event.target.result as string;

      image.onload = () => {
        // Create canvas element
        const canvas = document.createElement('canvas');

        // Set max width and height
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;

        // Get the actual width and height
        let width = image.width;
        let height = image.height;

        // Resize the image while maintaining its aspect ratio within the defined maximum width and height constraints
        if (width > height) {
          // If the image is landscape-oriented
          if (width > MAX_WIDTH) {
            // If the image width exceeds the maximum allowed width
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          // If the image is portrait-oriented or a square
          if (height > MAX_HEIGHT) {
            // If the image height exceeds the maximum allowed height
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // Set canvas width and height
        canvas.width = width;
        canvas.height = height;

        // Get context and draw image
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, width, height);
          callback(canvas.toDataURL('image/png', compressionRatio));
        }
      };
    }
  };

  reader.readAsDataURL(file);
}

/**
 * Convert canvas data the dataURL format.
 */
function imageDataToDataURL(imageData: ImageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx?.putImageData(imageData, 0, 0);
  return canvas.toDataURL(); // This will return the Data URL
}

/**
 * Extracts frames from a gif file.
 */
async function extractGifFrames(file: File) {
  const blob = new Blob([file]);
  const arrayBuffer = await blob.arrayBuffer();
  const intArray = new Uint8Array(arrayBuffer);
  const reader = new GifReader(intArray);
  const numFrames = reader.numFrames();

  const frames = [];
  for (let k = 0; k < numFrames; k++) {
    const info = reader.frameInfo(k);
    const image = new ImageData(info.width, info.height);
    reader.decodeAndBlitFrameRGBA(k, image.data);
    frames.push(imageDataToDataURL(image));
  }

  return frames;
}
