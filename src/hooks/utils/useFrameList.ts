import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import {
  selectedFrameUpdate,
  sequenceDeleteFrame,
} from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles frame list interaction.
 */
export default function useFrameList() {
  const { selectedSequence, selectedFrame, spriteSheetSequences } = useAppSelector(
    (state) => state.spriteSheet
  );
  const dispatch = useAppDispatch();

  // Detects when a sequence is changed and sets a default value of 0
  useEffect(() => {
    dispatch(selectedFrameUpdate(0));
  }, [selectedSequence]);

  useEffect(() => {
    // Checks if the form is enabled (>0) or disabled (-1)
    if (selectedFrame != -1) {
      // If the selected index is out of bounds, move it down one step
      if (spriteSheetSequences[selectedSequence].sequence.length <= selectedFrame) {
        dispatch(selectedFrameUpdate(selectedFrame - 1));
      }

      // If we have no spriteSheetSequences, disable form
      else if (spriteSheetSequences[selectedSequence].sequence.length === 0) {
        dispatch(selectedFrameUpdate(-1));
      }
    }

    // If we only have one frame, select it
    else if (spriteSheetSequences[selectedSequence].sequence.length === 1) {
      dispatch(selectedFrameUpdate(0));
    }
  });

  /**
   * Callback which removes a frame from a sequence.
   * @param targetFrame The frame to remove.
   */
  const callback = (targetFrame: number) => {
    dispatch(sequenceDeleteFrame(targetFrame));
  };

  return { callback };
}
