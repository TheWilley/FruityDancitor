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

  // Keyboard shortcut to adjust frame list
  const selectFrame = (index: number) => {
    if (
      selectedFrame !== index &&
      spriteSheetSequences[selectedSequence].sequence.length > index
    ) {
      setSelectedFrame(index);
    }
  };

  const shortcuts = [
    {
      shortcut: 'Ctrl + 0',
      // Keyboard shortcut to move to the next sequence
      hook: useHotkeys('control+0', () => {
        if (selectedSequence < spriteSheetSequences.length) {
          setSelectedSequence(selectedSequence + 1);
        }
      }),
      description: 'Select the next sequence',
    },
    {
      shortcut: 'Ctrl + 9',
      // Keyboard shortcut to move to the next sequence
      hook: useHotkeys('control+9', () => {
        if (selectedSequence > 0) {
          setSelectedSequence(selectedSequence - 1);
        }
      }),
      description: 'Select the previos sequence',
    },
    {
      shortcut: 'Ctrl + Shift + ▶︎',
      hook: useHotkeys('control+shift+arrowright ', () => {
        if (selectedSequence < spriteSheetSequences.length - 1) {
          setSpriteSheetSequences((prevSequences) =>
            produce(prevSequences, (draft) => {
              arrayMoveMutable(draft, selectedSequence, selectedSequence + 1);
            })
          );
          setSelectedSequence(selectedSequence + 1);
        }
      }),
      description: 'Move the selected sequence down',
    },
    {
      shortcut: 'Ctrl + Shift + ◀︎',
      hook: useHotkeys('control+shift+arrowleft', () => {
        if (selectedSequence > 0) {
          setSpriteSheetSequences((prevSequences) =>
            produce(prevSequences, (draft) => {
              arrayMoveMutable(draft, selectedSequence, selectedSequence - 1);
            })
          );
          setSelectedSequence(selectedSequence - 1);
        }
      }),
      description: 'Move the selected sequence up',
    },
    {
      shortcut: 'Shift + e',
      hook: useHotkeys('shift+e', () => {
        downloadFile({
          filename: '',
          spriteSheetSequences: spriteSheetSequences,
          viewport: viewport,
        });
      }),
      description: 'Quick export project',
    },
    {
      shortcut: 'Shift + r',
      hook: useHotkeys('shift+r', () => {
        resetMods();
      }),
      description: 'Reset frame mods values',
    },
    {
      shortcut: 'Shift + <1-8>',
      hook: useHotkeys(
        Array.from(Array(8).keys(), (x) => 'control+' + (x + 1)),
        (e) => selectFrame(parseInt(e.key) - 1)
      ),
      description: 'Select frame on index',
    },
    {
      shortcut: 'Delete',
      hook: useHotkeys('delete', () => callback(selectedFrame)),
      description: 'Delte selected frame',
    },
    {
      shortcut: 'Ctrl + Shift + ▼',
      hook: useHotkeys('control+shift+arrowdown', () => {
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
      }),
      description: 'Move the select frame down',
    },
    {
      shortcut: 'Ctrl + Shift + ▲',
      hook: useHotkeys('control+shift+arrowup', () => {
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
      }),
      description: 'Move the select frame up',
    },
    {
      shortcut: 'Ctrl + s',
      hook: useHotkeys('shift+s', () => {
        save(saveSettings);
      }),
      description: 'Save the project',
    },
    {
      shortcut: 'Ctrl + l',
      hook: useHotkeys('shift+l', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          target.files && load(target.files[0], loadSettings);
        };
        input.click();
      }),
      description: 'Load a project',
    },
  ];

  return { shortcuts };
}
