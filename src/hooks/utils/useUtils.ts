import useBackground from './useBackground.ts';
import useOnUnload from './useOnUnload.ts';
import useSaveAndLoad from './useSaveAndLoad.ts';
import useExport from './useExport.ts';
import useFrameMods from './useFrameMods.ts';
import useFrameList from './useFrameList.ts';
import { useHotkeys } from 'react-hotkeys-hook';
import { produce } from 'immer';
import { arrayMoveMutable } from 'array-move';
import { arrayMove } from 'react-movable';
import {
  AppSettings,
  EditorData,
  EditorSettings,
  LoadSettings,
  SaveSettings,
} from '../../global/types.ts';
import keymap from '../../data/keybindings.json';

/**
 *
 * @param spriteSheetSequences
 * @param setSpriteSheetSequences
 * @param selectedSequence
 * @param setSelectedSequence
 * @param selectedFrame
 * @param setSelectedFrame
 * @param viewport
 * @param fileUpload
 * @param saveSettings
 * @param loadSettings
 * @param numberOfSequences
 * @param setNumberOfSequences
 * @param customBackgroundSrc
 * @param customBackgroundDarkness
 */
export default function useUtils(
  spriteSheetSequences: EditorData['spriteSheetSequences'],
  setSpriteSheetSequences: EditorData['setSpriteSheetSequences'],
  selectedSequence: EditorData['selectedSequence'],
  setSelectedSequence: EditorData['setSelectedSequence'],
  selectedFrame: EditorData['selectedFrame'],
  setSelectedFrame: EditorData['setSelectedFrame'],
  viewport: EditorData['viewport'],
  fileUpload: EditorData['fileUpload'],
  saveSettings: SaveSettings,
  loadSettings: LoadSettings,
  numberOfSequences: EditorSettings['numberOfSequences'],
  setNumberOfSequences: EditorSettings['setNumberOfSequences'],
  customBackgroundSrc: AppSettings['customBackgroundSrc'],
  customBackgroundDarkness: AppSettings['customBackgroundDarkness']
) {
  // Hook to adjust background
  useBackground(customBackgroundSrc, customBackgroundDarkness);

  // Hook to prevent
  useOnUnload(spriteSheetSequences[0].sequence.length > 0);

  // Define a function that extracts and combines functionalShortcut values into a union type

  // Deps for shortcuts
  const [save, load] = useSaveAndLoad();
  const { downloadFile } = useExport();
  const { resetMods } = useFrameMods(
    spriteSheetSequences,
    setSpriteSheetSequences,
    selectedSequence,
    selectedFrame
  );
  const { callback, adjustSequence } = useFrameList(
    spriteSheetSequences,
    setSpriteSheetSequences,
    selectedSequence,
    selectedFrame,
    setSelectedFrame
  );

  // TODO: Replace string with a type which lists valid keyboard shortcuts
  const handleKeyDown = (key: string) => {
    switch (key) {
      case 'arrowdown': {
        if (selectedSequence < spriteSheetSequences.length) {
          setSelectedSequence(selectedSequence + 1);
        }
        break;
      }

      case 'arrowup': {
        if (selectedSequence > 0) {
          setSelectedSequence(selectedSequence - 1);
        }
        break;
      }

      case 'control+arrowdown': {
        if (selectedSequence < spriteSheetSequences.length - 1) {
          setSpriteSheetSequences((prevSequences) =>
            produce(prevSequences, (draft) => {
              arrayMoveMutable(draft, selectedSequence, selectedSequence + 1);
            })
          );
          setSelectedSequence(selectedSequence + 1);
        }
        break;
      }

      case 'control+arrowup': {
        if (selectedSequence > 0) {
          setSpriteSheetSequences((prevSequences) =>
            produce(prevSequences, (draft) => {
              arrayMoveMutable(draft, selectedSequence, selectedSequence - 1);
            })
          );
          setSelectedSequence(selectedSequence - 1);
        }
        break;
      }

      case 'arrowright': {
        if (selectedFrame < 7) {
          setSelectedFrame(selectedFrame + 1);
        }
        break;
      }

      case 'arrowleft': {
        if (selectedFrame > 0) {
          setSelectedFrame(selectedFrame - 1);
        }
        break;
      }

      case 'control+arrowright': {
        if (selectedFrame !== -1 && selectedFrame < 7) {
          adjustSequence(
            arrayMove(
              spriteSheetSequences[selectedSequence].sequence,
              selectedFrame,
              selectedFrame + 1
            )
          );
          setSelectedFrame(selectedFrame + 1);
        }
        break;
      }

      case 'control+arrowleft': {
        if (selectedFrame !== -1 && selectedFrame > 0) {
          adjustSequence(
            arrayMove(
              spriteSheetSequences[selectedSequence].sequence,
              selectedFrame,
              selectedFrame - 1
            )
          );
          setSelectedFrame(selectedFrame - 1);
        }
        break;
      }

      case 'a': {
        setNumberOfSequences(numberOfSequences + 1);
        break;
      }

      case 'd': {
        if (numberOfSequences > 1) {
          setNumberOfSequences(numberOfSequences - 1);
        }
        break;
      }

      case 'u': {
        fileUpload.current?.click();
        break;
      }

      case 'e': {
        downloadFile({
          filename: '',
          spriteSheetSequences: spriteSheetSequences,
          viewport: viewport,
        });
        break;
      }

      case 'r': {
        resetMods();
        break;
      }

      case 'delete': {
        callback(selectedFrame);
        break;
      }

      case 's': {
        save(saveSettings);
        break;
      }

      case 'l': {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          target.files && load(target.files[0], loadSettings);
        };
        input.click();
        break;
      }

      case 'h': {
        const keyboardBindingsDialog = document.getElementById(
          'keyboardBindingsDialog'
        ) as HTMLDialogElement | null;

        keyboardBindingsDialog?.showModal();
      }
    }
  };

  useHotkeys(
    keymap.map((item) => item.functionalShortcut),
    (pressedKey, e) => {
      pressedKey.preventDefault();
      const pressedKeys = [];
      if (e.ctrl) pressedKeys.push('control');
      pressedKeys.push(pressedKey.key.toLowerCase());

      handleKeyDown(pressedKeys.join('+'));
    }
  );
}
