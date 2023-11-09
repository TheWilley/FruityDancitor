import Compressor from 'compressorjs';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { IExportSettings } from './settingsHelper';

/**
 * Extract base64 from an image
 */
function getBase64(file: File, compressionRatio: number) {
    return new Promise((resolve, reject) => {
        if (file.type === 'image/jpeg') {
            new Compressor(file, {
                quality: compressionRatio,
                success: (result) => {
                    const reader = new FileReader();

                    reader.onloadend = function () {
                        resolve(reader.result);
                    };

                    reader.onerror = function () {
                        reject(new Error('Failed to read the file as Base64'));
                    };

                    reader.readAsDataURL(result);
                }
            });
        } else {
            reject(new Error('Unsupported file type'));
        }
    });
}

function downloadFile(exportSettings: IExportSettings, filename: string) {
    // If a filename is not entered, use default name
    if (!filename) filename = 'spiriteSheet';

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

export { getBase64, downloadFile };
