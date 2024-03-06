import { createSlice } from '@reduxjs/toolkit';
import { Modifications, SpriteSheetSequence } from '../global/types.ts';
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
  numberOfFrames: number;
  modifyAllFrames: boolean;
  copiedMods: Modifications[];
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
  numberOfFrames: 8,
  modifyAllFrames: false,
  copiedMods: [],
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

      state.spriteSheetSequences = copy;
    },
    sequencesUpdate(state, action) {
      action.payload.forEach((value: SpriteSheetSequence, index: number) => {
        state.sequencesWarehouse[index] = value;
      });
      spriteSheetSlice.caseReducers.transport(state);
    },
    numberOfSequencesUpdate(state, action) {
      if (action.payload <= appConfig.warehouseStorage) {
        state.numberOfSequences = action.payload;
        spriteSheetSlice.caseReducers.transport(state);
      }

      if (action.payload <= state.selectedSequence) {
        state.selectedSequence = state.selectedSequence - 1;
      }
    },
    numberOfFramesUpdate(state, action) {
      state.numberOfFrames = action.payload;
      spriteSheetSlice.caseReducers.transport(state);
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
      state.sequencesWarehouse[state.selectedSequence].sequence.push(action.payload);
      spriteSheetSlice.caseReducers.transport(state);

      spriteSheetSlice.caseReducers.selectedFrameUpdate(state, {
        payload: 0,
        type: action.type,
      });
    },
    sequenceDeleteFrame(state, action) {
      if (state.sequencesWarehouse[state.selectedSequence].sequence[action.payload]) {
        URL.revokeObjectURL(
          state.sequencesWarehouse[state.selectedSequence].sequence[action.payload]
            .objectURL
        );
        state.sequencesWarehouse[state.selectedSequence].sequence =
          state.sequencesWarehouse[state.selectedSequence].sequence.filter(
            (_, index) => index !== action.payload
          );

        if (
          state.sequencesWarehouse[state.selectedSequence].sequence.length ===
          state.selectedFrame
        ) {
          state.selectedFrame -= 1;
        }
        spriteSheetSlice.caseReducers.transport(state);
      }
    },
    sequenceModsXoffsetUpdate(state, action) {
      if (state.modifyAllFrames) {
        state.sequencesWarehouse[state.selectedSequence].sequence.forEach((frame) => {
          frame.modifications.xoffset = action.payload;
        });
      } else {
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.xoffset = action.payload;
      }
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsYoffsetUpdate(state, action) {
      if (state.modifyAllFrames) {
        state.sequencesWarehouse[state.selectedSequence].sequence.forEach((frame) => {
          frame.modifications.yoffset = action.payload;
        });
      } else {
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.yoffset = action.payload;
      }
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsScaleUpdate(state, action) {
      if (state.modifyAllFrames) {
        state.sequencesWarehouse[state.selectedSequence].sequence.forEach((frame) => {
          frame.modifications.scale = action.payload;
        });
      } else {
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.scale = action.payload;
      }
      spriteSheetSlice.caseReducers.transport(state);
    },
    sequenceModsReset(state) {
      if (state.modifyAllFrames) {
        state.sequencesWarehouse[state.selectedSequence].sequence.forEach((frame) => {
          frame.modifications.scale = 1;
          frame.modifications.xoffset = 0;
          frame.modifications.yoffset = 0;
        });
      } else {
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.scale = 1;
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.xoffset = 0;
        state.sequencesWarehouse[state.selectedSequence].sequence[
          state.selectedFrame
        ].modifications.yoffset = 0;
      }
      spriteSheetSlice.caseReducers.transport(state);
    },
    selectedSequenceUpdate(state, action) {
      if (action.payload > state.numberOfSequences) {
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
      if (
        state.spriteSheetSequences[state.selectedSequence].sequence.length <=
        action.payload
      ) {
        state.selectedFrame = action.payload - 1;
      } else if (
        state.spriteSheetSequences[state.selectedSequence].sequence.length === 0
      ) {
        state.selectedFrame = -1;
      } else if (action.payload < 0) {
        state.selectedFrame = 0;
      } else {
        state.selectedFrame = action.payload;
      }
    },
    frameMovePosition(state, action) {
      if (
        action.payload.to <
          state.sequencesWarehouse[state.selectedSequence].sequence.length &&
        action.payload.to >= 0
      ) {
        state.sequencesWarehouse[state.selectedSequence].sequence = arrayMoveImmutable(
          state.sequencesWarehouse[state.selectedSequence].sequence,
          action.payload.from,
          action.payload.to
        );
        state.selectedFrame = action.payload.to;
        spriteSheetSlice.caseReducers.transport(state);
      }
    },
    modifyAllFramesUpdate(state, action) {
      state.modifyAllFrames = action.payload;
    },
    copyMods(state) {
      state.copiedMods = state.spriteSheetSequences[state.selectedSequence].sequence.map(
        (frame) => {
          return {
            scale: frame.modifications.scale,
            xoffset: frame.modifications.xoffset,
            yoffset: frame.modifications.yoffset,
          };
        }
      );
    },
    pasteMods(state) {
      state.sequencesWarehouse[state.selectedSequence].sequence.forEach(
        (frame, index) => {
          frame.modifications.scale = state.copiedMods[index].scale;
          frame.modifications.xoffset = state.copiedMods[index].xoffset;
          frame.modifications.yoffset = state.copiedMods[index].yoffset;
        }
      );
      spriteSheetSlice.caseReducers.transport(state);
    },
  },
});

export const {
  sequencesUpdate,
  numberOfSequencesUpdate,
  numberOfFramesUpdate,
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
  modifyAllFramesUpdate,
  copyMods,
  pasteMods,
} = spriteSheetSlice.actions;

export default spriteSheetSlice.reducer;
