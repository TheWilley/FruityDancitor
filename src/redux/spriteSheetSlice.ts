// spriteSheetSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { SpriteSheetSequences } from '../global/types.ts';
import appConfig from '../../appConfig.ts';
import { arrayMoveImmutable } from 'array-move';

interface SpriteSheetSlice {
  sequenceWarehouse: SpriteSheetSequences[];
  spriteSheetSequences: SpriteSheetSequences[]; // TODO: Rename to sequenceRetail
  selectedSequence: number;
  selectedFrame: number;
  numberOfSequences: number;
}

const initialState: SpriteSheetSlice = {
  sequenceWarehouse: new Array(appConfig.warehouseStorage).fill({
    sequence: [],
    name: '',
  }),
  spriteSheetSequences: new Array(1).fill({
    sequence: [],
    name: '',
  }),
  selectedSequence: 0,
  selectedFrame: 0,
  numberOfSequences: 1,
};

const spriteSheetSlice = createSlice({
  name: 'spriteSheet',
  initialState,
  reducers: {
    retailSequence(state) {
      const copy = [...state.sequenceWarehouse];

      // Splice according to the number of sequences
      copy.splice(state.numberOfSequences);

      // Make sure there is only one held sequence
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].name === 'Held') copy[i].name = '';
      }

      // Modify the 'name' property of the last sequence
      copy[copy.length - 1].name = 'Held';

      state.spriteSheetSequences = copy;
    },
    sequencesUpdate(state, action) {
      state.sequenceWarehouse = action.payload;
      spriteSheetSlice.caseReducers.retailSequence(state);
    },
    numberOfSequencesUpdate(state, action) {
      if (action.payload <= appConfig.warehouseStorage) {
        state.numberOfSequences = action.payload;
      }
      spriteSheetSlice.caseReducers.retailSequence(state);
    },
    sequenceMovePosition(state, action) {
      state.sequenceWarehouse = arrayMoveImmutable(
        state.sequenceWarehouse,
        action.payload.from,
        action.payload.to
      );
      state.selectedSequence = action.payload.to;
      spriteSheetSlice.caseReducers.retailSequence(state);
    },
    sequenceChangeName(state, action) {
      state.sequenceWarehouse[state.selectedSequence].name = action.payload;
    },
    sequenceAddFrame(state, action) {
      if (state.sequenceWarehouse[state.selectedSequence].sequence.length < 8) {
        state.sequenceWarehouse[state.selectedSequence].sequence.push(action.payload);
      }
    },
    sequenceDeleteFrame(state, action) {
      URL.revokeObjectURL(
        state.sequenceWarehouse[state.selectedSequence].sequence[action.payload].objectURL
      );
      state.sequenceWarehouse[state.selectedSequence].sequence = state.sequenceWarehouse[
        state.selectedSequence
      ].sequence.filter((_, index) => index !== action.payload);
    },
    sequenceModsXoffsetUpdate(state, action) {
      state.sequenceWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = action.payload;
    },
    sequenceModsYoffsetUpdate(state, action) {
      state.sequenceWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.yoffset = action.payload;
    },
    sequenceModsScaleUpdate(state, action) {
      state.sequenceWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = action.payload;
    },
    sequenceModsReset(state) {
      state.sequenceWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = 1;
      state.sequenceWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = 0;
      state.sequenceWarehouse[state.selectedSequence].sequence[
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
      state.sequenceWarehouse[state.selectedSequence].sequence = arrayMoveImmutable(
        state.sequenceWarehouse[state.selectedSequence].sequence,
        action.payload.from,
        action.payload.to
      );
      state.selectedFrame = action.payload.to;
    },
  },
});

export const {
  sequencesUpdate,
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
