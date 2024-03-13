import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import {
  selectCurrentlySelectedFrame,
  sequenceModsReset,
  sequenceModsScaleUpdate,
  sequenceModsXoffsetUpdate,
  sequenceModsYoffsetUpdate,
} from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles frame manupilaton.
 */
export default function useFrameMods() {
  const mods = useAppSelector(selectCurrentlySelectedFrame)?.modifications || {
    scale: 1,
    xoffset: 0,
    yoffset: 0,
  };
  const selectedFrame = useAppSelector((state) => state.spriteSheet.selectedFrame);

  const dispatch = useAppDispatch();

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
