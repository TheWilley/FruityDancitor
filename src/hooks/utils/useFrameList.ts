import { useEffect } from 'react';
import { EditorData, SpriteSheetSequences } from '../../global/types.ts';
import { produce } from 'immer';

/**
 * Custom hook which handles frame list interaction
 */
export default function useFrameList(
  spriteSheetSequences: EditorData['spriteSheetSequences'],
  setSpriteSheetSequences: EditorData['setSpriteSheetSequences'],
  selectedSequence: EditorData['selectedSequence'],
  selectedFrame: EditorData['selectedFrame'],
  setSelectedFrame: EditorData['setSelectedFrame']
) {
  // Detects when a sequence is changed and sets a default value of 0
  useEffect(() => {
    setSelectedFrame(0);
  }, [selectedSequence]);

  useEffect(() => {
    // Checks if the form is enabled (>0) or disabled (-1)
    if (selectedFrame != -1) {
      // If the selected index is out of bounds, move it down one step
      if (spriteSheetSequences[selectedSequence].sequence.length <= selectedFrame) {
        setSelectedFrame(selectedFrame - 1);
      }

      // If we have no spriteSheetSequences, disable form
      else if (spriteSheetSequences[selectedSequence].sequence.length === 0) {
        setSelectedFrame(-1);
      }
    }

    // If we only have one frame, select it
    else if (spriteSheetSequences[selectedSequence].sequence.length === 1) {
      setSelectedFrame(0);
    }
  });

  /**
   * Modifies a sequence with a new value.
   */
  const adjustSequence = (modifiedSequence: SpriteSheetSequences['sequence']) => {
    setSpriteSheetSequences((prevSequences) => {
      return produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence = modifiedSequence;
      });
    });
  };

  /**
   * Callback when removing a frame.
   */
  const callback = (targetFrame: number) => {
    adjustSequence(
      spriteSheetSequences[selectedSequence].sequence.filter(
        (_, index) => index !== targetFrame
      )
    );
    URL.revokeObjectURL(
      spriteSheetSequences[selectedSequence].sequence[targetFrame].objectURL
    );
  };

  return { callback, adjustSequence };
}
