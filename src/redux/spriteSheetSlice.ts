import { createSlice } from '@reduxjs/toolkit';
import { SpriteSheetSequence } from '../global/types.ts';
import appConfig from '../appConfig.ts';
import { arrayMoveImmutable } from 'array-move';

/*
  - The "warehouse" array holds the original data used by the sprite sheet.
  - The "retail" array also holds the same data as the "warehouse", but data is only modified within the "warehouse".
  - Before transportation to retail, the "retail" array is populated or "transported" from the "warehouse" array with modifications applied.
  - Modifications include trimming the array to match the number of sequences among other changes, and these modifications are applied only to the "retail" array.
  - The "warehouse" array remains unaltered; only the "retail" array undergoes modifications for retail-specific purposes.
  - This approach ensures that the original data in the warehouse is preserved while the retail-specific adjustments are made separately to the "retail" array.
  - Thus, when the number of sequences are decreased, we still preserve all data in the warehouse, and such we can "add back" that data by increasing the number of sequences again.

  Warehouse --> Transport --> Retail
*/

interface SpriteSheetSlice {
  sequencesWarehouse: SpriteSheetSequence[];
  spriteSheetSequences: SpriteSheetSequence[]; // TODO: Rename to sequencesRetail
  selectedSequence: number;
  selectedFrame: number;
  numberOfSequences: number;
}

const initialState: SpriteSheetSlice = {
  sequencesWarehouse: new Array(appConfig.warehouseStorage).fill({
    sequence: [],
    name: '',
  }),
  spriteSheetSequences: new Array(1).fill({
    sequence: [],
    name: '',
  }),
  selectedSequence: 0,
  selectedFrame: -1,
  numberOfSequences: 1,
};

const spriteSheetSlice = createSlice({
  name: 'spriteSheet',
  initialState,
  reducers: {
    // This MUST run after each change to "transport"
    // data from the warehouse to retail
    transport(state) {
      const copy = [...state.sequencesWarehouse];

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
      state.sequencesWarehouse = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
    },
    numberOfSequencesUpdate(state, action) {
      if (action.payload <= appConfig.warehouseStorage) {
        state.numberOfSequences = action.payload;
        spriteSheetSlice.caseReducers.transport(state);
      }
    },
    sequenceMovePosition(state, action) {
      state.sequencesWarehouse = arrayMoveImmutable(
        state.sequencesWarehouse,
        action.payload.from,
        action.payload.to
      );
      state.selectedSequence = action.payload.to;
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceChangeName(state, action) {
      state.sequencesWarehouse[state.selectedSequence].name = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceAddFrame(state, action) {
      if (state.sequencesWarehouse[state.selectedSequence].sequence.length < 8) {
        state.sequencesWarehouse[state.selectedSequence].sequence.push(action.payload);
        spriteSheetSlice.caseReducers.transport(state);
      }
      spriteSheetSlice.caseReducers.selectedFrameUpdate(state, {
        payload: 0,
        type: action.type,
      });
    },
    sequenceDeleteFrame(state, action) {
      URL.revokeObjectURL(
        state.sequencesWarehouse[state.selectedSequence].sequence[action.payload]
          .objectURL
      );
      state.sequencesWarehouse[state.selectedSequence].sequence =
        state.sequencesWarehouse[state.selectedSequence].sequence.filter(
          (_, index) => index !== action.payload
        );
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsXoffsetUpdate(state, action) {
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsYoffsetUpdate(state, action) {
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.yoffset = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsScaleUpdate(state, action) {
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsReset(state) {
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.scale = 1;
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.xoffset = 0;
      state.sequencesWarehouse[state.selectedSequence].sequence[
        state.selectedFrame
      ].modifications.yoffset = 0;
      spriteSheetSlice.caseReducers.transport(state);
    },
    selectedSequenceUpdate(state, action) {
      if (action.payload >= state.numberOfSequences) {
        state.selectedSequence = state.numberOfSequences - 1;
      } else {
        state.selectedSequence = action.payload;
      }
      spriteSheetSlice.caseReducers.transport(state);
      spriteSheetSlice.caseReducers.selectedFrameUpdate(state, {
        payload: 0,
        type: action.type,
      });
    },
    selectedFrameUpdate(state, action) {
      // Checks if the form is enabled (>0) or disabled (-1)
      // If the selected index is out of bounds, move it down one step
      if (
        state.spriteSheetSequences[state.selectedSequence].sequence.length <=
        action.payload
      ) {
        state.selectedFrame = action.payload - 1;
      }

      // If we have no spriteSheetSequences, disable form
      else if (state.spriteSheetSequences[state.selectedSequence].sequence.length === 0) {
        state.selectedFrame = -1;
      } else {
        state.selectedFrame = action.payload;
      }
    },
    frameMovePosition(state, action) {
      state.sequencesWarehouse[state.selectedSequence].sequence = arrayMoveImmutable(
        state.sequencesWarehouse[state.selectedSequence].sequence,
        action.payload.from,
        action.payload.to
      );
      state.selectedFrame = action.payload.to;
      spriteSheetSlice.caseReducers.transport(state);
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
