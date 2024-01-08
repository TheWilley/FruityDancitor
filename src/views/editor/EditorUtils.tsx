import useExport from '../../hooks/utils/useExport.ts';
import {
  AppSettings,
  EditorData,
  LoadSettings,
  SaveSettings,
} from '../../global/types.ts';
import useBackground from '../../hooks/utils/useBackground.ts';
import { produce } from 'immer';
import { arrayMoveMutable } from 'array-move';
import useFrameMods from '../../hooks/utils/useFrameMods.ts';
import { arrayMove } from 'react-movable';
import useFrameList from '../../hooks/utils/useFrameList.ts';
import useSaveAndLoad from '../../hooks/utils/useSaveAndLoad.ts';
import { useRef } from 'react';
import useOnUnload from '../../hooks/utils/useOnUnload.ts';
import { useHotkeys } from 'react-hotkeys-hook';

type Props = Pick<AppSettings, 'customBackgroundSrc' | 'customBackgroundDarkness'> &
  Pick<
    EditorData,
    | 'spriteSheetSequences'
    | 'setSpriteSheetSequences'
    | 'selectedSequence'
    | 'setSelectedSequence'
    | 'selectedFrame'
    | 'setSelectedFrame'
    | 'viewport'
  > & { saveSettings: SaveSettings; loadSettings: LoadSettings };

/**
 * Component which contains editor utils nicely collected in a single place.
 * @param props A object containing component properties.
 */
function EditorUtils(props: Props) {
  // Hook to adjust background
  useBackground(props.customBackgroundSrc, props.customBackgroundDarkness);

  // Hook to prevent
  useOnUnload(props.spriteSheetSequences[0].sequence.length > 0);

  // Keyboard shortcut to export
  const { downloadFile } = useExport();
  useHotkeys('shift+e', () => {
    downloadFile({
      filename: '',
      spriteSheetSequences: props.spriteSheetSequences,
      viewport: props.viewport,
    });
  });

  // Keyboard shortcut to move to the next sequence
  useHotkeys('control+0', () => {
    if (props.selectedSequence < props.spriteSheetSequences.length) {
      props.setSelectedSequence(props.selectedSequence + 1);
    }
  });

  // Keyboard shortcut to move to the previous sequence
  useHotkeys('control+9', () => {
    if (props.selectedSequence > 0) {
      props.setSelectedSequence(props.selectedSequence - 1);
    }
  });

  // Moves the selected sequence up
  useHotkeys('control+shift+arrowright ', () => {
    if (props.selectedSequence < props.spriteSheetSequences.length - 1) {
      props.setSpriteSheetSequences((prevSequences) =>
        produce(prevSequences, (draft) => {
          arrayMoveMutable(draft, props.selectedSequence, props.selectedSequence + 1);
        })
      );
      props.setSelectedSequence(props.selectedSequence + 1);
    }
  });

  // Moves the selected sequence up
  useHotkeys('control+shift+arrowleft', () => {
    if (props.selectedSequence > 0) {
      props.setSpriteSheetSequences((prevSequences) =>
        produce(prevSequences, (draft) => {
          arrayMoveMutable(draft, props.selectedSequence, props.selectedSequence - 1);
        })
      );
      props.setSelectedSequence(props.selectedSequence - 1);
    }
  });

  // Keyboard shortcut to reset mods
  const { resetMods } = useFrameMods(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.selectedFrame
  );
  useHotkeys('shift+r', () => {
    resetMods();
  });

  // Keyboard shortcut to adjust frame list
  const { callback, adjustSequence } = useFrameList(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.selectedFrame,
    props.setSelectedFrame
  );

  const selectFrame = (index: number) => {
    if (
      props.selectedFrame !== index &&
      props.spriteSheetSequences[props.selectedSequence].sequence.length > index
    ) {
      props.setSelectedFrame(index);
    }
  };

  // Multiple handlers to select a certain frame
  useHotkeys('control+1', () => selectFrame(0));
  useHotkeys('control+2', () => selectFrame(1));
  useHotkeys('control+3', () => selectFrame(2));
  useHotkeys('control+4', () => selectFrame(3));
  useHotkeys('control+5', () => selectFrame(4));
  useHotkeys('control+6', () => selectFrame(5));
  useHotkeys('control+7', () => selectFrame(6));
  useHotkeys('control+8', () => selectFrame(7));

  // Deletes the selected frame
  useHotkeys('delete', () => callback(props.selectedFrame));

  // Moves the selected frame down
  useHotkeys('control+shift+arrowdown', () => {
    if (props.selectedFrame + 1 < 7) {
      adjustSequence(
        arrayMove(
          props.spriteSheetSequences[props.selectedSequence].sequence,
          props.selectedFrame,
          props.selectedFrame + 1
        )
      );
      props.setSelectedFrame(props.selectedFrame + 1);
    }
  });

  // Moves the selected frame up
  useHotkeys('control+shift+arrowup', () => {
    if (props.selectedFrame - 1 >= 0) {
      adjustSequence(
        arrayMove(
          props.spriteSheetSequences[props.selectedSequence].sequence,
          props.selectedFrame,
          props.selectedFrame - 1
        )
      );
      props.setSelectedFrame(props.selectedFrame - 1);
    }
  });

  // Keyboard shortcut for saving and loading
  const [save, load] = useSaveAndLoad();
  const fileRef = useRef<HTMLInputElement | null>(null);
  useHotkeys('shift+s', () => {
    save(props.saveSettings);
  });
  useHotkeys('shift+l', () => {
    fileRef.current?.click();
  });

  return (
    <input
      type='file'
      onChange={(e) => {
        e.target.files && load(e.target.files[0], props.loadSettings);
      }}
      ref={fileRef}
      className='hidden'
    />
  );
}

export default EditorUtils;
