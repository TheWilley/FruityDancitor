import JSZip from 'jszip';
import { IExportSettings } from '../utils/settingsHelper';
import saveAs from 'file-saver';
import { useState } from 'react';

function downloadFile(exportSettings: IExportSettings, filename: string) {
    // If a filename is not entered, use default name
    if (!filename) filename = 'spiriteSheet';

    // Check that required settings exists before continue
    if (!exportSettings.canvas || !exportSettings.spriteSheetFrames) return;

    // Create new zip instance
    const zip = new JSZip();

    // Get sequence names
    const sequenceNames = exportSettings.spriteSheetFrames.map((item, index) => item.name || `Sequence ${index}`);

    // Convert canvas to image
    const image = new Image();
    image.src = exportSettings.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    // Add files
    zip.file(`${filename}.txt`, sequenceNames.join('\n'));
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

export default function useExport() {
    const [fileName, setFileName] = useState('');

    return [fileName, setFileName, downloadFile] as const;    
}