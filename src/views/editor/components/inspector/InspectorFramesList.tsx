import { produce } from 'immer';
import { useEffect } from 'react';
import { arrayMove, List } from 'react-movable';
import { EditorData, SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

type Props = Pick<
  EditorData,
  | 'selectedFrame'
  | 'setSelectedFrame'
  | 'spriteSheetFrames'
  | 'setSpriteSheetFrames'
  | 'selectedSequence'
>;

/**
 * Component which represents the list of frames for a given sequence.
 */
function InspectorFramesList(EProps: Props) {
  // Detects when a sequence is changed and sets a default value of 0
  useEffect(() => {
    EProps.setSelectedFrame(0);
  }, [EProps.selectedSequence]);

  useEffect(() => {
    // Checks if the form is enabled (>0) or disabled (-1)
    if (EProps.selectedFrame != -1) {
      // If the selected index is out of bounds, move it down one step
      if (
        EProps.spriteSheetFrames[EProps.selectedSequence].sequence.length <=
        EProps.selectedFrame
      ) {
        EProps.setSelectedFrame(EProps.selectedFrame - 1);
      }

      // If we have no spriteSheetFrames, disable form
      else if (EProps.spriteSheetFrames[EProps.selectedSequence].sequence.length === 0) {
        EProps.setSelectedFrame(-1);
      }
    }

    // If we only have one frame, select it
    else if (EProps.spriteSheetFrames[EProps.selectedSequence].sequence.length === 1) {
      EProps.setSelectedFrame(0);
    }
  });

  /**
   * Modifies a sequence with a new value.
   */
  const adjustSequence = (modifiedSequence: SpriteSheetFrame['sequence']) => {
    EProps.setSpriteSheetFrames((prevFrames) => {
      return produce(prevFrames, (draft) => {
        draft[EProps.selectedSequence].sequence = modifiedSequence;
      });
    });
  };

  /**
   * Callback when removing a frame.
   */
  const callback = (targetFrame: number) => {
    adjustSequence(
      EProps.spriteSheetFrames[EProps.selectedSequence].sequence.filter(
        (_, index) => index !== targetFrame
      )
    );
    URL.revokeObjectURL(
      EProps.spriteSheetFrames[EProps.selectedSequence].sequence[targetFrame].objectURL
    );
  };

  return (
    <List
      values={EProps.spriteSheetFrames[EProps.selectedSequence].sequence}
      onChange={({ oldIndex, newIndex }) => {
        adjustSequence(
          arrayMove(
            EProps.spriteSheetFrames[EProps.selectedSequence].sequence,
            oldIndex,
            newIndex
          )
        );
        EProps.setSelectedFrame(newIndex);
      }}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, index }) => (
        <li
          {...props}
          onMouseDown={() => EProps.setSelectedFrame(index || 0)}
          className='z-30'
        >
          <CommonListItem
            {...props}
            objectURL={value.objectURL}
            text={`Frame ${(index || 0) + 1}`}
            alt=''
            callback={() => callback(index || 0)}
            highlighted={EProps.selectedFrame === index}
            includeTrash
          />
        </li>
      )}
    />
  );
}

export default InspectorFramesList;
