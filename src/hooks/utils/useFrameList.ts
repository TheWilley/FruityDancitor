import { useEffect } from 'react';
import { EditorData, SpriteSheetFrame } from '../../global/types.ts';
import { produce } from 'immer';

/**
 * Custom hook which handles frame list interaction
 */
export default function useFrameList(
  spriteSheetFrames: EditorData['spriteSheetFrames'],
  setSpriteSheetFrames: EditorData['setSpriteSheetFrames'],
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
      if (spriteSheetFrames[selectedSequence].sequence.length <= selectedFrame) {
        setSelectedFrame(selectedFrame - 1);
      }

      // If we have no spriteSheetFrames, disable form
      else if (spriteSheetFrames[selectedSequence].sequence.length === 0) {
        setSelectedFrame(-1);
      }
    }

    // If we only have one frame, select it
    else if (spriteSheetFrames[selectedSequence].sequence.length === 1) {
      setSelectedFrame(0);
    }
  });

  /**
   * Modifies a sequence with a new value.
   */
  const adjustSequence = (modifiedSequence: SpriteSheetFrame['sequence']) => {
    setSpriteSheetFrames((prevFrames) => {
      return produce(prevFrames, (draft) => {
        draft[selectedSequence].sequence = modifiedSequence;
      });
    });
  };

  /**
   * Callback when removing a frame.
   */
  const callback = (targetFrame: number) => {
    adjustSequence(
      spriteSheetFrames[selectedSequence].sequence.filter(
        (_, index) => index !== targetFrame
      )
    );
    URL.revokeObjectURL(
      spriteSheetFrames[selectedSequence].sequence[targetFrame].objectURL
    );
  };

  return { callback, adjustSequence };
}
