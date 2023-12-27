import { produce } from 'immer';
import { EditorData, SpriteSheetSequences } from '../../global/types.ts';

/**
 * Custom hook which handles frame manupilaton.
 * @param spriteSheetSequences An array of objects adhering to the strucutre of {@link SpriteSheetSequences}.
 * @param setSpriteSheetSequences Dispatch function to set a new state of `spriteSheetSequences`.
 * @param selectedSequence The currently selected sequence.
 * @param selectedFrame The currently selected frame of  a sequence.
 */
export default function useFrameMods(
  spriteSheetSequences: EditorData['spriteSheetSequences'],
  setSpriteSheetSequences: EditorData['setSpriteSheetSequences'],
  selectedSequence: EditorData['selectedSequence'],
  selectedFrame: EditorData['selectedFrame']
) {
  const mods = spriteSheetSequences[selectedSequence]?.sequence[selectedFrame]
    ?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

  /**
   * Resets mod params to default.
   */
  const resetMods = () => {
    if (spriteSheetSequences[selectedSequence].sequence[selectedFrame]) {
      setSpriteSheetSequences((prevSequences) =>
        produce(prevSequences, (draft) => {
          draft[selectedSequence].sequence[selectedFrame].modifications.scale = 1;
          draft[selectedSequence].sequence[selectedFrame].modifications.xoffset = 0;
          draft[selectedSequence].sequence[selectedFrame].modifications.yoffset = 0;
        })
      );
    }
  };

  const setScale = (value: number) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.scale = value;
      })
    );
  };

  const setxoffset = (value: number) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.xoffset = value;
      })
    );
  };

  const setyoffset = (value: number) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.yoffset = value;
      })
    );
  };

  // Decides weather the inputs should be disabled or not
  const disabled = selectedFrame === -1;

  return { mods, disabled, resetMods, setxoffset, setyoffset, setScale };
}
