import useBackground from './useBackground.ts';
import useOnUnload from './useOnUnload.ts';
import useSaveAndLoad from './useSaveAndLoad.ts';
import useExport from './useExport.ts';
import useFrameMods from './useFrameMods.ts';
import useFrameList from './useFrameList.ts';
import { useHotkeys } from 'react-hotkeys-hook';
import keymap from '../../data/keybindings.json';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import {
  frameMovePosition,
  numberOfSequencesUpdate,
  selectedFrameUpdate,
  selectedSequenceUpdate,
  sequenceMovePosition,
} from '../../redux/spriteSheetSlice.ts';
import { Refs } from '../../global/types.ts';

/**
 * Custom hook to handle utility functionality.
 * @param viewport The viewport element, reresnts a canvas.
 * @param fileUpload The fileUpload element, represents an input element.
 */
export default function useUtils(
  viewport: Refs['viewport'],
  fileUpload: Refs['fileUpload']
) {
  const { numberOfSequences, spriteSheetSequences, selectedSequence, selectedFrame } =
    useAppSelector((state) => state.spriteSheet);
  const dispatch = useAppDispatch();
  const background = useAppSelector((state) => state.background);

  // Hook to adjust background
  useBackground(background.backgroundSrc, background.backgroundDarkness);

  // Hook to prevent
  useOnUnload(spriteSheetSequences[0].sequence.length > 0);

  // Deps for shortcuts
  const [save, load] = useSaveAndLoad();
  const { downloadFile } = useExport();
  const { resetMods } = useFrameMods();
  const { callback } = useFrameList();

  // TODO: Replace string with a type which lists valid keyboard shortcuts
  const handleKeyDown = (key: string) => {
    switch (key) {
      case 'arrowdown': {
        if (selectedSequence < spriteSheetSequences.length) {
          dispatch(selectedSequenceUpdate(selectedSequence + 1));
        }
        break;
      }

      case 'arrowup': {
        if (selectedSequence > 0) {
          dispatch(selectedSequenceUpdate(selectedSequence - 1));
        }
        break;
      }

      case 'control+arrowdown': {
        if (selectedSequence < spriteSheetSequences.length - 1) {
          dispatch(
            sequenceMovePosition({ from: selectedSequence, to: selectedSequence + 1 })
          );
        }
        break;
      }

      case 'control+arrowup': {
        if (selectedSequence > 0) {
          dispatch(
            sequenceMovePosition({ from: selectedSequence, to: selectedSequence - 1 })
          );
        }
        break;
      }

      case 'arrowright': {
        if (selectedFrame < 7) {
          dispatch(selectedFrameUpdate(selectedFrame + 1));
        }
        break;
      }

      case 'arrowleft': {
        if (selectedFrame > 0) {
          dispatch(selectedFrameUpdate(selectedFrame - 1));
        }
        break;
      }

      case 'control+arrowright': {
        if (selectedFrame !== -1 && selectedFrame < 7) {
          dispatch(frameMovePosition({ from: selectedFrame, to: selectedFrame + 1 }));
        }
        break;
      }

      case 'control+arrowleft': {
        if (selectedFrame !== -1 && selectedFrame > 0) {
          dispatch(frameMovePosition({ from: selectedFrame, to: selectedFrame - 1 }));
        }
        break;
      }

      case 'a': {
        dispatch(numberOfSequencesUpdate(numberOfSequences + 1));
        break;
      }

      case 'd': {
        if (numberOfSequences > 1) {
          dispatch(numberOfSequencesUpdate(numberOfSequences - 1));
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
          sequencesRetail: spriteSheetSequences,
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
        save();
        break;
      }

      case 'l': {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          target.files && load(target.files[0]);
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
