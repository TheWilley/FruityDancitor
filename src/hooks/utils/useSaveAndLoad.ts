import { SaveAndLoad } from '../../global/types.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import saveAs from 'file-saver';
import { useCallback } from 'react';
import { heightUpdate, widthUpdate } from '../../redux/viewportSlice.ts';
import {
  backgroundDarknessUpdate,
  backgroundSrcUpdate,
} from '../../redux/backgroundSlice.ts';
import { fpsUpdate } from '../../redux/previewSlice.ts';
import {
  numberOfSequencesUpdate,
  sequencesUpdate,
} from '../../redux/spriteSheetSlice.ts';

/**
 * Reads a file and returns is as JSON.
 * @param file The JSON file to parse.
 */
function readFileAsJSON(file: File): Promise<SaveAndLoad> {
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
 * Custom hook for saving and loading a project.
 */
export default function useSaveAndLoad() {
  const dispatch = useAppDispatch();

  // Must be defined here as we use a hook to fetch data.
  // This would throw an error if attempt to put it within the "save" function since
  // is not a hook (even though it is within one?)
  const saveState: SaveAndLoad = {
    width: useAppSelector((state) => state.viewport.width),
    height: useAppSelector((state) => state.viewport.height),
    backgroundSrc: useAppSelector((state) => state.background.backgroundSrc),
    backgroundDarkness: useAppSelector((state) => state.background.backgroundDarkness),
    fps: useAppSelector((state) => state.preview.fps),
    numberOfSequences: useAppSelector((state) => state.spriteSheet.numberOfSequences),
    spriteSheetSequences: useAppSelector(
      (state) => state.spriteSheet.spriteSheetSequences
    ),
  };

  const save = () => {
    // Create a blob which later can be downloaded
    const blob = new Blob([JSON.stringify(saveState)], {
      type: 'text/plain;charset=utf-8',
    });

    // Save the blob (downloads file)
    saveAs(blob, 'savedFruityDancitorProject.json');

    // Alert user
    toast.success('Project Saved');
  };

  const load = useCallback((file: File) => {
    try {
      if (file.type !== 'application/json') {
        toast.error('Not a JSON file');
        return;
      }

      readFileAsJSON(file).then((result) => {
        dispatch(widthUpdate(result.width));
        dispatch(heightUpdate(result.height));
        dispatch(backgroundSrcUpdate(result.backgroundSrc));
        dispatch(backgroundDarknessUpdate(result.backgroundDarkness));
        dispatch(fpsUpdate(result.fps));
        dispatch(numberOfSequencesUpdate(result.numberOfSequences));
        dispatch(sequencesUpdate(result.spriteSheetSequences));
      });

      toast.success('Project Loaded');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Could not load project');
      }
    }
  }, []);

  return [save, load] as const;
}
