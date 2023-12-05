import { LoadSettings, SaveSettings } from '../../global/types.ts';
import saveAs from 'file-saver';

/**
 * Loads a FruityDancitor JSON file.
 */
function load(file: File, loadSettings: LoadSettings) {
  if (file.type === 'application/json') {
    // Create a new reader to read JSON file
    const reader = new FileReader();

    // Define data variable here as we assign it later within the
    let data = {};

    reader.onloadend = function () {
      try {
        data = JSON.parse(reader.result as string);
      } catch (e) {
        console.error('Parsing Error: ' + e);
        alert('Error parsing project file');
        return;
      }

      try {
        // Dynamic mapping and loading of properties
        Object.keys(loadSettings).forEach((key) => {
          loadSettings[key as keyof typeof loadSettings](
            (data as { [key: string]: never })[key]
          );
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
  // Create object containing all props to save
  const json = Object.entries(saveSettings).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  console.log(json);

  // Create a blob to be saved
  const blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' });

  // Save the blob (downloads file)
  saveAs(blob, 'savedFruityDancitorProject.json');
}

/**
 * Custom hook for saving and loading a project.
 */
export default function useSaveAndLoad() {
  return [save, load] as const;
}
