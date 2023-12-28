import useExport from '../../hooks/utils/useExport.ts';
import useKeyPress from '../../hooks/utils/useKeyPress.ts';
import { AppSettings, EditorData } from '../../global/types.ts';
import useBackground from '../../hooks/utils/useBackground.ts';
import { produce } from 'immer';
import { arrayMoveMutable } from 'array-move';
import useFrameMods from '../../hooks/utils/useFrameMods.ts';
import { arrayMove } from 'react-movable';
import useFrameList from '../../hooks/utils/useFrameList.ts';

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
  >;

/**
 * Component which contains editor utils nicely collected in a single place.
 * @param props A object containing component properties.
 */
function EditorUtils(props: Props) {
  // Hook to adjust background
  useBackground(props.customBackgroundSrc, props.customBackgroundDarkness);

  // Keyboard shortcut to export
  const { downloadFile } = useExport();
  useKeyPress(['e'], ['Shift'], () => {
    downloadFile({
      filename: '',
      spriteSheetSequences: props.spriteSheetSequences,
      viewport: props.viewport,
    });
  });

  // Keyboard shortcut to move to the next sequence
  useKeyPress(['0'], ['Control'], () => {
    if (props.selectedSequence < props.spriteSheetSequences.length) {
      props.setSelectedSequence(props.selectedSequence + 1);
    }
  });

  // Keyboard shortcut to move to the previous sequence
  useKeyPress(['9'], ['Control'], () => {
    if (props.selectedSequence > 0) {
      props.setSelectedSequence(props.selectedSequence - 1);
    }
  });

  // Moves the selected sequence up
  useKeyPress(['ArrowRight'], ['Control', 'Shift'], () => {
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
  useKeyPress(['ArrowLeft'], ['Control', 'Shift'], () => {
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
  useKeyPress(['r'], ['Shift'], () => {
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
  useKeyPress(['1'], ['Control'], () => selectFrame(0));
  useKeyPress(['2'], ['Control'], () => selectFrame(1));
  useKeyPress(['3'], ['Control'], () => selectFrame(2));
  useKeyPress(['4'], ['Control'], () => selectFrame(3));
  useKeyPress(['5'], ['Control'], () => selectFrame(4));
  useKeyPress(['6'], ['Control'], () => selectFrame(5));
  useKeyPress(['7'], ['Control'], () => selectFrame(6));
  useKeyPress(['8'], ['Control'], () => selectFrame(7));

  // Deletes the selected frame
  useKeyPress(['Delete'], undefined, () => callback(props.selectedFrame));

  // Moves the selected frame down
  useKeyPress(['ArrowDown'], ['Control', 'Shift'], () => {
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
  useKeyPress(['ArrowUp'], ['Control', 'Shift'], () => {
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

  return '';
}

export default EditorUtils;
