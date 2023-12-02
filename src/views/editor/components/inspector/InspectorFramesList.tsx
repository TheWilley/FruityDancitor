import { produce } from 'immer';
import { useEffect } from 'react';
import { arrayMove, List } from 'react-movable';
import { EditorData, SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence' | 'selectedFrame'>;

/**
 * Component which represents the list of frames for a given sequence.
 */
function InspectorFramesList(EProps: Props) {
  // Detects when a sequence is changed and sets a default value of 0
  useEffect(() => {
    EProps.selectedFrame.setValue(0);
  }, [EProps.selectedSequence.value]);

  useEffect(() => {
    // Checks if the form is enabled (>0) or disabled (-1)
    if (EProps.selectedFrame.value != -1) {
      // If the selected index is out of bounds, move it down one step
      if (
        EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length <=
        EProps.selectedFrame.value
      ) {
        EProps.selectedFrame.setValue(EProps.selectedFrame.value - 1);
      }

      // If we have no spriteSheetFrames, disable form
      else if (
        EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length ===
        0
      ) {
        EProps.selectedFrame.setValue(-1);
      }
    }

    // If we only have one frame, select it
    else if (
      EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length === 1
    ) {
      EProps.selectedFrame.setValue(0);
    }
  });

  /**
   * Modifies a sequence with a new value.
   */
  const adjustSequence = (modifiedSequence: SpriteSheetFrame['sequence']) => {
    EProps.spriteSheetFrames.setValue((prevFrames) => {
      return produce(prevFrames, (draft) => {
        draft[EProps.selectedSequence.value].sequence = modifiedSequence;
      });
    });
  };

  /**
   * Callback when removing a frame.
   */
  const callback = (targetFrame: number) => {
    adjustSequence(
      EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.filter(
        (_, index) => index !== targetFrame
      )
    );
  };

  return (
    <List
      values={EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence}
      onChange={({ oldIndex, newIndex }) => {
        adjustSequence(
          arrayMove(
            EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence,
            oldIndex,
            newIndex
          )
        );
        EProps.selectedFrame.setValue(newIndex);
      }}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, index }) => (
        <li {...props} onMouseDown={() => EProps.selectedFrame.setValue(index || 0)}>
          <CommonListItem
            {...props}
            objectURL={value.objectURL}
            text={`Frame ${(index || 0) + 1}`}
            alt=''
            callback={() => callback(index || 0)}
            highlighted={EProps.selectedFrame.value === index}
            includeTrash
          />
        </li>
      )}
    />
  );
}

export default InspectorFramesList;
