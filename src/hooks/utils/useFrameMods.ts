import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import {
  sequenceModsReset,
  sequenceModsScaleUpdate,
  sequenceModsXoffsetUpdate,
  sequenceModsYoffsetUpdate,
  sequenceCopyMods,
  modifyAllFramesUpdate,
  sequencePasteMods,
} from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles frame manupilaton.
 */
export default function useFrameMods() {
  const { selectedSequence, selectedFrame, spriteSheetSequences, modifyAllFrames } =
    useAppSelector((state) => state.spriteSheet);
  const dispatch = useAppDispatch();

  const mods = spriteSheetSequences[selectedSequence]?.sequence[selectedFrame]
    ?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

  /**
   * Resets mod params to default.
   */
  const resetMods = () => {
    dispatch(sequenceModsReset());
  };

  const copyMods = () => {
    dispatch(sequenceCopyMods());
  };

  const pasteMods = () => {
    dispatch(sequencePasteMods());
  };

  const toggleSelectAll = () => {
    dispatch(modifyAllFramesUpdate(!modifyAllFrames));
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

  return {
    mods,
    disabled,
    modifyAllFrames,
    resetMods,
    copyMods,
    pasteMods,
    setxoffset,
    setyoffset,
    setScale,
    toggleSelectAll,
  };
}
