import JSZip from 'jszip';
import saveAs from 'file-saver';
import { useState } from 'react';
import { ExportSettings } from '../../global/types.ts';

/**
 * Custom hook which zips the sprite sheet and sequence names, then downloads them.
 * @param exportSettings An object adhering to the strucutre of {@link ExportSettings}, along with a designated file name.
 */
function downloadFile(exportSettings: ExportSettings & { filename: string }) {
  // If a filename is not entered, use default name
  if (!exportSettings.filename) exportSettings.filename = 'spiriteSheet';

  // Check that required settings exists before continue
  if (!exportSettings.viewport || !exportSettings.spriteSheetSequences) return;

  // Create new zip instance
  const zip = new JSZip();

  // Get sequence names
  const sequenceNames = exportSettings.spriteSheetSequences.map(
    (item, index) => item.name || `Sequence ${index}`
  );

  // Convert canvas to image
  const image = new Image();

  if (exportSettings.viewport.current) {
    image.src = exportSettings.viewport.current
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
  }

  // Add files
  zip.file(`${exportSettings.filename}.txt`, sequenceNames.join('\n'));
  zip.file(
    `${exportSettings.filename}.png`,
    image.src.substring(image.src.indexOf(',') + 1),
    {
      base64: true,
    }
  );

  // Generates ZIP file
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${exportSettings.filename}.zip`);
  });
}

/**
 * Custom hook to export a project.
 */
export default function useExport() {
  const [fileName, setFileName] = useState('');

  return { fileName, setFileName, downloadFile };
}
