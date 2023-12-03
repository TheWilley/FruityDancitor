import { produce } from 'immer';
import { EditorData } from '../../global/types.ts';

/**
 * Custom hook which handles frame manupilaton
 */
export default function useFrameMods(
  spriteSheetFrames: EditorData['spriteSheetFrames'],
  setSpriteSheetFrames: EditorData['setSpriteSheetFrames'],
  selectedSequence: EditorData['selectedSequence'],
  selectedFrame: EditorData['selectedFrame']
) {
  const mods = spriteSheetFrames[selectedSequence]?.sequence[selectedFrame]
    ?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

  /**
   * Resets mod params to default.
   */
  const resetMods = () => {
    if (spriteSheetFrames[selectedSequence].sequence[selectedFrame]) {
      setSpriteSheetFrames((prevFrames) =>
        produce(prevFrames, (draft) => {
          draft[selectedSequence].sequence[selectedFrame].modifications.scale = 1;
          draft[selectedSequence].sequence[selectedFrame].modifications.xoffset = 0;
          draft[selectedSequence].sequence[selectedFrame].modifications.yoffset = 0;
        })
      );
    }
  };

  const setScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.scale = parseFloat(
          e.target.value
        );
      })
    );
  };

  const setxoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
        draft[selectedSequence].sequence[selectedFrame].modifications.xoffset = parseInt(
          e.target.value
        );
      })
    );
  };

  const setyoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
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
