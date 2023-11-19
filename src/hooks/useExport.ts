import JSZip from 'jszip';
import saveAs from 'file-saver';
import {useState} from 'react';
import {ExportSettings} from '../global/types';

function downloadFile(exportSettings: ExportSettings & { filename: string }) {
    // If a filename is not entered, use default name
    if (!exportSettings.filename) exportSettings.filename = 'spiriteSheet';

    // Check that required settings exists before continue
    if (!exportSettings.viewport || !exportSettings.spriteSheetFrames.value) return;

    // Create new zip instance
    const zip = new JSZip();

    // Get sequence names
    const sequenceNames = exportSettings.spriteSheetFrames.value.map((item, index) => item.name || `Sequence ${index}`);

    // Convert canvas to image
    const image = new Image();

    // TODO: Make sure it is not undefined before attempting to read DataURL
    image.src = exportSettings.viewport.value.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    // Add files
    zip.file(`${exportSettings.filename}.txt`, sequenceNames.join('\n'));
    zip.file(
        `${exportSettings.filename}.png`,
        image.src.substring(image.src.indexOf(',') + 1),
        {base64: true}
    );

    zip.generateAsync({type: 'blob'}).then(function (content) {
        // see FileSaver.js
        saveAs(content, `${exportSettings.filename}.zip`);
    });
}

export default function useExport() {
    const [fileName, setFileName] = useState('');

    return [fileName, setFileName, downloadFile] as const;
}