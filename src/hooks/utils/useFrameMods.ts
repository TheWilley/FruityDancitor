import { produce } from 'immer';
import { EditorData } from '../../global/types.ts';

/**
 * Custom hook which handles frame manupilaton
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

  const setScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.scale = parseFloat(
          e.target.value
        );
      })
    );
  };

  const setxoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.xoffset = parseInt(
          e.target.value
        );
      })
    );
  };

  const setyoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetSequences((prevSequences) =>
      produce(prevSequences, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.yoffset = parseInt(
          e.target.value
        );
      })
    );
  };

  // Decides weather the inputs should be disabled or not
  const disabled = selectedFrame === -1;

  return { mods, disabled, resetMods, setxoffset, setyoffset, setScale };
}
