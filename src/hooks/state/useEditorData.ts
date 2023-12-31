import { useMemo, useRef, useState } from 'react';
import { EditorData, EditorSettings, SpriteSheetSequences } from '../../global/types.ts';
import { produce } from 'immer';
import appConfig from '../../../appConfig.ts';

// Initial frames
const initialFrames = new Array(appConfig.numberOfSequences).fill({
  sequence: [],
  name: '',
});

/**
 * Custom hook which modifies sprite sheet frames before returning them.
 * @param numberOfSequences User-set number of X sequences.
 */
function useSpriteSheetSequences(numberOfSequences: number) {
  // Initiate empty array containing SpriteSheetSequences objects
  const [spriteSheetSequences, setSpriteSheetSequences] =
    useState<SpriteSheetSequences[]>(initialFrames);

  /**
   * Function to modify frames before returning the result.
   * Used here to:
   * 1. Splice the sequences so that we don't return an unnecessary amount (i.e, more than the amount of sequences).
   * 2. Sets the last sequence name to "Held" per the requirements of Fruity Dance.
   */
  const modifiedFrames = useMemo(() => {
    return produce(spriteSheetSequences, (draftFrames) => {
      // Splice frames
      draftFrames.splice(numberOfSequences);

      // Make sure there is only one held sequence
      for (let i = 0; i < draftFrames.length; i++) {
        if (draftFrames[i].name === 'Held') draftFrames[i].name = '';
      }

      // Modify the 'name' property of the last sequence
      draftFrames[draftFrames.length - 1].name = 'Held';
    });
  }, [numberOfSequences, spriteSheetSequences]);

  return [modifiedFrames, setSpriteSheetSequences] as const;
}

/**
 * Custom hook which modifies the number of sequences before returning data.
 * @param numberOfSequences User-set number of X sequences.
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
 * @param numberOfSequences User-set number of X sequences.
 */
export default function useEditorData(
  numberOfSequences: EditorSettings['numberOfSequences']
): EditorData {
  const [spriteSheetSequences, setSpriteSheetSequences] =
    useSpriteSheetSequences(numberOfSequences);
  const [selectedSequence, setSelectedSequence] = useSelectedSequence(numberOfSequences);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const viewport = useRef<HTMLCanvasElement>(null);

  // Gif extract hooks
  const [dialogFrames, setDialogFrames] = useState<string[]>([]);
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [selectedDialogFrames, setSelectedDialogFrames] = useState<number[]>([]);

  return {
    spriteSheetSequences,
    setSpriteSheetSequences,
    selectedSequence,
    setSelectedSequence,
    selectedFrame,
    setSelectedFrame,
    dialogFrames,
    setDialogFrames,
    dialogIsShown,
    setDialogIsShown,
    selectedDialogFrames,
    setSelectedDialogFrames,

    viewport,
  };
}
