import { useMemo, useState } from 'react';
import { EditorData, EditorSettings, SpriteSheetFrame } from '../../global/types.ts';
import { produce } from 'immer';
import appConfig from '../../../appConfig.ts';

// Initial frames
const initialFrames = new Array(appConfig.numberOfSequences).fill({
  sequence: [],
  name: '',
});

/**
 * Custom hook which serves as a complementary to useEditorData.
 *
 * Modifies sprite sheet frames before returning data.
 */
function useSpriteSheetFrames(numberOfSequences: number) {
  // Initiate empty array containing SpriteSheetFrame objects
  const [spriteSheetFrames, setSpriteSheetFrames] =
    useState<SpriteSheetFrame[]>(initialFrames);

  /**
   * Function to modify frames before returning the result.
   * Used here to:
   * 1. Splice the sequences so that we don't return an unnecessary amount (i.e, more than the amount of sequences).
   * 2. Sets the last sequence name to "held" per the requirements of Fruity Dance.
   */
  const modifiedFrames = useMemo(() => {
    return produce(spriteSheetFrames, (draftFrames) => {
      // Splice frames
      draftFrames.splice(numberOfSequences);

      // Make sure there is only one held sequence
      for (let i = 0; i < draftFrames.length; i++) {
        if (draftFrames[i].name === 'held') draftFrames[i].name = '';
      }

      // Modify the 'name' property of the last sequence
      draftFrames[draftFrames.length - 1].name = 'held';
    });
  }, [numberOfSequences, spriteSheetFrames]);

  return [modifiedFrames, setSpriteSheetFrames] as const;
}

/**
 * Custom hook which serves as a complementary to useEditorData.
 *
 * Modifies the number of sequences before returning data
 */
function useSelectedSequence(numberOfSequences: number) {
  const [selectedSequence, setSelectedSequence] = useState(0);

  // Decrease the selected sequence index since the selected sequence no longer exists (i.e, the amount of sequences is lower than the selected sequence)
  if (selectedSequence >= numberOfSequences) {
    setSelectedSequence(numberOfSequences - 1);
  }

  return [selectedSequence, setSelectedSequence] as const;
}

/**
 * Custom hook which consolidates and manages the crucial data utilized across the application, not directly mutable by the user.
 */
export default function useEditorData(
  numberOfSequences: EditorSettings['numberOfSequences']['value']
): EditorData {
  const [spriteSheetFrames, setSpriteSheetFrames] =
    useSpriteSheetFrames(numberOfSequences);
  const [selectedSequence, setSelectedSequence] = useSelectedSequence(numberOfSequences);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [viewport, setViewport] = useState<HTMLCanvasElement>();

  return {
    spriteSheetFrames: {
      value: spriteSheetFrames,
      setValue: setSpriteSheetFrames,
    },
    selectedSequence: {
      value: selectedSequence,
      setValue: setSelectedSequence,
    },
    selectedFrame: {
      value: selectedFrame,
      setValue: setSelectedFrame,
    },
    viewport: {
      value: viewport,
      setValue: setViewport,
    },
  };
}
