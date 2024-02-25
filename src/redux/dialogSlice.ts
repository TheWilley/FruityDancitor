import { createSlice } from '@reduxjs/toolkit';

interface DialogSlice {
  dialogFrames: { base64: string; index: number }[];
  dialogIsShown: boolean;
  selectedDialogFrames: number[];
  page: number;
}

const initialState: DialogSlice = {
  dialogFrames: [],
  dialogIsShown: false,
  selectedDialogFrames: [],
  page: 0,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    dialogFramesUpdate(state, action) {
      state.dialogFrames = action.payload;
    },
    dialogIsShownToggle(state) {
      state.dialogIsShown = !state.dialogIsShown;
    },
    adjustSelectedDialogFrame(state, action) {
      const payloadIndex = action.payload.index;
      const selectedIndex = state.selectedDialogFrames.indexOf(action.payload.index);

      if (state.selectedDialogFrames.includes(payloadIndex)) {
        state.selectedDialogFrames.splice(selectedIndex, 1);
      } else {
        // Makes sure we don't upload too many frames
        if (state.selectedDialogFrames.length >= action.payload.cap) {
          state.selectedDialogFrames.shift();
        }

        // Push clicked frame
        state.selectedDialogFrames.push(action.payload.index);
      }
    },
    nextPage(state) {
      state.page++;
    },
    previousPage(state) {
      if (state.page > 0) {
        state.page--;
      }
    },
    resetSelectedDialogFrames(state, action) {
      state.selectedDialogFrames = Array.from(
        {
          length: action.payload,
        },
        (_, index) => index
      );
      state.page = 0;
    },
  },
});

export const {
  adjustSelectedDialogFrame,
  resetSelectedDialogFrames,
  dialogFramesUpdate,
  dialogIsShownToggle,
  nextPage,
  previousPage,
} = dialogSlice.actions;

export default dialogSlice.reducer;
