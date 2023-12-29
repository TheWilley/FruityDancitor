import { LoadSettings, SaveSettings, SpriteSheetSequences } from '../../global/types.ts';
import saveAs from 'file-saver';
import {
  convertFramesToBase64,
  convertFramesToObjectURLs,
} from '../../utils/imageTools.ts';
import { toast } from 'react-toastify';

/**
 * Reads a file and returns is as JSON.
 * @param file The JSON file to parse.
 */
function readFileAsJSON(file: File): Promise<SaveSettings> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const data = JSON.parse(result);
        resolve(data);
      } catch (e) {
        reject(new Error('Error parsing project file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };

    reader.readAsText(file);
  });
}

/**
 * Loads a FruityDancitor JSON file.
 * @param file The project JSON file.
 * @param loadSettings A object adhering to the structure of {@link LoadSettings}.
 */
async function load(file: File, loadSettings: LoadSettings) {
  if (file.type !== 'application/json') {
    toast.error('Not a JSON file');
    return;
  }

  try {
    const data = await readFileAsJSON(file);

    await Promise.all([
      loadSettings.setHeight(data.height),
      loadSettings.setWidth(data.width),
      loadSettings.setNumberOfSequences(data.numberOfSequences),
      loadSettings.setPreviewFps(data.previewFps),
      loadSettings.setCustomBackgroundSrc(data.customBackgroundSrc),
      loadSettings.setCustomBackgroundDarkness(data.customBackgroundDarkness),
      loadSettings.setCustomBackgroundDarkness(data.customBackgroundDarkness),
      convertFramesToObjectURLs(data.spriteSheetSequences).then((result) =>
        loadSettings.setSpriteSheetSequences(result)
      ),
    ]);

    toast.success('Project Loaded');
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Could not load project');
    }
  }
}

/**
 * Saves a FruityDancitor JSON file.
 * @param saveSettings A object adhering to the structure of {@link SaveSettings}.
 */
async function save(saveSettings: SaveSettings) {
  const transformValues = async (
    key: keyof SaveSettings,
    value: SaveSettings[keyof SaveSettings]
  ) => {
    if (key === 'spriteSheetSequences') {
      return {
        newKey: key,
        newValue: await convertFramesToBase64(value as SpriteSheetSequences[]),
      };
    } else {
      return { newKey: key, newValue: value };
    }
  };

  // Dynamically create data from all entries
  const transformedEntries = Object.fromEntries(
    await Promise.all(
      Object.entries(saveSettings).map(async ([oldKey, oldValue]) => {
        const { newKey, newValue } = await transformValues(
          oldKey as keyof SaveSettings,
          oldValue
        );
        return [newKey, newValue];
      })
    )
  );

  // Create a blob which later can be downloaded
  const blob = new Blob([JSON.stringify(transformedEntries)], {
    type: 'text/plain;charset=utf-8',
  });

  // Save the blob (downloads file)
  saveAs(blob, 'savedFruityDancitorProject.json');

  // Alert user
  toast.success('Project Saved');
}

/**
 * Custom hook for saving and loading a project.
 */
export default function useSaveAndLoad() {
  return [save, load] as const;
}
