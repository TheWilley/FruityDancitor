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
 * @param saveSettings
 * @param loadSettings
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
  saveSettings: SaveSettings,
  loadSettings: LoadSettings,
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
      case 'control+0': {
        if (selectedSequence < spriteSheetSequences.length) {
          setSelectedSequence(selectedSequence + 1);
        }
        break;
      }

      case 'control+9': {
        if (selectedSequence > 0) {
          setSelectedSequence(selectedSequence - 1);
        }
        break;
      }

      case 'control+shift+arrowright': {
        console.log('sdgsdg');
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

      case 'control+shift+arrowleft': {
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

      case 'shift+e': {
        downloadFile({
          filename: '',
          spriteSheetSequences: spriteSheetSequences,
          viewport: viewport,
        });
        break;
      }

      case 'shift+r': {
        resetMods();
        break;
      }

      case 'delete': {
        callback(selectedFrame);
        break;
      }

      case 'control+shift+arrowdown': {
        if (selectedFrame !== -1 && selectedFrame + 1 < 7) {
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

      case 'control+shift+arrowup': {
        if (selectedFrame !== -1 && selectedFrame - 1 >= 0) {
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

      case 'shift+s': {
        save(saveSettings);
        break;
      }

      case 'shift+l': {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          target.files && load(target.files[0], loadSettings);
        };
        input.click();
        break;
      }
    }
  };

  useHotkeys(
    keymap.map((item) => item.functionalShortcut),
    (pressedKey, e) => {
      const pressedKeys = [];
      if (e.ctrl) pressedKeys.push('control');
      if (e.shift) pressedKeys.push('shift');
      pressedKeys.push(pressedKey.key.toLowerCase());
      console.log(pressedKeys.join('+'));
      handleKeyDown(pressedKeys.join('+'));
    }
  );
}
