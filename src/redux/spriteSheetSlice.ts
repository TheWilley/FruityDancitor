// spriteSheetSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { SpriteSheetSequences } from '../global/types.ts';
import appConfig from '../../appConfig.ts';
import { arrayMoveImmutable } from 'array-move';

interface SpriteSheetSlice {
  spriteSheetSequences: SpriteSheetSequences[];
  selectedSequence: number;
  selectedFrame: number;
  numberOfSequences: number;
}

const initialState: SpriteSheetSlice = {
  spriteSheetSequences: new Array(appConfig.numberOfSequences).fill({
    sequence: [],
    name: '',
  }),
  selectedSequence: 0,
  selectedFrame: 0,
  numberOfSequences: 1,
};

const prepareSequence = (spriteSheetSequences: SpriteSheetSequences[]) => {
  // Create a copy of the array
  const sequencesCopy = spriteSheetSequences.slice();

  // Splice frames
  sequencesCopy.splice(numberOfSequences);

  // Make sure there is only one held sequence
  for (let i = 0; i < sequencesCopy.length; i++) {
    if (sequencesCopy[i].name === 'Held') sequencesCopy[i].name = '';
  }

  // Modify the 'name' property of the last sequence
  sequencesCopy[sequencesCopy.length - 1].name = 'Held';

  return sequencesCopy;
};

const spriteSheetSlice = createSlice({
  name: 'spriteSheet',
  initialState,
  reducers: {
    numberOfSequencesUpdate(state, action) {
      state.numberOfSequences = action.payload;
    },
    sequenceMovePosition(state, action) {
      state.spriteSheetSequences = arrayMoveImmutable(
        state.spriteSheetSequences,
        action.payload.from,
        action.payload.to
      );
      state.selectedSequence = action.payload.to;
    },
    sequenceChangeName(state, action) {
      state.spriteSheetSequences[state.selectedSequence].name = action.payload;
    },
    sequenceAddFrame(state, action) {
      if (state.spriteSheetSequences[state.selectedSequence].sequence.length < 8) {
        state.spriteSheetSequences[state.selectedSequence].sequence.push(action.payload);
      }
    },
    sequenceDeleteFrame(state, action) {
      URL.revokeObjectURL(
        state.spriteSheetSequences[state.selectedSequence].sequence[action.payload]
          .objectURL
      );
      state.spriteSheetSequences[state.selectedSequence].sequence =
        state.spriteSheetSequences[state.selectedSequence].sequence.filter(
          (_, index) => index !== action.payload
        );
    },
    sequenceModsXoffsetUpdate(state, action) {
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = action.payload;
    },
    sequenceModsYoffsetUpdate(state, action) {
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.yoffset = action.payload;
    },
    sequenceModsScaleUpdate(state, action) {
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = action.payload;
    },
    sequenceModsReset(state) {
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = 1;
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = 0;
      state.spriteSheetSequences[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.yoffset = 0;
    },
    selectedSequenceUpdate(state, action) {
      if (action.payload >= state.numberOfSequences) {
        state.selectedSequence = state.numberOfSequences - 1;
      } else {
        state.selectedSequence = action.payload;
      }
    },
    selectedFrameUpdate(state, action) {
      state.selectedFrame = action.payload;
    },
    frameMovePosition(state, action) {
      state.spriteSheetSequences[state.selectedSequence].sequence = arrayMoveImmutable(
        state.spriteSheetSequences[state.selectedSequence].sequence,
        action.payload.from,
        action.payload.to
      );
      state.selectedFrame = action.payload.to;
    },
  },
});

export const {
  numberOfSequencesUpdate,
  sequenceMovePosition,
  sequenceChangeName,
  selectedFrameUpdate,
  sequenceModsXoffsetUpdate,
  sequenceModsYoffsetUpdate,
  sequenceModsScaleUpdate,
  sequenceModsReset,
  sequenceAddFrame,
  sequenceDeleteFrame,
  selectedSequenceUpdate,
  frameMovePosition,
} = spriteSheetSlice.actions;

export default spriteSheetSlice.reducer;
