import { useAppDispatch } from '../../redux/hooks.ts';
import { sequenceDeleteFrame } from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles frame list interaction.
 */
export default function useFrameList() {
  const dispatch = useAppDispatch();

  /**
   * Callback which removes a frame from a sequence.
   * @param targetFrame The frame to remove.
   */
  const callback = (targetFrame: number) => {
    dispatch(sequenceDeleteFrame(targetFrame));
  };

  return { callback };
}
