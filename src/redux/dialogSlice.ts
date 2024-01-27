import { createSlice } from '@reduxjs/toolkit';

interface DialogSlice {
  dialogFrames: string[];
  dialogIsShown: boolean;
  selectedDialogFrames: number[];
}

const initialState: DialogSlice = {
  dialogFrames: [],
  dialogIsShown: false,
  selectedDialogFrames: [],
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
      console.log(action.payload.index, action.payload.cap);
      const selectedIndex = state.dialogFrames.indexOf(action.payload.index);

      if (selectedIndex !== -1) {
        // Remove frame
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
    resetSelectedDialogFrames(state, action) {
      state.selectedDialogFrames = Array.from(
        {
          length: action.payload,
        },
        (_, index) => index
      );
    },
  },
});

export const {
  adjustSelectedDialogFrame,
  resetSelectedDialogFrames,
  dialogFramesUpdate,
  dialogIsShownToggle,
} = dialogSlice.actions;

export default dialogSlice.reducer;