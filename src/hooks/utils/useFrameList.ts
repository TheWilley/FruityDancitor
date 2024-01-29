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
    (state) => state.spriteSheet.present
  );
  const dispatch = useAppDispatch();

  // TODO: Move this to the action innstead

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

    // If we frames, select it
    else if (spriteSheetSequences[selectedSequence].sequence.length > 0) {
      //dispatch(selectedFrameUpdate(0));
    }
  }, [selectedFrame, selectedSequence, spriteSheetSequences]);

  /**
   * Callback which removes a frame from a sequence.
   * @param targetFrame The frame to remove.
   */
  const callback = (targetFrame: number) => {
    dispatch(sequenceDeleteFrame(targetFrame));
  };

  return { callback };
}
