import { LoadSettings, SaveSettings } from '../../global/types.ts';
import saveAs from 'file-saver';
import {
  convertFramesToBase64,
  convertFramesToObjectURLs,
} from '../../utils/imageTools.ts';

/**
 * Loads a FruityDancitor JSON file.
 */
function load(file: File, loadSettings: LoadSettings) {
  if (file.type === 'application/json') {
    // Create a new reader to read JSON file
    const reader = new FileReader();

    // Define data variable here as we assign it later within the
    let data = {} as SaveSettings;

    reader.onloadend = function () {
      try {
        data = JSON.parse(reader.result as string);
      } catch (e) {
        console.error('Parsing Error: ' + e);
        alert('Error parsing project file');
        return;
      }

      try {
        convertFramesToObjectURLs(data.spriteSheetSequences).then((result) => {
          loadSettings.setHeight(data.height);
          loadSettings.setWidth(data.width);
          loadSettings.setNumberOfSequences(data.numberOfSequences);
          loadSettings.setPreviewFps(data.previewFps);
          loadSettings.setCustomBackgroundSrc(data.customBackgroundSrc);
          loadSettings.setCustomBackgroundDarkness(data.customBackgroundDarkness);
          loadSettings.setCustomBackgroundDarkness(data.customBackgroundDarkness);
          loadSettings.setSpriteSheetSequences(result);
        });
        alert('Project loaded');
      } catch (e) {
        console.error('Error: ' + e);
        alert('Could not load project');
        return;
      }
    };

    reader.onerror = function () {
      new Error('Failed to read the file');
      alert('Failed to read the file');
    };

    reader.readAsText(file);
  } else {
    alert('Not a JSON file');
  }
}

/**
 * Saves a FruityDancitor JSON file.
 */
function save(saveSettings: SaveSettings) {
  convertFramesToBase64(saveSettings.spriteSheetSequences).then((result) => {
    const json: SaveSettings = {
        height: saveSettings.height,
        width: saveSettings.width,
        numberOfSequences: saveSettings.numberOfSequences,
        previewFps: saveSettings.previewFps,
        customBackgroundSrc: saveSettings.customBackgroundSrc,
        customBackgroundDarkness: saveSettings.customBackgroundDarkness,
        spriteSheetSequences: result,
      },
      blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' });

    // Save the blob (downloads file)
    saveAs(blob, 'savedFruityDancitorProject.json');
  });
}

/**
 * Custom hook for saving and loading a project.
 */
export default function useSaveAndLoad() {
  return [save, load] as const;
}
