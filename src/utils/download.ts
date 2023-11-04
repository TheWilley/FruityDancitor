import JSZip from 'jszip';
import { IExportSettings } from '../global/types';
import { saveAs } from 'file-saver';

export function donwload(exportSettings: IExportSettings, filename: string) {
    // If a filename is not entered, use default name
    if(!filename) filename = 'spiriteSheet';

    // Check that required settings exists before continue
    if (!exportSettings.canvas || !exportSettings.frames) return;

    // Create new zip instance
    const zip = new JSZip();

    // Get row names
    const rowNames = exportSettings.frames.map((item) => item.name);

    // Convert canvas to image
    const image = new Image();
    image.src = exportSettings.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    // Add files
    zip.file(`${filename}.txt`, rowNames.join('\n'));
    zip.file(
        `${filename}.png`,
        image.src.substring(image.src.indexOf(',') + 1),
        { base64: true }
    );

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        saveAs(content, `${filename}.zip`);
    });
}