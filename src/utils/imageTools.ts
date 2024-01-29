import { GifReader } from 'omggif';
import { SpriteSheetSequence } from '../global/types.ts';

/**
 * Converts base64 to a blob.
 * @param base64
 * @see https://stackoverflow.com/a/36183085.
 */
export async function b64toBlob(base64: string) {
  const res = await fetch(base64);
  return await res.blob();
}

/**
 * Converts a series of frames to base64
 * @param spriteSheetSequences
 */
export async function convertFramesToBase64(spriteSheetSequences: SpriteSheetSequence[]) {
  const updatedFrames: SpriteSheetSequence[] = [];

  for (const sequence of spriteSheetSequences) {
    const updatedSequence = await Promise.all(
      sequence.sequence.map(async (sequenceItem) => {
        const base64 = await getBase64(sequenceItem.objectURL);
        return {
          objectURL: base64 as string,
          modifications: sequenceItem.modifications,
        };
      })
    );

    const updatedFrame: SpriteSheetSequence = {
      sequence: updatedSequence,
      name: sequence.name,
    };

    updatedFrames.push(updatedFrame);
  }

  return updatedFrames;
}

/**
 * Converts a series of frames to baseURL
 * @param spriteSheetSequences
 */
export async function convertFramesToObjectURLs(
  spriteSheetSequences: SpriteSheetSequence[]
): Promise<SpriteSheetSequence[]> {
  const updatedFrames: SpriteSheetSequence[] = [];

  for (const sequence of spriteSheetSequences) {
    const updatedSequence = await Promise.all(
      sequence.sequence.map(async (sequenceItem) => {
        const blob = await b64toBlob(sequenceItem.objectURL);
        const objectURL = URL.createObjectURL(blob);
        return {
          objectURL,
          modifications: sequenceItem.modifications,
        };
      })
    );

    const updatedFrame: SpriteSheetSequence = {
      sequence: updatedSequence,
      name: sequence.name,
    };

    updatedFrames.push(updatedFrame);
  }

  return updatedFrames;
}

/**
 * Extract base64 from an image.
 * @param source
 */
export async function getBase64(source: File | string) {
  if (typeof source === 'string') {
    const data = await fetch(source);
    const blob = await data.blob();
    return await readFile(blob);
  } else if (typeof source === 'object') {
    if (source.type === 'image/jpeg' || source.type === 'image/png') {
      return await readFile(source);
    } else if (source.type === 'image/gif') {
      return await extractGifFrames(source);
    } else {
      throw new Error('Unsupported file type');
    }
  }
}

/**
 * Extract base64 from an either a file or a blob
 * @param source
 */
function readFile(source: File | Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(source);
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

/**
 * Convert canvas data the dataURL format.
 * @param imageData
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
 * @param file
 */
async function extractGifFrames(file: File) {
  const blob = new Blob([file]);
  const arrayBuffer = await blob.arrayBuffer();
  const intArray = new Uint8Array(arrayBuffer);
  const reader = new GifReader(intArray);
  const numFrames = reader.numFrames();
  const { width, height } = reader.frameInfo(0);

  const frames = [];
  for (let k = 0; k < numFrames; k++) {
    const image = new ImageData(width, height);
    reader.decodeAndBlitFrameRGBA(k, image.data);
    frames.push(imageDataToDataURL(image));
  }

  return frames;
}

/**
 * Fetches a image from a given URL and returns the base64 data.
 * @param src
 */
export function getImageFromExternalUrl(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL); // Resolve with the data URL once it's created
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = src;
  });
}
