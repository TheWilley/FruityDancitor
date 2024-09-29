import { SpriteSheetSequence } from '../global/types.ts';
import { extractGifFrames } from './extractFrames.ts';

/**
 * Converts base64 to a blob.
 * @param base64 A base64 string.
 * @see https://stackoverflow.com/a/36183085.
 */
export async function b64toBlob(base64: string) {
  const res = await fetch(base64);
  return await res.blob();
}

/**
 * Converts a series of frames to base64
 * @param spriteSheetSequences A spritesheet sequence
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
 * @param spriteSheetSequences A sprite sheet sequence.
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
 * @param source A File or Blob containing image data.
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
 * @param source A File or a Blob containing image data.
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
 * @param imageData Imagedata from a canvas element.
 */
export function imageDataToDataURL(imageData: ImageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx?.putImageData(imageData, 0, 0);
  return canvas.toDataURL(); // This will return the Data URL
}

/**
 * Fetches a image from a given URL and returns the base64 data.
 * @param src A image URL.
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

/**
 * Compresses an image file using the Canvas API and returns a Base64 encoded string.
 * @param imageFile - The image file to be compressed.
 * @param quality - The quality of the output image, between 0 and 1. Default is 0.7.
 * @param maxWidth - The maximum width of the output image. Default is 800 pixels.
 * @param maxHeight - The maximum height of the output image. Default is 600 pixels.
 * @returns A promise that resolves with the Base64 encoded string of the compressed image.
 */
export function compressImage(imageFile: File, quality = 0.7, maxWidth = 800, maxHeight = 600) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
          const img = new Image();
          
          img.onload = () => {
              let width = img.width;
              let height = img.height;

              // Calculate new dimensions if necessary
              if (width > maxWidth || height > maxHeight) {
                  if (width / height > maxWidth / maxHeight) {
                      height = Math.round((height *= maxWidth / width));
                      width = maxWidth;
                  } else {
                      width = Math.round((width *= maxHeight / height));
                      height = maxHeight;
                  }
              }

              // Create a canvas with the calculated dimensions
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              
              const ctx = canvas.getContext('2d');
              ctx!.drawImage(img, 0, 0, width, height);
              
              // Convert the image to Base64 with compression
              const base64String = canvas.toDataURL('image/jpeg', quality);
              resolve(base64String);
          };
          
          img.onerror = () => {
              reject(new Error('Image loading failed.'));
          };
          
          img.src = event.target!.result;
      };
      
      reader.onerror = () => {
          reject(new Error('File reading failed.'));
      };
      
      reader.readAsDataURL(imageFile);
  });
}

