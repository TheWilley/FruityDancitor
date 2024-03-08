import { SaveAndLoad } from '../../global/types.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import saveAs from 'file-saver';
import { useCallback } from 'react';
import {
  heightUpdate,
  showHeaderUpdate,
  widthUpdate,
} from '../../redux/viewportSlice.ts';
import {
  backgroundDarknessUpdate,
  backgroundSrcUpdate,
} from '../../redux/backgroundSlice.ts';
import { fpsUpdate } from '../../redux/previewSlice.ts';
import {
  numberOfFramesUpdate,
  numberOfSequencesUpdate,
  sequencesUpdate,
} from '../../redux/spriteSheetSlice.ts';
import {
  convertFramesToBase64,
  convertFramesToObjectURLs,
} from '../../utils/imageTools.ts';

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

  // This is not secret, its a unique identifier which
  // make sure we're loading a FruityDancitor project and not
  // a generic JSON file
  const identifier =
    'c7d1e9a9-e3c1-4e40-ad81-eb384fdaaea0-9c8fa00f-3bb3-469a-974b-efdc39b7dad8-6cf23a63-b332-4826-a509-5903deca5cc2';

  // Must be defined here as we use a hook to fetch data.
  // This would throw an error if attempt to put it within the "save" function since
  // is not a hook (even though it is within one?)
  const saveState: SaveAndLoad = {
    id: '',
    width: 0,
    height: 0,
    showHeader: false,
    backgroundSrc: '',
    backgroundDarkness: 0,
    fps: 0,
    numberOfSequences: 0,
    numberOfFrames: 0,
    spriteSheetSequences: [],
  };

  // This does indeed look stupid but is required
  // as dispatch techinically a hook, and thus we can't use
  // async to convert the frames to base64
  Promise.all([
    useAppSelector((state) => state.viewport.width),
    useAppSelector((state) => state.viewport.height),
    useAppSelector((state) => state.viewport.showHeader),
    useAppSelector((state) => state.background.backgroundSrc),
    useAppSelector((state) => state.background.backgroundDarkness),
    useAppSelector((state) => state.preview.fps),
    useAppSelector((state) => state.spriteSheet.numberOfSequences),
    useAppSelector((state) => state.spriteSheet.numberOfFrames),
    convertFramesToBase64(
      useAppSelector((state) => state.spriteSheet.spriteSheetSequences)
    ),
  ]).then(
    ([
      width,
      height,
      showHeader,
      backgroundSrc,
      backgroundDarkness,
      fps,
      numberOfSequences,
      numberOfFrames,
      spriteSheetSequences,
    ]) => {
      saveState.id = identifier;
      saveState.width = width;
      saveState.height = height;
      saveState.showHeader = showHeader;
      saveState.backgroundSrc = backgroundSrc;
      saveState.backgroundDarkness = backgroundDarkness;
      saveState.fps = fps;
      saveState.numberOfSequences = numberOfSequences;
      saveState.numberOfFrames = numberOfFrames;
      saveState.spriteSheetSequences = spriteSheetSequences;
    }
  );

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

      readFileAsJSON(file).then(async (result) => {
        if (result.id === identifier) {
          dispatch(widthUpdate(result.width));
          dispatch(heightUpdate(result.height));
          dispatch(showHeaderUpdate(result.showHeader));
          dispatch(backgroundSrcUpdate(result.backgroundSrc));
          dispatch(backgroundDarknessUpdate(result.backgroundDarkness));
          dispatch(fpsUpdate(result.fps));
          dispatch(numberOfSequencesUpdate(result.numberOfSequences));
          dispatch(numberOfFramesUpdate(result.numberOfFrames));
          dispatch(
            sequencesUpdate(await convertFramesToObjectURLs(result.spriteSheetSequences))
          );
          toast.success('Project Loaded');
        } else {
          toast.error('Not a FruityDancitor project');
        }
      });
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
