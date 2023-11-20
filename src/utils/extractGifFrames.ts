import { GifReader } from 'omggif';

function imageDataToDataURL(imageData: ImageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx?.putImageData(imageData, 0, 0);
    return canvas.toDataURL(); // This will return the Data URL
}


export async function extractGifFrames(file: File) {
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
