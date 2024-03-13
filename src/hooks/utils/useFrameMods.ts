import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import {
  sequenceModsReset,
  sequenceModsScaleUpdate,
  sequenceModsXoffsetUpdate,
  sequenceModsYoffsetUpdate,
} from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles frame manupilaton.
 */
export default function useFrameMods() {
  const selectedSequence = useAppSelector((state) => state.spriteSheet.selectedSequence);
  const selectedFrame = useAppSelector((state) => state.spriteSheet.selectedFrame);
  const spriteSheetSequences = useAppSelector(
    (state) => state.spriteSheet.spriteSheetSequences
  );

  const dispatch = useAppDispatch();

  const mods = spriteSheetSequences[selectedSequence]?.sequence[selectedFrame]
    ?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

  /**
   * Resets mod params to default.
   */
  const resetMods = () => {
    dispatch(sequenceModsReset());
  };

  const setScale = (value: number) => {
    dispatch(sequenceModsScaleUpdate(value));
  };

  const setxoffset = (value: number) => {
    dispatch(sequenceModsXoffsetUpdate(value));
  };

  const setyoffset = (value: number) => {
    dispatch(sequenceModsYoffsetUpdate(value));
  };

  // Decides weather the inputs should be disabled or not
  const disabled = selectedFrame === -1;

  return { mods, disabled, resetMods, setxoffset, setyoffset, setScale };
}
